var grunt = require('grunt');

module.exports = {
  demo: {
    options: {
      source: 'demo/static/css/',
      destination: 'demo/',
      template: 'node_modules/cf-component-demo/' + ( grunt.option('tpl') || 'raw' ) + '/',
      templateData: {
        family: '<%= pkg.name %>',
        title: '<%= pkg.name %> demo',
        repo: '<%= pkg.homepage %>',
        ltIE8Source: 'static/css/main.lt-ie8.min.css',
        custom: '<%= grunt.file.read("demo/custom.html") %>'
      }
    }
  },
  docs: {
    options: {
      source: 'docs/static/css/',
      destination: 'docs/',
      template: 'node_modules/cf-component-demo/' + ( grunt.option('tpl') || 'code_examples' ) + '/',
      templateData: {
        family: '<%= pkg.name %>',
        title: '<%= pkg.name %> docs',
        repo: '<%= pkg.homepage %>'
      }
    }
  }
};
