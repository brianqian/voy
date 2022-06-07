import got from 'got';
import Bourne from '@hapi/bourne';
import * as ImdbType from '../../../@types/imdb-api';
import config from '../../init/config.js';

const BASE_PATH = 'https://imdb-api.com/api';
const API_KEY = config.IMDB_API_KEY;

const infoEndpoints = [
  'title',
  // 'report',
  'fullcast',
  'posters',
  'images',
  'trailers',
  'ratings',
  'userratings',
  'seasonepisodes',
  'externalsites',
  'wikipedia',
  'imdblist',
  'reviews',
  'metacriticreviews',
  'faq',
  'awards',
] as const;

type InfoEndpoints = typeof infoEndpoints[number];
type MediaId = `tt${string}`;

type TitleOptions =
  | 'FullActor'
  | 'FullCast'
  | 'Posters'
  | 'Images'
  | 'Trailer'
  | 'Ratings'
  | 'Wikipedia';

type ImageOptions = 'Short' | 'Full';

const buildPath = (endpoint: InfoEndpoints, id: MediaId, options?: string | number): string => {
  return `${BASE_PATH}/${endpoint}/${API_KEY}/${id}/${options ?? ''}`;
};

export async function getById<T extends ImdbType.TitleData>(
  target: 'title',
  id: MediaId,
  options?: TitleOptions[]
): Promise<T>;
export async function getById<T extends ImdbType.FullCastData>(
  target: 'fullcast',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.FullCastData>(
  target: 'fullcast',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.PosterData>(
  target: 'posters',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.ImageData>(
  target: 'images',
  id: MediaId,
  options?: ImageOptions
): Promise<T>;
export async function getById<T extends ImdbType.TrailerData>(
  target: 'trailers',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.RatingData>(
  target: 'ratings',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.UserRatingData>(
  target: 'userratings',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.SeasonEpisodeData>(
  target: 'seasonepisodes',
  id: MediaId,
  options?: number
): Promise<T>;
export async function getById<T extends ImdbType.ExternalSiteData>(
  target: 'externalsites',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.WikipediaData>(
  target: 'wikipedia',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.IMDbListData>(
  target: 'imdblist',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.ReviewData>(
  target: 'reviews',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.MetacriticReviewData>(
  target: 'metacriticreviews',
  id: MediaId
): Promise<T>;
export async function getById<T extends ImdbType.FAQData>(target: 'faq', id: MediaId): Promise<T>;
export async function getById<T extends ImdbType.AwardData>(
  target: 'awards',
  id: MediaId
): Promise<T>;
export async function getById<T>(
  target: InfoEndpoints,
  id: MediaId,
  options?: string | number | TitleOptions[]
): Promise<T> {
  const parsedOption = Array.isArray(options) ? options.join(',') : options;
  const result: T = await got(buildPath(`${target}`, id, parsedOption), {
    parseJson: (text) => Bourne.parse(text),
    responseType: 'json',
  }).json();
  return result;
}

export const infoMethods = {
  /**
   * @param options - `FullActor`, `FullCast`, `Posters`, `Images`, `Trailer`, `Ratings`, `Wikipedia`; */
  title: (id: MediaId, options?: TitleOptions[]) => getById('title', id, options),
  fullCast: (id: MediaId) => getById('fullcast', id),
  posters: (id: MediaId) => getById('posters', id),
  /**
   * @param options - `Short` (48), `Full` (All)  */
  images: (id: MediaId, options?: ImageOptions) => getById('images', id, options),
  trailers: (id: MediaId) => getById('trailers', id),
  ratings: (id: MediaId) => getById('ratings', id),
  userRatings: (id: MediaId) => getById('userratings', id),
  seasonEpisodes: (id: MediaId, seasonNum?: number) => getById('seasonepisodes', id, seasonNum),
  externalSites: (id: MediaId) => getById('externalsites', id),
  wikipedia: (id: MediaId) => getById('wikipedia', id),
  imdbList: (id: MediaId) => getById('imdblist', id),
  reviews: (id: MediaId) => getById('reviews', id),
  metacriticrReviews: (id: MediaId) => getById('metacriticreviews', id),
  faq: (id: MediaId) => getById('faq', id),
  awards: (id: MediaId) => getById('awards', id),
};
