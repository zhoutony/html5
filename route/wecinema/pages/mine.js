/*
 * Created by LemonHall on 2015/4/
 */
var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");

var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");
var dateFormat      = require(process.cwd() + "/route/wecinema/util/data.js");

var returnErrorPage = model.returnErrorPage;

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

// 首页
app.get(['/my/index', '/:publicsignal/my/index'], chk_login.isLoggedIn, function (req, res) {//
    var render_data = {};
    render_data.data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
    }
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
    //隐藏工具条
    render_data.data.publicsignal = publicsignal;
    render_data.data.isToolHide = true;
    render_data.data.locationId = locationId;
    res.render("wecinema/my", render_data);
});


app.get(["/my/myorders", "/:publicsignal/my/myorders"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryOrder.aspx";

    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
             wxtype: publicsignal
        }
    };
    render_data.data = {};
   
    // console.log(orders.orderID );
    // res.render("wecinema/cinemaorder", render_data);
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        }
         
        res.render("wecinema/myorders", render_data);
        
    });
});

app.get(["/my/mask_myorder"], function(req, res){
    var render_data = {};
    var my_api_addr = "";
    
    var options = {
        uri: my_api_addr,
        args: {
             
        }
    };
    render_data.data = {};
    res.render("wecinema/mask-orderrule", render_data);
});


app.get(["/my/mypiao"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryOrder.aspx";
    
    var options = {
        uri: my_api_addr,
        args: {
             
        }
    };
    render_data.data = {};
   
    // console.log(orders.orderID );
    // res.render("wecinema/cinemaorder", render_data);
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        }
         
        res.render("wecinema/mypiao", render_data);
        
    });
});

app.get(["/my/mask_mypiao"], function(req, res){
    var render_data = {};
    var my_api_addr = "";
    
    var options = {
        uri: my_api_addr,
        args: {
             
        }
    };
    render_data.data = {};
    res.render("wecinema/mask-piaorule", render_data);
});


app.get(["/my/myredbag"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryOrder.aspx";
    
    var options = {
        uri: my_api_addr,
        args: {
             
        }
    };
    render_data.data = {};
   
    // console.log(orders.orderID );
    // res.render("wecinema/cinemaorder", render_data);
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        }
         
        res.render("wecinema/myredbag", render_data);
        
    });
});

app.get(["/my/mask_myredbag"], function(req, res){
    var render_data = {};
    var my_api_addr = "";
    
    var options = {
        uri: my_api_addr,
        args: {
             
        }
    };
    render_data.data = {};
    res.render("wecinema/mask-redrule", render_data);
});
