import { Router } from 'express';
import * as controller from './review.controller';
import * as auth from '../../auth/auth.service';

const router = new Router();

router.get('/', controller.searchReviews);
router.get('/:id', controller.getReview);
router.get('/vehicle/:vehicleId', controller.getVehicleReviews);
router.post('/', auth.isAuthenticated(), controller.createReview);
router.put('/:id', auth.isAuthenticated(), controller.updateReview);
router.delete('/:id', auth.isAuthenticated(), controller.deleteReview);

export default router;