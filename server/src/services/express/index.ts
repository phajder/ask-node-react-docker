import express, { Router } from "express";

export default function expressConfig(api: Router, apiRoot: string) {
  const app = express();
  app.use(express.json());
  app.use(apiRoot, api);
  return app;
}
