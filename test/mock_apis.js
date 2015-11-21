// LemonHall 2015/3/24 2:59分
//
//HTTP请求的mock框架
//export NOCK_OFF=true  即可关闭nock
//export NOCK_OFF=false 即可mock全部请求
//文档地址1：https://www.npmjs.com/package/nock
var nock    = require('nock');

//PHP接口文档地址：http://wyy.mydoc.io/?t=2381
var options = {allowUnmocked: true};
//基地址
var base	= "http://cgi.wyy.com";

var url         = require('url');
var bodyParser  = require('body-parser');
var util        = require('util');
var os          = require('os');
var pid         = process.pid;
var hostname    = os.hostname();
var my_name     = hostname + ':' + pid;

nock.enableNetConnect('api.weixin.qq.com');
//nock.enableNetConnect('cgi.wxmovie.com');

//解析POST请求头，妈的还得手写一个这种东西
var body_parser = function(body){
    var lines = body.split("\n");
    var args  = {};
    for(var i=0;i<lines.length;i++){
        var line = lines[i];
        var start = line.search(/Content-Disposition: form-data; name=/);
        if(start===0){
            var key = line.slice(38,line.length-2);
            var value = lines[i+2].slice(0,lines[i+2].length-1);;
            //console.error("key:",key);
            //console.error("value:",lines[i+2]);
            args[key]=value;
        }
    }
    return args;
};////END of  解析POST请求头，妈的还得手写一个这种东西


var switch_map = {
            //影院信息接口
            '/cinema/info'          : false ,
            //影院在线影片列表
            '/movie/list'           : false ,
            //影院未上映影片列表
            '/movie/will'           : false ,
            //影片信息接口
            '/movie/info'           : false ,
            //单个影片的排期接口
            '/movie/MovieSchedule'  : false ,
            //城市列表接口
            '/city/list'            : false ,
            //城市影院列表
            '/city/info'            : false ,
            //我的已支付订单接口
            '/order/list'           : false ,
            //某个订单详情接口
            '/order/detail'         : false ,
            //获取未支付订单接口
            '/order/unpayment'      : false ,
            //支付订单接口
            '/order/payment'        : false ,
            //影厅信息
            '/hall/info'            : false ,
            //锁座接口
            '/seat/lock'            : false ,
            //取消锁座接口
            '/seat/unlock'          : false ,
            //不可售座位接口
            '/hall/unsales'         : false ,
            //我的会员卡
            '/member/mycards'       : false ,
            //绑定会员卡
            '/member/bindingcard'   : false ,
            //会员卡支付接口
            '/member/cardpay'       : false ,
            //会员卡信息接口
            '/member/cardinfo'      : false ,
            //会员卡交易记录查询接口
            '/member/cardrecord'    : false ,
            //会员卡支付订单接口
            '/member/cardpay'       : false ,
            //我的代金券列表接口
            '/cardticket/list'      : false ,
            //代金券详情接口
            '/cardticket/info'      : false
};

var set_switch_map = function(key,value){
        switch_map[key] = value;
        return switch_map;
};

var get_switch_map = function(){
        return switch_map;
};

//授权 php api test suit					=======>auth.js
nock(base,options).post('/auth/auth')
		  .times(99999)
		  .reply(200, 'city');


//-------------------------------------------------------------------
//影城页面 php api test suit				=======>cinema.js
//影院信息接口
//http://wyy.mydoc.io/?t=2383
if(switch_map['/cinema/info']){
            nock(base,options).post('/cinema/info')
            		  .times(99999)
                      .reply(200,
            {
                "ret":0,
                "sub":0,
                "msg":'',
                "data":{
                    "city_pinyin": "suzhou",
                    "id": "5477f015b5f6814f0060d859",
                    "ticket_info": "",
                    "name": "昆山世茂欢乐影城",
                    "area": "08CF22A9C50B97D4078BBFEBFBFF000206A7",
                    "addr": "前进东路199号世茂广场3F（世茂东一号）",
                    "area_name": "江苏>>苏州>>昆山市",
                    "tele": "0512-55112323",
                    "longitude": "121.05624963558",
                    "latitude": "31.383633094952",
                    "route": "106、120东城大道",
                    "intro": "",
                    "openning_time": "10:00-24:00",
                    "discount_info": "1、会员购票：钻石卡30元（限价片除外），会员电话订票服务；会员生日当天免费观影一场；2、半价优惠时段：每天12点之前，21点之后，周一、周二全天（节假日除外），电影场次半价；",
                    "groupon_status": "0",
                    "seat_status": "1",
                    "speciality": [
                        {
                            "3D眼镜": "3D眼镜免押金"
                        },
                        {
                            "儿童优惠": "1.3m以下儿童免票无座，3D25元特价"
                        },
                        {
                            "可停车": "地下免费停车位"
                        },
                        {
                            "休息区": "大厅售票处旁边"
                        },
                        {
                            "其他": "卖品:爆米花、可乐等电影取消险:该影院不支持退票，投保后取消观影最高可赔付80%支付金额，放映前2小时以内不支持投保。详情个性票纸:该影院支持定制个性票纸"
                        },
                        {
                            "情侣座": "无"
                        },
                        {
                            "周边餐饮娱乐": "餐饮:九龙塘餐饮、玲珑湾、爱自由风格餐厅、仙雨林、百味林、千之花日本餐厅、珍奶会所、壹派咖啡等;娱乐:吉奥飞特健身会所、星牌台球、神采飞扬、御足园会所;购物:大润发超市"
                        }
                    ],
                    "lowest_price_seat": "",
                    "tickets": "",
                    "groupon_tickets": "",
                    "sure_pay_msg": "",
                    "hall": "1,2,3,4,5,6,7"
                }
            });
}
//-------------------------------------------------------------------

