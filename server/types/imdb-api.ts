/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ActorShort {
  id?: string | null;
  image?: string | null;
  name?: string | null;
  asCharacter?: string | null;
}

export interface AwardData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  description?: string | null;
  items?: AwardEvent[] | null;
  awardsHtml?: string | null;
  errorMessage?: string | null;
}

export interface AwardEvent {
  eventTitle?: string | null;
  eventYear?: string | null;
  outcomeItems?: AwardOutcome[] | null;
}

export interface AwardOutcome {
  outcomeTitle?: string | null;
  outcomeCategory?: string | null;
  outcomeDetails?: AwardOutcomeDetail[] | null;
}

export interface AwardOutcomeDetail {
  plainText?: string | null;
  html?: string | null;
}

export interface BoxOfficeAllTimeData {
  items?: BoxOfficeAllTimeDataDetail[] | null;
  errorMessage?: string | null;
}

export interface BoxOfficeAllTimeDataDetail {
  id?: string | null;
  rank?: string | null;
  title?: string | null;
  worldwideLifetimeGross?: string | null;
  domesticLifetimeGross?: string | null;
  domestic?: string | null;
  foreignLifetimeGross?: string | null;
  foreign?: string | null;
  year?: string | null;
}

export interface BoxOfficeShort {
  budget?: string | null;
  openingWeekendUSA?: string | null;
  grossUSA?: string | null;
  cumulativeWorldwideGross?: string | null;
}

export interface BoxOfficeWeekendData {
  items?: BoxOfficeWeekendDataDetail[] | null;
  errorMessage?: string | null;
}

export interface BoxOfficeWeekendDataDetail {
  id?: string | null;
  rank?: string | null;
  title?: string | null;
  image?: string | null;
  weekend?: string | null;
  gross?: string | null;
  weeks?: string | null;
}

export interface CastMovie {
  id?: string | null;
  role?: string | null;
  title?: string | null;
  year?: string | null;
  description?: string | null;
}

export interface CastShort {
  job?: string | null;
  items?: CastShortItem[] | null;
}

export interface CastShortItem {
  id?: string | null;
  name?: string | null;
  description?: string | null;
}

export interface CompanyData {
  id?: string | null;
  name?: string | null;
  items?: MovieShort[] | null;
  errorMessage?: string | null;
}

export interface CompanyShort {
  id?: string | null;
  name?: string | null;
}

export interface EpisodeShortDetail {
  id?: string | null;
  seasonNumber?: string | null;
  episodeNumber?: string | null;
  title?: string | null;
  image?: string | null;
  year?: string | null;
  released?: string | null;
  plot?: string | null;
  imDbRating?: string | null;
  imDbRatingCount?: string | null;
}

