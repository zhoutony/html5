/*
 * Created by Qu Yizhi on 2015/3/26
 */
var util = require('util');
var model = require(process.cwd() + "/libs/model.js");

var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
// var returnErrorPage = model.returnErrorPage;


// var os = require('os');
// var pid = process.pid;
// var hostname = os.hostname();
// var my_name = hostname + ':' + pid;


app.get(['/payment/:showtimeId/:orderId/index', 
    '/:publicsignal/payment/:showtimeId/:orderId/index',
    '/payment/order', ], chk_login.isLoggedIn, function (req, res) {
    var publicsignal = req.params["publicsignal"],
        showtimeId   = req.params["showtimeId"],
        orderId      = req.params["orderId"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    //渲染准备用数据
    var render_data = {};
    // QueryWeixinPlayParam.aspx

    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        publicsignal: publicsignal,
        showtimeId: showtimeId,
        orderId: orderId
    }

    res.render('wecinema/payment', render_data);
});


app.post(['/payment/:orderid', '/:publicsignal/payment/:orderid'], function (req, res) {
    //渲染准备用数据
    var render_data = {};
    var my_api_addr = "/QueryWeixinPlayParam.aspx";
    var orderid = req.params["orderid"];
    var options = {
        uri: my_api_addr,
        passType: 'send',
        args: req.body
    };

    // render_data.data = {};
    // console.log(options)
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.err = err;
        if (!err && data) {
            render_data.data = data;
        }
        res.send(render_data);
    });
});