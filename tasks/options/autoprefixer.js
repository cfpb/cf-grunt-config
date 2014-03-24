module.exports = {
  options: {
    // Options we might want to enable in the future.
    diff: false,
    map: false
  },
  multiple_files: {
    // Prefix all CSS files found in `src/static/css` and overwrite.
    expand: true,
    src: 'demo/static/css/main.css'
  },
};
