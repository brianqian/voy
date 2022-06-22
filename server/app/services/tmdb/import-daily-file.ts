import { z } from 'zod';
import chalk from 'chalk';
import { assert } from '@sindresorhus/is';
import { format, sub } from 'date-fns';
import got from 'got';
import Chain from 'stream-chain';
import StreamValues from 'stream-json/streamers/StreamValues.js';
import zlib from 'zlib';
import {
  TmdbExportCategoryEnum,
  ExportLineItem,
  MovieItem,
  TvItem,
  NetworkItem,
  CompanyItem,
  PersonItem,
} from './types.js';
import prisma from '../../lib/prisma-client/index.js';
import { logger } from '../../lib/logger/index.js';

const ROOT_PATH = 'http://files.tmdb.org/p/exports/';

const getFullPath = (category: TmdbExportCategoryEnum) => {
  const yesterday = format(sub(new Date(), { days: 1 }), 'MM_dd_yyyy');
  return `${ROOT_PATH}${category}_ids_${yesterday}.json.gz`;
};

async function insertDailyIntoDb(item: ExportLineItem): Promise<number> {
  const { id, category } = item;
  const tmdbId = id.toString();
  switch (category) {
    case 'tv_series': {
      const { popularity, original_name: originalTitle } = item;
      await prisma.tvSeries.upsert({
        where: { tmdbId },
        update: { tmdbId, originalTitle, tmdbPopularity: popularity },
        create: { tmdbId, originalTitle, tmdbPopularity: popularity },
      });
      return 1;
    }
    case 'movie': {
      const { popularity, original_title: originalTitle } = item;
      await prisma.movie.upsert({
        where: { tmdbId },
        update: { tmdbId, originalTitle, tmdbPopularity: popularity },
        create: { tmdbId, originalTitle, tmdbPopularity: popularity },
      });
      return 1;
    }
    case 'tv_network': {
      const { name } = item;
      await prisma.network.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      return 1;
    }
    case 'production_company': {
      const { name } = item;
      await prisma.productionCompany.upsert({
        where: { tmdbId },
        update: { tmdbId, name },
        create: { tmdbId, name },
      });
      return 1;
    }
    case 'person': {
      const { popularity, name } = item;
      await prisma.person.upsert({
        where: { tmdbId },
        update: { tmdbId, name, tmdbPopularity: popularity },
        create: { tmdbId, name, tmdbPopularity: popularity },
      });
      return 1;
    }
    default:
      throw new Error(`Invalid Category Name: ${category}`);
  }
}

export async function importTmdbDaily(category: TmdbExportCategoryEnum) {
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
  pipeline.on('data', async (data: unknown) => {
    totalCount += 1;
    assert.plainObject(data);
    const parsedData: ExportLineItem = z
      .discriminatedUnion('category', [MovieItem, TvItem, NetworkItem, CompanyItem, PersonItem])
      .parse({ ...data, category });
    const insertedCount = await insertDailyIntoDb(parsedData);
    recordCount += insertedCount;
    if (recordCount % 10000 === 0) {
      console.log(`[${chalk.blue(category)}] -- ${recordCount} records added.`);
    }
  });

  pipeline.on('error', (err) => {
    errors.push(err);
  });
  pipeline.on('end', () => {
    logger.info(
      `${chalk.green(category)} import complete. ${recordCount}/${totalCount} records imported`
    );
    if (errors.length > 0) {
      logger.warn(` ${errors.length} errors found during ${category} import`);
    }
  });
}
