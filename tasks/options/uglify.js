var grunt = require('grunt');

module.exports = {
  options: {
    banner: '<%= opt.banner %>'
  },
  component: {
    src: ['demo/static/js/component.js'],
    dest: 'demo/static/js/component.min.js'
  },
  dist: {
    src: 'dist/<%= pkg.name %>.js',
    dest: 'dist/<%= pkg.name %>.min.js'
  }
};
