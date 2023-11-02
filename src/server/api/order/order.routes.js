import { Router } from 'express';
import * as controller from './order.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.getOrders); // add auth
router.post('/', controller.addOrder); // add auth -- auth.isAuthenticated()
router.get('/:id', controller.getOrderById); // add auth
//router.put('/:id', controller.getOrderById); // add auth
router.delete('/:id', controller.deleteOrder); // add auth

export default router;
