import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../components/HttpError';
import { ServerError } from '../components/ServerError';

import { messageError } from './constants';

export function validationError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof HttpError) {
    return next(error);
  }

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return next(new HttpError(messageError.badRequest));
  }

  return next(new ServerError(messageError.serverError));
}
