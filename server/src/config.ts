import { default as path } from "path";

interface AppConfig {
  env: string;
  port: number;
  ip: string;
  root: string;
  apiRoot: string;
}

interface DbConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}

const appConfig = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  ip: process.env.IP || undefined,
  root: path.join(__dirname, ".."),
  apiRoot: "/api",
};

const dbConfig: DbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || "3306"),
  name: process.env.DB_NAME || "",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PSWD || "",
};

export { appConfig, AppConfig, dbConfig, DbConfig };
