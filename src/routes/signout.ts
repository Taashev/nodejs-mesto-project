import { Router } from 'express';

import { logout } from '../controllers/users';

export const router = Router();

router.get('/', logout);
