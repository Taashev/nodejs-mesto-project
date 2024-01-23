import { celebrate, Joi } from 'celebrate';

export const getUserValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});
