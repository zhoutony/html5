/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var countdown = require('./util/countdown');
var cache = require('../util/session_cache.js');
var modal = require('../util/modal');
var iScroll = require('../lib/iscroll');
var cookie = require("../util/cookie.js");
var EcouponPayMent = require("./modul/ecoupon_payment.js");
var widgets = require("../util/widgets.js");
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
