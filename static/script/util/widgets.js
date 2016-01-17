/**
 * Created by gaowhen on 15/1/9.
 */
define([
        '../lib/zepto.js',
        '../lib/underscore',
        '../util/modal',
        '../util/cookie',
        '../lib/director'
    ], function ($,
                 _,
                 Modal,
                 cookie,
                 director,
                 dialogs) {

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

        //判断是否在微信里
        function is_weixn(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                return true;
            } else {
                return false;
            }
        }

        function barToolMethod(){
            var bartool = $('.bartool');
            if(bartool.length > 0){
                bartool.on('click', function(evt){
                    var _el = $(this),
                        publicsignal = window.publicsignal ? window.publicsignal : '';
                    _el.addClass('zoomOut');
                    _el.addClass('animated');
                    setTimeout(function(){
                        location.href = '/' + publicsignal;
                    }, 800)
                })
            }

            //  导读
            var piaoyouguide = $('._piaoyouguide');
            if(piaoyouguide.length > 0){
                piaoyouguide.on('click', function(evt){
                    
                    if(!window.isPiaoyouGuide){
                        window.isPiaoyouGuide = true;
                        window.piaoyouGuide();
                    }
                })
            }

             
        }

        function shearCallback(publicsignal, openId, sourceId, shareType, callback){
            // alert(openId);
            var url = '/yesunion/sharecallback';
            var options = {
                openId: openId,
                id: sourceId,
                shareType: shareType,
                wxtype: publicsignal
            };
            
            $.post(url, options, function(result) {
                // alert(result);
                if (result && result.data) {
                    var return_data = JSON.parse(result.data);
                    if(return_data.success){
                        callback && callback(true);
                    }else{
                        callback && callback(false);
                    }
                }
            })
        }

        barToolMethod();
        return {
            strShort: strShort,
            getIsMembershipCard: getIsMembershipCard,
            getIsEcoupons: getIsEcoupons,
            physicsBack: physicsBack,
            physicsGoBack: physicsGoBack,
            getCurrentPosition: getCurrentPosition,
            iScrollClick: iScrollClick,
            is_weixn: is_weixn,
            barToolMethod: barToolMethod,
            shearCallback: shearCallback
        };
    }
)
;