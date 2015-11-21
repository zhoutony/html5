var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

var render_data = {};
render_data.data = {
    title: '',
    reversion: global.reversion,
    staticBase: global.staticBase
};

// //绑定会员卡短信验证码
// app.get(['/:publicsignalshort/member/checkbincard/code'], chk_login.isLoggedIn, function(req, res) {
//     var render_data = {};
//     render_data.data = {
//         public_signal_short: req.params["publicsignalshort"],
//         open_id: req.cookies.open_id.openid,
//         cinema_id: req.cookies.cinema_id,
//         title: ''
//     };
//     res.render('wecinema/checkbincard', render_data);
// });

//绑定会员卡-加载
app.get(['/:publicsignalshort/member/checkbincard'], function(req, res) {
    render_data.data.publicsignalshort = req.params["publicsignalshort"];
    if(req.cookies.open_id && req.cookies.open_id.openid){
        render_data.data.open_id = req.cookies.open_id.openid;
        res.render("wecinema/checkbincard", render_data);
    }else{
        // res.redirect(build_weixin_url(publicsignalshort_in_cookie));
    }

});

//绑定会员卡-绑定操作
app.post(['/:publicsignalshort/member/checkbinCard'], function(req, res) {
    var options = {
        uri: '/member/checkbinCard',
        // args: {
        //     public_signal_short: req.params["publicsignalshort"],
        //     open_id: req.cookies.open_id.openid,
        //     chit: req.body["smsVerificationCode"]
        // }
        args: req.body
    };
    model.getDataFromPhp(options, function(err, data){
        if(!err){
            res.send({err: err, data: data});
        }else{
            res.send({err: err, data: null});
        }
    });
});

//绑定会员卡/解绑会员卡-重新获取短信验证码
app.post(['/:publicsignalshort/member/sendmessage'], chk_login.isLoggedIn, function(req, res) {

    var options = {
        uri: '/member/sendmessage',
        args: req.body
    };
    model.getDataFromPhp(options, function(err, data){
        if(!err){
            res.send({err: err, data: data});
        }else{
            res.send({err: err, data: null});
        }
    });
});

//解绑会员卡-加载
app.get(['/:publicsignalshort/member/checkunbincard'], function(req, res) {
    render_data.data.publicsignalshort = req.params["publicsignalshort"];
    if(req.cookies.open_id && req.cookies.open_id.openid){
        render_data.data.open_id = req.cookies.open_id.openid;
        res.render("wecinema/checkunbincard", render_data);
    }
});

//解绑会员卡-解绑操作
app.post(['/:publicsignalshort/member/checkunbindingcard'], chk_login.isLoggedIn, function(req, res) {
    var options = {
        uri: '/member/checkunbindingcard',
        args: req.body
    };
    model.getDataFromPhp(options, function(err, data){
        if(!err){
            res.send({err: err, data: data});
        }else{
            res.send({err: err, data: null});
        }
    });
});