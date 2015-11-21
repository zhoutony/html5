'use strict';

var _ = require('lodash'),
    MemoryFs = require('memory-fs'),
    Stats = require('webpack/lib/Stats');

module.exports = {
    isMemoryFs: function(value) {
        return _.isObject(value) && value instanceof MemoryFs;
    },

    isStats: function(value) {
        return _.isObject(value) && value instanceof Stats;
    },

    isMultiStats: function(value) {
        var stats = _.isObject(value) && value.stats;

        return _.isArray(stats) && _.every(stats, this.isStats, this);
    }
};
