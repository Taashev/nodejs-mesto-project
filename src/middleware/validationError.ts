import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../components/HttpError';
import { ServerError } from '../components/ServerError';
import { ConflictError } from '../components/ConflictError';
import { UnauthorizedError } from '../components/UnauthorizedError';

import { messageError } from '../utils/constants';

export function validationError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof HttpError) {
    return next(error);
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return next(new ConflictError(messageError.userConflictEmail));
  }

  if (error.name === 'JsonWebTokenError') {
    return next(new UnauthorizedError(messageError.tokenError));
  }

  if (error.name === 'ValidationError' && !!error?.errors?.email) {
    return next(new HttpError(messageError.emailError));
  }

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return next(new HttpError(messageError.badRequest));
  }

  if (error.name === 'SyntaxError') {
    return next(new HttpError(messageError.syntaxError));
  }

  return next(new ServerError(messageError.serverError));
}
