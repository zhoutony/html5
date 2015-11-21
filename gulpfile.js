/*
 * Created by Qu Yizhi on 2015/3/23
 */

var gulp = require('gulp');
var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/task', {recurse: true});

//gulp.task('default', ['rev', 'img', 'sass', 'watch', 'minify']);
gulp.task('default', ['rev', 'css', 'img', 'fonts', 'tempimages', 'watch', 'minify']);
