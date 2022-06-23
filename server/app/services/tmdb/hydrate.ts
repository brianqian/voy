import { Movie } from '@prisma/client';
import { Result } from '../../lib/helpers/result.js';
import prisma from '../../lib/prisma-client/index.js';
import { mdb } from '../../lib/tmdb-client/index.js';

async function hydrateMovie(tmdbId: string): Promise<Result.Type<Movie, null>> {
  const movie = await mdb.movieInfo({ id: tmdbId });
  const updated = await prisma.movie.update({ where: { tmdbId }, data: {} });
  return Result.success(updated);
}
async function hydrateTvSeries(tmdbId: string) {}
async function hydratePerson(tmdbId: string) {}
