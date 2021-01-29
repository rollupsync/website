const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = merge(common, {
  target: 'webworker',
  entry: './src/entry-worker.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'workers-site/worker'),
    filename: 'worker.js',
  },
  resolve: {
    alias: {
      fs: path.resolve(__dirname, 'empty.js'),
      module: path.resolve(__dirname, 'empty.js'),
    }
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
    minimize: false,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.VUE_ENV': JSON.stringify('server'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  module: {
  }
})

config.plugins = config.plugins.filter((plugin) => {
  return !(plugin instanceof HtmlWebpackPlugin)
})

module.exports = config
