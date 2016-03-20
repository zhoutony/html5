var util            = require('util');
var model           = require(process.cwd()+"/libs/model.js");
var chk_login       = require(process.cwd() + "/libs/check_login_middle.js");

var os       = require('os');
var pid      = process.pid;
var hostname = os.hostname();
var my_name  = hostname + ':' + pid;

//选择城市
app.get(["/get/citys"], function(req, res){
    var render_data = {};
    var my_api_addr = "/queryLocations.aspx";
    var options = {
        uri: my_api_addr,
        args: {
            locationID: 110000,
            type:       1,
            pageIndex:  1,
            pageSize:   10
        }
    };
    render_data.data = {}
    model.getDataFromPhp(options, function (err, data) {
        // console.log(data)
        render_data.data = {
            err: err,
            citys: null
        }
        if(data && data.locations){
            render_data.data.citys = group_data(data.locations);
            // console.log(JSON.stringify(render_data.data.citys['A']));
        }
        res.render("wecinema/city", render_data);
    });
    
});

// 获取定位
app.get(["/queryLocation/:longitude/:latitude"], function (req, res) {
    var apiURL = "/queryLocationByLatitudeLongitude.aspx";
    var longitude = req.params["longitude"];
    var latitude = req.params["latitude"];

    var options = {
        uri: apiURL,
        args: {
            longitude: longitude,
            latitude: latitude
        }
    };

    model.getDataFromPhp(options, function (err, data) {
        res.json(data || {});
    });
});


var group_data = function (city_list) {
    if(!city_list) return;
    //-先将city_list排序
    city_list.sort(getSortFun('asc', 'namePinyin'));

    var UpperMap = {};
    var hotCity = {};
    for (var i = 0; i < city_list.length; i++) {
        var city_obj = city_list[i];
        var UpperFirst = city_obj.namePinyin.toUpperCase().substr(0, 1);
        if (UpperMap[UpperFirst] === undefined) {
            UpperMap[UpperFirst] = [];
            UpperMap[UpperFirst].push(city_obj);
        } else {
            UpperMap[UpperFirst].push(city_obj);
        }
    }

    return UpperMap;
};

var getSortFun = function (order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}