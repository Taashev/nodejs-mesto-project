/* eslint-disable */
declare namespace Express {
  interface Request {
    user: string | jwt.JwtPayload;
  }
}
