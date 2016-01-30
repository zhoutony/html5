/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var mui = require('../lib/mui.js');
var Util = require('../util/widgets')
var wxbridge = require('../util/wxbridge');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');
var cookie = require('../util/cookie');
var Dialogs = require('../util/dialogs');

/* jshint ignore:end */
$(document).ready(function() {
	var movienewsPageindex = 1;
    var hotmovie = $('.hotmovie');
    var lock = false;
    var openId = cookie.getItem('openids');
    //订阅el
    var subscribe = $('#subscribe');
    if(Util.is_weixn()){
        subscribe.removeClass('m-hide');
    }
    var subscribeEm = subscribe.find('em').html();

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

    //分享提示操作  shareTip
    if(Util.is_weixn()){
        $('.info03').on('click', function(evt){
            evt.preventDefault()
            shareTip = Dialogs.shareTip();
        })
    }
    
    var _shareInfo = shareInfo && shareInfo ;
    if(!_shareInfo){
        _shareInfo = {};
    }
    wxbridge.share({
        title: _shareInfo.title ? _shareInfo.title : $('._sourceName').html() + ' -[电影票友]荐',
        timelineTitle: _shareInfo.timelineTitle ? _shareInfo.timelineTitle : $('._sourceName').html() + ' -[电影票友]荐',
        desc: _shareInfo.desc ? _shareInfo.desc : $('.medtxt').html(),
        link: window.location.href,
        imgUrl: _shareInfo.imgUrl ? _shareInfo.imgUrl : $('._logo').attr('src'),
        callback: function(){
            // alert();
            Util.shearCallback(publicsignal, openId, sourceId, 3, function(){
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
            sourceID: sourceId,
            wxtype: publicsignal
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
                        if(subscribeEm != '已订阅'){
                            subscribeCount += 1;
                        }
                        
                        subscribeEl.html(subscribeCount)
                    }else{
                        iconEl.removeClass('m-hide').css({
                            display: 'block'
                        });
                        emEl.html('订阅');
                        if(subscribeEm == '已订阅'){
                            subscribeCount -= 1;
                        }
                        // subscribeCount -= 1;
                        subscribeEl.html(subscribeCount)
                    }
                }else{
                    console.log('请求服务器失败')
                }
            }
        })
    })

});