export interface ExternalSiteData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  officialWebsite?: string | null;
  imDb?: ExternalSiteItem;
  theMovieDb?: ExternalSiteItem;
  rottenTomatoes?: ExternalSiteItem;
  metacritic?: ExternalSiteItem;
  netflix?: ExternalSiteItem;
  googlePlay?: ExternalSiteItem;
  filmAffinity?: ExternalSiteItem;
  freebase?: ExternalSiteItem;
  gnd?: ExternalSiteItem;
  viaf?: ExternalSiteItem;
  alloCine?: ExternalSiteItem;
  allMovie?: ExternalSiteItem;
  port?: ExternalSiteItem;
  dnf?: ExternalSiteItem;
  movieMeter?: ExternalSiteItem;
  boxOfficeMojo?: ExternalSiteItem;
  csfd?: ExternalSiteItem;
  kinenote?: ExternalSiteItem;
  allcinema?: ExternalSiteItem;
  kinopoisk?: ExternalSiteItem;
  elonet?: ExternalSiteItem;
  ldiF?: ExternalSiteItem;
  cineplex?: ExternalSiteItem;
  eDb?: ExternalSiteItem;
  elCinema?: ExternalSiteItem;
  scope_dk?: ExternalSiteItem;
  swedishFilmDatabaseFilm?: ExternalSiteItem;
  elFilm?: ExternalSiteItem;
  ofDb?: ExternalSiteItem;
  openMediaDatabase?: ExternalSiteItem;
  quoraTopic?: ExternalSiteItem;
  cinema_de?: ExternalSiteItem;
  deutscheSynchronkartei?: ExternalSiteItem;
  movieWalker?: ExternalSiteItem;
  tvGuide?: ExternalSiteItem;
  filmweb_pl?: ExternalSiteItem;
  tV_com?: ExternalSiteItem;
  isan?: ExternalSiteItem;
  eidr?: ExternalSiteItem;
  afiCatalogOfFeature?: ExternalSiteItem;
  theNumbers?: ExternalSiteItem;
  tcmMovieDatabase?: ExternalSiteItem;
  cine_gr?: ExternalSiteItem;
  bfiNationalArchive?: ExternalSiteItem;
  exploitationVisa?: ExternalSiteItem;
  sratim?: ExternalSiteItem;
  cineRessources?: ExternalSiteItem;
  cinemathequeQuebecoise?: ExternalSiteItem;
  encyclopaediaBritannicaOnline?: ExternalSiteItem;
  bechdelTestMovieList?: ExternalSiteItem;
  movieplayer_it?: ExternalSiteItem;
  mYmovies?: ExternalSiteItem;
  cinematografo?: ExternalSiteItem;
  lumiere?: ExternalSiteItem;
  bfi?: ExternalSiteItem;
  prisma?: ExternalSiteItem;
  cineMagia?: ExternalSiteItem;
  daum?: ExternalSiteItem;
  douban?: ExternalSiteItem;
  museumOfModernArt?: ExternalSiteItem;
  ilMondoDeiDoppiatori?: ExternalSiteItem;
  fandango?: ExternalSiteItem;
  moviepilot_de?: ExternalSiteItem;
  sudocAuthorities?: ExternalSiteItem;
  bibliothequeNationaleDeFrance?: ExternalSiteItem;
  siamzone?: ExternalSiteItem;
  academyAwardsDatabase?: ExternalSiteItem;
  knowYourMeme?: ExternalSiteItem;
  theEncyclopediaOfScienceFiction?: ExternalSiteItem;
  letterboxd?: ExternalSiteItem;
  comicVine?: ExternalSiteItem;
  theTVDB?: ExternalSiteItem;
  tvSpielfilmSeries?: ExternalSiteItem;
  wikipediaUrls?: LanguageUrl[] | null;
  errorMessage?: string | null;
}

export interface ExternalSiteItem {
  id?: string | null;
  url?: string | null;
}

export interface FAQData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  items?: FAQDetail[] | null;
  spoilerItems?: FAQDetail[] | null;
  errorMessage?: string | null;
}

export interface FAQDetail {
  question?: string | null;
  answer?: string | null;
}

export interface FullCastData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  directors?: CastShort;
  writers?: CastShort;
  actors?: ActorShort[] | null;
  others?: CastShort[] | null;
  errorMessage?: string | null;
}

export interface ImageData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  items?: ImageDataDetail[] | null;
  errorMessage?: string | null;
}

export interface ImageDataDetail {
  title?: string | null;
  image?: string | null;
}

export interface IMDbListData {
  title?: string | null;
  by?: string | null;
  created?: string | null;
  updated?: string | null;
  description?: string | null;
  items?: IMDbListDataDetail[] | null;
  errorMessage?: string | null;
}

export interface IMDbListDataDetail {
  id?: string | null;
  index?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  year?: string | null;
  image?: string | null;
  imDbRating?: string | null;
  imDbRatingCount?: string | null;
  description?: string | null;
}

export interface KeyValueItem {
  key?: string | null;
  value?: string | null;
}

export interface KeywordData {
  keyword?: string | null;
  items?: MovieShort[] | null;
  errorMessage?: string | null;
}

export interface KnownFor {
  id?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  year?: string | null;
  role?: string | null;
  image?: string | null;
}

export interface LanguageUrl {
  language?: string | null;
  title?: string | null;
  url?: string | null;
}

export interface MetacriticReviewData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  items?: MetacriticReviewDetail[] | null;
  errorMessage?: string | null;
}

export interface MetacriticReviewDetail {
  publisher?: string | null;
  author?: string | null;
  link?: string | null;
  rate?: string | null;
  content?: string | null;
}

export interface MostPopularData {
  items?: MostPopularDataDetail[] | null;
  errorMessage?: string | null;
}

export interface MostPopularDataDetail {
  id?: string | null;
  rank?: string | null;
  rankUpDown?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  year?: string | null;
  image?: string | null;
  crew?: string | null;
  imDbRating?: string | null;
  imDbRatingCount?: string | null;
}

export interface MovieShort {
  id?: string | null;
  title?: string | null;
  year?: string | null;
  image?: string | null;
  imDbRating?: string | null;
}

export interface NameAwardData {
  imDbId?: string | null;
  name?: string | null;
  description?: string | null;
  items?: NameAwardEvent[] | null;
  nameAwardsHtml?: string | null;
  errorMessage?: string | null;
}

