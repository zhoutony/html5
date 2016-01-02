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

/* jshint ignore:end */
$(document).ready(function() {
    var cityEl;
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
            $.get('/11000/filmlist/' + _type + '/1', function(_html){
                if(_html){
                    history.pushState('', '', location.origin + '/11000/filmlist/' + _type);
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

    $('#chooseCity').on('click', function(evt){
        var cityHtml = localStorage.getItem('cityHtml');
        if(cityHtml){
            cityEl = $(cityHtml).appendTo(document.body);
        }else{
            $.get('/get/citys', function(_html){
                if(_html){
                    localStorage.setItem('cityHtml', _html);
                    cityEl = $(_html).appendTo(document.body);
                }
            })
        }
    })

}); //END of jquery documet.ready
