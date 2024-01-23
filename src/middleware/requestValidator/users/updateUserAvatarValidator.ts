import { celebrate, Joi } from 'celebrate';

import { userConfig } from '../../../models/user/userConfig';

const { avatar } = userConfig;

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(avatar.regexpUrl),
  }),
});
