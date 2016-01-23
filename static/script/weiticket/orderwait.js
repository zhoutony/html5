var $ = require('../lib/zepto.js');
var Util = require('../util/widgets.js');
var cookie = require('../util/cookie')


$(document).ready(function() {
	var cinema, showtime, movie, seats, lockseats,
        paymentBtn = $('#payment'),
        inputEl = $('#inputTel'),
        mymenuEl = $('.redbox'),
        countdownEl = $('#payment-countdown'),
        isPayLock = false,
        paymentBtntxt = paymentBtn.find('a').html();

	function init(){
		initSeatControl();
		load();
	}

	function load(){
		getQueryTicketResult();
	}

	function getQueryTicketResult(){
		$.get('/'+ publicsignal + '/ticketresult/' + orderId, function(result){
			if(!result.err && result.data && result.data != ''){
				var _data = JSON.parse(result.data);

				if(_data.success && _data.data){
					//出票成功 30   出票失败  40
					if(_data.data.externalOrderStatus == 30){
						location.href = '/'+ publicsignal +'/order/succeed';
					}else if(_data.data.externalOrderStatus == 40){
						location.href = '/'+ publicsignal +'/order/eorr';
					}else{
						//轮循出票接口
						setTimeout(getQueryTicketResult, 2000);
					}
				}else{
					//轮循出票接口
					setTimeout(getQueryTicketResult, 2000);
				}
			}else{
				//轮循出票接口
				setTimeout(getQueryTicketResult, 2000);
			}
		});
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

        // var _lockseats = localStorage.getItem('lockseats_' + showtime.showtimeID);
        // lockseats = _lockseats ? JSON.parse( _lockseats ) : '';

        setHtml();
    }
    function setHtml(){
    	var _html = '',
            _len = seats.length,
            _seats = _seatsName = [];
        if(_len > 0){
            for (var i = 0; i < _len; i++) {
                var seat = seats[i].split('#');
                _seats.push(seat[0]);
                _seatsName.push(seat[1]);
                _html += '<i class="ico_tick">'+ seat[1] +'</i>'
            };

            $('#seats').html(_html);
        }
        var orderInfo = String.format('<h2>{0}</h2><p>{1}</p><p>{2}{3}{4}</p><p>{5}</p>',
                                            movie ? movie.movieNameCN : '',
                                            cinema ? cinema.cinemaName : '',
                                            movie ? movie.movieVersions + ' | ' : '',
                                            showtime ? showtime.hallName + ' | ': '',
                                            showtime ? showtime.showTime : '',
                                            _html
        );
    	$('.succinfo').html(orderInfo);

    	// var cookieExpired = 60 * 60 * 24 * 1; //30天
	    // var cookiePath = '/' + publicsignal;
    	// cookie.setItem('orderInfo', orderInfo, cookieExpired, cookiePath)
    	localStorage.setItem('orderInfo', orderInfo);
    }
    init();
})