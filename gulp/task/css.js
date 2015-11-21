/**
 * Created  on 2015/11/11.
 */

var gulp = require('gulp');
var config = require('../../config/gulp');

function css() {
    return gulp.src([config.src.css + '/*.*'])
        .pipe(gulp.dest(config.dist.css));
}

gulp.task('css', css);

module.exports = css;