
const path = require('path');
import secrets from '../secrets';

// Production specific configuration
// =================================
module.exports = {
  // Server IP ??
  ip:       process.env.IP ||
            undefined,

  // Server port
  port:     process.env.PORT ||
            8080,

  // references directory that contains 'server.bundle.js'
  root:     path.normalize(__dirname),

  // MongoDB connection options
  mongo: {
    uri: secrets.mongoAtlas
  }
};