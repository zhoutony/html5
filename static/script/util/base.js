/*
 * Base库
 * 一些基础的函数放在这里
 * Created by Qu Yizhi on 2015/4/
 */

define([
    '../lib/zepto',
    '../lib/underscore'
], function(
    $,
    _
) {

   function bindObj(obj, key) {
        return function() {
            return obj[key].apply(obj, arguments)
        };
    }

    return {
        bind: bindObj
    }
});