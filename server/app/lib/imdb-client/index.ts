import got, { Options } from 'got';
import Bourne from '@hapi/bourne';

const options = new Options({
  prefixUrl: 'https://imdb-api.com/api',
  parseJson: (text) => Bourne.parse(text),
  responseType: 'json',
});

const client = got.extend(options);
const API_KEY = process.env.IMDB_API_KEY;

const searchForMovie = async (param: string) => {
  const result = await client('/searchmovie/');
};
