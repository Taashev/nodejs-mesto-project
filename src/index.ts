import express from 'express';

import { config } from './config';

(async function app() {
  const server = express();

  const { PORT, NODE_ENV } = config;

  server.listen(Number(PORT), '127.0.0.1', () => {
    if (NODE_ENV !== 'production') {
      // отключить eslint для вывода в консоль инфы в режиме разработки
      /* eslint-disable no-console */
      console.log('server is running in development mode');
      console.log('PORT: ', PORT);
      console.log('PID: ', process.pid);
    }
  });
})();
