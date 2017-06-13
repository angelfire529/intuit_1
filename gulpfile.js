var gulp = require('gulp');
wiredep = require('wiredep');
sass = require('gulp-sass');
notify = require('gulp-notify');
bower = require('gulp-bower');
concat = require('gulp-concat');
clean = require('gulp-clean');
depsOrders = require('gulp-deps-order');
reload = require('gulp-livereload');
lr = require('tiny-lr')();
server = require('./server.js');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
};

function startLivereload() {
    lr.listen(35729);
}

gulp.task('bower', function () {
    return bower()
    .pipe(gulp.dest(config.bowerDir));
});


gulp.task('icons', function () {
     gulp.src([config.bowerDir + '/font-awesome/fonts/*.*', config.bowerDir + 'bootstrap/dist/fonts/*.*'])
    .pipe(gulp.dest('./public/fonts'));

     gulp.src('app/img/*.*')
     .pipe(gulp.dest('./public/img'));
});

gulp.task('css', function () {
    return gulp.src([config.bowerDir + '/bootstrap/dist/css/*.*', config.bowerDir + '/font-awesome/css/*.*', 'app/*.css', config.bowerDir + '/angular-bootstrap/*.css'])
        .pipe(concat('vendors.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass', function () {
    gulp.src('app/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload());
});

gulp.task('index', function () {
    gulp.src('./index.html')
    .pipe(gulp.dest('./public'))
    .pipe(reload());
});

gulp.task('html', function () {
    gulp.src('app/**/*.html')
    .pipe(gulp.dest('./public/html'))
    .pipe(reload());
});

gulp.task('compile-vendor', function () {
    var paths = [config.bowerDir + '/jquery/dist/*.*', config.bowerDir + '/bootstrap/dist/js/*.*', config.bowerDir + '/angular/angular.js', config.bowerDir + '/lodash/dist/*.*',
        /*!config.bowerDir + '/angular/index.js',*/ !config.bowerDir + '/express/**/*.js', './node_modules/angular-ui-router/release/angular-ui-router.js',
     config.bowerDir + '/angular-bootstrap/*.js', !config.bowerDir + '/angular-bootstrap/index.js', !config.bowerDir + '/angular-bootstrap/*.min.js'];

     gulp.src(paths)
    .pipe(gulp.dest('./public/js'));
});

gulp.task('compile-js', function () {
    return gulp.src('app/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(reload());
});

gulp.task('data', function () {
    gulp.src('./data.json')
    .pipe(gulp.dest('./public'))
    .pipe(reload());
});

gulp.task('default', ['build', 'data'], function () {
    server.startExpress();
    //startLivereload();
});

gulp.task('build:clean', function () {
    return gulp.src(['./tmp/**/*.*', './public/**/*.*'])
    .pipe(clean({ read: false, force: true}))
});

gulp.task('build', ['styles', 'scripts', 'copy']);
gulp.task('copy', ['index', 'html']);
gulp.task('styles', ['css', 'sass', 'icons']);
gulp.task('scripts', ['compile-js', 'compile-vendor']);

/***watches***/

reload.listen();
gulp.watch('app/**/*.js', ['compile-js']);
gulp.watch('app/**/*.html', ['html']);
gulp.watch('app/**/*.scss', ['sass']);
gulp.watch('app/**/*.html', ['html']);
gulp.watch('index.html', ['index']);
