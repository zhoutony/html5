/*
 * Created by yhx at 2016/1/2
 *
 *

 *  
 */

var $ = require('../lib/zepto');
var _ = require('../lib/underscore');
var cookie = require('../util/cookie');

var ChooseCity = {
	cityEl: null,
	init: function (callback) {
		this.initVariable();
        this.callback = callback;
	},

	initVariable: function(){
		var cityHtml = localStorage.getItem('cityHtml2'),
			cityEl;
        if(cityHtml){
            cityEl = $(cityHtml).appendTo(document.body);
            this.cityEl = cityEl;
            this.initElements();
	        this.initEvents();
	        this.load();
        }else{
            $.get('/get/citys', function(_html){
                if(_html && _html != ''){
                    localStorage.setItem('cityHtml2', _html);
                    cityEl = $(_html).appendTo(document.body);
                    this.cityEl = cityEl;
                    this.initElements();
                    this.initEvents();
                    
                }

            }.bind(this))
        }
	},

	initElements: function(){
		this.mainBody = $('#mainBody');
        this.searchEl = $('#searchData');
        this.citys = this.searchEl.find('li');
        this.cityLen = this.citys.length;
		this.inputEl = $('.txt');
	},

	initEvents: function () {
		this.inputEl.on('keyup', this.handerSeachs.bind(this));
        this.inputEl.on('change', this.handerSeachs.bind(this));
        this.cityEl && this.cityEl.on('click', '.btn_cancel', this.handerClose.bind(this));
        this.cityEl && this.cityEl.on('click', 'li', this.handerClick.bind(this));
	},

	load: function(){},

	handerSeachs: function(evt){
		var _value = this.inputEl.val(),
			city,
			serchstr;
		if(_value){
			this.searchEl.removeClass('m-hide');
			this.mainBody.addClass('m-hide');
			
			for(var i = 0; i < this.cityLen; i++){
				city = $(this.citys[i]);
				serchstr = city.data('serchstr').toLowerCase();
				_value = _value.toLowerCase();
				if(serchstr.indexOf(_value) >= 0){
					city.removeClass('m-hide');
				}else{
					city.addClass('m-hide');
				}
			}
		}else{
			this.searchEl.addClass('m-hide');
			this.mainBody.removeClass('m-hide');
		}
	},

	handerClick: function(evt){
		var el = $(evt.currentTarget);
		if(el.length > 0){

			var city = {
				locationId: el.data('locationid'),
				name: el.data('namecn')
			}
			
			this.callback && this.callback(city);
			this.cityEl && this.cityEl.remove();
		}

	},

	handerClose: function(evt){
		evt.preventDefault();
		this.cityEl && this.cityEl.remove();
	}

}

module.exports = ChooseCity;
