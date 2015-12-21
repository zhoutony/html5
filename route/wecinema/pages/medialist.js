var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

app.get(["/medialist"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryTopLineMovieNews.aspx";

    // var sourceID = req.params["data.sourceInfo.sourceID"];
    // var showtype = sourceID;
    var options = {
        uri: my_api_addr,
        args: {
            type:       17,
            pageIndex:  1,
            pageSize:   10,

         }
    };
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        movieNews : [],
        sourceInfo: []
         
    }
    console.log(global.reversion,global.staticBase);
    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
            render_data.data.reversion = global.reversion;
            render_data.data.staticBase = global.staticBase;
            console.log(data.sourceInfo);
        }
        res.render("wecinema/medialist", render_data);
    });
    
   
});
 