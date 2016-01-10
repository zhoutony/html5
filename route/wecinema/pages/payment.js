/*
 * Created by Qu Yizhi on 2015/3/26
 */
var util = require('util');
var model = require(process.cwd() + "/libs/model.js");

var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
// var returnErrorPage = model.returnErrorPage;


// var os = require('os');
// var pid = process.pid;
// var hostname = os.hostname();
// var my_name = hostname + ':' + pid;


app.get(['/payment/index'], function (req, res) {
    //渲染准备用数据
    var render_data = {};
    // QueryWeixinPlayParam.aspx

    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }

    res.render('wecinema/payment', render_data);
});


app.get(['/payment/:orderid'], function (req, res) {
    //渲染准备用数据
    var render_data = {};
    var my_api_addr = "/QueryWeixinPlayParam.aspx";
    var orderid = req.params["orderid"];
    var options = {
        uri: my_api_addr,
        passType: 'send',
        args: {
            orderid: orderid
        }
    };

    render_data.data = {};

    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        } else {

        }
        res.seed(render_data);
    });
});