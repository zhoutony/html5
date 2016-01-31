/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var countdown = require('./util/countdown');
var iScroll = require('../lib/iscroll');
var Dialogs = require('../util/dialogs');
var widgets = require("../util/widgets.js");
var MyPopup = require("../util/myPopup");
var cookie = require('../util/cookie');
/* jshint ignore:end */

$(document).ready(function () {
    var cinema, showtime, movie, seats, lockseats,
        paymentBtn = $('#payment'),
        inputEl = $('#inputTel'),
        mymenuEl = $('.redbox'),
        countdownEl = $('#payment-countdown'),
        isPayLock = false,
        paymentBtntxt = paymentBtn.find('a').html();
        // openId = cookie.getItem('openids');
        
    function init(){
        initSeatControl();
        load();
    }

    function initSeatControl(){
        var _cinema = localStorage.getItem('cinema');
        var _showtime = localStorage.getItem('showtime');
        var _movie = localStorage.getItem('movie');
        
        cinema =  _cinema ? JSON.parse( _cinema ) : '';
        showtime =  _showtime ? JSON.parse( _showtime ) : '';
        movie =  _movie ? JSON.parse( _movie ) : '';
        var _seats = localStorage.getItem('seats_' + showtime.showtimeID);
        seats = _seats ? JSON.parse( _seats ) : '';

        var _lockseats = localStorage.getItem('lockseats_' + showtime.showtimeID);
        lockseats = _lockseats ? JSON.parse( _lockseats ) : '';

        setHtml();
    }
    
    function load(){
        if(lockseats && lockseats != ''){
            setPaytime(countdownEl, lockseats.playEndTime)
        }
        
        // 票友卡和红包弹出
        mymenuEl.on('click', 'a', function(evt){
            var el = $(this),
                item = el.data('item');
            MyPopup.itemMethod(item);
        })

        paymentBtn.on("click", function () {
            //alert("吊起支付");
            if (!isPayLock) {
                isPayLock = true;
                do_payment();
            }
        });
    }

    // 支付
    function do_payment(evt){
        paymentBtn.find('a').css({'backgroundColor': '#ccc'}).html('正在支付，请稍后...');
        var orderId = lockseats.orderID,
            url = '/'+ publicsignal +'/payment/' + orderId,
            payment_option = {};
        payment_option = {
            orderId: orderId,
            wxtype: publicsignal,
            openId: cookie.getItem('openids')
        }

        $.post(url, payment_option, function (payment_data) {

            if(!payment_data.err && payment_data.data){
                var param = JSON.parse(payment_data.data);
                if(param.success && param.data){
                    
                    config_wx_and_pay(param.data)

                    paymentBtn.find('a').css({'backgroundColor': ''}).html(paymentBtntxt);
                    isPayLock = false;
                }else{
                    if(param.orderState == 0){
                        pollingPayment();
                    }else{
                        if(param.orderState != 10){
                            Dialogs.tip('<i></i>' + param.errorInfo);
                            paymentBtn.find('a').css({'backgroundColor': ''}).html(paymentBtntxt);
                            isPayLock = false;
                        }
                    }

                    // if(param.orderState == 20){
                    //     Dialogs.tip('<i></i>' + param.errorInfo);
                    //     paymentBtn.find('a').css({'backgroundColor': ''}).html(paymentBtntxt);
                    //     isPayLock = false;
                    // }
                }
            }else{
                // pollingPayment();
                paymentBtn.find('a').css({'backgroundColor': ''}).html(paymentBtntxt);
                isPayLock = false;
            }
                
            // console.log(payment_data);
        });
    }

    function pollingPayment(){
        setTimeout(function(){
            do_payment()
        }, 500)
    }

    var wechatPay = function (param, redirectUrl, modal) {
        window.WeixinJSBridge.invoke('getBrandWCPayRequest', param, function (res) {

            if (res.err_msg == 'get_brand_wcpay_request:ok' || res.err_msg == 'get_brand_wcpay_request:finished') {
                //支付成功处理代码
                if (redirectUrl) {
                    location.href = redirectUrl;
                }
            } else if (res.err_msg == 'system:access_denied') {
                alert("支付请求被拒绝");
            } else if (res.err_msg !== 'get_brand_wcpay_request:cancel') {

                alert("您尚未支付成功，请重新支付");
            }

        });//END of window.WeixinJSBridge.invoke('getBrandWCPayRequest')
    };//END of wechatPay........................

    // var config_wx_and_pay = function(sPayCertificate){
    var config_wx_and_pay = function (sPayCertificate) {
        var orderId = sPayCertificate.iOrderID;

        var callback_url = location.origin + '/' + publicsignal +"/pay/orderwait/" + lockseats.orderID;
        //var _modal       = new Modal();
        wechatPay(sPayCertificate, callback_url);

    };//=====================================================================

    //支付时间
    function setPaytime(el, _playEndTime){
        var playEndTime = new Date(_playEndTime) * 1,
            nowTime     = new Date() * 1, 
            time = playEndTime - nowTime, 
            minutes, seconds;
        if(time <= 0){
            el.html(' 支付时间已过期');
        }else{
            minutes = Math.floor(time / 1000 / 60 );
            seconds = Math.floor(time / 1000 % 60);
            el.html(minutes + '分' + seconds + '秒');

            //倒计时
            countdown.start(
                //倒计时结束回调
                function () {
                    Dialogs.tip('<i></i>'+'未在10分钟内完成支付，所选座位已被取消')
                    
                    setTimeout(function () {
                        window.location.href = "/";
                    }, 1000);
                }
            );
        }
    }

    function setHtml(){
        $('#ticketinfo').html(String.format('<h2>{0}</h2><p>{1}</p><p>{2}{3}{4}</p>',
                                            movie ? movie.movieNameCN : '',
                                            cinema ? cinema.cinemaName : '',
                                            movie ? movie.movieVersions + ' | ' : '',
                                            showtime ? showtime.hallName + ' | ': '',
                                            showtime ? showtime.showTime : ''
        ));

        var _html = '',
            _len = seats.length,
            _seats = _seatsName = [];
        if(_len > 0){
            for (var i = 0; i < _len; i++) {
                var seat = seats[i].split('#');
                _seats.push(seat[0]);
                _seatsName.push(seat[1]);
                _html += '<i class="ico_ticket">'+ seat[1] +'</i>'
            };

            $('#seats').html(_html);
        }

        if(showtime){
            $('._price').html( '¥&nbsp;'+ showtime.price * _len / 100 );
        }

        var localTel = localStorage.getItem('tel') || '';
        $('#tel').html(localTel);
    }

    init();
}); //END of jquery documet.ready


