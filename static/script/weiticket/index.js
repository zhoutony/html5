/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');

var dialogs = require('../util/dialogs.js');

/* jshint ignore:end */
$(document).ready(function() {
    window.dialogs = dialogs;
    //加载 头条电影列表
    $.get('/movienews/0', function(data) {
        $('.hotmovie').html(data)
        //console.log(data);
    });

    //顶部轮播
    // var indicator = $('.mui-indicator');
    // $(indicator[0]).addClass('mui-active');
    // var gallery = mui('.mui-slider');
    // gallery.slider({
    //     interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
    // });
    var _txtbox = $('.txtbox');
    document.querySelector('.scrollpic').addEventListener('slide', function(event) {
        console.log(event.detail.slideNumber);
        var _i = event.detail.slideNumber;
        _txtbox.addClass('m-hide');
        $(_txtbox[_i]).removeClass('m-hide').addClass('m-show');
    });

}); //END of jquery documet.ready 