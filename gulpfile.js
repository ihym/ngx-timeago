var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json', {
  declaration: true
});

gulp.task('default', function() {
  var tsResult = gulp.src('lib/src/language-strings/*', {base: 'lib/src/'})
    .pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest('dist/ngx-timeago/'));
});
