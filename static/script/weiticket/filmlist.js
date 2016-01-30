/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var widgets = require('../util/widgets.js');
var wxbridge = require('../util/wxbridge');
var dialogs = require('../util/dialogs');
// var Citys = require('./citys');
var ChooseCity = require('../util/chooseCity');

/* jshint ignore:end */
$(document).ready(function() {
    var _chooseCity = $('#chooseCity'),
        cityEl,
        city = cookie.getItem('city'),
        locationId;
    if(city){
        city = JSON.parse(city);
        _chooseCity.find('span').html(city.name);
        locationId = city.locationId;
    }
    if(window.showtype == 'coming'){
        $('._hot').removeClass('curr');
        $('._coming').addClass('curr');
    }
    $.get('/get/queryadvertisements/4', {type: 4, wxtype: publicsignal}, function(adsHtml){
        var _addimg = $('.addimg').html(adsHtml);
        var fourthadLen = $('.scrollpic').data('fourthad');

        if(fourthadLen == '1'){

        }else{
            //顶部轮播
            var indicator = $('.mui-slider');
            $(indicator[0]).addClass('mui-active');
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
        // var myCitys = Citys.render();
    })
    //定位城市
    function getCurrentPosition () {
        //this.$currentCity.html('正在定位...');
        widgets.getCurrentPosition(function (coords) {
            // alert(coords.longitude);
            $.get('/queryLocation/' + coords.longitude + '/' + coords.latitude, function(render_data){
                if(render_data && render_data.location){
                    alert(render_data.location.nameCN);
                }
            })
            // ajax.get('/GetCityByLongitudelatitude.api?longitude=' + coords.longitude + '&latitude=' + coords.latitude, _.bind(function (city) {
            //     if (city && city.cityId) {
            //         app.user.setCity(city.cityId, city.name);
            //         this.$currentCity.html(city.name);
            //         this.$currentCity.attr('data-id', city.cityId);
            //         this.$currentCity.attr('data-name', city.name);
            //     }
            // }, this), 'json');
        }, function () {
            //this.$currentCity.html('定位失败');
        });
    }
    getCurrentPosition();

    $('#menutop').on('click', 'li', function(evt){
        var _el = $(evt.currentTarget),
            _type = '';
        if(!_el.hasClass('curr')){
            _type = _el.data('type');
            $.get('/'+ locationId +'/filmlist/' + _type + '/1', function(_html){
                if(_html){
                    history.pushState('', '', location.origin + '/'+ locationId +'/filmlist/' + _type);
                    $('#menutop').find('li').removeClass('curr');
                    _el.addClass('curr');
                    $('.movielist').html(_html);
                }
            });
        }
    })
    $('.movielist').on('click', 'li', function(evt){
        var _el = $(evt.currentTarget),
            _url = _el.data('url');
        if(_url){
            location.href = _url;
        }
    })

    _chooseCity.on('click', function(evt){
        ChooseCity.init(function(city){
            var cookieExpired = 60 * 60 * 24 * 30; //30天
            var cookiePath = '/';
            cookie.setItem('city', JSON.stringify(city), cookieExpired, cookiePath);
            if(window.showtype == 'coming'){
                location.href = '/'+ window.publicsignal + '/' + city.locationId + '/ticket/';
            }else{
                location.href = '/'+ window.publicsignal + '/' + city.locationId + '/filmlist/hot';
            }
        }.bind(this))
    })
    //-发现弹出 即将开启
    var _findbox = $('#findbox ');
    _findbox.on('click',function(){
        _findbox.addClass('showtips')  ;
        setTimeout(function(){
            _findbox.removeClass('showtips')  ;
        }, 1000);    
    })



    //分享
    var _shareInfo = shareInfo && shareInfo;
    if(!_shareInfo){
        _shareInfo = {};
    }
    wxbridge.share({
        title: _shareInfo.title ? _shareInfo.title : '今天热映的电影有几部还值得一看哦，有空吗？',
        timelineTitle: _shareInfo.timelineTitle ? _shareInfo.timelineTitle : '今天热映的电影有几部还值得一看哦，有空吗？',
        desc: _shareInfo.desc ? _shareInfo.desc : '今日热映 - 电影票友 moviefan.com.cn',
        link: window.location.href,
        imgUrl: _shareInfo.imgUrl ? _shareInfo.imgUrl : 'http://p2.pstatp.com/large/3245/1852234910',
        callback: function(){
            Util.shearCallback(publicsignal, openId, window.showtype, 4, function(){
                console.log('分享成功，并发送服务器');
            })
            // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })

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
