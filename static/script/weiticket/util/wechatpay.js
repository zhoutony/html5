/**
 * Created by gaowhen on 15/1/9.
 */
define([
    '../../util/modal'
], function(
    Modal
) {

    function wechatPay(param, redirectUrl, modal) {
        redirectUrl = redirectUrl || '';

        //alert('==== call wechat pay ====');
        window.WeixinJSBridge.invoke('getBrandWCPayRequest', param, function (res) {
            modal.hide();

            var _modal = new Modal();
            //alert(JSON.stringify(res));

            if (res.err_msg == 'get_brand_wcpay_request:ok' || res.err_msg == 'get_brand_wcpay_request:finished') {
                //支付成功处理代码
                if (redirectUrl) {
                    location.href = redirectUrl;
                }
            } else if (res.err_msg == 'system:access_denied') {
                _modal.show({
                    body: '支付请求被拒绝',
                    type: 'alert'
                });
            } else if (res.err_msg !== 'get_brand_wcpay_request:cancel') {
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
                });
            }
        });
    }

    return wechatPay;
});