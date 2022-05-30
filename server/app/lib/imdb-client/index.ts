import { SearchEndpoints, SearchMethod, searchMethods } from './search';
import { infoMethods } from './title';
class ImdbApi {
  search: Record<SearchEndpoints, SearchMethod>;
  info: typeof infoMethods;
  constructor() {
    this.search = searchMethods;
    this.info = infoMethods;
  }
}

export const imdbApi = new ImdbApi();
