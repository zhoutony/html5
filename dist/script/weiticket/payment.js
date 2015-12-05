webpackJsonp([12,18],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint ignore:start */
	var $ = __webpack_require__(1);
	var countdown = __webpack_require__(13);
	var cache = __webpack_require__(2);
	var modal = __webpack_require__(14);
	var iScroll = __webpack_require__(4);
	var cookie = __webpack_require__(3);
	var EcouponPayMent = __webpack_require__(15);
	var widgets = __webpack_require__(9);
	/* jshint ignore:end */

	$(document).ready(function () {

	    var seatLen,
	        chooseCardinfo,
	        balance,
	    //支付锁
	        isPayLock = false,
	        isPayMyCard = false,
	    //使用会员卡状态
	        isUserPayMyCard = false,
	    //使用权益（会员）卡状态
	        isEquityUserPayMycard = false,
	    //立减框
	        saleBox = $('#saleBox'),
	    //是否显示立减框
	        hasShowSaleBox = false,
	    //立减价
	        saleTotalFee = 0,
	    //立减活动ID
	        activityid = '',
	    //代金券框
	        ecouponBox = $('#ecoupon'),
	        activityid = '';
	    //代金券id
	        ecouponCode = '',
	    //活动类型（选填pricecut|cardticket）
	        activitytype = '';
	    
	    // cache.publicSignal(publicsignalshort).then(function(publicSignal) {
	    //     window.document.title = publicSignal.publicSignalName;
	    // });

	    var that = this;
	    document.title = sessionStorage.getItem("publicSignalName");
	    var goBackUrl = document.referrer;

	    countdown.start(
	        //倒计时结束回调
	        function () {
	            var _modal = new modal;
	            _modal.show({
	                'body': '你未在10分钟内完成支付，所选座位已被取消',
	                'type': 'tip'
	            })
	            //alert('你未在10分钟内完成支付，所选座位已被取消');
	            setTimeout(function () {
	                window.location.href = "/" + publicsignalshort + "/choose_cinema";
	            }, 1000);
	        }
	    );

	    //会员卡开关
	    var hasMember = widgets.getIsMembershipCard();
	    if (hasMember) {
	        $('#membershipCard').removeClass("m-hide");
	    }

	    //代金券开关  
	    var hasEcoupons = true;//widgets.getIsEcoupons();
	    if (hasEcoupons) {
	        ecouponBox.removeClass('m-hide');
	    }

	    var physicsModal;
	    widgets.physicsBack(function() {
	        if(!physicsModal){
	            physicsModal = new modal();
	            physicsModal.show({
	                type: 'confirm',
	                body: '确定要取消支付吗?',
	                foot: {
	                    confirm: {
	                        btn: '<a href="#" class="btn btn-confirm">确认</a>',
	                        method: function (modal) {
	                            physicsModal.hide();
	                            physicsModal = null;
	                            unlockSeats();
	                        },
	                    },
	                    cancel: {
	                        btn: '<a href="#" class="btn gray btn-cancel">取消</a>',
	                        method: function (modal) {
	                            physicsModal.hide();
	                            physicsModal = null;
	                        }
	                    }
	                }
	            });
	        }  
	    });


	    // 初始化手机号
	    // 获取手机号码接口
	    // 退款接口（http://cgi.wxmovie.com/order/mobile）
	    // 请求方式：POSTå
	    // 请求参数：
	    // * @param string user_id      用户ID
	    // * @param string publicSignalShort      sddy (公众号缩写)
	    $.post('/' + publicsignalshort + '/order/mobile',
	        {'user_id': user_id, 'publicSignalShort': publicsignalshort}, function (data) {
	            if (data.ret === "0") {
	                var tele = data.data.mobileNo;
	                $("#input-tel").val(tele);
	            }
	        });
	    var iTotalFee,
	        cardId = 0,
	        chooseCardId = 0,
	        cardpaylist,
	        cards_detail_txt = "可选择会员卡";
	    var get_seats_html = function () {
	        var temp_order_id_string = window.sessionStorage.getItem("sTempOrder");
	        var temp_order = JSON.parse(temp_order_id_string);
	        var sSeatLable = temp_order.sSeatLable;
	        var seats = sSeatLable.split('|');
	        var teml = "";
	        seatLen = seats.length;

	        $.each(seats, function (index, seat) {
	            var each_seat_info = seat.split(":");
	            var area = each_seat_info[0];
	            var row = each_seat_info[1];
	            var col = each_seat_info[2];
	            teml = teml + '<li class="seat-label locked">' + row + '排' + col + '座' + '</li>';

	        });
	        $(".pay-locking").html(teml);
	        //设置原价
	        var cinemaPrice = window.sessionStorage.getItem("cinemaPrice"), totalCinemaPrice;
	        if (cinemaPrice) {
	            totalCinemaPrice = parseInt(cinemaPrice) * seatLen;
	        }
	        if (hasMember) {
	            $('.total-price del').html('原价' + totalCinemaPrice + '元');//原价192元
	        }
	    }

	    //通过父页面存入的sessionStorage来渲染本页面的头部(影院，影片信息)
	    if (schedulePricingId) {
	        cache.scheduleInfo(schedulePricingId, publicsignalshort).then(function (data) {
	            $("h4.movie-title").html(data.name); //影片名
	            $(".movie-type").html(data.type); //类型:2D
	            $(".movie-language").html(data.lagu); //语言:国语
	            $(".movie-date").html(data.displayDate); //日期
	            $(".movie-time").html(data.time); //时间
	        });
	    }

	    var get_movie_info = function () {
	        //从jade里面产生的全局变量；
	        var movieinfo_string_in_sessionStorage = window.sessionStorage.getItem("movie-" + movieno);
	        var movieinfo = JSON.parse(movieinfo_string_in_sessionStorage);
	        return movieinfo.name;
	    }

	    var render_movie_info = function () {
	        var temp_order_id_string = window.sessionStorage.getItem("sTempOrder");
	        var temp_order = JSON.parse(temp_order_id_string);
	        iTotalFee = saleTotalFee = temp_order.iTotalFee / 100;

	        $("#iTotalFee").html(iTotalFee);
	        $("#iNeedFee").html(iTotalFee);
	        $(".add").html(window.sessionStorage.getItem('cinemaName'));
	        get_seats_html();

	        //获取活动优惠详情
	        getEventPrice();
	    };

	    render_movie_info();

	    var wechatPay = function (param, redirectUrl, modal) {
	        window.WeixinJSBridge.invoke('getBrandWCPayRequest', param, function (res) {

	            if (res.err_msg == 'get_brand_wcpay_request:ok' || res.err_msg == 'get_brand_wcpay_request:finished') {
	                //支付成功处理代码
	                if (redirectUrl) {
	                    location.href = redirectUrl;
	                }
	            } else if (res.err_msg == 'system:access_denied') {
	                /*
	                 _modal.show({
	                 body: '支付请求被拒绝',
	                 type: 'alert'
	                 });
	                 */
	                alert("支付请求被拒绝");
	            } else if (res.err_msg !== 'get_brand_wcpay_request:cancel') {
	                /*
	                 _modal.show({
	                 type: 'confirm',
	                 body: '您尚未支付成功，是否重新支付',
	                 foot: {
	                 confirm: {
	                 btn: '<a href="#" class="btn btn-confirm">重新支付</a>',
	                 method: function (modal) {
	                 modal.hide();
	                 wechatPay(param, redirectUrl);
	                 }
	                 },
	                 cancel: {
	                 btn: '<a href="#" class="btn gray btn-cancel">取消</a>',
	                 method: function (modal) {
	                 modal.hide();
	                 }
	                 }
	                 }
	                 });//END of _modal.show ....................................
	                 */
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


	    var do_payment = function () {
	        var btnG = $(".btnG");
	        btnG.css({'backgroundColor': '#ccc'}).html('正在努力加载，请稍等');
	        // render_data.data.publicsignalshort  = publicsignalshort;
	        // render_data.data.schedulePricingId  = schedulePricingId;
	        // render_data.data.sTempOrderID       = sTempOrderID;
	        // render_data.data.user_id            = user_id;
	        var payment_option = {};
	        if (!isPayMyCard) {
	            payment_option.bank = 0;
	            payment_option.subsrc = "30610000";
	            payment_option.phone = "18051482816";
	            payment_option.visitor = "weixin_h5";
	            payment_option.temp_order_id = sTempOrderID;
	            payment_option.pay_type = "1";
	            payment_option.schedulePricingId = schedulePricingId;
	            payment_option.publicSignalShort = publicsignalshort;
	            //payment_option.user_id              = user_id;
	            payment_option.user_id = user_id;
	            //活动id（选填）
	            payment_option.pcid = activityid;
	            //代金券id（选填）
	            payment_option.code = EcouponPayMent.code;
	            //活动类型（选填pricecut|cardticket|memberrights）
	            payment_option.activitytype = EcouponPayMent.activitytype;
	            //补充数据（暂为空）
	            payment_option.jsondata = '';
	            //购票数量
	            payment_option.ticketnum = seatLen;
	            // 权益卡
	            payment_option.cinema_no = cinema_id;
	            payment_option.card_id   = chooseCardId;

	            $.post('/' + publicsignalshort + '/order/payment', payment_option, function (payment_data) {
	                btnG.css({'backgroundColor': ''}).html('立即付款');
	                isPayLock = false;
	                if (payment_data) {
	                    if (payment_data.sPayCertificate) {
	                        if (payment_data.sPayCertificate) {

	                            var paystr = JSON.parse(payment_data.sPayCertificate);
	                            // alert(paystr);
	                            // var orderId = result.payment_details.iOrderID;
	                            // WechatPay(paystr, '/movie_correct.html?oid=' + orderId, _modal);
	                            config_wx_and_pay(paystr);
	                            //var orderId = payment_data.payment_details.iOrderID;
	                            //wechatPay(payment_data.payment_details.sPayCertificate,"http://172.18.80.172:3000/wx/result/"+orderId);
	                        }
	                    } else {
	                        alert(payment_data);
	                    }
	                } else {
	                    alert("未得到订单，请重试");
	                }

	            });//end 微信支付
	        } else {
	            //会员卡支付
	            var loadingModal = new modal();
	            loadingModal.show({
	                body: '加载中...',
	                type: 'tip'
	            });
	            payment_option.public_signal_short = publicsignalshort;
	            payment_option.cinema_no = cinema_id;
	            payment_option.open_id = user_id;
	            payment_option.order_id = sTempOrderID;
	            payment_option.card_id = cardId;

	            $.post('/' + publicsignalshort + '/member/cardpay', payment_option, function (payment_data) {
	                btnG.css({'backgroundColor': ''}).html('立即付款');
	                isPayLock = false;
	                loadingModal.hide();
	                if (payment_data && payment_data.order_id) {
	                    location.href = '/' + publicsignalshort + '/order';
	                } else {
	                    alert(payment_data);
	                }
	            });
	        }

	    }//END of do_payment......

	    $(".btnG").on("tap", function () {
	        //alert("吊起支付");
	        if (!isPayLock) {
	            isPayLock = true;
	            do_payment();
	        }

	    });

	    $("#reselected").on("tap", function () {
	        window.history.back();
	    });

	    //选择会员卡支付
	    $('#tablecell').on('tap', function () {
	        var loadingModal = new modal();
	        loadingModal.show({
	            body: '加载中...',
	            type: 'tip'
	        });
	        var url = '/' + publicsignalshort + '/payment/choosemycards';
	        $.get(url, function (orderDetails) {
	            loadingModal.hide();
	            var _$wrapper = $('#membershipCardDialog');
	            var _$wrapperInner = _$wrapper.find('.inner');

	            _$wrapperInner.html(orderDetails);

	            $(".m-cardpay-full").removeClass("m-hide");

	            $("div.cardpay").on("tap", "li", onClickCardLi);

	            $(".close").on("tap", function () {
	                $(".m-cardpay-full").addClass("m-hide");
	                if (!isPayMyCard) {
	                    //显示售价
	                    $('.total-price p').html('售价<b id="iNeedFee">' + iTotalFee + '</b>元');
	                }
	                if (!isUserPayMyCard) {
	                    $('#tablecell').html(cards_detail_txt);
	                    $('#payinfo').html('还需支付:');
	                    $('#iTotalFee').html(saleTotalFee.toString());
	                    $('.total-price p').html('售价<b id="iNeedFee">' + iTotalFee + '</b>元');
	                    isPayMyCard = false;
	                    if (hasShowSaleBox) {
	                        saleBox.removeClass('m-hide');
	                    }
	                    if (hasEcoupons) {
	                        ecouponBox.removeClass('m-hide');
	                    }
	                }
	            });
	            _$wrapper.on("tap", "a.btn-hollow", closeClooseCards);
	            //$("a.btn-hollow").on("tap", closeClooseCards);
	            cardpaylist = $('div.cardpay').find('li');
	            chooseCardMethod(cardpaylist);
	            chooseCardAfterRender();
	        });
	    });

	    //获取影片票价
	    function getMoviePrice(cardId, callback) {
	        var loadingModal = new modal();
	        loadingModal.show({
	            body: '加载中...',
	            type: 'tip'
	        });
	        var getmovieprice_option = {};
	        getmovieprice_option.cinema_no = cinema_id;
	        getmovieprice_option.mpid = schedulePricingId;
	        getmovieprice_option.card_id = cardId;
	        getmovieprice_option.ticket_num = seatLen;
	        getmovieprice_option.public_signal_short = publicsignalshort;

	        $.post('/' + publicsignalshort + '/member/getprice', getmovieprice_option, function (getprice_data) {
	            loadingModal.hide();
	            if (getprice_data && getprice_data.saleprice) {
	                var saleprice = getprice_data.saleprice.toString();
	                $('#payinfo').html('还需会员卡支付:');
	                $('#iTotalFee').html(saleprice);
	                $('.total-price p').html('会员价<b id="iNeedFee">' + saleprice + '</b>元');
	                //$(".m-cardpay-full").addClass("m-hide");
	                callback && callback(getprice_data.saleprice);
	            } else {
	                alert(getprice_data);
	            }
	        });
	        //隐藏售价
	        //$('.total-price p').hide();
	    }

	    //点击卡列表
	    function onClickCardLi(evt) {
	        var el = $(this);
	        balance = parseInt(el.data('balance'));
	        var cardtype = el.data('cardtype');

	        if (cardtype === '0') {

	            if (el.hasClass('_current')) {
	                cardId = chooseCardId = 0;
	                el.removeClass('_current');
	                isPayMyCard = false;
	                $('#tablecell').html(cards_detail_txt);
	                el.find('i').addClass('m-hide');

	                $('#payinfo').html('还需支付:');
	                $('#iTotalFee').html(iTotalFee.toString());
	                //显示售价
	                //$('.total-price p').hide();
	                //使用会员卡状态
	                isUserPayMyCard = false;
	                isEquityUserPayMycard = false;
	                if (hasShowSaleBox) {
	                    saleBox.removeClass('m-hide');
	                }
	                if (hasEcoupons) {
	                    ecouponBox.removeClass('m-hide');
	                }
	                EcouponPayMent.activitytype = '';
	                return;
	            }
	            chooseCardId = el.data('cardid');
	            clearCardsMethod(cardpaylist);
	            el.addClass('_current');

	            el.find('i').removeClass('m-hide');
	            chooseCardinfo = el.find('span.spancardinfo').html()
	            if (hasShowSaleBox) {
	                saleBox.addClass('m-hide');
	            }
	            if (hasEcoupons) {
	                ecouponBox.addClass('m-hide');
	            }
	            EcouponPayMent.activitytype = 'memberrights';
	            getMoviePrice(
	                chooseCardId,
	                function (saleprice) {
	                    saleprice = parseInt(saleprice);
	                    $('.cardpay').find('li').removeClass('lack-money');
	                    $('.dashed').addClass('m-hide');
	                    $('.lack-box').addClass('m-hide');
	                    // if (balance >= saleprice) {
	                        clearCardsMethod(cardpaylist);
	                        el.addClass('_current');

	                        el.find('i').removeClass('m-hide');
	                        chooseCardinfo = el.find('span.spancardinfo').html()
	                        isPayMyCard = false;
	                        isEquityUserPayMycard = true;
	                        if (hasShowSaleBox) {
	                            saleBox.addClass('m-hide');
	                        }
	                        if (hasEcoupons) {
	                            ecouponBox.addClass('m-hide');
	                        }
	                    // } else {
	                    //     el.addClass('lack-money');
	                    //     el.find('.dashed').removeClass('m-hide');
	                    //     el.find('.lack-box').removeClass('m-hide');
	                    // }
	                }
	            );
	        } else {
	            // if(balance >= iTotalFee){
	            if (el.hasClass('_current')) {
	                cardId = chooseCardId = 0;
	                el.removeClass('_current');
	                isPayMyCard = false;
	                $('#tablecell').html(cards_detail_txt);
	                el.find('i').addClass('m-hide');

	                $('#payinfo').html('还需支付:');
	                $('#iTotalFee').html(iTotalFee.toString());
	                //显示售价
	                //$('.total-price p').hide();
	                //使用会员卡状态
	                isUserPayMyCard = false;
	                if (hasShowSaleBox) {
	                    saleBox.removeClass('m-hide');
	                }
	                if (hasEcoupons) {
	                    ecouponBox.removeClass('m-hide');
	                }
	                return;
	            }
	            chooseCardId = el.data('cardid');
	            // clearCardsMethod(cardpaylist);
	            // el.addClass('_current');

	            // el.find('i').removeClass('m-hide');
	            // chooseCardinfo = el.find('span.spancardinfo').html()
	            // isPayMyCard = true;
	            getMoviePrice(
	                chooseCardId,
	                function (saleprice) {
	                    saleprice = parseInt(saleprice);
	                    $('.cardpay').find('li').removeClass('lack-money');
	                    $('.dashed').addClass('m-hide');
	                    $('.lack-box').addClass('m-hide');
	                    if (balance >= saleprice) {
	                        clearCardsMethod(cardpaylist);
	                        el.addClass('_current');

	                        el.find('i').removeClass('m-hide');
	                        chooseCardinfo = el.find('span.spancardinfo').html()
	                        isPayMyCard = true;
	                        if (hasShowSaleBox) {
	                            saleBox.addClass('m-hide');
	                        }
	                        if (hasEcoupons) {
	                            ecouponBox.addClass('m-hide');
	                        }
	                    } else {
	                        el.addClass('lack-money');
	                        el.find('.dashed').removeClass('m-hide');
	                        el.find('.lack-box').removeClass('m-hide');
	                    }
	                }
	            );
	            // }else{
	            //     el.addClass('lack-money');
	            //     el.find('.dashed').removeClass('m-hide');
	            //     el.find('.lack-box').removeClass('m-hide');
	            // }
	        }

	    }

	    //清除选择卡处理的操作
	    function clearCardsMethod(dom) {
	        var len = dom.length,
	            el;
	        for (var i = 0; i < len; i++) {
	            el = $(dom[i]);
	            el.removeClass('current');
	            el.find('i').addClass('m-hide');
	        }
	        ;
	    }

	    //再次选择会员卡时，选定已选的
	    function chooseCardMethod(dom) {
	        var len = dom.length,
	            el;
	        for (var i = 0; i < len; i++) {
	            el = $(dom[i])
	            if (cardId === el.data('cardid')) {
	                el.addClass('_current');
	                el.find('i').removeClass('m-hide');
	                isPayMyCard = true;
	            }
	        }
	        ;
	    }

	    //闭关选择卡片弹层
	    function closeClooseCards() {
	        if (isPayMyCard || isEquityUserPayMycard) {
	            cardId = chooseCardId;
	            isUserPayMyCard = true;
	            $('#tablecell').html(chooseCardinfo);
	            // getMoviePrice();
	            //隐藏售价
	            //$('.total-price p').hide();
	            //$('.total-price del').hide();
	            $(".m-cardpay-full").addClass("m-hide");
	        } else {
	            if (!isUserPayMyCard) {
	                var tip = new modal();
	                tip.show({
	                    body: '您还未选择会员卡！',
	                    type: 'toast'
	                });
	            }
	        }
	    }

	    //选择会员卡弹层，加
	    function chooseCardAfterRender() {
	        var $cardpay = $('.cardpay'),
	            $noCardpay = $('.no-cardpay'),
	            wrapper, holderIScroll;
	        if ($cardpay.length) {
	            wrapper = $cardpay;
	            $cardpay.css({height: document.documentElement.offsetHeight - 60, overflow: 'hidden'});
	        } else {
	            wrapper = $noCardpay;
	            $noCardpay.css({height: document.documentElement.offsetHeight - 60, overflow: 'hidden'});
	        }
	        if (wrapper) {
	            holderIScroll = new iScroll(wrapper[0], {
	                useTransition: false, //transition导致IOS下闪
	                scrollX: false,
	                scrollY: true,
	                preventDefault: true,
	                scrollbars: false,
	                momentum: true,
	                bounceTime: 300,
	                bindToWrapper: true
	            });
	        }
	    }

	    //获取活动优惠详情
	    function getEventPrice() {
	        var options = {};
	        options.mpid = schedulePricingId;
	        options.openid = user_id;
	        options.ticketnum = seatLen;
	        options.publicsignalshort = publicsignalshort;
	        // 是否置代金券为0张可用
	        var isEcoupons = false;

	        $.post('/' + publicsignalshort + '/pricecut/getprice', options, function (getprice_data) {

	            if (getprice_data && getprice_data.activityprice && getprice_data.ticketnum) {
	                activityid = getprice_data.activityid;
	                hasShowSaleBox = true;
	                var ticketnum = parseInt(getprice_data.ticketnum);
	                if (ticketnum > 0) {
	                    saleBox.removeClass('m-hide');
	                    var newSale = saleBox.find('.new-sale');
	                    var activityprice = parseFloat(getprice_data.activityprice);
	                    var activitypriceSum = activityprice * ticketnum;
	                    var $iTotalFee = $('#iTotalFee');
	                    //var totalPrice = parseFloat(iTotalFee.html());parseFloat((iTotalFee - activitypriceSum).toFixed(2))
	                    saleTotalFee = parseFloat((iTotalFee - activitypriceSum).toFixed(2));
	                    if (saleTotalFee <= 0) {
	                        saleTotalFee = .01;
	                    }
	                    //iTotalFee = num;
	                    $iTotalFee.html(saleTotalFee.toString());
	                    newSale.html('-' + activityprice + 'x' + getprice_data.ticketnum);
	                    isEcoupons = true;
	                    EcouponPayMent.activitytype = 'pricecut';
	                }

	            }
	            // 代金券
	            if (hasEcoupons) {
	                EcouponPayMent.render({
	                    // 代金券容器
	                    el: $('#ecoupon'),
	                    // 是否置代金券为0张可用
	                    isEcoupons: isEcoupons,
	                    seatLen: seatLen,
	                    // 售价
	                    iTotalFee: iTotalFee
	                })
	            }
	        });
	    }

	    function getTempOrderInfo() {
	        var tempOderJson = window.sessionStorage.getItem("sTempOrder");
	        return JSON.parse(tempOderJson);
	    }

	    function unlockSeats() {
	        var tempOrder = getTempOrderInfo();
	        var params = {
	            seatlable: tempOrder.sSeatLable,
	            ticket: tempOrder.sTempOrderID,
	            schedulePricingId: schedulePricingId,
	            user_id: user_id,
	            publicSignalShort: publicsignalshort
	        };
	        var tip = new modal();
	            tip.show({
	                body: '选中座位解锁中...',
	                type: 'toast'
	            });
	        $.post('/' + publicsignalshort + '/seat/unlock', params, function (res) {
	            tip.hide();
	            if (res.sInfo === "success") {
	                widgets.physicsGoBack();
	            }
	        });
	    }

	    //=======================================================================================
	}); //END of jquery documet.ready


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
	var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):[]},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function T(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?T(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n);var s=n.dataType,a=/\?.+=\?/.test(n.url);if(a&&(s="jsonp"),n.cache!==!1&&(e&&e.cache===!0||"script"!=s&&"jsonp"!=s)||(n.url=w(n.url,"_="+Date.now())),"jsonp"==s)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var S="async"in n?n.async:!0;d.open(n.type,n.url,S,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(S(t)+"="+S(e))},T(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);
	module.exports = Zepto;
	//     Zepto.js
	//     (c) 2010-2014 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.

	;(function($){
	  var touch = {},
	    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
	    longTapDelay = 750,
	    gesture

	  function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >=
	      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	  }

	  function longTap() {
	    longTapTimeout = null
	    if (touch.last) {
	      touch.el.trigger('longTap')
	      touch = {}
	    }
	  }

	  function cancelLongTap() {
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    longTapTimeout = null
	  }

	  function cancelAll() {
	    if (touchTimeout) clearTimeout(touchTimeout)
	    if (tapTimeout) clearTimeout(tapTimeout)
	    if (swipeTimeout) clearTimeout(swipeTimeout)
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
	    touch = {}
	  }

	  function isPrimaryTouch(event){
	    return (event.pointerType == 'touch' ||
	      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
	      && event.isPrimary
	  }

	  function isPointerEventType(e, type){
	    return (e.type == 'pointer'+type ||
	      e.type.toLowerCase() == 'mspointer'+type)
	  }

	  $(document).ready(function(){
	    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

	    if ('MSGesture' in window) {
	      gesture = new MSGesture()
	      gesture.target = document.body
	    }

	    $(document)
	      .bind('MSGestureEnd', function(e){
	        var swipeDirectionFromVelocity =
	          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
	        if (swipeDirectionFromVelocity) {
	          touch.el.trigger('swipe')
	          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
	        }
	      })
	      .on('touchstart MSPointerDown pointerdown', function(e){
	        if((_isPointerType = isPointerEventType(e, 'down')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        if (e.touches && e.touches.length === 1 && touch.x2) {
	          // Clear out touch movement data if we have it sticking around
	          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
	          touch.x2 = undefined
	          touch.y2 = undefined
	        }
	        now = Date.now()
	        delta = now - (touch.last || now)
	        touch.el = $('tagName' in firstTouch.target ?
	          firstTouch.target : firstTouch.target.parentNode)
	        touchTimeout && clearTimeout(touchTimeout)
	        touch.x1 = firstTouch.pageX
	        touch.y1 = firstTouch.pageY
	        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
	        touch.last = now
	        longTapTimeout = setTimeout(longTap, longTapDelay)
	        // adds the current touch contact for IE gesture recognition
	        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
	      })
	      .on('touchmove MSPointerMove pointermove', function(e){
	        if((_isPointerType = isPointerEventType(e, 'move')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        cancelLongTap()
	        touch.x2 = firstTouch.pageX
	        touch.y2 = firstTouch.pageY

	        deltaX += Math.abs(touch.x1 - touch.x2)
	        deltaY += Math.abs(touch.y1 - touch.y2)
	      })
	      .on('touchend MSPointerUp pointerup', function(e){
	        if((_isPointerType = isPointerEventType(e, 'up')) &&
	          !isPrimaryTouch(e)) return
	        cancelLongTap()

	        // swipe
	        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
	            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

	          swipeTimeout = setTimeout(function() {
	            touch.el.trigger('swipe')
	            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
	            touch = {}
	          }, 0)

	        // normal tap
	        else if ('last' in touch)
	          // don't fire tap when delta position changed by more than 30 pixels,
	          // for instance when moving to a point and back to origin
	          if (deltaX < 30 && deltaY < 30) {
	            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	            // ('tap' fires before 'scroll')
	            tapTimeout = setTimeout(function() {

	              // trigger universal 'tap' with the option to cancelTouch()
	              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	              var event = $.Event('tap')
	              event.cancelTouch = cancelAll
	              touch.el.trigger(event)

	              // trigger double tap immediately
	              if (touch.isDoubleTap) {
	                if (touch.el) touch.el.trigger('doubleTap')
	                touch = {}
	              }

	              // trigger single tap after 250ms of inactivity
	              else {
	                touchTimeout = setTimeout(function(){
	                  touchTimeout = null
	                  if (touch.el) touch.el.trigger('singleTap')
	                  touch = {}
	                }, 250)
	              }
	            }, 0)
	          } else {
	            touch = {}
	          }
	          deltaX = deltaY = 0

	      })
	      // when the browser window loses focus,
	      // for example when a modal dialog is shown,
	      // cancel all ongoing events
	      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

	    // scrolling the window indicates intention of the user
	    // to scroll, not tap or swipe, so cancel all ongoing events
	    $(window).on('scroll', cancelAll)
	  })

	  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
	    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
	    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
	  })
	})(Zepto)

	;(function($){
	  function detect(ua, platform){
	    var os = this.os = {}, browser = this.browser = {},
	        webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
	        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
	        osx = !!ua.match(/\(Macintosh\; Intel /),
	        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
	        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
	        win = /Win\d{2}|Windows/.test(platform),
	        wp = ua.match(/Windows Phone ([\d.]+)/),
	        touchpad = webos && ua.match(/TouchPad/),
	        kindle = ua.match(/Kindle\/([\d.]+)/),
	        silk = ua.match(/Silk\/([\d._]+)/),
	        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
	        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
	        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
	        playbook = ua.match(/PlayBook/),
	        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
	        firefox = ua.match(/Firefox\/([\d.]+)/),
	        firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
	        ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
	        webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
	        safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

	    // Todo: clean this up with a better OS/browser seperation:
	    // - discern (more) between multiple browsers on android
	    // - decide if kindle fire in silk mode is android or not
	    // - Firefox on Android doesn't specify the Android version
	    // - possibly devide in os, device and browser hashes

	    if (browser.webkit = !!webkit) browser.version = webkit[1]

	    if (android) os.android = true, os.version = android[2]
	    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
	    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
	    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
	    if (wp) os.wp = true, os.version = wp[1]
	    if (webos) os.webos = true, os.version = webos[2]
	    if (touchpad) os.touchpad = true
	    if (blackberry) os.blackberry = true, os.version = blackberry[2]
	    if (bb10) os.bb10 = true, os.version = bb10[2]
	    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
	    if (playbook) browser.playbook = true
	    if (kindle) os.kindle = true, os.version = kindle[1]
	    if (silk) browser.silk = true, browser.version = silk[1]
	    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
	    if (chrome) browser.chrome = true, browser.version = chrome[1]
	    if (firefox) browser.firefox = true, browser.version = firefox[1]
	    if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
	    if (ie) browser.ie = true, browser.version = ie[1]
	    if (safari && (osx || os.ios || win)) {
	      browser.safari = true
	      if (!os.ios) browser.version = safari[1]
	    }
	    if (webview) browser.webview = true

	    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
	    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
	    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
	    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
	    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
	  }

	  detect.call($, navigator.userAgent, navigator.platform)
	  // make available to unit tests
	  $.__detect = detect

	})(Zepto)

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(1),
	  __webpack_require__(5),
	  __webpack_require__(12)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	  $, _, Deferred
	) {

	  // 参数增加公众号缩写publicsignalshort是因为站点内的所有路由均加了公众号
	  //keyfn 获取seseion的值
	  //urifn 获取路由地址
	  //datafn 返回数据
	  var initialize = function(keyfn, urifn, datafn) {
	    return function(id, publicsignalshort) {
	      var key = keyfn(id);
	      var defer = new _.Deferred();
	      var item = sessionStorage.getItem(key);
	      if (item) {
	        defer.resolve(JSON.parse(item));
	        return defer.promise();
	      } else {
	        $.get(urifn(id, publicsignalshort), function(data) {
	          item = datafn(data);
	          sessionStorage.setItem(key, JSON.stringify(item));
	          defer.resolve(item);
	        });
	      }
	      return defer.promise();
	    };
	  };

	  var movieCache = initialize(function(id) {
	    return 'movie-' + id;
	  }, function(id, publicsignalshort) {
	    return '/' + publicsignalshort + '/movie_info/' + id + '/';
	  }, function(data) {
	    return data.data.movie;
	  });

	  var publicSignalCache = initialize(function(id) {
	    return 'publicsignal-' + id;
	  }, function(id) {
	    return '/' + id + '/public_signal_info/';
	  }, function(data) {
	    return data;
	  });

	  var cinemaCache = initialize(function(id) {
	    return 'cinema-' + id;
	  }, function(id, publicsignalshort) {
	    return '/' + publicsignalshort + '/cinema_info_html/' + id + '/';
	  }, function(data) {
	    if (data && data.data) {
	      return data.data.cinema;
	    }
	  });

	  //基本排期信息
	  var scheduleInfoCache = initialize(function(mpid) {
	    return 'movieScheduleInfo-' + mpid;
	  }, function(id, publicsignalshort) {
	    return '/' + publicsignalshort + '/movieScheduleInfo/' + id;
	  }, function(data) {
	    return data.data;
	  });

	  return {
	    cinema: cinemaCache,
	    movie: movieCache,
	    publicSignal: publicSignalCache,
	    scheduleInfo: scheduleInfoCache
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function(_) {

	    // var pluses = /\+/g;

	    // function raw(s) {
	    //     return s;
	    // }

	    // function decoded(s) {
	    //     return decodeURIComponent(s.replace(pluses, ' '));
	    // }

	    // var cookie = function cookie(key, value, options) {

	    //     // write
	    //     if (value !== undefined) {
	    //         options = _.extend({}, cookie.defaults, options);

	    //         if (value === null) {
	    //             options.expires = -1;
	    //         }

	    //         if (typeof options.expires === 'number') {
	    //             var days = options.expires,
	    //                 t = options.expires = new Date();
	    //             t.setDate(t.getDate() + days);
	    //         }

	    //         value = cookie.json ? JSON.stringify(value) : String(value);

	    //         return (document.cookie = [
	    //             encodeURIComponent(key), '=', cookie.raw ? value : encodeURIComponent(value),
	    //             options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	    //             options.path ? '; path=' + options.path : '',
	    //             options.domain ? '; domain=' + options.domain : '',
	    //             options.secure ? '; secure' : ''
	    //         ].join(''));
	    //     }

	    //     // read
	    //     var decode = cookie.raw ? raw : decoded;
	    //     var cookies = document.cookie.split('; ');
	    //     for (var i = 0, l = cookies.length; i < l; i++) {
	    //         var parts = cookies[i].split('=');
	    //         if (decode(parts.shift()) === key) {
	    //             var c = decode(parts.join('='));
	    //             return cookie.json ? JSON.parse(c) : c;
	    //         }
	    //     }

	    //     return null;
	    // };

	    // cookie.defaults = {};

	    // function removeCookie(key, options) {
	    //     if (cookie(key) !== null) {
	    //         cookie(key, null, options);
	    //         return true;
	    //     }
	    //     return false;
	    // };

	    // cookie.remove = removeCookie;

	    // return cookie;

	    var docCookies = {
	      getItem: function (sKey) {
	        if (!sKey) { return null; }
	        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	      },
	      setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	        var sExpires = "";
	        if (vEnd) {
	          switch (vEnd.constructor) {
	            case Number:
	              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	              break;
	            case String:
	              sExpires = "; expires=" + vEnd;
	              break;
	            case Date:
	              sExpires = "; expires=" + vEnd.toUTCString();
	              break;
	          }
	        }
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	        return true;
	      },
	      removeItem: function (sKey, sPath, sDomain) {
	        if (!this.hasItem(sKey)) { return false; }
	        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	        return true;
	      },
	      hasItem: function (sKey) {
	        if (!sKey) { return false; }
	        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	      },
	      keys: function () {
	        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	        return aKeys;
	      }
	    };

	    return docCookies;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*! iScroll v5.0.6 ~ (c) 2008-2013 Matteo Spinelli ~ http://cubiq.org/license */
	var IScroll = (function (window, document, Math) {
	var rAF = window.requestAnimationFrame  ||
	    window.webkitRequestAnimationFrame  ||
	    window.mozRequestAnimationFrame     ||
	    window.oRequestAnimationFrame       ||
	    window.msRequestAnimationFrame      ||
	    function (callback) { window.setTimeout(callback, 1000 / 60); };
	var utils = (function () {
	    var me = {};

	    var _elementStyle = document.createElement('div').style;
	    var _vendor = (function () {
	        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
	            transform,
	            i = 0,
	            l = vendors.length;

	        for ( ; i < l; i++ ) {
	            transform = vendors[i] + 'ransform';
	            if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
	        }

	        return false;
	    })();

	    function _prefixStyle (style) {
	        if ( _vendor === false ) return false;
	        if ( _vendor === '' ) return style;
	        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	    }

	    me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	    me.extend = function (target, obj) {
	        for ( var i in obj ) {
	            target[i] = obj[i];
	        }
	    };

	    me.addEvent = function (el, type, fn, capture) {
	        el.addEventListener(type, fn, !!capture);
	    };

	    me.removeEvent = function (el, type, fn, capture) {
	        el.removeEventListener(type, fn, !!capture);
	    };

	    me.momentum = function (current, start, time, lowerMargin, wrapperSize) {
	        var distance = current - start,
	            speed = Math.abs(distance) / time,
	            destination,
	            duration,
	            deceleration = 0.002;

	        destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
	        duration = speed / deceleration;

	        if ( destination < lowerMargin ) {
	            destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
	            distance = Math.abs(destination - current);
	            duration = distance / speed;
	        } else if ( destination > 0 ) {
	            destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
	            distance = Math.abs(current) + destination;
	            duration = distance / speed;
	        }

	        return {
	            destination: Math.round(destination),
	            duration: duration
	        };
	    };

	    var _transform = _prefixStyle('transform');

	    me.extend(me, {
	        hasTransform: _transform !== false,
	        hasPerspective: _prefixStyle('perspective') in _elementStyle,
	        hasTouch: 'ontouchstart' in window,
	        hasPointer: navigator.msPointerEnabled,
	        hasTransition: _prefixStyle('transition') in _elementStyle
	    });

	    me.isAndroidBrowser = /Android/.test(window.navigator.appVersion) && /Version\/\d/.test(window.navigator.appVersion);

	    me.extend(me.style = {}, {
	        transform: _transform,
	        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
	        transitionDuration: _prefixStyle('transitionDuration'),
	        transformOrigin: _prefixStyle('transformOrigin')
	    });

	    me.hasClass = function (e, c) {
	        var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
	        return re.test(e.className);
	    };

	    me.addClass = function (e, c) {
	        if ( me.hasClass(e, c) ) {
	            return;
	        }

	        var newclass = e.className.split(' ');
	        newclass.push(c);
	        e.className = newclass.join(' ');
	    };

	    me.removeClass = function (e, c) {
	        if ( !me.hasClass(e, c) ) {
	            return;
	        }

	        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
	        e.className = e.className.replace(re, ' ');
	    };

	    me.offset = function (el) {
	        var left = -el.offsetLeft,
	            top = -el.offsetTop;

	        // jshint -W084
	        while (el = el.offsetParent) {
	            left -= el.offsetLeft;
	            top -= el.offsetTop;
	        }
	        // jshint +W084

	        return {
	            left: left,
	            top: top
	        };
	    };

	    me.preventDefaultException = function (el, exceptions) {
	        for ( var i in exceptions ) {
	            if ( exceptions[i].test(el[i]) ) {
	                return true;
	            }
	        }

	        return false;
	    };

	    me.extend(me.eventType = {}, {
	        touchstart: 1,
	        touchmove: 1,
	        touchend: 1,

	        mousedown: 2,
	        mousemove: 2,
	        mouseup: 2,

	        MSPointerDown: 3,
	        MSPointerMove: 3,
	        MSPointerUp: 3
	    });

	    me.extend(me.ease = {}, {
	        quadratic: {
	            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	            fn: function (k) {
	                return k * ( 2 - k );
	            }
	        },
	        circular: {
	            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',   // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
	            fn: function (k) {
	                k--;
	                return Math.sqrt( 1 - ( k * k ) );
	            }
	        },
	        back: {
	            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
	            fn: function (k) {
	                var b = 4;
	                return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
	            }
	        },
	        bounce: {
	            style: '',
	            fn: function (k) {
	                if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
	                    return 7.5625 * k * k;
	                } else if ( k < ( 2 / 2.75 ) ) {
	                    return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
	                } else if ( k < ( 2.5 / 2.75 ) ) {
	                    return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
	                } else {
	                    return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
	                }
	            }
	        },
	        elastic: {
	            style: '',
	            fn: function (k) {
	                var f = 0.22,
	                    e = 0.4;

	                if ( k === 0 ) { return 0; }
	                if ( k == 1 ) { return 1; }

	                return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
	            }
	        }
	    });

	    me.tap = function (e, eventName) {
	        var ev = document.createEvent('Event');
	        ev.initEvent(eventName, true, true);
	        ev.pageX = e.pageX;
	        ev.pageY = e.pageY;
	        e.target.dispatchEvent(ev);
	    };

	    me.click = function (e) {
	        var target = e.target,
	            ev;

	        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
	            ev = document.createEvent('MouseEvents');
	            ev.initMouseEvent('click', true, true, e.view, 1,
	                target.screenX, target.screenY, target.clientX, target.clientY,
	                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
	                0, null);

	            ev._constructed = true;
	            target.dispatchEvent(ev);
	        }
	    };

	    return me;
	})();

	function IScroll (el, options) {
	    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;

	    this.scroller = this.wrapper.children[0];
	    this.scrollerStyle = this.scroller.style;       // cache style for better performance

	    this.options = {

	        zoomMin: 1,
	        zoomMax: 4, startZoom: 1,

	        resizeIndicator: true,

	        mouseWheelSpeed: 20,

	        snapThreshold: 0.334,

	// INSERT POINT: OPTIONS 

	        startX: 0,
	        startY: 0,
	        scrollY: true,
	        directionLockThreshold: 5,
	        momentum: true,

	        bounce: true,
	        bounceTime: 600,
	        bounceEasing: '',

	        preventDefault: true,
	        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

	        HWCompositing: true,
	        useTransition: true,
	        useTransform: true
	    };

	    for ( var i in options ) {
	        this.options[i] = options[i];
	    }

	    // Normalize options
	    this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	    this.options.useTransition = utils.hasTransition && this.options.useTransition;
	    this.options.useTransform = utils.hasTransform && this.options.useTransform;

	    this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	    // If you want eventPassthrough I have to lock one of the axes
	    this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	    this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	    // With eventPassthrough we also need lockDirection mechanism
	    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	    this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	    this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	    if ( this.options.tap === true ) {
	        this.options.tap = 'tap';
	    }

	    this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	// INSERT POINT: NORMALIZATION

	    // Some defaults    
	    this.x = 0;
	    this.y = 0;
	    this.directionX = 0;
	    this.directionY = 0;
	    this._events = {};

	    this.scale = Math.min(Math.max(this.options.startZoom, this.options.zoomMin), this.options.zoomMax);

	// INSERT POINT: DEFAULTS

	    this._init();
	    this.refresh();

	    this.scrollTo(this.options.startX, this.options.startY);
	    this.enable();
	}

	IScroll.prototype = {
	    version: '5.0.6',

	    _init: function () {
	        this._initEvents();

	        if ( this.options.zoom ) {
	            this._initZoom();
	        }

	        if ( this.options.scrollbars || this.options.indicators ) {
	            this._initIndicators();
	        }

	        if ( this.options.mouseWheel ) {
	            this._initWheel();
	        }

	        if ( this.options.snap ) {
	            this._initSnap();
	        }

	        if ( this.options.keyBindings ) {
	            this._initKeys();
	        }

	// INSERT POINT: _init

	    },

	    destroy: function () {
	        this._initEvents(true);

	        this._execEvent('destroy');
	    },

	    _transitionEnd: function (e) {
	        if ( e.target != this.scroller ) {
	            return;
	        }

	        this._transitionTime(0);
	        if ( !this.resetPosition(this.options.bounceTime) ) {
	            this._execEvent('scrollEnd');
	        }
	    },

	    _start: function (e) {
	        // React to left mouse button only
	        if ( utils.eventType[e.type] != 1 ) {
	            if ( e.button !== 0 ) {
	                return;
	            }
	        }

	        if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
	            return;
	        }

	        if ( this.options.preventDefault && !utils.isAndroidBrowser && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
	            e.preventDefault();     // This seems to break default Android browser
	        }

	        var point = e.touches ? e.touches[0] : e,
	            pos;

	        this.initiated  = utils.eventType[e.type];
	        this.moved      = false;
	        this.distX      = 0;
	        this.distY      = 0;
	        this.directionX = 0;
	        this.directionY = 0;
	        this.directionLocked = 0;

	        this._transitionTime();

	        this.isAnimating = false;
	        this.startTime = utils.getTime();

	        if ( this.options.useTransition && this.isInTransition ) {
	            pos = this.getComputedPosition();

	            this._translate(Math.round(pos.x), Math.round(pos.y));
	            this._execEvent('scrollEnd');
	            this.isInTransition = false;
	        }

	        this.startX    = this.x;
	        this.startY    = this.y;
	        this.absStartX = this.x;
	        this.absStartY = this.y;
	        this.pointX    = point.pageX;
	        this.pointY    = point.pageY;

	        this._execEvent('beforeScrollStart');
	    },

	    _move: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault ) {    // increases performance on Android? TODO: check!
	            e.preventDefault();
	        }

	        var point       = e.touches ? e.touches[0] : e,
	            deltaX      = point.pageX - this.pointX,
	            deltaY      = point.pageY - this.pointY,
	            timestamp   = utils.getTime(),
	            newX, newY,
	            absDistX, absDistY;

	        this.pointX     = point.pageX;
	        this.pointY     = point.pageY;

	        this.distX      += deltaX;
	        this.distY      += deltaY;
	        absDistX        = Math.abs(this.distX);
	        absDistY        = Math.abs(this.distY);

	        // We need to move at least 10 pixels for the scrolling to initiate
	        if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
	            return;
	        }

	        // If you are scrolling in one direction lock the other
	        if ( !this.directionLocked && !this.options.freeScroll ) {
	            if ( absDistX > absDistY + this.options.directionLockThreshold ) {
	                this.directionLocked = 'h';     // lock horizontally
	            } else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
	                this.directionLocked = 'v';     // lock vertically
	            } else {
	                this.directionLocked = 'n';     // no lock
	            }
	        }

	        if ( this.directionLocked == 'h' ) {
	            if ( this.options.eventPassthrough == 'vertical' ) {
	                e.preventDefault();
	            } else if ( this.options.eventPassthrough == 'horizontal' ) {
	                this.initiated = false;
	                return;
	            }

	            deltaY = 0;
	        } else if ( this.directionLocked == 'v' ) {
	            if ( this.options.eventPassthrough == 'horizontal' ) {
	                e.preventDefault();
	            } else if ( this.options.eventPassthrough == 'vertical' ) {
	                this.initiated = false;
	                return;
	            }

	            deltaX = 0;
	        }

	        deltaX = this.hasHorizontalScroll ? deltaX : 0;
	        deltaY = this.hasVerticalScroll ? deltaY : 0;

	        newX = this.x + deltaX;
	        newY = this.y + deltaY;

	        // Slow down if outside of the boundaries
	        if ( newX > 0 || newX < this.maxScrollX ) {
	            newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
	        }
	        if ( newY > 0 || newY < this.maxScrollY ) {
	            newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
	        }

	        this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
	        this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

	        if ( !this.moved ) {
	            this._execEvent('scrollStart');
	        }

	        this.moved = true;

	        this._translate(newX, newY);

	/* REPLACE START: _move */

	        if ( timestamp - this.startTime > 300 ) {
	            this.startTime = timestamp;
	            this.startX = this.x;
	            this.startY = this.y;
	        }

	/* REPLACE END: _move */

	    },

	    _end: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
	            e.preventDefault();
	        }

	        var point = e.changedTouches ? e.changedTouches[0] : e,
	            momentumX,
	            momentumY,
	            duration = utils.getTime() - this.startTime,
	            newX = Math.round(this.x),
	            newY = Math.round(this.y),
	            distanceX = Math.abs(newX - this.startX),
	            distanceY = Math.abs(newY - this.startY),
	            time = 0,
	            easing = '';

	        this.scrollTo(newX, newY);  // ensures that the last position is rounded

	        this.isInTransition = 0;
	        this.initiated = 0;
	        this.endTime = utils.getTime();

	        // reset if we are outside of the boundaries
	        if ( this.resetPosition(this.options.bounceTime) ) {
	            return;
	        }

	        // we scrolled less than 10 pixels
	        if ( !this.moved ) {
	            if ( this.options.tap ) {
	                utils.tap(e, this.options.tap);
	            }

	            if ( this.options.click ) {
	                utils.click(e);
	            }

	            return;
	        }

	        if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
	            this._execEvent('flick');
	            return;
	        }

	        // start momentum animation if needed
	        if ( this.options.momentum && duration < 300 ) {
	            momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0) : { destination: newX, duration: 0 };
	            momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0) : { destination: newY, duration: 0 };
	            newX = momentumX.destination;
	            newY = momentumY.destination;
	            time = Math.max(momentumX.duration, momentumY.duration);
	            this.isInTransition = 1;
	        }


	        if ( this.options.snap ) {
	            var snap = this._nearestSnap(newX, newY);
	            this.currentPage = snap;
	            time = this.options.snapSpeed || Math.max(
	                    Math.max(
	                        Math.min(Math.abs(newX - snap.x), 1000),
	                        Math.min(Math.abs(newY - snap.y), 1000)
	                    ), 300);
	            newX = snap.x;
	            newY = snap.y;

	            this.directionX = 0;
	            this.directionY = 0;
	            easing = this.options.bounceEasing;
	        }

	// INSERT POINT: _end

	        if ( newX != this.x || newY != this.y ) {
	            // change easing function when scroller goes out of the boundaries
	            if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
	                easing = utils.ease.quadratic;
	            }

	            this.scrollTo(newX, newY, time, easing);
	            return;
	        }

	        this._execEvent('scrollEnd');
	    },

	    _resize: function () {
	        var that = this;

	        clearTimeout(this.resizeTimeout);

	        this.resizeTimeout = setTimeout(function () {
	            that.refresh();
	        }, this.options.resizePolling);
	    },

	    resetPosition: function (time) {
	        var x = this.x,
	            y = this.y;

	        time = time || 0;

	        if ( !this.hasHorizontalScroll || this.x > 0 ) {
	            x = 0;
	        } else if ( this.x < this.maxScrollX ) {
	            x = this.maxScrollX;
	        }

	        if ( !this.hasVerticalScroll || this.y > 0 ) {
	            y = 0;
	        } else if ( this.y < this.maxScrollY ) {
	            y = this.maxScrollY;
	        }

	        if ( x == this.x && y == this.y ) {
	            return false;
	        }

	        this.scrollTo(x, y, time, this.options.bounceEasing);

	        return true;
	    },

	    disable: function () {
	        this.enabled = false;
	    },

	    enable: function () {
	        this.enabled = true;
	    },

	    refresh: function () {
	        var rf = this.wrapper.offsetHeight;     // Force reflow

	        this.wrapperWidth   = this.wrapper.clientWidth;
	        this.wrapperHeight  = this.wrapper.clientHeight;

	/* REPLACE START: refresh */
	    this.scrollerWidth  = Math.round(this.scroller.offsetWidth * this.scale);
	    this.scrollerHeight = Math.round(this.scroller.offsetHeight * this.scale);
	/* REPLACE END: refresh */

	        this.maxScrollX     = this.wrapperWidth - this.scrollerWidth;
	        this.maxScrollY     = this.wrapperHeight - this.scrollerHeight;

	        this.hasHorizontalScroll    = this.options.scrollX && this.maxScrollX < 0;
	        this.hasVerticalScroll      = this.options.scrollY && this.maxScrollY < 0;

	        if ( !this.hasHorizontalScroll ) {
	            this.maxScrollX = 0;
	            this.scrollerWidth = this.wrapperWidth;
	        }

	        if ( !this.hasVerticalScroll ) {
	            this.maxScrollY = 0;
	            this.scrollerHeight = this.wrapperHeight;
	        }

	        this.endTime = 0;
	        this.directionX = 0;
	        this.directionY = 0;

	        this.wrapperOffset = utils.offset(this.wrapper);

	        this._execEvent('refresh');

	        this.resetPosition();

	// INSERT POINT: _refresh

	    },

	    on: function (type, fn) {
	        if ( !this._events[type] ) {
	            this._events[type] = [];
	        }

	        this._events[type].push(fn);
	    },

	    _execEvent: function (type) {
	        if ( !this._events[type] ) {
	            return;
	        }

	        var i = 0,
	            l = this._events[type].length;

	        if ( !l ) {
	            return;
	        }

	        for ( ; i < l; i++ ) {
	            this._events[type][i].call(this);
	        }
	    },

	    scrollBy: function (x, y, time, easing) {
	        x = this.x + x;
	        y = this.y + y;
	        time = time || 0;

	        this.scrollTo(x, y, time, easing);
	    },

	    scrollTo: function (x, y, time, easing) {
	        easing = easing || utils.ease.circular;

	        if ( !time || (this.options.useTransition && easing.style) ) {
	            this._transitionTimingFunction(easing.style);
	            this._transitionTime(time);
	            this._translate(x, y);
	        } else {
	            this._animate(x, y, time, easing.fn);
	        }
	    },

	    scrollToElement: function (el, time, offsetX, offsetY, easing) {
	        el = el.nodeType ? el : this.scroller.querySelector(el);

	        if ( !el ) {
	            return;
	        }

	        var pos = utils.offset(el);

	        pos.left -= this.wrapperOffset.left;
	        pos.top  -= this.wrapperOffset.top;

	        // if offsetX/Y are true we center the element to the screen
	        if ( offsetX === true ) {
	            offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
	        }
	        if ( offsetY === true ) {
	            offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
	        }

	        pos.left -= offsetX || 0;
	        pos.top  -= offsetY || 0;

	        pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
	        pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

	        time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

	        this.scrollTo(pos.left, pos.top, time, easing);
	    },

	    _transitionTime: function (time) {
	        time = time || 0;
	        this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';


	        if ( this.indicators ) {
	            for ( var i = this.indicators.length; i--; ) {
	                this.indicators[i].transitionTime(time);
	            }
	        }


	// INSERT POINT: _transitionTime

	    },

	    _transitionTimingFunction: function (easing) {
	        this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


	        if ( this.indicators ) {
	            for ( var i = this.indicators.length; i--; ) {
	                this.indicators[i].transitionTimingFunction(easing);
	            }
	        }


	// INSERT POINT: _transitionTimingFunction

	    },

	    _translate: function (x, y) {
	        if ( this.options.useTransform ) {

	/* REPLACE START: _translate */         this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ') ' + this.translateZ;/* REPLACE END: _translate */

	        } else {
	            x = Math.round(x);
	            y = Math.round(y);
	            this.scrollerStyle.left = x + 'px';
	            this.scrollerStyle.top = y + 'px';
	        }

	        this.x = x;
	        this.y = y;


	    if ( this.indicators ) {
	        for ( var i = this.indicators.length; i--; ) {
	            this.indicators[i].updatePosition();
	        }
	    }

	// INSERT POINT: _translate

	    },

	    _initEvents: function (remove) {
	        var eventType = remove ? utils.removeEvent : utils.addEvent,
	            target = this.options.bindToWrapper ? this.wrapper : window;

	        eventType(window, 'orientationchange', this);
	        eventType(window, 'resize', this);

	        if ( this.options.click ) {
	            eventType(this.wrapper, 'click', this, true);
	        }

	        if ( !this.options.disableMouse ) {
	            eventType(this.wrapper, 'mousedown', this);
	            eventType(target, 'mousemove', this);
	            eventType(target, 'mousecancel', this);
	            eventType(target, 'mouseup', this);
	        }

	        if ( utils.hasPointer && !this.options.disablePointer ) {
	            eventType(this.wrapper, 'MSPointerDown', this);
	            eventType(target, 'MSPointerMove', this);
	            eventType(target, 'MSPointerCancel', this);
	            eventType(target, 'MSPointerUp', this);
	        }

	        if ( utils.hasTouch && !this.options.disableTouch ) {
	            eventType(this.wrapper, 'touchstart', this);
	            eventType(target, 'touchmove', this);
	            eventType(target, 'touchcancel', this);
	            eventType(target, 'touchend', this);
	        }

	        eventType(this.scroller, 'transitionend', this);
	        eventType(this.scroller, 'webkitTransitionEnd', this);
	        eventType(this.scroller, 'oTransitionEnd', this);
	        eventType(this.scroller, 'MSTransitionEnd', this);
	    },

	    getComputedPosition: function () {
	        var matrix = window.getComputedStyle(this.scroller, null),
	            x, y;

	        if ( this.options.useTransform ) {
	            matrix = matrix[utils.style.transform].split(')')[0].split(', ');
	            x = +(matrix[12] || matrix[4]);
	            y = +(matrix[13] || matrix[5]);
	        } else {
	            x = +matrix.left.replace(/[^-\d]/g, '');
	            y = +matrix.top.replace(/[^-\d]/g, '');
	        }

	        return { x: x, y: y };
	    },

	    _initIndicators: function () {
	        var interactive = this.options.interactiveScrollbars,
	            defaultScrollbars = typeof this.options.scrollbars != 'object',
	            customStyle = typeof this.options.scrollbars != 'string',
	            indicators = [],
	            indicator;

	        this.indicators = [];

	        if ( this.options.scrollbars ) {
	            // Vertical scrollbar
	            if ( this.options.scrollY ) {
	                indicator = {
	                    el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
	                    interactive: interactive,
	                    defaultScrollbars: true,
	                    customStyle: customStyle,
	                    resize: this.options.resizeIndicator,
	                    listenX: false
	                };

	                this.wrapper.appendChild(indicator.el);
	                indicators.push(indicator);
	            }

	            // Horizontal scrollbar
	            if ( this.options.scrollX ) {
	                indicator = {
	                    el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
	                    interactive: interactive,
	                    defaultScrollbars: true,
	                    customStyle: customStyle,
	                    resize: this.options.resizeIndicator,
	                    listenY: false
	                };

	                this.wrapper.appendChild(indicator.el);
	                indicators.push(indicator);
	            }
	        }

	        if ( this.options.indicators ) {
	            // works fine for arrays and non-arrays
	            indicators = indicators.concat(this.options.indicators);
	        }

	        for ( var i = indicators.length; i--; ) {
	            this.indicators[i] = new Indicator(this, indicators[i]);
	        }

	        this.on('refresh', function () {
	            if ( this.indicators ) {
	                for ( var i = this.indicators.length; i--; ) {
	                    this.indicators[i].refresh();
	                }
	            }
	        });

	        this.on('destroy', function () {
	            if ( this.indicators ) {
	                for ( var i = this.indicators.length; i--; ) {
	                    this.indicators[i].destroy();
	                }
	            }

	            delete this.indicators;
	        });
	    },

	    _initZoom: function () {
	        this.scrollerStyle[utils.style.transformOrigin] = '0 0';
	    },

	    _zoomStart: function (e) {
	        var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
	            c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY );

	        this.touchesDistanceStart = Math.sqrt(c1 * c1 + c2 * c2);
	        this.startScale = this.scale;

	        this.originX = Math.abs(e.touches[0].pageX + e.touches[1].pageX) / 2 + this.wrapperOffset.left - this.x;
	        this.originY = Math.abs(e.touches[0].pageY + e.touches[1].pageY) / 2 + this.wrapperOffset.top - this.y;

	        this._execEvent('zoomStart');
	    },

	    _zoom: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault ) {
	            e.preventDefault();
	        }

	        var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
	            c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY ),
	            distance = Math.sqrt( c1 * c1 + c2 * c2 ),
	            scale = 1 / this.touchesDistanceStart * distance * this.startScale,
	            lastScale,
	            x, y;

	        this.scaled = true;

	        if ( scale < this.options.zoomMin ) {
	            scale = 0.5 * this.options.zoomMin * Math.pow(2.0, scale / this.options.zoomMin);
	        } else if ( scale > this.options.zoomMax ) {
	            scale = 2.0 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / scale);
	        }

	        lastScale = scale / this.startScale;
	        x = this.originX - this.originX * lastScale + this.startX;
	        y = this.originY - this.originY * lastScale + this.startY;

	        this.scale = scale;

	        this.scrollTo(x, y, 0);
	    },

	    _zoomEnd: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault ) {
	            e.preventDefault();
	        }

	        var newX, newY,
	            lastScale;

	        this.isInTransition = 0;
	        this.initiated = 0;

	        if ( this.scale > this.options.zoomMax ) {
	            this.scale = this.options.zoomMax;
	        } else if ( this.scale < this.options.zoomMin ) {
	            this.scale = this.options.zoomMin;
	        }

	        // Update boundaries
	        this.refresh();

	        lastScale = this.scale / this.startScale;

	        newX = this.originX - this.originX * lastScale + this.startX;
	        newY = this.originY - this.originY * lastScale + this.startY;

	        if ( newX > 0 ) {
	            newX = 0;
	        } else if ( newX < this.maxScrollX ) {
	            newX = this.maxScrollX;
	        }

	        if ( newY > 0 ) {
	            newY = 0;
	        } else if ( newY < this.maxScrollY ) {
	            newY = this.maxScrollY;
	        }

	        if ( this.x != newX || this.y != newY ) {
	            this.scrollTo(newX, newY, this.options.bounceTime);
	        }

	        this.scaled = false;

	        this._execEvent('zoomEnd');
	    },

	    zoom: function (scale, x, y, time) {
	        if ( scale < this.options.zoomMin ) {
	            scale = this.options.zoomMin;
	        } else if ( scale > this.options.zoomMax ) {
	            scale = this.options.zoomMax;
	        }

	        if ( scale == this.scale ) {
	            return;
	        }

	        var relScale = scale / this.scale;

	        x = x === undefined ? this.wrapperWidth / 2 : x;
	        y = y === undefined ? this.wrapperHeight / 2 : y;
	        time = time === undefined ? 300 : time;

	        x = x + this.wrapperOffset.left - this.x;
	        y = y + this.wrapperOffset.top - this.y;

	        x = x - x * relScale + this.x;
	        y = y - y * relScale + this.y;

	        this.scale = scale;

	        this.refresh();     // update boundaries

	        if ( x > 0 ) {
	            x = 0;
	        } else if ( x < this.maxScrollX ) {
	            x = this.maxScrollX;
	        }

	        if ( y > 0 ) {
	            y = 0;
	        } else if ( y < this.maxScrollY ) {
	            y = this.maxScrollY;
	        }

	        this.scrollTo(x, y, time);
	    },

	    _wheelZoom: function (e) {
	        var wheelDeltaY,
	            deltaScale,
	            that = this;

	        // Execute the zoomEnd event after 400ms the wheel stopped scrolling
	        clearTimeout(this.wheelTimeout);
	        this.wheelTimeout = setTimeout(function () {
	            that._execEvent('zoomEnd');
	        }, 400);

	        if ('wheelDeltaX' in e) {
	            wheelDeltaY = e.wheelDeltaY / Math.abs(e.wheelDeltaY);
	        } else if('wheelDelta' in e) {
	            wheelDeltaY = e.wheelDelta / Math.abs(e.wheelDelta);
	        } else if ('detail' in e) {
	            wheelDeltaY = -e.detail / Math.abs(e.wheelDelta);
	        } else {
	            return;
	        }

	        deltaScale = this.scale + wheelDeltaY / 5;

	        this.zoom(deltaScale, e.pageX, e.pageY, 0);
	    },

	    _initWheel: function () {
	        utils.addEvent(this.wrapper, 'mousewheel', this);
	        utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

	        this.on('destroy', function () {
	            utils.removeEvent(this.wrapper, 'mousewheel', this);
	            utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
	        });
	    },

	    _wheel: function (e) {
	        if ( !this.enabled ) {
	            return;
	        }

	        e.preventDefault();

	        var wheelDeltaX, wheelDeltaY,
	            newX, newY,
	            that = this;

	        // Execute the scrollEnd event after 400ms the wheel stopped scrolling
	        clearTimeout(this.wheelTimeout);
	        this.wheelTimeout = setTimeout(function () {
	            that._execEvent('scrollEnd');
	        }, 400);

	        if ( 'wheelDeltaX' in e ) {
	            wheelDeltaX = e.wheelDeltaX / 120;
	            wheelDeltaY = e.wheelDeltaY / 120;
	        } else if ( 'wheelDelta' in e ) {
	            wheelDeltaX = wheelDeltaY = e.wheelDelta / 120;
	        } else if ( 'detail' in e ) {
	            wheelDeltaX = wheelDeltaY = -e.detail / 3;
	        } else {
	            return;
	        }

	        wheelDeltaX *= this.options.mouseWheelSpeed;
	        wheelDeltaY *= this.options.mouseWheelSpeed;

	        if ( !this.hasVerticalScroll ) {
	            wheelDeltaX = wheelDeltaY;
	            wheelDeltaY = 0;
	        }

	        if ( this.options.snap ) {
	            newX = this.currentPage.pageX;
	            newY = this.currentPage.pageY;

	            if ( wheelDeltaX > 0 ) {
	                newX--;
	            } else if ( wheelDeltaX < 0 ) {
	                newX++;
	            }

	            if ( wheelDeltaY > 0 ) {
	                newY--;
	            } else if ( wheelDeltaY < 0 ) {
	                newY++;
	            }

	            this.goToPage(newX, newY);

	            return;
	        }

	        newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX * this.options.invertWheelDirection : 0);
	        newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY * this.options.invertWheelDirection : 0);

	        if ( newX > 0 ) {
	            newX = 0;
	        } else if ( newX < this.maxScrollX ) {
	            newX = this.maxScrollX;
	        }

	        if ( newY > 0 ) {
	            newY = 0;
	        } else if ( newY < this.maxScrollY ) {
	            newY = this.maxScrollY;
	        }

	        this.scrollTo(newX, newY, 0);

	// INSERT POINT: _wheel
	    },

	    _initSnap: function () {
	        this.currentPage = {};

	        if ( typeof this.options.snap == 'string' ) {
	            this.options.snap = this.scroller.querySelectorAll(this.options.snap);
	        }

	        this.on('refresh', function () {
	            var i = 0, l,
	                m = 0, n,
	                cx, cy,
	                x = 0, y,
	                stepX = this.options.snapStepX || this.wrapperWidth,
	                stepY = this.options.snapStepY || this.wrapperHeight,
	                el;

	            this.pages = [];

	            if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
	                return;
	            }

	            if ( this.options.snap === true ) {
	                cx = Math.round( stepX / 2 );
	                cy = Math.round( stepY / 2 );

	                while ( x > -this.scrollerWidth ) {
	                    this.pages[i] = [];
	                    l = 0;
	                    y = 0;

	                    while ( y > -this.scrollerHeight ) {
	                        this.pages[i][l] = {
	                            x: Math.max(x, this.maxScrollX),
	                            y: Math.max(y, this.maxScrollY),
	                            width: stepX,
	                            height: stepY,
	                            cx: x - cx,
	                            cy: y - cy
	                        };

	                        y -= stepY;
	                        l++;
	                    }

	                    x -= stepX;
	                    i++;
	                }
	            } else {
	                el = this.options.snap;
	                l = el.length;
	                n = -1;

	                for ( ; i < l; i++ ) {
	                    if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
	                        m = 0;
	                        n++;
	                    }

	                    if ( !this.pages[m] ) {
	                        this.pages[m] = [];
	                    }

	                    x = Math.max(-el[i].offsetLeft, this.maxScrollX);
	                    y = Math.max(-el[i].offsetTop, this.maxScrollY);
	                    cx = x - Math.round(el[i].offsetWidth / 2);
	                    cy = y - Math.round(el[i].offsetHeight / 2);

	                    this.pages[m][n] = {
	                        x: x,
	                        y: y,
	                        width: el[i].offsetWidth,
	                        height: el[i].offsetHeight,
	                        cx: cx,
	                        cy: cy
	                    };

	                    if ( x > this.maxScrollX ) {
	                        m++;
	                    }
	                }
	            }

	            this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

	            // Update snap threshold if needed
	            if ( this.options.snapThreshold % 1 === 0 ) {
	                this.snapThresholdX = this.options.snapThreshold;
	                this.snapThresholdY = this.options.snapThreshold;
	            } else {
	                this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
	                this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
	            }
	        });

	        this.on('flick', function () {
	            var time = this.options.snapSpeed || Math.max(
	                    Math.max(
	                        Math.min(Math.abs(this.x - this.startX), 1000),
	                        Math.min(Math.abs(this.y - this.startY), 1000)
	                    ), 300);

	            this.goToPage(
	                this.currentPage.pageX + this.directionX,
	                this.currentPage.pageY + this.directionY,
	                time
	            );
	        });
	    },

	    _nearestSnap: function (x, y) {
	        if ( !this.pages.length ) {
	            return { x: 0, y: 0, pageX: 0, pageY: 0 };
	        }

	        var i = 0,
	            l = this.pages.length,
	            m = 0;

	        // Check if we exceeded the snap threshold
	        if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
	            Math.abs(y - this.absStartY) < this.snapThresholdY ) {
	            return this.currentPage;
	        }

	        if ( x > 0 ) {
	            x = 0;
	        } else if ( x < this.maxScrollX ) {
	            x = this.maxScrollX;
	        }

	        if ( y > 0 ) {
	            y = 0;
	        } else if ( y < this.maxScrollY ) {
	            y = this.maxScrollY;
	        }

	        for ( ; i < l; i++ ) {
	            if ( x >= this.pages[i][0].cx ) {
	                x = this.pages[i][0].x;
	                break;
	            }
	        }

	        l = this.pages[i].length;

	        for ( ; m < l; m++ ) {
	            if ( y >= this.pages[0][m].cy ) {
	                y = this.pages[0][m].y;
	                break;
	            }
	        }

	        if ( i == this.currentPage.pageX ) {
	            i += this.directionX;

	            if ( i < 0 ) {
	                i = 0;
	            } else if ( i >= this.pages.length ) {
	                i = this.pages.length - 1;
	            }

	            x = this.pages[i][0].x;
	        }

	        if ( m == this.currentPage.pageY ) {
	            m += this.directionY;

	            if ( m < 0 ) {
	                m = 0;
	            } else if ( m >= this.pages[0].length ) {
	                m = this.pages[0].length - 1;
	            }

	            y = this.pages[0][m].y;
	        }

	        return {
	            x: x,
	            y: y,
	            pageX: i,
	            pageY: m
	        };
	    },

	    goToPage: function (x, y, time, easing) {
	        easing = easing || this.options.bounceEasing;

	        if ( x >= this.pages.length ) {
	            x = this.pages.length - 1;
	        } else if ( x < 0 ) {
	            x = 0;
	        }

	        if ( y >= this.pages[x].length ) {
	            y = this.pages[x].length - 1;
	        } else if ( y < 0 ) {
	            y = 0;
	        }

	        var posX = this.pages[x][y].x,
	            posY = this.pages[x][y].y;

	        time = time === undefined ? this.options.snapSpeed || Math.max(
	            Math.max(
	                Math.min(Math.abs(posX - this.x), 1000),
	                Math.min(Math.abs(posY - this.y), 1000)
	            ), 300) : time;

	        this.currentPage = {
	            x: posX,
	            y: posY,
	            pageX: x,
	            pageY: y
	        };

	        this.scrollTo(posX, posY, time, easing);
	    },

	    next: function (time, easing) {
	        var x = this.currentPage.pageX,
	            y = this.currentPage.pageY;

	        x++;

	        if ( x >= this.pages.length && this.hasVerticalScroll ) {
	            x = 0;
	            y++;
	        }

	        this.goToPage(x, y, time, easing);
	    },

	    prev: function (time, easing) {
	        var x = this.currentPage.pageX,
	            y = this.currentPage.pageY;

	        x--;

	        if ( x < 0 && this.hasVerticalScroll ) {
	            x = 0;
	            y--;
	        }

	        this.goToPage(x, y, time, easing);
	    },

	    _initKeys: function (e) {
	        // default key bindings
	        var keys = {
	            pageUp: 33,
	            pageDown: 34,
	            end: 35,
	            home: 36,
	            left: 37,
	            up: 38,
	            right: 39,
	            down: 40
	        };
	        var i;

	        // if you give me characters I give you keycode
	        if ( typeof this.options.keyBindings == 'object' ) {
	            for ( i in this.options.keyBindings ) {
	                if ( typeof this.options.keyBindings[i] == 'string' ) {
	                    this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
	                }
	            }
	        } else {
	            this.options.keyBindings = {};
	        }

	        for ( i in keys ) {
	            this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
	        }

	        utils.addEvent(window, 'keydown', this);

	        this.on('destroy', function () {
	            utils.removeEvent(window, 'keydown', this);
	        });
	    },

	    _key: function (e) {
	        if ( !this.enabled ) {
	            return;
	        }

	        var snap = this.options.snap,   // we are using this alot, better to cache it
	            newX = snap ? this.currentPage.pageX : this.x,
	            newY = snap ? this.currentPage.pageY : this.y,
	            now = utils.getTime(),
	            prevTime = this.keyTime || 0,
	            acceleration = 0.250,
	            pos;

	        if ( this.options.useTransition && this.isInTransition ) {
	            pos = this.getComputedPosition();

	            this._translate(Math.round(pos.x), Math.round(pos.y));
	            this.isInTransition = false;
	        }

	        this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

	        switch ( e.keyCode ) {
	            case this.options.keyBindings.pageUp:
	                if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
	                    newX += snap ? 1 : this.wrapperWidth;
	                } else {
	                    newY += snap ? 1 : this.wrapperHeight;
	                }
	                break;
	            case this.options.keyBindings.pageDown:
	                if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
	                    newX -= snap ? 1 : this.wrapperWidth;
	                } else {
	                    newY -= snap ? 1 : this.wrapperHeight;
	                }
	                break;
	            case this.options.keyBindings.end:
	                newX = snap ? this.pages.length-1 : this.maxScrollX;
	                newY = snap ? this.pages[0].length-1 : this.maxScrollY;
	                break;
	            case this.options.keyBindings.home:
	                newX = 0;
	                newY = 0;
	                break;
	            case this.options.keyBindings.left:
	                newX += snap ? -1 : 5 + this.keyAcceleration>>0;
	                break;
	            case this.options.keyBindings.up:
	                newY += snap ? 1 : 5 + this.keyAcceleration>>0;
	                break;
	            case this.options.keyBindings.right:
	                newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
	                break;
	            case this.options.keyBindings.down:
	                newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
	                break;
	            default:
	                return;
	        }

	        if ( snap ) {
	            this.goToPage(newX, newY);
	            return;
	        }

	        if ( newX > 0 ) {
	            newX = 0;
	            this.keyAcceleration = 0;
	        } else if ( newX < this.maxScrollX ) {
	            newX = this.maxScrollX;
	            this.keyAcceleration = 0;
	        }

	        if ( newY > 0 ) {
	            newY = 0;
	            this.keyAcceleration = 0;
	        } else if ( newY < this.maxScrollY ) {
	            newY = this.maxScrollY;
	            this.keyAcceleration = 0;
	        }

	        this.scrollTo(newX, newY, 0);

	        this.keyTime = now;
	    },

	    _animate: function (destX, destY, duration, easingFn) {
	        var that = this,
	            startX = this.x,
	            startY = this.y,
	            startTime = utils.getTime(),
	            destTime = startTime + duration;

	        function step () {
	            var now = utils.getTime(),
	                newX, newY,
	                easing;

	            if ( now >= destTime ) {
	                that.isAnimating = false;
	                that._translate(destX, destY);

	                if ( !that.resetPosition(that.options.bounceTime) ) {
	                    that._execEvent('scrollEnd');
	                }

	                return;
	            }

	            now = ( now - startTime ) / duration;
	            easing = easingFn(now);
	            newX = ( destX - startX ) * easing + startX;
	            newY = ( destY - startY ) * easing + startY;
	            that._translate(newX, newY);

	            if ( that.isAnimating ) {
	                rAF(step);
	            }
	        }

	        this.isAnimating = true;
	        step();
	    },
	    handleEvent: function (e) {
	        switch ( e.type ) {
	            case 'touchstart':
	            case 'MSPointerDown':
	            case 'mousedown':
	                this._start(e);

	                if ( this.options.zoom && e.touches && e.touches.length > 1 ) {
	                    this._zoomStart(e);
	                }
	                break;
	            case 'touchmove':
	            case 'MSPointerMove':
	            case 'mousemove':
	                if ( this.options.zoom && e.touches && e.touches[1] ) {
	                    this._zoom(e);
	                    return;
	                }
	                this._move(e);
	                break;
	            case 'touchend':
	            case 'MSPointerUp':
	            case 'mouseup':
	            case 'touchcancel':
	            case 'MSPointerCancel':
	            case 'mousecancel':
	                if ( this.scaled ) {
	                    this._zoomEnd(e);
	                    return;
	                }
	                this._end(e);
	                break;
	            case 'orientationchange':
	            case 'resize':
	                this._resize();
	                break;
	            case 'transitionend':
	            case 'webkitTransitionEnd':
	            case 'oTransitionEnd':
	            case 'MSTransitionEnd':
	                this._transitionEnd(e);
	                break;
	            case 'DOMMouseScroll':
	            case 'mousewheel':
	                if ( this.options.wheelAction == 'zoom' ) {
	                    this._wheelZoom(e);
	                    return; 
	                }
	                this._wheel(e);
	                break;
	            case 'keydown':
	                this._key(e);
	                break;
	        }
	    }

	};
	function createDefaultScrollbar (direction, interactive, type) {
	    var scrollbar = document.createElement('div'),
	        indicator = document.createElement('div');

	    if ( type === true ) {
	        scrollbar.style.cssText = 'position:absolute;z-index:9999';
	        indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	    }

	    indicator.className = 'iScrollIndicator';

	    if ( direction == 'h' ) {
	        if ( type === true ) {
	            scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
	            indicator.style.height = '100%';
	        }
	        scrollbar.className = 'iScrollHorizontalScrollbar';
	    } else {
	        if ( type === true ) {
	            scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
	            indicator.style.width = '100%';
	        }
	        scrollbar.className = 'iScrollVerticalScrollbar';
	    }

	    if ( !interactive ) {
	        scrollbar.style.pointerEvents = 'none';
	    }

	    scrollbar.appendChild(indicator);

	    return scrollbar;
	}

	function Indicator (scroller, options) {
	    this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	    this.indicator = this.wrapper.children[0];
	    this.indicatorStyle = this.indicator.style;
	    this.scroller = scroller;

	    this.options = {
	        listenX: true,
	        listenY: true,
	        interactive: false,
	        resize: true,
	        defaultScrollbars: false,
	        speedRatioX: 0,
	        speedRatioY: 0
	    };

	    for ( var i in options ) {
	        this.options[i] = options[i];
	    }

	    this.sizeRatioX = 1;
	    this.sizeRatioY = 1;
	    this.maxPosX = 0;
	    this.maxPosY = 0;

	    if ( this.options.interactive ) {
	        if ( !this.options.disableTouch ) {
	            utils.addEvent(this.indicator, 'touchstart', this);
	            utils.addEvent(window, 'touchend', this);
	        }
	        if ( !this.options.disablePointer ) {
	            utils.addEvent(this.indicator, 'MSPointerDown', this);
	            utils.addEvent(window, 'MSPointerUp', this);
	        }
	        if ( !this.options.disableMouse ) {
	            utils.addEvent(this.indicator, 'mousedown', this);
	            utils.addEvent(window, 'mouseup', this);
	        }
	    }
	}

	Indicator.prototype = {
	    handleEvent: function (e) {
	        switch ( e.type ) {
	            case 'touchstart':
	            case 'MSPointerDown':
	            case 'mousedown':
	                this._start(e);
	                break;
	            case 'touchmove':
	            case 'MSPointerMove':
	            case 'mousemove':
	                this._move(e);
	                break;
	            case 'touchend':
	            case 'MSPointerUp':
	            case 'mouseup':
	            case 'touchcancel':
	            case 'MSPointerCancel':
	            case 'mousecancel':
	                this._end(e);
	                break;
	        }
	    },

	    destroy: function () {
	        if ( this.options.interactive ) {
	            utils.removeEvent(this.indicator, 'touchstart', this);
	            utils.removeEvent(this.indicator, 'MSPointerDown', this);
	            utils.removeEvent(this.indicator, 'mousedown', this);

	            utils.removeEvent(window, 'touchmove', this);
	            utils.removeEvent(window, 'MSPointerMove', this);
	            utils.removeEvent(window, 'mousemove', this);

	            utils.removeEvent(window, 'touchend', this);
	            utils.removeEvent(window, 'MSPointerUp', this);
	            utils.removeEvent(window, 'mouseup', this);
	        }

	        if ( this.options.defaultScrollbars ) {
	            this.wrapper.parentNode.removeChild(this.wrapper);
	        }
	    },

	    _start: function (e) {
	        var point = e.touches ? e.touches[0] : e;

	        e.preventDefault();
	        e.stopPropagation();

	        this.transitionTime(0);

	        this.initiated = true;
	        this.moved = false;
	        this.lastPointX = point.pageX;
	        this.lastPointY = point.pageY;

	        this.startTime  = utils.getTime();

	        if ( !this.options.disableTouch ) {
	            utils.addEvent(window, 'touchmove', this);
	        }
	        if ( !this.options.disablePointer ) {
	            utils.addEvent(window, 'MSPointerMove', this);
	        }
	        if ( !this.options.disableMouse ) {
	            utils.addEvent(window, 'mousemove', this);
	        }

	        this.scroller._execEvent('beforeScrollStart');
	    },

	    _move: function (e) {
	        var point = e.touches ? e.touches[0] : e,
	            deltaX, deltaY,
	            newX, newY,
	            timestamp = utils.getTime();

	        if ( !this.moved ) {
	            this.scroller._execEvent('scrollStart');
	        }

	        this.moved = true;

	        deltaX = point.pageX - this.lastPointX;
	        this.lastPointX = point.pageX;

	        deltaY = point.pageY - this.lastPointY;
	        this.lastPointY = point.pageY;

	        newX = this.x + deltaX;
	        newY = this.y + deltaY;

	        this._pos(newX, newY);

	        e.preventDefault();
	        e.stopPropagation();
	    },

	    _end: function (e) {
	        if ( !this.initiated ) {
	            return;
	        }

	        this.initiated = false;

	        e.preventDefault();
	        e.stopPropagation();

	        utils.removeEvent(window, 'touchmove', this);
	        utils.removeEvent(window, 'MSPointerMove', this);
	        utils.removeEvent(window, 'mousemove', this);

	        if ( this.scroller.options.snap ) {
	            var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

	            var time = this.options.snapSpeed || Math.max(
	                    Math.max(
	                        Math.min(Math.abs(this.scroller.x - snap.x), 1000),
	                        Math.min(Math.abs(this.scroller.y - snap.y), 1000)
	                    ), 300);

	            if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
	                this.scroller.directionX = 0;
	                this.scroller.directionY = 0;
	                this.scroller.currentPage = snap;
	                this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
	            }
	        }

	        if ( this.moved ) {
	            this.scroller._execEvent('scrollEnd');
	        }
	    },

	    transitionTime: function (time) {
	        time = time || 0;
	        this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';
	    },

	    transitionTimingFunction: function (easing) {
	        this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	    },

	    refresh: function () {
	        this.transitionTime(0);

	        if ( this.options.listenX && !this.options.listenY ) {
	            this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
	        } else if ( this.options.listenY && !this.options.listenX ) {
	            this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
	        } else {
	            this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
	        }

	        if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
	            utils.addClass(this.wrapper, 'iScrollBothScrollbars');
	            utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

	            if ( this.options.defaultScrollbars && this.options.customStyle ) {
	                if ( this.options.listenX ) {
	                    this.wrapper.style.right = '8px';
	                } else {
	                    this.wrapper.style.bottom = '8px';
	                }
	            }
	        } else {
	            utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
	            utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

	            if ( this.options.defaultScrollbars && this.options.customStyle ) {
	                if ( this.options.listenX ) {
	                    this.wrapper.style.right = '2px';
	                } else {
	                    this.wrapper.style.bottom = '2px';
	                }
	            }
	        }

	        var r = this.wrapper.offsetHeight;  // force refresh

	        if ( this.options.listenX ) {
	            this.wrapperWidth = this.wrapper.clientWidth;
	            if ( this.options.resize ) {
	                this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
	                this.indicatorStyle.width = this.indicatorWidth + 'px';
	            } else {
	                this.indicatorWidth = this.indicator.clientWidth;
	            }
	            this.maxPosX = this.wrapperWidth - this.indicatorWidth;
	            this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));  
	        }

	        if ( this.options.listenY ) {
	            this.wrapperHeight = this.wrapper.clientHeight;
	            if ( this.options.resize ) {
	                this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
	                this.indicatorStyle.height = this.indicatorHeight + 'px';
	            } else {
	                this.indicatorHeight = this.indicator.clientHeight;
	            }

	            this.maxPosY = this.wrapperHeight - this.indicatorHeight;
	            this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
	        }

	        this.updatePosition();
	    },

	    updatePosition: function () {
	        var x = Math.round(this.sizeRatioX * this.scroller.x) || 0,
	            y = Math.round(this.sizeRatioY * this.scroller.y) || 0;

	        if ( !this.options.ignoreBoundaries ) {
	            if ( x < 0 ) {
	                x = 0;
	            } else if ( x > this.maxPosX ) {
	                x = this.maxPosX;
	            }

	            if ( y < 0 ) {
	                y = 0;
	            } else if ( y > this.maxPosY ) {
	                y = this.maxPosY;
	            }       
	        }

	        this.x = x;
	        this.y = y;

	        if ( this.scroller.options.useTransform ) {
	            this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
	        } else {
	            this.indicatorStyle.left = x + 'px';
	            this.indicatorStyle.top = y + 'px';
	        }
	    },

	    _pos: function (x, y) {
	        if ( x < 0 ) {
	            x = 0;
	        } else if ( x > this.maxPosX ) {
	            x = this.maxPosX;
	        }

	        if ( y < 0 ) {
	            y = 0;
	        } else if ( y > this.maxPosY ) {
	            y = this.maxPosY;
	        }

	        x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
	        y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

	        this.scroller.scrollTo(x, y);
	    }
	};

	IScroll.ease = utils.ease;
	module.exports = IScroll;
	return IScroll;

	})(window, document, Math);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.2
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=d(e,i,4);var o=!w(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=b(r,e);for(var u=null!=t&&t.length,i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t){var r=S.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||o,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=S[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var e=this,u=e._,i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=o.toString,s=o.hasOwnProperty,p=Array.isArray,h=Object.keys,v=a.bind,g=Object.create,y=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};true?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):e._=m,m.VERSION="1.8.2";var d=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},b=function(n,t,r){return null==n?m.identity:m.isFunction(n)?d(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return b(n,t,1/0)};var x=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var l=o[c];t&&r[l]!==void 0||(r[l]=i[l])}return r}},_=function(n){if(!m.isObject(n))return{};if(g)return g(n);y.prototype=n;var t=new y;return y.prototype=null,t},j=Math.pow(2,53)-1,w=function(n){var t=n&&n.length;return"number"==typeof t&&t>=0&&j>=t};m.each=m.forEach=function(n,t,r){t=d(t,r);var e,u;if(w(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=w(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=b(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(b(t)),r)},m.every=m.all=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r){return w(n)||(n=m.values(n)),m.indexOf(n,t,"number"==typeof r&&r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=w(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(w(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=b(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,r,e){var u={};return r=b(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=A(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=A(function(n,t,r){n[r]=t}),m.countBy=A(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):w(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:w(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=b(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var k=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=n&&n.length;a>o;o++){var c=n[o];if(w(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=k(c,t,r));var l=0,f=c.length;for(u.length+=f;f>l;)u[i++]=c[l++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return k(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){if(null==n)return[];m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=b(r,e));for(var u=[],i=[],o=0,a=n.length;a>o;o++){var c=n[o],l=r?r(c,o,n):c;t?(o&&i===l||u.push(c),i=l):r?m.contains(i,l)||(i.push(l),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(k(arguments,!0,!0))},m.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=k(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,"length").length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=n&&n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.indexOf=function(n,t,r){var e=0,u=n&&n.length;if("number"==typeof r)e=0>r?Math.max(0,u+r):r;else if(r&&u)return e=m.sortedIndex(n,t),n[e]===t?e:-1;if(t!==t)return m.findIndex(l.call(n,e),m.isNaN);for(;u>e;e++)if(n[e]===t)return e;return-1},m.lastIndexOf=function(n,t,r){var e=n?n.length:0;if("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1)),t!==t)return m.findLastIndex(l.call(n,0,e),m.isNaN);for(;--e>=0;)if(n[e]===t)return e;return-1},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=b(r,e,1);for(var u=r(t),i=0,o=n.length;o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var O=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=_(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(v&&n.bind===v)return v.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return O(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return O(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var l=m.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f||f>t?(o&&(clearTimeout(o),o=null),a=l,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,f)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=m.now()-o;t>l&&l>=0?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var F=!{toString:null}.propertyIsEnumerable("toString"),S=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)m.has(n,e)&&t.push(e);return F&&r(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var e in n)t.push(e);return F&&r(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=x(m.allKeys),m.extendOwn=m.assign=x(m.keys),m.findKey=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=d(t,r)):(u=k(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var l=u[a],f=o[l];e(f,l,o)&&(i[l]=f)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(k(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=x(m.allKeys,!0),m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var E=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=f.call(n);if(u!==f.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!E(n[c],t[c],r,e))return!1}else{var l,s=m.keys(n);if(c=s.length,m.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!m.has(t,l)||!E(n[l],t[l],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return E(n,t)},m.isEmpty=function(n){return null==n?!0:w(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=p||function(n){return"[object Array]"===f.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return f.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===f.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&s.call(n,t)},m.noConflict=function(){return e._=u,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=function(n){return function(t){return null==t?void 0:t[n]}},m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=d(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=m.invert(M),I=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=I(M),m.unescape=I(N),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var B=0;m.uniqueId=function(n){var t=++B+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,K=function(n){return"\\"+R[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||T).source,(t.interpolate||T).source,(t.evaluate||T).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(q,K),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},l=t.variable||"obj";return c.source="function("+l+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var z=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),z(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],z(this,r)}}),m.each(["concat","join","slice"],function(n){var t=i[n];m.prototype[n]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"=="function"&&__webpack_require__(20)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);
	//# sourceMappingURL=underscore-min.map

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by gaowhen on 15/1/9.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(1),
	        __webpack_require__(5),
	        __webpack_require__(14),
	        __webpack_require__(3),
	        __webpack_require__(19),
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function ($,
	                 _,
	                 Modal,
	                 cookie,
	                 director) {

	        // 字符串长度限制, 最大长度默认为12
	        function strShort(string, maxLength) {
	            if (!string) return "";
	            var len = 0,
	                arr = string.split(""),
	                result = [];
	            maxLength = (maxLength || 12) * 2;

	            var l = arr.length;
	            for (var i = 0; i < l; ++i) {
	                if (arr[i].charCodeAt(0) < 299) {
	                    len++;
	                } else {
	                    len += 2;
	                }
	                result.push(arr[i]);

	                //如果当前元素是倒数第二个，并且还剩余至少两个字节的长度
	                if (i == l - 2 && len <= maxLength - 2) {
	                    result.push(arr[i + 1]);
	                    break;
	                } else if (len > maxLength - 2) {
	                    result.push('...');
	                    break;
	                }
	            }
	            return result.join('');
	        }

	        // 获取是否显示会员卡
	        function getIsMembershipCard() {
	            //公众号开关
	            var hasPublicsignalshortMember = cookie.getItem("has_publicsignalshort_member");
	            //影院开关
	            var hasCinemaMember = cookie.getItem("has_cinema_member");
	            if (hasPublicsignalshortMember === "1" && hasCinemaMember === "1") {
	                return true;
	            }
	            return false;
	        }

	        // 获取是否显示代金券
	        function getIsEcoupons() {
	            //代金券公众号开关
	            var hasPublicsignalshortEcoupons = cookie.getItem("has_publicsignalshort_ecoupons");
	            //代金券影院开关
	            var hasCinemaEcoupons = cookie.getItem("has_cinema_ecoupons");
	            if (hasPublicsignalshortEcoupons === "1" && hasCinemaEcoupons === "1") {
	                return true;
	            }
	            return false;
	        }

	        String.format = function () {
	            if (arguments.length == 0)
	                return null;
	            var str = arguments[0];
	            for (var i = 1; i < arguments.length; i++) {
	                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
	                str = str.replace(re, arguments[i]);
	            }
	            return str;
	        }

	        function physicsBack(callback,status) {
	            var action="physicsBackAction";
	            var isRepate=status==null?true:status;
	            var router = new director.Router().init();

	            router.setRoute(action);
	            setTimeout(function () {
	                router.setRoute(Math.random());
	                router.on(action, function () {
	                    if (callback) {
	                        callback();
	                        if (isRepate) {
	                            router.setRoute(action);
	                            router.setRoute(Math.random());
	                        }
	                    }
	                });
	            }, 200);
	        }

	        function physicsGoBack() {
	            history.go(-2);
	        }

	        /**
	        * 经纬度转换，可以在GPS，百度，谷歌之间转换
	        *
	        * @param from {Number} 值从app.constant里面取
	        * @param to {Number} 值从app.constant里面取
	        * @param coords {Object} 经纬度
	        * @param coords.latitude {Number} 纬度
	        * @param coords.longitude {Number} 经度
	        * @param successCallback {Function} 转换成功后的回调
	        * @param errorCallback {Function} 转换失败后的回调
	        */
	        function coordsConvert(from, to, coords, successCallback, errorCallback) {
	            $.ajax('http://api.map.baidu.com/ag/coord/convert?from=' + from + '&to=' + to + '&x=' + coords.longitude + '&y=' + coords.latitude, {
	                dataType: 'jsonp',
	                success: function (res) {
	                    if (!res.error) {
	                        successCallback && successCallback({
	                            longitude: decode64(res.x),
	                            latitude: decode64(res.y)
	                        });
	                    } else {
	                        error('convert coords error!');
	                        errorCallback && errorCallback();
	                    }
	                }
	            });
	        }


	        /**
	        * 获取当前地理位置（已转换成Google坐标），并会将当前地理位置缓存到内存中
	        * 如果不传递任何一个回调函数，就只返回缓存中的当前地理位置信息
	        *
	        * @param successCallback {Function} 获取成功的回调函数，
	        * 会传入{latitude: latitude, longitude: longitude}结构的经纬度数据
	        * @param errorCallback 获取失败的回调函数
	        * @param notShowTip {Boolean} 不显示失败Tip
	        */
	        function getCurrentPosition(successCallback, errorCallback, notShowTip) {
	            // var currentCoords = app.cache.get('currentCoords'); // 先尝试从缓存中获取之前定位的坐标

	            // 只从缓存中获取地理位置，如果缓存中没有地理位置信息，就返回undefined
	            if (_.isUndefined(successCallback) && _.isUndefined(errorCallback)) {
	                return currentCoords;
	            }

	            successCallback = successCallback || emptyFunction;
	            errorCallback = errorCallback || emptyFunction;

	            // if (currentCoords) {
	            //     log('current position:', currentCoords);
	            //     successCallback(currentCoords);
	            // } else {
	                if ("geolocation" in navigator) {
	                    // GPS定位
	                    navigator.geolocation.getCurrentPosition(function (position) {
	                        successCallback(position.coords);
	                        // 将GPS的坐标转换为Google的坐标
	                        // coordsConvert(0, 2, position.coords, function (coords) {
	                        //     log('current position:', coords);
	                        //     //app.cache.set('currentCoords', coords);
	                        //     successCallback(coords);
	                        // }, function () {
	                        //     error('convert coords failed!');
	                        //     errorCallback();
	                        // });
	                    }, function (error) {
	                        if (!notShowTip) {
	                            switch (error.code) {
	                                case error.PERMISSION_DENIED:
	                                    // dialogs.tip('定位未开启', app.constant.ERROR_TIP);
	                                    break;
	                                case error.POSITION_UNAVAILABLE:
	                                    // dialogs.tip('定位失败，请稍后再试', app.constant.ERROR_TIP);
	                                    break;
	                                case error.TIMEOUT:
	                                    // dialogs.tip('定位超时，请稍后再试', app.constant.ERROR_TIP);
	                                    break;
	                            }
	                        }
	                        errorCallback(error);
	                    }, { timeout: 30e3 }); // 获取地址的超时为半分钟
	                } else {
	                    error('browser unsupport geolocation!');
	                    errorCallback();
	                }
	            // }

	            return null;
	        }

	        function iScrollClick(){
	            if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
	            if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
	            if (/Silk/i.test(navigator.userAgent)) return false;
	            if (/Android/i.test(navigator.userAgent))
	            {
	              var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
	              return parseFloat(s[0]+s[3]) < 44 ? false : true
	            }
	        }

	        return {
	            strShort: strShort,
	            getIsMembershipCard: getIsMembershipCard,
	            getIsEcoupons: getIsEcoupons,
	            physicsBack: physicsBack,
	            physicsGoBack: physicsGoBack,
	            getCurrentPosition: getCurrentPosition,
	            iScrollClick: iScrollClick
	        };
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	;

/***/ },
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	(function(root){
	  var _ = __webpack_require__(5);
	  // Let's borrow a couple of things from Underscore that we'll need

	  // _.each
	  var breaker = {},
	      AP = Array.prototype,
	      OP = Object.prototype,

	      hasOwn = OP.hasOwnProperty,
	      toString = OP.toString,
	      forEach = AP.forEach,
	      indexOf = AP.indexOf,
	      slice = AP.slice;

	  var _each = function( obj, iterator, context ) {
	    var key, i, l;

	    if ( !obj ) {
	      return;
	    }
	    if ( forEach && obj.forEach === forEach ) {
	      obj.forEach( iterator, context );
	    } else if ( obj.length === +obj.length ) {
	      for ( i = 0, l = obj.length; i < l; i++ ) {
	        if ( i in obj && iterator.call( context, obj[i], i, obj ) === breaker ) {
	          return;
	        }
	      }
	    } else {
	      for ( key in obj ) {
	        if ( hasOwn.call( obj, key ) ) {
	          if ( iterator.call( context, obj[key], key, obj) === breaker ) {
	            return;
	          }
	        }
	      }
	    }
	  };

	  // _.isFunction
	  var _isFunction = function( obj ) {
	    return !!(obj && obj.constructor && obj.call && obj.apply);
	  };

	  // _.extend
	  var _extend = function( obj ) {

	    _each( slice.call( arguments, 1), function( source ) {
	      var prop;

	      for ( prop in source ) {
	        if ( source[prop] !== void 0 ) {
	          obj[ prop ] = source[ prop ];
	        }
	      }
	    });
	    return obj;
	  };

	  // $.inArray
	  var _inArray = function( elem, arr, i ) {
	    var len;

	    if ( arr ) {
	      if ( indexOf ) {
	        return indexOf.call( arr, elem, i );
	      }

	      len = arr.length;
	      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

	      for ( ; i < len; i++ ) {
	        // Skip accessing in sparse arrays
	        if ( i in arr && arr[ i ] === elem ) {
	          return i;
	        }
	      }
	    }

	    return -1;
	  };

	  // And some jQuery specific helpers

	  var class2type = {};

	  // Populate the class2type map
	  _each("Boolean Number String Function Array Date RegExp Object".split(" "), function(name, i) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase();
	  });

	  var _type = function( obj ) {
	    return obj == null ?
	      String( obj ) :
	      class2type[ toString.call(obj) ] || "object";
	  };

	  // Now start the jQuery-cum-Underscore implementation. Some very
	  // minor changes to the jQuery source to get this working.

	  // Internal Deferred namespace
	  var _d = {};
	  // String to Object options format cache
	  var optionsCache = {};

	  // Convert String-formatted options into Object-formatted ones and store in cache
	  function createOptions( options ) {
	    var object = optionsCache[ options ] = {};
	    _each( options.split( /\s+/ ), function( flag ) {
	      object[ flag ] = true;
	    });
	    return object;
	  }

	  _d.Callbacks = function( options ) {

	    // Convert options from String-formatted to Object-formatted if needed
	    // (we check in cache first)
	    options = typeof options === "string" ?
	      ( optionsCache[ options ] || createOptions( options ) ) :
	      _extend( {}, options );

	    var // Last fire value (for non-forgettable lists)
	      memory,
	      // Flag to know if list was already fired
	      fired,
	      // Flag to know if list is currently firing
	      firing,
	      // First callback to fire (used internally by add and fireWith)
	      firingStart,
	      // End of the loop when firing
	      firingLength,
	      // Index of currently firing callback (modified by remove if needed)
	      firingIndex,
	      // Actual callback list
	      list = [],
	      // Stack of fire calls for repeatable lists
	      stack = !options.once && [],
	      // Fire callbacks
	      fire = function( data ) {
	        memory = options.memory && data;
	        fired = true;
	        firingIndex = firingStart || 0;
	        firingStart = 0;
	        firingLength = list.length;
	        firing = true;
	        for ( ; list && firingIndex < firingLength; firingIndex++ ) {
	          if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
	            memory = false; // To prevent further calls using add
	            break;
	          }
	        }
	        firing = false;
	        if ( list ) {
	          if ( stack ) {
	            if ( stack.length ) {
	              fire( stack.shift() );
	            }
	          } else if ( memory ) {
	            list = [];
	          } else {
	            self.disable();
	          }
	        }
	      },
	      // Actual Callbacks object
	      self = {
	        // Add a callback or a collection of callbacks to the list
	        add: function() {
	          if ( list ) {
	            // First, we save the current length
	            var start = list.length;
	            (function add( args ) {
	              _each( args, function( arg ) {
	                var type = _type( arg );
	                if ( type === "function" ) {
	                  if ( !options.unique || !self.has( arg ) ) {
	                    list.push( arg );
	                  }
	                } else if ( arg && arg.length && type !== "string" ) {
	                  // Inspect recursively
	                  add( arg );
	                }
	              });
	            })( arguments );
	            // Do we need to add the callbacks to the
	            // current firing batch?
	            if ( firing ) {
	              firingLength = list.length;
	            // With memory, if we're not firing then
	            // we should call right away
	            } else if ( memory ) {
	              firingStart = start;
	              fire( memory );
	            }
	          }
	          return this;
	        },
	        // Remove a callback from the list
	        remove: function() {
	          if ( list ) {
	            _each( arguments, function( arg ) {
	              var index;
	              while( ( index = _inArray( arg, list, index ) ) > -1 ) {
	                list.splice( index, 1 );
	                // Handle firing indexes
	                if ( firing ) {
	                  if ( index <= firingLength ) {
	                    firingLength--;
	                  }
	                  if ( index <= firingIndex ) {
	                    firingIndex--;
	                  }
	                }
	              }
	            });
	          }
	          return this;
	        },
	        // Control if a given callback is in the list
	        has: function( fn ) {
	          return _inArray( fn, list ) > -1;
	        },
	        // Remove all callbacks from the list
	        empty: function() {
	          list = [];
	          return this;
	        },
	        // Have the list do nothing anymore
	        disable: function() {
	          list = stack = memory = undefined;
	          return this;
	        },
	        // Is it disabled?
	        disabled: function() {
	          return !list;
	        },
	        // Lock the list in its current state
	        lock: function() {
	          stack = undefined;
	          if ( !memory ) {
	            self.disable();
	          }
	          return this;
	        },
	        // Is it locked?
	        locked: function() {
	          return !stack;
	        },
	        // Call all callbacks with the given context and arguments
	        fireWith: function( context, args ) {
	          args = args || [];
	          args = [ context, args.slice ? args.slice() : args ];
	          if ( list && ( !fired || stack ) ) {
	            if ( firing ) {
	              stack.push( args );
	            } else {
	              fire( args );
	            }
	          }
	          return this;
	        },
	        // Call all the callbacks with the given arguments
	        fire: function() {
	          self.fireWith( this, arguments );
	          return this;
	        },
	        // To know if the callbacks have already been called at least once
	        fired: function() {
	          return !!fired;
	        }
	      };

	    return self;
	  };

	  _d.Deferred = function( func ) {

	    var tuples = [
	        // action, add listener, listener list, final state
	        [ "resolve", "done", _d.Callbacks("once memory"), "resolved" ],
	        [ "reject", "fail", _d.Callbacks("once memory"), "rejected" ],
	        [ "notify", "progress", _d.Callbacks("memory") ]
	      ],
	      state = "pending",
	      promise = {
	        state: function() {
	          return state;
	        },
	        always: function() {
	          deferred.done( arguments ).fail( arguments );
	          return this;
	        },
	        then: function( /* fnDone, fnFail, fnProgress */ ) {
	          var fns = arguments;

	          return _d.Deferred(function( newDefer ) {

	            _each( tuples, function( tuple, i ) {
	              var action = tuple[ 0 ],
	                fn = fns[ i ];

	              // deferred[ done | fail | progress ] for forwarding actions to newDefer
	              deferred[ tuple[1] ]( _isFunction( fn ) ?

	                function() {
	                  var returned;
	                  try { returned = fn.apply( this, arguments ); } catch(e){
	                    newDefer.reject(e);
	                    return;
	                  }

	                  if ( returned && _isFunction( returned.promise ) ) {
	                    returned.promise()
	                      .done( newDefer.resolve )
	                      .fail( newDefer.reject )
	                      .progress( newDefer.notify );
	                  } else {
	                    newDefer[ action !== "notify" ? 'resolveWith' : action + 'With']( this === deferred ? newDefer : this, [ returned ] );
	                  }
	                } :

	                newDefer[ action ]
	              );
	            });

	            fns = null;

	          }).promise();

	        },
	        // Get a promise for this deferred
	        // If obj is provided, the promise aspect is added to the object
	        promise: function( obj ) {
	          return obj != null ? _extend( obj, promise ) : promise;
	        }
	      },
	      deferred = {};

	    // Keep pipe for back-compat
	    promise.pipe = promise.then;

	    // Add list-specific methods
	    _each( tuples, function( tuple, i ) {
	      var list = tuple[ 2 ],
	        stateString = tuple[ 3 ];

	      // promise[ done | fail | progress ] = list.add
	      promise[ tuple[1] ] = list.add;

	      // Handle state
	      if ( stateString ) {
	        list.add(function() {
	          // state = [ resolved | rejected ]
	          state = stateString;

	        // [ reject_list | resolve_list ].disable; progress_list.lock
	        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
	      }

	      // deferred[ resolve | reject | notify ] = list.fire
	      deferred[ tuple[0] ] = list.fire;
	      deferred[ tuple[0] + "With" ] = list.fireWith;
	    });

	    // Make the deferred a promise
	    promise.promise( deferred );

	    // Call given func if any
	    if ( func ) {
	      func.call( deferred, deferred );
	    }

	    // All done!
	    return deferred;
	  };

	  // Deferred helper
	  _d.when = function( subordinate /* , ..., subordinateN */ ) { 

	    var i = 0,
	      resolveValues = ( _type(subordinate) === 'array' && arguments.length === 1 ) ? subordinate : slice.call( arguments ),
	      length = resolveValues.length;

	      if ( _type(subordinate) === 'array' && subordinate.length === 1 ) {
	        subordinate = subordinate[ 0 ];
	      }

	      // the count of uncompleted subordinates
	      var remaining = length !== 1 || ( subordinate && _isFunction( subordinate.promise ) ) ? length : 0,

	      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
	      deferred = remaining === 1 ? subordinate : _d.Deferred(),

	      // Update function for both resolve and progress values
	      updateFunc = function( i, contexts, values ) {
	        return function( value ) {
	          contexts[ i ] = this;
	          values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
	          if( values === progressValues ) {
	            deferred.notifyWith( contexts, values );
	          } else if ( !( --remaining ) ) {
	            deferred.resolveWith( contexts, values );
	          }
	        };
	      },

	      progressValues, progressContexts, resolveContexts;

	    // add listeners to Deferred subordinates; treat others as resolved
	    if ( length > 1 ) {
	      progressValues = new Array( length );
	      progressContexts = new Array( length );
	      resolveContexts = new Array( length );
	      for ( ; i < length; i++ ) {
	        if ( resolveValues[ i ] && _isFunction( resolveValues[ i ].promise ) ) {
	          resolveValues[ i ].promise()
	            .done( updateFunc( i, resolveContexts, resolveValues ) )
	            .fail( deferred.reject )
	            .progress( updateFunc( i, progressContexts, progressValues ) );
	        } else {
	          --remaining;
	        }
	      }
	    }

	    // if we're not waiting on anything, resolve the master
	    if ( !remaining ) {
	      deferred.resolveWith( resolveContexts, resolveValues );
	    }

	    return deferred.promise();
	  };

	  // Try exporting as a Common.js Module
	  if ( typeof module !== "undefined" && module.exports ) {


	    module.exports = _d;
	    _.mixin(_d); //黑科技

	  // Or mixin to Underscore.js
	  } else if ( typeof root._ !== "undefined" ) {

	    root._.mixin(_d);

	  // Or assign it to window._
	  } else {

	    root._ = _d;

	  }

	})(this);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var $countdown = $("#payment-countdown");
	var epoch = $countdown.data('epoch');
	var getEpoch = function () {
	  return strToEpoch($countdown.html());
	}
	var callback;
	var padZero = function (number) {
	  if (number < 10) {
	    return '0' + number;
	  } else {
	    return '' + number;
	  }
	}
	var epochToStr = function (epoch) {
	  minute = padZero(parseInt(epoch / 60));
	  second = padZero(parseInt(epoch % 60));
	  return minute + '分' + second + '秒';
	}
	var strToEpoch = function (str) {
	  match = str.match(/(\d+)分(\d+)秒/);
	  minute = parseInt(match[1]);
	  second = parseInt(match[2]);
	  return minute * 60 + second
	}
	var countDown = function() {
	  epoch = getEpoch();
	  if (epoch <= 0) {
	    return 0;
	  } else {
	    return epoch - 1;
	  }
	}
	var countDownUI = function() {
	  epoch = countDown();
	  if (epoch === 0) {
	    stop();
	    callback && callback();
	  }
	  epochstr = epochToStr(epoch);
	  $countdown.html(epochstr);
	}

	var intervalID;
	var start = function(_callback) {
	  callback = _callback;
	  intervalID = setInterval(countDownUI, 1000);
	}
	var stop = function() {
	  clearInterval(intervalID);
	}
	exports.countDownUI = countDownUI;
	exports.start = start;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by gaowhen on 14/11/27.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(5)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	    $,
	    _
	) {
	    var toastModal = {
	        method: function (modal) {
	            modal.$modal.addClass('modal').removeClass('m-modal m-modal-m').html(modal.setting.body);
	            setTimeout(function () {
	                modal.hide();
	            }, 2000);
	        }
	    };

	    var alertModal = {
	        btn: '<a href="#" class="btn btn-cancel">返回</a>',
	        method: function(modal) {
	            modal.hide();
	        }
	    };

	    var confirmModal = {
	        confirm: {
	            btn: '<a href="#" class="btn btn-confirm">确认</a>',
	            method: function(modal) {
	                modal.hide();
	            }
	        },
	        cancel: {
	            btn: '<a href="#" class="btn gray btn-cancel">取消</a>',
	            method: function(modal) {
	                modal.hide();
	            }
	        }
	    };

	    var defaults = {
	        isShowHead: false,
	        head: 'should be text or dom',
	        body: 'text or dom',
	        type: 'alert', // confirm
	        foot: alertModal
	    };

	    function Modal() {
	        this.init();
	    }

	    _.extend(Modal.prototype, {
	        init: function() {
	            this.$overlay = $('<div class="full-screen"></div>');
	            this.$modal = $('' +
	                '<div class="m-modal m-modal-m">' +
	                '<div class="m-m-header"></div>' +
	                '<div class="m-m-body" style="text-align: center;"></div>' +
	                '<div class="m-m-footer"><div class="btn-box"></div></div>' +
	                '</div>');

	            this.$head = this.$modal.find('.m-m-header');
	            this.$body = this.$modal.find('.m-m-body');
	            this.$foot = this.$modal.find('.m-m-footer');
	            this.$btn = this.$foot.find('.btn-box');

	            this.$overlay.hide();
	            this.$modal.hide();

	            this.speed = 150;

	            var $body = $('body');
	            $body.append(this.$overlay);
	            $body.append(this.$modal);

	            this.$overlay.on('click', function(e) {
	                if (e.preventDefault) {
	                    e.preventDefault();
	                }
	                // that.hide();
	            });
	        },
	        setHead: function(head) {
	            this.$head.removeClass('empty').html(head);
	        },
	        setContent: function(content) {
	            this.$body.html(content);
	        },
	        show: function(opt) {
	            var that = this;

	            opt = _.extend(defaults, opt);

	            that.$overlay.show(that.speed);

	            if (opt.isShowHead) {
	                that.$head.removeClass('empty');
	                that.setHead(opt.head);
	            } else {
	                that.$head.addClass('empty');
	            }

	            switch (opt.type) {
	                case 'alert':
	                    if (opt.foot && (opt.foot.btn || opt.foot.method)) {
	                        alertModal = _.extend(alertModal, opt.foot);
	                    }

	                    that.$modal.empty().addClass('m-modal m-modal-m').removeClass('modal')
	                        .append(that.$head).append(that.$body).append(that.$foot);

	                    that.$body.html(opt.body);

	                    that.$btn.empty().append(alertModal.btn);

	                    that.$modal.on('click', '.btn-cancel', function(e) {
	                        e.preventDefault();
	                        alertModal.method(that);
	                        that.hide();
	                    });
	                    break;
	                case 'confirm':
	                    if (opt.foot && (opt.foot.confirm || opt.foot.cancel)) {
	                        confirmModal = _.extend(confirmModal, opt.foot);
	                    }

	                    that.$modal.empty().addClass('m-modal m-modal-m').removeClass('modal')
	                        .append(that.$head).append(that.$body).append(that.$foot);

	                    that.$body.html(opt.body);
	                    that.$btn.empty().append(confirmModal.cancel.btn).append(confirmModal.confirm.btn);

	                    that.$modal.on('click', '.btn-cancel', function(e) {
	                        e.preventDefault();

	                        that.hide();
	                        confirmModal.cancel.method(that);
	                    });

	                    that.$modal.on('click', '.btn-confirm', function(e) {
	                        e.preventDefault();

	                        that.hide();
	                        confirmModal.confirm.method(that);
	                    });
	                    break;
	                case 'tip':
	                    that.$modal.addClass('modal').removeClass('m-modal m-modal-m').html(opt.body);
	                    break;
	                case 'toast':
	                    that.setting = opt;
	                    toastModal.method(that);
	                    break;
	                default:
	            }

	            if (opt.klas === 'full') {
	                this.$modal.removeClass('m-modal-m').addClass('m-modal-full');
	            }

	            that.$modal.show(that.speed);
	        },
	        hide: function() {
	            this.$overlay.remove();
	            this.$modal.remove();
	        }
	    });

	    return Modal;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Created by cdmatom on 2015/7/
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(5),__webpack_require__(14), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, _, Modal, cookie, iScroll) {
	        "use strict";
	        var ecoupon_payment = {},
	        cardpaylist,
	        listnum,
	        ecoupon_txt,
	        hasEcoupons = false;
	        ecoupon_payment.code = '';
	        ecoupon_payment.activitytype = '';
	        var holderIScroll;

	        var ecoupon_templates = '<div class="eco-pay-full"><a title="关闭" class="close">x</a><div listnum="0" class="m-m-header"><h3>代金券<small>0张</small></h3></div><div class="no-eco" style="height: 561px; overflow: hidden;"><div style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); -webkit-transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; -webkit-transition-duration: 0ms; transform: translate(0px, 0px) scale(1) translateZ(0px);"><img src="/pic/img-cry.jpg" width="72" height="80"><p>代金券不可与立减优惠同时使用</p><div style="height: 200px;"></div></div></div><div style="position: fixed;bottom: 0px;" class="btn-box"><a class="btn-hollow orangered">关闭</a></div></div>';

	        ecoupon_payment.render = function(config) {
	            this.el = config.el;
	            this.isEcoupons = config.isEcoupons;
	            this.seatLen = config.seatLen;
	            ecoupon_txt = this.el.find('.right');
	            this.iTotalFee = config.iTotalFee;
	            this.getEcoupons();
	        },
	        
	        ecoupon_payment.getEcoupons = function(){
	            var el = this.el;
	            //el.removeClass('m-hide');
	            if(this.isEcoupons){
	                ecoupon_txt.html('<em>0个可用</em>');
	                var _$wrapper = $('#ecouponsDialog');
	                var _$wrapperInner = _$wrapper.find('.inner');

	                _$wrapperInner.html(ecoupon_templates);
	                el.on('tap',function(){
	                    _$wrapper.removeClass('m-hide');
	                });

	                $("div.btn-box").on("tap", "a", function(){
	                    $('#ecouponsDialog').addClass('m-hide');
	                } );

	                $(".close").on("tap", function(){
	                    _$wrapper.addClass('m-hide');
	                });
	                chooseEcouponsAfterRender();
	            }else{
	                var options                = {};
	                options.mpid               = schedulePricingId;
	                options.openid             = user_id;
	                options.ticketnum          = this.seatLen;
	                options.publicsignalshort  = publicsignalshort;
	                options.orderid            = sTempOrderID;

	                $.post("/"+ publicsignalshort +"/cardticket/paylist",options,function(getEcoupons){
	                    var _$wrapper = $('#ecouponsDialog');
	                    var _$wrapperInner = _$wrapper.find('.inner');

	                    _$wrapperInner.html(getEcoupons);

	                    listnum = parseInt( _$wrapperInner.find('.m-m-header').attr('listnum') );
	                    if(listnum > 0) {
	                        ecoupon_txt.html('<em>'+ listnum +'个可用</em>');
	                    }else{
	                        ecoupon_txt.html('<em>0个可用</em>');
	                    }
	                    el.on('tap',function(){
	                        _$wrapper.removeClass('m-hide');
	                        chooseEcouponsAfterRender();
	                    });

	                    $(".close").on("tap", function(){
	                        if(!hasEcoupons && cardpaylist){
	                            clearCardsMethod(cardpaylist);
	                            $('a.btn-hollow').html('关闭');
	                            ecoupon_txt.html('<em>'+ listnum +'个可用</em>');
	                            ecoupon_payment.code = '';
	                            ecoupon_payment.activitytype = '';
	                            $('#iTotalFee').html( ecoupon_payment.iTotalFee );
	                        }
	                        _$wrapper.addClass('m-hide');
	                    });
	                    //chooseEcouponsAfterRender();
	                });
	                
	            }
	        }

	        //选择会员卡弹层，加
	        function chooseEcouponsAfterRender(){
	            var $cardpay = $('article.eco-list'),
	                $noCardpay = $('div.no-eco'),
	                wrapper;
	            if($cardpay.length){
	                wrapper = $cardpay;
	                $cardpay.css({height: document.documentElement.clientHeight - 152, overflow: 'auto'});
	            }else{
	                wrapper = $noCardpay;
	                $noCardpay.css({height: document.documentElement.clientHeight - 60, overflow: 'hidden'});
	            }
	            if(wrapper && !holderIScroll){
	                
	                holderIScroll = new iScroll(wrapper[0], {
	                    useTransition: false, //transition导致IOS下闪
	                    scrollX: false,
	                    scrollY: true,
	                    preventDefault: true,
	                    scrollbars: false,
	                    momentum: true,
	                    bounceTime: 300,
	                    bindToWrapper: true
	                });
	                cardpaylist = $cardpay.find('li');
	                $cardpay.on("tap", "li", onClickCardLi );
	                $("div.btn-box").on("tap", "a", function(){
	                    $('#ecouponsDialog').addClass('m-hide');
	                    hasEcoupons = true;
	                } );
	            }
	        }

	        //点击卡列表
	        function onClickCardLi(evt){
	            var el = $(this),
	            title, amount, saleTotalFee,
	            ecoupon_code = el.data('code');

	            if(ecoupon_code){
	                if(el.hasClass('current')){
	                    el.removeClass('current');
	                    $('a.btn-hollow').html('关闭');
	                    ecoupon_txt.html('<em>'+ listnum +'个可用</em>');
	                    ecoupon_payment.code = '';
	                    ecoupon_payment.activitytype = '';
	                    $('#iTotalFee').html( ecoupon_payment.iTotalFee );
	                    hasEcoupons = false;
	                }else{
	                    clearCardsMethod(cardpaylist);
	                    el.addClass('current');
	                    amount = parseFloat( el.find('em').html().replace('元', '') );
	                    ecoupon_txt.html( '使用代金券减' + amount + '元' );
	                    //saleTotalFee = ecoupon_payment.iTotalFee - amount;
	                    saleTotalFee = parseFloat((ecoupon_payment.iTotalFee - amount).toFixed(2));
	                    if(saleTotalFee <= 0){
	                        saleTotalFee = .01;
	                    }
	                    $('#iTotalFee').html( saleTotalFee );
	                    $('a.btn-hollow').html('使用代金券');
	                    ecoupon_payment.code = ecoupon_code;
	                    ecoupon_payment.activitytype = 'cardticket';
	                }
	            }
	        }

	        //清除选择卡处理的操作
	        function clearCardsMethod(dom){
	            var len = dom.length,
	                el;
	            for (var i = 0; i < len; i++) {
	                el = $(dom[i]);
	                el.removeClass('current');
	            };
	        }

	        //再次选择会员卡时，选定已选的
	        function chooseCardMethod(dom){
	            var len = dom.length,
	                el;
	            for (var i = 0; i < len; i++) {
	                el = $(dom[i])
	                if(cardId === el.data('cardid')){
	                    el.addClass('current');
	                    isPayMyCard = true;
	                }
	            };
	        }


	        return ecoupon_payment;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); //END of ecoupon_payment.js

/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//

	(function (exports) {

	/*
	 * browser.js: Browser specific functionality for director.
	 *
	 * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
	 * MIT LICENSE
	 *
	 */

	var dloc = document.location;

	function dlocHashEmpty() {
	  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
	  // assumes both mean empty.
	  return dloc.hash === '' || dloc.hash === '#';
	}

	var listener = {
	  mode: 'modern',
	  hash: dloc.hash,
	  history: false,

	  check: function () {
	    var h = dloc.hash;
	    if (h != this.hash) {
	      this.hash = h;
	      this.onHashChanged();
	    }
	  },

	  fire: function () {
	    if (this.mode === 'modern') {
	      this.history === true ? window.onpopstate() : window.onhashchange();
	    }
	    else {
	      this.onHashChanged();
	    }
	  },

	  init: function (fn, history) {
	    var self = this;
	    this.history = history;

	    if (!Router.listeners) {
	      Router.listeners = [];
	    }

	    function onchange(onChangeEvent) {
	      for (var i = 0, l = Router.listeners.length; i < l; i++) {
	        Router.listeners[i](onChangeEvent);
	      }
	    }

	    //note IE8 is being counted as 'modern' because it has the hashchange event
	    if ('onhashchange' in window && (document.documentMode === undefined
	      || document.documentMode > 7)) {
	      // At least for now HTML5 history is available for 'modern' browsers only
	      if (this.history === true) {
	        // There is an old bug in Chrome that causes onpopstate to fire even
	        // upon initial page load. Since the handler is run manually in init(),
	        // this would cause Chrome to run it twise. Currently the only
	        // workaround seems to be to set the handler after the initial page load
	        // http://code.google.com/p/chromium/issues/detail?id=63040
	        setTimeout(function() {
	          window.onpopstate = onchange;
	        }, 500);
	      }
	      else {
	        window.onhashchange = onchange;
	      }
	      this.mode = 'modern';
	    }
	    else {
	      //
	      // IE support, based on a concept by Erik Arvidson ...
	      //
	      var frame = document.createElement('iframe');
	      frame.id = 'state-frame';
	      frame.style.display = 'none';
	      document.body.appendChild(frame);
	      this.writeFrame('');

	      if ('onpropertychange' in document && 'attachEvent' in document) {
	        document.attachEvent('onpropertychange', function () {
	          if (event.propertyName === 'location') {
	            self.check();
	          }
	        });
	      }

	      window.setInterval(function () { self.check(); }, 50);

	      this.onHashChanged = onchange;
	      this.mode = 'legacy';
	    }

	    Router.listeners.push(fn);

	    return this.mode;
	  },

	  destroy: function (fn) {
	    if (!Router || !Router.listeners) {
	      return;
	    }

	    var listeners = Router.listeners;

	    for (var i = listeners.length - 1; i >= 0; i--) {
	      if (listeners[i] === fn) {
	        listeners.splice(i, 1);
	      }
	    }
	  },

	  setHash: function (s) {
	    // Mozilla always adds an entry to the history
	    if (this.mode === 'legacy') {
	      this.writeFrame(s);
	    }

	    if (this.history === true) {
	      window.history.pushState({}, document.title, s);
	      // Fire an onpopstate event manually since pushing does not obviously
	      // trigger the pop event.
	      this.fire();
	    } else {
	      dloc.hash = (s[0] === '/') ? s : '/' + s;
	    }
	    return this;
	  },

	  writeFrame: function (s) {
	    // IE support...
	    var f = document.getElementById('state-frame');
	    var d = f.contentDocument || f.contentWindow.document;
	    d.open();
	    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
	    d.close();
	  },

	  syncHash: function () {
	    // IE support...
	    var s = this._hash;
	    if (s != dloc.hash) {
	      dloc.hash = s;
	    }
	    return this;
	  },

	  onHashChanged: function () {}
	};

	var Router = exports.Router = function (routes) {
	  if (!(this instanceof Router)) return new Router(routes);

	  this.params   = {};
	  this.routes   = {};
	  this.methods  = ['on', 'once', 'after', 'before'];
	  this.scope    = [];
	  this._methods = {};

	  this._insert = this.insert;
	  this.insert = this.insertEx;

	  this.historySupport = (window.history != null ? window.history.pushState : null) != null

	  this.configure();
	  this.mount(routes || {});
	};

	Router.prototype.init = function (r) {
	  var self = this
	    , routeTo;
	  this.handler = function(onChangeEvent) {
	    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
	    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
	    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
	  };

	  listener.init(this.handler, this.history);

	  if (this.history === false) {
	    if (dlocHashEmpty() && r) {
	      dloc.hash = r;
	    } else if (!dlocHashEmpty()) {
	      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
	    }
	  }
	  else {
	    if (this.convert_hash_in_init) {
	      // Use hash as route
	      routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
	      if (routeTo) {
	        window.history.replaceState({}, document.title, routeTo);
	      }
	    }
	    else {
	      // Use canonical url
	      routeTo = this.getPath();
	    }

	    // Router has been initialized, but due to the chrome bug it will not
	    // yet actually route HTML5 history state changes. Thus, decide if should route.
	    if (routeTo || this.run_in_init === true) {
	      this.handler();
	    }
	  }

	  return this;
	};

	Router.prototype.explode = function () {
	  var v = this.history === true ? this.getPath() : dloc.hash;
	  if (v.charAt(1) === '/') { v=v.slice(1) }
	  return v.slice(1, v.length).split("/");
	};

	Router.prototype.setRoute = function (i, v, val) {
	  var url = this.explode();

	  if (typeof i === 'number' && typeof v === 'string') {
	    url[i] = v;
	  }
	  else if (typeof val === 'string') {
	    url.splice(i, v, s);
	  }
	  else {
	    url = [i];
	  }

	  listener.setHash(url.join('/'));
	  return url;
	};

	//
	// ### function insertEx(method, path, route, parent)
	// #### @method {string} Method to insert the specific `route`.
	// #### @path {Array} Parsed path to insert the `route` at.
	// #### @route {Array|function} Route handlers to insert.
	// #### @parent {Object} **Optional** Parent "routes" to insert into.
	// insert a callback that will only occur once per the matched route.
	//
	Router.prototype.insertEx = function(method, path, route, parent) {
	  if (method === "once") {
	    method = "on";
	    route = function(route) {
	      var once = false;
	      return function() {
	        if (once) return;
	        once = true;
	        return route.apply(this, arguments);
	      };
	    }(route);
	  }
	  return this._insert(method, path, route, parent);
	};

	Router.prototype.getRoute = function (v) {
	  var ret = v;

	  if (typeof v === "number") {
	    ret = this.explode()[v];
	  }
	  else if (typeof v === "string"){
	    var h = this.explode();
	    ret = h.indexOf(v);
	  }
	  else {
	    ret = this.explode();
	  }

	  return ret;
	};

	Router.prototype.destroy = function () {
	  listener.destroy(this.handler);
	  return this;
	};

	Router.prototype.getPath = function () {
	  var path = window.location.pathname;
	  if (path.substr(0, 1) !== '/') {
	    path = '/' + path;
	  }
	  return path;
	};
	function _every(arr, iterator) {
	  for (var i = 0; i < arr.length; i += 1) {
	    if (iterator(arr[i], i, arr) === false) {
	      return;
	    }
	  }
	}

	function _flatten(arr) {
	  var flat = [];
	  for (var i = 0, n = arr.length; i < n; i++) {
	    flat = flat.concat(arr[i]);
	  }
	  return flat;
	}

	function _asyncEverySeries(arr, iterator, callback) {
	  if (!arr.length) {
	    return callback();
	  }
	  var completed = 0;
	  (function iterate() {
	    iterator(arr[completed], function(err) {
	      if (err || err === false) {
	        callback(err);
	        callback = function() {};
	      } else {
	        completed += 1;
	        if (completed === arr.length) {
	          callback();
	        } else {
	          iterate();
	        }
	      }
	    });
	  })();
	}

	function paramifyString(str, params, mod) {
	  mod = str;
	  for (var param in params) {
	    if (params.hasOwnProperty(param)) {
	      mod = params[param](str);
	      if (mod !== str) {
	        break;
	      }
	    }
	  }
	  return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
	}

	function regifyString(str, params) {
	  var matches, last = 0, out = "";
	  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
	    last = matches.index + matches[0].length;
	    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
	    out += str.substr(0, matches.index) + matches[0];
	  }
	  str = out += str.substr(last);
	  var captures = str.match(/:([^\/]+)/ig), capture, length;
	  if (captures) {
	    length = captures.length;
	    for (var i = 0; i < length; i++) {
	      capture = captures[i];
	      if (capture.slice(0, 2) === "::") {
	        str = capture.slice(1);
	      } else {
	        str = str.replace(capture, paramifyString(capture, params));
	      }
	    }
	  }
	  return str;
	}

	function terminator(routes, delimiter, start, stop) {
	  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
	  for (i = 0; i < routes.length; i++) {
	    var chunk = routes[i];
	    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
	      left = chunk.indexOf(start, last);
	      right = chunk.indexOf(stop, last);
	      if (~left && !~right || !~left && ~right) {
	        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
	        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
	      }
	      last = (right > left ? right : left) + 1;
	      i = 0;
	    } else {
	      last = 0;
	    }
	  }
	  return routes;
	}

	var QUERY_SEPARATOR = /\?.*/;

	Router.prototype.configure = function(options) {
	  options = options || {};
	  for (var i = 0; i < this.methods.length; i++) {
	    this._methods[this.methods[i]] = true;
	  }
	  this.recurse = options.recurse || this.recurse || false;
	  this.async = options.async || false;
	  this.delimiter = options.delimiter || "/";
	  this.strict = typeof options.strict === "undefined" ? true : options.strict;
	  this.notfound = options.notfound;
	  this.resource = options.resource;
	  this.history = options.html5history && this.historySupport || false;
	  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
	  this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
	  this.every = {
	    after: options.after || null,
	    before: options.before || null,
	    on: options.on || null
	  };
	  return this;
	};

	Router.prototype.param = function(token, matcher) {
	  if (token[0] !== ":") {
	    token = ":" + token;
	  }
	  var compiled = new RegExp(token, "g");
	  this.params[token] = function(str) {
	    return str.replace(compiled, matcher.source || matcher);
	  };
	  return this;
	};

	Router.prototype.on = Router.prototype.route = function(method, path, route) {
	  var self = this;
	  if (!route && typeof path == "function") {
	    route = path;
	    path = method;
	    method = "on";
	  }
	  if (Array.isArray(path)) {
	    return path.forEach(function(p) {
	      self.on(method, p, route);
	    });
	  }
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  if (Array.isArray(method)) {
	    return method.forEach(function(m) {
	      self.on(m.toLowerCase(), path, route);
	    });
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.insert(method, this.scope.concat(path), route);
	};

	Router.prototype.path = function(path, routesFn) {
	  var self = this, length = this.scope.length;
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.scope = this.scope.concat(path);
	  routesFn.call(this, this);
	  this.scope.splice(length, path.length);
	};

	Router.prototype.dispatch = function(method, path, callback) {
	  var self = this, fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""), invoked = this._invoked, after;
	  this._invoked = true;
	  if (!fns || fns.length === 0) {
	    this.last = [];
	    if (typeof this.notfound === "function") {
	      this.invoke([ this.notfound ], {
	        method: method,
	        path: path
	      }, callback);
	    }
	    return false;
	  }
	  if (this.recurse === "forward") {
	    fns = fns.reverse();
	  }
	  function updateAndInvoke() {
	    self.last = fns.after;
	    self.invoke(self.runlist(fns), self, callback);
	  }
	  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
	  if (after && after.length > 0 && invoked) {
	    if (this.async) {
	      this.invoke(after, this, updateAndInvoke);
	    } else {
	      this.invoke(after, this);
	      updateAndInvoke();
	    }
	    return true;
	  }
	  updateAndInvoke();
	  return true;
	};

	Router.prototype.invoke = function(fns, thisArg, callback) {
	  var self = this;
	  var apply;
	  if (this.async) {
	    apply = function(fn, next) {
	      if (Array.isArray(fn)) {
	        return _asyncEverySeries(fn, apply, next);
	      } else if (typeof fn == "function") {
	        fn.apply(thisArg, (fns.captures || []).concat(next));
	      }
	    };
	    _asyncEverySeries(fns, apply, function() {
	      if (callback) {
	        callback.apply(thisArg, arguments);
	      }
	    });
	  } else {
	    apply = function(fn) {
	      if (Array.isArray(fn)) {
	        return _every(fn, apply);
	      } else if (typeof fn === "function") {
	        return fn.apply(thisArg, fns.captures || []);
	      } else if (typeof fn === "string" && self.resource) {
	        self.resource[fn].apply(thisArg, fns.captures || []);
	      }
	    };
	    _every(fns, apply);
	  }
	};

	Router.prototype.traverse = function(method, path, routes, regexp, filter) {
	  var fns = [], current, exact, match, next, that;
	  function filterRoutes(routes) {
	    if (!filter) {
	      return routes;
	    }
	    function deepCopy(source) {
	      var result = [];
	      for (var i = 0; i < source.length; i++) {
	        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
	      }
	      return result;
	    }
	    function applyFilter(fns) {
	      for (var i = fns.length - 1; i >= 0; i--) {
	        if (Array.isArray(fns[i])) {
	          applyFilter(fns[i]);
	          if (fns[i].length === 0) {
	            fns.splice(i, 1);
	          }
	        } else {
	          if (!filter(fns[i])) {
	            fns.splice(i, 1);
	          }
	        }
	      }
	    }
	    var newRoutes = deepCopy(routes);
	    newRoutes.matched = routes.matched;
	    newRoutes.captures = routes.captures;
	    newRoutes.after = routes.after.filter(filter);
	    applyFilter(newRoutes);
	    return newRoutes;
	  }
	  if (path === this.delimiter && routes[method]) {
	    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
	    next.after = [ routes.after ].filter(Boolean);
	    next.matched = true;
	    next.captures = [];
	    return filterRoutes(next);
	  }
	  for (var r in routes) {
	    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
	      current = exact = regexp + this.delimiter + r;
	      if (!this.strict) {
	        exact += "[" + this.delimiter + "]?";
	      }
	      match = path.match(new RegExp("^" + exact));
	      if (!match) {
	        continue;
	      }
	      if (match[0] && match[0] == path && routes[r][method]) {
	        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
	        next.after = [ routes[r].after ].filter(Boolean);
	        next.matched = true;
	        next.captures = match.slice(1);
	        if (this.recurse && routes === this.routes) {
	          next.push([ routes.before, routes.on ].filter(Boolean));
	          next.after = next.after.concat([ routes.after ].filter(Boolean));
	        }
	        return filterRoutes(next);
	      }
	      next = this.traverse(method, path, routes[r], current);
	      if (next.matched) {
	        if (next.length > 0) {
	          fns = fns.concat(next);
	        }
	        if (this.recurse) {
	          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
	          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
	          if (routes === this.routes) {
	            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
	            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
	          }
	        }
	        fns.matched = true;
	        fns.captures = next.captures;
	        fns.after = next.after;
	        return filterRoutes(fns);
	      }
	    }
	  }
	  return false;
	};

	Router.prototype.insert = function(method, path, route, parent) {
	  var methodType, parentType, isArray, nested, part;
	  path = path.filter(function(p) {
	    return p && p.length > 0;
	  });
	  parent = parent || this.routes;
	  part = path.shift();
	  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
	    part = regifyString(part, this.params);
	  }
	  if (path.length > 0) {
	    parent[part] = parent[part] || {};
	    return this.insert(method, path, route, parent[part]);
	  }
	  if (!part && !path.length && parent === this.routes) {
	    methodType = typeof parent[method];
	    switch (methodType) {
	     case "function":
	      parent[method] = [ parent[method], route ];
	      return;
	     case "object":
	      parent[method].push(route);
	      return;
	     case "undefined":
	      parent[method] = route;
	      return;
	    }
	    return;
	  }
	  parentType = typeof parent[part];
	  isArray = Array.isArray(parent[part]);
	  if (parent[part] && !isArray && parentType == "object") {
	    methodType = typeof parent[part][method];
	    switch (methodType) {
	     case "function":
	      parent[part][method] = [ parent[part][method], route ];
	      return;
	     case "object":
	      parent[part][method].push(route);
	      return;
	     case "undefined":
	      parent[part][method] = route;
	      return;
	    }
	  } else if (parentType == "undefined") {
	    nested = {};
	    nested[method] = route;
	    parent[part] = nested;
	    return;
	  }
	  throw new Error("Invalid route context: " + parentType);
	};



	Router.prototype.extend = function(methods) {
	  var self = this, len = methods.length, i;
	  function extend(method) {
	    self._methods[method] = true;
	    self[method] = function() {
	      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
	      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
	    };
	  }
	  for (i = 0; i < len; i++) {
	    extend(methods[i]);
	  }
	};

	Router.prototype.runlist = function(fns) {
	  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
	  if (this.every && this.every.on) {
	    runlist.push(this.every.on);
	  }
	  runlist.captures = fns.captures;
	  runlist.source = fns.source;
	  return runlist;
	};

	Router.prototype.mount = function(routes, path) {
	  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
	    return;
	  }
	  var self = this;
	  path = path || [];
	  if (!Array.isArray(path)) {
	    path = path.split(self.delimiter);
	  }
	  function insertOrMount(route, local) {
	    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
	    if (isRoute) {
	      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
	      parts.shift();
	    }
	    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
	      local = local.concat(parts);
	      self.mount(routes[route], local);
	      return;
	    }
	    if (isRoute) {
	      local = local.concat(rename.split(self.delimiter));
	      local = terminator(local, self.delimiter);
	    }
	    self.insert(event, local, routes[route]);
	  }
	  for (var route in routes) {
	    if (routes.hasOwnProperty(route)) {
	      insertOrMount(route, path.slice(0));
	    }
	  }
	};



	}(true ? exports : window));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ }
]);