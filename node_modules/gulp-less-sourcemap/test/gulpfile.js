var gulp = require('gulp');
var less = require('../');
var path = require('path');

gulp.task('default', function () {
    gulp.src('./fixtures/buttons.less')
        .pipe(less())
        .pipe(gulp.dest('./out'));
});