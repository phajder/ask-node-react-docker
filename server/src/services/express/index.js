const express = require('express');

const expressConfig = (api, apiRoot) => {
   const app = express();
   app.use(express.json());
   app.use(apiRoot, api);
   return app;
};

module.exports = expressConfig;