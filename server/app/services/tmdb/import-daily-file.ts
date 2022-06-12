import chalk from 'chalk';
import { assert } from '@sindresorhus/is';
import { format, sub } from 'date-fns';
import got from 'got';
import Chain from 'stream-chain';
import StreamValues from 'stream-json/streamers/StreamValues.js';
import zlib from 'zlib';
import { CategoryName, ExportLineItem, isTvOrMovieItem } from 'app/services/tmdb/types.js';
import prisma from 'app/lib/prisma-client/index.js';
import { logger } from 'app/lib/logger/index.js';

const ROOT_PATH = 'http://files.tmdb.org/p/exports/';

const getFullPath = (category: CategoryName) => {
  const yesterday = format(sub(new Date(), { days: 1 }), 'MM_dd_yyyy');
  return `${ROOT_PATH}${category}_ids_${yesterday}.json.gz`;
};

async function insertDailyIntoDb(item: ExportLineItem, category: CategoryName): Promise<number> {
  const { id } = item;
  const name = isTvOrMovieItem(item) ? item.original_name : item.name;
  if (!name || !id) {
    console.error('no name or id found', { name }, { id });
    return 0;
  }
  assert.number(id);
  assert.string(name);
  const tmdbId = id.toString();
  // const tableName = getTableFromCategory(category);
  switch (category) {
    case 'tv_series': {
      await prisma.tvSeries.upsert({
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
}

export async function importTmdbDaily(category: CategoryName) {
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
    if (errors.length > 0) {
      logger.warn(` ${errors.length} errors found during ${category} import`);
    }
    logger.warn(` ${errors.length} errors found during ${category} import`);
  });
}
