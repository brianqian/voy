import { SearchEndpoints, SearchMethod, searchMethods } from './search.js';
import { infoMethods } from './title.js';
class ImdbApi {
  search: Record<SearchEndpoints, SearchMethod>;
  info: typeof infoMethods;
  constructor() {
    this.search = searchMethods;
    this.info = infoMethods;
  }
}

export const imdbApi = new ImdbApi();
