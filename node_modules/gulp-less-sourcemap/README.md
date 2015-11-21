gulp-less-sourcemap
=========

A LESS plugin for Gulp with sourcemap file support. Based on [gulp-less](https://github.com/plus3network/gulp-less).

## Install

```
npm install gulp-less-sourcemap
```

## Usage
####Simple example

```javascript
var gulp = require('gulp');
var less = require('gulp-less-sourcemap');
var path = require('path');

gulp.task('less', function () {
  gulp.src('./less/**/*.less')
    .pipe(less({
        sourceMap: {
            sourceMapRootpath: '../less' // Optional absolute or relative path to your LESS files
        }
    }))
    .pipe(gulp.dest('./public/css'));
});
```

####Advanced example:

```javascript
var gulp = require('gulp');
var changed = require('gulp-changed');
var less = require('gulp-less-sourcemap');
var path = require('path');
var fs = require('fs');
var gutil = require('gulp-util');
var notifier = new (require('node-notifier'));

// Gulpfile is placed in project/util
// LESS files are placed in project/app/static/css
var lessSourceFilesBasePath = path.join('..', 'app', 'static', 'css')
var lessSourceFiles = path.join(fs.realpathSync(lessSourceFilesBasePath), '*.less')

gulp.task('less', function () {
    var cssDestination = path.dirname(lessSourceFiles)

    return gulp
        .src(lessSourceFiles)
            .pipe(changed(cssDestination, {extension: '.css'}))
            .pipe(
                less({
                    /*
                    sourceMap: {
                        sourceMapURL: sourceMapFileName,
                        sourceMapBasepath: lessFile.base,
                        sourceMapRootpath: '../less', // Optional absolute or relative path to your LESS files
                        sourceMapFileInline: false
                    }
                    */
                })
            )
            .on('error', function (error) {
                gutil.log(gutil.colors.red(error.message))
                // Notify on error. Uses node-notifier
                notifier.notify({
                    title: 'Less compilation error',
                    message: error.message
                })
            })
            .pipe(gulp.dest(cssDestination));
});

gulp.task('less-watch', function () {
	gulp.watch(lessSourceFiles, ['less'])
});

gulp.task('default', ['less', 'less-watch']);
```

## Options

The options are the same as what's supported by the less parser. By default sourcemaps generation is on. Sourcemaps files be written into destination directory. To generates inline sourcemaps specify `{sourceMap: {sourceMapFileInline: true}}`.

## Error handling

By default, a gulp task will fail and all streams will halt when an error happens. To change this behavior check out the error handling documentation [here](https://github.com/gulpjs/gulp/blob/master/docs/recipes/combining-streams-to-handle-errors.md)

## License

(MIT License)

Copyright (c) 2014 Alex Batalov radist2s@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
