import { NextFunction, Request, Response } from 'express';

import { User } from '../models/user/user';

import { NotFoundError } from '../components/NotFoundError';

import { STATUS_CODE, messageError } from '../utils/constants';

export function getUsers(req: Request, res: Response, next: NextFunction) {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
}

export function getUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.userNotFound);
      }

      res.send(user);
    })
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res
        .status(STATUS_CODE.created)
        .send({ name: user.name, about: user.about, avatar: user.avatar });
    })
    .catch(next);
}

export function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, about } = req.body;
  const userId = req.user.id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.userNotFound);
      }

      res.send(user);
    })
    .catch(next);
}

export function updateUserAvatar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { avatar } = req.body;
  const userId = req.user.id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.userNotFound);
      }

      res.send(user);
    })
    .catch(next);
}
