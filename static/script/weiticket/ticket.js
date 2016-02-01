/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var wxbridge = require('../util/wxbridge');
var ChooseCity = require('../util/chooseCity');
var Util = require('../util/widgets');

/* jshint ignore:end */
$(document).ready(function() {
    //定位城市
    // function getCurrentPosition () {
    //     //this.$currentCity.html('正在定位...');
    //     widgets.getCurrentPosition(function (coords) {
    //         alert(coords.longitude+ '    ' +coords.latitude);
    //         // ajax.get('/GetCityByLongitudelatitude.api?longitude=' + coords.longitude + '&latitude=' + coords.latitude, _.bind(function (city) {
    //         //     if (city && city.cityId) {
    //         //         app.user.setCity(city.cityId, city.name);
    //         //         this.$currentCity.html(city.name);
    //         //         this.$currentCity.attr('data-id', city.cityId);
    //         //         this.$currentCity.attr('data-name', city.name);
    //         //     }
    //         // }, this), 'json');
    //     }, function () {
    //         //this.$currentCity.html('定位失败');
    //     });
    // }
    // getCurrentPosition();

    var openId = cookie.getItem('openids');

    var filmlists = $('.filmlist');
    var _len = filmlists.length;
    var _chooseCity = $('.city'),
        city = cookie.getItem('city');
    if(city){
        city = JSON.parse(city);
        _chooseCity.find('span').html(city.name);
        locationId = city.locationId;
    }

    for(var i = 0; i < _len; i++){
        if(i > 1){
            $(filmlists[i]).addClass('hidefilm');
        }
    }
    $('._dt').on('click', function(evt){
        var _el = $(this.parentElement);
        if(_el.hasClass('hidefilm')){
            _el.removeClass('hidefilm');
        }else{
            _el.addClass('hidefilm');
        }
        return;
    })


    _chooseCity.on('click', function(evt){
        ChooseCity.init(function(city){
            var cookieExpired = 60 * 60 * 24 * 30; //30天
            var cookiePath = '/';
            cookie.setItem('city', JSON.stringify(city), cookieExpired, cookiePath);
            location.href = '/'+ window.publicsignal + '/' + city.locationId + '/ticket/' + movieId;

        }.bind(this))
    })

    //分享
    var _shareInfo = window.shareInfo && window.shareInfo;
    if(!_shareInfo){
        _shareInfo = {};
    }
    var shareImgs = $('.infocon').find('img');
    if(window.movie){
        wxbridge.share({
            title: _shareInfo.title ? _shareInfo.title : '觉得《'+ movie.movieNameCN +'》值得一看哦，有空吗？',
            timelineTitle: _shareInfo.title ? _shareInfo.title : '觉得《'+ movie.movieNameCN +'》值得一看哦，有空吗？',
            desc: _shareInfo.title ? _shareInfo.title : '[电影票友]荐：' +movie.intro,
            link: window.location.href,
            imgUrl: _shareInfo.title ? _shareInfo.title : movie.movieImage,
            callback: function(shareobj){
                
                Util.shearCallback(publicsignal, openId, movie.movieID, 5, shareobj, function(){
                    console.log('分享成功，并发送服务器');
                })
                // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
            }
        })
    }
    // var shareImgs = $('.infocon').find('img');
    // wxbridge.share({
    //     title: Util.strShort($('.infotit').html(), 25)  + ' -' + weMediaName,
    //     timelineTitle: '[电影票友]荐：' + Util.strShort($('.infotit').html(), 20) + ' -' + weMediaName,
    //     desc: '[电影票友]荐：' + (window._summary != '' ? window._summary : '在电影的时光读懂自已     www.moviefan.com.cn'),
    //     link: window.location.href,
    //     imgUrl: shareImgs.length > 0 ? shareImgs[0].src : $('.logobox').find('img')[0].src,
    //     callback: function(){
    //         shareTip();
    //         Util.shearCallback(publicsignal, openId, newsId, 2, function(){
    //             console.log('分享成功，并发送服务器');
    //         })
    //         // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
    //     }
    // })


}); //END of jquery documet.ready 