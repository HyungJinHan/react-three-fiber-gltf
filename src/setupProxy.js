const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/odnus",
    createProxyMiddleware({
      target: "https://rss.blog.naver.com",
      changeOrigin: true,
    })
  );
};
