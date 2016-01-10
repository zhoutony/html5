var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");
var constant      = require(process.cwd() + "/route/wecinema/util/constant.js");
var DateMethod      = require(process.cwd() + "/route/wecinema/util/date.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

app.get(["/medialist/:sourceId", "/medialist/:sourceId/:pageIndex",
        "/:publicsignal/medialist/:sourceId", 
        "/:publicsignal/medialist/:sourceId/:pageIndex"], chk_login.isLoggedIn, function(req, res){
    var render_data = {};
    var my_api_addr = "/queryTopLineMovieNews.aspx";
    var open_id     = req.cookies.openids || '';
    var sourceId = req.params["sourceId"];
    var isScrollBottomPlus = false;
    var pageIndex = req.params["pageIndex"];
    if(pageIndex){
        isScrollBottomPlus = true;
    }else{
        pageIndex = 1;
    }
    var publicsignal = req.params["publicsignal"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    // var showtype = sourceID;
    var options = {
        uri: my_api_addr,
        args: {
            type:       sourceId,
            pageIndex:  pageIndex,
            pageSize:   10,
            openId: open_id
         }
    };
    render_data.data = {};
    // console.log('open_id:', open_id)
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data);
        render_data.data.err = err;
        if (!err && data) {
            if(data.movieNews && data.movieNews.length > 0){
                var len = data.movieNews.length;
                for(var i = 0; i < len; i++){
                    var publishtime = data.movieNews[i].publishtime
                    data.movieNews[i].publishtime = DateMethod.movieNewsDate(publishtime)
                }
            }
            render_data.data = data;
            render_data.data.reversion = global.reversion;
            render_data.data.staticBase = global.staticBase;
            render_data.data.sourceId = sourceId;
            render_data.data.publicsignal = publicsignal;
        }
        if(isScrollBottomPlus){
            res.render("wecinema/one_medialist", render_data);
        }else{
            res.render("wecinema/medialist", render_data);
        }
        
    });
});

// 分享回调
app.post(['/yesunion/sharecallback'], function (req, res) {
    //渲染准备用数据
    var render_data = {};
    var my_api_addr = "/ShareCallback.aspx";
    var options = {
        uri: my_api_addr,
        passType: 'send',
        args: req.body
    };

    render_data.data = {};
    // console.log('sharecallback');
    model.getDataFromPhp(options, function (err, data) {
        // console.log('data:', data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        } else {

        }
        res.send(render_data);
    });
});

// 订阅
app.post(['/yesunion/subscriberWeMedia'], function (req, res) {
    //渲染准备用数据
    var render_data = {};
    var my_api_addr = "/subscriberWeMedia.aspx";
    var options = {
        uri: my_api_addr,
        passType: 'send',
        args: req.body
    };

    render_data.data = {};
    // console.log('subscriberWeMedia');
    model.getDataFromPhp(options, function (err, data) {
        // console.log('data:', data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        } else {

        }
        res.send(render_data);
    });
});

// 解除订阅
app.post(['/yesunion/unsubscriberWeMedia'], function (req, res) {
    //渲染准备用数据
    var render_data = {};
    var my_api_addr = "/unsubscriberWeMedia.aspx";
    var options = {
        uri: my_api_addr,
        passType: 'send',
        args: req.body
    };

    render_data.data = {};
    // console.log('unsubscriberWeMedia');
    model.getDataFromPhp(options, function (err, data) {
        // console.log('data:', data);
        render_data.data.err = err;
        if (!err && data) {
            render_data.data = data;
        } else {

        }
        res.send(render_data);
    });
});


 