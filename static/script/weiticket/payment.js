/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var countdown = require('./util/countdown');
var iScroll = require('../lib/iscroll');
var dialogs = require('../util/dialogs');
var widgets = require("../util/widgets.js");
/* jshint ignore:end */

$(document).ready(function () {
    var cinema, showtime, movie, seats;
    function init(){
        initSeatControl();
    }
    
    function initSeatControl(){
        cinema = localStorage.getItem('cinema');
        showtime = localStorage.getItem('showtime');
        movie = localStorage.getItem('movie');
        seats = localStorage.getItem('seats');
        cinema =  cinema ? JSON.parse( cinema ) : '';
        showtime =  showtime ? JSON.parse( showtime ) : '';
        movie =  movie ? JSON.parse( movie ) : '';
        seats = seats ? JSON.parse( seats ) : '';

        setHtml();
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
                var seat = seats[i].split('|');
                _seats.push(seat[0]);
                _seatsName.push(seat[1]);
                _html += '<i class="ico_ticket">'+ seat[1] +'</i>'
            };

            $('#seats').html(_html);
        }

        if(showtime){
            $('._price').html( '¥&nbsp;'+ showtime.price * _len / 100 );
        }
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

        var callback_url = "http://smart.wepiao.com/" + publicsignalshort + "/order";
        //var _modal       = new Modal();
        wechatPay(sPayCertificate, callback_url);

    };//=====================================================================
    init();
}); //END of jquery documet.ready


