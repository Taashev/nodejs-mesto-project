import dotenv from 'dotenv';

dotenv.config();

const {
  HOST_NAME = 'localhost',
  PORT = '3000',
  DB_NAME = 'mestodb',
  SECRET_KEY = 'secret-key',
  NODE_ENV = 'development',
} = process.env;

/** @cookie max age 7d */
const COOKIE_MAX_AGE = 3_600_000 * 24 * 7; // 7d

/** @token expires in 7 day */
const TOKEN_EXPIRES_IN = '7d';

/** @salt length 10 */
const SALT_LENGTH = 10;

export {
  HOST_NAME,
  PORT,
  DB_NAME,
  NODE_ENV,
  SECRET_KEY,
  COOKIE_MAX_AGE,
  TOKEN_EXPIRES_IN,
  SALT_LENGTH,
};
