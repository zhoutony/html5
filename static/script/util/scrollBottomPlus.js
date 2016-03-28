/*
 * Created by yhx at 2015/11/26
 *
 *
 *  var Dialogs = require('../util/scrollBottomPlus.js');
 *
 *  Dialogs.tip('好的<br>我们的爱');
*/

var $ = require('../lib/zepto');
var _ = require('../lib/underscore');

var ScrollBottomPlus = {
	render: function (options) {
		// var pageCount = this.options.pageCount,
  //           moreTipDiv = this.options.moreTipDiv;

  //       if(pageCount !== -1){
  //           if(pageCount > 1){
  //               $(moreTipDiv).html('奋力加载中...');
  //           }else if(pageCount === 1){
  //               $(moreTipDiv).html('貌似没有更多了 >.<');
  //               return;
  //           }else{
  //               $(moreTipDiv).html('');
  //               return;
  //           }
            
  //       }
  		this.options = options;
  		this.el = $(options.el);
  		this.app = $(options.app_el);
      this.footer = $(this.options.footer);
      this.gotoBottomShowed = false;
      this.clientHeight = document.documentElement.clientHeight;

      this.checkScrollHandler = _.bind(this.checkScroll, this);
      $(document).bind("scroll", this.checkScrollHandler);
      this.footerHeight = this.footer.length > 0 ? this.footer.height() + 200 : 500;
      this.bodyOffsetHeight = document.body.offsetHeight;
    },

    checkScroll: function(){
        localStorage.setItem('indexScrollTop', document.body.scrollTop);
        var scrollHeight = document.body.scrollTop + this.clientHeight,
            bodyOffsetHeight = this.app.height() - this.footerHeight;
        //alert(scrollHeight + ':' + bodyOffsetHeight);
        if (scrollHeight >= bodyOffsetHeight) {
            this.gotoBottomShowed = true;
            this.bodyOffsetHeight = bodyOffsetHeight;
            // this.loading = $('<div class="mui-pull"><div class="mui-pull-loading mui-icon mui-spinner mui-visibility"></div><div class="mui-pull-caption mui-pull-caption-refresh">正在加载...</div></div>').appendTo(this.el);
            this.options.callback && (this.options.callback());
            // console.log(scrollHeight);
        }
    },

    remove: function(){
        this.clientHeight = null;
        this.footerHeight = null;

        this.checkScrollHandler && $(document).unbind("scroll", this.checkScrollHandler);
        // $(this.options.moreTipDiv).html('貌似没有更多了 >.<');
    }

	
}

module.exports = ScrollBottomPlus;
