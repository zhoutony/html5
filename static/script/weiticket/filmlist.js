/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var widgets = require('../util/widgets.js');
var dialogs = require('../util/dialogs');
var Citys = require('./citys');
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
    if(showtype == 'coming'){
        $('._hot').removeClass('curr');
        $('._coming').addClass('curr');
    }
    $.get('/get/queryadvertisements', function(adsHtml){
        var _addimg = $('.addimg').html(adsHtml);


        //顶部轮播
        var indicator = $('.mui-slider');
        $(indicator[0]).addClass('mui-active');
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        var myCitys = Citys.render();
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
    $('.movielist').on('tap', 'li', function(evt){
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
            if(showtype == 'coming'){
                location.href = '/' + city.locationId + '/filmlist/coming';
            }else{
                location.href = '/' + city.locationId + '/filmlist/hot';
            }
        }.bind(this))
    })

}); //END of jquery documet.ready
