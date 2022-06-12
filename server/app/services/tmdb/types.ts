export const TMDB_EXPORT_CATEGORIES = [
  'tv_network', // 1 - smallest -- name
  'production_company', // 2 -- name
  'tv_series', // 3 -- original_name
  'movie', // 4 -- original_name
  'person', // 5 - largest -- name
  // 'collection',
  // 'keyword',
] as const;
export type CategoryName = typeof TMDB_EXPORT_CATEGORIES[number];
export interface TVOrMovieItem {
  id: number;
  original_name: string;
}

export interface NonTVOrMovieItem {
  id: number;
  name: string;
}
export type ExportLineItem = TVOrMovieItem | NonTVOrMovieItem;

export const isTvOrMovieItem = (item: ExportLineItem): item is TVOrMovieItem => {
  return 'original_name' in item;
};
