/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var widgets = require('../util/widgets.js');
var dialogs = require('../util/dialogs');
var seatChooser = require('./modul/seatchooser');
var seatRender = require('./modul/seatrender');

/* jshint ignore:end */
$(document).ready(function() {
    function init(){
        initSeatControl();
    }

    function initSeatControl(){
        var $root = $('.wrap'),
            $room = $root.find('.room'),
            $table = $room.find('.ticket_seatcont');

        $room.css({
            height: document.documentElement.clientHeight - 220,
            visibility: 'visible',
            width: '100%',
            overflow: 'hidden'
        });
        setTimeout(function () {
            seatRender.init({root: $root});
        }, 300)
        // var chooserConfig = {
        //     root: $root,
        //     render: seatRender,
        //     //座位图容器
        //     seatContainer: $(".table"),
        //     //最多选座个数
        //     limitCount: 4,
        //     //坐位3种状态
        //     selectSeatClassName: 'selected',
        //     unSelectSeatClassName: 'optional',
        //     selectedClassName: 'sold',
        //     //已选显示区容器及插入模板
        //     selectedContainer: null,
        //     selectedTemplaste: null,
        //     //“选好了”提交按扭及两种状态
        //     submitBtn: $('#btnSelect'),
        //     submitBtnClassName: 'btn-theme',
        //     disableSubmitBtnClassName: 'btn-disabled',
        //     //选中时是否缩放
        //     isZoom: true,
        //     //选错提示语
        //     pointOutTxts: ['右侧座位不能为空', '左侧座位不能为空', '不能间隔选座（×）', '请不要留下单独座位（√）',
        //         '为避免留空，已为您关联取消了右侧座位（√）',
        //         '为避免留空，已为您关联取消了左侧座位（√）'],
        //     //回调返回已选拼装字符串 01:2:10|01:2:11
        //     callback: function (s_seats) {
        //         this.selected_seats = s_seats;
        //     }.bind(this)
        // };
        // seatChooser.initSeatChooser(chooserConfig);
        //处理座位点击
        $table.on('tap', 'li', function (e) {
            // if ($(e.currentTarget).hasClass('selected') || $(e.currentTarget).hasClass('optional')) {
            //     //view.onTapSeat(e);
            //     seatChooser.onTapSeat(e);
            // }
        });//处理座位点击===============================================
    }

    //init()
    init();
}); //END of jquery documet.ready 