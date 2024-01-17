import { NextFunction, Request, Response } from 'express';

export function handleErrors(
  error: any,
  req: Request,
  res: Response,
  // отключить ошибку eslint на неиспользуемое поле next
  // в middleware на ошибки нам необходимо добавить этот 4-й агрумент для корректной работы
  // но использовать его не нужно
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) {
  res.status(error.statusCode).send({ message: error.message });
}
