import path from 'path';
import winston from 'winston';

import {
  errorFilter,
  warnFilter,
  infoFilter,
  handleTimestamp,
} from './handlers';

const DATA_PATTERN_DEFAULT = 'YYYY-MM-DD';
const MAX_SIZE_20M = '20m';
const MAX_FILES_1D = '1d';
const MAX_FILES_14D = '14d';
const MAX_FILES_30D = '30d';

export const errorTransportDailyRotateFile =
  new winston.transports.DailyRotateFile({
    level: 'error',
    filename: path.join('logs', 'error.log'),
    json: true,
    format: winston.format.combine(
      errorFilter(),
      winston.format.errors({ stack: true }),
      winston.format.timestamp({ format: handleTimestamp() }),
      winston.format.json(),
      winston.format.align(),
    ),
  });

export const warnTransportDailyRotateFile =
  new winston.transports.DailyRotateFile({
    level: 'warn',
    filename: path.join('logs', 'warn.log'),
    datePattern: DATA_PATTERN_DEFAULT,
    maxSize: MAX_SIZE_20M,
    maxFiles: MAX_FILES_30D,
    format: winston.format.combine(
      warnFilter(),
      winston.format.timestamp({ format: handleTimestamp() }),
      winston.format.json(),
      winston.format.align(),
    ),
  });

export const infoTransportDailyRotateFile =
  new winston.transports.DailyRotateFile({
    level: 'info',
    filename: path.join('logs', 'info.log'),
    datePattern: DATA_PATTERN_DEFAULT,
    maxSize: MAX_SIZE_20M,
    maxFiles: MAX_FILES_14D,
    format: winston.format.combine(
      infoFilter(),
      winston.format.timestamp({ format: handleTimestamp() }),
      winston.format.json(),
      winston.format.align(),
    ),
  });

export const allTransportDailyRotateFile =
  new winston.transports.DailyRotateFile({
    filename: path.join('logs', 'all.log'),
    datePattern: DATA_PATTERN_DEFAULT,
    maxSize: MAX_SIZE_20M,
    maxFiles: MAX_FILES_1D,
    format: winston.format.combine(
      winston.format.timestamp({ format: handleTimestamp() }),
      winston.format.json(),
      winston.format.align(),
    ),
  });
