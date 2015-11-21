/*
 * Created by cdmatom on 2015/7/
 */
define(['../../lib/zepto.js','../../lib/underscore','../../util/modal', '../../util/cookie.js', '../../lib/iscroll'],
    function($, _, Modal, cookie, iScroll) {
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
    }
); //END of ecoupon_payment.js