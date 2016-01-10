// //引用express，基础组件
// //npm install express --save
// //文档地址1：http://www.expressjs.com.cn/4x/api.html#application
// global.express 	 		= require('express');


// //引用cookieParser,express 3之后的版本将很多基础中间件分离了出来，这是用来解析cookies的
// //npm install cookie-parser --save
// //文档1：https://www.npmjs.com/package/cookie-parser
// //TODO:需要写测试，以便版本升级的时候用
// global.cookieParser 	= require('cookie-parser');


// //应用body-parser，解析POST请求时使用
// //npm install body-parser --save
// //https://github.com/expressjs/body-parser
// //另外，在express 4当中，app.use(bodyParser()); 写法被抛弃
// //http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// //TODO:需要写测试，以便版本升级的时候用
// global.bodyParser 		= require('body-parser');


// //初始化express组件
// global.app				= express();





// //这里引用了自定义的logger配置文件
// //文档地址1：https://www.npmjs.com/package/log4js
// //文档地址2：https://github.com/nomiddlename/log4js-node
// global.logger 			= require("./log").logger("server");

// var fs 					= require('fs');
// 	fs.writeFileSync("server.pid", process.pid);



// //引用中间件，解析cookies
// app.use(cookieParser());


// //引用中间件，解析POST请求
// //http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// //另外，在express 4当中，app.use(bodyParser()); 写法被抛弃
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());


// //打开express的代理服务特性
// //文档：http://www.expressjs.com.cn/4x/api.html#express
// app.enable('trust proxy');

// // client error handler
// // app.use(function (req, res, next) {
// //   res.status(404);
// //   res.render('404', {});
// // });

// app.use(function(err, req, res, next){
// 	  console.error(err.stack);
// 	  res.status(500);
// 	  res.render('500', {
// 	    error: err
// 	  });
// });

// //jade模板组件
// //npm install jade --save
// //文档地址：https://www.npmjs.com/package/jade
// //文档地址2：https://github.com/jadejs/jade
// //palyground：http://jade-lang.com/
// app.set('view engine', 'jade');

// app.route('/')
//    .get(function(req, res) {
// 	res.render('index', { title: 'Hey', message: 'Hello there!'});
// });

// app.route('/test_cookies')
//    .get(function(req, res) {
// 	res.send(req.cookies);
// });

// app.post('/test_post',function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })

// //3000端口不可配置，约定俗称即可
// var server = app.listen(3000, function() {
// 	    console.log('Listening on port %d', server.address().port);
// });



//引用express，基础组件
//npm install express --save
//文档地址1：http://www.expressjs.com.cn/4x/api.html#application
global.express 	 	= require('express');

//引用cookieParser,express 3之后的版本将很多基础中间件分离了出来，这是用来解析cookies的
//npm install cookie-parser --save
//文档1：https://www.npmjs.com/package/cookie-parser
//TODO:需要写测试，以便版本升级的时候用
global.cookieParser 	= require('cookie-parser');


//应用body-parser，解析POST请求时使用
//npm install body-parser --save
//https://github.com/expressjs/body-parser
//另外，在express 4当中，app.use(bodyParser()); 写法被抛弃
//http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
//TODO:需要写测试，以便版本升级的时候用
global.bodyParser 		= require('body-parser');

//初始化express组件
global.app				= express();

//这里引用了自定义的logger配置文件
//文档地址1：https://www.npmjs.com/package/log4js
//文档地址2：https://github.com/nomiddlename/log4js-node
global.logger 			= require("./log").logger("server");

//git版本

global.reversion = "3a43cd1";


global.staticBase = "http://js.moviefan.com.cn";//http://smart-static.wepiao.com/";


global.fs = require('fs');

global.path = require('path');

var compression = require('compression');

process.on('uncaughtException', function(err) {
    console.error('Error caught in uncaughtException event:', err);
});

app.use(compression());

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//打开express的代理服务特性
//文档：http://www.expressjs.com.cn/4x/api.html#express
app.enable('trust proxy');

app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(function(err, req, res, next){
    logger.fatal(err.stack);
    res.status(500);
    res.render('500', {
        error: err
    });
});

//jade模板组件
//npm install jade --save
//文档地址：https://www.npmjs.com/package/jade
//文档地址2：https://github.com/jadejs/jade
//palyground：http://jade-lang.com/
app.set('view engine', 'jade');

require('./route');

//3000端口不可配置，约定俗称即可
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

