import { NextFunction, Request, Response } from 'express';

import { Card } from '../models/card';

import { NotFoundError } from '../components/NotFoundError';
import { ForbiddenError } from '../components/ForbiddenError';

import { STATUS_CODE, messageError } from '../utils/constants';

export function getCards(req: Request, res: Response, next: NextFunction) {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
}

export function createCard(req: Request, res: Response, next: NextFunction) {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.status(STATUS_CODE.created).send(card);
    })
    .catch(next);
}

export function deleteCard(req: Request, res: Response, next: NextFunction) {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageError.cardNotFound);
      }

      const ownerId = card.owner.toString();
      const userId = req.user._id;

      if (ownerId !== userId) {
        throw new ForbiddenError(messageError.forbiddenError);
      }
    })
    .then(() => {
      return Card.findByIdAndDelete(cardId);
    })
    .then((card) => {
      return res.send(card);
    })
    .catch(next);
}

export function addLikeCard(req: Request, res: Response, next: NextFunction) {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageError.cardNotFound);
      }

      res.send(card);
    })
    .catch(next);
}

export function deleteLikeCard(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messageError.cardNotFound);
      }

      res.send(card);
    })
    .catch(next);
}
