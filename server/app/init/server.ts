import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import routes from '../routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

export const startServer = () => {
  app.use(morgan('dev'));

  app.use(routes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
