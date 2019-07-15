module.exports = function (config) {
  config.set({
    basePath: '..',
    files: [
      'src/index.js',
      'test/index.test.js'
    ],

    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],

    singleRun: true
  })
}
