const { PORT = '3000', DB_NAME = 'mestodb', NODE_ENV } = process.env;

export const config = { PORT, NODE_ENV, DB_NAME };
