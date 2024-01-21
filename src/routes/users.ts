import { Router } from 'express';

import {
  getUser,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/users';

export const router = Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', getUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);
