import { HttpError } from './HttpError';

import { STATUS_CODE } from '../utils/constants';

export class ServerError extends HttpError {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    this.statusCode = statusCode || STATUS_CODE.serverError;
  }
}
