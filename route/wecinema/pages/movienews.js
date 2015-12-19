var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/movienews/:movieNewId"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryMovieNewsByID.aspx";
    var movieNewId = req.params["movieNewId"];
    var options = {
        uri: my_api_addr,
        args: {
            newsID: movieNewId
        }
    };
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }
    // console.log(global.reversion,global.staticBase);
    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
            render_data.data.reversion = global.reversion;
            render_data.data.staticBase = global.staticBase;
            
            if(data.newsInfo && data.newsInfo.content){
                var content = new StringBuilder();
                content.append(data.newsInfo.content);
                // console.log('content:', content.toString());
                render_data.data.newsInfo.content = content.toString().replace(/script/g, 'link');
            }
        }
        res.render("wecinema/movienews", render_data);
    });
});


function StringBuilder() {
    this.strings = []
}
StringBuilder.prototype.append = function(b) {
    this.strings.push(b)
};
StringBuilder.prototype.add = function(b) {
    this.strings.push(b)
};
StringBuilder.prototype.toString = function() {
    if (arguments.length == 0) {
        return this.strings.join("")
    } else {
        return this.strings.join(arguments[0])
    }
};
StringBuilder.prototype.clear = function() {
    this.strings.clear()
};
StringBuilder.prototype.backspace = function() {
    this.strings.pop()
};