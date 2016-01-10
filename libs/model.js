/*
 * Created by Lemon Hall on 2015/3/27
 */
var util     = require('util');
//HTTP请求的mock框架
//项目地址：https://www.npmjs.com/packages/nock
//var m        = require(process.cwd() + "/test/mock_apis.js");
//var base     = m.base;

var base  = "http://weiticket.com:8088";

var LRU      = require("lru-cache")
  , options  = { max: 500
              , length: function (n) { return n * 2 }
              , dispose: function (key, n) { n.close() }
              , maxAge: 1000 * 60 * 60 }
  , cache    = LRU(options);

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;
var uuid     = require('node-uuid');

//使用axon库来上报请求的时延情况
//https://www.npmjs.com/package/axon
var axon     = require('axon');
var sock     = axon.socket('push');

//使用tcp端口链接监控服务器，上报所有的请求完成情况
sock.connect('tcp://localhost:3091');

//因为axon会建立一个队列来存储发送内容，所以需要限制一下这个队列的大小
//https://www.npmjs.com/package/axon
sock.hwm     = 5000;

//从属的http请求发起框架
//项目地址1：https://www.npmjs.com/package/request
var request = require('request');

var default_data = {};

//清洗php的调试信息，这个之后可以做一个开关
var washbody      = function(body){
        var start = body.search(/<!-- start profiling summary -->/);
        // //console.debug(my_name,"start-->",start);
        if(start>0){
            var content = body.substr(0,start);
            // //console.debug("================content==================");
            // //console.debug(content);
            return content;
         }else{
            return body;
         }
};

var metrics_map_hits_lasttime     = new Date().getTime();
var res_status_map_hits_lasttime  = new Date().getTime();
var metrics_map                   = {};

//对API的响应时间，做加权平均，然后想办法暴露出去
var build_metrics_map =  function(uri,elapsedTime){
    var mertic_for_uri = metrics_map[uri];
    //初始化对象
    if(mertic_for_uri === undefined){
        metrics_map[uri]                 = {};
        mertic_for_uri                   = metrics_map[uri];
        mertic_for_uri.hits_counter      = 0;
        mertic_for_uri.hits_lasttime     = new Date().getTime();
    }
    //加hit计数器
    mertic_for_uri.hits_counter++;
    var hit_time                     = new Date().getTime();
    var diff_time                    = hit_time - mertic_for_uri.hits_lasttime;
    mertic_for_uri.hits_lasttime = hit_time;
    //接下来的关键问题就是实现动态采样率
    //那么首先看一下所谓动态采样率的描述
    //1秒钟内，肯定要采样一次
    if(diff_time > 1000){
      //初始化数组来存储metrics
        if(mertic_for_uri.elapsedTime === undefined){
          mertic_for_uri.elapsedTime = [];
        }

        mertic_for_uri.elapsedTime.push(elapsedTime);

        if(mertic_for_uri.elapsedTime.length > 30){
          mertic_for_uri.elapsedTime.shift();
        }
    }
};//END of build_metrics_map

setInterval(function(){
    metrics_map.my_name = my_name;
    sock.send(metrics_map);
    // //console.info(my_name,util.inspect(metrics_map, {showHidden: true,depth: null}));
},2000);

//对API的状态码，做加权平均，然后想办法暴露出去
var build_res_status_map = function(uri,statusCode){

};

//将所有的请求都包装成起来，处理报错，日志，tracking，某些缓存等等事宜
var getDataFromPhp = function(options, callback) {
    var uri      = base + options.uri;
    var formData = options.args;
    var passType = options.passType;

    //TODO:对options的传参做更多的校验
    var options_for_requst = {
        time       : true,
        timeout    : 20000,
        uri        : uri,
        json       : false,
        formData   : formData,
        req_id     : uuid.v1()
    };

    //console.debug(my_name,"=====logs from modules libs/model.js========");
    // console.info(my_name,"request args",options_for_requst);

    request.post(options_for_requst, function(error, response, body) {
        // console.log("请求结束：",body);
        if(response){
            build_res_status_map(options_for_requst.uri,response.statusCode);
        }
        if (!error && response.statusCode === 200) {
            var return_data = "";
            // console.info(my_name,"request uri:",options_for_requst.uri,"elapsedTime:",response.elapsedTime,"ms");
            build_metrics_map(options_for_requst.uri,response.elapsedTime);

            // options.passType = 'send' 为获取全部返回数据
            if (passType === 'send') {
                callback(null, body);
                return;
            }

            //判断是否是成功返回，如果是已经解析好了的json，直接返回
            body = JSON.parse(body);
            
            if (body.success) {
                // console.debug(my_name,"I am in first level if....");
                // console.debug(my_name,"====get res from module  model.js=====");
                // console.debug(my_name,"it's request....");
                // console.debug(my_name,options_for_requst);
                // console.debug(my_name,body.data);
                
                // console.log(body.data);
                callback(null,body.data);
                return;
            } else {
                //如果返回的值是字符串，则试图去解析之
                //http://island205.com/2015/03/31/the-problem-of-callback/
                var hasError = false;
                var err      = null;
                    // console.debug(my_name,"I am in second level if....");
                    // console.debug(my_name,"body");
                    // console.debug(my_name,body);
                try {
                  body        = washbody(body);
                  return_data = JSON.parse(body);
                } catch (e) {
                  err = e;
                  hasError = true;
                  // console.error(my_name,"====error from module model.js json parser error");
                  // console.debug(my_name,"it's request....");
                  // console.debug(my_name,options_for_requst);
                  // console.error(my_name,e);
                }
                if (hasError) {
                    // console.error(my_name,err);
                    callback(err);
                    return;
                } else {
                  // console.debug(my_name,"====get res from module  model.js=====");
                  // console.debug(my_name,"it's request....");
                  // console.debug(my_name,options_for_requst);
                  // console.debug(my_name,return_data);
                  if(return_data.ret === 0 || return_data.ret ==='0'){
                      // console.debug(my_name,"return data with no exception");
                      callback(null, return_data.data);
                      return;
                  }else{
                      // console.error(my_name,return_data);
                      callback(return_data.msg);
                      return;
                  }
                }
            }//END of  if (body.ret === 0) --------------------------29行的结束

            //res.render('wecinema/home', body);
        } else {
            // console.error(my_name,"====error from module model.js request http error");
            // console.debug(my_name,"it's request....");
            // console.debug(my_name,options_for_requst);
            // console.error(my_name,error);
            callback(error);
            return;
        }
    }); //END OF request.................
}; //END OF getDataFromPhp


var returnErrorPage = function(err,res){
    if(err.code){
      if(err.code==="ETIMEDOUT"){
        res.send("oops,调用时间过长，请刷新");
      }else{
          res.send(err);
      }
    }
    
};


var getDataFromCache = function(args, callback) {
    callback();
}; //END OF getDataFromCache

//==========================================================================================

exports.getDataFromPhp  = getDataFromPhp;
exports.returnErrorPage = returnErrorPage;