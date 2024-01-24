import { Schema, model } from 'mongoose';
import validator from 'validator';

import { messageError } from '../utils/constants';

import { userConfig } from '../config/userConfig';
import { UserType } from '../types/model/user.d';

const { name, about, avatar } = userConfig;

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    minlength: name.minlength,
    maxlength: name.maxlength,
    default: name.default,
  },
  about: {
    type: String,
    minlength: about.minlength,
    maxlength: about.maxlength,
    default: about.default,
  },
  avatar: {
    type: String,
    validate: {
      validator(url: string) {
        return avatar.regexpUrl.test(url);
      },
      message: messageError.badRequest,
    },
    default: avatar.default,
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
  },
});

export const User = model<UserType>('user', userSchema);
