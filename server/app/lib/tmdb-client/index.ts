import { MovieDb } from 'moviedb-promise';
import config from '../../init/config';

const TMDB_API_KEY = config.TMDB_API_KEY;
const moviedb = new MovieDb(TMDB_API_KEY);
