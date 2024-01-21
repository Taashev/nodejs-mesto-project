import { Router } from 'express';

import { createUser } from '../controllers/users';

export const router = Router();

router.post('/', createUser);
