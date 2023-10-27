
import Express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';

import config from './config/environment';

const app = new Express();
const server = Server(app);


if (process.env.NODE_ENV === 'development') {
  console.log(`loading dev middleware`);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');

  const webpackConfig = require('../../webpack.config.client')({
    env: process.env.NODE_ENV
  });
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
  }));
  app.use(webpackHotMiddleware(compiler));
}

console.log(`node_env --> ${process.env.NODE_ENV}`);



/* MongoDB */

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  })


require('./express').default(app);
require('./routes').default(app);


server.listen(config.port, (error) => {
  if(!error) {
    console.log(`Express is running on port ${config.port}`);
  }
});

export default app;

/* Firebase */

// const {onRequest} = require("firebase-functions/v2/https");

// exports.app = onRequest(app);


