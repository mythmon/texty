var gulp = require('gulp');
var deploy = require("gulp-gh-pages");
require('gulp-help')(gulp);

var sourceFiles = [
  'index.html',
  'app.js',
  'app.css',
];

gulp.task('deploy', 'Deploy to GH Pages', function () {
    gulp.src(sourceFiles)
        .pipe(deploy('https://github.com/mythmon/texty', 'origin'));
});