//影院在线影片列表
//http://wyy.mydoc.io/?t=2384
if(switch_map['/movie/list']){
        nock(base,options).post('/movie/list')
        		  .times(99999)
                  .reply(200,
        {
            "ret":0,
            "sub":0,
            "msg":'',
            "data": [
                {
                    "id": "54f428d3b5f6817ce40e1d52",
                    "movieno" : "1234567",
                    "name": "灰姑娘",
                    "director": "肯尼思·布拉纳",
                    "actor": "莉莉·詹姆斯 /...",
                    "date": "20150313",
                    "country": "美国",
                    "remark": "蓝色裙摆飞起 满足全部少女心",
                    "tags": "剧情 / 爱情 ...",
                    "coverid": "cfkrna3cypxewvb",
                    "movie_photos_ipad": "",
                    "score": "9.1",
                    "simple_remarks": "",
                    "movie_photos_ipad_mini": "",
                    "level": "0",
                    "flag_act_ios": "0",
                    "flag_act_android": "0",
                    "act_link_android": "0",
                    "flag_have_sche": "0",
                    "movie_poster": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/3/2_0/201503021709193619.jpg",
                    "movie_poster_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/3/2_2/201503021709193619.jpg",
                    "movie_still": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406064610.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406066017.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406067423.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406068829.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406070235.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406071642.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406073048.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406074454.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_0/201502040406075860.jpg",
                    "movie_still_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406064610.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406066017.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406067423.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406068829.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406070235.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406071642.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406073048.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406074454.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2015/2/4_2/201502040406075860.jpg",
                    "version": "5",
                    "have_sche_flag": "1",
                    "new_flag": "0",
                    "recommend_flag": "0",
                    "will_flag": "0"
                },
                {
                    "id": "5497db03b5f68142202060bd",
                    "movieno" : "7654321",
                    "name": "狼图腾",
                    "director": "让-雅克·阿诺",
                    "actor": "冯绍峰 / 窦骁...",
                    "date": "20150219",
                    "country": "中国",
                    "remark": "一部为草原狼立传的史诗电影",
                    "tags": "剧情 / 冒险",
                    "coverid": "85rkjs7bdnyvmqc",
                    "movie_photos_ipad": "",
                    "score": "6.8",
                    "simple_remarks": "",
                    "movie_photos_ipad_mini": "",
                    "level": "0",
                    "flag_act_ios": "0",
                    "flag_act_android": "0",
                    "act_link_android": "0",
                    "flag_have_sche": "0",
                    "movie_poster": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/13_0/201502131019486096.jpg",
                    "movie_poster_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/13_2/201502131019486096.jpg",
                    "movie_still": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401414996.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401425308.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401427496.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401430777.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401432965.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401436090.jpg",
                    "movie_still_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401414996_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401425308_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401427496_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401430777_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401432965_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401436090_1.jpg",
                    "version": "5,1,7",
                    "have_sche_flag": "1",
                    "new_flag": "0",
                    "recommend_flag": "0",
                    "will_flag": "0"
                }
            ]
        });
}

//-------------------------------------------------------------------
//影院未上映影片列表
//http://wyy.mydoc.io/?t=2385
if(switch_map['/movie/will']){
        nock(base,options).post('/movie/will')
        		  .times(99999)
                  .reply(200,
        {
            "ret":0,
            "sub":0,
            "msg":'',
            "data": [
                {
                    "id": "53e82aa525f2ba10309bc1d0",
                    "name": "道士下山",
                    "director": "陈凯歌",
                    "actor": "王宝强 / 张震 / 郭富城 / 范伟 / 林志玲",
                    "date": "20150601",
                    "country": "内地",
                    "remark": "王宝强变道士遇诡异事",
                    "tags": "剧情 / 动作",
                    "coverid": "yz54opp1bkiwpg3",
                    "longs": "00分钟",
                    "movie_photos_ipad": "",
                    "score": "9.1",
                    "simple_remarks": "",
                    "movie_photos_ipad_mini": "",
                    "flag_act_ios": "0",
                    "flag_have_sche": "0",
                    "movie_poster": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/1_0/201412011032507913.jpg",
                    "movie_poster_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/1_2/201412011032507913.jpg",
                    "movie_still": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_0/201412251533439642.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_0/201412251533470892.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_0/201412251533479017.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_0/201412251533486517.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_0/201412251533493236.jpg",
                    "movie_still_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_2/201412251533439642.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_2/201412251533470892.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_2/201412251533479017.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_2/201412251533486517.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/25_2/201412251533493236.jpg",
                    "version": "5"
                },
                {
                    "id": "5497dd67b5f6814220206102",
                    "name": "通灵之六世古宅",
                    "director": "彭发",
                    "actor": "徐娇 / 张兆辉",
                    "date": "20150831",
                    "country": "中国",
                    "remark": "徐娇首演惊悚片",
                    "tags": "恐怖",
                    "coverid": "p9ofh5h2skokiff",
                    "longs": "90分钟",
                    "movie_photos_ipad": "",
                    "score": "6.9",
                    "simple_remarks": "",
                    "movie_photos_ipad_mini": "",
                    "flag_act_ios": "0",
                    "flag_have_sche": "0",
                    "movie_poster": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/22_0/201412221658099107.jpg",
                    "movie_poster_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2014/12/22_2/201412221658099107.jpg",
                    "movie_still": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401453433.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401456402.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401459215.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_0/201412090401461246.jpg",
                    "movie_still_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401453433_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401456402_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401459215_1.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/bisqq/2014/12/9_2/201412090401461246_1.jpg",
                    "version": "1"
                }
            ]
        });
}

//-------------------------------------------------------------------
//影片信息接口
//http://wyy.mydoc.io/?t=2386

