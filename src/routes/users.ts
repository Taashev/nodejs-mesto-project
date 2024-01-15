import { Router } from 'express';

import {
  createUser,
  getUser,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users';

export const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/', createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);
