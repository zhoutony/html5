/*
 * Created by LemonHall on 2015/4/
 */
var util = require('util');
var model = require(process.cwd() + "/libs/model.js");
var chk_login = require(process.cwd() + "/libs/check_login_middle.js");
var cinemaInfoData = require(process.cwd() + "/route/wecinema/util/cinemaInfoData.js")

var returnErrorPage = model.returnErrorPage;
var _ = require('underscore');

var os = require('os');
var pid = process.pid;
var hostname = os.hostname();
var my_name = hostname + ':' + pid;





// http://weiticket.com:8088/queryLocations.aspx

app.get(['/locations'], function (req, res) {
    var publicsignalshort = req.params["publicsignalshort"];

    var publicSignalInfoOptions = {
        uri: '/queryLocations.aspx',
        args: {}
    };
    var render_data = {};
    render_data.data = {};
    model.getDataFromPhp(publicSignalInfoOptions, function (err, data) {
        console.log(err, data);
        if (!err && data) {
            
        }
        res.send(data);
    });
});


//====路由开始，主函数开始============================================
app.get(['/:publicsignalshort/choose_cinema/'], function (req, res, next) {
        //从参数当中获取公众号的id
        var publicsignalshort = req.params["publicsignalshort"];

        req.auth_debug = false;
        req.publicsignalshort = publicsignalshort;


        //配置公众号地址
        //cookie的时间是一个月
        res.cookie('publicsignalshort', publicsignalshort, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        });

        var lastVisitCinema = req.cookies.lastVisitCinema;
        var currentVisitCinema = publicsignalshort + '-' + req.cookies.cinema_id;

        if (lastVisitCinema && lastVisitCinema === currentVisitCinema) {
            res.redirect("/" + publicsignalshort + "/cinema/" + req.cookies.cinema_id)
        } else {
            return next();
        }

    }
    //使用了一个验证登录的子函数来判定登录
    //来判定cookie当中是否含有open_id的json串
    , function (req, res) {
        var render_data = {};
        var publicsignalshort = req.params["publicsignalshort"];
        //调用的接口列表
        var my_api_addr = "/city/list";
        render_data.data = {
            reversion: global.reversion,
            staticBase: global.staticBase
        };
        render_data.data.UpperToCityMap = {};
        render_data.data.CityidToCinemasMap = {};
        render_data.data.publicsignalshort = publicsignalshort;
        var options = {
            uri: my_api_addr,
            args: {publicsignalshort: publicsignalshort}
        };

        var build_home_url = function (publicsignalshort, cinemaId) {
            var callback_host = 'http://smart.wepiao.com';
            var build_home_url = '/' + publicsignalshort + '/cinema/' + cinemaId;
            return build_home_url;
        }

        // //获取公众号信息接口数据，得到广告、色值等
        // var publicSignalInfoOptions = {
        //     uri: '/publicsignal/info',
        //     args: {
        //         publicsignalshort: publicsignalshort
        //     }
        // };
        // model.getDataFromPhp(publicSignalInfoOptions, function(err, data){
        //     if (!err && data){
        //         if (data.viewColor) {
        //             render_data.data.viewColor = data.viewColor;
        //         }
        //         if (data.fontColor) {
        //             render_data.data.fontColor = data.fontColor;
        //         }
        //         if (data.adv) {
        //             render_data.data.advertisements = data.adv;
        //         }
        //         if (data.publicSignalName) {
        //           render_data.data.publicSignalName = data.publicSignalName;
        //         }
        //     }
        // });


        //获取城市列表接口数据
        model.getDataFromPhp(options, function (err, data) {
            render_data.data.err = err;
            if (!err && data && data.hot && data.normal) {
                var citys = _.union(data.hot, data.normal);

                //解决 城市分两行显示时影院只在最底部显示的问题
                var groupData = cinemaInfoData.groupData(citys);
                for (var cityKey in groupData) {
                    var newGroupData = [];
                    var nullArr = [];
                    for (var i = 0; i < groupData[cityKey].length; i++) {
                        nullArr.push(groupData[cityKey][i]);
                        if (i != 0 && i % 4 == 3) { //...第4，8，12 个
                            newGroupData.push(nullArr);
                            nullArr = [];
                        }
                    }
                    if (nullArr.length > 0)
                        newGroupData.push(nullArr);
                    groupData[cityKey] = newGroupData;
                }
                render_data.data.UpperToCityMap = groupData;

                render_data.data.CityidToCinemasMap = cinemaInfoData.build_CityidToCinemasMap(citys);

                var cityNumber = cinemaInfoData.cityNumber(data);
                render_data.data.cityNumber = cityNumber;

                if (cityNumber === 1) {
                    var cinemas = citys[0].cinemas;
                    var cinemaNumber = cinemas.length;
                    render_data.data.cinemas = cinemas;
                    render_data.data.cinemaNumber = cinemaNumber;
                } else {
                    render_data.data.cinemaNumber = 2; //待优化
                }

            }

            if (cinemaNumber && cinemaNumber === 1) {
                var cinemaId = cinemas[0].cinemano;
                var hasMember = cinemas[0].hasMember;
                //res.cookie('has_cinema_member', hasMember, {path: '/'});
                //console.log('hasMember:::'+hasMember);
                res.redirect("/" + publicsignalshort + "/cinema/" + cinemaId);
            } else {
                res.render("wecinema/choose_cinema", render_data)
            }

        });//END of getDataFromPhp...............................................


    });// END of get /wx=========================================================

//获取公众号信息接口数据，得到广告、色值等
app.get(['/:publicsignalshort/public_signal_info'], function (req, res) {
    var publicsignalshort = req.params["publicsignalshort"];

    var publicSignalInfoOptions = {
        uri: '/publicsignal/info',
        args: {
            publicsignalshort: publicsignalshort
        }
    };
    var render_data = {};
    render_data.data = {};
    model.getDataFromPhp(publicSignalInfoOptions, function (err, data) {
        if (!err && data) {
            if (data.viewColor) {
                render_data.data.viewColor = data.viewColor;
            }
            if (data.fontColor) {
                render_data.data.fontColor = data.fontColor;
            }
            if (data.adv) {
                render_data.data.advertisements = data.adv;
            }
            if (data.publicSignalName) {
                render_data.data.publicSignalName = data.publicSignalName;
            }
        }
        res.send(render_data.data);
    });
});