if(switch_map['/movie/info']){
        nock(base,options).post('/movie/info')
        		  .times(99999)
                  .reply(200,
        {
            "ret":0,
            "sub":0,
            "msg":'',
            "data": {
                "id": "54cf33fdb5f6810c2cd62a0a",
                "name": "木星上行",
                "director": "安迪·沃卓斯基 ...",
                "actor": "查宁·塔图姆 /...",
                "date": "20150306",
                "country": "美国",
                "remark": "霸道女爱上狗 滑板鞋拯救宇宙",
                "tags": "动作 / 科幻 ...",
                "coverid": "1x5gu7qzl99vc42",
                "pics": "54cf33fdb5f6810c2cd62a0a",
                "longs": "127分钟",
                "movie_photos_ipad": "",
                "score": "",
                "simple_remarks": "",
                "movie_photos_ipad_mini": "",
                "level": "0",
                "flag_act_ios": "0",
                "act_pic": "0",
                "act_link": "0",
                "flag_act_android": "0",
                "act_link_android": "0",
                "s_flag": "0",
                "v_flag": "0",
                "detail": "影片设定在未来，那时人类可以将动物基因与人类基因相结合，比如士兵可以结合狼的基因以获得狼的那种勇气和力量，工人则可以结合蜜蜂的基因变得更加勤劳。相比之下，没有进行基因改造的人则像原始人一样落后。故事的女主角是一位新近移民的俄国女人，由乌克兰移民美国的女演员米拉·库尼斯饰演，她以清扫厕所为生，并不知道自己拥有和宇宙女王相同的基因，而后者觉得这对她是个威胁，因此派赏金猎人前来刺杀。这位赏金猎人由钱宁·塔图姆饰演，他没有执行任务，反而爱上了这个清洁女工。这让情况变得更糟，因为他的雇主为此而震怒……除了钱宁·塔图姆、米拉·库尼斯外，据说约瑟夫·高登·拉维特也将在片中饰演一个角色，但未得到证实。",
                "movie_poster": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/3/10_0/201503101529449077.jpg",
                "movie_poster_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/3/10_2/201503101529449077.jpg",
                "movie_still": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_0/201502021626028829.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_0/201502021626032579.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_0/201502021626036173.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_0/201502021626040392.jpg",
                "movie_still_mini": "http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_2/201502021626028829.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_2/201502021626032579.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_2/201502021626036173.jpg|http://wepiao.cdn.myqcloud.com/1251246104/opensystemupload/movie/2015/2/2_2/201502021626040392.jpg",
                "share_url": "",
                "version": "3D,IMAX3D,中国巨幕",
                "videos": [ ]
            }
        });
}
//-------------------------------------------------------------------
//http://wyy.mydoc.io/?t=3096
//单个影片的排期接口
if(switch_map['/movie/MovieSchedule']){
    nock(base,options).post('/movie/MovieSchedule')
              .times(99999)
              .reply(200,
    {
        "ret":0,
        "sub":0,
        "msg":'',
        "data": {
            "id": "54c9920eb5f681265cd569f4",
            "movieno":"5250",
            "name": "灰姑娘",
            "score": "9.1",
            "sche": {
                        "20150317": [{
                                        "type": "2D",
                                        "time": "12:25",
                                        "lagu": "国语",
                                        "seat": "1",
                                        "seat_info": [{
                                                "time": "12:25",
                                                "price": "4300",
                                                "mpid": "55066634e9e437eb678b5641",
                                                "biscinemano":"6101012",
                                                "hallno":"7",
                                                "roomid": "7",
                                                "roomname": "七号厅",
                                                "traderid": "",
                                                "type_unseat_cgi_url": "1",
                                                "tradername": "",
                                                "retail_price": "4500",
                                                "iServiceCharge": "300",
                                                "fee_srv": "",
                                                "expired": "0",
                                                "ticketid": "54c0c830b5f6816cd8b391c0",
                                                "flag_alipay_wap": "0",
                                                "flag_wx_pay": "1",
                                                "iMaxPayNum": "5",
                                                "iMinPayNum": "1",
                                                "overtime": "127分钟",
                                                "agentid": ""
                                        }]
                                    },
                                    {
                                        "type": "3D",
                                        "time": "14:55",
                                        "lagu": "国语",
                                        "seat": "1",
                                        "seat_info": [{
                                                "time": "14:55",
                                                "price": "8200",
                                                "mpid": "55066634e9e437eb678b5641",
                                                "biscinemano":"6101012",
                                                "hallno":"7",
                                                "roomid": "2",
                                                "roomname": "二号厅",
                                                "traderid": "",
                                                "type_unseat_cgi_url": "1",
                                                "tradername": "",
                                                "retail_price": "4500",
                                                "iServiceCharge": "300",
                                                "fee_srv": "",
                                                "expired": "1",
                                                "ticketid": "54c0c830b5f6816cd8b391c0",
                                                "flag_alipay_wap": "0",
                                                "flag_wx_pay": "1",
                                                "iMaxPayNum": "5",
                                                "iMinPayNum": "1",
                                                "overtime": "127分钟",
                                                "agentid": ""
                                        }]
                                    }]
            }
        }
    });
}

