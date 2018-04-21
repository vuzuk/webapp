const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const webpack = require('webpack');
const path = require('path');

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
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {test: /\.js$/ , loader:'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/ , loader:'babel-loader', exclude: /node_modules/}
    ]
  },
};