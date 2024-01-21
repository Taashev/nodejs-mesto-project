import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user/user';

import { HttpError } from '../components/HttpError';
import { NotFoundError } from '../components/NotFoundError';
import { UnauthorizedError } from '../components/UnauthorizedError';

import { NODE_ENV, SECRET_KEY } from '../config';
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
  const { name, about, avatar, email, password } = req.body;

  if (password.length < 3) {
    throw new HttpError(messageError.passwordRegistrationError);
  }

  bcrypt
    .hash(password, 10)
    .then(async (hashPassword) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hashPassword,
      });
    })
    .then((user) => {
      res.status(STATUS_CODE.created).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
}

export function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, about, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, email },
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
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.userNotFound);
      }

      res.send(user);
    })
    .catch(next);
}

export function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        throw new UnauthorizedError(messageError.userAuth);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedError(messageError.userAuth);
      }

      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });

      res
        .cookie('token', token, {
          secure: NODE_ENV === 'production',
          maxAge: 3_600_000 * 24 * 7, // 7d
          httpOnly: true,
        })
        .send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
    })
    .catch(next);
}