//-------------------------------------------------------------------
//首页 php api test suit						=======>city.js
//城市列表接口
//http://wyy.mydoc.io/?t=2381
//用于显示首页
if(switch_map['/city/list']){
    nock(base,options).post('/city/list')
    		  .times(99999)
              .reply(200,
    {
        "ret":0,
        "sub":0,
        "msg":"succefully",
        "data": {
            "hot": [
                {
                    "city_id": "10",
                    "city_pinyin": "beijing",
                    "city_name": "北京",
                    "cinemas": [
                        {
                            "id": "53d75478d7ae6f26143ccfdc",
                            "cinemano": "1000086",
                            "name": "金逸北京中关村店",
                            "addr": "中关村大街19号新中关购物中心B1层"
                        },
                        {
                            "id": "53d7548ed7ae6f26143cd2e7",
                            "cinemano": "1000088",
                            "name": "金逸北京朝阳大悦城店",
                            "addr": "朝阳北路101号朝阳大悦城8层"
                        },
                        {
                            "id": "53d7548fd7ae6f26143cd2f3",
                            "cinemano": "1000252",
                            "name": "金逸北京新都店",
                            "addr": "西三旗建材中路6号新都购物广场"
                        },
                        {
                            "id": "53d7549fd7ae6f26143cd50b",
                            "cinemano": "1002917",
                            "name": "金逸北京双桥店",
                            "addr": "双桥路3号汇通时尚购物中心5层"
                        }
                    ]
                },
                {
                    "city_id": "82",
                    "city_pinyin": "shanghai",
                    "city_name": "上海",
                    "cinemas": [
                        {
                            "id": "53d75477d7ae6f26143ccfb8",
                            "cinemano": "1002251",
                            "name": "金逸上海龙之梦IMAX店",
                            "addr": "西江湾路388号凯德龙之梦B座6F-7F"
                        },
                        {
                            "id": "53d7547fd7ae6f26143cd0cc",
                            "cinemano": "1000087",
                            "name": "金逸上海中环店",
                            "addr": "金沙江路1628号绿洲中环中心广场5号楼"
                        },
                        {
                            "id": "53d7547fd7ae6f26143cd0d8",
                            "cinemano": "1002204",
                            "name": "金逸上海张江店",
                            "addr": "碧波路635号传奇广场2楼"
                        },
                        {
                            "id": "53d7547fd7ae6f26143cd0e4",
                            "cinemano": "1002121",
                            "name": "金逸上海海上海店",
                            "addr": "飞虹路568弄海上海弘基休闲广场A区48号（近大连路辽源西路）"
                        }
                    ]
                }
            ],
            "normal": [
                {
                    "city_id": "11",
                    "city_pinyin": "tianjin",
                    "city_name": "天津",
                    "cinemas": [
                        {
                            "id": "53d7547cd7ae6f26143cd06c",
                            "cinemano": "1000099",
                            "name": "金逸天津奥城店",
                            "addr": "宾水西道与水上东路交口奥城商业广场B座8号三层"
                        },
                        {
                            "id": "53d7547cd7ae6f26143cd078",
                            "cinemano": "1000251",
                            "name": "金逸天津鞍山西道店",
                            "addr": "鞍山西道259号时代数码广场五、六层"
                        },
                        {
                            "id": "53d75498d7ae6f26143cd42b",
                            "cinemano": "1000104",
                            "name": "金逸天津西岸店",
                            "addr": "琼州道103号天津西岸金逸影城"
                        },
                        {
                            "id": "53d75498d7ae6f26143cd437",
                            "cinemano": "1002718",
                            "name": "金逸天津大悦城IMAX店",
                            "addr": "南门外大街大悦城4F-15"
                        }
                    ]
                },
                {
                    "city_id": "16",
                    "city_pinyin": "qinhuangdao",
                    "city_name": "秦皇岛",
                    "cinemas": [
                        {
                            "id": "53d75494d7ae6f26143cd39b",
                            "cinemano": "1000075",
                            "name": "金逸秦皇岛海港店",
                            "addr": "正阳街5号乐都汇购物广场4层"
                        }
                    ]
                }
            ]
        }
    })
}

//-------------------------------------------------------------------
//城市影院列表
//http://wyy.mydoc.io/?t=2382
//首页点击某城市之后，请求一次？感觉可能用不上
if(switch_map['/city/info']){
        nock(base,options).post('/city/info')
        		  .times(99999)
                  .reply(200,
        {
            "ret":0,
            "sub":0,
            "msg":'',
            "data":{
                "hot": [{
                        "id": "53d75491d7ae6f26143cd33b",
                        "name": "金逸广州和业店",
                        "area": "08CF22B04FD37D430D48BFEBFBFF000206A7",
                        "addr": "康王中路486号和业广场4楼",
                        "area_name": "广东>>广州>>荔湾区",
                        "tele": "020-81236080",
                        "longitude": "113.247437",
                        "latitude": "23.12205",
                        "city_id": "00190000190234000234",
                        "city_pinyin": "guangzhou",
                        "city_name": "广州",
                        "seat_ticket_trader": "0",
                        "lowest_price_for_app": "7000",
                        "flag_groupon": "0",
                        "flag_elec_ticket": "0",
                        "sort_city_mark": 103,
                        "flag_seat_ticket": "1"
                    }],
                "normal": [
                    {
                        "id": "53d75483d7ae6f26143cd18c",
                        "name": "金逸鞍山乐购店",
                        "area": "08CFA06C3D9EB5BF026EBFEBFBFF00020655",
                        "addr": "建国南路48号乐都汇5层",
                        "area_name": "辽宁>>鞍山>>铁东区",
                        "tele": "0412-8770266",
                        "longitude": "122.986157",
                        "latitude": "41.111224",
                        "city_id": "00060000060072000072",
                        "city_pinyin": "anshan",
                        "city_name": "鞍山",
                        "seat_ticket_trader": "0",
                        "lowest_price_for_app": "7000",
                        "flag_groupon": "0",
                        "flag_elec_ticket": "0",
                        "sort_city_mark": 97,
                        "flag_seat_ticket": "1"
                    }]
            }
        });
}

//-------------------------------------------------------------------

