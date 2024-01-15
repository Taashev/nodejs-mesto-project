import { Request, Response, NextFunction } from 'express';

export function authFake(req: Request, res: Response, next: NextFunction) {
  req.user = {
    id: '65a38b3a3f3d706cc7f3fdef',
  };

  next();
}
