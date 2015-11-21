define([
    '../lib/zepto.js',
    '../lib/underscore',
    '../lib/deferred',
    '../util/session_cache.js',
    '../lib/iscroll',
    '../util/cookie',
    '../util/widgets'
], function ($,
             _,
             Deferred,
             cache,
             IScroll,
             cookie,
             widgets) {
    cache.publicSignal(publicsignalshort).then(function (publicSignal) {
        window.document.title = publicSignal.publicSignalName;
    });
    //会员卡开关
    var hasMember = widgets.getIsMembershipCard();
    if (hasMember) {
        $('li._member_').removeClass('m-hide');
    }

    //代金券开关  
    var hasEcoupons = widgets.getIsEcoupons();
    if (hasEcoupons) {
        $('li.ecoupons').removeClass('m-hide');
    }

    if (hasMember || hasEcoupons) {
        $('.nav-myIcoSub').removeClass("m-hide");
    }

    var stateCN = {
        '6': '已发码',
        '20': '已出票',
        '21': '退款中',
        '22': '退款已经驳回',
        '23': '已退款',
        '2': '未发码',
        '11': '发码失败',
        '25': '未支付',
        '26': '出票失败，请联系影院手动退款'
    };

    var pageDeferred = new _.Deferred();
    var myScroll = null;

    //是否开启二维码功能，0为关闭二维码，1为开启二维码
    var isQrcode = sessionStorage.getItem("isQrcode");
    if (isQrcode != 0) {
        $("a.ico-2code").removeClass("m-hide");
    }

    var cdkey = $(".ico-2code").attr("data-cd-key");
    //var cinemaTelephone = $(".order-details").attr("data-order-tele");

    var orderAddr = $(".order-details").attr("data-order-addr");

    $("mark.order-state").each(function (index, mark) {
        var $mark = $(mark);
        var markText = '(' + stateCN[$mark.data('state')] + ')';
        if (markText.indexOf('undefined') == -1) {
            $mark.html(markText);
        } else {
            $mark.html('');
        }
    });
    // $(".ico-2code").on("tap", function(evt){
    //     var code = $(this).attr("data-cd-key");
    //     $(".QRCode img").attr('src', "http://cgi.piao.qq.com/cgi-bin/piao/code/qr.fcg?d=" + code);
    //     $(".QRCode").show();
    // });
    $(".close").on("tap", function () {
        $(".QRCode").hide();
    });

    //clickbtn 开关
    var isClickBtn = true;

    $(".m-list").on("tap", "._list_", function (evt) {
        var targetEl = evt.target;
        if ($(targetEl).hasClass('ico-2code')) {
            var code = $(targetEl).attr("data-cd-key");
            $(".QRCode img").attr('src', "http://cgi.piao.qq.com/cgi-bin/piao/code/qr.fcg?d=" + code);
            $(".QRCode").show();
            $('.mask').css({height: document.documentElement.offsetHeight + 40});
            return;
        }
        var el = $(this).find('.order-details');
        var orderId = el.attr("data-order-id");
        var url = '/' + publicsignalshort + "/order/" + orderId;
        var cinemaTelephone = el.attr("data-order-tele")
        //var cinemaTelephone = $(this).attr("data-order-tele");
        var cdkey = el.attr("data-order-cdkey");
        orderAddr = el.attr("data-order-addr");

        isClickBtn = false;

        //获取订单详情
        $.get(url, function (orderDetails) {
            //阻止事件冒泡
            $("._stop_").on("click", function (e) {
                if (!isClickBtn) e.preventDefault();
            });

            var _$wrapper = $('.m-modal-full').find('.wrapper');
            _$wrapper.find('.inner').html(orderDetails);

            $(".order-id").html(orderId);
            $(".order-addr").html(orderAddr);
            if (cinemaTelephone) {
                var teleLink = 'tel:' + cinemaTelephone;
                $(".ic-tele").attr("href", teleLink);
                $(".cinema_telephone").html(cinemaTelephone);
            }

            if (cdkey.indexOf('|') === -1) {
                $(".code-block").hide();
            } else {
                $(".cd-key").hide();
                var serialNumber = cdkey.split("|")[0];
                var verificationCode = cdkey.split("|")[1];
                $(".serial-number").html(serialNumber);
                $(".verification-code").html(verificationCode);
            }
            if (isQrcode != 0) {
                $('#sCode').removeClass('m-hide');
                $('#sCodetxt').removeClass('m-hide');
            }

            _$wrapper.css({
                position: 'relative',
                height: '100%',
                overflow: 'auto',
                webkitoverflowscrolling: 'touch'
            });
            /*if (!myScroll) {
             myScroll = new IScroll(
             _$wrapper[0], {
             useTransition: false, //transition导致IOS下闪
             scrollbars: false,
             preventDefault: true,
             bounceTime: 30,
             bindToWrapper: true
             }
             );
             }*/
        });

        $(".m-modal-full").removeClass("m-hide");
        //$(".m-m-footer").hide();
    });

    $(".close").on("tap", function () {
        $(".m-modal-full").addClass("m-hide");
        setTimeout(function () {
            isClickBtn = true;
        }, 1000);
    })

    var isFromPay=document.referrer.indexOf("payment")>0;
    if (isFromPay) {
        widgets.physicsBack(function () {
            location.href=String.format( "/{0}/choose_cinema",publicsignalshort);
        },false);
    }
})
