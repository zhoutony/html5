//HTTP请求的mock框架
//项目地址：https://www.npmjs.com/packages/nock
var nock    = require('nock');
//打开对localhost地址的测试能力
nock.enableNetConnect('localhost');


//从属的http请求发起框架
//项目地址1：https://www.npmjs.com/package/request
var request = require('request');


var scope   = nock('http://www.google.com')
              .get('/')
              .reply(200, 'Hello from Google!');

describe('php server', function(){
	it('get google',function(done){
		request('http://www.google.com', function (error, response, body) {
   			if (!error && response.statusCode == 200) {
				done();
   			}
		});
	});
});


describe('middleware test suit', function(){

//=============================================================================
	it('send get request with cookies',function(done){
		//设置request的cookies为相应的键值对，test接口会返回echo的key=value
		var j = request.jar();
		var cookie = request.cookie('key=cookie-parser');
		var url = 'http://localhost:3000/test_cookies';
		j.setCookie(cookie, url);

		request({url: url, jar: j}, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    	var return_json = JSON.parse(body);
		    	if(return_json.key==="cookie-parser"){
		    		done();
		    	}else{
		    		done("get 200 but not except value");
		    	}
   			}else{
   				done(error);
   			}
		});//END OF request.................
	});//END OF send get request with cookies
//=============================================================================

});//END OF send get request with cookies
