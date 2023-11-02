
import path from 'path';


import userRoutes from './api/user/user.routes';

import authRoutes from './auth/auth.routes';

import vehicleRoutes from './api/vehicle/vehicle.routes';

export default function(app) {
  app.use('/api/users', userRoutes);
  
  app.use('/auth', authRoutes);

  app.use('/api/vehicles', vehicleRoutes);
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
  });
}
