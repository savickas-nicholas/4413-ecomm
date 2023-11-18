
import path from 'path';

import userRoutes from './api/user/user.routes';
import orderRoutes from './api/order/order.routes';
import vehicleRoutes from './api/vehicle/vehicle.routes';
import reviewRoutes from './api/review/review.routes';
import usageRoutes from './api/usage/usage.routes';

import authRoutes from './auth/auth.routes';
import paymentRoutes from './payment/payment.routes';

// register HTTP endpoints
export default function(app) {
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/vehicles', vehicleRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/usage', usageRoutes);
  
  app.use('/auth', authRoutes);
  app.use('/payment', paymentRoutes);


  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
  });
}
