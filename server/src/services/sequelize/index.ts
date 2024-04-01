import { Sequelize } from "sequelize";
import { dbConfig, DbConfig } from "../../config";

const sequelize = (dbConfig: DbConfig) => {
  const conn = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
  });
  return conn;
};

export default sequelize(dbConfig);
