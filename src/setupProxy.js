// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  const local = "http://localhost:4000";
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://49.50.162.189:4000",
      changeOrigin: true,
    })
  );
  app.use(
    "/user",
    createProxyMiddleware({
      target: "http://49.50.162.189:4000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/book",{
      target: "https://search.shopping.naver.com",
      changeOrigin: true,
      ws: true
    })
  );
};
