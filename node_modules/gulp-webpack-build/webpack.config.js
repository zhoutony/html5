'use strict';

var path = require('path'),
    webpack = require('webpack'),
    BowerPlugin = require('bower-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpackConfig = require('webpack-config');

module.exports = webpackConfig.fromObject({
    output: {
        filename: '[name].js'
    },
    resolve: {
        root: [
            __dirname,
            path.join(__dirname, 'test', 'fixtures')
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new BowerPlugin({
            excludes: [
                /.*\.min.*/
            ]
        }),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        preLoaders: [{
            test: /\.html$/,
            loader: 'html-loader',
            query: {
                minimize: true,
                removeRedundantAttributes: false
            }
        }],
        loaders: [{
            test: /\.css$/,
            exclude: /.*\.min.css/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-minimize&disableStructuralMinification')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-minimize&disableStructuralMinification!less-loader?-compress&-cleancss')
        }]
    }
});
