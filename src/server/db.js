
import mongoose from 'mongoose';

import config from './config/environment';

// connect to MongoDB
export default async function() {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(config.mongo.uri);
    console.log('Connected to MongoDB');
  } catch(err) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
}
