/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var widgets = require('../util/widgets.js');

/* jshint ignore:end */
$(document).ready(function() {
    //定位城市
    function getCurrentPosition () {
        //this.$currentCity.html('正在定位...');
        widgets.getCurrentPosition(function (coords) {
            // alert(coords.longitude);
            $.get('/queryLocation/' + coords.longitude + '/' + coords.latitude, function(render_data){
                if(render_data && render_data.location){
                    alert(render_data.location.nameCN);
                }
            })
            // ajax.get('/GetCityByLongitudelatitude.api?longitude=' + coords.longitude + '&latitude=' + coords.latitude, _.bind(function (city) {
            //     if (city && city.cityId) {
            //         app.user.setCity(city.cityId, city.name);
            //         this.$currentCity.html(city.name);
            //         this.$currentCity.attr('data-id', city.cityId);
            //         this.$currentCity.attr('data-name', city.name);
            //     }
            // }, this), 'json');
        }, function () {
            //this.$currentCity.html('定位失败');
        });
    }
    getCurrentPosition();

}); //END of jquery documet.ready 