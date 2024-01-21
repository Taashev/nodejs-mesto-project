const {
  PORT = '3000',
  DB_NAME = 'mestodb',
  SECRET_KEY = 'secret-key',
  NODE_ENV,
} = process.env;

export { PORT, DB_NAME, NODE_ENV, SECRET_KEY };
