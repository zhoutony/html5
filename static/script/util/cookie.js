define(['underscore'], function(_) {

    // var pluses = /\+/g;

    // function raw(s) {
    //     return s;
    // }

    // function decoded(s) {
    //     return decodeURIComponent(s.replace(pluses, ' '));
    // }

    // var cookie = function cookie(key, value, options) {

    //     // write
    //     if (value !== undefined) {
    //         options = _.extend({}, cookie.defaults, options);

    //         if (value === null) {
    //             options.expires = -1;
    //         }

    //         if (typeof options.expires === 'number') {
    //             var days = options.expires,
    //                 t = options.expires = new Date();
    //             t.setDate(t.getDate() + days);
    //         }

    //         value = cookie.json ? JSON.stringify(value) : String(value);

    //         return (document.cookie = [
    //             encodeURIComponent(key), '=', cookie.raw ? value : encodeURIComponent(value),
    //             options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
    //             options.path ? '; path=' + options.path : '',
    //             options.domain ? '; domain=' + options.domain : '',
    //             options.secure ? '; secure' : ''
    //         ].join(''));
    //     }

    //     // read
    //     var decode = cookie.raw ? raw : decoded;
    //     var cookies = document.cookie.split('; ');
    //     for (var i = 0, l = cookies.length; i < l; i++) {
    //         var parts = cookies[i].split('=');
    //         if (decode(parts.shift()) === key) {
    //             var c = decode(parts.join('='));
    //             return cookie.json ? JSON.parse(c) : c;
    //         }
    //     }

    //     return null;
    // };

    // cookie.defaults = {};

    // function removeCookie(key, options) {
    //     if (cookie(key) !== null) {
    //         cookie(key, null, options);
    //         return true;
    //     }
    //     return false;
    // };

    // cookie.remove = removeCookie;

    // return cookie;

    var docCookies = {
      getItem: function (sKey) {
        if (!sKey) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      },
      setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
          switch (vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
              break;
            case String:
              sExpires = "; expires=" + vEnd;
              break;
            case Date:
              sExpires = "; expires=" + vEnd.toUTCString();
              break;
          }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
      },
      removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
      },
      hasItem: function (sKey) {
        if (!sKey) { return false; }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      },
      keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
      }
    };

    return docCookies;

});