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
    var my_api_addr = "/room";
    var options = {
        uri: my_api_addr,
        args: {
            locationID: 110000,
            type:       1,
            pageIndex:  1,
            pageSize:   10
        }
    };
    res.render("wecinema/onlineseat");
});