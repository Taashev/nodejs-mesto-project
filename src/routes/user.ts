import { Router } from 'express';

import { createUser, getUser, getUsers } from '../controllers/user';

export const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);

router.post('/', createUser);
