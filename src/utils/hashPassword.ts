import bcrypt from 'bcryptjs';

import { HttpError } from '../components/HttpError';

import { SALT_LENGTH } from '../config/appConfig';

import { messageError } from './constants';

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT_LENGTH);
  } catch (_) {
    throw new HttpError(messageError.badRequest);
  }
}
