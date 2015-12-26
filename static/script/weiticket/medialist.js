/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var mui = require('../lib/mui.js');
var Util = require('../util/widgets')
var wxbridge = require('../util/wxbridge');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');

/* jshint ignore:end */
$(document).ready(function() {
	var movienewsPageindex = 1;
    var hotmovie = $('.hotmovie');
    var lock = false;
    if(Util.is_weixn()){
        $('#subscribe').removeClass('m-hide');
    }
    //加载 头条电影列表
    function getMovieNews(){
        var _url = '/medialist/'+ sourceId +'/' + movienewsPageindex;
        $.get(_url, function(data) {
            if(data == ""){
                ScrollBottomPlus.remove();
                return;
            }
            var _el = $('<div></div>').html(data).appendTo(hotmovie);
            // if(movienewsPageindex == 1){
            //     appendThirdAds(_el, thirdIndex ? thirdIndex -1 : 1);
            // }
            // if(!lock){
            //     lock = true;
            //     ScrollBottomPlus.render({
            //         el: '.hotmovie',
            //         app_el: '.wrap',
            //         footer: '.navtool',
            //         callback: function(){
            //             movienewsPageindex++;
            //             getMovieNews();
            //         }
            //     })
            // }
            ScrollBottomPlus.gotoBottomShowed = false;
        });

    }
    ScrollBottomPlus.render({
        el: '.hotmovie',
        app_el: '.wrap',
        footer: '.navtool',
        callback: function(){
            movienewsPageindex++;
            getMovieNews();
        }
    })

    wxbridge.share({
        title: $('._sourceName').html() + ' -票友自媒体',
        desc: $('.medtxt').html(),
        link: window.location.href,
        imgUrl: $('._logo').attr('src')
    })

});