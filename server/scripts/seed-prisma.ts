import { differenceInWeeks } from 'date-fns';
import { TMDB_EXPORT_CATEGORIES } from '../app/services/tmdb/types.js';
import prisma from '../app/lib/prisma-client/index.js';
import { assertUnreachable, wrap } from '../app/lib/helpers/index.js';
import { importTmdbDaily } from '../app/services/tmdb/import-daily-file.js';
import config from '../app/init/config.js';

async function seedDatabaseFromDailyImports() {
  // Filter out categories that have been updated within the last week
  const categories = TMDB_EXPORT_CATEGORIES.filter(async (category) => {
    if (config.MINIMAL_TMDB_SEED) {
      if (['movie', 'person'].includes(category)) {
        return false;
      }
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
      return true;
    }

    const hasNotBeenUpdatedInLastWeek =
      differenceInWeeks(new Date(), lastUpdatedDate.updatedAt) >= 1;
    return hasNotBeenUpdatedInLastWeek;
  });

  await Promise.all(
    categories.map(async (category) => {
      await importTmdbDaily(category);
    })
  );
}

seedDatabaseFromDailyImports();
