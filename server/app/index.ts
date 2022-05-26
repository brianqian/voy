(async function () {
  await import('dotenv/config');
});

import { startServer } from './init/server.js';
startServer();
