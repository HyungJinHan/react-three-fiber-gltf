const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/odnus.xml?atom=0.3",
    createProxyMiddleware({
      target: "https://rss.blog.naver.com",
      changeOrigin: true,
      pathRewrite: { "^/odnus.xml?atom=0.3": "/" },
    })
  );
};
