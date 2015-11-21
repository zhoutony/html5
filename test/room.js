//HTTP请求的mock框架
//项目地址：https://www.npmjs.com/packages/nock
var m 		= require("./mock_apis.js");
var base	= m.base;

//从属的http请求发起框架
//项目地址1：https://www.npmjs.com/package/request
var request = require('request');




describe('影厅信息 php api test suit', function(){
//=============================================================================
	it('获取影厅信息接口',function(done){
		request.post(base+"/hall/info", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//获取影厅信息接口

	it('影厅不可售座位接口',function(done){
		request.post(base+"/hall/unsales", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//影厅不可售座位接口

//=============================================================================
});//END OF send get request with cookies
