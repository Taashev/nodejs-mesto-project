import { Router } from 'express';

import {
  createCard,
  getCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} from '../controllers/cards';

export const router = Router();

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', addLikeCard);

router.delete('/:cardId/likes', deleteLikeCard);
