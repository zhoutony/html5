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
	var TabNav     = $('.tabnav li'),
		TabCon     = $(' .tabbox'),
		TelBox     = $('#TelBox'),
		CodeNumber = $('#CodeNumber')
	// tab 切换
	TabNav.on('click',function(){
		$(this).addClass("curr").siblings().removeClass();
		TabCon.eq(TabNav.index(this)).show().siblings().hide();
	});

	
	 
}); //END of jquery documet.ready 