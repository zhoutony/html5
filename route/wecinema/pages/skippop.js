var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/skippop"], function(req, res){
    var render_data = {};
    
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
    }
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
    res.render("wecinema/skippop", render_data);
});