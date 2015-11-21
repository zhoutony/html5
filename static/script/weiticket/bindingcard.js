/*
 * Created by yuanhaixiong on 2015/5/
 */
define([
    '../lib/zepto.js',
    '../lib/underscore',
    '../lib/deferred',
    '../util/session_cache.js',
    '../lib/iscroll',
    '../util/modal'
], function ($,
             _,
             Deferred,
             cache,
             IScroll,
             Modal) {

    cache.publicSignal(publicsignalshort).then(function (publicSignal) {
        window.document.title = publicSignal.publicSignalName;
    });

    // var isAccount;
    // var isPassword;

    var openCinema;
    var openCinemaList;
    var openCinemaDl;
    var openCinemaInput;
    var openCinemaNo;
    var cinemas;

    var memberCardSignals = ["jydy"];
    var cinemaId = $(".cinema-id").data("cinemaid");
    var cardId = $(".mber-card-details").data("cardid");
    var isAccount = isPassword = false,
        patt = /[^\w\.\/]/ig,
        $account = $('input[name="cardId"]'),
        $password = $('input.pwd-card'),
        $submit = $('a.btn-hollow'),
        $infoTip = $('#infoTip');

    $
    (".binding-tips").on('tap', function () {
        $(".mcard-tips").removeClass("m-hide");
        $(".full-screen").removeClass("m-hide");
    });

    $(".know-btn").on('tap', function () {
        $(".full-screen").addClass("m-hide");
        $(".mcard-tips").addClass("m-hide");
    });

    $submit.on('tap', function (evt) {
        evt.preventDefault();
        var accountTxt = $account.val(),
            passwordTxt = $password.val();

        if (_.isUndefined(accountTxt) || accountTxt === '') {
            $infoTip.html('请输入卡号');
            return;
        }
        if (_.isUndefined(passwordTxt) || passwordTxt === '') {
            $infoTip.html('请输入密码');
            return;
        }
        // if (hasMemberCard()) {
        if ((_.isUndefined(openCinemaNo) || openCinemaNo === '')) {
            $infoTip.html('请输入开卡影院');
            return;
        }
        // }
        var loadingModal = new Modal();
        loadingModal.show({
            body: '加载中...',
            type: 'tip'
        });

        var options = {};
        options.public_signal_short = publicsignalshort;
        options.cinema_no = cinemaNo ? cinemaNo : openCinemaNo;
        options.open_id = openId;
        options.card_id = accountTxt;
        options.card_pass = passwordTxt;
        options.open_cinema_no = openCinemaNo || "";

        $.post('/' + publicsignalshort + '/member/bindingcard', options, function (render_data) {
            loadingModal.hide();
            var data = render_data.data;
            if (!data) {
                $infoTip.html(render_data.err);
                return;
            } else {
                if (data.phone) {
                    window.sessionStorage.setItem('bindingCardPhone', data.phone);
                    window.sessionStorage.setItem('isBind', 1); //是否是绑定：0-默认 1-绑定 2-解绑
                    location.href = '/' + publicsignalshort + "/member/checkbincard";
                } else {
                    //非储值卡不需要短信验证，直接跳转会员卡首页
                    location.href = '/' + publicsignalshort + '/member/mycards';
                }
            }
        });
    });

    //增加开卡影院
    function openCinemaFn() {
        openCinema = $('#openCinema');
        openCinemaList = openCinema.find('.c-list');
        openCinemaDl = openCinema.find('dl');
        openCinemaInput = openCinema.find('input');

        //if (hasMemberCard()) {
        getCinemas(publicsignalshort, function (res) {
            if (res) {
                if (res.length === 1) {
                    openCinemaNo = res[0].CinemaNo || "";
                    return
                }
                openCinemaInput.on('propertychange input', openCinemaInputChange);
                openCinemaList.on("tap", cinemaTap);

                openCinema.removeClass('m-hide');
                resetCinemaResultHeight(res.length);
                openCinemaDl.html(renderCinemas(res));
            }
        });
        //}
    }

    function hasMemberCard() {
        return memberCardSignals.indexOf(publicsignalshort) >= 0;
    }

    function cinemaTap(e) {
        var cinema = $(e.target);
        var cinemano = $(cinema).attr("cinemano") || "";

        openCinemaInput.val(cinema.html());
        openCinemaNo = cinemano;

        openCinemaList.addClass("m-hide");
    }

    function resetCinemaResultHeight(cinemaCount) {
        if (cinemaCount && cinemaCount > 0) {
            var cinemaCount = cinemaCount > 10 ? 10 : cinemaCount;
            var height = openCinemaList.find("dt").not(".m-hide").first().height();
            var totalHeight = cinemaCount * height;
            if (cinemaCount >= 10)
                openCinemaDl.css({overflow: 'scroll', height: totalHeight + 'px'});
            else
                openCinemaDl.css({overflow: 'hidden', height: totalHeight + 'px'});
        }
    }

    function openCinemaInputChange(evt) {
        var inputVal = this.value;
        var dts = openCinemaDl.find('dt');
        var val;
        var num = 0;
        if (inputVal !== '') {
            dts.map(function (key, item) {
                val = item.innerHTML;
                if (val.indexOf(inputVal) >= 0) {
                    if (openCinemaList && openCinemaList.hasClass('m-hide')) {
                        openCinemaList.removeClass('m-hide');
                    }
                    item.className = '';
                    num++;
                }
            });
        }
        if (num === 0) {
            if (openCinemaList && !openCinemaList.hasClass('m-hide')) {
                openCinemaList.addClass('m-hide');
            }
            dts.map(function (key, item) {
                item.className = 'm-hide';
            });
        }
        var cinemaCount = openCinemaList.find("dt").not(".m-hide").length;
        resetCinemaResultHeight(cinemaCount);
    }

    function renderCinemas(cinemas) {
        var html = [];
        _.map(cinemas, function (item) {
            html.push('<dt class="m-hide" cinemano="' + item.CinemaNo + '">' + item.CinemaName + '</dt>');
        });
        return html.join("");
    }

    function getCinemas(signal, callback) {
        if (cinemas) return callback(cinemas);
        $.post('/' + signal + '/member/bindingcard/opencinema', {}, function (res) {
            cinemas = res.data;
            if (cinemas) callback(cinemas);
        });
    }

    openCinemaFn();
});