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
			template = '<div class="mask flexbox_v"><div class="maskbtn"><a class="btn_close"><i class="icon-cancel"></i></a></div><div class="maskother flex">{0}</div></div>';
			
		_el = $(String.format( template, message)).css({ zIndex: requestZIndex() }).appendTo(container);
		closebtn = _el.find('.maskbtn');
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
		btnLabel = btnLabel || '我知道了';
		var html = '', tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn,
			template = String.format('<div class="mask flexbox_v wait"><div class="hottips"><p>{0}</p><a class="_btn-solid">{1}</a></div></div>', message, btnLabel);

		_el = $(template).css({ zIndex: requestZIndex() }).appendTo(container);
		closebtn = _el.find('._btn-solid');
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
			template = '<div class="mask flexbox_v wait"><div class="hottips">{0}<div class="tipsbtn flexbox"><a class="flex fl">{1}</a><a class="flex fr">{2}</a></div></div></div>';

		_el = $(String.format( template, message, yesBtnLabel, noBtnLabel )).css({ zIndex: requestZIndex() }).appendTo(container);
		yesbtn = _el.find('.fl');
		nobtn = _el.find('.fr');
		yesbtn.on('click', function(evt) {
			evt.preventDefault();
			yesCallback && yesCallback();
			_el.remove();
		});

		nobtn.on('click', function(evt) {
			evt.preventDefault();
			noCallback && noCallback();
			_el.remove();
		});
	}

	/*
		loading
		var loading = new Loading()

		关闭：
		loading(true) //淡出
		loading(false) 无效果 
	*/
	function Loading(_container, delay){
		var html = '', tipObj = {}, container = _container ? _container : body, _el, tipTimeout;

		_el = $('<div class="mask flexbox_v wait"><div class="waitbox"></div></div>').css({ zIndex: requestZIndex()+20, opacity: 0 }).appendTo(container);
		setTimeout(function(){
			_el.addClass('m-show').css({opacity: 1});
		}, 20);
		

		return function (options) {
			// _el.css({opacity: 0});
			
			if(options){
				_el.remove();
			}else{
				delay = delay || 2e3;
				tipTimeout = setTimeout(function () {
					_el.css({opacity: 0});
					setTimeout(function(){
						_el.remove();
					}, 500)
				}, delay);
			}
		};
	}

	/*
		弹层导读
		
	*/
	function piaoyouGuide(_container){
		var html = '<div class="skippop flexbox_v am-skippop"><div class="skipcont flex"><header><p>在电影的时光</p><p>读懂自已。</p></header><h2>我们即将出发</h2><ul class="flexbox_vh_c frist"><li class="flex"><a><i class="skip01"></i><p>文章</p></a></li><li class="flex"><a><i class="skip02"></i><p>弹幕</p></a></li><li class="flex"><a><i class="skip03"></i><p>耳语</p></a></li></ul><ul class="flexbox_vh_c am-skul"> <li class="flex"><a><i class="skip04"></i><p>摇钱树</p></a></li><li class="flex"><a><i class="skip05"></i><p>一起疯</p></a></li><li class="flex"><a><i class="skip06"></i><p>邀红包</p></a></li></ul></div><div class="skipbtn"><a class="skipclose"><i class="icon-cancel"></i></a></div></div>', 
			tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn;
		_el = $(html).appendTo(container);
		closebtn = _el.find('.skipbtn');
		closebtn.on('click', function() {
			_el.removeClass('am-skippop').addClass('close-skippop');
			setTimeout(function(){
				_el.remove();
				setTimeout(function(){
					window.isPiaoyouGuide = false;
				}, 100)
			}, 2000);
				
		});
	}

	/*
		分享提示
	*/
	function shareTip(_container){
		//
		var html = '<div class="maskshare"></div>', 
			tipObj = {}, container = _container ? _container : body, _el, tipTimeout, closebtn;
		_el = $(html).appendTo(container);

		_el.on('click', function() {
			_el.remove();
		});
		return function () {
			_el && _el.remove();
		}
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
	exports.Loading = Loading;
	exports.shareTip = shareTip;
	exports.confirm = confirm;
	window.piaoyouGuide = piaoyouGuide;
	// window._alert = alert;
	window._confirm = confirm;
	// window.findbox = findbox;
});

