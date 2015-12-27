/*
 * Created by LemonHall on 2015/4/
 */
var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");

var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var dateFormat      = require(process.cwd() + "/route/wecinema/util/data.js");

var returnErrorPage = model.returnErrorPage;

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

// 首页
app.get(['/my/index'], chk_login.isLoggedIn, function (req, res) {//
    var render_data = {};
    
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
    }
    //隐藏工具条
    render_data.data.isToolHide = true;
    res.render("wecinema/my", render_data);
});
