/*
 * Created by Qu Yizhi on 2015/3/27
 */

// openid 登陆

/* jshint ignore:start */
var $ = require('../../lib/zepto.js');
var Cookie = require('../../util/cookie');
var _ = require('../../lib/underscore');
/* jshint ignore:end */

// document http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html

//"a=b&c=d" => {a:'b', c:'d'}
function deparam(str) {
    return _.chain((str || '')
            .split(/([^\?#&]+?)[\?#&]/))
        .map(function(s) {
            return (s || '').split(/=/);
        }).filter(function(s) {
            return s && s.length === 2;
        }).object().value();
}

function notRedirected(data) {
    //alert('==== not redirected ====');
    //alert(JSON.stringify(data));
    //{
    //    "ret": 302,
    //    "sub": 302,
    //    "msg": "success",
    //    "redirectUrl": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92cf60f7577e2d48&redirect_uri=http%3A%2F%2Fwx.wepiao.com&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
    //}
    //alert(data && data.ret == '302');
    if (data && data.ret == '302') {
        //alert(data.redirectUrl);
        location.href = data.redirectUrl;
        return false;
    }
    return true;
}

var thisURL = '';

var login = {
    ensure: function(url) {
        var dfd = new $.Deferred();

        if (!url) {
            dfd.reject();
        }
        thisURL = url;

        $.when(
            login.handleCode(thisURL)
        ).then(function(data) {
            if (notRedirected(data)) {
                dfd.resolve(true);
            }
        });

        return dfd.promise();
    },
    handleCode: function(param) {
        var self = this;
        var _param = deparam(param);

        console.log(_param);

        if (param.code) {
            return self.saveTokenToCGI(_param.code);
        } else {
            return self.checkLogin();
        }
    },
    checkLogin: function() {
        var dfd = new $.Deferred();

        //if (localStorage.debug_skipLogin) {
        //    dfd.resolve(true);
        //}

        var url = '';
        var o = {
            _client_redirect_: thisURL + '?_=' + new Date().getTime()
        };

        $.post(
            url,
            o,
            function(data) {
                //alert('==== check login ====');
                //alert(JSON.stringify(data));
                dfd.resolve(data);
            },
            'json'
        );

        return dfd.promise();
    },
    saveTokenToCGI: function(code) {
        var dfd = new $.Deferred();

        var url = '' + new Date().getTime();

        var o = {
            code: code
        };

        $.post(
            url,
            o,
            function(data) {
                //alert('==== save token to cgi ====');
                //alert(code);
                //alert(JSON.stringify(data));
                //alert('---- save token to cgi ---');
                dfd.resolve(data);
            },
            'json'
        );

        return dfd.promise();
    }
}

window.doLogin = function(url) {
    $.when(login.ensure(url)).then(function() {
        alert(1);
    }).fail(function() {
        // alert(2);
        console.log('error: no redirect url')
    });
}

window.doLogin(window.location.href);