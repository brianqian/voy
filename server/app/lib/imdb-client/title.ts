import got from 'got';
import Bourne from '@hapi/bourne';
import * as ImdbType from '../../@types/imdb-api';

const BASE_PATH = 'https://imdb-api.com/api';
const API_KEY = process.env.IMDB_API_KEY;

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

const buildPath = (endpoint: InfoEndpoints, id: MediaId, options?: string): string => {
  return `${BASE_PATH}/${endpoint}/${API_KEY}/${id}/${options || ''}`;
};

export async function getById<T extends ImdbType.TitleData>(
  target: 'title',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.FullCastData>(
  target: 'fullcast',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.FullCastData>(
  target: 'fullcast',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.PosterData>(
  target: 'posters',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.ImageData>(
  target: 'images',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.TrailerData>(
  target: 'trailers',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.RatingData>(
  target: 'ratings',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.UserRatingData>(
  target: 'userratings',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.SeasonEpisodeData>(
  target: 'seasonepisodes',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.ExternalSiteData>(
  target: 'externalsites',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.WikipediaData>(
  target: 'wikipedia',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.IMDbListData>(
  target: 'imdblist',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.ReviewData>(
  target: 'reviews',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.MetacriticReviewData>(
  target: 'metacriticreviews',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.FAQData>(
  target: 'faq',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T extends ImdbType.AwardData>(
  target: 'awards',
  id: MediaId,
  options?: string
): Promise<T>;
export async function getById<T>(target: InfoEndpoints, id: MediaId, options?: string): Promise<T> {
  const result: T = await got(buildPath(`${target}`, id, options), {
    parseJson: (text) => Bourne.parse(text),
    responseType: 'json',
  }).json();
  return result;
}

export const infoMethods = {
  title: (id: MediaId, options?: string) => getById('title', id, options),
  fullst: (id: MediaId, options?: string) => getById('fullcast', id, options),
  posters: (id: MediaId, options?: string) => getById('posters', id, options),
  images: (id: MediaId, options?: string) => getById('images', id, options),
  trailers: (id: MediaId, options?: string) => getById('trailers', id, options),
  ratings: (id: MediaId, options?: string) => getById('ratings', id, options),
  userRatings: (id: MediaId, options?: string) => getById('userratings', id, options),
  seasonEpisodes: (id: MediaId, options?: string) => getById('seasonepisodes', id, options),
  externalSites: (id: MediaId, options?: string) => getById('externalsites', id, options),
  wikipedia: (id: MediaId, options?: string) => getById('wikipedia', id, options),
  imdbList: (id: MediaId, options?: string) => getById('imdblist', id, options),
  reviews: (id: MediaId, options?: string) => getById('reviews', id, options),
  metacriticrReviews: (id: MediaId, options?: string) => getById('metacriticreviews', id, options),
  faq: (id: MediaId, options?: string) => getById('faq', id, options),
  awards: (id: MediaId, options?: string) => getById('awards', id, options),
};
