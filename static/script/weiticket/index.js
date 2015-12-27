/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var mui = require('../lib/mui.js');
var wxbridge = require('../util/wxbridge');
var cookie = require('../util/cookie');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');

/* jshint ignore:end */
$(document).ready(function() {
    var movienewsPageindex = 1;
    var hotmovie = $('.hotmovie');
    var lock = false;
    //加载 头条电影列表
    function getMovieNews(){
        var _url = '/hotmovienews/' + movienewsPageindex;
        $.get(_url, function(data) {
            if(data == ""){
                ScrollBottomPlus.remove();
                return;
            }
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
                    }
                })
            }
            ScrollBottomPlus.gotoBottomShowed = false;
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

    //分享
    // var shareImgs = $('.infocon').find('img');
    wxbridge.share({
        title: '电影票友 -- 娱乐文化营销自媒体开放平台',
        desc: '在电影的时光读懂自已     www.moviefan.com.cn',
        link: window.location.href,
        imgUrl: 'http://p2.pstatp.com/large/3245/1852234910'
    })

}); //END of jquery documet.ready 