'use strict';

var path = require('path'),
    webpack = require('webpack'),
    webpackConfig = require('webpack-config');

module.exports = webpackConfig.fromCwd().extend({
    entry: {
        'uglifyjs': path.join(__dirname, 'index.js')
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
});
