import { Router } from 'express';
import * as controller from './review.controller';
import * as auth from '../../auth/auth.service';

const router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

export default router;