/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var gulp = require('gulp');
var config = require('../../config/gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var transform = require('vinyl-transform');

function browserifyTask() {
    var browserified = transform(function(filename) {
        var b = browserify(filename);

        // TODO
        // make zepto external
        //return b.external(['zepto']).bundle();
        return b.bundle();
    });

    return gulp.src([config.src.js + '/**/*.js'])
        .pipe(browserified)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest(config.dist.js));
}

gulp.task('browserify', browserifyTask);

module.exports = browserifyTask;