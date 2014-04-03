module.exports = {
  main: {
    src: [
      'src/*.less',
      'src/less/*.less',
      'src/vendor/cf-*/*.less',
      '!src/vendor/cf-concat/cf.less'
    ],
    dest: 'src/vendor/cf-concat/cf.less',
  },
  'lt-ie8': {
    src: [
      'src/vendor/font-awesome/font-awesome-ie7.min.css'
    ],
    // Using .min keeps topdoc from rendering it as a demo page
    dest: 'demo/static/css/main.lt-ie8.min.css',
  }
};
