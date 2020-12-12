const { env, ip, port, apiRoot, db } = require('./config');
const express = require('./services/express');
const sequelize = require('./services/sequelize');
const api = require('./api');

const app = express(api, apiRoot);

app.listen(port, () => console.log(`App listening at http://${ip}:${port} in ${env} environment...`));

module.exports = app;