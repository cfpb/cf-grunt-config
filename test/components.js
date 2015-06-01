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

  // As cf components are updated to use the centralized `cf-grunt-config`
  // repository, add its zip to this array. In this test, each zip will be:
  //   1. downloaded
  //   2. extracted
  //   3. have its npm and bower dependencies installed
  //   4. have its `node_modules/cf-grunt-config` directory overwritten
  //      with whatever is in the root of this repo (your latest updates)
  //   5. and then built (running `grunt`)
  // If step 5 fails, the test fails and you'll be alerted. It likely
  // means a dependency you changed in package.json or a task you 
  // changed/added in `tasks/options` is incompatible with a component.
  zips = [
    'https://github.com/cfpb/cf-buttons/archive/gh-pages.zip',
    'https://github.com/cfpb/cf-core/archive/gh-pages.zip',
    'https://github.com/cfpb/cf-expandables/archive/gh-pages.zip',
    'https://github.com/cfpb/cf-forms/archive/gh-pages.zip',
    'https://github.com/cfpb/cf-grid/archive/gh-pages.zip',
    'https://github.com/cfpb/cf-icons/archive/gh-pages.zip',
    'https://github.com/cfpb/cf-pagination/archive/gh-pages.zip'
  ];

  // Kill the `components` dir so we can start fresh
  rimraf( path.join( 'test/components' ), createComponentsDir );

  // Recreate the `components` dir
  function createComponentsDir() {
    fs.mkdir( 'test/components' );
  }

  before(function( done ) {

    var i = 0;

    zips.forEach( function getZip( location ) {

      var dir = fstream.Writer('test/components'),
          r;

      // Grab the file, unzip it, and send it to the `components` dir
      r = request( location )
            .pipe( unzip.Parse() )
            .pipe( dir );

      // When the request is complete, kick off a huge chain of events
      r.on( 'close', function setUp( err ) {
        i++;
        if ( i === zips.length ) {
          console.log('\u001b[36m' + i + ' components have been downloaded. Attempting to build them now. This will take a few minutes.\u001b[0m\n');
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
        function purgeModules( err ) {

          // If there's an error, make it a little more informative and GTFO
          if ( err ) {
            var component = loc.match(/components\/([\w\-_]+)/)
                          ? loc.match(/components\/([\w\-_]+)/)[1].replace( '-gh-pages', '' )
                          : 'an unknown component';
            err = new Error('Running `npm install` in ' + loc + ' failed.');
            done( err );
            return;
          }

          rimraf( path.join( loc, 'node_modules/cf-grunt-config/node_modules' ), copyPackageJSON );
        }

        // Copy over the latest `package.json`
        function copyPackageJSON() {
          ncp( path.join('package.json'), path.join( loc, 'node_modules/cf-grunt-config/package.json' ), reInstallDeps );
        }

        // Re-install npm deps which may be different because of the latest `package.json`
        function reInstallDeps() {
          child.exec( 'npm --prefix ' + path.join( loc, 'node_modules/cf-grunt-config' ) + ' install ' + path.join( loc, 'node_modules/cf-grunt-config' ), copyTasks );
        }

        // Copy over the latest `cf-grunt-config` tasks
        function copyTasks( err ) {

          // If there's an error, make it a little more informative and GTFO
          if ( err ) {
            var component = loc.match(/components\/([\w\-_]+)/)
                          ? loc.match(/components\/([\w\-_]+)/)[1].replace( '-gh-pages', '' )
                          : 'an unknown component';
            err = new Error('Running `npm install` in ' + path.join( loc, 'node_modules/cf-grunt-config' ) + ' failed.');
            done( err );
            return;
          }

          ncp( path.join('tasks'), path.join( loc, 'node_modules/cf-grunt-config/tasks' ), installBowerDeps );
        }

        // Install bower deps
        function installBowerDeps( err ) {
          child.exec( 'bower install', {cwd: loc}, compileAssets );
        }

        // Compile the component's assets using the latest `cf-grunt-config` tasks
        function compileAssets( err ) {

          // If there's an error, make it a little more informative and GTFO
          if ( err ) {
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
