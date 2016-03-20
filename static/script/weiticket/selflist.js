var $ = require('../lib/zepto.js');
var _ = require('../lib/underscore');
var Vue = require('vue');

function modifySource (item) {
    item.isSubscribe = item.isSubscribe === 'true';
}

$(function () {
    var sourceInfo = window.sourceInfo || {};
    var newsSourceInfos = sourceInfo.newsSourceInfos || [];
    var topNewsSourceInfos = sourceInfo.topNewsSourceInfos || [];
    
    var data = {};

    // 处理一下后端传递的数据
    data.newsSourceInfos = _.uniq((newsSourceInfos || []).concat(topNewsSourceInfos || []), function (infoA, infoB) {
        return infoA.sourceID;
    });
    
    _.each(data.newsSourceInfos, function (info) {
        var finded = _.find(topNewsSourceInfos, function (topInfo) {
            return topInfo.sourceID === info.sourceID;
        });

        if (finded) {
            info.isTop = true;
        }

        // 更改是否订阅的数据类型
        info.isSubscribe = info.isSubscribe === 'true';
    });
    
    // 添加 tab 切换数据
    data.currentTab = 'all';
    
    new Vue({
        el: '.wrap',
        data: data,
        methods: {
            toggleSubscribe: function (event) {
                var sourceId = parseInt($(event.currentTarget).attr('data-id'), 10);
                
                var source = _.find(
                    this.newsSourceInfos, 
                    function(info){ 
                        return info.sourceID === sourceId; 
                    }
                );
                var isSubscribe = source.isSubscribe;
                var action = (isSubscribe ? 'unsubscribe' : 'subscribe'); 
                
                $.get('/selflist/' + action + '/' + sourceId, function (res) {
                    if (!res.err) {
                        _.each(this.newsSourceInfos, function (info) {
                            if (info.sourceID === sourceId) {
                                info.isSubscribe = !isSubscribe;
                            }
                        });
                    }
                }.bind(this))
            },
            
            changeTab: function (tab) {
                this.currentTab = tab;
            }
        }
    })
});
