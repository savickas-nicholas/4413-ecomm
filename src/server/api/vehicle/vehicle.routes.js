import { Router } from 'express';
import * as controller from './vehicle.controller';
const router = new Router();

router.get('/', controller.getVehicles);
router.post('/', controller.addVehicles);
router.get('/:id', controller.getVehicle);
router.delete('/:id', controller.deleteVehicle);

export default router;
