import { celebrate, Joi } from 'celebrate';

export const idCardParamsValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});
