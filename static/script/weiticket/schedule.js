define([
        '../lib/zepto.js',
        '../lib/underscore',
        '../lib/deferred',
        '../util/base',
        '../util/modal',
        '../util/session_cache',
        '../lib/iscroll',
        '../util/cookie'
    ],
    function(
        $,
        _,
        Deferred,
        BASE,
        Modal,
        cache,
        IScroll,
        cookie
    ) {
        $(document).ready(function() {
            //会员卡开关
            var hasMember = "0";
            //公众号开关
            var hasPublicsignalshortMember = cookie.getItem("has_publicsignalshort_member");
            //影院开关
            var hasCinemaMember = cookie.getItem("has_cinema_member");
            if(hasPublicsignalshortMember === "1" && hasCinemaMember === "1"){
                hasMember = "1";
            }
            //会员卡开关
            function showMember(){
                //新远国际影城 隐藏会员信息
                if(hasMember === "1" && publicsignalshort != "xygjyc"){
                    $('del.m-hide').removeClass("m-hide");
                    $('small.tag.hot').removeClass("m-hide");
                }
            }
            showMember();
            var needLogin = true;
            var pageDeferred = new _.Deferred();
            var $movieInfoModal = $('.m-modal-full');
            var myScroll = null;

            //fake login
            var Login = {
                ensure: function() {
                    var dfd = new _.Deferred();

                    dfd.resolve();

                    return dfd.promise();
                }
            };
            
            document.title = sessionStorage.getItem("publicSignalName");
            $(".cinema-title").html(sessionStorage.getItem("cinemaName"));
            var cinemaTele = sessionStorage.getItem("cinemaTele");
            if(cinemaTele){
                $(".cinema-telephone").html(cinemaTele);
                $("#cinema-telephone").attr("href","tel:" + cinemaTele);
            }else{
                $("#cinema-telephone").hide();
            }

            cache.movie(movie_id, publicsignalshort).then(function(movie){
                $(".movie-longs").html(movie.longs + ' ');
                $(".movie-tags").html(movie.tags);
            });

            //默认展示第一天的排期信息
            $($("li.tab")[0]).addClass("current");
            $($("dd.sche-info-list")[0]).removeClass("m-hide");

            //切换效果
            $("span.sche-date").on('tap', function(e){
                $("li.tab").removeClass("current");
                var $li = $(e.target).parent();
                $li.addClass("current");


                $("dd.sche-info-list").addClass("m-hide");
                $(".day-" + $li.data('day')).removeClass("m-hide");
            });

            var pagePromise = needLogin ? Login.ensure() : pageDeferred.resolve();

            pagePromise.then(function() {

                //首页需要用到的js片段======================================================================

                //TODO：近期场次需要一进页面之后load
                //页面加载的时候缓冲1秒钟请求影院信息接口
                $.get('/' + publicsignalshort + '/movie_info_html/' + movie_id, function(data) {
                    //$(".m-modal-full").html(data);
                    
                    var _$wrapper = $movieInfoModal.find('.wrapper');
                    var _$wrapperInner = _$wrapper.find('.inner');

                    _$wrapperInner.html(data);

                    _.defer(function() {
                        setTimeout(function() {
                            _$wrapper.css({
                                position: 'relative',
                                height: $(window).height() - 60,
                                overflow: 'hidden'
                            });
                            if (!myScroll) {
                                myScroll = new IScroll(
                                    _$wrapper[0], {
                                        useTransition: false, //transition导致IOS下闪
                                        scrollbars: false,
                                        preventDefault: true,
                                        bounceTime: 300,
                                        bindToWrapper: true
                                    }
                                );
                            }
                        }, 20);
                    });
                    
                });

                //页面加载的时候缓冲1秒钟请求影院信息接口
                
                //页面加载的时候缓冲1秒钟请求影院信息接口
                //这个接口的数据理论上是可以缓存的，当然游览器默认也帮我们缓存了
                var holderIScroll = null;
                $.get('/' + publicsignalshort + "/movie_list_html/" + cinema_id, function(data) {
                    var $holder = $("ul.movie-list");
                    var $wrapper = $('.movie-list-wrapper');
                    $holder.html(data);
                    // $wrapper.addClass('wrapper');
                    // $wrapper.css({
                    //     width: ($wrapper.find('li').width() + 8) * $wrapper.find('li').length
                    // });

                    $wrapper.css({
                        position: 'relative',
                        overflow: 'hidden',
                        width: $(window).width()
                    });
                    //parseInt($wrapper.find('li').css("margin-right").replace('px', '')) * 2
                    $wrapper.find('.inner').css({
                        width: ($wrapper.find('li').width() + 34 ) * $wrapper.find('li').length
                    });

                    holderIScroll = new IScroll($wrapper[0], {
                        useTransition: false, //transition导致IOS下闪
                        scrollX: true,
                        scrollY: false,
                        preventDefault: true,
                        scrollbars: false,
                        momentum: false,
                        bounceTime: 300,
                        bindToWrapper: true
                    });

                    if (movie_id) {
                        $('#movie-' + movie_id).addClass('current');
                        holderIScroll.scrollToElement($('#movie-' + movie_id)[0], 500, -5);
                    } else {
                        $($wrapper.find('li')[0]).addClass('current');
                    }

                });
                //处理每张poster被点击后的事件
                //1.第一步：监听事件，第二步加载影片的排期，第三步，加载影片的详情，并替换掉弹出层
                //对于排期，建议不使用缓存来搞，因为比较容易失效，也没有必要
                //对于影片详情页面，建议前端使用sessionStorage甚至是更激进的方式缓存都可以
                $("body").delegate(".movie-list li", "tap", function() {

                    cache.movie(movie_id, publicsignalshort).then(function(movie){
                        $(".movie-longs").html(movie.longs + ' ');
                        $(".movie-tags").html(movie.tags);
                    });

                    if ($(this).hasClass('current')) {
                        return;
                    }
                    var link = $(this).attr("data-movieid");
                    var $movieListHolder = $("ul.movie-list");
                    var $movieLi = $movieListHolder.find('li');
                    // console.log(holderIScroll);
                    for (var i = 0; i < $movieLi.length; i++) {
                        $($movieLi[i]).removeClass('current');
                    }
                    $('#movie-' + link).addClass('current');
                    holderIScroll.scrollToElement($('#movie-' + link)[0], 500, -5);
                    $.get('/'+ publicsignalshort + '/movie_info_html/' + link, function(data) {
                        var _$wrapper = $movieInfoModal.find('.wrapper');
                        var _$wrapperInner = _$wrapper.find('.inner');
                        _$wrapperInner.html(data);
                        //$(".m-modal-full").html(data);
                    }); //END of get.....


                    //拼装某一部影片的html的接口
                    //TODO:使用history的api来改变url
                    //var sid = publicsignalshort + '/' + cinema_id + '/' + link;
                    var sid = '/' + publicsignalshort;
                    var postfix = cinema_id + '/' + link;
                    movie_id = link;
                    $.get(sid + '/one_movie_schedule/' + postfix, function(data) {
                        $(".ssss").html(data);
                        cache.movie(movie_id, publicsignalshort).then(function(movie){
                            $(".movie-longs").html(movie.longs + ' ');
                            $(".movie-tags").html(movie.tags);
                        });
                        history.pushState('', '', location.origin + sid + '/schedule/' + postfix);
                        var dateTab  = $($('.sche-date-list .schedule')[0]);
                        if(dateTab.data('day') != 'undefined'){
                            dateTab.addClass('current');
                        }
                        $('.day-'+dateTab.data('day')).removeClass('m-hide');
                        //切换效果
                        $(".sche-date").on('tap', function(e){
                            $("li.tab").removeClass("current");
                            var $li = $(e.target).parent();
                            $li.addClass("current");

                            $("dd.sche-info-list").addClass("m-hide");
                            $(".day-" + $li.data('day')).removeClass("m-hide");
                        });
                        //会员卡开关
                        showMember();
                    }); //END of get..... 

                }); //处理每张poster被点击后的事件END

                //处理每个排期的点击事件
                $("body").delegate("dd a.onsale div", "tap", function() {
                    var link_string = $(this).attr("data-link");
                    var movieno = $(this).attr("data-movieid");
                    var cinemaPrice = $(this).data("cinemaprice")
                    window.sessionStorage.setItem( 'cinemaPrice', cinemaPrice );
                   // var options = JSON.parse(link_string);
                    //{ schedulePricingId: "55066634e9e437eb678b5641",
                    //  ticket: "54c0c830b5f6816cd8b391c0",
                    //  HallNo: "7",
                    //  movieno:"5205"
                    //}
                    window.location.href = '/' + publicsignalshort + '/room/' + link_string + '/' + movieno;

                   
                });

                //clickbtn 开关
                var isClickBtn = true;

                //点击影片信息显示弹出层
                $(".ssss").delegate(".show-movie-detail", "tap", function() {
                    isClickBtn = false;
                    //阻止事件冒泡
                    $("._stop_").on("click", function (e) {
                        if (!isClickBtn) e.preventDefault();
                    });
                    //var link = $(this).attr("data-link");
                    $movieInfoModal.removeClass("m-hide");
                    if (myScroll) {
                        myScroll.refresh();
                        myScroll.scrollTo(0, 0, 500, false);
                    }
                });

                //点击关闭，隐藏弹出层
                $("body").delegate(".close", "tap", function() {
                    $(".m-modal-full").addClass("m-hide");
                    setTimeout(function () {
                        isClickBtn = true;
                    }, 1000);
                });
            }); //END of pagePromise

            //=======================================================================================
        }); //END of jquery documet.ready
    });

/* jshint ignore:start */