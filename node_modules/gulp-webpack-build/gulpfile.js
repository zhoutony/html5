'use strict';

var path = require('path'),
    gulp = require('gulp'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    jsdoc2md = require('gulp-jsdoc-to-markdown'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    webpack = require('./'),
    Gitdown = require('gitdown');

var src = './lib',
    paths = {
        src: {
            test: './test/fixtures',
            scripts: [
                path.join(src, '*.js'),
                path.join('./samples', '**/*.js'),
                'gulpfile.js'
            ]
        },
        dest: {
            test: './test/expected'
        }
    },
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

gulp.task('lint', function() {
    return gulp.src(paths.src.scripts)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('webpack', [], function() {
    return gulp.src(path.join(paths.src.test, '**', CONFIG_FILENAME), { base: path.resolve(paths.src.test) })
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
        .pipe(gulp.dest(paths.dest.test));
});

gulp.task('watch', [], function() {
    gulp.watch(path.join(paths.src.test, '**/*.*')).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(paths.src.test) })
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
                        .pipe(gulp.dest(paths.dest.test));
                }));
        }
    });
});

gulp.task('clean', function(callback) {
    del(path.join(paths.dest.test, '**'), callback);
});

gulp.task('gitdown:readme', function() {
    return Gitdown.read('.gitdown/README.md').write('README.md');
});

gulp.task('gitdown:api', function() {
    var gitdown = Gitdown.read('.gitdown/docs/API.md');

    gitdown.config.headingNesting.enabled = false;

    return gitdown.write('docs/API.md');
});

gulp.task('gitdown', function(callback) {
    runSequence('gitdown:readme', 'gitdown:api', callback);
});

gulp.task('jsdoc2md', function() {
    return gulp.src([
            './index.js',
            path.join(src, '**/*.js')
        ])
        .pipe(concat('API.md'))
        .pipe(jsdoc2md())
        .pipe(gulp.dest('.gitdown/docs'));
});

gulp.task('docs', function(callback) {
    runSequence('jsdoc2md', 'gitdown', callback);
});

gulp.task('ci', function(callback) {
    runSequence('lint', 'webpack', callback);
});

gulp.task('default', [], function(callback) {
    runSequence('clean', 'lint', 'docs', 'webpack', callback);
});
