import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.get('/me', auth.isAuthenticated(), controller.getMe);
router.get('/:id', controller.getUser);
router.delete('/:id', auth.hasRole('admin'), controller.deleteUser);

export default router;
