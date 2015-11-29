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
	})

	// 验证手机号
	function VerMobile(str){
		var retel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(retel.test(str) && $('#TelBox').val() == '1'){
			var _el = $(TelBox.parentElement);
			_el.addClass('focus');
			 alert('正确');
		} else {
			 var _el = $(TelBox.parentElement);
		     _el.addClass('eorr');
		     alert('请输入正确的手机号码！');
		}
	};
	//手机号
	TelBox.focus(function(){
		 var _el = $(this.parentElement);
		 _el.addClass('focus');
		  
	})
	//手机号
	TelBox.blur(function(){
		 var _el = $(this.parentElement);
		 var TelBoxvalue = TelBox.val();
		 _el.removeClass('focus');
		 VerMobile(TelBoxvalue);
		  
	})
	//验证码
	CodeNumber.focus(function(){
		  var _el = $(this.parentElement);
		 _el.addClass('focus');
		  
	})
	// 登陆
	BtnLogin.on('click',function(){
		var TelBoxvalue = TelBox.val();
		VerMobile(TelBoxvalue);
		 
		 
		

	})
	 
}); //END of jquery documet.ready 