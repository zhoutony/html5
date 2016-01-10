var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var DateMethod      = require(process.cwd() + "/route/wecinema/util/date.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/movienews/:sourceId/:movieNewId", "/:publicsignal/movienews/:sourceId/:movieNewId"], chk_login.isLoggedIn, function(req, res){
    var render_data = {};
    var my_api_addr = "/queryMovieNewsByID.aspx";
    var movieNewId = req.params["movieNewId"];
    var sourceId = req.params["sourceId"];
    var open_id     = req.cookies.openids || '';
    var options = {
        uri: my_api_addr,
        args: {
            newsID: movieNewId,
            openId: open_id
        }
    };
    var city = req.cookies.city,
        locationId = 110100;
    if(city){
        city = JSON.parse(city);
        if(city.locationId){
            locationId = city.locationId;
        }
    }
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }
    // console.log(global.reversion,global.staticBase);
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
            render_data.data.newsInfo.publishtime = DateMethod.movieNewsDate(render_data.data.newsInfo.publishtime);
            render_data.data.reversion = global.reversion;
            render_data.data.staticBase = global.staticBase;
            render_data.data.sourceId = sourceId;
            render_data.data.newsId = movieNewId;
            render_data.data.publicsignal = publicsignal;
            render_data.data.locationId = locationId;
            // console.log(data);
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
 
// 顶部广告
app.get(['/get/queryadvertisements'], function (req, res) {
    var render_data = {};
    var my_api_addr = "/queryAdvertisements.aspx";
    var options = {
        uri: my_api_addr,
        args: {
            type: '5'
        }
    };
    render_data.data = {};
    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data && data.advertisements) {
            render_data.data.fourthAds = data.advertisements;
            
        } else {

        }
        res.render("wecinema/filmlistAds", render_data);
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