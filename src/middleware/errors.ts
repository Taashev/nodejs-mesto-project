import { NextFunction, Request, Response } from 'express';

import { STATUS_CODE, messageError } from '../utils/constants';

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
  const {
    statusCode = STATUS_CODE.serverError,
    message = messageError.serverError,
  } = error;

  res.status(statusCode).send({ message });
}
