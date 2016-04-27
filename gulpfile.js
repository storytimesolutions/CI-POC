var gulp        = require('gulp');
var gutil       = require('gulp-util');
var shell       = require('gulp-shell');

var clean       = require('gulp-clean');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var concat      = require('gulp-concat');
var concatCss   = require('gulp-concat-css');
var cleanCss    = require('gulp-clean-css');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();
var Server      = require('karma').Server;
var protractor  = require('gulp-protractor').protractor;


/*Gulp Final Product Desires
XXX - 1) Run local server in dev or prod version
XXX    a) Automatic Browser Refresh on Change
XXX - 2) Run Jasmine tests with each change
XXX - 3) Concat all angular app files into a dev versions 
XXX - 4) Minify concat files for Production
XXX 5) Move dependencies from packages to local directory for dev environment
XXX 6) Get Prod Version working locally 

Future thoughts
1) Change out local project dependencies with CDNs on Prod deployment
2) Commitizen - Better commits confirming to standards

Article to review - blog.rangle.io/angular-gulp-bestpractices

*/

var bases = {
    src: 'src/',
    src_app: 'src/app/',
    src_assets: 'src/assets/',
    src_libs: 'src/assets/libs/',
    src_imgs: 'src/assets/images/',
    dist: 'dist/',
    dist_scripts: 'dist/scripts',
    dist_assets: 'dist/assets'
}

var paths = {
    scripts: [ bases.src_app + '**/*.js'],
    libs: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/css/bootstrap.min.css'
    ]
}

/////////////////////////
/// PROD / DIST Tasks ///
/////////////////////////

gulp.task('clean', function(){
    return gulp.src(bases.dist)
        .pipe(clean({force: true}));
});

gulp.task('package-scripts', ['clean', 'jshint'], function(){
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(bases.dist_scripts))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(bases.dist_scripts));
});

gulp.task('dist-html', ['clean'], function(){
    return gulp.src(bases.src + '**/*.html')
        .pipe(htmlreplace({
            'css': 'app.css',
            'js': 'scripts/app.js'
        }))
        .pipe(gulp.dest(bases.dist));
});

gulp.task('dist-assets', ['clean', 'copy-libs'], function(){
    return gulp.src(bases.src_assets + '**/*.*')
        .pipe(gulp.dest(bases.dist_assets));
});

gulp.task('package-css', ['clean'], function(){
    return gulp.src([bases.src + '/*.css',bases.src_app + '/**/*.css'])
        .pipe(concatCss('app.css'))
        .pipe(gulp.dest(bases.dist))
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css'} ))
        .pipe(gulp.dest(bases.dist));
});

// Can't clean while serving server :(
//gulp.task('prod-watch', ['dist'], browserSync.reload);

//Create distribution package
gulp.task('dist', ['dist-html', 'dist-assets', 'package-css', 'package-scripts']);

gulp.task('serve-prod', ['clean', 'dist'], function () {
    browserSync.init({
        server: __dirname + '/dist'
    });
    
    gulp.watch(["src/**/*.html", "src/**/*.js"], ['prod-watch']);
    
});


/////////////////
/// DEV Tasks ///
/////////////////

//JsHint
gulp.task('jshint', function(){
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish)); 
});

gulp.task('test', ['unit-test', 'e2e'], function(){} );

//Run Jasmine Tests one-time with Karma
gulp.task('unit-test', function(done){
    new Server({
        configFile: __dirname + '/karma-js.conf.js',
        singleRun: true,
        //browsers: ['Firefox','Chrome','Safari', 'PhantomJS']
    }, done).start();
});

//Run e2e test one-time with Protractor
gulp.task('e2e', function(){
    gulp.src('tests/e2e/**/*.js')
        .pipe(protractor({
            configFile: 'protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function(e) { throw e });
});

//Reload Browser
gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('copy-libs', function(){
     return gulp.src(paths.libs)
        .pipe(gulp.dest(bases.src_libs));
});

// Serve the site from the src directory
gulp.task('serve-dev', ['copy-libs'], function () {
    browserSync.init({
        server: __dirname + '/src'
    });
    
    gulp.watch(["src/**/*.html", "src/**/*.js"], ['reload', 'jshint', 'unit-test']);
    
});


//Be in TDD mode (Run tests on every change but can't have BrowserSync)
gulp.task('tdd', function(done){
    new Server({
        configFile: __dirname + '/karma-js.conf.js',
        singleRun: false,
        //browsers: ['Firefox','Chrome','Safari', 'PhantomJS']
    }, done).start();
});

gulp.task('default', ['serve-dev']);

/* Needed Items: 
Dev:
    serve-dev
        On start:
            √ push lib files
        Every change:
            √ run jshint
            √ run unit tests
            √ refresh browser

Prod:
    serve-prod
        On start:
            √ push lib files/change references to prod
        Every change:
            - run jshint
            - run unit tests
    prod-tests  
        - run jshint
        - run unit tests
        - run protractor tests
        
*/