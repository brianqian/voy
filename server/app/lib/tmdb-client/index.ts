import { Movie } from '@prisma/client';
import { MovieDb } from 'moviedb-promise';
import config from '../../init/config.js';

const { TMDB_API_KEY } = config;
export const mdb = new MovieDb(TMDB_API_KEY);

async function getFormattedMovie(tmdbId: string) {
  const movie = await mdb.movieInfo({ id: tmdbId });
  const {
    id,
    genres,
    imdb_id,
    original_title,
    popularity,
    overview,
    production_companies,
    runtime,
    release_date,
    tagline,
    title,
    status,
    vote_average,
  } = movie;

  const dbObject: Movie = {
    id,
  };
}
