define([
    '../lib/zepto.js',
    '../lib/underscore',
    '../lib/deferred',
    '../util/session_cache.js',
    '../lib/iscroll',
    '../util/modal',
    '../util/widgets'
], function ($, _, Deferred, cache, iScroll, Modal, widgets) {
    cache.publicSignal(publicsignalshort).then(function (publicSignal) {
        window.document.title = publicSignal.publicSignalName;
    });

    //会员卡开关
    var hasMember = widgets.getIsMembershipCard();
    if (hasMember) {
        $('li._member_').removeClass('m-hide');
    }

    //clickbtn 开关
    var isClickBtn = true;

    //处理当没有代金券时，提示信息高度
    var errP = $('.err-p');
    if (errP.length > 0) {
        $('.ecou-box-list').css({paddingTop: 0, paddingBottom: 0});
    }

    //加载列表点击事件
    $(".ecou-list").on("tap", "li", function (evt) {
        var targetEl = evt.currentTarget;
        var code = $(targetEl).attr("code");
        var isuse = $(targetEl).attr("isuse");
        var url = '/' + publicsignalshort + "/member/ecouponsinfo/" + code;

        isClickBtn = false;

        //初始化‘加载中’
        var loadingModal = new Modal();
        loadingModal.show({
            body: '加载中...',
            type: 'tip'
        });

        //获取代金券详情
        $.get(url, function (ecouponsInfo) {
            //关闭‘加载中’
            loadingModal.hide();

            //阻止事件冒泡
            $("._stop_").on("click", function (e) {
                if (!isClickBtn) e.preventDefault();
            });

            //显示弹层
            var _$wrapperInner = $('.wrapper').find('.inner').html(ecouponsInfo);
            $(".wrapper").removeClass("m-hide");
            $('.ecou-detail-full').removeClass('m-hide');

            //给详情弹层加载滚动条
            iScrollMethod();

            //顶部灰条点击事件
            $(".wrapper").on("tap", ".close", hideWrapper.bind(this));

            //底部 返回 按钮点击事件
            $(".wrapper").on("tap", ".btn-box", function () {
                if (isuse == 1) {
                    //跳转 到影院首页
                    var cinemaId = $(this).attr('cinemaid');
                    location.href = '/' + publicsignalshort + '/cinema/' + cinemaId;
                }
                else hideWrapper();
            });
        });
    });

    //隐藏灰层
    function hideWrapper() {
        $(".wrapper").addClass("m-hide");
        $('.ecou-detail-full').addClass('m-hide');

        setTimeout(function () {
            isClickBtn = true;
        }, 1000);
    }

    //弹窗后 防止底部页面滚动
    function iScrollMethod() {
        var $ecouponsinfo = $('._iscroll'), wrapper, holderIScroll;
        $ecouponsinfo.css({
            position: 'relative',
            height: document.documentElement.clientHeight - 110,
            overflow: 'auto'
        });
        holderIScroll = new iScroll($ecouponsinfo[0], {
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
});