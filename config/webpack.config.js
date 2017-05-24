var path = require('path');
var helpers = require('./helpers');

module.exports = {
  entry: {
    gamedev: helpers.root("src/index.js")
  },
  output: {
    path: helpers.root('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js"],
    alias: {
      // 'p2': helpers.root('node_modules/phaser/build/custom/p2'),
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};