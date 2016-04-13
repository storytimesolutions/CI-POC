var gulp        = require('gulp');
var gutil       = require('gulp-util');

var clean       = require('gulp-clean');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var Server      = require('karma').Server;


/*Gulp Final Product Desires
XXX - 1) Run local server in dev or prod version
XXX    a) Automatic Browser Refresh on Change
XXX - 2) Run Jasmine tests with each change
XXX - 3) Concat all angular app files into a dev versions 
XXX - 4) Minify concat files for Production
5) Move dependencies from packages to local directory for dev environment
6) Get Prod Version working locally 

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

gulp.task('package-scripts',['clean'], function(){
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(bases.dist + '/scripts'));
});

gulp.task('copy-html',['clean'], function(){
    return gulp.src(bases.src + '**/*.html')
        .pipe(gulp.dest(bases.dist));
});

gulp.task('copy-libs', function(){
     return gulp.src(paths.libs)
        .pipe(gulp.dest(bases.libs));
});

gulp.task('prod-watch', ['dist'], browserSync.reload);
gulp.task('dev-watch', ['test'], browserSync.reload);

/**
 * Serve the Harp Site from the dist directory
 */
gulp.task('serve-prod', function () {
    browserSync.init({
        server: __dirname + '/dist'
    });
    
    gulp.watch(["src/**/*.html", "src/**/*.js"], ['prod-watch']);
    
});

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve-dev', ['copy-libs'], function () {
    browserSync.init({
        server: __dirname + '/src'
    });
    
    gulp.watch(["src/**/*.html", "src/**/*.js"], ['dev-watch']);
    
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
        configFile: __dirname + '/karma-js.conf.js',
        singleRun: false
    }, done).start();
});

//Create distribution package
gulp.task('dist', ['copy-html', 'package-scripts']);

/**
 * Default task, running `gulp` will launch BrowserSync & watch files.
 */
gulp.task('default', ['serve-dev']);
