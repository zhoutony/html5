var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/order/succeed", "/:publicsignal/order/succeed"], function(req, res){
    var render_data = {};
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    render_data.data = {
        publicsignal: publicsignal,
        reversion: global.reversion,
        staticBase: global.staticBase
    }
    res.render("wecinema/ordersucc", render_data);
});


app.get(["/order/eorr", "/:publicsignal/order/eorr"], function(req, res){
    var render_data = {};
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    render_data.data = {
        publicsignal: publicsignal,
        reversion: global.reversion,
        staticBase: global.staticBase
    }
    res.render("wecinema/ordereorr", render_data);
});