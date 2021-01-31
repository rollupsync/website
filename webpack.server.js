const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const commonConfig = require('./webpack.common.js')
const VueSSRServerPlugin = require('vue-webworker-renderer/server-plugin')

module.exports = merge(commonConfig, {
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
    minimize: false,
  },
  target: 'node',
  devtool: '#source-map',
  externals: nodeExternals({
    allowlist: [/\.css$/, /\.vue$/, /\.js$/],
  }),
  plugins: [
    new VueSSRServerPlugin(),
  ],
})
