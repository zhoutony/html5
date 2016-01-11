var util = require('util');
var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;

app.get(['/:locationID/filmlist/:showtype', 
        '/:locationID/filmlist/:showtype/:sole',
        '/:publicsignal/:locationID/filmlist/:showtype',
        '/:publicsignal/:locationID/filmlist/:showtype/:sole'], function (req, res) {
    var render_data = {};
    var my_api_addr = "/queryMovies.aspx";
    var _locationID = req.params["locationID"];
    var showtype = req.params["showtype"];//coming
    var type = showtype == "hot" ? 1 : 2;
    var sole = req.params["sole"];
    
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
            locationID: _locationID,//110000
            type:       type,
            wxtype: publicsignal
        }
    };
    
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        showtype: showtype,
        locationId: _locationID,
        publicsignal: publicsignal
    }
    // console.log(JSON.stringify(options))
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.data.err = err;
        if (!err && data && data.movies) {
            render_data.data.movies = data.movies;
            
        } else {

        }
        //隐藏工具条
        render_data.data.isToolHide = true;
        if(!sole){
            res.render("wecinema/filmlist", render_data);
        }else{
            res.render("wecinema/movieList", render_data);
        }
        
    });
});

// 顶部广告
app.get(['/get/queryadvertisements/:type'], function (req, res) {
    var render_data = {};
    var my_api_addr = "/queryAdvertisements.aspx";
    var _type = parseInt(req.params["type"]);
    // console.log('_type', _type)
    var options = {
        uri: my_api_addr,
        args: {
            type: _type
        }
    };
    render_data.data = {};
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.data.err = err;
        if (!err && data && data.advertisements) {
            render_data.data.fourthAds = data.advertisements;
            render_data.data.isIndicator = _type == 4 ? true : false;
            
        } else {

        }
        res.render("wecinema/filmlistAds", render_data);
    });
});
