/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var config = require('../../config/gulp');

function fonts() {
    return gulp.src([config.src.fonts + '/*.*'])
        .pipe(gulp.dest(config.dist.fonts));
}

gulp.task('fonts', fonts);

module.exports = fonts;
