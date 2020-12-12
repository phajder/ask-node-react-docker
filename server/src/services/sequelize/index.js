const Sequelize = require('sequelize');
const dbConfig = require('../../config').db;

const sequelize = (dbConfig) => {
    const conn = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.pswd, {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql'
    });
    return conn;
};

module.exports = sequelize(dbConfig);