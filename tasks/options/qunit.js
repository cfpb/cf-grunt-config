var grunt = require('grunt');

module.exports = {
  all: {
    options: {
      urls: [
        'http://localhost:3000/test/<%= pkg.name %>.html'
      ]
    }
  }
};
