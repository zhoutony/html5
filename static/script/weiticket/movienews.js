/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var Util = require('../util/widgets.js');
var wxbridge = require('../util/wxbridge');

/* jshint ignore:end */
$(document).ready(function() {
    if(window.newscontent){
    	var _html = JSON.stringify(window.newscontent)
        $('._txt').html(window.newscontent);

        var _url = $('._txt').find('link').attr('src');

        if(_url && _url.indexOf('http') == 0){
            var oHead = document.getElementsByTagName('HEAD').item(0); 
            var oScript = document.createElement("script"); 
            oScript.type = "text/javascript"; 
            oScript.src = _url;
            oHead.appendChild(oScript);
        }
    }

    if(window.title){
    	$('.infotit').html('<div>'+window.title+'</div>');
    }
    if(!Util.is_weixn()){
    	$('.sharetoolbox').removeClass('m-hide');
    }
    //分享
    var shareImgs = $('.infocon').find('img');
    wxbridge.share({
        title: Util.strShort($('.infotit').html(), 25)  + ' -票友自媒体',
        desc: '荐《' + $('.imgbox').find('h2').html() + '》:' + (window._summary != '' ? window._summary : '在电影的时光读懂自已     www.moviefan.com.cn'),
        link: window.location.href,
        imgUrl: shareImgs.length > 0 ? shareImgs[0].src : $('.logobox').find('img')[0].src
    })
}); //END of jquery documet.ready 
