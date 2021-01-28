const { VueLoaderPlugin } = require('vue-loader')
const wbepack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['./src/entry-client.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   loader: 'file-loader',
      //   options: {
      //     publicPath: 'build',
      //     esModule: false,
      //   }
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'static/index.ejs',
      filename: 'index.html',
      inlineSource: '.(js|css)',
    }),
    // new HtmlWebpackInlineSourcePlugin(),
  ]
}