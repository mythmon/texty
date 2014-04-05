var gulp = require('gulp');
var deploy = require("gulp-gh-pages");

var sourceFiles = [
  'index.html',
  'app.js',
  'app.css',
];

gulp.task('deploy', function () {
    gulp.src(sourceFiles)
        .pipe(deploy('https://github.com/mythmon/texty', 'origin'));
});
