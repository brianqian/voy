import { z } from 'zod';
import { trueEnv } from '../lib/helpers/index.js';

const AppConfig = z.object({
  IMDB_API_KEY: z.string(),
  TMDB_API_KEY: z.string(),
  MINIMAL_TMDB_SEED: z.boolean(),
  DAYS_BETWEEN_TMDB_IMPORTS: z.number(),
});

type AppConfig = z.infer<typeof AppConfig>;

const config = AppConfig.parse({
  IMDB_API_KEY: process.env.IMDB_API_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  MINIMAL_TMDB_SEED: trueEnv(process.env.MINIMAL_TMDB_SEED),
  DAYS_BETWEEN_TMDB_IMPORTS: Number(process.env.DAYS_BETWEEN_TMDB_IMPORTS),
});

export default config;
