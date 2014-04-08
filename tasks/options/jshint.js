var grunt = require('grunt');

module.exports = {
  options: {
    "curly": true,
    "eqeqeq": true,
    "immed": true,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "sub": true,
    "undef": true,
    "boss": true,
    "eqnull": true,
  },
  gruntfile: {
    options: {
      "node": true
    },
    src: 'Gruntfile.js'
  },
  src: {
    options: {
      "browser": true,
      "predef": ["jQuery"]
    },
    src: ['src/js/*.js']
  },
  test: {
    options: {
      "browser": true,
      "predef": [
        "jQuery",
        "_$",
        "QUnit",
        "module",
        "test",
        "asyncTest",
        "expect",
        "start",
        "stop",
        "ok",
        "equal",
        "notEqual",
        "deepEqual",
        "notDeepEqual",
        "strictEqual",
        "notStrictEqual",
        "throws"
      ]
    },
    src: ['test/**/*.js']
  }
};
