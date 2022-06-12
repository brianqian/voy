/* eslint-disable import/no-duplicates */
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

const insertDailyIntoDb = async (item: ExportLineItem, category: CategoryName) => {
  const { id } = item;
  const name = isTvOrMovieItem(item) ? item.original_name : item.name;
  if (!name || !id) return;
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
      break;
    }
    case 'movie': {
      await prisma.movie.upsert({
        where: { tmdbId },
        update: { tmdbId, originalTitle: name },
        create: { tmdbId, originalTitle: name },
      });
      break;
    }
    case 'tv_network': {
      await prisma.network.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      break;
    }
    case 'production_company': {
      await prisma.productionCompany.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      break;
    }
    case 'person': {
      await prisma.person.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      break;
    }
    default:
      throw new Error(`Invalid Category Name: ${category}`);
  }
};

const getFullPath = (category: CategoryName) => {
  const yesterday = format(sub(new Date(), { days: 1 }), 'MM_dd_yyyy');
  return `${ROOT_PATH}${category}_ids_${yesterday}.json.gz`;
};

export const importTmdbDaily = async (category: CategoryName) => {
  const downloadStream = got.stream(getFullPath(category));

  downloadStream.on('downloadProgress', (progress) => {
    console.log(`${getFullPath(category)}: ${progress.percent}%`);
  });

  const pipeline = new Chain([
    downloadStream,
    zlib.createGunzip(),
    StreamValues.withParser(),
    (data) => data.value,
  ]);

  pipeline.on('data', async (data: ExportLineItem) => {
    insertDailyIntoDb(data, category);
  });
};
