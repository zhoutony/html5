/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');
var widgets = require('../util/widgets.js');

/* jshint ignore:end */
$(document).ready(function() {
    if(window.newscontent){
    	var _html = JSON.stringify(window.newscontent)
        $('._txt').html(window.newscontent);
    }

    if(window.title){
    	$('.infotit').html('<div>'+window.title+'</div>');
    }
    if(!widgets.is_weixn()){
    	$('.sharetoolbox').removeClass('m-hide');
    }
    
}); //END of jquery documet.ready 
