import { Schema, model } from 'mongoose';

import { messageError } from '../utils/constants';

import { cardConfig } from '../config/cardConfig';

import { CardType } from '../types/model/card.d';

const cardSchema = new Schema<CardType>({
  name: {
    type: String,
    required: true,
    minlength: cardConfig.name.minlength,
    maxlength: cardConfig.name.maxlength,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url: string) {
        return cardConfig.link.regexpUrl.test(url);
      },
      message: messageError.badRequest,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Card = model<CardType>('card', cardSchema);
