import { Router } from 'express';
import * as controller from './vehicle.controller';
const router = new Router();

router.get('/', controller.getVehicles);
router.get('/:id', controller.getVehicle);
router.post('/', controller.addVehicle);
router.delete('/:id/:count', controller.removeVehicle);

export default router;
