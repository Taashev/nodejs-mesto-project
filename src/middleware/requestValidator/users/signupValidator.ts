import { celebrate, Joi } from 'celebrate';

import { userConfig } from '../../../config/userConfig';

const { name, about, avatar } = userConfig;

export const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(name.minlength).max(name.maxlength),
    about: Joi.string().min(about.minlength).max(about.maxlength),
    avatar: Joi.string().regex(avatar.regexpUrl),
  }),
});
