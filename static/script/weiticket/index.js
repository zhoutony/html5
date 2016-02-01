/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var mui = require('../lib/mui.js');
var wxbridge = require('../util/wxbridge');
var Util = require('../util/widgets.js');
var cookie = require('../util/cookie');
var dialogs = require('../util/dialogs');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');

/* jshint ignore:end */
$(document).ready(function() {
    var movienewsPageindex = 1;
    var hotmovie = $('.hotmovie');
    var lock = false;
    var openId = cookie.getItem('openids'),
        isIndexMovieNewsHtml = false;

    //加载 头条电影列表
    function getMovieNews(){
        //缓存时间1000 * 60 * 15  15分钟 900000
        var indexMovieNewsHtmlStarttime = localStorage.getItem('indexMovieNewsHtmlStarttime');

        if(indexMovieNewsHtmlStarttime && indexMovieNewsHtmlStarttime != ''){
            var _time = new Date() * 1 - parseInt(indexMovieNewsHtmlStarttime);
            if(_time > 900000){
                localStorage.removeItem('indexMovieNewsHtml')
                
            }
        }
        var indexMovieNewsHtml = localStorage.getItem('indexMovieNewsHtml');

        if(indexMovieNewsHtml && !isIndexMovieNewsHtml){
            isIndexMovieNewsHtml = true;
            hotmovie.html(indexMovieNewsHtml);
            var indexScrollTop = localStorage.getItem('indexScrollTop');
            if(indexScrollTop && indexScrollTop != ''){
                window.scrollTo(0,parseInt(indexScrollTop));
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
        }else{
            
            var _url = '/'+ publicsignal +'/hotmovienews/' + movienewsPageindex;
            $.get(_url, function(data) {
                if(data == ""){
                    ScrollBottomPlus.remove();
                    return;
                }
                hotmovie.html(hotmovie.html() + data)
                // var _el = $('<div></div>').html(data).appendTo(hotmovie);
                if(movienewsPageindex == 1){
                    appendThirdAds(hotmovie, thirdIndex ? thirdIndex -1 : 1);
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
                localStorage.setItem('indexMovieNewsHtml', hotmovie.html());
                localStorage.setItem('indexMovieNewsHtmlStarttime', new Date() * 1);
            });
        }

    }
    getMovieNews();
    //设置下拉组件
    // setTimeout(function(){
    //     if(!lock){
    //         lock = true;
    //         ScrollBottomPlus.render({
    //             el: '.hotmovie',
    //             app_el: '.wrap',
    //             footer: '.navtool',
    //             callback: function(){
    //                 movienewsPageindex++;
    //                 getMovieNews();
    //             }
    //         })
    //     }
    // }, 2000)

    
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
    var _shareInfo = shareInfo && shareInfo ;
    if(!_shareInfo){
        _shareInfo = {};
    }
    wxbridge.share({
        title: _shareInfo.title ? _shareInfo.title : '电影票友 --人人娱乐 人人收益 自媒体共享平台',
        timelineTitle: _shareInfo.timelineTitle ? _shareInfo.timelineTitle : '电影票友 --人人娱乐 人人收益 自媒体共享平台',
        desc: _shareInfo.desc ? _shareInfo.desc : '在电影的时光读懂自已     www.moviefan.com.cn',
        link: window.location.href,
        imgUrl: _shareInfo.imgUrl ? _shareInfo.imgUrl : 'http://p2.pstatp.com/large/3245/1852234910',
        callback: function(shareobj){
            Util.shearCallback(publicsignal, openId, 0, 1, shareobj, function(){
                console.log('分享成功，并发送服务器');
            })
            // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })


    var _findbox = $('#findbox ');
    _findbox.on('click',function(){
        _findbox.addClass('showtips')  ;
        setTimeout(function(){
            _findbox.removeClass('showtips')  ;
        }, 1000);    
    })

    //-跳转自媒体列表
    // $(window).on("scrollstop",function(){
    //       $('.gotolist').addClass('showgotolist')
    // });
    $(window).scroll(function () {
        if ($(window).scrollTop()<200) {
         $('.gotolist').hide(1000) ;

        } else{
         $('.gotolist').show(1000) ;
        }
        });
   
    
    //-特惠广告
     
      
      if( getCookie("mainbg")==0){ 
          clearTimeout();
         $(".addstart").removeClass('addstart').addClass('endadd') ;

          
      }else{ 
          setTimeout(function(){
            $(".addstart").addClass('closeadd');
                   
            },3000)
            setTimeout(function(){
                $(".addstart").addClass('autoclose');
                  
            },4000)  
             setCookie("mainbg","0"); 
        } 
         
    //设置cookie 
    function setCookie(name,value){ 
        var exp = new Date();  
        exp.setTime(exp.getTime() + 1*60*60*24000);//有效期1小时 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    } 
    //取cookies函数 
    function getCookie(name){ 
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); 
        if(arr != null) return unescape(arr[2]); return null; 
    } 
     
    

}); //END of jquery documet.ready 