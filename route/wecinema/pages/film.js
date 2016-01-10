var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/schedule/:cinemaId/:movieId", "/:publicsignal/schedule/:cinemaId/:movieId"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryShows.aspx";
    var cinemaId = req.params["cinemaId"];
    var movieId = req.params["movieId"];
    var dateTime = req.params["dateTime"];
    var options = {
        uri: my_api_addr,
        args: {
            cinemaID: cinemaId,
            movieID: movieId,
            dateTime: ''
        }
    };
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        shows: [],
        movies: [],
        cinema: null,
        movieId: movieId,
        publicsignal: publicsignal
    }
    model.getDataFromPhp(options, function (err, data) {
        // console.log('data:', data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data.shows = data.shows;
            render_data.data.movies = data.movies;
            render_data.data.cinema = data.cinema;
        }
        res.render("wecinema/film", render_data);
    });
});