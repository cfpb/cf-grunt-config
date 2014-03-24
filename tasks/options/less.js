module.exports = {
  main: {
    options: {
      paths: grunt.file.expand('src/vendor/**/'),
      yuicompress: false
    },
    files: {
      'demo/static/css/main.css': [
        'src/vendor/normalize-css/normalize.css',
        'src/vendor/cf-concat/cf.less'
      ]
    }
  }
};
