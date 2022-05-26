import 'dotenv/config';
import morgan from 'koa-morgan';
import Koa from 'koa';
import { exampleRouter, rootRouter } from '../routes/index.js';

const PORT = process.env.PORT || 3001;

export const startServer = () => {
  const app = new Koa();

  app.use(morgan('dev'));

  app.use(rootRouter.routes());
  app.use(exampleRouter.routes());

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
