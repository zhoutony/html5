/*
 * Created by LemonHall on 2015/4/
 */
var util = require('util');
var model = require(process.cwd() + "/libs/model.js");

var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
var dataProcess = require(process.cwd() + "/route/wecinema/util/data.js");
var returnErrorPage = model.returnErrorPage;
var _ = require("underscore");

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;


app.get(['/room/:ticketId'], function(req, res){

    var render_data = {};
    var my_api_addr = "/queryShowSeats.aspx";
    var ticketId = req.params["ticketId"];
    var options = {
        uri: my_api_addr,
        args: {
            ticketId: ticketId
        }
    };
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }

    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data && data.seats) {
            render_data.data = data;
            render_data.data.seats = setSeats(data.seats);
            render_data.data.reversion = global.reversion;
            render_data.data.staticBase = global.staticBase;
        } else {

        }
        res.render("wecinema/onlineseat", render_data);
    });
});

function setSeats(seats){
    var _seats = [];
    var _seat0, _seat1;
    for(var i = 0; i < seats.length; i++){
        _seat = seats[i];
        if(!_seats[_seat.yCoord]){
            _seats[_seat.yCoord] = [];
        }
        _seats[_seat.yCoord][_seat.xCoord] = _seat;
        
    }
    return _seats;
}

