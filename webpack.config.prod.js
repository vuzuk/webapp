const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
  name: 'SSR',
  context: path.join(__dirname, '.', 'src'),
  entry: './SSR.js',  
  output: {
    path: assetsPath,
    filename: 'SSR.js',
    libraryTarget: 'commonjs2',
    publicPath,
  },
  target: 'node',
  externals: nodeExternals(),  
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'css-loader/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      }      
    ]),
  },
},{
	context: path.resolve(__dirname, 'src'),
	entry: './client.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('PRODUCTION'),
				WEBPACK: true
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		// new CopyWebpackPlugin([
		// 	{
		// 		from: path.resolve(__dirname, 'src'),
		// 		to: path.resolve(__dirname, 'dist')
		// 	}
		// ]),
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
	}
}];