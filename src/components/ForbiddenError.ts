import { HttpError } from './HttpError';

import { STATUS_CODE } from '../utils/constants';

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_CODE.forbidden;
  }
}
