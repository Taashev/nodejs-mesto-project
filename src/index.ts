import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import celebrate from 'celebrate';

import { PORT, DB_NAME, NODE_ENV } from './config';
import { router } from './routes';
import {
  allLogger,
  infoLogger,
  warnLogger,
  errorLogger,
} from './middleware/logger';

import { validationError } from './middleware/validationError';
import { handleErrors } from './middleware/errors';

(async function app() {
  const server = express();

  mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(cookieParser());

  server.use(allLogger);
  server.use(infoLogger);
  server.use(warnLogger);

  server.use('/', router);

  server.use(errorLogger);

  server.use(celebrate.errors());

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
