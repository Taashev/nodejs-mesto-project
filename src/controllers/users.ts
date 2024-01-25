import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models/user';

import { NotFoundError } from '../components/NotFoundError';
import { UnauthorizedError } from '../components/UnauthorizedError';

import { COOKIE_MAX_AGE, NODE_ENV } from '../config/appConfig';

import { STATUS_CODE, messageError } from '../utils/constants';
import { hashPassword } from '../utils/hashPassword';
import { getToken } from '../utils/getToken';

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

      const token = getToken({ _id: user._id });

      res
        .cookie('token', token, {
          httpOnly: true,
          maxAge: COOKIE_MAX_AGE,
          secure: NODE_ENV === 'production',
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

export function logout(req: Request, res: Response) {
  res
    .clearCookie('token', {
      maxAge: -1,
      httpOnly: true,
      secure: NODE_ENV === 'production',
    })
    .send('До скорой встречи');
}

export function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, about, avatar, email, password } = req.body;

  hashPassword(password)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
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
