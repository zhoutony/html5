/*
 * Created by LemonHall on 2015/4/
 */
var util = require('util');
var model = require(process.cwd() + "/libs/model.js");

var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
var dataProcess = require(process.cwd() + "/route/wecinema/util/data.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");
var returnErrorPage = model.returnErrorPage;
var _ = require("underscore");

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;

app.get(['/room/:showtimeId', '/:publicsignal/room/:showtimeId'],chk_login.isLoggedIn, function(req, res){

    var render_data = {};
    var my_api_addr = "/queryShowSeats.aspx";
    var showtimeId = req.params["showtimeId"];
    var publicsignal = req.params["publicsignal"];
    var open_id     = req.cookies.openids || '';
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
            showtimeID: showtimeId,
            wxtype: publicsignal
        }
    };
    
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    }

    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.data.err = err;
        if (!err && data && data.seats) {
            render_data.data = data;
            render_data.data.seats = setSeats(data.seats);
            render_data.data.reversion = global.reversion;
            render_data.data.staticBase = global.staticBase;
            render_data.data.publicsignal = publicsignal;
            render_data.data.open_id = open_id;
        } else {

        }
        // console.log('data:', JSON.stringify(render_data.data.seats));
        res.render("wecinema/room", render_data);
    });
});

app.post(['/lockseats/:showtimeId'], function(req, res){
    var options = {
        uri: "/lockSeats.aspx",
        passType: 'send',
        args: req.body
    };
    var open_id = req.cookies.openids || '';
    options.args.openId = open_id;
    // console.log(options)
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        if(data){
            res.send(JSON.parse(data));
        }else{
            res.send(err);
        }
        
    });
});


function setSeats(seats){
    var _seats = [], _seats1 = [];
    var _seat0, _seat1;
    for(var i = 0; i < seats.length; i++){
        _seat = seats[i];
        if(!_seats[_seat.xCoord]){
            _seats[_seat.xCoord] = [];
        }
        _seats[_seat.xCoord][_seat.yCoord] = _seat;
        
    }
    _seats1 = prepard_seat(_seats);
    return _seats1;
}



var prepard_seat = function (seat_list) {

    if (!seat_list)return;
    var sSeatInfo = seat_list;
    var collen = sSeatInfo.length;
    var rowlen = sSeatInfo[0].length; //取得row数据
    
    sSeatInfo[collen - 1][0].rowStatus = 'last';
    var new_arr = [],
        rowNum = sSeatInfo[0][0].rowNum;
    if(rowNum == ''){
        for (var i = 0; i < collen; i++){
            if( sSeatInfo[i][0].rowNum != ''){
                sSeatInfo[i][0].rowStatus = 'first';
                break;
            }else{
                sSeatInfo[i][0].desc = 'vacant_seat';
            }
        }
    }else{
        sSeatInfo[0][0].rowStatus = 'first';
    }
    
    var new_row = {
        colNum: "",
        loveCode: "",
        rowNum: "",
        seatID: "",
        seatName: "",
        status: '2',
        type: '',
        xCoord: '',
        yCoord: '',
        desc: 'vacant_seat'
    }
    for (var j = 0; j < rowlen; j++) {
        new_arr.push(new_row);
    }
    if (rowlen > collen) {
        // console.log(rowlen+'::::'+collen)
        var _num = Math.floor((rowlen - collen) / 2);
        _num += _num % 2;
        for (j = 0; j < _num; j++) {
            sSeatInfo.unshift(new_arr);
        }
        for (j = 0; j < _num; j++) {
            sSeatInfo.push(new_arr);
        }
    }
    return sSeatInfo;
}; //END of prepard_seat........................................................

