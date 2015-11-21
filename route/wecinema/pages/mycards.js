var util = require('util');
var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;

//会员卡首页
app.get(['/:publicsignalshort/member/mycards'], chk_login.isLoggedIn, function (req, res) {
    var render_data = {};
    var options = {
        uri: '/member/mycards',
        args: {
            public_signal_short: req.params["publicsignalshort"],
            open_id: req.cookies.open_id.openid
        }
    };

    render_data.data = {
        publicsignalshort: req.params["publicsignalshort"],
        open_id: req.cookies.open_id.openid,
        cinema_id: req.cookies.cinema_id,
        title: '',
        reversion: global.reversion,
        staticBase: global.staticBase
    };

    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data && data.length !== 0) {
            render_data.data.mycards = data;
        }
        res.render("wecinema/mycards", render_data);
    });
});

//会员卡解绑 获得手机以及发送短信 的接口
app.post(['/:publicsignalshort/member/unbindingcard'], function (req, res) {
    var options = {
        uri: '/member/unbindingcard',
        args: req.body
    };
    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            res.send({err: err, data: data});
        } else {
            res.send({err: err, data: null});
        }
    });
});