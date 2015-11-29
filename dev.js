global.express 	 	= require('express');

global.cookieParser 	= require('cookie-parser');

global.bodyParser 		= require('body-parser');

global.app				= express();

global.logger 			= require("./log").logger("server");

global.fs = require('fs');

global.path = require('path');

var compression = require('compression');

process.on('uncaughtException', function(err) {
    console.error('Error caught in uncaughtException event:', err);
});
//git版本
global.reversion = "b8fc17a";

global.staticBase = "";//"http://smart-static.wepiao.com";

app.use(compression());

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.use(express.static(path.resolve(__dirname, 'dist')));

app.use(function(err, req, res, next){
    logger.fatal(err.stack);
    res.status(500);
    res.render('500', {
        error: err
    });
});

app.set('view engine', 'jade');

require('./route');

//3000端口不可配置，约定俗称即可
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});
