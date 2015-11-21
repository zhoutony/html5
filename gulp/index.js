/*
 * Created by Qu Yizhi on 2015/3/23
 */

var gulp = require('gulp');

module.exports = function(tasks){

    tasks.forEach(function(name){
        gulp.task(name, require('./task'+ name));
    });

    return gulp;

}