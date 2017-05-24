/**
 * Created by thinhtran on 1/31/17.
 */
const helpers = require("./helpers");
const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const commonConfig = require("./webpack.config.js");

module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.root('lib'),
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});