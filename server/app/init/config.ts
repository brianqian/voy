import { assertPresent } from '../lib/helpers/index.js';

const config = {
  IMDB_API_KEY: assertPresent(process.env.IMDB_API_KEY),
  TMDB_API_KEY: assertPresent(process.env.TMDB_API_KEY),
};

console.log('Config loaded');

export default config;
