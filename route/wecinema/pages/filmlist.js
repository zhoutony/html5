var util = require('util');
var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;

app.get(['/:locationID/filmlist'], function (req, res) {
    var render_data = {};
    var my_api_addr = "/queryMovies.aspx";
    var _locationID = req.params["locationID"];
    var options = {
        uri: my_api_addr,
        args: {
            locationID: _locationID,//110000
            type:       1,
            pageIndex:  1,
            pageSize:   10
        }
    };
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }

    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data && data.movies) {
            render_data.data.movies = data.movies;
            
        } else {

        }
        res.render("wecinema/filmlist", render_data);
    });
});

app.post(['/:publicsignalshort/member/bindingcard'], chk_login.isLoggedIn, function (req, res) {
    var options = {
        uri: '/member/bindingcard',
        // args: {
        //     public_signal_short: req.params["publicsignalshort"],
        //     cinema_no: req.cookies.cinema_id,
        //     open_id: req.cookies.open_id.openid,
        //     card_id: req.body["cardId"],
        //     card_pass: req.body["password"]
        // }
        args: req.body
    };
    var render_data = {};
    render_data.data = {
        title: '',
        publicsignalshort: req.params["publicsignalshort"],
        cinema_id: req.cookies.cinema_id,
        open_id: req.cookies.open_id.openid,
        reversion: global.reversion,
        staticBase: global.staticBase
    }


    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            render_data.err = null;
            render_data.data = data;
            res.send(render_data);
        } else {
            render_data.err = err;
            render_data.data = null;
            res.send(render_data);
        }
        //res.redirect('/' + req.params["publicsignalshort"] + '/member/checkbinCard');
    });
})

app.get(['/queryLocation/:longitude/:latitude'], function (req, res) {
    var render_data = {};
    var my_api_addr = "/queryLocationByLatitudeLongitude.aspx";
    var longitude = req.params["longitude"];
    var latitude = req.params["latitude"];
    var options = {
        uri: my_api_addr,
        args: {
            longitude: longitude,
            latitude:   latitude
        }
    };

    model.getDataFromPhp(options, function (err, data) {
        render_data.err = err;
        console.log(data);
        if (!err && data && data.location) {
            render_data.location = data.location;
            
        }
        res.send(data);
    });
})

app.post(['/:publicsignalshort/member/bindingcard/opencinema'], function (req, res) {
    var options = {
        uri: "/cinema/list",
        args: {
            public_signal_short: req.params["publicsignalshort"]
        }
    };
    var render_data = {};
    model.getDataFromPhp(options, function (err, data) {
        if (!err) {
            render_data.err = null;
            render_data.data = data;
        } else {
            render_data.err = err;
            render_data.data = null;
        }
        res.send(render_data);
    });
});