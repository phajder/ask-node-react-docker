const { createProxyMiddleware } = require("http-proxy-middleware");

const apiPrefix = "/api";
const proxyHost = process.env.REACT_APP_PROXY || "http://localhost:8080";

module.exports = function (app) {
  app.use(
    apiPrefix,
    createProxyMiddleware({
      target: `${proxyHost}${apiPrefix}`,
      changeOrigin: true,
      on: {
        proxyReq: (proxyReq) => {
          // Browsers may send Origin headers even with same-origin
          // requests. To prevent CORS issues, we have to change
          // the Origin to match the target URL.
          if (proxyReq.getHeader("origin")) {
            proxyReq.setHeader("origin", proxyHost);
          }
        },
        error: (err, req, res) => {
          const host = req.headers && req.headers.host;
          if (res.writeHead && !res.headersSent) {
            res.writeHead(500);
          }
          res.end(
            `Proxy error: Could not proxy request ${apiPrefix}${req.url} from ${host} to ${proxyHost} (${err.code}).`,
          );
        },
      },
    }),
  );
};
