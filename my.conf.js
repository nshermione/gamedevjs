module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**.spec.ts'
    ],
    preprocessors: {
      'test/**.spec.ts': ['webpack', 'sourcemap'],
    },
    webpack: {
      resolve: {
        extensions: ['.js', '.ts']
      },
      module: {
        loaders: [
          {test: /\.ts/, loader: 'ts-loader'}
        ]
      },
      devtool: 'inline-source-map',
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}