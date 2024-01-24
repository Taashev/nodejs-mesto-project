import { celebrate, Joi } from 'celebrate';

import { cardConfig } from '../../../config/cardConfig';

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(cardConfig.name.minlength)
      .max(cardConfig.name.maxlength),
    link: Joi.string().required().pattern(cardConfig.link.regexpUrl),
  }),
});
