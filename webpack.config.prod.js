const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();
dotenv.load();
const webpackConfig = [{
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
        loader: 'css-loader/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      }      
    ]),
  },
},{
	entry: {
    app: [
      './src/client.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'semantic-ui-react',
      'react-froala-wysiwyg',
      'froala-editor',
      'react-chartjs-2'
    ]
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true
			}
    }),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        drop_console: true
			}
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
		// new CopyWebpackPlugin([
		// 	{
		// 		from: path.resolve(__dirname, 'src'),
		// 		to: path.resolve(__dirname, 'dist')
		// 	}
		// ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      __isBrowser__: true
    })
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
        include: path.join(__dirname, '.', 'src'),
        exclude: /node_modules/
      },
      {test: /\.js$/ , loader:'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/ , loader:'babel-loader', exclude: /node_modules/}
    ]
	}
}];
if (process.env.ANALYZE === "TRUE") {
  webpackConfig[1].plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;