//我的 php api test suit						=======>my.js
//我的已支付订单接口
//http://wyy.mydoc.io/?t=2389
if(switch_map['/order/list']){
        nock(base,options).post('/order/list')
        		  .times(99999)
                  .reply(200,
        {
            "language": "",
            "ret": 0,
            "sub": 0,
            "data": [
                {
                    "cd_key": "2015011483468878",
                    "cinema_id": "1002253",
                    "cinema_name": "广州华影梅花园影城",
                    "city_id": "00190000190234000234",
                    "city_name": "广州",
                    "content": "",
                    "exchange_addr": "影院前台兑换",
                    "expired_time": "2015-01-17 23:30",
                    "groupon_detail": "",
                    "groupon_list_page_title": "",
                    "hall_id": "10",
                    "hall_name": "10号厅",
                    "language": "",
                    "movie_id": "5493bc0cb5f6816548b481de",
                    "movie_name": "第七子：降魔之战",
                    "order_id": "150114113241699476",
                    "order_type": "2",
                    "pass_key": "",
                    "qr_code": "",
                    "remark": "",
                    "seat_lable": "1排01座",
                    "show_date": "2015-01-17 23:30周六",
                    "state": "22",
                    "ticket_id": "",
                    "ticket_name": "",
                    "time": "23:30",
                    "trade_name": "微信电影票",
                    "ticketCount": "1",
                    "totalPrice": "4800.0",
                    "cinemaAddr": "广州大道北28号梅花园商业广场5楼",
                    "cinema_telephone": "37322088",
                    "hotline_tele": "13560222500",
                    "isInCard": "0",
                    "bsId": "5382dbb8d7ae6f1d48cf2db4"
                },
                {
                    "cd_key": "2015011316638728",
                    "cinema_id": "1002253",
                    "cinema_name": "广州华影梅花园影城",
                    "city_id": "00190000190234000234",
                    "city_name": "广州",
                    "content": "",
                    "exchange_addr": "影院前台兑换",
                    "expired_time": "2015-01-13 23:00",
                    "groupon_detail": "",
                    "groupon_list_page_title": "",
                    "hall_id": "8",
                    "hall_name": "8号厅",
                    "language": "",
                    "movie_id": "549116a3b5f6812fe088a2eb",
                    "movie_name": "博物馆奇妙夜3",
                    "order_id": "150113170656295247",
                    "order_type": "2",
                    "pass_key": "",
                    "qr_code": "",
                    "remark": "",
                    "seat_lable": "1排08座",
                    "show_date": "2015-01-13 23:00周二",
                    "state": "22",
                    "ticket_id": "",
                    "ticket_name": "",
                    "time": "23:00",
                    "trade_name": "微信电影票",
                    "ticketCount": "1",
                    "totalPrice": "3800.0",
                    "cinemaAddr": "广州大道北28号梅花园商业广场5楼",
                    "cinema_telephone": "37322088",
                    "hotline_tele": "13560222500",
                    "isInCard": "0",
                    "bsId": "5382dbb8d7ae6f1d48cf2db4"
                },
                {
                    "cd_key": "2015011351998718",
                    "cinema_id": "1002253",
                    "cinema_name": "广州华影梅花园影城",
                    "city_id": "00190000190234000234",
                    "city_name": "广州",
                    "content": "",
                    "exchange_addr": "影院前台兑换",
                    "expired_time": "2015-01-13 23:00",
                    "groupon_detail": "",
                    "groupon_list_page_title": "",
                    "hall_id": "8",
                    "hall_name": "8号厅",
                    "language": "",
                    "movie_id": "549116a3b5f6812fe088a2eb",
                    "movie_name": "博物馆奇妙夜3",
                    "order_id": "150113164241266479",
                    "order_type": "2",
                    "pass_key": "",
                    "qr_code": "",
                    "remark": "",
                    "seat_lable": "1排09座",
                    "show_date": "2015-01-13 23:00周二",
                    "state": "22",
                    "ticket_id": "",
                    "ticket_name": "",
                    "time": "23:00",
                    "trade_name": "微信电影票",
                    "ticketCount": "1",
                    "totalPrice": "3800.0",
                    "cinemaAddr": "广州大道北28号梅花园商业广场5楼",
                    "cinema_telephone": "37322088",
                    "hotline_tele": "13560222500",
                    "isInCard": "0",
                    "bsId": "5382dbb8d7ae6f1d48cf2db4"
                }
            ],
            "total_row": 3,
            "page": 1,
            "num": 50,
            "msg": "success"
        });
}

//某个订单详情
//http://wyy.mydoc.io/?t=2390
if(switch_map['/order/detail']){
        nock(base,options).post('/order/detail')
        		  .times(99999)
                  .reply(200,
        {"language": "",
            "ret": 0,
            "sub": 0,
            "data": [
                {
                    "cd_key": "2015011483468878",
                    "cinema_id": "1002253",
                    "cinema_name": "广州华影梅花园影城",
                    "city_id": "00190000190234000234",
                    "city_name": "广州",
                    "content": "",
                    "exchange_addr": "影院前台兑换",
                    "expired_time": "2015-01-17 23:30",
                    "groupon_detail": "",
                    "groupon_list_page_title": "",
                    "hall_id": "10",
                    "hall_name": "10号厅",
                    "language": "",
                    "movie_id": "5493bc0cb5f6816548b481de",
                    "movie_name": "第七子：降魔之战",
                    "order_id": "150114113241699476",
                    "order_type": "2",
                    "pass_key": "",
                    "qr_code": "",
                    "remark": "",
                    "seat_lable": "1排01座",
                    "show_date": "2015-01-17 23:30周六",
                    "state": "22",
                    "ticket_id": "",
                    "ticket_name": "",
                    "time": "23:30",
                    "trade_name": "微信电影票",
                    "ticketCount": "1",
                    "totalPrice": "4800.0",
                    "cinemaAddr": "广州大道北28号梅花园商业广场5楼",
                    "cinema_telephone": "37322088",
                    "hotline_tele": "13560222500",
                    "isInCard": "0",
                    "bsId": "5382dbb8d7ae6f1d48cf2db4"
                }
            ],
            "total_row": 1,
            "page": 1,
            "num": 50,
            "msg": "success"
        });
}


