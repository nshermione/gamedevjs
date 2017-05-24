var path = require('path');
var helpers = require('./helpers');

module.exports = {
  entry: {
    gamedev: helpers.root("src/index.ts")
  },
  output: {
    path: helpers.root('dist'),
    library: "gamedevjs",
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      // 'p2': helpers.root('node_modules/phaser/build/custom/p2'),
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.ts/, exclude: /node_modules/, loader: "ts-loader" },
    ]
  }
};