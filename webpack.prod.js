const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');

const pathsToClean = [
  'public/*.hot-update.js',
  'public/*.hot-update.js.map',
  'public/css/style.*',
  'public/js/app.*',
  'public/js/vendor.*',
];

module.exports = {
  mode: 'production',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'js/bundle.js',
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.(jsx|js)?$/,
      loaders: ['babel-loader'],
      include: SRC_DIR,
    },
    {
      test: /\.(sass|scss)$/,
      loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
    },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
};
