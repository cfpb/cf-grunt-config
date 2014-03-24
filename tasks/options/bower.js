var path = require('path');

module.exports = {
  install: {
    options: {
      targetDir: 'src/vendor/',
      install: true,
      verbose: true,
      cleanBowerDir: true,
      cleanTargetDir: true,
      layout: function(type, component) {
        if (type === 'img') {
          return path.join('../../demo/static/img');
        } else if (type === 'fonts') {
          return path.join('../../demo/static/fonts');
        } else {
          return path.join(component);
        }
      }
    }
  }
};
