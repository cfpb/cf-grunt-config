var grunt = require('grunt');

module.exports = {
  vendor: {
    files: {
      'demo/static/css/': [
        'demo/static/css/main.css',
        'demo/static/css/main.lt-ie8.css'
      ]
    },
    options: {
      replacements: [{
        pattern: /url\((.*?)\)/ig,
        replacement: function (match, p1, offset, string) {
          var path, pathParts, pathLength, filename, newPath;
          path = p1.replace(/["']/g,''); // Removes quotation marks if there are any
          pathParts = path.split('/'); // Splits the path so we can find the filename
          pathLength = pathParts.length;
          filename = pathParts[pathLength-1]; // The filename is the last item in pathParts

          grunt.verbose.writeln('');
          grunt.verbose.writeln('--------------');
          grunt.verbose.writeln('Original path:');
          grunt.verbose.writeln(match);
          grunt.verbose.writeln('--------------');

          // Rewrite the path based on the file type
          // Note that .svg can be a font or a graphic, not usre what to do about this.
          if (filename.indexOf('.eot') !== -1 ||
              filename.indexOf('.woff') !== -1 ||
              filename.indexOf('.ttf') !== -1 ||
              filename.indexOf('.svg') !== -1)
          {
            newPath = 'url("../fonts/'+filename+'")';
            grunt.verbose.writeln('New path:');
            grunt.verbose.writeln(newPath);
            grunt.verbose.writeln('--------------');
            return newPath;
          } else if (filename.indexOf('.png') !== -1 ||
              filename.indexOf('.gif') !== -1 ||
              filename.indexOf('.jpg') !== -1)
          {
            newPath = 'url("../img/'+filename+'")';
            grunt.verbose.writeln('New path:');
            grunt.verbose.writeln(newPath);
            grunt.verbose.writeln('--------------');
            return newPath;
          } else {
            grunt.verbose.writeln('No new path.');
            grunt.verbose.writeln('--------------');
            return match;
          }

          grunt.verbose.writeln('--------------');
          return match;
        }
      }]
    }
  }
};
