import { Router } from 'express';
import * as controller from './order.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.getOrders); // add auth for admin
router.get('/:id', controller.getOrderById); // add auth for user
router.post('/', auth.isAuthenticated(), controller.addOrder); // add auth -- auth.isAuthenticated()
router.put('/:id', auth.isAuthenticated(), controller.updateOrder); // add auth
router.delete('/:id', auth.isAuthenticated(), controller.deleteOrder); // add auth for admin
router.get('/orders/sales', auth.hasRole('admin'), controller.getSalesReport);

export default router;
