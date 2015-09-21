var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
  entry: 'src/components/App.jsx',
  src: 'src/**/*.{js,jsx}',
  dist: 'dist/build'
};

var vendors = [
  'react',
  'react-bootstrap',
  'react-router'
];

var externals = [
  'manager/*.js',
  'shortid',
  'mkdirp',
  'nunjucks',
  'fs',
  'shortid',
  'nedb',
  'path',
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

  externals.forEach(function(external) {
    stream.external(external);
  });

  return stream.bundle()
    .pipe(source('cucumberly.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:index', function(){
  return gulp.src(['src/index.html']).pipe(gulp.dest('dist'));
});

gulp.task('copy:manager', function(){
  return gulp.src(['src/manager/**']).pipe(gulp.dest('dist/manager'));
});

gulp.task('copy:styles', function(){
  return gulp.src(['src/styles/**']).pipe(gulp.dest('dist/styles'));
});

gulp.task('build', ['vendors', 'app', 'copy:index', 'copy:manager', 'copy:styles']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.*', ['build']);
});

gulp.task('watch:app', function() {
  gulp.watch(paths.src, ['app']);
});
