var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var constant        = require(process.cwd() + "/route/wecinema/util/constant.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//
app.get(["/pay/orderwait/:orderId","/:publicsignal/pay/orderwait/:orderId"], function(req, res){
    var render_data = {};
    var publicsignal = req.params["publicsignal"];
    var orderId = req.params["orderId"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase,
        publicsignal: publicsignal,
        orderId: orderId
    };
    res.render("wecinema/orderwait", render_data);
});


app.get(["/:publicsignal/ticketresult/:orderId"], function(req, res){
    var render_data   = {};
    var my_api_addr   = "/QueryTicketResult.aspx";
    var publicsignal = req.params["publicsignal"];
    var orderId = req.params["orderId"];
    if(!publicsignal){
        publicsignal = constant.str.PUBLICSIGNAL;
    }
    var options = {
        uri: my_api_addr,
        passType: 'send',
        args: {
            wxtype: publicsignal,
            orderID: orderId
        }
    };

    render_data.data = {};
    // console.log(options)
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.err = err;
        if (!err && data) {
            render_data.data = data;
        }
        res.send(render_data);
    });
});