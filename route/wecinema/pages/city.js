var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//选择城市
app.get(["/get/citys"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryLocations.aspx";
    var options = {
        uri: my_api_addr,
        args: {
            locationID: 110000,
            type:       1,
            pageIndex:  1,
            pageSize:   10
        }
    };
    render_data.data = {}
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data);
        render_data.data = {
            err: err,
            citys: data
        }
        res.render("wecinema/city", render_data);
    });
    
});