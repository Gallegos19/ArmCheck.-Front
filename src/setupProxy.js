const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://52.91.71.159:3001',
      changeOrigin: true
    })
  );
};