export interface NameAwardEvent {
  eventTitle?: string | null;
  outcomeItems?: NameAwardOutcome[] | null;
}

export interface NameAwardOutcome {
  outcomeYear?: string | null;
  outcomeTitle?: string | null;
  outcomeCategory?: string | null;
  outcomeDetails?: NameAwardOutcomeDetail[] | null;
}

export interface NameAwardOutcomeDetail {
  plainText?: string | null;
  html?: string | null;
}

export interface NameData {
  id?: string | null;
  name?: string | null;
  role?: string | null;
  image?: string | null;
  summary?: string | null;
  birthDate?: string | null;
  deathDate?: string | null;
  awards?: string | null;
  height?: string | null;
  knownFor?: KnownFor[] | null;
  castMovies?: CastMovie[] | null;
  errorMessage?: string | null;
}

export interface NewMovieData {
  items?: NewMovieDataDetail[] | null;
  errorMessage?: string | null;
}

export interface NewMovieDataDetail {
  id?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  year?: string | null;
  releaseState?: string | null;
  image?: string | null;
  runtimeMins?: string | null;
  runtimeStr?: string | null;
  plot?: string | null;
  contentRating?: string | null;
  imDbRating?: string | null;
  imDbRatingCount?: string | null;
  metacriticRating?: string | null;
  genres?: string | null;
  genreList?: KeyValueItem[] | null;
  directors?: string | null;
  directorList?: StarShort[] | null;
  stars?: string | null;
  starList?: StarShort[] | null;
}

export interface PosterData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  posters?: PosterDataItem[] | null;
  backdrops?: PosterDataItem[] | null;
  errorMessage?: string | null;
}

export interface PosterDataItem {
  id?: string | null;
  link?: string | null;

  /** @format double */
  aspectRatio?: number;
  language?: string | null;

  /** @format int32 */
  width?: number;

  /** @format int32 */
  height?: number;
}

export interface RatingData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  imDb?: string | null;
  metacritic?: string | null;
  theMovieDb?: string | null;
  rottenTomatoes?: string | null;
  filmAffinity?: string | null;
  errorMessage?: string | null;
}

export interface ReviewData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  items?: ReviewDetail[] | null;
  errorMessage?: string | null;
}

export interface ReviewDetail {
  username?: string | null;
  userUrl?: string | null;
  reviewLink?: string | null;
  warningSpoilers?: boolean;
  date?: string | null;
  rate?: string | null;
  helpful?: string | null;
  title?: string | null;
  content?: string | null;
}

export interface SearchData {
  searchType: string;
  expression: string;
  results?: SearchResult[] | null;
  errorMessage?: string | null;
}

export interface SearchResult {
  id?: string | null;
  resultType?: string | null;
  image?: string | null;
  title?: string | null;
  description?: string | null;
}

export interface SeasonEpisodeData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  episodes?: EpisodeShortDetail[] | null;
  errorMessage?: string | null;
}

export interface SimilarShort {
  id?: string | null;
  title?: string | null;
  image?: string | null;
  imDbRating?: string | null;
}

export interface StarShort {
  id?: string | null;
  name?: string | null;
}

export interface SubtitleData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  subtitles?: SubtitleDataDetail[] | null;
  errorMessage?: string | null;
}

export interface SubtitleDataDetail {
  /** @format int32 */
  seasonNumber?: number | null;
  id?: string | null;
  rate?: string | null;
  title?: string | null;
  owner?: string | null;
  comment?: string | null;
  link?: string | null;
}

export interface TitleData {
  id?: string | null;
  title?: string | null;
  originalTitle?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  image?: string | null;
  releaseDate?: string | null;
  runtimeMins?: string | null;
  runtimeStr?: string | null;
  plot?: string | null;
  plotLocal?: string | null;
  plotLocalIsRtl?: boolean;
  awards?: string | null;
  directors?: string | null;
  directorList?: StarShort[] | null;
  writers?: string | null;
  writerList?: StarShort[] | null;
  stars?: string | null;
  starList?: StarShort[] | null;
  actorList?: ActorShort[] | null;
  fullCast?: FullCastData;
  genres?: string | null;
  genreList?: KeyValueItem[] | null;
  companies?: string | null;
  companyList?: CompanyShort[] | null;
  countries?: string | null;
  countryList?: KeyValueItem[] | null;
  languages?: string | null;
  languageList?: KeyValueItem[] | null;
  contentRating?: string | null;
  imDbRating?: string | null;
  imDbRatingVotes?: string | null;
  metacriticRating?: string | null;
  ratings?: RatingData;
  wikipedia?: WikipediaData;
  posters?: PosterData;
  images?: ImageData;
  trailer?: TrailerData;
  boxOffice?: BoxOfficeShort;
  tagline?: string | null;
  keywords?: string | null;
  keywordList?: string[] | null;
  similars?: SimilarShort[] | null;
  tvSeriesInfo?: TvSeriesInfo;
  tvEpisodeInfo?: TvEpisodeInfo;
  errorMessage?: string | null;
}

