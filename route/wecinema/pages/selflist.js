var util = require('util');
var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;

//
app.get(["/selflist", "/:publicsignal/selflist"], function (req, res) {
    var options = {
        uri: '/QueryNewsSourceList.aspx',
        args: {
            openId: req.cookies.openids || ''
        }
    };

    model.getDataFromPhp(options, function (err, data) {
        data = !err && data ? data : {};
        data.reversion = global.reversion;
        data.staticBase = global.staticBase;
        
        res.render('wecinema/selflist', {
            data: data
        });
    });
});

app.get(['/selflist/subscribe/:sourceId'], function (req, res) {
    var options = {
        uri: '/SubscriberWeMedia.aspx',
        args: {
            sourceID: req.params.sourceId,
            openId: req.cookies.openids || ''
        }
    };

    model.getDataFromPhp(options, function (err) {
        res.json({err: err});
    });
});

app.get(['/selflist/unsubscribe/:sourceId'], function (req, res) {
    var options = {
        uri: '/UnSubscriberWeMedia.aspx',
        args: {
            sourceID: req.params.sourceId,
            openId: req.cookies.openids || ''
        }
    };

    model.getDataFromPhp(options, function (err, data) {
        res.json({err: err, data: data});
    });
});
