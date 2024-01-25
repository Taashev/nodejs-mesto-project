import { Router } from 'express';

import { handlerNotFound } from '../middleware/notFound';

import { auth } from '../middleware/auth';
import {
  signinValidator,
  signupValidator,
} from '../middleware/requestValidator';

import { router as signinRouter } from './signin';
import { router as signupRouter } from './signup';
import { router as signoutRouter } from './signout';

import { router as usersRouter } from './users';
import { router as cardsRouter } from './cards';

export const router = Router();

router.use('/signin', signinValidator, signinRouter);
router.use('/signup', signupValidator, signupRouter);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/signout', signoutRouter);

router.use('*', handlerNotFound);
