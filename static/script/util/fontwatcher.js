//refer https://github.com/typekit/webfontloader/tree/master/src/core
define([
    '../lib/underscore',
    '../util/base'
], function(
    _,
    Base
) {

    function watch(font, str) {
        str = str || 'BESbswy';
        return _.when(
            compare(font, str, 'serif'),
            compare(font, str, 'sans-serif')
        ).then(function(width) {
            return width / 300 / str.length;
        });
    }

    var FontWatcher = function(font, str, baseFont) {
        this.init(font, str, baseFont);
    };

    FontWatcher.prototype = {
        init: function(font, str, baseFont) {
            this._ruler = new FontRuler(font + ',' + baseFont, str);
            this._base = new FontRuler(baseFont, str);
            this._start = Date.now();
            this._dfd = new _.Deferred();
        },
        timeout: 5000,
        check: function() {
            var rWidth = this._ruler.getWidth();
            if (Date.now() - this._start > this.timeout) {
                this._dfd.reject('timeout');
            } else if (rWidth != this._base.getWidth()) {
                this._dfd.resolve(rWidth);
            } else {
                this._dfd.resolve(rWidth); //WTF
                _.when(Base.bind(this.check, this));
            }
        },
        getPromise: function() {
            return this._dfd.promise();
        },
        resolve: function(w) {
            this._ruler.destroy();
            this._base.destroy();
            this._dfd.resolve(w);
        },
        reject: function(e) {
            this._ruler.destroy();
            this._base.destroy();
            this._dfd.reject(e);
        }
    };

    function compare(font, str, baseFont) {
        var watcher = new FontWatcher(font, str, baseFont);
        watcher.check();
        return watcher.getPromise();
    }

    var FontRuler = function(font, str) {
        this.init(font, str);
    };

    FontRuler.prototype = {
        init: function(font, str) {
            if (_.isString(font)) {
                font = {
                    'font-family': font
                };
            }

            this.$el = $('<span>').text(str).css({
                position: 'absolute',
                top: -999,
                left: -999,
                fontSize: '300px',
                width: 'auto',
                height: 'auto',
                lineHeight: 'normal',
                margin: 0,
                padding: 0,
                whiteSpace: 'nowrap'
            }).css(font).appendTo(document.body);
        },
        getWidth: function() {
            return this.$el[0].offsetWidth;
        },
        destroy: function() {
            this.$el.remove();
        }
    };

    return {
        watch: watch
    }
});