import { z } from 'zod';
import { trueEnv } from '../lib/helpers/index.js';

const AppConfig = z.object({
  IMDB_API_KEY: z.string(),
  TMDB_API_KEY: z.string(),
  IMPORT_TMDB_MOVIE_EXPORT: z.boolean(),
  IMPORT_TMDB_PEOPLE_EXPORT: z.boolean(),
  DAYS_BETWEEN_TMDB_IMPORTS: z.number(),
});

type AppConfig = z.infer<typeof AppConfig>;

const config = AppConfig.parse({
  IMDB_API_KEY: process.env.IMDB_API_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  IMPORT_TMDB_MOVIE_EXPORT: trueEnv(process.env.IMPORT_TMDB_MOVIE_EXPORT),
  IMPORT_TMDB_PEOPLE_EXPORT: trueEnv(process.env.IMPORT_TMDB_PEOPLE_EXPORT),
  DAYS_BETWEEN_TMDB_IMPORTS: Number(process.env.DAYS_BETWEEN_TMDB_IMPORTS),
});

export default config;
