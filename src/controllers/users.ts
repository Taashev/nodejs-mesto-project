import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user/user';

import { NotFoundError } from '../components/NotFoundError';
import { UnauthorizedError } from '../components/UnauthorizedError';

import {
  COOKIE_MAX_AGE,
  NODE_ENV,
  SALT_LENGTH,
  SECRET_KEY,
  TOKEN_EXPIRES_IN,
} from '../config';
import { STATUS_CODE, messageError } from '../utils/constants';

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
        expiresIn: TOKEN_EXPIRES_IN,
      });

      res
        .cookie('token', token, {
          secure: NODE_ENV === 'production',
          maxAge: COOKIE_MAX_AGE,
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

export function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, SALT_LENGTH)
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

export function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.userNotFound);
      }

      res.send(user);
    })
    .catch(next);
}

export function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, about } = req.body;
  const userId = req.user._id;

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