//-------------------------------------------------------------------

//订单 php api test suit					   =======>order.js

//获取未支付订单接口
//http://wyy.mydoc.io/?t=2399
if(switch_map['/order/unpayment']){
        nock(base,options).post('/order/unpayment')
        		  .times(99999)
                  .reply(200,
        {
                    "ret":0,
                    "sub":0,
                    "data":
                          {
                            "sShowSeqNo":"1004192",
                            "sMpID":"1214150324YWVJNDES",
                            "iValidTime":"588",
                            "sPlayTime":"2015-03-24 \u661f\u671f\u4e8c 21:25 0024",
                            "iValidStamp":"1427167616",
                            "sSectionID":"",
                            "iTraderID":"0",
                            "iCinemaID":"5470085216feb413d4142c3e",
                            "iUnitPrice":"2700.0",
                            "sTempOrderID":"150324111656501775",
                            "iTotalFee":"2700.0",
                            "sHallID":"6",
                            "iServiceCharge":"200.0",
                            "sSeatLable":"01:5:09",
                            "sMovieID":"54cf33fdb5f6810c2cd62a0a",
                            "iCityID":"00190000190234000234",
                            "cinema_name":"\u5e7f\u5dde\u6cdb\u6d0b\u7535\u5f71\u57ce",
                            "movie_name":"\u6728\u661f\u4e0a\u884c",
                            "cityNo":210,
                            "movieNo":"5309",
                            "cinemaNo":"1004192",
                            "movieSchedulePricingId":"55102380e9e43788208b55dd",
                            "ticketCount":"1",
                            "totalPrice":"2700.0",
                            "cinemaAddr":"\u5e02\u6865\u8857\u6e05\u6cb3\u4e1c\u8def203\u53f7\u6c47\u73d1\u5546\u4e1a\u4e2d\u5fc36\u697c",
                            "schedulePricingId":"55102380e9e43788208b55dd"
                              },
                    "msg":"success"
        });
}

//支付订单接口
//http://wyy.mydoc.io/?t=2400
if(switch_map['/order/payment']){
        nock(base,options).post('/order/payment')
        		  .times(99999)
                  .reply(200,
        {
                "ret":0,
                "sub":0,
                "payment_details":
                                {
                                  "sCallBackURL":"",
                                  "iOrderID":"150324120340744769",
                                  "sPayCertificate":{
                                                     "appId":"wxd9a4b59d29babc09",
                                                     "timeStamp":"1427169824737",
                                                     "signType":"MD5",
                                                     "package":"prepay_id=wx201503241203446396413ed20748834695",
                                                     "nonceStr":"SBQvaKknh83j1BUF",
                                                     "paySign":"531D21C70EFAF3FBD66D68C8F5D25F44"
                                             },
                                   "iQCoinCnt":"0",
                                   "sUserDesc":"",
                                   "iTotalFee":"6400",
                                   "iSubCode":"0",
                                   "iRetCode":"0"
                               },
                "msg":"success"
        });
}
//-------------------------------------------------------------------

//影厅信息 php api test suit					=====>room.js
if(switch_map['/hall/info']){
        nock(base,options).post('/hall/info')
        		  .times(99999)
                  .reply(200,
        {
            "ret":0,
            "sub":0,
            "data":{
        "iCinemaId": "1000396",
        "iRoomId": "547750f3e4b075a5b64331a4",
        "hall_name": "9号厅",
        "sModifytime": "2015-03-17 23:45:36",
        "room_seat": [
        {
        "row": "1",
        "desc": "0",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        }
        ]
        },
        {
        "row": "2",
        "desc": "A",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "10",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "11",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        },
        {
        "row": "3",
        "desc": "B",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        },
        {
        "row": "4",
        "desc": "C",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        },
        {
        "row": "5",
        "desc": "D",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "10",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "11",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        },
        {
        "row": "6",
        "desc": "E",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "10",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "11",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        },
        {
        "row": "7",
        "desc": "F",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "10",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "11",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        },
        {
        "row": "8",
        "desc": "G",
        "area": "01",
        "detail": [
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "Z",
        "damagedFlg": "",
        "loveInd": ""
        },
        {
        "n": "01",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "02",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "03",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "04",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "05",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "06",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "07",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "08",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "09",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "10",
        "damagedFlg": "N",
        "loveInd": "0"
        },
        {
        "n": "11",
        "damagedFlg": "N",
        "loveInd": "0"
        }
        ]
        }
        ]
        }});
}

//-------------------------------------------------------------------

//这是一个场次的锁定作为的虚拟内存结构
//KEY是schedulePricingId:55102380e9e43788208b55e3
// [2015-04-20 17:53:52.442] [ERROR] console - [NOCK] { schedulePricingId: '55102380e9e43788208b55e',
//   ticket: '5491449cb5f6812fe088aa7',
//   seatlable: '01:6:07|01:6:0' }
// [2015-04-20 17:53:52.443] [INFO] console - { '55102380e9e43788208b55e': '01:6:07|01:6:0' }
// 收到请求之后，内存数据结构就会变成这样
var seats_mock = {};


