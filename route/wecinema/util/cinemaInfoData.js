var _ = require('underscore');
//计算影院数目
var cityNumber = function (cinemas) {
    var hotCinemas = cinemas.hot;
    var normalCinemas = cinemas.normal;

    var hotCinemasNumbers = hotCinemas.length;
    var normalCinemasNumbers = normalCinemas.length;
    var totalCinemasNumbers = hotCinemasNumbers + normalCinemasNumbers;
    return totalCinemasNumbers;
};


var group_data = function (city_list) {
    //-先将city_list排序
    city_list.sort(getSortFun('asc', 'city_pinyin'));

    var UpperMap = {};
    for (var i = 0; i < city_list.length; i++) {
        var city_obj = city_list[i];
        var UpperFirst = city_obj.city_pinyin.toUpperCase().substr(0, 1);
        if (UpperMap[UpperFirst] === undefined) {
            UpperMap[UpperFirst] = [];
            UpperMap[UpperFirst].push(city_obj);
        } else {
            UpperMap[UpperFirst].push(city_obj);
        }
    }

    return UpperMap;

    //按首字母分类城市
    // var pinyincityList = [];
    // _.each(city_list, function (city) {
    //     var pinyin = city.city_pinyin.slice(0, 1).toUpperCase();
    //     var item = _.find(pinyincityList, function (c) { return c.pinyin == pinyin; });
    //     if (!item) {
    //         item = {};
    //         item.pinyin = pinyin;
    //         item.city = [];
    //         pinyincityList.push(item);
    //     }
    //     item.city.push(city);
    // });
    // pinyincityList = _.sortBy(pinyincityList, function (p) { return p.pinyin; });
    // return pinyincityList;    
};

var getSortFun = function (order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

var build_CityidToCinemasMap = function (city_list) {
    var CityidToCinemasMap = {};
    for (var i = 0; i < city_list.length; i++) {
        var city_obj = city_list[i];
        CityidToCinemasMap[city_obj.city_id] = JSON.stringify(city_obj.cinemas);
    }
    return CityidToCinemasMap;
};


//将影院特色服务信息转换为图标
var specialServices = function (speciality) {
    var specIcons = {};

    var specMap = {
        "3D眼镜": "icon-3d",
        "儿童优惠": "icon-child",
        "可停车": "icon-park",
        "休息区": "icon-rest",
        "情侣座": "icon-lover",
        "周边餐饮娱乐": "icon-food",
        "其他": "icon-other"
    };

    if (speciality && speciality.length !== 0) {

        for (var i = 0; i < speciality.length; i++) {
            var specKey = Object.keys(speciality[i])[0];
            var specVal = specMap[specKey];
            specIcons[specKey] = specVal;
        }
    }
    return specIcons;
};

var specialServicesDetails = function (specIcons, specDetails) {
    var specialServicesDetails = {};
    var icons = Object.keys(specIcons);
    if (icons && icons.length !== 0) {
        for (var i = 0; i < icons.length; i++) {
            var word = icons[i];
            var icon = specIcons[word];
            var details = specDetails[i][word];
            specialServicesDetails[icon] = details;
        }
    }
    return specialServicesDetails;

};


exports.cityNumber = cityNumber;
exports.groupData = group_data;
exports.build_CityidToCinemasMap = build_CityidToCinemasMap;
exports.specialServices = specialServices;
exports.specialServicesDetails = specialServicesDetails;