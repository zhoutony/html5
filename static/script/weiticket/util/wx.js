define([
    '../../lib/zepto.js',
    './wejs'
], function(
    $,
    wx
) {
    //验证签名
    function wx_verif(force, debug) {
        var _force = force,
            _debug = debug;
        var verif_Url = ['http://wx.wepiao.com', 'http://yx.wepiao.com', 'http://weixin.wepiao.com', 'http://www.wxmovie.com/'];
        if (verif_Url.indexOf(window.location.origin) == -1) {
            // alert("您当前不在微信电影票的认证域名,不能使用分享功能");
            // return;
        }
        getcap(_force, _debug);
    }

    function getcap(_force, _debug) {

        $.ajax({
            type: "get",
            async: true,
            data: {
                url: window.location.href,
                force: _force
            },
            url: "http://182.254.230.26:8080/CreateJsApiTicket.php",
            dataType: "jsonp",
            success: function(res) {
                if (res.ret == 0) {
                    var data = res.data;
                    //alert(JSON.stringify(data));
                    //alert(_debug);
                    
                    wx.config({
                        debug: _debug, //如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature, // 必填
                        jsApiList: ['openLocation','onMenuShareTimeline', 'onMenuShareAppMessage','chooseWXPay'] // 必填
                    });

                    alert(wx.ready);

                    if (_force == 1) {
                        // share(share_param);
                    }

                    wx.error(function(res) {
                        alert(JSON.stringify(res));
                        //签名过期导致验证失败
                        if (res.errMsg != 'config:ok') { //如果签名失效，不读缓存，强制获取新的签名
                            console.log("签名失效");
                            wx_verif(1, false);
                        }
                    });
                }
            },
            error: function() {
                alert(1);
                if (_force == 1) {
                    // share(share_param);
                }
            }
        });
    }

    function _openLocation(config){
        wx.openLocation(config);
    }

    function _chooseWXPay(config){
        console.log("_chooseWXPay_chooseWXPay_chooseWXPay_chooseWXPay_chooseWXPay");
        console.log(config);
        wx.chooseWXPay(config);
    }

    //console.log(window.location.href);
    //alert(window.location.href);
    wx_verif(0, true);
    return {
        auth: wx_verif,
        openLocation: _openLocation,
        chooseWXPay : _chooseWXPay,
        ready: wx.ready
    }
});