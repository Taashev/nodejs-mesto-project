import { Router } from 'express';

import { handlerNotFound } from '../middleware/notFound';

import { router as usersRouter } from './users';
import { router as cardsRouter } from './cards';

export const router = Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', handlerNotFound);
