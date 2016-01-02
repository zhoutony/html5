/*
 * Created by yhx at 2015/11/11
 *
 *
 *  var Dialogs = require('../util/dialogs.js');
 *
 *  Dialogs.tip('好的<br>我们的爱');

 *  Dialogs.alert('特惠票每人限购2张，超出票的票价为<span>80.0元/张</span>请仔细核对', function(){console.log(1)}, 'OK');
 *  Dialogs.pop('热烈庆祝八一建军节', '这是一个武功绝伦的女刺客，最后，却无法杀人的故事。 中国的唐代，女刺客聂隐娘（舒淇 饰）是将门之女，十岁那年被师父带走训练成顶尖杀手，专门刺杀残暴的藩镇节度使，在一次刺杀任务失败后，师父将她送回故乡，这次，她要行刺的目标是北方最强大的藩镇节度使，她的表兄情，这一切，都在向她挑战。做为一名训练有素的刺客，她将如何执行师父的圣谕？');
 */

var $ = require('../lib/zepto');
var _ = require('../lib/underscore');
var Deferred = require('../lib/deferred');

$(document).ready(function() {
	var body = document.body,
		index = 100;
	 /**
	 * 显示一个简短tip
	 *
	 * @param message {String} 提示信息
	 * @param canDelayClose {boolean} 布尔类型，可选，默认为正常模式
	 * @param delay {Number} 多少毫秒后延时关闭，可选，默认为2秒
	 *
	 * @return closeTip {Function} 可以关闭tip的函数
	 * _container 为指定容器
	 */
	function tip(message, canDelayClose, delay, _container) {
		var html = '', tipObj = {}, container = _container ? _container : body, _tip, tipTimeout;

		_tip = $('<section class="prompt-pop-up transition"></section>').html(message).css({ zIndex: requestZIndex(), opacity: 0 }).appendTo(container);
		setTimeout(function(){
			_tip.addClass('m-show').css({opacity: 1});
		}, 20);
		if (!canDelayClose) {
			delay = delay || 2e3;
			tipTimeout = setTimeout(function () {
				_tip.css({opacity: 0});
				setTimeout(function(){
					_tip.remove();
				}, 500)
			}, delay);
		}

		return function (options) {
			tipTimeout && clearTimeout(tipTimeout);
			_tip.css({opacity: 0});
			
			if(options){
				_tip.remove();
			}else{
				delay = delay || 2e3;
				tipTimeout = setTimeout(function () {
					_tip.css({opacity: 0});
					setTimeout(function(){
						_tip.remove();
					}, 500)
				}, delay);
			}
		};
	}


	/**
	* 弹出框    pop
	* title    标题
	* message  内容
	*
	**/
	function pop(message, _container){
		var html = '', tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn,
			template = '<div class="maskbtn "><a class="btn_close"><i class="demo-icon  icon-cancel"></i></a></div><div class="maskother flex">{0}</div>';

		_el = $('<div class="mask flexbox_v"><div>').html(String.format( template, message)).css({ zIndex: requestZIndex() }).appendTo(container);
		closebtn = _el.find('.btn_close');
		closebtn.on('tap', function() {
			_el.remove();
		});
	}


	/**
	* 提示框    alert
	* 
	* message  内容
	*
	* callback
	**/
	function alert(message, callback, btnLabel, _container){
		btnLabel = btnLabel || '确定';
		var html = '', tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn,
			template = '<section class="pop-wrapper m-ide"><section class="mask"></section><section class="pop-btn-box"><div class="mod-bd">{0}</div><div class="btn-solid btn-theme">{1}</div></section></section>';

		_el = $('<section class="pop-wrapper"><section>').html(String.format( template, message, btnLabel )).css({ zIndex: requestZIndex() }).appendTo(container);
		closebtn = _el.find('.btn-solid');
		closebtn.on('tap', function() {
			callback && callback();
			_el.remove();
		});
	}


	/**
	 * 确认弹出框
	 *
	 * @param message {String} 显示的信息
	 * @param yesCallback {Function} 点击确定的回调
	 * @param noCallback {Function} 点击取消的回调
	 * @param yesBtnLabel {String} 确定按钮的显示文字,可选
	 * @param noBtnLabel {String} 取消按钮的显示文字,可选
	 *
	 * @return dialog {Object} 确认弹出框实例
	 */
	function confirm(message, yesCallback, noCallback, yesBtnLabel, noBtnLabel, _container) {
		yesBtnLabel = yesBtnLabel || '确定';
		noBtnLabel = noBtnLabel || '取消';
		var html = '', tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn,
			template = '<section class="pop-wrapper m-ide"><section class="mask"></section><section class="pop-btn-box"><div class="mod-bd">{0}</div><div class="btns"><div class="btn-solid btn-theme fl">{1}</div><div class="btn-solid btn-theme fr">{2}</div></div></section></section>';

		_el = $('<section class="pop-wrapper"><section>').html(String.format( template, message, yesBtnLabel, noBtnLabel )).css({ zIndex: requestZIndex() }).appendTo(container);
		yesbtn = _el.find('.fl');
		nobtn = _el.find('.fr');
		yesbtn.on('tap', function() {
			yesCallback && yesCallback();
			_el.remove();
		});

		nobtn.on('tap', function() {
			noCallback && noCallback();
			_el.remove();
		});
	}

	/*
		弹层导读
		
	*/
	function piaoyouGuide(_container){
		var html = '<div class="skippop flexbox_v am-skippop"><div class="skipcont flex"><header><p>在电影的时光</p><p>读懂自已。</p></header><h2>我们即将出发</h2><ul class="flexbox_vh_c frist"><li class="flex"><a><i class="skip01"></i><p>文章</p></a></li><li class="flex"><a><i class="skip02"></i><p>弹幕</p></a></li><li class="flex"><a><i class="skip03"></i><p>耳语</p></a></li></ul><ul class="flexbox_vh_c am-skul"> <li class="flex"><a><i class="skip04"></i><p> </p></a></li><li class="flex"><a><i class="skip05"></i><p> </p></a></li><li class="flex"><a><i class="skip06"></i><p> </p></a></li></ul></div><div class="skipbtn"><a class="skipclose"><i class="icon-cancel"></i></a></div></div>', 
			tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn;
		_el = $(html).appendTo(container);
		closebtn = _el.find('.skipbtn');
		closebtn.on('tap', function() {
			_el.removeClass('am-skippop').addClass('close-skippop');
			setTimeout(function(){
				_el.remove();
				setTimeout(function(){
					window.isPiaoyouGuide = false;
				}, 1000)
			}, 2000);
				
		});
	}

	// function findbox(_container){
	// 	var _findbox = $('#findbox ');
	//     _findbox.on('click',function(){
	//          _findbox.addClass('showtips')  ;
	//          setTimeout(function(){
	//                _findbox.removeClass('showtips')  ;
	//             }, 1000);    
	//     })
	// }

	String.format = function () {
        if (arguments.length == 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }
	//

	/**
	 * 获取最高的dialog z-index 值
	 *
	 * @return index {Number} z-index
	 */
	function requestZIndex() {
		return ++index;
	}

	exports.tip   = tip;
	exports.pop   = pop;
	exports.alert = alert;
	window.piaoyouGuide = piaoyouGuide;
	window._alert = alert;
	window._confirm = confirm;
	window.findbox = findbox;
});

