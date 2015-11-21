/**
 * Created by Qu Yizhi on 2015/3/23.
 */

var config = require('../../config/gulp');
var gulp = require('gulp');
var jshint = require('gulp-jshint');

function lint() {
    return gulp.src([
        config.src.root + '/*.js',
        config.src.route + '/**/*.js',
        //config.src.middleware + '/**/*.js',
        config.src.lib + '/**/*.js',
        config.src.js + '/**/*.js'
    ])
        .pipe(jshint(config.src.jshintrc))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
}

gulp.task('lint', lint);

module.exports = lint;