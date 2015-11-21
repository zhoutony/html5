//HTTP请求的mock框架
//项目地址：https://www.npmjs.com/packages/nock
var m 		= require("./mock_apis.js");
var base	= m.base;

//从属的http请求发起框架
//项目地址1：https://www.npmjs.com/package/request
var request = require('request');




describe('授权 php api test suit', function(){
//=============================================================================
	it('用户授权接口',function(done){
		request.post(base+"/auth/auth", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//用户授权接口

//=============================================================================
});//END OF send get request with cookies
