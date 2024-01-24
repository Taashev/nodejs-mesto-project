import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../components/UnauthorizedError';

import { SECRET_KEY } from '../config/appConfig';
import { messageError } from '../utils/constants';

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new UnauthorizedError(messageError.tokenError);
    }

    req.user = jwt.verify(token, SECRET_KEY);

    next();
  } catch (err) {
    next(err);
  }
}
