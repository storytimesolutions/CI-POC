var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');
var Server      = require('karma').Server;


/*Gulp Final Product Desires
1) Run local server in dev or prod version
    a) Automatic Browser Refresh on Change
2) Run Jasmine tests with each change
3) Concat all angular app files into a dev versions 
    a) File by type (Controllers?  Services?  All?)
4) Minify concat files for Production
5) Move dependencies from packages to local directory for dev environment

Future thoughts
1) Change out local project dependencies with CDNs on Prod deployment
2) Commitizen - Better commits confirming to standards

Article to review - blog.rangle.io/angular-gulp-bestpractices

*/

var bases = {
    app: 'src/app/',
    dist: 'dist/',
    libs: 'src/assets/libs/'
}

var paths = {
    libs: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
}


/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', function () {
  harp.server(__dirname + '/src' , {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: true
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["*.css", "*.sass", "*.scss", "*.less"], function () {
      reload("main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["*.html", "src/app/**/*.html", "*.ejs", "*.jade", "*.js", "src/app/**/*.js", "*.json", "**/*.md"], function () {
      reload();
    });
  })
});

//Run Jasmine Tests one-time with Karma
gulp.task('test', function(done){
    new Server({
        configFile: __dirname + '/karma-js.conf.js',
        singleRun: true
    }, done).start();
});

//Be in TDD mode (Run tests on every change)
gulp.task('tdd', function(done){
    new Server({
        configFile: __dirname + '/karma-js.conf.js'
    }, done).start();
});

//Copy files where they need to go
gulp.task('copy', function(){
    gulp.src(paths.libs)
        .pipe(gulp.dest(bases.libs));
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['copy', 'serve', 'tdd']);