export interface Top250Data {
  items?: Top250DataDetail[] | null;
  errorMessage?: string | null;
}

export interface Top250DataDetail {
  id?: string | null;
  rank?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  year?: string | null;
  image?: string | null;
  crew?: string | null;
  imDbRating?: string | null;
  imDbRatingCount?: string | null;
}

export interface TrailerData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  videoId?: string | null;
  videoTitle?: string | null;
  videoDescription?: string | null;
  thumbnailUrl?: string | null;
  uploadDate?: string | null;
  link?: string | null;
  linkEmbed?: string | null;
  errorMessage?: string | null;
}

export interface TvEpisodeInfo {
  seriesId?: string | null;
  seriesTitle?: string | null;
  seriesFullTitle?: string | null;
  seriesYear?: string | null;
  seriesYearEnd?: string | null;
  seasonNumber?: string | null;
  episodeNumber?: string | null;
  previousEpisodeId?: string | null;
  nextEpisodeId?: string | null;
}

export interface TvSeriesInfo {
  yearEnd?: string | null;
  creators?: string | null;
  creatorList?: StarShort[] | null;
  seasons?: string[] | null;
}

export interface UsageData {
  /** @format int32 */
  count?: number;

  /** @format int32 */
  maximum?: number;
  account?: string | null;
  expireDate?: string | null;
  errorMessage?: string | null;
}

export interface UserRatingData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  totalRating?: string | null;
  totalRatingVotes?: string | null;
  ratings?: UserRatingDataDetail[] | null;
  demographicAll?: UserRatingDataDemographic;
  demographicMales?: UserRatingDataDemographic;
  demographicFemales?: UserRatingDataDemographic;
  top1000Voters?: UserRatingDataDemographicDetail;
  usUsers?: UserRatingDataDemographicDetail;
  nonUSUsers?: UserRatingDataDemographicDetail;
  errorMessage?: string | null;
}

export interface UserRatingDataDemographic {
  allAges?: UserRatingDataDemographicDetail;
  agesUnder18?: UserRatingDataDemographicDetail;
  ages18To29?: UserRatingDataDemographicDetail;
  ages30To44?: UserRatingDataDemographicDetail;
  agesOver45?: UserRatingDataDemographicDetail;
}

export interface UserRatingDataDemographicDetail {
  rating?: string | null;
  votes?: string | null;
}

export interface UserRatingDataDetail {
  rating?: string | null;
  percent?: string | null;
  votes?: string | null;
}

export interface WikipediaData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  language?: string | null;
  titleInLanguage?: string | null;
  url?: string | null;
  plotShort?: WikipediaDataPlot;
  plotFull?: WikipediaDataPlot;
  errorMessage?: string | null;
}

export interface WikipediaDataPlot {
  plainText?: string | null;
  html?: string | null;
}

export interface YouTubeData {
  videoId: string;
  title?: string | null;
  description?: string | null;
  duration?: string | null;
  uploadDate?: string | null;
  image?: string | null;
  videos?: YouTubeDataItem[] | null;
  errorMessage?: string | null;
}

export interface YouTubeDataItem {
  quality?: string | null;
  mimeType?: string | null;
  extension?: string | null;
  url?: string | null;
}

export interface YouTubePlaylistData {
  title?: string | null;
  auhtor?: string | null;
  videos?: YouTubePlaylistDataItem[] | null;
  errorMessage?: string | null;
}

export interface YouTubePlaylistDataItem {
  videoId?: string | null;
  title?: string | null;
  description?: string | null;
  duration?: string | null;
  uploadDate?: string | null;
  image?: string | null;
  url?: string | null;
}

export interface YouTubeTrailerData {
  imDbId?: string | null;
  title?: string | null;
  fullTitle?: string | null;
  type?: string | null;
  year?: string | null;
  videoId?: string | null;
  videoUrl?: string | null;
  errorMessage?: string | null;
}
