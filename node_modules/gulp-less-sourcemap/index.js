var less = require('less');
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var path = require('path');
var defaults = require('lodash.defaults');
var fs = require('fs');

const PLUGIN_NAME = 'gulp-less-sourcemap';

/**
 * @param {Function|Object} options
 * @returns {*}
 */
module.exports = function (options) {

  function transform (lessFile, enc, next) {
    var self = this;

    if (lessFile.isNull()) {
      this.push(lessFile); // pass along
      return next();
    }

    if (lessFile.isStream()) {
      this.emit('error', new PluginError('gulp-less-sourcemap', 'Streaming not supported'));
      return next();
    }

    var lessCode = lessFile.contents.toString('utf8');
    var lessSourceFilename = path.basename(lessFile.path);
    var sourceMapFileName = gutil.replaceExtension(lessSourceFilename, '.css.map');
    var opts = options || {};

    // You can pass options as callback who return generated options object
    // based on dynamic arguments of transform function
    if (typeof options === 'function') {
      opts = options.apply(this, arguments) || {};
    }

    // Clone default options
    opts = defaults({}, opts);

    var sourceMapOpts = {
      sourceMapURL: sourceMapFileName,
      sourceMapBasepath: lessFile.base,
      sourceMapRootpath: '',
      sourceMapFileInline: false
    };

    if (opts.sourceMap instanceof Object) {
      // First defaults sourceMap options and clone sourceMap object(Lodash.defaults doesn't recursive cloning)
      opts.sourceMap = defaults({}, opts.sourceMap, sourceMapOpts);
    }

    // Mixes in default options
    opts = defaults(opts, {sourceMap: sourceMapOpts});

    // Injects the path of the current file, this file will passed to LESS
    opts.filename = lessFile.path;

    less.render(lessCode, opts).then(
      // Success
      function (output) {
        var cssFile = new (gutil.File)({
          path: gutil.replaceExtension(lessSourceFilename, '.css'),
          contents: new Buffer(output.css, 'utf8')
        });

        self.push(cssFile);

        if (output.map) {
          var sourcemapFile = new (gutil.File)({
            path: sourceMapFileName,
            contents: new Buffer(output.map, 'utf8')
          });

          self.push(sourcemapFile);
        }

        next();
      },
      // Error
      function (err) {
        // convert the keys so PluginError can read them
        err.lineNumber = err.line;
        err.fileName = err.filename;

        // add a better error message
        err.message = err.message + ' in file ' + err.fileName + ' line no. ' + err.lineNumber;

        self.emit('error', new PluginError('gulp-less-sourcemap', err));

        next();
      }
    );
  }

  return through2.obj(transform);
};
