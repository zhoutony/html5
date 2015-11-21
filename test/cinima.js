//HTTP请求的mock框架
//项目地址：https://www.npmjs.com/packages/nock
var m 		= require("./mock_apis.js");
var base	= m.base;

//从属的http请求发起框架
//项目地址1：https://www.npmjs.com/package/request
var request = require('request');

             

describe('影城页面 php api test suit', function(){
//=============================================================================
	it('影院信息接口',function(done){
		request.post(base+"/cinema/info", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//影院信息接口

	it('影院在线影片列表',function(done){
		request.post(base+"/movie/list", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//影院在线影片列表

	it('影院未上映影片列表',function(done){
		request.post(base+"/movie/will", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//影院未上映影片列表

	it('影片信息接口',function(done){
		request.post(base+"/movie/info", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//影片信息接口

	it('影片排期接口',function(done){
		request.post(base+"/movie/schedule", function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    		done();
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//影片排期接口


//=============================================================================
});//END OF send get request with cookies
