import { celebrate, Joi } from 'celebrate';

import { userConfig } from '../../../models/user/userConfig';

const { password } = userConfig;

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(password.minlength),
  }),
});
