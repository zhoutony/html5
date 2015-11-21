/* jshint ignore:start */
var $   = require('../lib/zepto.js');
var cache = require('../util/session_cache.js');
var cookie = require('../util/cookie.js');
/* jshint ignore:end */


$(document).ready(function(){

    //将公众号信息存入缓存
    cache.publicSignal(publicsignalshort).then(function(publicSignal) {
        if (publicSignal) {
            var advertisements = publicSignal.advertisements;
            var publicSignalName = publicSignal.publicSignalName;

            if (advertisements) {
                sessionStorage.setItem("advertisements", advertisements);
            }
            
            if (publicSignalName) { 
                sessionStorage.setItem("publicSignalName", publicSignalName);
                window.document.title = publicSignal.publicSignalName;
            }
        }
        
    });

    //将影院数存入cookie
    var cookieExpired = 60 * 60 * 24 * 30; //30天
    var cookiePath = '/' + publicsignalshort; 
    cookie.setItem("lastCinemaNumber", publicsignalshort + '-' + cinemaNumber, cookieExpired, cookiePath);

    //点击城市，颜色改变，并出现影院列表
    $("li.choose-city").on("tap", function(evt){
        var el = $(this);
        if(el.hasClass("current")){
            el.removeClass("current");
            $(".m-m-info").addClass("m-hide");
            return;
        }
        $(".choose-city").removeClass("current");
        el.addClass("current");

        $(".m-m-info").addClass("m-hide");
        var cityId = el.data("cityid");
        $(".city-" + cityId).removeClass("m-hide");

    });

    //点击影院，跳转至该影院首页
    $("body").delegate("dt","tap", function() {
        var cinema_id = $(this).attr("data-link");
        //var hasCinemaMember = $(this).data("hascinemamember");
        //sessionStorage.setItem("hasCinemaMember", hasCinemaMember);
        location.href = '/'+publicsignalshort+'/'+ 'cinema/' + cinema_id;
    });

//=======================================================================================
});//END of jquery documet.ready
