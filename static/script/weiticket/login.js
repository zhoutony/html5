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
	var TabNav = $('.tabnav li');
	var TabCon = $(' .tabbox')
	TabNav.on('click',function(evt){
		$(this).addClass("curr").siblings().removeClass();
		TabCon.eq(TabNav.index(this)).show ().siblings ().hide (); 
	})
	  
	 

}); //END of jquery documet.ready 