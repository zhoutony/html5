//项目地址：https://www.npmjs.com/package/log4js
//项目地址2：https://github.com/nomiddlename/log4js-node
var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console' },{
      type: 'dateFile',  
      filename: 'logs/server.log',  
      pattern: "_yyyy-MM-dd",  
      maxLogSize: 10240000,  
      alwaysIncludePattern: false,  
      backups: 4
    }
  ],
  replaceConsole: true
});

exports.logger=function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}

