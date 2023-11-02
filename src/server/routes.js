
import path from 'path';

import userRoutes from './api/user/user.routes';
import orderRoutes from './api/order/order.routes';
import vehicleRoutes from './api/vehicle/vehicle.routes';

import authRoutes from './auth/auth.routes';

export default function(app) {
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/vehicles', vehicleRoutes);
  
  app.use('/auth', authRoutes);


  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
  });
}
