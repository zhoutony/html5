//TODO: 兼容性 webkitTransform
define([
    '../lib/zepto',
    '../lib/underscore'
], function(
    $,
    _
) {
    var Transformer = function($el) {
        this.init($el);
    }

    Transformer.prototype = {
        init: function($el) {
            this.$el = $el;
            this.el = $el[0];
            return this;
        },
        setOrigin: function(value) {
            this.el.style.webkitTranformOrigin = value;
        },
        set: function(name, param) {
            var o = this.get();
            o[name] = param;
            this.setAll(o);
        },
        setAll: function(o) {
            var str = Joint._.map(o, function(param, key) {
                return key + "(" + param.join(',') + ")";
            }).join(' ');

            this.el.style["webkitTransform"] = str; 
        },
        get: function() {
            var t = this.el.style.webkitTranform || '';
            var result = {};
            t.replace(/([a-z0-9]+)\s*\((.+?)\);?/gi, function(a, key, param) {
                result[key] = param.split(/\s*,\s*/);
            });

            return result;
        }
    }

    return Transformer;

});