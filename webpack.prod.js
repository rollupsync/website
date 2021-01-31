const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const VueSSRClientPlugin = require('vue-webworker-renderer/client-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new VueSSRClientPlugin(),
  ],
})
