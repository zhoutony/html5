/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var Util = require('../util/widgets.js');
var wxbridge = require('../util/wxbridge');
var Dialogs = require('../util/dialogs');

/* jshint ignore:end */
$(document).ready(function() {
    var openId = cookie.getItem('openids'),
        shareTip;
    if(window.newscontent){
    	var _html = JSON.stringify(window.newscontent),
            newsContent = $('#newsContent'),
            newsContenttxt = $('._txt'),
            moreBtn = $('.more');
        newsContenttxt.html(window.newscontent);

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

    // more
    if(newsContenttxt.height() > 1440){
        newsContent.removeClass('hidden');
        moreBtn.removeClass('m-hide');
        moreBtn.on('click',function(){
            newsContent.addClass('autobox');
            
        })
    }else{
        newsContent.removeClass('hidden').addClass('autobox');
    }
        

    //广告5
    $.get('/'+ publicsignal +'/get/queryadvertisements/5', function(adsHtml){
        var _addimg = $('.codeinfo').html(adsHtml);
         var _addimg = $('.infoaddimg').html(adsHtml);
        //顶部轮播
        // var indicator = $('.mui-slider');
        // $(indicator[0]).addClass('mui-active');
        // var gallery = mui('.mui-slider');
        // gallery.slider({
        //     interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
        // });
    })

    //广告6
    $.get('/'+ publicsignal +'/get/queryadvertisements/6', function(adsHtml){
        var _addimg = $('.infoaddimg').html(adsHtml);
        //顶部轮播
        var indicator = $('.mui-slider');
        $(indicator[0]).addClass('mui-active');
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    })

    // more
    $('.infocon .more').on('click',function(){
        $('.infocon').addClass('autobox');
        
    })

    if(window.title){
    	$('.infotit').html('<div>'+window.title+'</div>');
    }
    if(!Util.is_weixn()){
    	$('.sharetoolbox').removeClass('m-hide');
    }

    //分享
    var _shareInfo = shareInfo && shareInfo;

    if(!_shareInfo){
        _shareInfo = {};
    }
    //暂时只取js的分享内容
    // _shareInfo = {};
    var shareImgs = $('.infocon').find('img');
    wxbridge.share({
        title: _shareInfo.title ? _shareInfo.title : Util.strShort($('.infotit').html(), 25)  + ' -' + weMediaName,
        timelineTitle: _shareInfo.timelineTitle ? _shareInfo.timelineTitle : '[电影票友]荐：' + Util.strShort($('.infotit').html(), 20) + ' -' + weMediaName,
        desc: _shareInfo.desc ? _shareInfo.desc : '[电影票友]荐：' + (window._summary != '' ? window._summary : '在电影的时光读懂自已     www.moviefan.com.cn'),
        link: window.location.href,
        imgUrl: _shareInfo.imgUrl ? _shareInfo.imgUrl : shareImgs.length > 0 ? shareImgs[0].src : $('.logobox').find('img')[0].src,
        callback: function(shareobj){
            shareTip();
            Util.shearCallback(publicsignal, openId, newsId, 2, shareobj, function(){
                console.log('分享成功，并发送服务器');
            })
            // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })
    //订阅el
    var subscribe = $('#subscribe');
    if(Util.is_weixn()){
        subscribe.find('.flexbox_v_c').removeClass('m-hide');
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
                             
                        }else{
                            iconEl.removeClass('m-hide').css({
                                display: 'block'
                            });
                            emEl.html('订阅');
                        }
                    }else{
                        console.log('请求服务器失败')
                    }
                }
            })
        })
    }
        
}); //END of jquery documet.ready 
