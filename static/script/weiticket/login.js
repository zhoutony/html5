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
		CodeNumber = $('#CodeNumber'),
		BtnLogin   = $('#BtnLogin')
	TabNav.on('click',function(evt){
		$(this).addClass("curr").siblings().removeClass();
		TabCon.eq(TabNav.index(this)).show ().siblings ().hide (); 
	})
	if(TelBox.val() !== '' || CodeNumber.val() !== ''){
alert('请输入电话号！');
	}
	BtnLogin.on('click',function(evt){

		if(TelBox.val() == ''){
 			alert('请输入电话号！');
			return false;
		} else if(CodeNumber.val() == ''){
			alert('请输入密码！');
			return false;
		} else{
			
		}

	})
	  
	 

}); //END of jquery documet.ready 