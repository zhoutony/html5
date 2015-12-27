var os          = require('os');
var util        = require('util');
var model       = require(process.cwd() + "/libs/model.js");
var os          = require('os');
var pid         = process.pid;
var hostname    = os.hostname();
var my_name     = hostname + ':' + pid;
var uuid        = require('node-uuid');
var urlencode   = require('urlencode');

//逻辑说明：
// 检查名字为open_id的cookies
// 以及名字为publicsignalshort的cookies
// open_id这个cookie里的内容是一个key/value
// 里面存着对应公众号的openid
// 登录校验逻辑会校验两者是否一致，如果一致，就通过校验
// 否则就发起微信鉴权请求
// 当然，在此之前，需要使用publicsignalshort发起对缓存当中的微信账号的秘钥的请求
// 另外，在cookie当中还植入了一个session级别的cookie用于跟踪用户请求，也可以在将来
// 在某些特殊场景来做请求粘滞
// 在入口，如果对    req.auth_debug = true ;设置了，则会启用mock的微信服务器
// 这个可以启用配置中心来优化这里的动态配置
// cookie必须是植入在res里的


function isLoggedIn(req, res, next) {
    // console.log(req.headers['user-agent']);
    var ua = req.headers['user-agent'].toLowerCase();
    // console.log(ua.match(/MicroMessenger/i));
    if(ua.indexOf('micromessenger') >= 0) {
        console.log('微信里打开');
    }else{
        console.log('非微信里打开');
        return next();
    }
    
    var publicsignalshort_in_cookie          = "url";
    var open_id                              = req.cookies.open_id;
    var public_short_in_openid_cookie        = "";
    var openid_in_openid_cookie              = "";
    //var cinema_id                            = req.params["cinema_id"];
    //var cinema_id = req.params["cinema_id"];
    //console.log("req.url:::",req.url);
    console.log('open_id:', open_id)
    //调用的接口列表
    var my_api_addr = "/queryWeixinBaseConfigInfo.aspx";
    var req_publicsignalshort = req.publicsignalshort;

    var options = {
        uri: my_api_addr
        // args: {
        //     // publicsignalshort: publicsignalshort_in_cookie
        // }
    };

    var publicsignalshort_data = {};

    var getAppId = function(publicsignalshort){
            return publicsignalshort_data; 
    };

    var build_weixin_url = function(publicsignalshort){
        var app_id          =  getAppId(publicsignalshort).appId;
        var open_wx_host    =  'https://open.weixin.qq.com';
        var callback_host   =  'http://moviefan.com.cn';

        if(req.auth_debug){
            open_wx_host    =  '/mock_openwx'
            callback_host   =  '';
        }
//http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
        // if(cinema_id){
        //     cinemaId = '_' + cinema_id;
        // }

        var callback_url    =  '/oauth2?publicsignalshort='+publicsignalshort + '_' + encodeURIComponent(req.url);
        //console.log('callback_url:::'+callback_url);
        var encoded_callback_url = callback_host+callback_url;

        var open_weixin_url =   open_wx_host+'/connect/oauth2/authorize?' +
                                             'appid='                     +
                                              app_id                      +
                                             '&redirect_uri='             +
                                              encoded_callback_url        +
                                             '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
        return open_weixin_url;
    };

    model.getDataFromPhp(options, function(err,data) {
        // console.log("data:", data);
        if(!err && data){
            publicsignalshort_data = data;
            //console.log("viewColor:", data.viewColor);
            //如果cookies里面没有存公共号的缩写，肯定是非法页面调用，不管
            if(!publicsignalshort_in_cookie){
                console.error("非法页面调用");
                res.send("非法页面调用");
            }
            // if(data.viewColor){
            //     res.cookie('view_color_'+publicsignalshort_in_cookie, data.viewColor, {path: '/'+publicsignalshort_in_cookie});
            // }else{
            //     res.cookie('view_color_'+publicsignalshort_in_cookie, '', {path: '/'+publicsignalshort_in_cookie});
            // }
            //会员卡开关
            //res.cookie('has_publicsignalshort_member', data.hasMember, {path: '/'});
            // res.cookie('has_publicsignalshort_member', "0", {path: '/'});
            
            if(open_id){
                // console.debug(my_name,"I am in open_id === ture");
                // public_short_in_openid_cookie = open_id.public_short;
                // console.debug(my_name,"========logs from check_login_middle.js============");
                // console.debug(my_name,open_id);
                // console.debug(my_name,"publicsignalshort_in_cookie:"+publicsignalshort_in_cookie);
                // console.debug(my_name,"public_short_in_openid_cookie:"+public_short_in_openid_cookie);
                //比较设置的公众号的缩写与存在的open_id当中的值是否一致，如果一致，则算作通过校验登录
                //如果不一致，构造一个新的open_weixin_url，然后跳转过去
                //调用微信之后的回调地址的路由卸载util目录下的login.js-->route/util/login.js
                // if(public_short_in_openid_cookie === publicsignalshort_in_cookie){
                //     // console.debug(my_name,"the same.......");

                //     var session_id = req.cookies.session_id;
                //     if(!session_id){
                //             res.cookie('session_id',uuid.v1(),{
                //                     path:'/'
                //             });
                //     }
                    return next();
                // }else{
                //     // console.debug(my_name,"not the same");
                //     // console.debug(my_name,"redirect to :"+build_weixin_url(publicsignalshort_in_cookie));
                //     res.redirect(build_weixin_url(publicsignalshort_in_cookie));
                // }
            }else{
                // console.debug(my_name,"open_id not exist....");
                // console.debug(my_name,"redirect to :"+build_weixin_url(publicsignalshort_in_cookie));
                res.redirect(build_weixin_url(publicsignalshort_in_cookie));                        
            }
        }else{
            //todo
        }
    });
}//isLoggedIn.........................................................................

exports.isLoggedIn = isLoggedIn;