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
    //订阅el
    var subscribe = $('#subscribe');
    if(Util.is_weixn()){
        subscribe.removeClass('m-hide');
    }

    //加载 头条电影列表
    function getMovieNews(){
        var _url = '/medialist/'+ sourceId +'/' + movienewsPageindex;
        $.get(_url, function(data) {
            if(data == ""){
                ScrollBottomPlus.remove();
                return;
            }
            // var _el = $('<div></div>').html(data).appendTo(hotmovie);
            hotmovie.html(hotmovie.html() + data)
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
        title: $('._sourceName').html() + ' -[电影票友]荐',
        timelineTitle: $('._sourceName').html() + ' -[电影票友]荐',
        desc: $('.medtxt').html(),
        link: window.location.href,
        imgUrl: $('._logo').attr('src'),
        callback: function(){
            // alert();
            Util.shearCallback(openId, sourceId, 3, function(){
                console.log('分享成功，并发送服务器');
            })
            // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })

    subscribe.on('click', function(evt){
        
        var iconEl = $(this).find('b'),
            emEl = $(this).find('em'),
            url,isSubscriber,
            subscribeEl = $('._subscribe'),
            subscribeCount = subscribeEl.data('subscribecount');
        if(!iconEl.hasClass('m-hide')){
            isSubscriber = true;
            url = '/yesunion/subscriberWeMedia';
        }else{
            isSubscriber = false;
            url = '/yesunion/unsubscriberWeMedia';
        }
        var options = {
            openId: openId,
            sourceID: sourceId
        };
        // alert(url);
        $.post(url, options, function(result) {
            // alert(result);
            if (result && result.data) {
                var return_data = JSON.parse(result.data);
                if(return_data.success){
                    // alert(isSubscriber);
                    if(isSubscriber){
                        iconEl.addClass('m-hide').css({
                            display: 'none'
                        });
                        emEl.html('已订阅');
                        subscribeCount += 1;
                        subscribeEl.html(subscribeCount)
                    }else{
                        iconEl.removeClass('m-hide').css({
                            display: 'block'
                        });
                        emEl.html('订阅');
                        subscribeEl.html(subscribeCount)
                    }
                }else{
                    console.log('请求服务器失败')
                }
            }
        })
    })

});