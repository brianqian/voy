import { MovieDb } from 'moviedb-promise';
import config from '../../init/config.js';

const { TMDB_API_KEY } = config;
const _moviedb = new MovieDb(TMDB_API_KEY);
