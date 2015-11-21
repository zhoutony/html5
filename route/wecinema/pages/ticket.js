var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");

var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");


app.get(['/:cityId/ticket/:movieId'], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryCinemas.aspx";
    var cityId = req.params["cityId"];
    var movieId = req.params["movieId"];
    var options = {
        uri: my_api_addr,
        args: {
            locationID: cityId,
            movieID: movieId,
            pageIndex: 1,
            pageSize: 100
        }
    };
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        cinemas: [],
        movie: []
    }
    model.getDataFromPhp(options, function (err, data) {
        console.log(data.movie);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data.cinemas = getCinemas(data.cinemas);
            render_data.data.movie = data.movie;
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