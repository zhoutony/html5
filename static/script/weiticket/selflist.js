/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var iScroll = require('../lib/iscroll');
var _ = require('../lib/underscore');
var cache = require('../util/session_cache.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var Util = require('../util/widgets.js');
var wxbridge = require('../util/wxbridge');
var dialogs = require('../util/dialogs');
// var Citys = require('./citys');
var ChooseCity = require('../util/chooseCity');

/* jshint ignore:end */
$(document).ready(function() {
     var join  = $('.scrollselful li')
     var joinlen = join.length();
     for(var i  = 0, i<joinlen, i++){
        _this = $(this);
        _this[i].on('click',function(){
           _this[i].addClass('join') 
        })
     }
     

}); //END of jquery documet.ready
