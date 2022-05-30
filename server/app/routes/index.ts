import Router from '@koa/router';
import exampleRouter from './example/example-routes.js';
import { imdbApi } from '../lib/imdb-client/index.js';

const router = new Router();

router.get('/', async (ctx, next) => {
  const result = await imdbApi.search.movie('avatar');
  console.log(result);
  return;
});

export { exampleRouter, router as rootRouter };
