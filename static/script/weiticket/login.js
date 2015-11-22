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
	    
	// tab 切换
	TabNav.on('click',function(){
		$(this).addClass("curr").siblings().removeClass();
		TabCon.eq(TabNav.index(this)).show().siblings().hide();
	})

	// 验证手机号
	function VerMobile(str){
		var retel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(retel.test(str)){
			 alert("正确");	
		} else {
			alert("错误");
		}
	}
	// 登陆
	BtnLogin.on('click',function(){
		var value = TelBox.val();
		 VerMobile(value);
	})
 
	 
}); //END of jquery documet.ready 