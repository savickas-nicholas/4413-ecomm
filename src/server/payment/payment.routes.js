import { Router } from 'express';

import { isAuthenticated } from '../auth/auth.service';
import { processPayment } from './payment.controller';

const router = new Router();

router.post('/validate', processPayment); 

export default router;
