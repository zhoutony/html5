<a name="module_gulp-webpack-build"></a>
#gulp-webpack-build
**Example**  
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

**Members**

* [gulp-webpack-build](#module_gulp-webpack-build)
  * [gulp-webpack-build.core](#module_gulp-webpack-build.core)
  * [gulp-webpack-build.config](#module_gulp-webpack-build.config)
  * [gulp-webpack-build.compile([callback])](#module_gulp-webpack-build.compile)
  * [gulp-webpack-build.format(options)](#module_gulp-webpack-build.format)
  * [gulp-webpack-build.failAfter(options)](#module_gulp-webpack-build.failAfter)
  * [gulp-webpack-build.closest([basename])](#module_gulp-webpack-build.closest)
  * [gulp-webpack-build.watch([callback])](#module_gulp-webpack-build.watch)
  * [gulp-webpack-build.proxy(err, stats)](#module_gulp-webpack-build.proxy)
  * [gulp-webpack-build.overrides(options)](#module_gulp-webpack-build.overrides)
  * [gulp-webpack-build.configure(options)](#module_gulp-webpack-build.configure)
  * [callback: gulp-webpack-build.compilationCallback](#module_gulp-webpack-build.compilationCallback)

<a name="module_gulp-webpack-build.core"></a>
##gulp-webpack-build.core
Alias for [webpack](http://webpack.github.io/docs/node.js-api.html).

**Properties**

-  `webpack`  

**Read only**: true  
<a name="module_gulp-webpack-build.config"></a>
##gulp-webpack-build.config
Alias for [webpack-config](http://mdreizin.github.io/webpack-config).

**Properties**

-  `WebpackConfig`  

**Read only**: true  
<a name="module_gulp-webpack-build.compile"></a>
##gulp-webpack-build.compile([callback])
Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run` or `webpack.watch`. Re-emits all data passed from `webpack.run` or `webpack.watch`. Can be piped.
**Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.

**Params**

- \[callback\] `compilationCallback` - The callback function.  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.format"></a>
##gulp-webpack-build.format(options)
Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.

**Params**

- options `Object` - Options to pass to [`stats.toString`](http://webpack.github.io/docs/node.js-api.html#stats-tostring).  
  - \[verbose=`false`\] `Boolean` - Writes fully formatted version of `stats` object.  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.failAfter"></a>
##gulp-webpack-build.failAfter(options)
Stops a task if some `stats` objects have some errors or warnings. Can be piped.

**Params**

- options `Object` - Options.  
  - \[errors=`false`\] `Boolean` - Fails build if some `stats` objects have some errors.  
  - \[warnings=`false`\] `Boolean` - Fails build if some `stats` objects have some warnings.  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.closest"></a>
##gulp-webpack-build.closest([basename])
For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
**Note**: Needs to be used together with `webpack.watch`.

**Params**

- \[basename=`webpack.config.js`\] `String` - The name of config file.  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.watch"></a>
##gulp-webpack-build.watch([callback])
Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.watch`. Re-emits all data passed from `webpack.watch`. Can be piped.
**Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.

**Params**

- \[callback\] `compilationCallback` - The callback function.  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.proxy"></a>
##gulp-webpack-build.proxy(err, stats)
Re-uses existing `err` and `stats` objects. Can be piped.

**Params**

- err `Error` - Error.  
- stats `Stats` - Please see [stats](http://webpack.github.io/docs/node.js-api.html#stats).  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.overrides"></a>
##gulp-webpack-build.overrides(options)
Overrides existing properties of each `webpack.config.js` file. Can be piped.

**Params**

- options `Object` - Please see [configuration](http://webpack.github.io/docs/configuration.html#configuration-object-content).  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.configure"></a>
##gulp-webpack-build.configure(options)
Helps to configure `webpack` compiler. Can be piped.

**Params**

- options `Object` - Options.  
  - \[useMemoryFs=`false`\] `Boolean` - Uses [memory-fs](https://github.com/webpack/memory-fs) for `compiler.outputFileSystem`. Prevents writing of emitted files to file system. `gulp.dest` can be used. `gulp.dest` is resolved relative to [output.path](https://github.com/webpack/docs/wiki/configuration#outputpath) if it is set; otherwise, it is resolved relative to [options.base](https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase) (by default, the path of `gulpfile.js`).  
  - \[progress=`false`\] `Boolean` - Adds ability to track compilation progress.  

**Returns**: `Stream`  
<a name="module_gulp-webpack-build.compilationCallback"></a>
##callback: gulp-webpack-build.compilationCallback
Called when `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.
**Note**: `this` is stream of `webpack.config.js` file.

**Params**

- err `Error` - Error.  
- stats `Stats` - Please see [stats](http://webpack.github.io/docs/node.js-api.html#stats)  

**Type**: `function`  
