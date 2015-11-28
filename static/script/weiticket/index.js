/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');

var dialogs = require('../util/dialogs.js');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');

/* jshint ignore:end */
$(document).ready(function() {
    window.dialogs = dialogs;
    var movienewsPageindex = 1;
    var hotmovie = $('.hotmovie');
    var lock = false;
    //加载 头条电影列表
    function getMovieNews(){
        var _url = '/movienews/' + movienewsPageindex;
        $.get(_url, function(data) {
            var _el = $('<div></div>').html(data).appendTo(hotmovie);
            if(movienewsPageindex == 1){
                appendThirdAds(_el, thirdIndex ? thirdIndex -1 : 1);
            }
            if(!lock){
                lock = true;
                ScrollBottomPlus.render({
                    el: '.hotmovie',
                    app_el: '.wrap',
                    footer: '.navtool',
                    callback: function(){
                        movienewsPageindex++;
                        getMovieNews();
                        ScrollBottomPlus.gotoBottomShowed = false;
                    }
                })
            }
        });

    }
    getMovieNews();

        
    
    var _txtbox = $('.txtbox');
    document.querySelector('.scrollpic').addEventListener('slide', function(event) {
        // console.log(event.detail.slideNumber);
        var _i = event.detail.slideNumber;
        _txtbox.addClass('m-hide');
        $(_txtbox[_i]).removeClass('m-hide').addClass('m-show');
    });

    function appendThirdAds(el, _index){
        var _sections = el.find('section'),
            _section = $(_sections[_index]);

        _section.after($('._thirdads').removeClass('m-hide'));
        
        //顶部轮播
        // var indicator = $(_mui_slider);
        // $(indicator[0]).addClass('mui-active');
        // var gallery = mui('_mui-slider');
        // gallery.slider({
        //     interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
        // });
    }

}); //END of jquery documet.ready 