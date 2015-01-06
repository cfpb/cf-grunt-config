var grunt = require('grunt');

module.exports = {
  demo: {
    options: {
      source: 'demo/static/css/',
      destination: 'demo/',
      template: 'node_modules/cf-component-demo/' + ( grunt.option('tpl') || 'raw' ) + '/',
      templateData: {
        ltIE9AltSource: '<%= opt.ltIE9AltSource %>',
        ltIE8Source: '<%= opt.ltIE8Source %>',
        ie8FontFaceHack: '<%= opt.ie8FontFaceHack %>',
        html5Shiv: '<%= opt.html5Shiv %>',
        modernizr: '<%= opt.modernizr %>',
        jsBody: '<%= opt.jsBody %>',
        family: '<%= pkg.name %>',
        title: '<%= pkg.name %> demo',
        repo: '<%= pkg.homepage %>',
        custom: '<%= grunt.file.read("demo/custom.html") %>'
      }
    }
  },
  docs: {
    options: {
      source: 'docs/static/css/',
      destination: 'docs/',
      template: 'node_modules/cf-component-demo/' + ( grunt.option('tpl') || 'docs' ) + '/',
      templateData: {
        modernizr: '<%= opt.modernizr %>',
        jsBody: '<%= opt.jsBody %>',
        family: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        title: '<%= pkg.name %> docs',
        repo: '<%= pkg.homepage %>'
      }
    }
  }
};
