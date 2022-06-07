import config from '../../init/config.js';

const BASE_PATH = 'https://imdb-api.com/api';
const API_KEY = config.IMDB_API_KEY;

const otherEndpoints = [
  'Top250Movies',
  'Top250TVs',
  'MostPopularMovies',
  'MostPopularTVs',
  'InTheaters',
  'ComingSoon',
  'BoxOffice',
  'BoxOfficeAllTime',
  'Name',
  'NameAwards',
  'Company',
  'Keyword',
  'YouTubeTrailer',
  'YouTube',
  'YouTubePlaylist',
] as const;

type OtherEndpoints = typeof otherEndpoints[number];

type NameId = `nn${string}`;
type CompanyId = `co${string}`;

const otherMethods = {
  Top250Movies: () => {},
  Top250TVs: () => {},
  MostPopularMovies: () => {},
  MostPopularTVs: () => {},
  InTheaters: () => {},
  ComingSoon: () => {},
  BoxOffice: () => {},
  BoxOfficeAllTime: () => {},
  Name: () => {},
  NameAwards: () => {},
  Company: () => {},
  Keyword: () => {},
  YouTubeTrailer: () => {},
  YouTube: () => {},
  YouTubePlaylist: () => {},
};
