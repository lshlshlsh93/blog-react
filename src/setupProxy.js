/**
 * @author lishaohui
 * 跨域配置
 */
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api', // 匹配所有带'/api/v1'的接口地址进行代理转发
      {
        target: 'http://localhost:8888', // 代理地址
        changeOrigin: true,
      }
    )
  )
}
