import Router from '@koa/router';

const router = new Router();

router.get('/example', (ctx, next) => {
  console.log('example hit');
});

export default router;
