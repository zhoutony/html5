var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/login/index"], function(req, res){
    var render_data = {};
    var my_api_addr = "/room";
    var options = {
        uri: my_api_addr,
        args: {
            locationID: 110000,
            type:       1,
            pageIndex:  1,
            pageSize:   10
        }
    };
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase

    }
    res.render("wecinema/login", render_data);
});