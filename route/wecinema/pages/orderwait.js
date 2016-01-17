var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/pay/orderwait","/:publicsignal/pay/orderwait"], function(req, res){
    var render_data = {};
    var my_api_addr = "/room";
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
            locationID: 110000,
            type:       1,
            pageIndex:  1,
            pageSize:   10
        }
    };
    res.render("wecinema/orderwait");
});