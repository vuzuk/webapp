const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
module.exports = {
  name: 'SSR',
  context: path.join(__dirname, '.', 'src'),
  entry: './SSR.js',  
  output: {
    path: assetsPath,
    filename: 'SSR.js',
    libraryTarget: 'commonjs2',
    publicPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: false
    })
  ],
  target: 'node',
  externals: nodeExternals(),  
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'css-loader/locals?module&localIdentName=[name]__[local]___[hash:base64:5]',
        exclude: path.join(__dirname, '.', 'node_modules')
      }      
    ]),
  },
};