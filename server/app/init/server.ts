import express from 'express';
import morgan from 'morgan';
import * as Services from '../services/index.js';
import routes from '../routes/index.js';
import { TMDB_EXPORT_CATEGORIES } from '../services/tmdb/import-daily-file.js';

const app = express();
const PORT = process.env.PORT || 3001;

async function doWork() {
  // await Promise.all(
  //   TMDB_EXPORT_CATEGORIES.map(async (category) => {
  //     return Services.tmdb.importExported.importTmdbDaily(category);
  //   })
  // );

  await Promise.all([
    Services.tmdb.importExported.importTmdbDaily('tv_network'),
    Services.tmdb.importExported.importTmdbDaily('production_company'),
    Services.tmdb.importExported.importTmdbDaily('tv_series'),
  ]);
}

export const startServer = () => {
  app.use(morgan('dev'));

  // console.log(fakedb);
  doWork();
  app.use(routes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
