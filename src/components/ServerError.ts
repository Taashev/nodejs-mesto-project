import { HttpError } from './HttpError';

export class ServerError extends HttpError {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode);
    this.statusCode = statusCode || 500;
  }
}
