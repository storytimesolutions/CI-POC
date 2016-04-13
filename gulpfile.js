var gulp        = require('gulp');
var gutil       = require('gulp-util');

var clean       = require('gulp-clean');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
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
    src: 'src/',
    app: 'src/app/',
    dist: 'dist/',
    libs: 'src/assets/libs/'
}

var paths = {
    scripts: [ bases.app + '**/*.js'],
    libs: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
}

gulp.task('clean', function(){
    return gulp.src(bases.dist)
        .pipe(clean()); 
});

gulp.task('scripts',['clean'], function(){
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(bases.dist + '/scripts'));
});

gulp.task('copy-html',['clean'], function(){
    gulp.src(bases.src + '**/*.html')
        .pipe(gulp.dest(bases.dist));
});

gulp.task('copy-libs', function(){
     gulp.src(paths.libs)
        .pipe(gulp.dest(bases.libs));
});



/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve-dev', function () {
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
     * Watch for all other changes, reload the whole page (could have .ejs, .jade, .json, .md)
     */
    gulp.watch(["src/app/**/*.html", "src/app/**/*.js"], function () {
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

//Create dist
gulp.task('dist', ['copy-html', 'scripts']);

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['copy-libs', 'serve-dev', 'tdd']);
