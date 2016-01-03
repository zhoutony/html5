
var $ = require('../lib/zepto.js');
var Util = require('../util/widgets.js');
var Dialogs = require('../util/dialogs');


$(document).ready(function() {
	var itemMask, itemMaskEl;

	function itemMethod(item){
		switch(item){
			case 'myorders':
				itemMask = 'mask_myorder';
				break;
			case 'mypiao':
				itemMask = 'mask_mypiao';
				break;
			case 'myredbag':
				itemMask = 'mask_myredbag';
				break;

		}
		if(item && item != ''){
			var loading = Dialogs.Loading();
			var url = '/my/' + item
			$.get(url, function(return_html){
				setTimeout(function(){
					loading(true);
				}, 800)
				
				Dialogs.pop(return_html);
				maskMethod();
			})
		}

	}

	function maskMethod(){
		var maskotherEl = $('.maskother'),
			topEl, el, orderboxEl;

		if(maskotherEl.length > 0){
			maskotherEl.on('click', function(evt){
				el = evt.target;
				if(el.tagName == 'A'){
					orderboxEl = maskotherEl.find('.orderbox');
					if($(el).hasClass('btn_back')){
						orderboxEl.show();
						itemMaskEl.remove();
						return;
					}
					
					getMaskHtml(maskotherEl, orderboxEl)
				}
			})
		}
	}

	function getMaskHtml(el, orderboxEl){
		if(el && el.length > 0){
			var url = '/my/' + itemMask;
			$.get(url, function(return_html){
				orderboxEl.hide();
				itemMaskEl = $(return_html).appendTo(el);
			})
		}

	}
	exports.itemMethod  = itemMethod;


})