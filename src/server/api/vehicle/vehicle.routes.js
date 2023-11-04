import { Router } from 'express';
import * as controller from './vehicle.controller';
import { hasRole } from '../../auth/auth.service';
const router = new Router();

router.get('/', controller.getVehicles);
router.get('/:id', controller.getVehicle);
router.post('/', hasRole('admin'), controller.addVehicle);
router.delete('/:id/:count', hasRole('admin'), controller.removeVehicle);
router.post('/recommendation', controller.recommendVehicle);

export default router;
