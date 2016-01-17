/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var IScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var wxbridge = require('../util/wxbridge');
var widgets = require('../util/widgets.js');

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
        filmlist           = $('.filmlist');

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
        })
        
    });

    //设置滑动条
    setTimeout(function(){
        initIScroll();
    }, 500);
    function initIScroll(){
        dateContainer.css({
            width: dateContainerLi.width() * dateContainerLiLen,
            overflow: 'hidden'
        })
        var tabstime = $('.tabstime');
        if(!DateIScroll && tabstime.length > 0){
            DateIScroll = new IScroll('.tabstime', {
                scrollX: true,
                scrollY: false,
                mouseWheel: true,
                bindToWrapper: true,
                preventDefault: widgets.iScrollClick(),
                tap: widgets.iScrollClick(),
                click: widgets.iScrollClick()
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
                preventDefault: widgets.iScrollClick(),
                tap: widgets.iScrollClick(),
                click: widgets.iScrollClick()
            });
            if (movieId) {
                var _movie = $('#movie-' + movieId);
                _movie.addClass('curr');
                filmtxt.find('p').html(_movie.data('intro'));
                MoviesIScroll.scrollToElement(_movie[0], 500, -5);
            } else {
                $(_movies[0]).addClass('curr');
            }
        }
    }
    //分享
    wxbridge.share({
        title: '想去'+ cinema.cinemaName +'看《老炮儿》，有空吗？-电影票友',
        timelineTitle: '想去万达电影院CBD店看《老炮儿》，有空吗？-电影票友',
        desc: '在电影的时光读懂自已     www.moviefan.com.cn',
        link: window.location.href,
        imgUrl: 'http://p2.pstatp.com/large/3245/1852234910',
        callback: function(){
            Util.shearCallback(publicsignal, openId, showtype, 6, function(){
                console.log('分享成功，并发送服务器');
            })
            // location.href = 'http://weixin.qq.com/r/fEPm40XEi433KAGAbxb4';
        }
    })

}); //END of jquery documet.ready 