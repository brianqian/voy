import { SearchData } from '../../@types/imdb-api';
import { SearchEndpoints, SearchMethod, searchMethods } from './search';
import { infoMethods } from './title';

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

type otherEndpoints = typeof otherEndpoints[number];
type OtherMethod = (queryVal: string) => Promise<SearchData>;

class ImdbApi {
  search: Record<SearchEndpoints, SearchMethod>;
  info: typeof infoMethods;
  constructor() {
    this.search = searchMethods;
    this.info = infoMethods;
  }
}

export const imdbApi = new ImdbApi();
