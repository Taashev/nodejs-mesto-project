import { celebrate, Joi } from 'celebrate';

import { userConfig } from '../../../config/userConfig';

const { name, about } = userConfig;

export const updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(name.minlength).max(name.maxlength),
    about: Joi.string().min(about.minlength).max(about.maxlength),
  }),
});
