import got from 'got';
import Bourne from '@hapi/bourne';
import { SearchData } from '../../../@types/imdb-api';
import config from '../../init/config';

const BASE_PATH = 'https://imdb-api.com/api';
const API_KEY = config.IMDB_API_KEY;

const searchEndpoints = [
  'movie',
  'title',
  'series',
  'name',
  'episode',
  'company',
  'keyword',
  'all',
] as const;
export type SearchEndpoints = typeof searchEndpoints[number];
export type SearchMethod = (queryVal: string) => Promise<SearchData>;

const buildPath = (endpoint: string, queryValue: string): string => {
  return `${BASE_PATH}/${endpoint}/${API_KEY}/${queryValue}`;
};

const searchBuilder = (target: SearchEndpoints): SearchMethod => {
  return async (queryValue: string) => {
    const result: SearchData = await got(buildPath(`Search${target}`, queryValue), {
      parseJson: (text) => Bourne.parse(text),
      responseType: 'json',
    }).json();
    return result;
  };
};

export const searchMethods = searchEndpoints.reduce((acc, endpoint) => {
  acc[endpoint] = searchBuilder(endpoint);
  return acc;
}, {} as Record<SearchEndpoints, SearchMethod>);
