var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/schedule/:cinemaId/:movieId",
        "/:publicsignal/schedule/:cinemaId/:movieId",
        '/:publicsignal/one_movie_schedule/:isShowtime/:cinemaId/:movieId'], chk_login.isLoggedIn, function(req, res){

    var render_data = {},
        my_api_addr = "/queryShows.aspx",
        cinemaId = req.params["cinemaId"],
        movieId = req.params["movieId"],
        dateTime = req.params["dateTime"],
        publicsignal = req.params["publicsignal"],
        isShowtime = req.params["isShowtime"];
    if(isShowtime == '1'){
        isShowtime = 'true';
    }else{
        isShowtime = 'false';
    }

    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
            cinemaID: cinemaId,
            movieID: movieId,
            dateTime: '',
            wxtype: publicsignal,
            isShowtime: isShowtime
        }
    };
    // console.log('isShowtime:', isShowtime);
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
    // console.log('one_movie_schedule2');
    model.getDataFromPhp(options, function (err, data) {
        // console.log('data:', JSON.stringify(data));
        render_data.data.err = err;
        if (!err && data) {
            render_data.data.shows = data.shows;
            render_data.data.movies = data.movies;
            render_data.data.cinema = data.cinema;
            render_data.data.shareInfo = data.shareInfo;
        }
        if(isShowtime == 'true'){
            res.render("wecinema/one_movie_schedule", render_data);
        }else{
            res.render("wecinema/schedule", render_data);
        }
        
    });
});


//拼装某一部影片的html的接口
