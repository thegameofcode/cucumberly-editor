var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
  src: 'src/**/*.js',
  dist: 'dist/build'
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
      .pipe(gulp.dest(paths.dist));

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
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['vendors', 'app']);

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});
