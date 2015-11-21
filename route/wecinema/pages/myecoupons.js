var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");

//代金券列表
app.get(['/:publicsignalshort/member/myecoupons'], chk_login.isLoggedIn, function (req, res) {
    var render_data = {};
    var options = {
        uri: '/cardticket/list',
        args: {
            publicsignalshort: req.params["publicsignalshort"],
            openid: req.cookies.open_id.openid
        }
    };

    render_data.data = {
        publicsignalshort: req.params["publicsignalshort"],
        open_id: req.cookies.open_id.openid,
        cinema_id: req.cookies.cinema_id,
        title: '',
        reversion: global.reversion,
        staticBase: global.staticBase
    };

    model.getDataFromPhp(options, function (err, data) {
        render_data.data.err = err;
        if (!err && data && data.length !== 0) {
            render_data.data.myecoupons = data;
        }
        res.render("wecinema/ecoupons", render_data);
    });
});

//代金券详情
app.get(['/:publicsignalshort/member/ecouponsinfo/:code'], chk_login.isLoggedIn, function (req, res) {
    var publicsignalshort = req.params["publicsignalshort"];
    var code = req.params['code'];
    if (code != '') {
        var options = {
            uri: '/cardticket/info',
            args: {
                publicsignalshort: publicsignalshort,
                code: code
            }
        };

        var render_data = {};
        render_data.data = {
            cinema_id: req.cookies.cinema_id
        };

        model.getDataFromPhp(options, function (err, data) {
            render_data.data.err = err;
            if (!err && data) {
                render_data.data.ecouponsinfo = data;
            }
            res.render("wecinema/ecoupons_detail", render_data);
        });
    }
    else
        res.redirect(publicSignalShort + '/member/myecoupons');
});