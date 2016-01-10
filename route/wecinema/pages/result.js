/*
 * Created by Qu Yizhi on 2015/3/
 */


var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;
var model    = require(process.cwd() + '/libs/model.js');

var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

app.get('/:publicsignalshort/payment_result/:order_id',chk_login.isLoggedIn,function(req,res,next) {

	  //渲染准备用数据
    var render_data = {};
    render_data.data = {
        reversion: global.reversion,
        staticBase: global.staticBase
    };

    render_data.data.publicsignalshort = req.params['publicsignalshort'];
    render_data.data.order_id = req.params['order_id'];
    render_data.data.viewColor = req.cookies['view_color_'+publicsignalshort];
    res.render("wecinema/result",render_data);

});


app.get('/:publicsignalshort/order_detail/:order_id', function(req, res, next) {
  var render_data = {};
  render_data.data = {};

  var options = {
    uri: '/order/detail',
    args: {
      user_id: req.cookies.openids,
      publicSignalShort: req.params['publicsignalshort'],
      order_id: req.params['order_id']
    }
  };

  model.getDataFromPhp(options, function(err, data) {
    render_data.data.order = data;
    res.send(render_data);
  });

});
