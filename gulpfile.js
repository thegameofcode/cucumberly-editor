var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
  entry: 'src/app.jsx',
  src: 'src/**/*.{js,jsx}',
  dist: 'dist/build'
};

var vendors = [
  'react',
  'react-bootstrap',
  'react-router',
  'nedb',
  'lodash',
  'alt'
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

  var stream = browserify({entries: paths.entry, debug: true, node: true, extensions: ['.jsx']})
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
