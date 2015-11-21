var path = require('path');

var src = {
    root: path.resolve(__dirname, '../'),
    lib: path.resolve(__dirname, '../lib'),
    //middleware: path.resolve(__dirname, '../middleware'),
    route: path.resolve(__dirname, '../route'),
    path: path.resolve(__dirname, '../static'),
    js: path.resolve(__dirname, '../static/script'),
    css: path.resolve(__dirname, '../static/css'),
    img: path.resolve(__dirname, '../static/images'),
    jshintrc: path.resolve(__dirname, '../.jshintrc'),
    fonts: path.resolve(__dirname, '../static/font'),
    tempimages: path.resolve(__dirname, '../static/tempimages'),
    //precommit: path.resolve(__dirname, '../.pre-commit'),
    git: path.resolve(__dirname, '../.git')
};

var dist = {
    path: path.resolve(__dirname, '../dist'),
    js: path.resolve(__dirname, '../dist/script'),
    css: path.resolve(__dirname, '../dist/css'),
    img: path.resolve(__dirname, '../dist/images'),
    fonts: path.resolve(__dirname, '../dist/font'),
    tempimages: path.resolve(__dirname, '../dist/tempimages')
};

var config = {
    src: src,
    dist: dist
};

module.exports = config;