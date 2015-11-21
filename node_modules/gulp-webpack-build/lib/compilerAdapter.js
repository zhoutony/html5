'use strict';

var path = require('path'),
    _ = require('lodash'),
    webpack = require('webpack'),
    ProgressPlugin = require('webpack/lib/ProgressPlugin'),
    webpackConfig = require('webpack-config'),
    MemoryFs = require('memory-fs');

var compilers = {};

function CompilerAdapter(webpackOptions, сompilerOptions) {
    if (!_.isObject(webpackOptions)) { webpackOptions = {}; }
    if (!_.isObject(сompilerOptions)) { сompilerOptions = {}; }

    this.webpackOptions = webpackOptions;
    this.сompilerOptions = сompilerOptions;
}

CompilerAdapter.prototype.getCompiler = function(file) {
    var filename = path.resolve(file.path);

    return compilers[filename];
};

CompilerAdapter.prototype.setCompiler = function(file, compiler) {
    var filename = path.resolve(file.path);

    compilers[filename] = compiler;

    return compiler;
};

CompilerAdapter.prototype.configFor = function(file) {
    var filename = path.resolve(file.path),
        config = webpackConfig.fromFile(filename);

    config.merge(this.webpackOptions);
    config.defaults({
        output: {
            path: path.dirname(filename)
        }
    });

    return config.toPlainObject();
};

CompilerAdapter.prototype.createCompiler = function(file) {
    var config = this.configFor(file),
        compiler = config && webpack(config);

    if (compiler) {
        var useMemoryFs = this.сompilerOptions.useMemoryFs === true,
            withProgress = _.isFunction(this.сompilerOptions.progress);

        if (useMemoryFs) {
            compiler.outputFileSystem = new MemoryFs();
        }

        if (withProgress) {
            var progress = this.сompilerOptions.progress;

            compiler.apply(new ProgressPlugin(function(p, msg) {
                progress(file, p, msg);
            }));
        }
    }

    return compiler;
};

CompilerAdapter.prototype.compilerFor = function(file) {
    var compiler = this.getCompiler(file);

    if (!compiler) {
        compiler = this.createCompiler(file);

        if (compiler) {
            this.setCompiler(file, compiler);
        }
    }

    return compiler;
};

CompilerAdapter.prototype.run = function(file, callback) {
    if (!_.isFunction(callback)) { callback = function() {}; }

    var compiler = this.compilerFor(file);

    if (compiler) {
        compiler.run(callback);
    }

    return compiler;
};

CompilerAdapter.prototype.watch = function(file, callback) {
    if (!_.isFunction(callback)) { callback = function() {}; }

    var compiler = this.compilerFor(file),
        watcher;

    if (compiler) {
        var watchDelay = compiler.options.watchDelay || 200;

        watcher = compiler.watcher;

        if (watcher) {
            watcher.close(function() {});

            compiler = this.createCompiler(file);
        }

        watcher = compiler.watch(watchDelay, callback);

        if (watcher) {
            compiler.watcher = watcher;

            this.setCompiler(file, compiler);
        }
    }

    return watcher;
};

module.exports = CompilerAdapter;
