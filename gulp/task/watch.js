/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var config = require('../../config/gulp');
var gulp = require('gulp');
// var webpack = require('./webpack');
var sass = require('./sass');

function watch() {
    // gulp.watch(config.src.css + '/**/*.scss', ['sass']);
    // gulp.watch(config.src.js + '/**/*.js', ['webpack']);

    gulp.watch(config.src.css + '/*.css', ['css']);
}

gulp.task('watch', watch);

module.exports = watch;