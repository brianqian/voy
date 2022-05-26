import Router from '@koa/router';
import exampleRouter from './example/example-routes.js';
import Bourne from '@hapi/bourne';
import got from 'got';

const router = new Router();

router.get('/', async (ctx, next) => {
  const result = await got
    .get(`https://imdb-api.com/api/searchmovie/${process.env.IMDB_API_KEY}/avatar`, {
      parseJson: (text) => Bourne.parse(text),
    })
    .json();
  console.log(result, typeof result);
});

export { exampleRouter, router as rootRouter };
