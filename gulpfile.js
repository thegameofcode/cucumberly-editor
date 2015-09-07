var gulp = require('gulp');
var babel = require('gulp-babel');

var paths = {
  src: 'src/**/*.js'
};

gulp.task('babel', function() {
  return gulp.src(paths.src)
    .pipe(babel())
    .pipe(gulp.dest('dist/build'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['babel']);
});
