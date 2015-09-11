var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

const DIST_PATH = 'dist/build';

var paths = {
  src: 'src/**/*.js'
};

var vendors = [
  'react',
  'react-bootstrap',
  'react-router',
  'nedb',
  'lodash'
];

gulp.task('vendors', function () {
  var stream = browserify({
    debug: false,
    require: vendors
  });

  stream.bundle()
      .pipe(source('vendors.js'))
      .pipe(gulp.dest(DIST_PATH));

  return stream;
});

gulp.task('app', function() {

  var stream = browserify({entries: './src/app.js', debug: false})
      .transform(babelify);

  vendors.forEach(function(vendor) {
    stream.external(vendor);
  });

  return stream.bundle()
    .pipe(source('cucumberly.js'))
    .pipe(gulp.dest(DIST_PATH));
});


gulp.task('build', ['vendors', 'app']);

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});
