//vue.config.js
const TransformPages = require('uni-read-pages')
const { webpack } = new TransformPages()
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'aliasPath', 'name', 'meta', 'title'] //需要获取包涵的字段
          });
          return JSON.stringify(tfPages.routes)
        }, true)
      })
    ]
  }
}