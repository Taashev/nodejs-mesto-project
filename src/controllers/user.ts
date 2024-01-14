import { Request, Response } from 'express';

import { User } from '../models/user/user';

export function getUsers(req: Request, res: Response): void {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.send({ message: error.message });
    });
}

export function getUser(req: Request, res: Response) {
  const { id } = req.params;

  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        throw new Error('user not fount');
      }

      res.send(user);
    })
    .catch((error) => {
      res.send({ message: error.message });
    });
}

export function createUser(req: Request, res: Response): void {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ name: user.name, about: user.about, avatar: user.avatar });
    })
    .catch((error) => {
      res.send({ message: error.message });
    });
}
