var grunt = require('grunt');

module.exports = {
  main: {
    options: {
      paths: grunt.file.expand('src/vendor/**/'),
      yuicompress: false,
      sourceMap: true
    },
    files: {
      'demo/static/css/main.css': [
        'src/vendor/normalize-css/normalize.css',
        'src/vendor/normalize-legacy-addon/normalize-legacy-addon.css',
        'src/vendor/font-awesome/font-awesome.css',
        'src/vendor/cf-concat/cf.less'
      ]
    }
  }
};
