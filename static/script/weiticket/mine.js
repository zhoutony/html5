var $ = require('../lib/zepto.js');
var Util = require('../util/widgets.js');
var Dialogs = require('../util/dialogs');
var ScrollBottomPlus = require('../util/scrollBottomPlus.js');

var Mine = {
    init: function () {
        this.initField();
        this.initEvent();
    },
    initField: function () {
        var $wrap = $('.wrap');

        // 用户足迹相关
        this.$newsList = $wrap.find('.mylistbox');
        this.$empty = $wrap.find('.empty');
        this.newsLength = this.$newsList.find('li[data-id]').length;
        this.newsPageIndex = 1;
        
        this.$wrap = $wrap;
    },
    initEvent: function () {
        var mine = this;
        
        this.$newsList.on('click', '.myclose', this.deleteNews.bind(this));

        // 初始化滚动加载组件
        if (this.newsLength > 0) {
            ScrollBottomPlus.render({
                el: this.$newsList,
                footer: ' ',
                app_el: this.$newsList,
                callback: function(){
                    mine.fetchNews(mine.newsPageIndex + 1);
                }
            });
        }
    },
    fetchNews: function (pageIndex) {
        var mine = this;
        
        if (this.fetchNewsLock) {
            return;
        }

        this.fetchNewsLock = true;
        
        $.get('/my/usernews/' + pageIndex, function (res) {
            mine.fetchNewsLock = false;
            
            if (res) {
                mine.$newsList.append(res);
                mine.newsPageIndex = pageIndex;
            }
        });
    },
    deleteNews: function (event) {
        var $close = $(event.currentTarget);
        var $news = $close.parents('li[data-id]');
        var newsId = $news.data('id');

        $.get('/my/usernews/delete/' + newsId, function (res) {
            console.log(JSON.stringify(arguments));
            
            if (!res.err) {
                $news.remove();
            }
        });
    }
};

$(document).ready(function() {
	var movienewsPageindex = 1;
    var mylistbox = $('.mylistbox');
	var mymenuEl = $('.mymenu'),
		itemMask, itemMaskEl;

	mymenuEl.on('click', 'li', function(evt){
		var el = $(this),
			item = el.data('item');
		itemMethod(item);
	})

	//加载足迹
	// function getmylistbox(){
 //        var _url = '/my/usernews/'+ sourceId +'/' + movienewsPageindex;
 //        $.get(_url, function(data) {
 //            if(data == ""){
 //            	alert('a');
 //                ScrollBottomPlus.remove();
 //                return;
 //            }
 //            // var _el = $('<div></div>').html(data).appendTo(hotmovie);
 //            mylistbox.html(mylistbox.html() + data)
 //            ScrollBottomPlus.gotoBottomShowed = false;
 //            alert('b');
 //        });

 //    }
    
 //    ScrollBottomPlus.render({
 //        el: '.mylistbox',
 //        app_el: ' ',
 //        footer: ' ',
 //        callback: function(){
 //            movienewsPageindex++;
 //            getmylistbox();
 //        }
 //    })

	function itemMethod(item){
		switch(item){
			case 'myorders':
				itemMask = 'mask_myorder';
				break;
			case 'mypiao':
				itemMask = 'mask_mypiao';
				break;
			case 'myredbag':
				itemMask = 'mask_myredbag';
				break;

		}
		if(item && item != ''){
			var loading = Dialogs.Loading();
			var url = '/my/' + item
			$.get(url, function(return_html){
				setTimeout(function(){
					loading(true);
				}, 100)
				
				Dialogs.pop(return_html);
				maskMethod();
			})
		}

	}

	function maskMethod(){
		var maskotherEl = $('.maskother'),
			topEl, el, orderboxEl;

		if(maskotherEl.length > 0){
			maskotherEl.on('click', function(evt){
				el = evt.target;
				if(el.tagName == 'A'){
					orderboxEl = maskotherEl.find('.orderbox');
					if($(el).hasClass('btn_back')){
						orderboxEl.show();
						itemMaskEl.remove();
						return;
					}
					
					getMaskHtml(maskotherEl, orderboxEl)
				}
			})
		}
	}

	function getMaskHtml(el, orderboxEl){
		if(el && el.length > 0){
			var url = '/my/' + itemMask;
			$.get(url, function(return_html){
				orderboxEl.hide();
				itemMaskEl = $(return_html).appendTo(el);
			})
		}

	}
	//-发现弹出 即将开启
	var _findbox = $('#findbox ');
    _findbox.on('click',function(){
        _findbox.addClass('showtips')  ;
        setTimeout(function(){
            _findbox.removeClass('showtips')  ;
        }, 1000);    
    })

    //- 我的页面切换
    $('.navmy li').on('click',function(){
    	$(this).addClass('curr').siblings().removeClass('curr'); 
     	$('.subtablist').eq($('.navmy li').index(this)).show().siblings('.subtablist').hide();
    })
    //
    ////-删除我的足迹
    //var myli = $('.mylistbox li');
    //var mylen = myli.length;
    //$('.myclose').on('click',function(){
    //	$(this).parent().parent().remove();
    //	if(mylen == 1){
    //		$('.empty').show();
    //	} 
    //	mylen--;
    //})
    
    Mine.init();
});