//获取场次不可售作为座位
//这里修改的scope.js，
//将            //body = JSON.stringify(body);126行注释掉了
//否则因为nock是一种注册机制，reply的链式调用其实在request之前
//导致指针序列化之后对程序不可见
if(switch_map['/hall/unsales']){
        var unsales_mock_temp = {};
        var outer_binder = {"seats_mock":seats_mock,"unsales_mock_temp":unsales_mock_temp};

        nock(base,options)
                .post('/hall/unsales',function(body) {
                  var args_map = body_parser(body);
                      console.error("[NOCK]",args_map);
                      var schedulePricingId                   = args_map.schedulePricingId;
                          unsales_mock_temp.schedulePricingId = schedulePricingId;
                      console.error("unsales_mock_temp.schedulePricingId",unsales_mock_temp.schedulePricingId);
                      console.error("seats_mock[unsales_mock_temp.schedulePricingId]",seats_mock[unsales_mock_temp.schedulePricingId]);
                      console.error("seats_mock",seats_mock);
                  return true;
                })
                .times(99999)
                .reply(200,function(){
                    var schedulePricingId = unsales_mock_temp.schedulePricingId;
                        console.log("schedulePricingId",schedulePricingId);
                    var seat              = seats_mock[schedulePricingId];
                        console.log(seat);
                    return {
                        "ret":0,
                        "sub":0,
                        "data":seat,
                        "msg":"success"
                    }
                });
}//END OF //获取场次不可售作为座位==============================================================


//座位 php api test suit      				=====>seat.js
//锁座接口
//http://wyy.mydoc.io/?t=2403
if(switch_map['/seat/lock']){
        nock(base,options).post('/seat/lock',function(body) {
                  var args_map = body_parser(body);
                      console.error("[NOCK]",args_map);
                      var schedulePricingId = args_map.schedulePricingId;
                          seats_mock[schedulePricingId] = args_map.seatlable;
                      console.log(seats_mock);
                  return true;
                })
                  .times(99999)
                  .reply(200,
            {
                "ret":0,
                "sub":0,
                "data":
                    { "sTempOrderID":"150324113412863630",
                      "iLockValidTime":"600",
                      "sMpID":"1214150324F8L6JPHT",
                      "sInfo":"success",
                      "iSubCode":"0",
                      "iRetCode":"0",
                      "sSeatLable":"01:6:06",
                      "iTime":"20150324 113412",
                      "iPayNum":"1",
                      "sPlayTime":"2015-03-24 13:05",
                      "iUnitPrice":"3200.0",
                      "iTotalFee":"3200.0",
                      "errmsg":"",
                      "iStatus":"1",
                      "iCinemaName":"\u5e7f\u5dde\u6cdb\u6d0b\u56fd\u9645\u5f71\u57ce",
                      "sRoom":"4\u53f7\u5385"
                    },
            "msg":"success" }
            );
}

// "data":{
//     "errmsg": "",
//     "iCinemaName": "中山恒大影城",
//     "iLockValidTime": "600",
//     "iPayNum": "1",
//     "iRetCode": "0",
//     "iStatus": "1",
//     "iSubCode": "0",
//     "iTime": "20150421 174712",
//     "iTotalFee": "3800.0",
//     "iUnitPrice": "3800.0",
//     "sInfo": "success",
//     "sMpID": "1262150421S7YX636T",
//     "sPlayTime": "2015-04-21 23:10",
//     "sRoom": "5号厅",
//     "sSeatLable": "02:7:03",
//     "sTempOrderID": "150421174705677173"
// }
//过了十分钟的话：
//{"ret":"-1","sub":"90003","msg":"锁定的座位已过期","data":[]}
//
//
//{"ret":"-1","sub":"90024","msg":"当前订单的支付下单失败","data":[]}
//
//院线的缩写错了的话：
//{"ret":"-1","sub":"90010","msg":"非法的支付","data":[]}

//取消锁座接口
//http://wyy.mydoc.io/?t=2404
if(switch_map['/seat/unlock']){
        nock(base,options).post('/seat/unlock')
        		  .times(99999)
                  .reply(200,
        {
            "ret":0,
            "sub":0,
            "data":"01:6:06@01:8:08",
            "msg":"success"
        });
}


//会员卡

//我的会员卡
if(switch_map['/member/mycards']) {
    nock(base,options).post('/member/mycards')
        .times(99999)
        .reply(200, {
            "ret": "0",
            "sub": "0",
            "msg": "SUCCESS",
            "data": [
                {
                    'card_id': '123',
                    'card_no': '54c5d53109eef86f94127e93',
                    'card_name': '金卡会员',
                    'card_desc': '购票尊享8.8折优惠',
                    'card_pic': 'http://www.zfcard.com/images/upfile/%E4%BC%9A%E5%91%98%E5%8D%A1/%E7%94%B5%E5%BD%B1%E9%99%A2%E4%BC%9A%E5%91%98%E5%8D%A1/big/%E7%94%B5%E5%BD%B1%E9%99%A2%E4%BC%9A%E5%91%98%E5%8D%A1-006.jpg',
                    'balance': '800'
                },
                {
                    'card_id': '12121',
                    'card_no': '54c5d53109eef86f94127e93',
                    'card_name': '钻石会员',
                    'card_desc': '购票尊享5折优惠',
                    'card_pic': 'http://www.zfcard.com/images/upfile/%E4%BC%9A%E5%91%98%E5%8D%A1/%E7%94%B5%E5%BD%B1%E9%99%A2%E4%BC%9A%E5%91%98%E5%8D%A1/big/%E7%94%B5%E5%BD%B1%E9%99%A2%E4%BC%9A%E5%91%98%E5%8D%A1-006.jpg',
                    'balance': '8000'
                }
            ]
        });
};

//绑定会员卡接口
if(switch_map['/member/bindingcard']) {
    nock(base, options).post('/member/bindingcard')
        .times(999999)
        .reply(200, {
            "ret": 0,
            "sub": 0,
            "msg": "successfully",
            "data": {
                "phone": "18500186007",
                "card_no": "9991200000461",
                "check_phone": "1"  //此时已经发送验证码，也验证过此手机号没有绑定过会员卡，该卡可以绑定
            }
        });
};

