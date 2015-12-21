var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/cinemaorder"], function(req, res){
   var render_data = {};
    var my_api_addr = "/queryOrder.aspx";
    var orders = req.params["orders"];
    var options = {
        uri: my_api_addr,
        args: {
            newsID: orders
        }
    };
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }
    // res.render("wecinema/cinemaorder");
    console.log(global.reversion,global.staticBase);
    res.render("wecinema/cinemaorder", render_data);
     
});