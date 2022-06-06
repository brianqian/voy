import Router from '@koa/router';
import * as Controller from '../../controllers/auth.controller';

const router = new Router({
  prefix: '/auth',
});

router.post('/sign-up', Controller.createUser);

router.post('/login', Controller.nativeLogin);

export default router;
