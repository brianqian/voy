import { NonNullableObject } from '../lib/helpers/types.js';
import { allValuesExist, trueEnv } from '../lib/helpers/index.js';

const config = {
  IMDB_API_KEY: process.env.IMDB_API_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  MINIMAL_TMDB_SEED: trueEnv(process.env.MINIMAL_TMDB_SEED),
};

if (!allValuesExist(config)) {
  throw new Error('Missing config value');
}

console.log('Config is valid');
export default config as NonNullableObject<typeof config>;
