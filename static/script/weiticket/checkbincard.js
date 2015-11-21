/*
 * Created by yuanhaixiong on 2015/5/
 */

define([
	'../lib/zepto.js',
	'../lib/underscore',
	'../lib/deferred',
	'../util/modal',
	'../util/session_cache.js'
], function ($,
			 _,
			 Deferred,
			 Modal,
			 cache) {
	$(document).ready(function () {
		cache.publicSignal(publicsignalshort).then(function (publicSignal) {
			window.document.title = publicSignal.publicSignalName;
		});
		// orangered disabled
		var $restTimeBtn = $('a.rest-time'),
			$codeNum = $('input.code-num'),
			$phoneContainer = $('p.check-code'),
			$inmembercard = $('#inmembercard'),
		//手机号
			phone = window.sessionStorage.getItem('bindingCardPhone'),
			mphone,
			lphone,
		//重发开关
			isTimeLock = true,
		//发送开头
			isCode = false,
		//可发送短信次数
			codeNum = 2;

		if (phone && phone !== 'undefined') {
			phone = phone.toString();
			mphone = phone.substr(3, 4);
			lphone = phone.replace(mphone, "****");
			$phoneContainer.html('验证码已发送至' + lphone + '，30分钟内有效');
		}


		if (isUnBind && isUnBind == true)
			$('#inmembercard').html('解除绑定');
		else
			$('#inmembercard').html('进入会员卡');
		    
	    
	    $restTimeBtn.on('tap', function(){
	    	console.log('tap:'+ isTimeLock);
	    	if(!isTimeLock){
	    		isTimeLock = true;
	    		$restTimeBtn.removeClass('orangered').addClass('disabled');
	    		if(codeNum <= 0){
	        		codeNum = 0;
	        		isCode = false;
	        		$('p.code-error').css({'visibility':'visible'}).html('您今日没有机会,稍候自动回到首页');
	        		setTimeout(function(){
	        			location.href = '/' + publicsignalshort + '/choose_cinema/';
	        		}, 3000);
	        		return;
	        	}
	    		var options = {};
	    			options.public_signal_short = publicsignalshort;
			        options.open_id             = openId;
			        options.flg = 'bcard';
					options.card_id = '';
			    
	    		$.post('/' + publicsignalshort +'/member/sendmessage', options, function(data){
	    			if(data.err){
	    				$('p.code-error').css({'visibility':'visible'}).html(data.err);
	    				$restTimeBtn.removeClass('disabled').addClass('orangered');
	    			}else{
	    				codeNum--;
		        		if(codeNum === 0){
		        			//你已达到今日验证上限
		        			//$restTimeBtn.removeClass('orangered').addClass('disabled');
		        			isTimeLock = false;
		        			$('p.code-error').css({'visibility':'visible'}).html('你已达到今日验证上限');
		        		}else{
		        			myTimeStart();
		        		$('p.code-error').css({'visibility':'visible'}).html('您今日还有<i>'+ codeNum +'</i>次机会');
		        		}
	    			}
	    		});
	    	}
	    });
	    
	    $inmembercard.on('tap', function(){
	    	//console.log('publicsignalshort');
	    	var code = $codeNum.val();
	    	if(!_.isUndefined(code) && code !== '' && codeNum >= 0){
	    		var loadingModal = new Modal();
                    loadingModal.show({
                        body: '加载中...',
                        type: 'tip'
                    });
                var chit = $codeNum.val();
                var options = {};
			        options.public_signal_short = publicsignalshort;
			        options.open_id             = openId;
			        options.chit                = chit;
                $.post('/' + publicsignalshort +'/member/checkbinCard', options, function(data){
                	loadingModal.hide();
			        if(data.err){
			        	$('p.code-error').css({'visibility':'visible'}).html('验证码错误，请重试');
			            $codeNum.val('');
			            //$inmembercard.removeClass('orangered').addClass('disabled');
			            return;
			        }
			        var payUrl = '/'+ publicsignalshort +'/member/mycards';
			        location.href = payUrl;
			        //window.sessionStorage.setItem( 'sTempOrder', JSON.stringify(data) );
			    });
	    	}
	    	
	    });

		function myTimeStart() {
			disableSendBtn(60,
				function (count) {
					$restTimeBtn.html(count + '秒');
				},
				//时间结束
				function () {
					$restTimeBtn.html('重新发送').addClass('orangered').removeClass('disabled');
				}
			);
		}

		//重新发送
		$restTimeBtn.on('tap', function () {
			if (!isTimeLock) {
				isTimeLock = true;
				$restTimeBtn.removeClass('orangered').addClass('disabled');
				if (codeNum <= 0) {
					codeNum = 0;
					isCode = false;
					$('p.code-error').css({'visibility': 'visible'}).html('您今日没有机会,稍候自动回到首页');
					setTimeout(function () {
						location.href = '/' + publicsignalshort + '/choose_cinema/';
					}, 3000);
					return;
				}

				var options = {};
				options.public_signal_short = publicsignalshort;
				options.open_id = openId;
				if (isUnBind && isUnBind == true) { //解除绑定
					options.flg = 'ucard';
					options.card_id = window.sessionStorage.getItem('card_id');
				}
				else {
					options.flg = 'bcard';
					options.card_id = '';
				}
				var url = '/' + publicsignalshort + '/member/sendmessage';
				$.post(url, options, function (data) {
					if (data.err) {
						$('p.code-error').css({'visibility': 'visible'}).html(data.err);
						$restTimeBtn.removeClass('disabled').addClass('orangered');
					} else {
						codeNum--;
						if (codeNum === 0) {
							//你已达到今日验证上限
							isTimeLock = false;
							$('p.code-error').css({'visibility': 'visible'}).html('你已达到今日验证上限');
						} else {
							myTimeStart();
							$('p.code-error').css({'visibility': 'visible'}).html('您今日还有<i>' + codeNum + '</i>次机会');
						}
					}
				});
			}
		});

		// 进入会员卡 / 解除绑定
		$inmembercard.on('tap', function () {
			var code = $codeNum.val();
			if (!_.isUndefined(code) && code !== '' && codeNum >= 0) {
				var loadingModal = new Modal();
				loadingModal.show({
					body: '处理中...',
					type: 'tip'
				});
				var chit = $codeNum.val();
				if (isUnBind && isUnBind == true) { //解除绑定
					var options = {};
					options.public_signal_short = publicsignalshort;
					options.card_id = window.sessionStorage.getItem('card_id');
					options.open_id = openId;
					options.chit = chit;
					var url = '/' + publicsignalshort + '/member/checkunbindingcard';
					$.post(url, options, function (data) {
						loadingModal.hide();
						if (data.err) {
							$('p.code-error').css({'visibility': 'visible'}).html(data.err);
							$codeNum.val('');
							return;
						}
						else {
							var _loadingModal = new Modal();
							_loadingModal.show({
								body: '解绑成功...',
								type: 'tip'
							});
							setTimeout(function () {
								_loadingModal.hide();
								location.href = '/' + publicsignalshort + '/member/mycards';
							}, 1500);
						}
					});
				}
				else { //绑定
					var options = {};
					options.public_signal_short = publicsignalshort;
					options.open_id = openId;
					options.chit = chit;
					var url = '/' + publicsignalshort + '/member/checkbinCard';
					$.post(url, options, function (data) {
						loadingModal.hide();
						if (data.err) {
							$('p.code-error').css({'visibility': 'visible'}).html('验证码错误，请重试');
							$codeNum.val('');
							return;
						}
						location.href = '/' + publicsignalshort + '/member/mycards';
					});
				}
			}
		});

		function disableSendBtn(count, callback, endCallback) {
			isTimeLock = true;

			function interTime() {
				count--;
				if (count - 1 >= 0) {
					callback && callback(count);
					setTimeout(interTime, 1e3);
				} else {
					isTimeLock = false;
					endCallback && endCallback();
				}
			}

			interTime();
		};

		myTimeStart();
	});
});