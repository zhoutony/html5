/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var widgets = require('../util/widgets.js');
var dialogs = require('../util/dialogs');
var seatChooser = require('./modul/seatchooser');
var seatRender = require('./modul/seatrender');


/* jshint ignore:end */
$(document).ready(function() {
    window.dialogs = dialogs;
    var selected_seats;
    function init(){
        initSeatControl();
        localStorage.setItem('cinema', JSON.stringify(window.cinema));
        localStorage.setItem('showtime', JSON.stringify(window.showtime));
        localStorage.setItem('movie', JSON.stringify(window.movie));
    }
    
    function initSeatControl(){
        var $root = $('.wrap'),
            $room = $root.find('.room'),
            $table = $room.find('.ticket_seatcont');

        $room.css({
            height: document.documentElement.clientHeight - 210,
            width: '100%',
            overflow: 'hidden'
        });
        setTimeout(function () {
            seatRender.init({root: $root});
        }, 300)
        setTimeout(function (){
            $room.css({
                visibility: 'visible'
            });
        }, 500)
        var chooserConfig = {
            root: $root,
            render: seatRender,
            //座位图容器
            seatContainer: $(".ticket_seatcont"),
            //最多选座个数
            limitCount: 4,
            //坐位3种状态
            selectSeatClassName: 'seat_selected',
            unSelectSeatClassName: 'seat_ture',
            selectedClassName: 'seat_false',
            selectedNullClassName: 'seat_null',
            //已选显示区容器及插入模板
            selectedContainer: '.seatinfo',
            selectedTemplaste: '<span></span>',
            //“选好了”提交按扭及两种状态
            submitBtn: $('.submit'),
            submitBtnClassName: 'submit',
            disableSubmitBtnClassName: 'notbtn',
            //选中时是否缩放
            isZoom: true,
            //选错提示语
            pointOutTxts: ['右侧座位不能为空', '左侧座位不能为空', '不能间隔选座（×）', '请不要留下单独座位（√）',
                '为避免留空，已为您关联取消了右侧座位（√）',
                '为避免留空，已为您关联取消了左侧座位（√）'],
            //回调返回已选拼装字符串 01:2:10|01:2:11
            callback: function (s_seats) {
                selected_seats = s_seats;
            }.bind(this)
        };
        seatChooser.initSeatChooser(chooserConfig);
        //处理座位点击
        var oldDate = new Date(), newDate;
        $table.on('tap', 'span', function (evt) {
            if ($(evt.currentTarget).hasClass('seat_selected') || $(evt.currentTarget).hasClass('seat_ture')) {
                
                newDate = new Date();
                if((newDate.getTime() - oldDate.getTime()) > 100){
                    oldDate = newDate;
                    console.log(1)
                    seatChooser.onTapSeat(evt);
                }
            }
        });//处理座位点击===============================================

        //选好座位提交
        $('.submit').on('click', function(evt){
            var _el = $(evt.currentTarget);
            var _len = selected_seats && selected_seats.length;
            var localTel = localStorage.getItem('tel') || '';
            dialogs.confirm('<p class="telinput flexbox"><input id="tel" type="tel" placeholder="请输入手机号" class="flex" value="'+localTel+'"></p>',
                function(){
                    var inputTel = $('#tel'),
                        tel = inputTel.val();
                    if(/^1[23456789]\d{9}$/.test(tel)){
                        localStorage.setItem('tel', tel);
                        if(_len){
                            lockSeats(selected_seats, _len, tel);
                        }
                    }else{
                        dialogs.tip('手机号不正确，请再试');
                    }
                }
            )
            
            
        })

        //锁座
        function lockSeats(selected_seats, _len, tel){
            var option    = {},
                seatIDs   = [],
                seatNames = [],
                showtimeId = showtime.showtimeID || '';
            
            for(var i = 0; i < _len; i++){
                var _item = selected_seats[i].split('#');
                seatIDs.push(_item[0]);
                seatNames.push(_item[1]);
            }; 
            
            option.seatIDs    = seatIDs.join(',');
            option.seatNames  = seatNames.join(',');
            option.showtimeID = showtimeId;
            option.mobile     = tel;
            option.wxtype     = publicsignal;
            $.post('/lockseats/' + showtimeId, option, function(reture_data){
                if(reture_data && reture_data.data && reture_data.success){
                    localStorage.setItem('seats_' + showtimeId, JSON.stringify( selected_seats ));
                    localStorage.setItem('lockseats_' + showtimeId, JSON.stringify( reture_data.data ));
                    var orderId = reture_data.data.orderID || '0';
                    location.href = '/payment/order/';
                }
            })
        }
    }

    init();
}); //END of jquery documet.ready 