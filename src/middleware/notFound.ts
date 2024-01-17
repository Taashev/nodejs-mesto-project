import { Request, Response, NextFunction } from 'express';

import { NotFoundError } from '../components/NotFoundError';

import { messageError } from '../utils/constants';

export const handlerNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundError(messageError.notFound));
};
