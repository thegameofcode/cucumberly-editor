var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var paths = {
  src: 'src/**/*.js'
};

gulp.task('build', function() {
  return browserify({entries: './src/app.js', extensions: ['.jsx'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('cucumberly.js'))
    .pipe(gulp.dest('dist/build'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});
