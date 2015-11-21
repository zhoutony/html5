'use strict';

var path = require('path'),
    webpackConfig = require('webpack-config');

module.exports = webpackConfig.fromCwd().extend({
    entry: {
        'simple-config': path.join(__dirname, 'index.js')
    }
});
