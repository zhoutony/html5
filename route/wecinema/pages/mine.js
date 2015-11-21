/*
 * Created by LemonHall on 2015/4/
 */
var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");

var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var dateFormat      = require(process.cwd() + "/route/wecinema/util/data.js");

var returnErrorPage = model.returnErrorPage;

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

app.get(['/:publicsignalshort/order/'],chk_login.isLoggedIn,
         function(req, res){
    //渲染准备用数据
    var render_data       = {};
    //调用的接口列表
    var my_api_addr       = "/order/list";
    //从参数当中获取影院的id
    var cinema_id         = req.params["cinema_id"];
        cinema_id         = req.cookies.cinema_id;

    //从cookie当中取得用户的id
    var open_id           = req.cookies.open_id;
    var user_id           = open_id.openid;

    //从参数当中获取公众号的id
    var publicsignalshort = req.params["publicsignalshort"];

    var options = {
            uri  :   my_api_addr,
            args : {
                user_id          : user_id,
                publicSignalShort: publicsignalshort,
                page             : 1,
                num              : 10
            }
    };

    render_data.data                    = {
        reversion: global.reversion,
        staticBase: global.staticBase
    };
    render_data.data.title              = "";
    render_data.data.cinema_id          = cinema_id;
    render_data.data.publicsignalshort  = publicsignalshort;
    render_data.data.viewColor = req.cookies['view_color_'+publicsignalshort];

    model.getDataFromPhp(options,function(err,data){

        render_data.data.err = err;
        render_data.data.orders = [];
        if(!err && data){
            for(var i=0; i< data.length; i++){
                var order = data[i];
                var expiredTime = order.expired_time;//"2015-05-12 23:10"
                var expired = dateFormat.orderExpired(expiredTime);
                if (expired === 0){
                    order.expired = "end";
                }else{
                    order.expired = "_now_time"
                }

                // //是否开启二维码功能
                // var isQrcode = order.isQrcode;
                // var QRCodeTurn;
                // if (isQrcode && isQrcode.length === 1) {
                //     var qrcode = isQrcode[0].qrcode; //0为关闭
                //     if (qrcode === '0') {
                //         QRCodeTurn = false;
                //     } else {
                //         QRCodeTurn = true;
                //     }
                // }
                // order.QRCodeTurn = QRCodeTurn;
                render_data.data.orders.push(order);
            }

        }
        res.render("wecinema/mine",render_data);
    });
});


app.get(['/:publicSignalShort/order/:orderId'],
    function(req, res){
        var cookies = req.cookies;

        var render_data = {};
        var publicSignalShort = req.params["publicSignalShort"];
        var orderId = req.params['orderId'];

        render_data.data = {
            title: '',
            publicSignalShort: publicSignalShort,
            orderId: orderId
        };

        var my_api_addr = "/order/detail";

        if (cookies && cookies.open_id){
            var openId = cookies.open_id;
            var userId = openId.openid;
            var options = {
                uri: my_api_addr,
                args: {
                    user_id: userId,
                    publicSignalShort: publicSignalShort,
                    order_id: orderId
                }
            };

            model.getDataFromPhp(options, function(err, data){
                render_data.data.err = err;
                if (!err && data) {
                    render_data.data.orderDetails = data;

                }
                res.render("wecinema/order_details", render_data);
                
            })
        }else{                  
            res.redirect(publicSignalShort + '/order');
        }
});
