/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var mui = require('../lib/mui.js');
var Util = require('../util/widgets')
var wxbridge = require('../util/wxbridge');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');
var cookie = require('../util/cookie');

/* jshint ignore:end */
$(document).ready(function() {
	var movienewsPageindex = 1;
    var hotmovie = $('.hotmovie');
    var lock = false;
    var openId = cookie.getItem('open_id');
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
        imgUrl: $('._logo').attr('src'),
        callback: function(){
            // if (typeof WeixinJSBridge == 'undefined') return false;   
            // WeixinJSBridge.invoke('addContact', { 
            //     webtype: '1',   
            //     username: 'yesunion'   
            // }, function(d) {   
            //     // 返回d.err_msg取值，d还有一个属性是err_desc
            //     // add_contact:cancel 用户取消   
            //     // add_contact:fail　关注失败   
            //     // add_contact:ok 关注成功   
            //     // add_contact:added 已经关注   
            //     // WeixinJSBridge.log(d.err_msg);
            //     // cb && cb(d.err_msg);
            //     alert(d.err_msg)
            // });   
            
            location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })

});