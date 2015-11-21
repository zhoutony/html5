/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var config = require('../../config/gulp');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

function compile() {
    gulp.src(config.dist.css + '/*.css')
        .pipe(minify())
        .pipe(gulp.dest(config.dist.css));
}

gulp.task('minify', ['css'], compile);

module.exports = compile;