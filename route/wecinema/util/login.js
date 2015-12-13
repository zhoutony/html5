/*
 * Created by LemonHall on 2015/04/07
 */

var request = require('request');

var model   = require(process.cwd() + "/libs/model.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;


app.route('/mock_openwx/connect/oauth2/authorize').get(function(req,res){
	var callback_url 		 = req.query.redirect_uri+'&code=codefortest';
	// console.debug(my_name,"get request from check_login_middle");
	// console.debug(my_name,"do redirect .....to");
	// console.debug(my_name,callback_url);
	res.redirect(callback_url);
});


var send_request_wx = function(access_token_url,publicsignalshort,cb){
    request(access_token_url,function(error, response, body){
        if (!error && response.statusCode === 200) {
            var return_data = null;
            var hasError    = false;
            var err         = null;
            // console.debug(my_name,"========request data from wx=====>body");
            // console.debug(my_name,body);
            try {
                    return_data = JSON.parse(body);
            } catch (e) {
                    // console.error(my_name,"请求微信后得到的响应解析失败");
                    // console.error(my_name,body);
                    // console.error(my_name,e);
                    err = e;
                    hasError = true;
                    cb(e);
                    return;
            }
            if (hasError) {
                cb("解析微信认证返回失败");
                // console.error(my_name,e);
                return;
            } else {
        		// console.debug(my_name,"解析成功了");
                var open_id = {};
            	//从query里得到的publicsignalshort
                open_id.public_short = publicsignalshort;
                //从微信的返回里得到的openid
                if(return_data.hasOwnProperty("openid")){
                     open_id.openid       = return_data.openid;
               		 cb(null,open_id);
                     return;
                }else{
                    cb(return_data);
                	//open_id.openid = "owISVjhqZUYRaUiyHioNdL5R_o20";
                	//cb(null,open_id);
                    return;
                }
            }//END of hasError..............
        }else{
            console.error(my_name,"请求微信的响应有问题");
        	console.error(my_name,error);
            cb("微信认证失败");
            return;
        }
    });//END of request.................................................
};

app.route('/oauth2').get(function(req, res) {
    var if_had_code                        = req.query.hasOwnProperty("code");
    var if_had_publicsignalshort           = req.query.hasOwnProperty("publicsignalshort");
    var code                               = req.query.code;
    var publicsignalshortArr               = req.query.publicsignalshort.split('_');
    var publicsignalshort                  = publicsignalshortArr[0];
    //var cinema_id                          = publicsignalshortArr[1];
    var req_url                            = publicsignalshortArr[1];
    if(!req_url){
        req_url = publicsignalshort + '/choose_cinema/';
    }
    //console.log("req.url:"+req.url);
    //console.log("publicsignalshort::" + publicsignalshort +"::cinema_id::" + cinema_id);

    //调用的接口列表
    var my_api_addr = "/queryWeixinBaseConfigInfo.aspx";
    var req_publicsignalshort = publicsignalshort;

    var options = {
        uri: my_api_addr,
        args: {
            // publicsignalshort: req_publicsignalshort
        }
    };

    var publicsignalshort_data = {};

    var getAppId = function(publicsignalshort){
        return publicsignalshort_data; 
    };

    var build_access_token_url = function(publicsignalshort){
        var access_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+
                  getAppId(publicsignalshort).appId+
                  '&secret='+
                  getAppId(publicsignalshort).appSecret+
                  '&code='+
                  code+
                  '&grant_type=authorization_code';
        return access_url;
    };

    model.getDataFromPhp(options, function(err,data) {
        //res.send(data);
        if(!err){
                // console.debug(my_name,"publicsignalshort_data",data);
                publicsignalshort_data = data;
                    if(if_had_code && if_had_publicsignalshort){
                        var url = build_access_token_url(publicsignalshort);
                            send_request_wx(url,publicsignalshort,function(err,data){
                                console.log(data);
                                if(!err){
                                    res.cookie('open_id', data, {
                                        maxAge: 1000 * 60 * 60 * 24 * 30,
                                        path: '/'
                                    });
                                    //res.redirect('/wx/cinema/:cinema_id/');
                                    //res.redirect(publicsignalshort + '/choose_cinema/');
                                    //res.redirect(req.url);
                                    //res.redirect('/' + publicsignalshort + '/cinema/' + cinema_id);
                                    res.redirect(req_url);
                                }else{
                                    console.error(my_name,"wx error.....");
                                    console.error(my_name,err);
                                    res.send(err);
                                }
                            });
                    }else{
                        console.error(my_name,"获取微信code失败");
                        res.send("获取微信code失败");
                    }
        }else{
            //todo
        }
    });

});//调用微信oauth2的回调接口。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。