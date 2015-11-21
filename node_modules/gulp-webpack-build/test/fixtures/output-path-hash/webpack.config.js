'use strict';

var path = require('path'),
    webpackConfig = require('webpack-config');

module.exports = webpackConfig.fromCwd().extend({
    output: {
        path: path.join(__dirname, '[hash]')
    },
    entry: {
        'output-path-hash': path.join(__dirname, 'index.js')
    }
});
