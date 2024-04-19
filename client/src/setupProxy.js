const { createProxyMiddleware } = require("http-proxy-middleware");

const apiPrefix = "/api";
const proxyHost = process.env.REACT_APP_PROXY || "http://localhost:8080";

module.exports = function (app) {
  app.use(
    apiPrefix,
    createProxyMiddleware({
      target: `${proxyHost}${apiPrefix}`,
      changeOrigin: true,
    }),
  );
};
