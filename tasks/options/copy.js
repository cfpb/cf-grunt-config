module.exports = {
  component_assets: {
    files:
    [{
      expand: true,
      cwd: 'src/',
      src: ['fonts/**'],
      dest: 'demo/static/'
    }]
  },
  docs_assets: {
    files:
    [{
      expand: true,
      cwd: 'demo/',
      src: ['static/img/**', 'static/fonts/**'],
      dest: 'docs/'
    }]
  },
  docs: {
    files:
    [{
      expand: true,
      cwd: 'demo/',
      src: ['static/css/main.css'],
      dest: 'docs/'
    }]
  }
};
