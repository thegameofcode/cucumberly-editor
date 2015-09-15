var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
  src: 'src/app.js',
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
  return browserify({
        debug: false,
        require: vendors
      })
      .bundle()
      .pipe(source('vendors.js'))
      .pipe(gulp.dest(paths.dist));
});

gulp.task('app', function() {

  var stream = browserify({entries: paths.src, debug: true, node: true})
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
  gulp.watch(paths.src, ['app']);
});
