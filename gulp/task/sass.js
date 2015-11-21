/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var config = require('../../config/gulp');
var sourcemaps = require('gulp-sourcemaps');

function compile() {
    //return sass(config.src.css)
    //    .on('error', function(err) {
    //        console.error('Error!', err.message);
    //    })
    //    .pipe(gulp.dest(config.dist.css));
}

gulp.task('sass', compile);

module.exports = compile;