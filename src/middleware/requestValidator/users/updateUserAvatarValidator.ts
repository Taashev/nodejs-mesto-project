import { celebrate, Joi } from 'celebrate';

import { userConfig } from '../../../config/userConfig';

const { avatar } = userConfig;

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(avatar.regexpUrl),
  }),
});
