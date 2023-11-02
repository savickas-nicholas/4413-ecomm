
import mongoose from 'mongoose';

import config from './config/environment';

export default async () => {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(config.mongo.uri);
    console.log('Connected to MongoDB');
  } catch(err) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
}
