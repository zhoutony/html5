/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var config = require('../../config/gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

function jsuglify() {
    return gulp.src([config.src.js + '/**/*.js'])
        .pipe(browserify())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(config.dist.js));
}

gulp.task('uglify', jsuglify);

module.exports = jsuglify;