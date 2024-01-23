import { celebrate, Joi } from 'celebrate';

import { userConfig } from '../../../models/user/userConfig';

const { name, about, avatar, password } = userConfig;

export const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(password.minlength),
    name: Joi.string().min(name.minlength).max(name.maxlength),
    about: Joi.string().min(about.minlength).max(about.maxlength),
    avatar: Joi.string().regex(avatar.regexpUrl),
  }),
});
