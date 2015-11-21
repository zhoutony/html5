[![NPM version](http://img.shields.io/npm/v/gulp-webpack-build.svg?style=flat)](https://www.npmjs.org/package/gulp-webpack-build) [![Travis build status](http://img.shields.io/travis/mdreizin/gulp-webpack-build/master.svg?style=flat)](https://travis-ci.org/mdreizin/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build) [![Dependency Status](https://david-dm.org/mdreizin/gulp-webpack-build/dev-status.svg?style=flat)](https://david-dm.org/mdreizin/gulp-webpack-build#info=devDependencies)

[gulp](https://github.com/gulpjs/gulp)-[webpack](https://github.com/webpack/webpack)-build
==========================================================================================

Helps to build bundles based on webpack configs

<h2 id="documentation">Documentation</h2>

For API docs please see the [documentation page](https://github.com/mdreizin/gulp-webpack-build/blob/master/docs/API.md)!

<h2 id="sample">Sample</h2>

Here is a quick sample of what `gulp-webpack-build` does

`gulpfile.js`

``` javascript
'use strict';

var path = require('path'),
    gulp = require('gulp'),
    webpack = require('gulp-webpack-build');

var src = './src',
    dest = './dist',
    webpackOptions = {
        debug: true,
        devtool: '#source-map',
        watchDelay: 200
    },
    webpackConfig = {
        useMemoryFs: true,
        progress: true
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;

gulp.task('webpack', [], function() {
    return gulp.src(path.join(src, '**', CONFIG_FILENAME), { base: path.resolve(src) })
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOptions))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(path.join(src, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(src) })
                .pipe(webpack.closest(CONFIG_FILENAME))
                .pipe(webpack.configure(webpackConfig))
                .pipe(webpack.overrides(webpackOptions))
                .pipe(webpack.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })
                        .pipe(webpack.proxy(err, stats))
                        .pipe(webpack.format({
                            verbose: true,
                            version: false
                        }))
                        .pipe(gulp.dest(dest));
                }));
        }
    });
});

```