//会员卡信息接口
if(switch_map['/member/cardinfo']) {
    nock(base, options).post('/member/cardinfo')
        .times(999999)
        .reply(200, {
            "ret": "0",
            "sub": "0",
            "msg": "SUCCESS",
            "data": {
                'card_no': '54c5d53109eef86f94127e93',
                'card_name': '金卡会员',
                'card_desc': '购票尊享8.8折优惠',
                'card_pic': '94%B5%E5%BD%B1%E9%99%A2%E4%BC%9A%E5%91%98%E5%8D%A1-006.jpg',
                'expiration_time': "2015-09-12",
                'balance': '800'
            }
        })
}

//会员卡支付接口
if(switch_map['/member/cardpay']) {
    nock(base, options).post('/member/cardpay')
        .times(999999)
        .reply(200, {
            "ret": "0",
            "sub": "0",
            "msg": "SUCCESS",
            "data": {
                order_id:'150114113241699476'
            }
        });
};

//会员卡交易记录查询接口
if(switch_map['/member/cardrecord']) {
    nock(base, options).post('/member/cardrecord')
        .times(999999)
        .reply(200, {
            "ret": "0",
            "sub": "0",
            "msg": "SUCCESS",
            "data": [
                {
                    'order_id': '54c5d53109eef86f94127e93',
                    'pay_time': '2015-05-17',
                    'price': '200',
                    'pay_msg': '充值200元',
                    'balance': '800'
                },
                {
                    'order_id':'54c5d53109eef86f94127e93',
                    'pay_time':'2015-05-16',
                    'price':'297',
                    'pay_msg':'《左耳》 * 3',
                    'balance':'600',
                }
            ]
        });
};
//会员卡支付
//http://wyy.mydoc.io/?t=11886
if(switch_map['/member/cardpay']){
        nock(base,options).post('/member/cardpay')
                  .times(99999)
                  .reply(200,
        {
                "ret": "0",
                "sub": "0",
                "msg": "SUCCESS",
                "data": {
                   "order_id":'2222222222'
                }
        });
}
//-------------------------------------------------------------------

//我的代金券列表
if(switch_map['/cardticket/list']) {
    console.log('mock模拟数据-我的代金券列表')
    nock(base, options).post('/cardticket/list')
        .times(999999)
        .reply(200,
        {
            "ret": "0",
            "sub": "0",
            "msg": "success",
            "data": {
                "work": [
                    {
                        "code": "0004000050000001", //代金券code
                        "title": "马超请你看电影立减5元",
                        "rulemsg": "限 2D/3D,5部影片,2家影院",
                        "start_time": "2015-07-07 00:00:00",
                        "end_time": "2015-07-12 23:59:59",
                        "amount": "500", //优惠金额（分）
                        "isuse": "1", //是否可以使用 1可用 0不可用
                        "used": "0", //是否已使用 1已使用 0 未使用
                    },
                    {
                        "code": "0004000050000002",
                        "title": "国庆马超陪你看电影立减35元",
                        "rulemsg": "限 2D/3D,5部影片,2家影院",
                        "start_time": "2015-10-01 00:00:00",
                        "end_time": "2015-10-07 23:59:59",
                        "amount": "500",
                        "isuse": "0", //是否可以使用 1可用 0不可用
                        "used": "0", //是否已使用 1已使用 0 未使用
                    }
                ],
                "void": [
                    {
                        "code": "0004000050000004",
                        "title": "马超请你看电影立减5元",
                        "rulemsg": "限 2D/3D,5部影片,2家影院",
                        "start_time": "2015-05-07 00:00:00",
                        "end_time": "2015-05-12 23:59:59",
                        "amount": "500",
                        "isuse": "0", //是否可以使用 1可用 0不可用
                        "used": "1", //是否已使用 1已使用 0 未使用
                    },
                    {
                        "code": "0004000050000003",
                        "title": "五一马超陪你看电影立减35元",
                        "rulemsg": "限 2D/3D,5部影片,2家影院",
                        "start_time": "2015-05-01 00:00:00",
                        "end_time": "2015-05-07 23:59:59",
                        "amount": "500",
                        "isuse": "0", //是否可以使用 1可用 0不可用
                        "used": "0", //是否已使用 1已使用 0 未使用
                    }
                ]
            }
        }
    )
}

//我的代金券列表
if(switch_map['/cardticket/info']) {
    console.log('mock模拟数据-代金券详情')
    nock(base, options).post('/cardticket/info')
        .times(999999)
        .reply(200, {
            "ret": "0",
            "sub": "0",
            "msg": "success",
            "data": {
                "code": "0004000050000002",
                "title": "国庆马超陪你看电影立减35元",
                "rulemsg": "限 2D/3D,5部影片,2家影院",
                "start_time": "2015-07-01 00:00:00",     //代金券有效期
                "end_time": "2015-07-17 23:59:59",     //代金券有效期
                "ruletime": "周一，周二，周三 08：00 - 19:00", //使用时段
                "amount": "500",
                "isuse": "0", //是否可以使用 1可以 0不可以
                "used": "1", //是否已使用 1已使用 0 未使用
                "movies": "变形金刚 金刚葫芦娃 哇哈哈 少年英雄小哪吒 吐槽能量光环",
                "movie_type": "2D、3D",
                "cinemas": "金逸朝阳大悦城",
                "explain": "1：代金券仅限以上标明影片，或影院使用。2：仅支持在线选座，不支持兑换券。3：有效期参考详细说明"
            }
        })
}

//对外暴露设置界面
exports.set_switch_map = set_switch_map;
exports.get_switch_map = get_switch_map;
exports.base           = base;