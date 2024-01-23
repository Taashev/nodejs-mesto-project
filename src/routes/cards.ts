import { Router } from 'express';

import {
  createCard,
  getCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} from '../controllers/cards';

import {
  createCardValidator,
  idCardParamsValidator,
} from '../middleware/requestValidator';

export const router = Router();

router.get('/', getCards);

router.post('/', createCardValidator, createCard);

router.delete('/:cardId', idCardParamsValidator, deleteCard);

router.put('/:cardId/likes', idCardParamsValidator, addLikeCard);

router.delete('/:cardId/likes', idCardParamsValidator, deleteLikeCard);
