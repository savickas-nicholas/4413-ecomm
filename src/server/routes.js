
import path from 'path';

import userRoutes from './api/user/user.routes';
import orderRoutes from './api/order/order.routes';

import authRoutes from './auth/auth.routes';

export default (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  
  app.use('/auth', authRoutes);
  
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(app.get('appPath'), 'index.html'));
  });
}
