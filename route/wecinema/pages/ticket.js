var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");

var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");

app.get(['/:cityId/ticket/:movieId', '/:publicsignal/:cityId/ticket/:movieId'], chk_login.isLoggedIn, function(req, res){
    var render_data = {};
    var my_api_addr = "/queryCinemas.aspx";
    var cityId = req.params["cityId"];
    var movieId = req.params["movieId"];
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
            locationID: cityId,
            movieID: movieId,
            pageIndex: 1,
            pageSize: 100,
            wxtype: publicsignal
        }
    };

    // 获取用户坐标
    var currentCoords;

    try {
        currentCoords = JSON.parse(req.cookies.currentCoords);
    } catch(err) {}

    if (currentCoords && currentCoords.longitude && currentCoords.latitude) {
        options.args.longitude = currentCoords.longitude;
        options.args.latitude = currentCoords.latitude;
    }
    
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        cinemas: [],
        movie: [],
        publicsignal: publicsignal
    }
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data.cinemas = getCinemas(data.cinemas);
            render_data.data.movie = data.movie;
            render_data.data.shareInfo = data.shareInfo;
        }
        res.render("wecinema/ticket", render_data);
    });
});


function getCinemas(_cinemas){
    if(_cinemas){
        var _len = _cinemas.length,
            cinemas = [];
        if(_len > 0){
            var UpperMap = {};
            for (var i = 0; i < _len; i++) {
                var cinema = _cinemas[i];
                var UpperFirst = cinema.districtName;
                if (UpperMap[UpperFirst] === undefined) {
                    UpperMap[UpperFirst] = [];
                    UpperMap[UpperFirst].push(cinema);
                } else {
                    UpperMap[UpperFirst].push(cinema);
                }
            }
            return UpperMap;
        }else{
            return {};
        }
    }else{
        return {};
    }
}