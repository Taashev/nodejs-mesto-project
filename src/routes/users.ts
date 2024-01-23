import { Router } from 'express';

import {
  getUser,
  getUsers,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} from '../controllers/users';

import {
  getUserValidator,
  updateUserProfileValidator,
  updateUserAvatarValidator,
} from '../middleware/requestValidator';

export const router = Router();

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', getUserValidator, getUser);

router.patch('/me', updateUserProfileValidator, updateUserProfile);

router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);
