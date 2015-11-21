var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");

//获取openid
app.get(['/:publicsignalshort/event/:eventid'], chk_login.isLoggedIn, function (req, res) {
    var render_data = {};
    render_data.data = {
        user_id: '',
        event_id: req.params["eventid"],
        publicsignalshort: req.params["publicsignalshort"],
        reversion: global.reversion,
        staticBase: global.staticBase
    };
    var open_id = req.cookies.open_id;
    if (open_id != undefined && open_id != null) {
        var user_id = open_id.openid;
        if (user_id != undefined && user_id != null)
            render_data.data.user_id = user_id;
    }
    res.render("wecinema/event", render_data);
});