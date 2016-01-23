var $ = require('../lib/zepto.js');


$(document).ready(function() {

	$('.succinfo').html(localStorage.getItem('orderInfo'));
})