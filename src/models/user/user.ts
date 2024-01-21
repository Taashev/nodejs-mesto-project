import mongoose from 'mongoose';
import validator from 'validator';

import { messageError } from '../../utils/constants';

import { UserType } from './user.d';

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: messageError.emailError,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 3,
  },
});

export const User = mongoose.model<UserType>('user', userSchema);
