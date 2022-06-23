import _ from 'lodash';
import chalk from 'chalk';
import { differenceInCalendarDays, format } from 'date-fns';
import { TMDB_EXPORT_CATEGORIES } from '../app/services/tmdb/types.js';
import prisma from '../app/lib/prisma-client/index.js';
import { assertUnreachable, wrap } from '../app/lib/helpers/index.js';
import { importTmdbDaily } from '../app/services/tmdb/import-daily-file.js';
import config from '../app/init/config.js';

async function seedDatabaseFromDailyImports() {
  // Filter out categories that have been updated within the last week
  const categories = await Promise.all(
    TMDB_EXPORT_CATEGORIES.map(async (category) => {
      if (!config.IMPORT_TMDB_MOVIE_EXPORT && category === 'movie') {
        return null;
      }
      if (!config.IMPORT_TMDB_PEOPLE_EXPORT && category === 'person') {
        return null;
      }

      const lastUpdatedDate = await wrap(async () => {
        switch (category) {
          case 'tv_network':
            return prisma.network.findFirst({
              orderBy: {
                updatedAt: 'desc',
              },
              select: {
                updatedAt: true,
              },
            });
          case 'production_company':
            return prisma.productionCompany.findFirst({
              orderBy: {
                updatedAt: 'desc',
              },
              select: {
                updatedAt: true,
              },
            });
          case 'tv_series':
            return prisma.tvSeries.findFirst({
              orderBy: {
                updatedAt: 'desc',
              },
              select: {
                updatedAt: true,
              },
            });
          case 'movie':
            return prisma.movie.findFirst({
              orderBy: {
                updatedAt: 'desc',
              },
              select: {
                updatedAt: true,
              },
            });
          case 'person':
            return prisma.person.findFirst({
              orderBy: {
                updatedAt: 'desc',
              },
              select: {
                updatedAt: true,
              },
            });
          default:
            return assertUnreachable(category);
        }
      });
      if (!lastUpdatedDate) {
        return category;
      }
      const difference = differenceInCalendarDays(new Date(), lastUpdatedDate.updatedAt);
      const hasNotBeenUpdatedInLastWeek = difference >= config.DAYS_BETWEEN_TMDB_IMPORTS;

      if (hasNotBeenUpdatedInLastWeek) {
        console.log(
          `${chalk.green('UPDATING')}: ${chalk.yellow(
            category
          )} -- Last updated ${difference} days ago on ${format(
            lastUpdatedDate.updatedAt,
            'MMM. dd yyyy'
          )}`
        );

        return category;
      }
      console.log(
        `${chalk.red('NOT UPDATING')}: ${chalk.yellow(
          category
        )} -- Last updated ${difference} days ago on ${format(
          lastUpdatedDate.updatedAt,
          'MMM. dd yyyy'
        )}`
      );
      return null;
    })
  );
  const filteredCategories = _.compact(categories);

  await Promise.all(
    filteredCategories.map(async (category) => {
      await importTmdbDaily(category);
    })
  );
}
console.log(`Day threshold: ${config.DAYS_BETWEEN_TMDB_IMPORTS}`);
seedDatabaseFromDailyImports();
