import { Router } from 'express';

import { login } from '../controllers/users';

export const router = Router();

router.post('/', login);
