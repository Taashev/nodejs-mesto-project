import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

import {
  errorTransportDailyRotateFile,
  warnTransportDailyRotateFile,
  infoTransportDailyRotateFile,
  allTransportDailyRotateFile,
} from './transports';

expressWinston.bodyBlacklist.push('email', 'password');

export const errorLogger = expressWinston.errorLogger({
  transports: [errorTransportDailyRotateFile],
});

export const warnLogger = expressWinston.logger({
  transports: [warnTransportDailyRotateFile],
});

export const infoLogger = expressWinston.logger({
  transports: [infoTransportDailyRotateFile],
});

export const allLogger = expressWinston.logger({
  transports: [allTransportDailyRotateFile],
});
