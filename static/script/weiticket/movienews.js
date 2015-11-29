/* jshint ignore:start */
var $ = require('../lib/zepto.js');
var cookie = require("../util/cookie.js");
var mui = require('../lib/mui.js');

/* jshint ignore:end */
$(document).ready(function() {
    if(newscontent){
        $('._txt').html(newscontent);
    }

}); //END of jquery documet.ready 
