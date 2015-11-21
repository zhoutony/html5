/*
 * Created by Qu Yizhi on 2015/3/23
 */

var gulp = require('gulp');
var revision = require('git-rev');
var fs = require('fs');
// Require all tasks in gulp/tasks, including subfolders



gulp.task('rev', function() {
    
    revision.short(function(str) {
        console.log('revision short', str);
        var regReversion = /global.reversion = \".*\";/;

        fs.readFile('dev.js', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            var verResult = data.replace(regReversion, 'global.reversion = "' + str + '";');
            fs.writeFile('dev.js', verResult, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        });

        fs.readFile('server.js', 'utf8', function(err, data) {
            if (err) {
                return console.log(err);
            }

            var verResult = data.replace(regReversion, 'global.reversion = "' + str + '";');
            fs.writeFile('server.js', verResult, 'utf8', function(err) {
                if (err) return console.log(err);
            });
        });
    });
});