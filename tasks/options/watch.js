var grunt = require('grunt');

module.exports = {
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: ['jshint:gruntfile']
  },
  src: {
    files: '<%= jshint.src.src %>',
    tasks: ['jshint:src', 'qunit']
  },
  test: {
    files: '<%= jshint.test.src %>',
    tasks: ['jshint:test', 'connect', 'qunit']
  }
};
