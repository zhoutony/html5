/*
 * Created by dekai on 2015/6/23
 */

//-var util            = require('util');
//-var model           = require(process.cwd() + "/libs/model.js");
//-var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

//http://smart.wepiao.com/setcookie/
//工作的流程是：修改这里的路由，然后对应修改views下相应的jade
app.get(['/setcookie', '/jump/:publicsignalshort/:openId/:targetUrl'], function (req, res) {
    var render_data = {};
    render_data.data = {};

    var openId = req.params["openId"];
    var publicsignalshort = req.params["publicsignalshort"];

    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        publicsignalshort: publicsignalshort ? publicsignalshort : "pswygjyc",
        openId: openId ? openId : "obi2Yt4EAe6JcOb6fQ3QlSmN8zkI",
        targetUrl: req.params["targetUrl"]
    };
    console.log("setcookie");
    res.render("wecinema/setcookie", render_data);
});