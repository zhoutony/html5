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


app.get(['/payment'], function (req, res) {
    //渲染准备用数据
    var render_data = {};

    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }

    res.render('wecinema/payment', render_data);
});