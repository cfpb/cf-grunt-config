var grunt = require('grunt');

module.exports = {
  main: {
    options: {
      paths: grunt.file.expand('src/vendor/**'),
      sourceMap: true,
      sourceMapRootpath: '/',
      modifyVars: {
        baseurl: '',
      }
    },
    files: {
      'demo/static/css/main.css': [
        'src/cf-*.less'
      ]
    }
  }
};
