import { STATUS_CODE } from '../utils/constants';

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || STATUS_CODE.badRequest;
  }
}
