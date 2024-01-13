const {
  PORT = '3000',
  NODE_ENV,
  MONGODB_URL = 'mongodb://localhost:27017/',
  DB_NAME = 'mestodb',
} = process.env;

export const config = { PORT, NODE_ENV, MONGODB_URL, DB_NAME };
