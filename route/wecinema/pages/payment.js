/*
 * Created by Qu Yizhi on 2015/3/26
 */
var util = require('util');
var model = require(process.cwd() + "/libs/model.js");

var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
var returnErrorPage = model.returnErrorPage;


var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;


app.get(['/:publicsignalshort/payment'], chk_login.isLoggedIn, function (req, res) {
    //渲染准备用数据
    var render_data = {};

    //从参数当中获取公众号的id
    var publicsignalshort = req.params["publicsignalshort"];
    var schedulePricingId = req.query["mpid"];
    var sTempOrderID      = req.query["sTempOrderID"];
    var movieno           = req.query["movieno"];
    var open_id           = req.cookies.open_id;
    var cinema_id         = req.cookies.cinema_id;
    var user_id           = open_id.openid;

    render_data.data                    = {
        reversion: global.reversion,
        staticBase: global.staticBase
    };

    render_data.data.title              = "";
    render_data.data.homeUrl            = "http://";
    render_data.data.mineUrl            = "/order"

    render_data.data.cinema             = {};

    render_data.data.cinema.name        = "";
    render_data.data.cinema.addr        = "";
    render_data.data.publicsignalshort  = publicsignalshort;
    render_data.data.schedulePricingId  = schedulePricingId;
    render_data.data.sTempOrderID       = sTempOrderID;
    render_data.data.movieno            = movieno;
    render_data.data.user_id            = user_id;
    render_data.data.viewColor = req.cookies['view_color_'+publicsignalshort];
    render_data.data.cinema_id          = cinema_id;
    render_data.data.open_id            = open_id;

    res.render('wecinema/payment', render_data);
});

//mock接口用来获取用户的手机号
app.post(['/:publicsignalshort/order/mobile'], function (req, res) {
    var mock_data = {
        "data": {
            "mobileNo": "13800138000"
        },
        "ret": "0",
        "sub": "0",
        "msg": "SUCCESS"
    };
    res.send(mock_data);
});
//=======================================================================================

//mock接口用来返回未支付订单，供payment.jade来渲染订单数据
//废止不用
app.post(['/:publicsignalshort/order/unpayment'], function (req, res) {
    var my_api_addr = "/order/unpayment";

    // console.debug(my_name,"/order/unpayment",req.body);

    var options = {
        uri: my_api_addr,
        args: req.body
    };

    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});
//=======================================================================================


//mock支付接口
app.post(['/:publicsignalshort/order/payment'], function (req, res) {

    var my_api_addr = "/order/payment";

    // console.debug(my_name,"/order/payment",req.body);

    var options = {
        uri: my_api_addr,
        args: req.body
    };

    model.getDataFromPhp(options, function (err, data) {
        // console.log("err:",err,"data:",data);
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});
//=======================================================================================

//选择会员卡支付
app.get(['/:publicsignalshort/payment/choosemycards'], chk_login.isLoggedIn, function (req, res) {
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
        cinema_id: req.cookies.cinema_id
    };

    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data && data.length !== 0) {
            render_data.data.mycards = data;
        }
        res.render("wecinema/choose_card", render_data);
    });
});

//会员卡支付
app.post(['/:publicsignalshort/member/cardpay'], function (req, res) {

    var my_api_addr = "/member/cardpay";

    console.debug(my_name, "/member/cardpay", req.body);

    var options = {
        uri: my_api_addr,
        args: req.body
    };

    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});


//获取影片票价
app.post(['/:publicsignalshort/member/getprice'], function (req, res) {

    var my_api_addr = "/member/getprice";

    //console.debug(my_name,"/member/cardpay",req.body);

    var options = {
        uri: my_api_addr,
        args: req.body
    };

    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

//获取活动优惠详情
app.post(['/:publicsignalshort/pricecut/getprice'], function (req, res) {

    var my_api_addr = "/pricecut/GetPrice";

    //console.debug(my_name,"/member/cardpay",req.body);

    var options = {
        uri: my_api_addr,
        args: req.body
    };

    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});

//获取可用代金券
app.post(['/:publicsignalshort/cardticket/paylist'], function (req, res) {
    var render_data = {};
    var my_api_addr = "/cardticket/paylist";
    var options = {
        uri: my_api_addr,
        args: req.body
    };
    render_data.data = {};
    model.getDataFromPhp(options, function (err, data) {
        // console.log(err, data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data.ecoupons = data;
        }
        res.render('wecinema/ecoupons_pay', render_data);
    });
});

//获取可用代金券
app.post(['/:publicsignalshort/seat/unlock'], function (req, res) {
    console.log("res" + JSON.stringify(req.body));
    var options = {
        uri: "/seat/unlock",
        args: req.body
    };
    model.getDataFromPhp(options, function (err, data) {
        console.log("data:" + JSON.stringify(data));
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    });
});