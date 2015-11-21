//HTTP请求的mock框架
//项目地址：https://www.npmjs.com/packages/nock
var m 		= require("./mock_apis.js");
var base	= m.base;

//从属的http请求发起框架
//项目地址1：https://www.npmjs.com/package/request
var request = require('request');



describe('我的 php api test suit', function(){
//=============================================================================
	it('我的订单接口',function(done){
		request.post(base+"/myorder/list", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//我的订单接口

	it('订单详情接口',function(done){
		request.post(base+"/myorder/detail", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//订单详情接口
//=============================================================================
});//END OF send get request with cookies
