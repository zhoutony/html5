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

// 获取用户的电影新闻
function getUserNews(req, pageIndex, callback) {
    var publicsignal = req.params.publicsignal;
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    
    var options = {
        uri: '/queryUserNews.aspx',
        args: {
            // type: '-1',
            pageIndex: pageIndex,
            pageSize: 10,
            openId: req.cookies.openids || '',
            wxtype: publicsignal
        }
    };

    model.getDataFromPhp(options, function (err, data) {
        callback(err, data && data.movieNews);
    });
}

// 首页
app.get(['/my/index', '/:publicsignal/my/index'], chk_login.isLoggedIn, function (req, res) {//
    var render_data = {};
    var my_api_addr = "/QueryWeiXinUser.aspx";
    var open_id     = req.cookies.openids || '';
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
    var options = {
        uri: my_api_addr,
        args: {
            openID: open_id,
            wxType: publicsignal
        }
    };
    render_data.data = {};
    render_data.data.reversion = global.reversion;
    render_data.data.staticBase = global.staticBase;
    //隐藏工具条
    render_data.data.publicsignal = publicsignal;
    render_data.data.locationId = locationId;
    render_data.data.isToolHide = true;

    // console.log('reversion:', reversion);
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        if(!err && data){
            render_data.data.uses = data;
        }

        getUserNews(req, 1, function (err, userNews) {
            if (!err && userNews) {
                render_data.data.userNews = userNews;
            }

            res.render('wecinema/my', render_data);
        });
    });
    
});


app.get(["/my/myorders", "/:publicsignal/my/myorders"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryOrder.aspx";
    var openId      = req.cookies.openids || '';
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        args: {
            openID: openId,
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

// 足迹
app.get(["/my/usernews/:pageindex", '/:publicsignal/my/usernews/:pageindex'], function(req, res){
    getUserNews(req, req.params.pageindex, function (err, userNews) {
        res.render('wecinema/pagelets/user-news', {
            data: {
                err: err,
                userNews: userNews
            }
        });
    });
});

app.get(['/my/usernews/delete/:newsId'], function (req, res) {
    var options = {
        uri: '/DeleteUserNewsHistroy.aspx',
        args: {
            openId: req.cookies.openids || '',
            movieNewID: req.params.newsId
        }
    };

    model.getDataFromPhp(options, function (err, data) {
        res.json({
            err: err,
            data: data
        });
    });
});
