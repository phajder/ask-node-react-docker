import express from "./services/express";
import { appConfig } from "./config";
import api from "./api";

const app = express(api, appConfig.apiRoot);

app.listen(appConfig.port, () =>
  console.log(
    `App listening at http://${appConfig.ip}:${appConfig.port} in ${appConfig.env} environment...`,
  ),
);

export default app;
