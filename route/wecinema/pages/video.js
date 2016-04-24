var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/video", "/:publicsignal/video"], function(req, res){
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
    res.render("wecinema/video", render_data);
});