/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var IScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var wxbridge = require('../util/wxbridge');
var Util = require('../util/widgets.js');

/* jshint ignore:end */
$(document).ready(function() {
    var dateContainer      = $('#date_container'),
        dateContainerLi    = dateContainer.find('li'),
        dateContainerLiLen = dateContainerLi.length,
        DateIScroll,
        MoviesIScroll,
        filmscroll         = $('.filmscroll'),
        filmtxt            = $('.filmtxt'),
        moviescrollLi      = $('.moviescroll').find('li'),
        filmlist           = $('.filmlist'),
        firendbtn          = $('#firendbtn'),
        redbagbtn          = $('#redbagbtn'),
        movie              = {};
    var openId = cookie.getItem('openids');

    //切换日期
    filmlist.on('click', '.flexbox li', function(e) {
        var _el       = $(e.currentTarget),
            _index    = _el.data('index'),
            _timeboxs = $('.timebox');
        dateContainerLi.removeClass('curr');
        _el.addClass('curr');
        _timeboxs.addClass('m-hide');
        $(_timeboxs[_index]).removeClass('m-hide');
    });

    //切换影片
    filmscroll.on('click', 'li', function(e) {
        var _el       = $(e.currentTarget),
            movieId    = _el.data('movieid'),
            url = '/' + publicsignal + '/one_movie_schedule/1/' + cinema.cinemaID + '/' + movieId;
        moviescrollLi.removeClass('curr');
        _el.addClass('curr');
        filmtxt.find('p').html(_el.data('intro'));
        //好友买单 邀红包  设置
        if(_el.data('isfriendspay') == 'true'){
            firendbtn.removeClass('m-hide');
        }else{
            firendbtn.addClass('m-hide');
        }
        if(_el.data('ismoneymacket') == 'true'){
            redbagbtn.removeClass('m-hide');
        }else{
            redbagbtn.addClass('m-hide');
        }
        movie = {
            movieName: _el.data('moviename'),
            intro: _el.data('intro'),
            movieImage: _el.data('movieimage')
        }
        setShare();
        if(MoviesIScroll){
            MoviesIScroll.scrollToElement(_el[0], 500, -5);
        }
        $.get(url, function(result){
            history.pushState('', '', location.origin +'/'+ publicsignal + '/schedule/' + cinema.cinemaID + '/' + movieId);
            // console.log(result);
            filmlist.html(result);
            dateContainer      = $('#date_container');
            dateContainerLi    = dateContainer.find('li');
            dateContainerLiLen = dateContainerLi.length;
            initIScroll();
        })
        
    });

    //设置滑动条
    setTimeout(function(){
        initIScroll();

        setShare();
    }, 500);
    function initIScroll(){
        dateContainer.css({
            width: dateContainerLi.width() * dateContainerLiLen,
            overflow: 'hidden'
        })
        var tabstime = $('.tabstime');
        if(tabstime.length > 0){
            DateIScroll = new IScroll('.tabstime', {
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                bindToWrapper: true,
                preventDefault: Util.iScrollClick(),
                tap: Util.iScrollClick(),
                click: Util.iScrollClick()
            });
        }
        var _movies = $('.filmscroll').find('li'),
            _movieLen = _movies.length,
            _movieWidth = ($('.filmscroll').find('li').width() + 14) * _movieLen;
        $('.moviescroll').css({
            width: _movieWidth
        })
        if(!MoviesIScroll && _movieLen > 0){
            MoviesIScroll = new IScroll('.filmscroll', {
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                bindToWrapper: true,
                preventDefault: Util.iScrollClick(),
                tap: Util.iScrollClick(),
                click: Util.iScrollClick()
            });
            if (movieId) {
                var _movie = $('#movie-' + movieId);
                _movie.addClass('curr');
                filmtxt.find('p').html(_movie.data('intro'));

                //好友买单 邀红包  设置
                if(_movie.data('isfriendspay') == 'true'){
                    firendbtn.removeClass('m-hide');
                }else{
                    firendbtn.addClass('m-hide');
                }
                if(_movie.data('ismoneymacket') == 'true'){
                    redbagbtn.removeClass('m-hide');
                }else{
                    redbagbtn.addClass('m-hide');
                }

                MoviesIScroll.scrollToElement(_movie[0], 500, -5);
                movie = {
                    movieName: _movie.data('moviename'),
                    intro: _movie.data('intro'),
                    movieImage: _movie.data('movieimage')
                }
            } else {
                $(_movies[0]).addClass('curr');
            }
        }
    }
    
    function setShare(){
        //分享
        var _shareInfo = window.shareInfo && window.shareInfo;
        if(!_shareInfo){
            _shareInfo = {};
        }
        wxbridge.share({
            title: _shareInfo.title ? _shareInfo.title : '想去'+ cinema.cinemaName +'看《'+ movie.movieName +'》，有空吗？-电影票友',
            timelineTitle: _shareInfo.timelineTitle ? _shareInfo.timelineTitle : '想去'+ cinema.cinemaName +'看《'+ movie.movieName +'》，有空吗？-电影票友',
            desc: _shareInfo.desc ? _shareInfo.desc : '[电影票友]荐：' + movie.intro,
            link: window.location.href,
            imgUrl: _shareInfo.imgUrl ? _shareInfo.imgUrl : movie.movieImage,
            callback: function(shareobj){
                Util.shearCallback(publicsignal, openId, cinema.cinemaID, 6, shareobj, function(){
                    console.log('分享成功，并发送服务器');
                })
                // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
            }
        })
    }

}); //END of jquery documet.ready 