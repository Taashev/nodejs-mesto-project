import jwt from 'jsonwebtoken';

import { SECRET_KEY, TOKEN_EXPIRES_IN } from '../config/appConfig';

export function getToken(payload: string | object | Buffer): string {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRES_IN,
  });
}
