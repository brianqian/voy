import { z } from 'zod';

export const TMDB_EXPORT_CATEGORIES = [
  'tv_network', // 1 - smallest -- name
  'production_company', // 2 -- name
  'tv_series', // 3 -- original_name
  'movie', // 4 -- original_name
  'person', // 5 - largest -- name
  // 'collection',
  // 'keyword',
] as const;

const TmdbExportCategoryEnum = z.enum(TMDB_EXPORT_CATEGORIES);
export type TmdbExportCategoryEnum = z.infer<typeof TmdbExportCategoryEnum>;

export const MovieItem = z.object({
  category: z.literal('movie'),
  id: z.number(),
  original_title: z.string(),
  popularity: z.number(),
});
export type MovieItem = z.infer<typeof MovieItem>;

export const TvItem = z.object({
  category: z.literal('tv_series'),
  id: z.number(),
  original_name: z.string(),
  popularity: z.number(),
});
export type TvItem = z.infer<typeof TvItem>;

export const NetworkItem = z.object({
  category: z.literal('tv_network'),
  id: z.number(),
  name: z.string(),
});

export type NetworkItem = z.infer<typeof NetworkItem>;

export const CompanyItem = z.object({
  category: z.literal('production_company'),
  id: z.number(),
  name: z.string(),
});

export type CompanyItem = z.infer<typeof CompanyItem>;

export const PersonItem = z.object({
  category: z.literal('person'),
  id: z.number(),
  name: z.string(),
  popularity: z.number(),
});

export type PersonItem = z.infer<typeof PersonItem>;

export type ExportLineItem = MovieItem | CompanyItem | TvItem | PersonItem | NetworkItem;
