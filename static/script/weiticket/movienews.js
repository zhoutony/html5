/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var Util = require('../util/widgets.js');
var wxbridge = require('../util/wxbridge');
var Dialogs = require('../util/dialogs');

/* jshint ignore:end */
$(document).ready(function() {
    var openId = cookie.getItem('open_id'),
        shareTip;
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

    //分享提示操作  shareTip
    if(Util.is_weixn()){
        $('.info03').on('click', function(evt){
            evt.preventDefault()
            shareTip = Dialogs.shareTip();
        })
    }

    //广告5
    $.get('/get/queryadvertisements/5', function(adsHtml){
        var _addimg = $('.codeinfo').html(adsHtml);
         var _addimg = $('.infoaddimg').html(adsHtml);
        //顶部轮播
        var indicator = $('.mui-slider');
        $(indicator[0]).addClass('mui-active');
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    })

    //广告6
    $.get('/get/queryadvertisements/6', function(adsHtml){
        var _addimg = $('.infoaddimg').html(adsHtml);
        //顶部轮播
        var indicator = $('.mui-slider');
        $(indicator[0]).addClass('mui-active');
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    })

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
        imgUrl: shareImgs.length > 0 ? shareImgs[0].src : $('.logobox').find('img')[0].src,
        callback: function(){
            shareTip();
            Util.shearCallback(openId, newsId, 2, function(){
                console.log('分享成功，并发送服务器');
            })
            // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })
    //订阅el
    var subscribe = $('#subscribe');
    if(Util.is_weixn()){
        subscribe.removeClass('m-hide');
    }
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
                         
                    }else{
                        iconEl.removeClass('m-hide').css({
                            display: 'block'
                        });
                        
                    }
                }else{
                    console.log('请求服务器失败')
                }
            }
        })
    })
}); //END of jquery documet.ready 
