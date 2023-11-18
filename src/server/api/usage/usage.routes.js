import { Router } from 'express';
import * as controller from './usage.controller';
import * as auth from '../../auth/auth.service';
const router = new Router();

// gets the usage statistics for the included start and end date
router.post('/statistics', auth.hasRole('admin'), controller.getUsageStatistics);

// adds a usage statistic based on the user, how long they accessed the page, which page they were on, etc.
router.post('/', auth.isAuthenticated(), controller.addUsageStatistic);

export default router;
