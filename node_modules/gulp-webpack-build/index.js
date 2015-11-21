'use strict';

var path = require('path'),
    fs = require('fs'),
    _ = require('lodash'),
    through = require('through2'),
    tildify = require('tildify'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackConfig = require('webpack-config'),
    CompilerAdapter = require('./lib/compilerAdapter'),
    util = require('./lib/util');

var PLUGIN_NAME = 'gulp-webpack-build',
    defaultStatsOptions = {
        colors: true,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: true,
        version: true,
        cached: false,
        cachedAssets: false,
        reasons: false,
        source: false,
        errorDetails: false
    },
    defaultVerboseStatsOptions = {
        colors: true,
        version: false
    };

function wrapError(err) {
    return new gutil.PluginError(PLUGIN_NAME, err);
}

function getOutputFs(outputFs) {
    return !util.isMemoryFs(outputFs) ? fs : outputFs;
}

function isStats(stats) {
    return util.isStats(stats) || util.isMultiStats(stats);
}

function toMultiStats(stats) {
    var multiStats = [];

    if (util.isStats(stats)) {
        multiStats = [stats];
    } else if (util.isMultiStats(stats)) {
        multiStats = stats.stats;
    }

    return multiStats;
}

function getFiles(chunk, stats) {
    if (!util.isStats(stats)) { return []; }

    var compilation = stats.compilation,
        assets = compilation.assets || {},
        compiler = compilation.compiler,
        outputFs = getOutputFs(compiler.outputFileSystem);

    return _(assets).chain().keys().filter(function(key) {
        var asset = assets[key];

        return asset && asset.emitted === true;
    }).map(function(key) {
        var asset = assets[key],
            filename = asset.existsAt,
            base = path.resolve(filename, chunk.base),
            contents = outputFs.readFileSync(filename);

        return new gutil.File({
            base: base,
            path: filename,
            contents: contents
        });
    }).value();
}

function getMultiFiles(chunk, stats) {
    var multiStats = toMultiStats(stats);

    return _(multiStats).chain().map(function(x) {
        return getFiles(chunk, x);
    }).flatten().value();
}

function processStats(chunk, stats) {
    if (!isStats(stats)) { return; }

    var files = getMultiFiles(chunk, stats);

    files.forEach(function(file) {
        file.stats = stats;
        file.origin = chunk;

        this.push(file);
    }, this);
}

function progressCallback(chunk, p, msg) {
    var percentage = Math.floor(p * 100) + '%';

    if (p === 0) {
        var filename = path.resolve(chunk.path);

        gutil.log('Progress for webpack config', gutil.colors.magenta(tildify(filename)));
    }

    gutil.log(percentage, gutil.colors.grey(msg));
}

function getWebpackOptions(chunk, watching) {
    var options = chunk.webpackOptions || {};

    if (watching === false) {
        delete options.watch;
    }

    return options;
}

function getCompilerOptions(chunk) {
    var options = chunk.compilerOptions || {};

    if (options.progress === true) {
        options.progress = progressCallback;
    }

    return options;
}

/**
 * Called when `webpack.config.js` file is compiled. Will be passed `err` and `stats` objects.
 * **Note**: `this` is stream of `webpack.config.js` file.
 * @callback compilationCallback
 * @param {Error} err - Error.
 * @param {Stats} stats - Please see {@link http://webpack.github.io/docs/node.js-api.html#stats stats}
 * @memberof module:gulp-webpack-build
 */

/**
 * Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.run` or `webpack.watch`. Re-emits all data passed from `webpack.run` or `webpack.watch`. Can be piped.
 * **Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.
 * @param {compilationCallback} [callback] - The callback function.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function compile(callback) {
    if (!_.isFunction(callback)) { callback = function() {}; }

    return through.obj(function(chunk, enc, cb) {
        var webpackOptions = getWebpackOptions(chunk, false),
            compilerOptions = getCompilerOptions(chunk),
            adapter = new CompilerAdapter(webpackOptions, compilerOptions);

        var compiler = adapter.run(chunk, function(err, stats) {
            processStats.call(this, chunk, stats);

            if (err) { this.emit('error', wrapError(err)); }

            cb(err);
            callback.apply(chunk, [err, stats]);
        }.bind(this));

        if (_.isUndefined(compiler)) {
            cb();
        }
    });
}

/**
 * Writes formatted string of `stats` object and displays related `webpack.config.js` file path. Can be piped.
 * @param {Object} options - Options to pass to {@link http://webpack.github.io/docs/node.js-api.html#stats-tostring `stats.toString`}.
 * @param {Boolean} [options.verbose=`false`] - Writes fully formatted version of `stats` object.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function format(options) {
    if (!_.isObject(options)) { options = {}; }

    var cache = {},
        statsOptions = options.verbose === true ? _.defaults(options, defaultVerboseStatsOptions) : _.defaults(options, defaultStatsOptions);

    if (!gutil.colors.supportsColor) {
        statsOptions.colors = false;
    }

    return through.obj(function(chunk, enc, callback) {
        var stats = chunk.stats;

        if (isStats(stats) && _.isUndefined(cache[stats.hash])) {
            var filename = path.resolve(chunk.origin.path);

            cache[stats.hash] = stats;

            gutil.log('Stats for webpack config', gutil.colors.magenta(tildify(filename)));
            gutil.log('\n' + stats.toString(statsOptions));
        }

        callback(null, chunk);
    }).once('end', function() {
        cache = null;
    });
}

/**
 * Stops a task if some `stats` objects have some errors or warnings. Can be piped.
 * @param {Object} options - Options.
 * @param {Boolean} [options.errors=`false`] - Fails build if some `stats` objects have some errors.
 * @param {Boolean} [options.warnings=`false`] - Fails build if some `stats` objects have some warnings.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function failAfter(options) {
    var cache = {};

    return through.obj(function(chunk, enc, cb) {
        var stats = chunk.stats;

        if (isStats(stats) && _.isUndefined(cache[stats.hash])) {
            cache[stats.hash] = stats;
        }

        cb(null, chunk);
    }).once('end', function() {
        var hasErrors = false,
            hasWarnings = false;

        if (options.errors === true) {
            hasErrors = _(cache).chain().values().some(function(x) {
                return x.hasErrors();
            }).value();
        }

        if (options.warnings === true) {
            hasWarnings = _(cache).chain().values().some(function(x) {
                return x.hasWarnings();
            }).value();
        }

        if (hasErrors || hasWarnings) {
            var err = new Error('Webpack cannot compile config');

            this.emit('error', wrapError(err));
        }

        cache = null;
    });
}

/**
 * For each file returned by `gulp.src()`, finds the closest `webpack.config.js` file (searching the directory as well as its ancestors). Can be piped.
 * **Note**: Needs to be used together with `webpack.watch`.
 * @param {String} [basename=`webpack.config.js`] - The name of config file.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function closest(basename) {
    return through.obj(function(chunk, enc, cb) {
        var filename = WebpackConfig.closest(chunk.path, basename);

        if (filename) {
            this.push(new gutil.File({
                path: filename,
                base: chunk.base
            }));
        }

        cb();
    });
}

var watchers = {};

/**
 * Accepts `webpack.config.js` files via `gulp.src`, then compiles via `webpack.watch`. Re-emits all data passed from `webpack.watch`. Can be piped.
 * **Note**: Needs to be used after `webpack.configure` and `webpack.overrides`.
 * @param {compilationCallback} [callback] - The callback function.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function watch(callback) {
    if (!_.isFunction(callback)) { callback = function() {}; }

    return through.obj(function(chunk, enc, cb) {
        var stat = fs.statSync(chunk.path),
            watcher = watchers[chunk.path],
            isDirty = watcher && watcher.modifiedTime < stat.mtime;

        if (isDirty === true) {
            delete watchers[chunk.path];
        }

        if (!watchers[chunk.path]) {
            gutil.log('Waiting changes for webpack config', gutil.colors.magenta(tildify(chunk.path)));

            var webpackOptions = getWebpackOptions(chunk, false),
                compilerOptions = getCompilerOptions(chunk),
                adapter = new CompilerAdapter(webpackOptions, compilerOptions);

            watcher = adapter.watch(chunk, function(err, stats) {
                callback.apply(chunk, [err, stats]);
            });

            if (watcher) {
                watcher.modifiedTime = stat.mtime;

                watchers[chunk.path] = watcher;
            }
        }

        cb();
    });
}

/**
 * Re-uses existing `err` and `stats` objects. Can be piped.
 * @param {Error} err - Error.
 * @param {Stats} stats - Please see {@link http://webpack.github.io/docs/node.js-api.html#stats stats}.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function proxy(err, stats) {
    return through.obj(function(chunk, enc, cb) {
        processStats.call(this, chunk, stats);

        if (err) { this.emit('error', wrapError(err)); }

        cb(err);
    });
}

/**
 * Overrides existing properties of each `webpack.config.js` file. Can be piped.
 * @param {Object} options - Please see {@link http://webpack.github.io/docs/configuration.html#configuration-object-content configuration}.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function overrides(options) {
    if (!_.isObject(options)) { options = {}; }

    return through.obj(function(chunk, enc, cb) {
        chunk.webpackOptions = options;

        cb(null, chunk);
    });
}

/**
 * Helps to configure `webpack` compiler. Can be piped.
 * @param {Object} options - Options.
 * @param {Boolean} [options.useMemoryFs=`false`] - Uses {@link https://github.com/webpack/memory-fs memory-fs} for `compiler.outputFileSystem`. Prevents writing of emitted files to file system. `gulp.dest` can be used. `gulp.dest` is resolved relative to {@link https://github.com/webpack/docs/wiki/configuration#outputpath output.path} if it is set; otherwise, it is resolved relative to {@link https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase options.base} (by default, the path of `gulpfile.js`).
 * @param {Boolean} [options.progress=`false`] - Adds ability to track compilation progress.
 * @returns {Stream}
 * @memberof module:gulp-webpack-build
*/
function configure(options) {
    if (!_.isObject(options)) { options = {}; }

    return through.obj(function(chunk, enc, cb) {
        chunk.compilerOptions = options;

        cb(null, chunk);
    });
}

/**
 * @module gulp-webpack-build
 * @example
 * `gulpfile.js`
 *
 * ``` javascript
 * {"gitdown": "include", "file": "samples/gulpfile.js"}
 * ```
 */
module.exports = {
    compile: compile,
    format: format,
    failAfter: failAfter,
    closest: closest,
    watch: watch,
    proxy: proxy,
    overrides: overrides,
    configure: configure,
    /**
     * Alias for {@link http://webpack.github.io/docs/node.js-api.html webpack}.
     * @property {webpack}
     * @readonly
     */
    core: webpack,
    /**
     * Alias for {@link http://mdreizin.github.io/webpack-config webpack-config}.
     * @property {WebpackConfig}
     * @readonly
     */
    config: WebpackConfig
};
