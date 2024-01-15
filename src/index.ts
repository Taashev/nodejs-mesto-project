import express from 'express';
import mongoose from 'mongoose';

import { config } from './config';
import { router } from './routes';
import { allLogger, infoLogger, warnLogger, errorLogger } from './utils/logger';

import { authFake } from './middleware/authFake';
import { validationError } from './utils/validationError';
import { handleErrors } from './middleware/errors';

(async function app() {
  const server = express();

  const { PORT, NODE_ENV, MONGODB_URL, DB_NAME } = config;

  mongoose.connect(MONGODB_URL + DB_NAME);

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(allLogger);
  server.use(infoLogger);
  server.use(warnLogger);

  server.use(authFake);

  server.use('/', router);

  server.use(errorLogger);

  server.use(validationError, handleErrors);

  server.listen(Number(PORT), 'localhost', () => {
    if (NODE_ENV !== 'production') {
      // отключить eslint для вывода инфы в консоль в режиме разработки
      /* eslint-disable no-console */
      console.log('server is running in development mode');
      console.log('PORT: ', PORT);
      console.log('PID: ', process.pid);
    }
  });
})();
