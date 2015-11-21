/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var config = require('../../config/gulp');

function img() {
    return gulp.src([config.src.img + '/*.*'])
        .pipe(gulp.dest(config.dist.img));
}

gulp.task('img', img);

module.exports = img;
