define([
    '../lib/zepto.js',
    '../lib/underscore',
    '../lib/deferred',
    '../util/session_cache.js',
    '../lib/iscroll',
    '../util/modal',
    '../util/widgets',
    '../util/cookie.js'
], function ($,
             _,
             Deferred,
             cache,
             iScroll,
             Modal,
             widgets,
             cookie) {

    cache.publicSignal(publicsignalshort).then(function (publicSignal) {
        window.document.title = publicSignal.publicSignalName;
    });

    //解绑按钮开关
    var isUnbindLock = false;

    //代金券开关
    var hasEcoupons = widgets.getIsEcoupons();
    if (hasEcoupons) {
        $('li.ecoupons').removeClass('m-hide');
    }

    var cinemaId = $(".cinema-id").data("cinemaid");
    var cardId = $(".mber-card-details").data("cardid");

    var setModalInner = function (modal, html) {
        var $wrapper = modal;
        var $inner = $wrapper.find(".inner");
        $inner.html(html);
    };

    var closeModal = function () {
        $(".wrapper").addClass("m-hide");
        $('.m-modal-full').addClass('m-hide');
        setTimeout(function () {
            isClickBtn = true;
        }, 1000);
    };

    var showModal = function () {
        $(".wrapper").removeClass("m-hide");
    };

    var getCardRecord = function () {
        var loadingModal = new Modal();
        loadingModal.show({
            body: '加载中...',
            type: 'tip'
        });
        var url = '/' + publicsignalshort + '/cardrecord/' + cardId;
        $.get(url, function (cardRecord) {
            loadingModal.hide();
            setModalInner($(".wrapper"), cardRecord);
            showModal();

            //给“解除绑定”和“使用会员卡”添加事件或者Url
            setUnbindEvent();

            iScrollMethod();
        });
    };

    //clickbtn 开关
    var isClickBtn = true;

    var getCardInfo = function () {
        cardId = $(this).data("cardid");
        cardInfoMethod();
    };

    function cardInfoMethod() {
        isClickBtn = false;
        var loadingModal = new Modal();
        loadingModal.show({
            body: '加载中...',
            type: 'tip'
        });
        var url = '/' + publicsignalshort + '/member/cardinfo/' + cinemaId + '/' + cardId;
        $.get(url, function (cardInfo) {
            //阻止事件冒泡
            $("._stop_").on("click", function (e) {
                if (!isClickBtn) e.preventDefault();
            });
            loadingModal.hide();
            setModalInner($(".wrapper"), cardInfo);
            showModal();
            var cardIntro = $('#cardIntro'),
                cardIntroData = cardIntro.data('intro');
            cardIntro.append(cardIntroData);

            //给“解除绑定”和“使用会员卡”添加事件或者Url
            setUnbindEvent();

            iScrollMethod();
        });
    }

    //解除绑定
    var unbindCard = function () {
        if(!isUnbindLock) {
            isUnbindLock = true;
            $(".unbind").removeClass('orangered').addClass('disabled');
            var options = {};
            options.public_signal_short = publicsignalshort;
            options.open_id = $.parseJSON(cookie.getItem('open_id').replace('j:', '')).openid;
            options.card_id = cardId;
            var url = '/' + publicsignalshort + '/member/unbindingcard';
            $.post(url, options, function (data) {
                if (data.err) {
                    var loadingModal = new Modal();
                    loadingModal.show({
                        body: data.err,
                        type: 'tip'
                    });
                    setTimeout(function () {
                        isUnbindLock = false;
                        loadingModal.hide();
                        $(".unbind").removeClass('disabled').addClass('orangered');
                        return;
                    }, 2000);
                }
                else {
                    window.sessionStorage.setItem('card_id', cardId);
                    window.sessionStorage.setItem('bindingCardPhone', data.data.phone);
                    $(".unbind").removeClass('disabled').addClass('orangered');
                    location.href = '/' + publicsignalshort + "/member/checkunbincard";
                }
            });
        }
    };

    //给“解除绑定”和“使用会员卡”添加事件或者Url
    function setUnbindEvent() {
        $('.unbind2').attr('href', '/' + publicsignalshort + '/choose_cinema/');
        $(".unbind").on("tap", "a", unbindCard);
    }

    function iScrollMethod() {
        var $cardinfo = $('._iscroll'),
            wrapper, holderIScroll;

        $cardinfo.css({position: 'relative', height: document.documentElement.offsetHeight - 180, overflow: 'hidden'});
        holderIScroll = new iScroll($cardinfo[0], {
            useTransition: false, //transition导致IOS下闪
            scrollX: true,
            scrollY: true,
            preventDefault: true,
            scrollbars: false,
            momentum: true,
            bounceTime: 300,
            bindToWrapper: true
        });
    }

    $(".recharge-card").on("tap", ".mber-card-details", getCardInfo);
    $(".has-mcard").on("tap", "li", getCardInfo);
    $(".wrapper").on("tap", ".close", closeModal);
    $(".wrapper").on("tap", ".mber-record", getCardRecord);
    $(".wrapper").on("tap", ".mber-info", cardInfoMethod);
});