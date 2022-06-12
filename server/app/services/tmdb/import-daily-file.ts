/* eslint-disable import/no-duplicates */
import chalk from 'chalk';
import { assert } from '@sindresorhus/is';
import { format, sub } from 'date-fns';
import got from 'got';
import Chain from 'stream-chain';
import StreamValues from 'stream-json/streamers/StreamValues.js';
import zlib from 'zlib';
import prisma from '../../lib/prisma-client/index.js';

const ROOT_PATH = 'http://files.tmdb.org/p/exports/';
export const TMDB_EXPORT_CATEGORIES = [
  'tv_network', // 1 - smallest -- name
  'production_company', // 2 -- name
  'tv_series', // 3 -- original_name
  'movie', // 4 -- original_name
  'person', // 5 - largest -- name
  // 'collection',
  // 'keyword',
] as const;
type CategoryName = typeof TMDB_EXPORT_CATEGORIES[number];
interface TVOrMovieItem {
  id: number;
  original_name: string;
}

interface NonTVOrMovieItem {
  id: number;
  name: string;
}
type ExportLineItem = TVOrMovieItem | NonTVOrMovieItem;

const isTvOrMovieItem = (item: ExportLineItem): item is TVOrMovieItem => {
  return 'original_name' in item;
};

const getFullPath = (category: CategoryName) => {
  const yesterday = format(sub(new Date(), { days: 1 }), 'MM_dd_yyyy');
  return `${ROOT_PATH}${category}_ids_${yesterday}.json.gz`;
};

const insertDailyIntoDb = async (item: ExportLineItem, category: CategoryName) => {
  const { id } = item;
  const name = isTvOrMovieItem(item) ? item.original_name : item.name;
  if (!name || !id) {
    console.error('no name or id found', { name }, { id });
    return 0;
  }
  assert.number(id);
  assert.string(name);
  const tmdbId = id.toString();
  switch (category) {
    case 'tv_series': {
      await prisma.tVSeries.upsert({
        where: { tmdbId },
        update: { tmdbId, originalTitle: name },
        create: { tmdbId, originalTitle: name },
      });
      return 1;
    }
    case 'movie': {
      await prisma.movie.upsert({
        where: { tmdbId },
        update: { tmdbId, originalTitle: name },
        create: { tmdbId, originalTitle: name },
      });
      return 1;
    }
    case 'tv_network': {
      await prisma.network.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      return 1;
    }
    case 'production_company': {
      await prisma.productionCompany.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      return 1;
    }
    case 'person': {
      await prisma.person.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      return 1;
    }
    default:
      throw new Error(`Invalid Category Name: ${category}`);
  }
};

export const importTmdbDaily = async (category: CategoryName) => {
  const downloadStream = got.stream(getFullPath(category));

  downloadStream.on('downloadProgress', (progress) => {
    console.log(`${getFullPath(category)}: ${(progress.percent * 100).toFixed(3)}%`);
  });

  const pipeline = new Chain([
    downloadStream,
    zlib.createGunzip(),
    StreamValues.withParser(),
    (data) => data.value,
  ]);

  let totalCount = 0;
  let recordCount = 0;
  const errors = [];
  pipeline.on('data', async (data: ExportLineItem) => {
    totalCount += 1;
    const insertedCount = await insertDailyIntoDb(data, category);
    recordCount += insertedCount;
    if (recordCount % 10000 === 0) {
      console.log(`[${category}] -- ${recordCount} records added.`);
    }
  });

  pipeline.on('error', (err) => {
    errors.push(err);
  });
  pipeline.on('end', () => {
    console.log(
      `${chalk.blue(category)} import complete. ${recordCount}/${totalCount} records imported`
    );
    console.log(`Errors: ${errors.length}`);
  });
};
