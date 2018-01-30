const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'eval',
  name: 'client',
  context: path.join(__dirname, '.', 'src'),  
  entry: [
    './client.js',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  ],
  output: {
    path: assetsPath,
    publicPath,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader"
          }],
          // use style-loader in development 
          fallback: "style-loader"
      }),
        include: path.join(__dirname, '.', 'src')
      },
      {test: /\.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
      {test: /\.jsx$/ , loader:'babel-loader', exclude: '/node_modules/'}
    ]
  },
};