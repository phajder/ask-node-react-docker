const path = require('path');

const appConfig = {
   env: process.env.NODE_ENV || 'development',
   port: process.env.PORT || 8080,
   ip: process.env.IP || undefined,
   root: path.join(__dirname, '..'),
   apiRoot: '/api',
   db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pswd: process.env.DB_PSWD
   }
};

module.exports = appConfig;