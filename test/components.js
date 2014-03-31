var request = require('request'),
    unzip = require('unzip'),
    fs = require('fs'),
    fstream = require('fstream'),
    path = require('path'),
    rimraf = require('rimraf'),
    ncp = require('ncp').ncp,
    zips;

describe('Components', function(){
  this.timeout( 600000 );

  // Components to test that use `cf-grunt-config`
  zips = [
    'https://github.com/cfpb/cf-buttons/archive/gh-pages.zip'
  ];

  // Kill the `components` dir so we can start fresh
  rimraf( path.join( 'test/components' ), createComponentsDir );

  // Recreate the `components` dir
  function createComponentsDir() {
    fs.mkdir( 'test/components' );
  }

  before(function( done ) {

    var i = zips.length,
        j = 0;

      zips.forEach( function getZip( location ) {

        var dir = fstream.Writer('test/components'),
            r;

        // Grab the file, unzip it, and send it to the `components` dir
        r = request( location )
              .pipe( unzip.Parse() )
              .pipe( dir );

        // When the request is complete, kick off a huge chain of events
        r.on( 'close', function setUp( err ) {
          j++;
          if ( i === j ) {
            done( err );
          }
        });

      });


  });

  zips.forEach( function getZip( location ) {
      
    var loc = location.match(/https:\/\/github\.com\/[\w\-_]*\/([\w\-_]*)\/archive\/([\w\-_]*)\.zip/),
              child = require('child_process');

    loc = path.join( 'test/components', loc[1] + '-' + loc[2] );

    describe( loc, function(){

      it('should correctly build all its assets', function(done){

        // Backup the current compiled assets
        // We don't actually do anything with them but in the future we might
        // want to diff the new/old compiled assets to see if they're the same
        // ncp( path.join( loc, 'demo' ), path.join( loc, 'demo_orig' ) );

        // Install npm deps
        child.exec( 'npm --prefix ' + loc + ' install ' + loc, purgeModules );

        // Purge node modules in `cf-grunt-config`
        function purgeModules() {
          rimraf( path.join( loc, 'node_modules/cf-grunt-config/node_modules' ), copyPackageJSON );
        }

        // Copy over the latest `package.json`
        function copyPackageJSON() {
          ncp( path.join('../package.json'), path.join( loc, 'node_modules/cf-grunt-config/package.json' ), reInstallDeps );
        }

        // Re-install npm deps which may be different because of the latest `package.json`
        function reInstallDeps() {
          child.exec( 'npm --prefix ' + path.join( loc, 'node_modules/cf-grunt-config' ) + ' install ' + path.join( loc, 'node_modules/cf-grunt-config' ), copyTasks );
        }

        // Copy over the latest `cf-grunt-config` tasks
        function copyTasks() {
          ncp( path.join('../tasks'), path.join( loc, 'node_modules/cf-grunt-config/tasks' ), installBowerDeps );
        }

        // Install bower deps
        function installBowerDeps( err ) {
          child.exec( 'grunt vendor --gruntfile ' + loc + '/Gruntfile.js', compileAssets );
        }

        // Compile the component's assets using the latest `cf-grunt-config` tasks
        function compileAssets( err, stdout, stderr ) {

          // If there's an error, make it a little more informative and GTFO
          if ( err ) {
            console.log(stdout);
            var component = loc.match(/components\/([\w\-_]+)/)
                          ? loc.match(/components\/([\w\-_]+)/)[1].replace( '-gh-pages', '' )
                          : 'an unknown component';
            err = new Error('Running `grunt vendor` with ' + component + ' failed.');
            done( err );
            return;
          }

          // Run the default grunt task to build everything
          child.exec( 'grunt --gruntfile ' + loc + '/Gruntfile.js', function( err, stdout, stderr ){

            // If there's an error, make it a little more informative and GTFO
            if ( err ) {
              var component = loc.match(/components\/([\w\-_]+)/)
                            ? loc.match(/components\/([\w\-_]+)/)[1].replace( '-gh-pages', '' )
                            : 'an unknown component';
              err = new Error('Running `grunt` with ' + component + ' failed.');
              done( err );
              return;
            }
            
            done();

          });
        }

      });

    });

  });

});
