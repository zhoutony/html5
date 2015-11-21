/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var config = require('../../config/gulp');

function tempimages() {
    return gulp.src([config.src.tempimages + '/*.*'])
        .pipe(gulp.dest(config.dist.tempimages));
}

gulp.task('tempimages', tempimages);

module.exports = tempimages;