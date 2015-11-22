webpackJsonp([5,16],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Created by yuanhaixiong on 2015/5/
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(3),
	    __webpack_require__(8),
	    __webpack_require__(4),
	    __webpack_require__(2),
	    __webpack_require__(10)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function ($,
	             _,
	             Deferred,
	             cache,
	             IScroll,
	             Modal) {

	    cache.publicSignal(publicsignalshort).then(function (publicSignal) {
	        window.document.title = publicSignal.publicSignalName;
	    });

	    // var isAccount;
	    // var isPassword;

	    var openCinema;
	    var openCinemaList;
	    var openCinemaDl;
	    var openCinemaInput;
	    var openCinemaNo;
	    var cinemas;

	    var memberCardSignals = ["jydy"];
	    var cinemaId = $(".cinema-id").data("cinemaid");
	    var cardId = $(".mber-card-details").data("cardid");
	    var isAccount = isPassword = false,
	        patt = /[^\w\.\/]/ig,
	        $account = $('input[name="cardId"]'),
	        $password = $('input.pwd-card'),
	        $submit = $('a.btn-hollow'),
	        $infoTip = $('#infoTip');

	    $
	    (".binding-tips").on('tap', function () {
	        $(".mcard-tips").removeClass("m-hide");
	        $(".full-screen").removeClass("m-hide");
	    });

	    $(".know-btn").on('tap', function () {
	        $(".full-screen").addClass("m-hide");
	        $(".mcard-tips").addClass("m-hide");
	    });

	    $submit.on('tap', function (evt) {
	        evt.preventDefault();
	        var accountTxt = $account.val(),
	            passwordTxt = $password.val();

	        if (_.isUndefined(accountTxt) || accountTxt === '') {
	            $infoTip.html('请输入卡号');
	            return;
	        }
	        if (_.isUndefined(passwordTxt) || passwordTxt === '') {
	            $infoTip.html('请输入密码');
	            return;
	        }
	        // if (hasMemberCard()) {
	        if ((_.isUndefined(openCinemaNo) || openCinemaNo === '')) {
	            $infoTip.html('请输入开卡影院');
	            return;
	        }
	        // }
	        var loadingModal = new Modal();
	        loadingModal.show({
	            body: '加载中...',
	            type: 'tip'
	        });

	        var options = {};
	        options.public_signal_short = publicsignalshort;
	        options.cinema_no = cinemaNo ? cinemaNo : openCinemaNo;
	        options.open_id = openId;
	        options.card_id = accountTxt;
	        options.card_pass = passwordTxt;
	        options.open_cinema_no = openCinemaNo || "";

	        $.post('/' + publicsignalshort + '/member/bindingcard', options, function (render_data) {
	            loadingModal.hide();
	            var data = render_data.data;
	            if (!data) {
	                $infoTip.html(render_data.err);
	                return;
	            } else {
	                if (data.phone) {
	                    window.sessionStorage.setItem('bindingCardPhone', data.phone);
	                    window.sessionStorage.setItem('isBind', 1); //是否是绑定：0-默认 1-绑定 2-解绑
	                    location.href = '/' + publicsignalshort + "/member/checkbincard";
	                } else {
	                    //非储值卡不需要短信验证，直接跳转会员卡首页
	                    location.href = '/' + publicsignalshort + '/member/mycards';
	                }
	            }
	        });
	    });

	    //增加开卡影院
	    function openCinemaFn() {
	        openCinema = $('#openCinema');
	        openCinemaList = openCinema.find('.c-list');
	        openCinemaDl = openCinema.find('dl');
	        openCinemaInput = openCinema.find('input');

	        //if (hasMemberCard()) {
	        getCinemas(publicsignalshort, function (res) {
	            if (res) {
	                if (res.length === 1) {
	                    openCinemaNo = res[0].CinemaNo || "";
	                    return
	                }
	                openCinemaInput.on('propertychange input', openCinemaInputChange);
	                openCinemaList.on("tap", cinemaTap);

	                openCinema.removeClass('m-hide');
	                resetCinemaResultHeight(res.length);
	                openCinemaDl.html(renderCinemas(res));
	            }
	        });
	        //}
	    }

	    function hasMemberCard() {
	        return memberCardSignals.indexOf(publicsignalshort) >= 0;
	    }

	    function cinemaTap(e) {
	        var cinema = $(e.target);
	        var cinemano = $(cinema).attr("cinemano") || "";

	        openCinemaInput.val(cinema.html());
	        openCinemaNo = cinemano;

	        openCinemaList.addClass("m-hide");
	    }

	    function resetCinemaResultHeight(cinemaCount) {
	        if (cinemaCount && cinemaCount > 0) {
	            var cinemaCount = cinemaCount > 10 ? 10 : cinemaCount;
	            var height = openCinemaList.find("dt").not(".m-hide").first().height();
	            var totalHeight = cinemaCount * height;
	            if (cinemaCount >= 10)
	                openCinemaDl.css({overflow: 'scroll', height: totalHeight + 'px'});
	            else
	                openCinemaDl.css({overflow: 'hidden', height: totalHeight + 'px'});
	        }
	    }

	    function openCinemaInputChange(evt) {
	        var inputVal = this.value;
	        var dts = openCinemaDl.find('dt');
	        var val;
	        var num = 0;
	        if (inputVal !== '') {
	            dts.map(function (key, item) {
	                val = item.innerHTML;
	                if (val.indexOf(inputVal) >= 0) {
	                    if (openCinemaList && openCinemaList.hasClass('m-hide')) {
	                        openCinemaList.removeClass('m-hide');
	                    }
	                    item.className = '';
	                    num++;
	                }
	            });
	        }
	        if (num === 0) {
	            if (openCinemaList && !openCinemaList.hasClass('m-hide')) {
	                openCinemaList.addClass('m-hide');
	            }
	            dts.map(function (key, item) {
	                item.className = 'm-hide';
	            });
	        }
	        var cinemaCount = openCinemaList.find("dt").not(".m-hide").length;
	        resetCinemaResultHeight(cinemaCount);
	    }

	    function renderCinemas(cinemas) {
	        var html = [];
	        _.map(cinemas, function (item) {
	            html.push('<dt class="m-hide" cinemano="' + item.CinemaNo + '">' + item.CinemaName + '</dt>');
	        });
	        return html.join("");
	    }

	    function getCinemas(signal, callback) {
	        if (cinemas) return callback(cinemas);
	        $.post('/' + signal + '/member/bindingcard/opencinema', {}, function (res) {
	            cinemas = res.data;
	            if (cinemas) callback(cinemas);
	        });
	    }

	    openCinemaFn();
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* Zepto v1.1.4 - zepto event ajax form ie - zeptojs.com/license */
	var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function $(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function R(t){return D(t)&&!$(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(R(i[e])||A(i[e]))?(R(i[e])&&!R(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),R(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return _(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=$,n.isArray=A,n.isPlainObject=R,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):[]},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&X(this,t)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?W(this,""):(i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void W(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?$(s)?s["inner"+i]:_(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function T(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?T(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n);var s=n.dataType,a=/\?.+=\?/.test(n.url);if(a&&(s="jsonp"),n.cache!==!1&&(e&&e.cache===!0||"script"!=s&&"jsonp"!=s)||(n.url=w(n.url,"_="+Date.now())),"jsonp"==s)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var S="async"in n?n.async:!0;d.open(n.type,n.url,S,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var S=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(S(t)+"="+S(e))},T(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);
	module.exports = Zepto;
	//     Zepto.js
	//     (c) 2010-2014 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.

	;(function($){
	  var touch = {},
	    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
	    longTapDelay = 750,
	    gesture

	  function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >=
	      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	  }

	  function longTap() {
	    longTapTimeout = null
	    if (touch.last) {
	      touch.el.trigger('longTap')
	      touch = {}
	    }
	  }

	  function cancelLongTap() {
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    longTapTimeout = null
	  }

	  function cancelAll() {
	    if (touchTimeout) clearTimeout(touchTimeout)
	    if (tapTimeout) clearTimeout(tapTimeout)
	    if (swipeTimeout) clearTimeout(swipeTimeout)
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
	    touch = {}
	  }

	  function isPrimaryTouch(event){
	    return (event.pointerType == 'touch' ||
	      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
	      && event.isPrimary
	  }

	  function isPointerEventType(e, type){
	    return (e.type == 'pointer'+type ||
	      e.type.toLowerCase() == 'mspointer'+type)
	  }

	  $(document).ready(function(){
	    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

	    if ('MSGesture' in window) {
	      gesture = new MSGesture()
	      gesture.target = document.body
	    }

	    $(document)
	      .bind('MSGestureEnd', function(e){
	        var swipeDirectionFromVelocity =
	          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
	        if (swipeDirectionFromVelocity) {
	          touch.el.trigger('swipe')
	          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
	        }
	      })
	      .on('touchstart MSPointerDown pointerdown', function(e){
	        if((_isPointerType = isPointerEventType(e, 'down')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        if (e.touches && e.touches.length === 1 && touch.x2) {
	          // Clear out touch movement data if we have it sticking around
	          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
	          touch.x2 = undefined
	          touch.y2 = undefined
	        }
	        now = Date.now()
	        delta = now - (touch.last || now)
	        touch.el = $('tagName' in firstTouch.target ?
	          firstTouch.target : firstTouch.target.parentNode)
	        touchTimeout && clearTimeout(touchTimeout)
	        touch.x1 = firstTouch.pageX
	        touch.y1 = firstTouch.pageY
	        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
	        touch.last = now
	        longTapTimeout = setTimeout(longTap, longTapDelay)
	        // adds the current touch contact for IE gesture recognition
	        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
	      })
	      .on('touchmove MSPointerMove pointermove', function(e){
	        if((_isPointerType = isPointerEventType(e, 'move')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        cancelLongTap()
	        touch.x2 = firstTouch.pageX
	        touch.y2 = firstTouch.pageY

	        deltaX += Math.abs(touch.x1 - touch.x2)
	        deltaY += Math.abs(touch.y1 - touch.y2)
	      })
	      .on('touchend MSPointerUp pointerup', function(e){
	        if((_isPointerType = isPointerEventType(e, 'up')) &&
	          !isPrimaryTouch(e)) return
	        cancelLongTap()

	        // swipe
	        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
	            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

	          swipeTimeout = setTimeout(function() {
	            touch.el.trigger('swipe')
	            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
	            touch = {}
	          }, 0)

	        // normal tap
	        else if ('last' in touch)
	          // don't fire tap when delta position changed by more than 30 pixels,
	          // for instance when moving to a point and back to origin
	          if (deltaX < 30 && deltaY < 30) {
	            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	            // ('tap' fires before 'scroll')
	            tapTimeout = setTimeout(function() {

	              // trigger universal 'tap' with the option to cancelTouch()
	              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	              var event = $.Event('tap')
	              event.cancelTouch = cancelAll
	              touch.el.trigger(event)

	              // trigger double tap immediately
	              if (touch.isDoubleTap) {
	                if (touch.el) touch.el.trigger('doubleTap')
	                touch = {}
	              }

	              // trigger single tap after 250ms of inactivity
	              else {
	                touchTimeout = setTimeout(function(){
	                  touchTimeout = null
	                  if (touch.el) touch.el.trigger('singleTap')
	                  touch = {}
	                }, 250)
	              }
	            }, 0)
	          } else {
	            touch = {}
	          }
	          deltaX = deltaY = 0

	      })
	      // when the browser window loses focus,
	      // for example when a modal dialog is shown,
	      // cancel all ongoing events
	      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

	    // scrolling the window indicates intention of the user
	    // to scroll, not tap or swipe, so cancel all ongoing events
	    $(window).on('scroll', cancelAll)
	  })

	  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
	    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
	    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
	  })
	})(Zepto)

	;(function($){
	  function detect(ua, platform){
	    var os = this.os = {}, browser = this.browser = {},
	        webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
	        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
	        osx = !!ua.match(/\(Macintosh\; Intel /),
	        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
	        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
	        win = /Win\d{2}|Windows/.test(platform),
	        wp = ua.match(/Windows Phone ([\d.]+)/),
	        touchpad = webos && ua.match(/TouchPad/),
	        kindle = ua.match(/Kindle\/([\d.]+)/),
	        silk = ua.match(/Silk\/([\d._]+)/),
	        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
	        bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
	        rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
	        playbook = ua.match(/PlayBook/),
	        chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
	        firefox = ua.match(/Firefox\/([\d.]+)/),
	        firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
	        ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
	        webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
	        safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/)

	    // Todo: clean this up with a better OS/browser seperation:
	    // - discern (more) between multiple browsers on android
	    // - decide if kindle fire in silk mode is android or not
	    // - Firefox on Android doesn't specify the Android version
	    // - possibly devide in os, device and browser hashes

	    if (browser.webkit = !!webkit) browser.version = webkit[1]

	    if (android) os.android = true, os.version = android[2]
	    if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
	    if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')
	    if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null
	    if (wp) os.wp = true, os.version = wp[1]
	    if (webos) os.webos = true, os.version = webos[2]
	    if (touchpad) os.touchpad = true
	    if (blackberry) os.blackberry = true, os.version = blackberry[2]
	    if (bb10) os.bb10 = true, os.version = bb10[2]
	    if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2]
	    if (playbook) browser.playbook = true
	    if (kindle) os.kindle = true, os.version = kindle[1]
	    if (silk) browser.silk = true, browser.version = silk[1]
	    if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true
	    if (chrome) browser.chrome = true, browser.version = chrome[1]
	    if (firefox) browser.firefox = true, browser.version = firefox[1]
	    if (firefoxos) os.firefoxos = true, os.version = firefoxos[1]
	    if (ie) browser.ie = true, browser.version = ie[1]
	    if (safari && (osx || os.ios || win)) {
	      browser.safari = true
	      if (!os.ios) browser.version = safari[1]
	    }
	    if (webview) browser.webview = true

	    os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) ||
	    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)))
	    os.phone  = !!(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
	    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
	    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))))
	  }

	  detect.call($, navigator.userAgent, navigator.platform)
	  // make available to unit tests
	  $.__detect = detect

	})(Zepto)

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*! iScroll v5.0.6 ~ (c) 2008-2013 Matteo Spinelli ~ http://cubiq.org/license */
	var IScroll = (function (window, document, Math) {
	var rAF = window.requestAnimationFrame  ||
	    window.webkitRequestAnimationFrame  ||
	    window.mozRequestAnimationFrame     ||
	    window.oRequestAnimationFrame       ||
	    window.msRequestAnimationFrame      ||
	    function (callback) { window.setTimeout(callback, 1000 / 60); };
	var utils = (function () {
	    var me = {};

	    var _elementStyle = document.createElement('div').style;
	    var _vendor = (function () {
	        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
	            transform,
	            i = 0,
	            l = vendors.length;

	        for ( ; i < l; i++ ) {
	            transform = vendors[i] + 'ransform';
	            if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
	        }

	        return false;
	    })();

	    function _prefixStyle (style) {
	        if ( _vendor === false ) return false;
	        if ( _vendor === '' ) return style;
	        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	    }

	    me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	    me.extend = function (target, obj) {
	        for ( var i in obj ) {
	            target[i] = obj[i];
	        }
	    };

	    me.addEvent = function (el, type, fn, capture) {
	        el.addEventListener(type, fn, !!capture);
	    };

	    me.removeEvent = function (el, type, fn, capture) {
	        el.removeEventListener(type, fn, !!capture);
	    };

	    me.momentum = function (current, start, time, lowerMargin, wrapperSize) {
	        var distance = current - start,
	            speed = Math.abs(distance) / time,
	            destination,
	            duration,
	            deceleration = 0.002;

	        destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
	        duration = speed / deceleration;

	        if ( destination < lowerMargin ) {
	            destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
	            distance = Math.abs(destination - current);
	            duration = distance / speed;
	        } else if ( destination > 0 ) {
	            destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
	            distance = Math.abs(current) + destination;
	            duration = distance / speed;
	        }

	        return {
	            destination: Math.round(destination),
	            duration: duration
	        };
	    };

	    var _transform = _prefixStyle('transform');

	    me.extend(me, {
	        hasTransform: _transform !== false,
	        hasPerspective: _prefixStyle('perspective') in _elementStyle,
	        hasTouch: 'ontouchstart' in window,
	        hasPointer: navigator.msPointerEnabled,
	        hasTransition: _prefixStyle('transition') in _elementStyle
	    });

	    me.isAndroidBrowser = /Android/.test(window.navigator.appVersion) && /Version\/\d/.test(window.navigator.appVersion);

	    me.extend(me.style = {}, {
	        transform: _transform,
	        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
	        transitionDuration: _prefixStyle('transitionDuration'),
	        transformOrigin: _prefixStyle('transformOrigin')
	    });

	    me.hasClass = function (e, c) {
	        var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
	        return re.test(e.className);
	    };

	    me.addClass = function (e, c) {
	        if ( me.hasClass(e, c) ) {
	            return;
	        }

	        var newclass = e.className.split(' ');
	        newclass.push(c);
	        e.className = newclass.join(' ');
	    };

	    me.removeClass = function (e, c) {
	        if ( !me.hasClass(e, c) ) {
	            return;
	        }

	        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
	        e.className = e.className.replace(re, ' ');
	    };

	    me.offset = function (el) {
	        var left = -el.offsetLeft,
	            top = -el.offsetTop;

	        // jshint -W084
	        while (el = el.offsetParent) {
	            left -= el.offsetLeft;
	            top -= el.offsetTop;
	        }
	        // jshint +W084

	        return {
	            left: left,
	            top: top
	        };
	    };

	    me.preventDefaultException = function (el, exceptions) {
	        for ( var i in exceptions ) {
	            if ( exceptions[i].test(el[i]) ) {
	                return true;
	            }
	        }

	        return false;
	    };

	    me.extend(me.eventType = {}, {
	        touchstart: 1,
	        touchmove: 1,
	        touchend: 1,

	        mousedown: 2,
	        mousemove: 2,
	        mouseup: 2,

	        MSPointerDown: 3,
	        MSPointerMove: 3,
	        MSPointerUp: 3
	    });

	    me.extend(me.ease = {}, {
	        quadratic: {
	            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	            fn: function (k) {
	                return k * ( 2 - k );
	            }
	        },
	        circular: {
	            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',   // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
	            fn: function (k) {
	                k--;
	                return Math.sqrt( 1 - ( k * k ) );
	            }
	        },
	        back: {
	            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
	            fn: function (k) {
	                var b = 4;
	                return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
	            }
	        },
	        bounce: {
	            style: '',
	            fn: function (k) {
	                if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
	                    return 7.5625 * k * k;
	                } else if ( k < ( 2 / 2.75 ) ) {
	                    return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
	                } else if ( k < ( 2.5 / 2.75 ) ) {
	                    return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
	                } else {
	                    return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
	                }
	            }
	        },
	        elastic: {
	            style: '',
	            fn: function (k) {
	                var f = 0.22,
	                    e = 0.4;

	                if ( k === 0 ) { return 0; }
	                if ( k == 1 ) { return 1; }

	                return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
	            }
	        }
	    });

	    me.tap = function (e, eventName) {
	        var ev = document.createEvent('Event');
	        ev.initEvent(eventName, true, true);
	        ev.pageX = e.pageX;
	        ev.pageY = e.pageY;
	        e.target.dispatchEvent(ev);
	    };

	    me.click = function (e) {
	        var target = e.target,
	            ev;

	        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
	            ev = document.createEvent('MouseEvents');
	            ev.initMouseEvent('click', true, true, e.view, 1,
	                target.screenX, target.screenY, target.clientX, target.clientY,
	                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
	                0, null);

	            ev._constructed = true;
	            target.dispatchEvent(ev);
	        }
	    };

	    return me;
	})();

	function IScroll (el, options) {
	    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;

	    this.scroller = this.wrapper.children[0];
	    this.scrollerStyle = this.scroller.style;       // cache style for better performance

	    this.options = {

	        zoomMin: 1,
	        zoomMax: 4, startZoom: 1,

	        resizeIndicator: true,

	        mouseWheelSpeed: 20,

	        snapThreshold: 0.334,

	// INSERT POINT: OPTIONS 

	        startX: 0,
	        startY: 0,
	        scrollY: true,
	        directionLockThreshold: 5,
	        momentum: true,

	        bounce: true,
	        bounceTime: 600,
	        bounceEasing: '',

	        preventDefault: true,
	        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

	        HWCompositing: true,
	        useTransition: true,
	        useTransform: true
	    };

	    for ( var i in options ) {
	        this.options[i] = options[i];
	    }

	    // Normalize options
	    this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	    this.options.useTransition = utils.hasTransition && this.options.useTransition;
	    this.options.useTransform = utils.hasTransform && this.options.useTransform;

	    this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	    // If you want eventPassthrough I have to lock one of the axes
	    this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	    this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	    // With eventPassthrough we also need lockDirection mechanism
	    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	    this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	    this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	    if ( this.options.tap === true ) {
	        this.options.tap = 'tap';
	    }

	    this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	// INSERT POINT: NORMALIZATION

	    // Some defaults    
	    this.x = 0;
	    this.y = 0;
	    this.directionX = 0;
	    this.directionY = 0;
	    this._events = {};

	    this.scale = Math.min(Math.max(this.options.startZoom, this.options.zoomMin), this.options.zoomMax);

	// INSERT POINT: DEFAULTS

	    this._init();
	    this.refresh();

	    this.scrollTo(this.options.startX, this.options.startY);
	    this.enable();
	}

	IScroll.prototype = {
	    version: '5.0.6',

	    _init: function () {
	        this._initEvents();

	        if ( this.options.zoom ) {
	            this._initZoom();
	        }

	        if ( this.options.scrollbars || this.options.indicators ) {
	            this._initIndicators();
	        }

	        if ( this.options.mouseWheel ) {
	            this._initWheel();
	        }

	        if ( this.options.snap ) {
	            this._initSnap();
	        }

	        if ( this.options.keyBindings ) {
	            this._initKeys();
	        }

	// INSERT POINT: _init

	    },

	    destroy: function () {
	        this._initEvents(true);

	        this._execEvent('destroy');
	    },

	    _transitionEnd: function (e) {
	        if ( e.target != this.scroller ) {
	            return;
	        }

	        this._transitionTime(0);
	        if ( !this.resetPosition(this.options.bounceTime) ) {
	            this._execEvent('scrollEnd');
	        }
	    },

	    _start: function (e) {
	        // React to left mouse button only
	        if ( utils.eventType[e.type] != 1 ) {
	            if ( e.button !== 0 ) {
	                return;
	            }
	        }

	        if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
	            return;
	        }

	        if ( this.options.preventDefault && !utils.isAndroidBrowser && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
	            e.preventDefault();     // This seems to break default Android browser
	        }

	        var point = e.touches ? e.touches[0] : e,
	            pos;

	        this.initiated  = utils.eventType[e.type];
	        this.moved      = false;
	        this.distX      = 0;
	        this.distY      = 0;
	        this.directionX = 0;
	        this.directionY = 0;
	        this.directionLocked = 0;

	        this._transitionTime();

	        this.isAnimating = false;
	        this.startTime = utils.getTime();

	        if ( this.options.useTransition && this.isInTransition ) {
	            pos = this.getComputedPosition();

	            this._translate(Math.round(pos.x), Math.round(pos.y));
	            this._execEvent('scrollEnd');
	            this.isInTransition = false;
	        }

	        this.startX    = this.x;
	        this.startY    = this.y;
	        this.absStartX = this.x;
	        this.absStartY = this.y;
	        this.pointX    = point.pageX;
	        this.pointY    = point.pageY;

	        this._execEvent('beforeScrollStart');
	    },

	    _move: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault ) {    // increases performance on Android? TODO: check!
	            e.preventDefault();
	        }

	        var point       = e.touches ? e.touches[0] : e,
	            deltaX      = point.pageX - this.pointX,
	            deltaY      = point.pageY - this.pointY,
	            timestamp   = utils.getTime(),
	            newX, newY,
	            absDistX, absDistY;

	        this.pointX     = point.pageX;
	        this.pointY     = point.pageY;

	        this.distX      += deltaX;
	        this.distY      += deltaY;
	        absDistX        = Math.abs(this.distX);
	        absDistY        = Math.abs(this.distY);

	        // We need to move at least 10 pixels for the scrolling to initiate
	        if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
	            return;
	        }

	        // If you are scrolling in one direction lock the other
	        if ( !this.directionLocked && !this.options.freeScroll ) {
	            if ( absDistX > absDistY + this.options.directionLockThreshold ) {
	                this.directionLocked = 'h';     // lock horizontally
	            } else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
	                this.directionLocked = 'v';     // lock vertically
	            } else {
	                this.directionLocked = 'n';     // no lock
	            }
	        }

	        if ( this.directionLocked == 'h' ) {
	            if ( this.options.eventPassthrough == 'vertical' ) {
	                e.preventDefault();
	            } else if ( this.options.eventPassthrough == 'horizontal' ) {
	                this.initiated = false;
	                return;
	            }

	            deltaY = 0;
	        } else if ( this.directionLocked == 'v' ) {
	            if ( this.options.eventPassthrough == 'horizontal' ) {
	                e.preventDefault();
	            } else if ( this.options.eventPassthrough == 'vertical' ) {
	                this.initiated = false;
	                return;
	            }

	            deltaX = 0;
	        }

	        deltaX = this.hasHorizontalScroll ? deltaX : 0;
	        deltaY = this.hasVerticalScroll ? deltaY : 0;

	        newX = this.x + deltaX;
	        newY = this.y + deltaY;

	        // Slow down if outside of the boundaries
	        if ( newX > 0 || newX < this.maxScrollX ) {
	            newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
	        }
	        if ( newY > 0 || newY < this.maxScrollY ) {
	            newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
	        }

	        this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
	        this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

	        if ( !this.moved ) {
	            this._execEvent('scrollStart');
	        }

	        this.moved = true;

	        this._translate(newX, newY);

	/* REPLACE START: _move */

	        if ( timestamp - this.startTime > 300 ) {
	            this.startTime = timestamp;
	            this.startX = this.x;
	            this.startY = this.y;
	        }

	/* REPLACE END: _move */

	    },

	    _end: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
	            e.preventDefault();
	        }

	        var point = e.changedTouches ? e.changedTouches[0] : e,
	            momentumX,
	            momentumY,
	            duration = utils.getTime() - this.startTime,
	            newX = Math.round(this.x),
	            newY = Math.round(this.y),
	            distanceX = Math.abs(newX - this.startX),
	            distanceY = Math.abs(newY - this.startY),
	            time = 0,
	            easing = '';

	        this.scrollTo(newX, newY);  // ensures that the last position is rounded

	        this.isInTransition = 0;
	        this.initiated = 0;
	        this.endTime = utils.getTime();

	        // reset if we are outside of the boundaries
	        if ( this.resetPosition(this.options.bounceTime) ) {
	            return;
	        }

	        // we scrolled less than 10 pixels
	        if ( !this.moved ) {
	            if ( this.options.tap ) {
	                utils.tap(e, this.options.tap);
	            }

	            if ( this.options.click ) {
	                utils.click(e);
	            }

	            return;
	        }

	        if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
	            this._execEvent('flick');
	            return;
	        }

	        // start momentum animation if needed
	        if ( this.options.momentum && duration < 300 ) {
	            momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0) : { destination: newX, duration: 0 };
	            momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0) : { destination: newY, duration: 0 };
	            newX = momentumX.destination;
	            newY = momentumY.destination;
	            time = Math.max(momentumX.duration, momentumY.duration);
	            this.isInTransition = 1;
	        }


	        if ( this.options.snap ) {
	            var snap = this._nearestSnap(newX, newY);
	            this.currentPage = snap;
	            time = this.options.snapSpeed || Math.max(
	                    Math.max(
	                        Math.min(Math.abs(newX - snap.x), 1000),
	                        Math.min(Math.abs(newY - snap.y), 1000)
	                    ), 300);
	            newX = snap.x;
	            newY = snap.y;

	            this.directionX = 0;
	            this.directionY = 0;
	            easing = this.options.bounceEasing;
	        }

	// INSERT POINT: _end

	        if ( newX != this.x || newY != this.y ) {
	            // change easing function when scroller goes out of the boundaries
	            if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
	                easing = utils.ease.quadratic;
	            }

	            this.scrollTo(newX, newY, time, easing);
	            return;
	        }

	        this._execEvent('scrollEnd');
	    },

	    _resize: function () {
	        var that = this;

	        clearTimeout(this.resizeTimeout);

	        this.resizeTimeout = setTimeout(function () {
	            that.refresh();
	        }, this.options.resizePolling);
	    },

	    resetPosition: function (time) {
	        var x = this.x,
	            y = this.y;

	        time = time || 0;

	        if ( !this.hasHorizontalScroll || this.x > 0 ) {
	            x = 0;
	        } else if ( this.x < this.maxScrollX ) {
	            x = this.maxScrollX;
	        }

	        if ( !this.hasVerticalScroll || this.y > 0 ) {
	            y = 0;
	        } else if ( this.y < this.maxScrollY ) {
	            y = this.maxScrollY;
	        }

	        if ( x == this.x && y == this.y ) {
	            return false;
	        }

	        this.scrollTo(x, y, time, this.options.bounceEasing);

	        return true;
	    },

	    disable: function () {
	        this.enabled = false;
	    },

	    enable: function () {
	        this.enabled = true;
	    },

	    refresh: function () {
	        var rf = this.wrapper.offsetHeight;     // Force reflow

	        this.wrapperWidth   = this.wrapper.clientWidth;
	        this.wrapperHeight  = this.wrapper.clientHeight;

	/* REPLACE START: refresh */
	    this.scrollerWidth  = Math.round(this.scroller.offsetWidth * this.scale);
	    this.scrollerHeight = Math.round(this.scroller.offsetHeight * this.scale);
	/* REPLACE END: refresh */

	        this.maxScrollX     = this.wrapperWidth - this.scrollerWidth;
	        this.maxScrollY     = this.wrapperHeight - this.scrollerHeight;

	        this.hasHorizontalScroll    = this.options.scrollX && this.maxScrollX < 0;
	        this.hasVerticalScroll      = this.options.scrollY && this.maxScrollY < 0;

	        if ( !this.hasHorizontalScroll ) {
	            this.maxScrollX = 0;
	            this.scrollerWidth = this.wrapperWidth;
	        }

	        if ( !this.hasVerticalScroll ) {
	            this.maxScrollY = 0;
	            this.scrollerHeight = this.wrapperHeight;
	        }

	        this.endTime = 0;
	        this.directionX = 0;
	        this.directionY = 0;

	        this.wrapperOffset = utils.offset(this.wrapper);

	        this._execEvent('refresh');

	        this.resetPosition();

	// INSERT POINT: _refresh

	    },

	    on: function (type, fn) {
	        if ( !this._events[type] ) {
	            this._events[type] = [];
	        }

	        this._events[type].push(fn);
	    },

	    _execEvent: function (type) {
	        if ( !this._events[type] ) {
	            return;
	        }

	        var i = 0,
	            l = this._events[type].length;

	        if ( !l ) {
	            return;
	        }

	        for ( ; i < l; i++ ) {
	            this._events[type][i].call(this);
	        }
	    },

	    scrollBy: function (x, y, time, easing) {
	        x = this.x + x;
	        y = this.y + y;
	        time = time || 0;

	        this.scrollTo(x, y, time, easing);
	    },

	    scrollTo: function (x, y, time, easing) {
	        easing = easing || utils.ease.circular;

	        if ( !time || (this.options.useTransition && easing.style) ) {
	            this._transitionTimingFunction(easing.style);
	            this._transitionTime(time);
	            this._translate(x, y);
	        } else {
	            this._animate(x, y, time, easing.fn);
	        }
	    },

	    scrollToElement: function (el, time, offsetX, offsetY, easing) {
	        el = el.nodeType ? el : this.scroller.querySelector(el);

	        if ( !el ) {
	            return;
	        }

	        var pos = utils.offset(el);

	        pos.left -= this.wrapperOffset.left;
	        pos.top  -= this.wrapperOffset.top;

	        // if offsetX/Y are true we center the element to the screen
	        if ( offsetX === true ) {
	            offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
	        }
	        if ( offsetY === true ) {
	            offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
	        }

	        pos.left -= offsetX || 0;
	        pos.top  -= offsetY || 0;

	        pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
	        pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

	        time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

	        this.scrollTo(pos.left, pos.top, time, easing);
	    },

	    _transitionTime: function (time) {
	        time = time || 0;
	        this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';


	        if ( this.indicators ) {
	            for ( var i = this.indicators.length; i--; ) {
	                this.indicators[i].transitionTime(time);
	            }
	        }


	// INSERT POINT: _transitionTime

	    },

	    _transitionTimingFunction: function (easing) {
	        this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


	        if ( this.indicators ) {
	            for ( var i = this.indicators.length; i--; ) {
	                this.indicators[i].transitionTimingFunction(easing);
	            }
	        }


	// INSERT POINT: _transitionTimingFunction

	    },

	    _translate: function (x, y) {
	        if ( this.options.useTransform ) {

	/* REPLACE START: _translate */         this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ') ' + this.translateZ;/* REPLACE END: _translate */

	        } else {
	            x = Math.round(x);
	            y = Math.round(y);
	            this.scrollerStyle.left = x + 'px';
	            this.scrollerStyle.top = y + 'px';
	        }

	        this.x = x;
	        this.y = y;


	    if ( this.indicators ) {
	        for ( var i = this.indicators.length; i--; ) {
	            this.indicators[i].updatePosition();
	        }
	    }

	// INSERT POINT: _translate

	    },

	    _initEvents: function (remove) {
	        var eventType = remove ? utils.removeEvent : utils.addEvent,
	            target = this.options.bindToWrapper ? this.wrapper : window;

	        eventType(window, 'orientationchange', this);
	        eventType(window, 'resize', this);

	        if ( this.options.click ) {
	            eventType(this.wrapper, 'click', this, true);
	        }

	        if ( !this.options.disableMouse ) {
	            eventType(this.wrapper, 'mousedown', this);
	            eventType(target, 'mousemove', this);
	            eventType(target, 'mousecancel', this);
	            eventType(target, 'mouseup', this);
	        }

	        if ( utils.hasPointer && !this.options.disablePointer ) {
	            eventType(this.wrapper, 'MSPointerDown', this);
	            eventType(target, 'MSPointerMove', this);
	            eventType(target, 'MSPointerCancel', this);
	            eventType(target, 'MSPointerUp', this);
	        }

	        if ( utils.hasTouch && !this.options.disableTouch ) {
	            eventType(this.wrapper, 'touchstart', this);
	            eventType(target, 'touchmove', this);
	            eventType(target, 'touchcancel', this);
	            eventType(target, 'touchend', this);
	        }

	        eventType(this.scroller, 'transitionend', this);
	        eventType(this.scroller, 'webkitTransitionEnd', this);
	        eventType(this.scroller, 'oTransitionEnd', this);
	        eventType(this.scroller, 'MSTransitionEnd', this);
	    },

	    getComputedPosition: function () {
	        var matrix = window.getComputedStyle(this.scroller, null),
	            x, y;

	        if ( this.options.useTransform ) {
	            matrix = matrix[utils.style.transform].split(')')[0].split(', ');
	            x = +(matrix[12] || matrix[4]);
	            y = +(matrix[13] || matrix[5]);
	        } else {
	            x = +matrix.left.replace(/[^-\d]/g, '');
	            y = +matrix.top.replace(/[^-\d]/g, '');
	        }

	        return { x: x, y: y };
	    },

	    _initIndicators: function () {
	        var interactive = this.options.interactiveScrollbars,
	            defaultScrollbars = typeof this.options.scrollbars != 'object',
	            customStyle = typeof this.options.scrollbars != 'string',
	            indicators = [],
	            indicator;

	        this.indicators = [];

	        if ( this.options.scrollbars ) {
	            // Vertical scrollbar
	            if ( this.options.scrollY ) {
	                indicator = {
	                    el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
	                    interactive: interactive,
	                    defaultScrollbars: true,
	                    customStyle: customStyle,
	                    resize: this.options.resizeIndicator,
	                    listenX: false
	                };

	                this.wrapper.appendChild(indicator.el);
	                indicators.push(indicator);
	            }

	            // Horizontal scrollbar
	            if ( this.options.scrollX ) {
	                indicator = {
	                    el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
	                    interactive: interactive,
	                    defaultScrollbars: true,
	                    customStyle: customStyle,
	                    resize: this.options.resizeIndicator,
	                    listenY: false
	                };

	                this.wrapper.appendChild(indicator.el);
	                indicators.push(indicator);
	            }
	        }

	        if ( this.options.indicators ) {
	            // works fine for arrays and non-arrays
	            indicators = indicators.concat(this.options.indicators);
	        }

	        for ( var i = indicators.length; i--; ) {
	            this.indicators[i] = new Indicator(this, indicators[i]);
	        }

	        this.on('refresh', function () {
	            if ( this.indicators ) {
	                for ( var i = this.indicators.length; i--; ) {
	                    this.indicators[i].refresh();
	                }
	            }
	        });

	        this.on('destroy', function () {
	            if ( this.indicators ) {
	                for ( var i = this.indicators.length; i--; ) {
	                    this.indicators[i].destroy();
	                }
	            }

	            delete this.indicators;
	        });
	    },

	    _initZoom: function () {
	        this.scrollerStyle[utils.style.transformOrigin] = '0 0';
	    },

	    _zoomStart: function (e) {
	        var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
	            c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY );

	        this.touchesDistanceStart = Math.sqrt(c1 * c1 + c2 * c2);
	        this.startScale = this.scale;

	        this.originX = Math.abs(e.touches[0].pageX + e.touches[1].pageX) / 2 + this.wrapperOffset.left - this.x;
	        this.originY = Math.abs(e.touches[0].pageY + e.touches[1].pageY) / 2 + this.wrapperOffset.top - this.y;

	        this._execEvent('zoomStart');
	    },

	    _zoom: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault ) {
	            e.preventDefault();
	        }

	        var c1 = Math.abs( e.touches[0].pageX - e.touches[1].pageX ),
	            c2 = Math.abs( e.touches[0].pageY - e.touches[1].pageY ),
	            distance = Math.sqrt( c1 * c1 + c2 * c2 ),
	            scale = 1 / this.touchesDistanceStart * distance * this.startScale,
	            lastScale,
	            x, y;

	        this.scaled = true;

	        if ( scale < this.options.zoomMin ) {
	            scale = 0.5 * this.options.zoomMin * Math.pow(2.0, scale / this.options.zoomMin);
	        } else if ( scale > this.options.zoomMax ) {
	            scale = 2.0 * this.options.zoomMax * Math.pow(0.5, this.options.zoomMax / scale);
	        }

	        lastScale = scale / this.startScale;
	        x = this.originX - this.originX * lastScale + this.startX;
	        y = this.originY - this.originY * lastScale + this.startY;

	        this.scale = scale;

	        this.scrollTo(x, y, 0);
	    },

	    _zoomEnd: function (e) {
	        if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
	            return;
	        }

	        if ( this.options.preventDefault ) {
	            e.preventDefault();
	        }

	        var newX, newY,
	            lastScale;

	        this.isInTransition = 0;
	        this.initiated = 0;

	        if ( this.scale > this.options.zoomMax ) {
	            this.scale = this.options.zoomMax;
	        } else if ( this.scale < this.options.zoomMin ) {
	            this.scale = this.options.zoomMin;
	        }

	        // Update boundaries
	        this.refresh();

	        lastScale = this.scale / this.startScale;

	        newX = this.originX - this.originX * lastScale + this.startX;
	        newY = this.originY - this.originY * lastScale + this.startY;

	        if ( newX > 0 ) {
	            newX = 0;
	        } else if ( newX < this.maxScrollX ) {
	            newX = this.maxScrollX;
	        }

	        if ( newY > 0 ) {
	            newY = 0;
	        } else if ( newY < this.maxScrollY ) {
	            newY = this.maxScrollY;
	        }

	        if ( this.x != newX || this.y != newY ) {
	            this.scrollTo(newX, newY, this.options.bounceTime);
	        }

	        this.scaled = false;

	        this._execEvent('zoomEnd');
	    },

	    zoom: function (scale, x, y, time) {
	        if ( scale < this.options.zoomMin ) {
	            scale = this.options.zoomMin;
	        } else if ( scale > this.options.zoomMax ) {
	            scale = this.options.zoomMax;
	        }

	        if ( scale == this.scale ) {
	            return;
	        }

	        var relScale = scale / this.scale;

	        x = x === undefined ? this.wrapperWidth / 2 : x;
	        y = y === undefined ? this.wrapperHeight / 2 : y;
	        time = time === undefined ? 300 : time;

	        x = x + this.wrapperOffset.left - this.x;
	        y = y + this.wrapperOffset.top - this.y;

	        x = x - x * relScale + this.x;
	        y = y - y * relScale + this.y;

	        this.scale = scale;

	        this.refresh();     // update boundaries

	        if ( x > 0 ) {
	            x = 0;
	        } else if ( x < this.maxScrollX ) {
	            x = this.maxScrollX;
	        }

	        if ( y > 0 ) {
	            y = 0;
	        } else if ( y < this.maxScrollY ) {
	            y = this.maxScrollY;
	        }

	        this.scrollTo(x, y, time);
	    },

	    _wheelZoom: function (e) {
	        var wheelDeltaY,
	            deltaScale,
	            that = this;

	        // Execute the zoomEnd event after 400ms the wheel stopped scrolling
	        clearTimeout(this.wheelTimeout);
	        this.wheelTimeout = setTimeout(function () {
	            that._execEvent('zoomEnd');
	        }, 400);

	        if ('wheelDeltaX' in e) {
	            wheelDeltaY = e.wheelDeltaY / Math.abs(e.wheelDeltaY);
	        } else if('wheelDelta' in e) {
	            wheelDeltaY = e.wheelDelta / Math.abs(e.wheelDelta);
	        } else if ('detail' in e) {
	            wheelDeltaY = -e.detail / Math.abs(e.wheelDelta);
	        } else {
	            return;
	        }

	        deltaScale = this.scale + wheelDeltaY / 5;

	        this.zoom(deltaScale, e.pageX, e.pageY, 0);
	    },

	    _initWheel: function () {
	        utils.addEvent(this.wrapper, 'mousewheel', this);
	        utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

	        this.on('destroy', function () {
	            utils.removeEvent(this.wrapper, 'mousewheel', this);
	            utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
	        });
	    },

	    _wheel: function (e) {
	        if ( !this.enabled ) {
	            return;
	        }

	        e.preventDefault();

	        var wheelDeltaX, wheelDeltaY,
	            newX, newY,
	            that = this;

	        // Execute the scrollEnd event after 400ms the wheel stopped scrolling
	        clearTimeout(this.wheelTimeout);
	        this.wheelTimeout = setTimeout(function () {
	            that._execEvent('scrollEnd');
	        }, 400);

	        if ( 'wheelDeltaX' in e ) {
	            wheelDeltaX = e.wheelDeltaX / 120;
	            wheelDeltaY = e.wheelDeltaY / 120;
	        } else if ( 'wheelDelta' in e ) {
	            wheelDeltaX = wheelDeltaY = e.wheelDelta / 120;
	        } else if ( 'detail' in e ) {
	            wheelDeltaX = wheelDeltaY = -e.detail / 3;
	        } else {
	            return;
	        }

	        wheelDeltaX *= this.options.mouseWheelSpeed;
	        wheelDeltaY *= this.options.mouseWheelSpeed;

	        if ( !this.hasVerticalScroll ) {
	            wheelDeltaX = wheelDeltaY;
	            wheelDeltaY = 0;
	        }

	        if ( this.options.snap ) {
	            newX = this.currentPage.pageX;
	            newY = this.currentPage.pageY;

	            if ( wheelDeltaX > 0 ) {
	                newX--;
	            } else if ( wheelDeltaX < 0 ) {
	                newX++;
	            }

	            if ( wheelDeltaY > 0 ) {
	                newY--;
	            } else if ( wheelDeltaY < 0 ) {
	                newY++;
	            }

	            this.goToPage(newX, newY);

	            return;
	        }

	        newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX * this.options.invertWheelDirection : 0);
	        newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY * this.options.invertWheelDirection : 0);

	        if ( newX > 0 ) {
	            newX = 0;
	        } else if ( newX < this.maxScrollX ) {
	            newX = this.maxScrollX;
	        }

	        if ( newY > 0 ) {
	            newY = 0;
	        } else if ( newY < this.maxScrollY ) {
	            newY = this.maxScrollY;
	        }

	        this.scrollTo(newX, newY, 0);

	// INSERT POINT: _wheel
	    },

	    _initSnap: function () {
	        this.currentPage = {};

	        if ( typeof this.options.snap == 'string' ) {
	            this.options.snap = this.scroller.querySelectorAll(this.options.snap);
	        }

	        this.on('refresh', function () {
	            var i = 0, l,
	                m = 0, n,
	                cx, cy,
	                x = 0, y,
	                stepX = this.options.snapStepX || this.wrapperWidth,
	                stepY = this.options.snapStepY || this.wrapperHeight,
	                el;

	            this.pages = [];

	            if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
	                return;
	            }

	            if ( this.options.snap === true ) {
	                cx = Math.round( stepX / 2 );
	                cy = Math.round( stepY / 2 );

	                while ( x > -this.scrollerWidth ) {
	                    this.pages[i] = [];
	                    l = 0;
	                    y = 0;

	                    while ( y > -this.scrollerHeight ) {
	                        this.pages[i][l] = {
	                            x: Math.max(x, this.maxScrollX),
	                            y: Math.max(y, this.maxScrollY),
	                            width: stepX,
	                            height: stepY,
	                            cx: x - cx,
	                            cy: y - cy
	                        };

	                        y -= stepY;
	                        l++;
	                    }

	                    x -= stepX;
	                    i++;
	                }
	            } else {
	                el = this.options.snap;
	                l = el.length;
	                n = -1;

	                for ( ; i < l; i++ ) {
	                    if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
	                        m = 0;
	                        n++;
	                    }

	                    if ( !this.pages[m] ) {
	                        this.pages[m] = [];
	                    }

	                    x = Math.max(-el[i].offsetLeft, this.maxScrollX);
	                    y = Math.max(-el[i].offsetTop, this.maxScrollY);
	                    cx = x - Math.round(el[i].offsetWidth / 2);
	                    cy = y - Math.round(el[i].offsetHeight / 2);

	                    this.pages[m][n] = {
	                        x: x,
	                        y: y,
	                        width: el[i].offsetWidth,
	                        height: el[i].offsetHeight,
	                        cx: cx,
	                        cy: cy
	                    };

	                    if ( x > this.maxScrollX ) {
	                        m++;
	                    }
	                }
	            }

	            this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

	            // Update snap threshold if needed
	            if ( this.options.snapThreshold % 1 === 0 ) {
	                this.snapThresholdX = this.options.snapThreshold;
	                this.snapThresholdY = this.options.snapThreshold;
	            } else {
	                this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
	                this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
	            }
	        });

	        this.on('flick', function () {
	            var time = this.options.snapSpeed || Math.max(
	                    Math.max(
	                        Math.min(Math.abs(this.x - this.startX), 1000),
	                        Math.min(Math.abs(this.y - this.startY), 1000)
	                    ), 300);

	            this.goToPage(
	                this.currentPage.pageX + this.directionX,
	                this.currentPage.pageY + this.directionY,
	                time
	            );
	        });
	    },

	    _nearestSnap: function (x, y) {
	        if ( !this.pages.length ) {
	            return { x: 0, y: 0, pageX: 0, pageY: 0 };
	        }

	        var i = 0,
	            l = this.pages.length,
	            m = 0;

	        // Check if we exceeded the snap threshold
	        if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
	            Math.abs(y - this.absStartY) < this.snapThresholdY ) {
	            return this.currentPage;
	        }

	        if ( x > 0 ) {
	            x = 0;
	        } else if ( x < this.maxScrollX ) {
	            x = this.maxScrollX;
	        }

	        if ( y > 0 ) {
	            y = 0;
	        } else if ( y < this.maxScrollY ) {
	            y = this.maxScrollY;
	        }

	        for ( ; i < l; i++ ) {
	            if ( x >= this.pages[i][0].cx ) {
	                x = this.pages[i][0].x;
	                break;
	            }
	        }

	        l = this.pages[i].length;

	        for ( ; m < l; m++ ) {
	            if ( y >= this.pages[0][m].cy ) {
	                y = this.pages[0][m].y;
	                break;
	            }
	        }

	        if ( i == this.currentPage.pageX ) {
	            i += this.directionX;

	            if ( i < 0 ) {
	                i = 0;
	            } else if ( i >= this.pages.length ) {
	                i = this.pages.length - 1;
	            }

	            x = this.pages[i][0].x;
	        }

	        if ( m == this.currentPage.pageY ) {
	            m += this.directionY;

	            if ( m < 0 ) {
	                m = 0;
	            } else if ( m >= this.pages[0].length ) {
	                m = this.pages[0].length - 1;
	            }

	            y = this.pages[0][m].y;
	        }

	        return {
	            x: x,
	            y: y,
	            pageX: i,
	            pageY: m
	        };
	    },

	    goToPage: function (x, y, time, easing) {
	        easing = easing || this.options.bounceEasing;

	        if ( x >= this.pages.length ) {
	            x = this.pages.length - 1;
	        } else if ( x < 0 ) {
	            x = 0;
	        }

	        if ( y >= this.pages[x].length ) {
	            y = this.pages[x].length - 1;
	        } else if ( y < 0 ) {
	            y = 0;
	        }

	        var posX = this.pages[x][y].x,
	            posY = this.pages[x][y].y;

	        time = time === undefined ? this.options.snapSpeed || Math.max(
	            Math.max(
	                Math.min(Math.abs(posX - this.x), 1000),
	                Math.min(Math.abs(posY - this.y), 1000)
	            ), 300) : time;

	        this.currentPage = {
	            x: posX,
	            y: posY,
	            pageX: x,
	            pageY: y
	        };

	        this.scrollTo(posX, posY, time, easing);
	    },

	    next: function (time, easing) {
	        var x = this.currentPage.pageX,
	            y = this.currentPage.pageY;

	        x++;

	        if ( x >= this.pages.length && this.hasVerticalScroll ) {
	            x = 0;
	            y++;
	        }

	        this.goToPage(x, y, time, easing);
	    },

	    prev: function (time, easing) {
	        var x = this.currentPage.pageX,
	            y = this.currentPage.pageY;

	        x--;

	        if ( x < 0 && this.hasVerticalScroll ) {
	            x = 0;
	            y--;
	        }

	        this.goToPage(x, y, time, easing);
	    },

	    _initKeys: function (e) {
	        // default key bindings
	        var keys = {
	            pageUp: 33,
	            pageDown: 34,
	            end: 35,
	            home: 36,
	            left: 37,
	            up: 38,
	            right: 39,
	            down: 40
	        };
	        var i;

	        // if you give me characters I give you keycode
	        if ( typeof this.options.keyBindings == 'object' ) {
	            for ( i in this.options.keyBindings ) {
	                if ( typeof this.options.keyBindings[i] == 'string' ) {
	                    this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
	                }
	            }
	        } else {
	            this.options.keyBindings = {};
	        }

	        for ( i in keys ) {
	            this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
	        }

	        utils.addEvent(window, 'keydown', this);

	        this.on('destroy', function () {
	            utils.removeEvent(window, 'keydown', this);
	        });
	    },

	    _key: function (e) {
	        if ( !this.enabled ) {
	            return;
	        }

	        var snap = this.options.snap,   // we are using this alot, better to cache it
	            newX = snap ? this.currentPage.pageX : this.x,
	            newY = snap ? this.currentPage.pageY : this.y,
	            now = utils.getTime(),
	            prevTime = this.keyTime || 0,
	            acceleration = 0.250,
	            pos;

	        if ( this.options.useTransition && this.isInTransition ) {
	            pos = this.getComputedPosition();

	            this._translate(Math.round(pos.x), Math.round(pos.y));
	            this.isInTransition = false;
	        }

	        this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

	        switch ( e.keyCode ) {
	            case this.options.keyBindings.pageUp:
	                if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
	                    newX += snap ? 1 : this.wrapperWidth;
	                } else {
	                    newY += snap ? 1 : this.wrapperHeight;
	                }
	                break;
	            case this.options.keyBindings.pageDown:
	                if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
	                    newX -= snap ? 1 : this.wrapperWidth;
	                } else {
	                    newY -= snap ? 1 : this.wrapperHeight;
	                }
	                break;
	            case this.options.keyBindings.end:
	                newX = snap ? this.pages.length-1 : this.maxScrollX;
	                newY = snap ? this.pages[0].length-1 : this.maxScrollY;
	                break;
	            case this.options.keyBindings.home:
	                newX = 0;
	                newY = 0;
	                break;
	            case this.options.keyBindings.left:
	                newX += snap ? -1 : 5 + this.keyAcceleration>>0;
	                break;
	            case this.options.keyBindings.up:
	                newY += snap ? 1 : 5 + this.keyAcceleration>>0;
	                break;
	            case this.options.keyBindings.right:
	                newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
	                break;
	            case this.options.keyBindings.down:
	                newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
	                break;
	            default:
	                return;
	        }

	        if ( snap ) {
	            this.goToPage(newX, newY);
	            return;
	        }

	        if ( newX > 0 ) {
	            newX = 0;
	            this.keyAcceleration = 0;
	        } else if ( newX < this.maxScrollX ) {
	            newX = this.maxScrollX;
	            this.keyAcceleration = 0;
	        }

	        if ( newY > 0 ) {
	            newY = 0;
	            this.keyAcceleration = 0;
	        } else if ( newY < this.maxScrollY ) {
	            newY = this.maxScrollY;
	            this.keyAcceleration = 0;
	        }

	        this.scrollTo(newX, newY, 0);

	        this.keyTime = now;
	    },

	    _animate: function (destX, destY, duration, easingFn) {
	        var that = this,
	            startX = this.x,
	            startY = this.y,
	            startTime = utils.getTime(),
	            destTime = startTime + duration;

	        function step () {
	            var now = utils.getTime(),
	                newX, newY,
	                easing;

	            if ( now >= destTime ) {
	                that.isAnimating = false;
	                that._translate(destX, destY);

	                if ( !that.resetPosition(that.options.bounceTime) ) {
	                    that._execEvent('scrollEnd');
	                }

	                return;
	            }

	            now = ( now - startTime ) / duration;
	            easing = easingFn(now);
	            newX = ( destX - startX ) * easing + startX;
	            newY = ( destY - startY ) * easing + startY;
	            that._translate(newX, newY);

	            if ( that.isAnimating ) {
	                rAF(step);
	            }
	        }

	        this.isAnimating = true;
	        step();
	    },
	    handleEvent: function (e) {
	        switch ( e.type ) {
	            case 'touchstart':
	            case 'MSPointerDown':
	            case 'mousedown':
	                this._start(e);

	                if ( this.options.zoom && e.touches && e.touches.length > 1 ) {
	                    this._zoomStart(e);
	                }
	                break;
	            case 'touchmove':
	            case 'MSPointerMove':
	            case 'mousemove':
	                if ( this.options.zoom && e.touches && e.touches[1] ) {
	                    this._zoom(e);
	                    return;
	                }
	                this._move(e);
	                break;
	            case 'touchend':
	            case 'MSPointerUp':
	            case 'mouseup':
	            case 'touchcancel':
	            case 'MSPointerCancel':
	            case 'mousecancel':
	                if ( this.scaled ) {
	                    this._zoomEnd(e);
	                    return;
	                }
	                this._end(e);
	                break;
	            case 'orientationchange':
	            case 'resize':
	                this._resize();
	                break;
	            case 'transitionend':
	            case 'webkitTransitionEnd':
	            case 'oTransitionEnd':
	            case 'MSTransitionEnd':
	                this._transitionEnd(e);
	                break;
	            case 'DOMMouseScroll':
	            case 'mousewheel':
	                if ( this.options.wheelAction == 'zoom' ) {
	                    this._wheelZoom(e);
	                    return; 
	                }
	                this._wheel(e);
	                break;
	            case 'keydown':
	                this._key(e);
	                break;
	        }
	    }

	};
	function createDefaultScrollbar (direction, interactive, type) {
	    var scrollbar = document.createElement('div'),
	        indicator = document.createElement('div');

	    if ( type === true ) {
	        scrollbar.style.cssText = 'position:absolute;z-index:9999';
	        indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	    }

	    indicator.className = 'iScrollIndicator';

	    if ( direction == 'h' ) {
	        if ( type === true ) {
	            scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
	            indicator.style.height = '100%';
	        }
	        scrollbar.className = 'iScrollHorizontalScrollbar';
	    } else {
	        if ( type === true ) {
	            scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
	            indicator.style.width = '100%';
	        }
	        scrollbar.className = 'iScrollVerticalScrollbar';
	    }

	    if ( !interactive ) {
	        scrollbar.style.pointerEvents = 'none';
	    }

	    scrollbar.appendChild(indicator);

	    return scrollbar;
	}

	function Indicator (scroller, options) {
	    this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	    this.indicator = this.wrapper.children[0];
	    this.indicatorStyle = this.indicator.style;
	    this.scroller = scroller;

	    this.options = {
	        listenX: true,
	        listenY: true,
	        interactive: false,
	        resize: true,
	        defaultScrollbars: false,
	        speedRatioX: 0,
	        speedRatioY: 0
	    };

	    for ( var i in options ) {
	        this.options[i] = options[i];
	    }

	    this.sizeRatioX = 1;
	    this.sizeRatioY = 1;
	    this.maxPosX = 0;
	    this.maxPosY = 0;

	    if ( this.options.interactive ) {
	        if ( !this.options.disableTouch ) {
	            utils.addEvent(this.indicator, 'touchstart', this);
	            utils.addEvent(window, 'touchend', this);
	        }
	        if ( !this.options.disablePointer ) {
	            utils.addEvent(this.indicator, 'MSPointerDown', this);
	            utils.addEvent(window, 'MSPointerUp', this);
	        }
	        if ( !this.options.disableMouse ) {
	            utils.addEvent(this.indicator, 'mousedown', this);
	            utils.addEvent(window, 'mouseup', this);
	        }
	    }
	}

	Indicator.prototype = {
	    handleEvent: function (e) {
	        switch ( e.type ) {
	            case 'touchstart':
	            case 'MSPointerDown':
	            case 'mousedown':
	                this._start(e);
	                break;
	            case 'touchmove':
	            case 'MSPointerMove':
	            case 'mousemove':
	                this._move(e);
	                break;
	            case 'touchend':
	            case 'MSPointerUp':
	            case 'mouseup':
	            case 'touchcancel':
	            case 'MSPointerCancel':
	            case 'mousecancel':
	                this._end(e);
	                break;
	        }
	    },

	    destroy: function () {
	        if ( this.options.interactive ) {
	            utils.removeEvent(this.indicator, 'touchstart', this);
	            utils.removeEvent(this.indicator, 'MSPointerDown', this);
	            utils.removeEvent(this.indicator, 'mousedown', this);

	            utils.removeEvent(window, 'touchmove', this);
	            utils.removeEvent(window, 'MSPointerMove', this);
	            utils.removeEvent(window, 'mousemove', this);

	            utils.removeEvent(window, 'touchend', this);
	            utils.removeEvent(window, 'MSPointerUp', this);
	            utils.removeEvent(window, 'mouseup', this);
	        }

	        if ( this.options.defaultScrollbars ) {
	            this.wrapper.parentNode.removeChild(this.wrapper);
	        }
	    },

	    _start: function (e) {
	        var point = e.touches ? e.touches[0] : e;

	        e.preventDefault();
	        e.stopPropagation();

	        this.transitionTime(0);

	        this.initiated = true;
	        this.moved = false;
	        this.lastPointX = point.pageX;
	        this.lastPointY = point.pageY;

	        this.startTime  = utils.getTime();

	        if ( !this.options.disableTouch ) {
	            utils.addEvent(window, 'touchmove', this);
	        }
	        if ( !this.options.disablePointer ) {
	            utils.addEvent(window, 'MSPointerMove', this);
	        }
	        if ( !this.options.disableMouse ) {
	            utils.addEvent(window, 'mousemove', this);
	        }

	        this.scroller._execEvent('beforeScrollStart');
	    },

	    _move: function (e) {
	        var point = e.touches ? e.touches[0] : e,
	            deltaX, deltaY,
	            newX, newY,
	            timestamp = utils.getTime();

	        if ( !this.moved ) {
	            this.scroller._execEvent('scrollStart');
	        }

	        this.moved = true;

	        deltaX = point.pageX - this.lastPointX;
	        this.lastPointX = point.pageX;

	        deltaY = point.pageY - this.lastPointY;
	        this.lastPointY = point.pageY;

	        newX = this.x + deltaX;
	        newY = this.y + deltaY;

	        this._pos(newX, newY);

	        e.preventDefault();
	        e.stopPropagation();
	    },

	    _end: function (e) {
	        if ( !this.initiated ) {
	            return;
	        }

	        this.initiated = false;

	        e.preventDefault();
	        e.stopPropagation();

	        utils.removeEvent(window, 'touchmove', this);
	        utils.removeEvent(window, 'MSPointerMove', this);
	        utils.removeEvent(window, 'mousemove', this);

	        if ( this.scroller.options.snap ) {
	            var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

	            var time = this.options.snapSpeed || Math.max(
	                    Math.max(
	                        Math.min(Math.abs(this.scroller.x - snap.x), 1000),
	                        Math.min(Math.abs(this.scroller.y - snap.y), 1000)
	                    ), 300);

	            if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
	                this.scroller.directionX = 0;
	                this.scroller.directionY = 0;
	                this.scroller.currentPage = snap;
	                this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
	            }
	        }

	        if ( this.moved ) {
	            this.scroller._execEvent('scrollEnd');
	        }
	    },

	    transitionTime: function (time) {
	        time = time || 0;
	        this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';
	    },

	    transitionTimingFunction: function (easing) {
	        this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	    },

	    refresh: function () {
	        this.transitionTime(0);

	        if ( this.options.listenX && !this.options.listenY ) {
	            this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
	        } else if ( this.options.listenY && !this.options.listenX ) {
	            this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
	        } else {
	            this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
	        }

	        if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
	            utils.addClass(this.wrapper, 'iScrollBothScrollbars');
	            utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

	            if ( this.options.defaultScrollbars && this.options.customStyle ) {
	                if ( this.options.listenX ) {
	                    this.wrapper.style.right = '8px';
	                } else {
	                    this.wrapper.style.bottom = '8px';
	                }
	            }
	        } else {
	            utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
	            utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

	            if ( this.options.defaultScrollbars && this.options.customStyle ) {
	                if ( this.options.listenX ) {
	                    this.wrapper.style.right = '2px';
	                } else {
	                    this.wrapper.style.bottom = '2px';
	                }
	            }
	        }

	        var r = this.wrapper.offsetHeight;  // force refresh

	        if ( this.options.listenX ) {
	            this.wrapperWidth = this.wrapper.clientWidth;
	            if ( this.options.resize ) {
	                this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
	                this.indicatorStyle.width = this.indicatorWidth + 'px';
	            } else {
	                this.indicatorWidth = this.indicator.clientWidth;
	            }
	            this.maxPosX = this.wrapperWidth - this.indicatorWidth;
	            this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));  
	        }

	        if ( this.options.listenY ) {
	            this.wrapperHeight = this.wrapper.clientHeight;
	            if ( this.options.resize ) {
	                this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
	                this.indicatorStyle.height = this.indicatorHeight + 'px';
	            } else {
	                this.indicatorHeight = this.indicator.clientHeight;
	            }

	            this.maxPosY = this.wrapperHeight - this.indicatorHeight;
	            this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
	        }

	        this.updatePosition();
	    },

	    updatePosition: function () {
	        var x = Math.round(this.sizeRatioX * this.scroller.x) || 0,
	            y = Math.round(this.sizeRatioY * this.scroller.y) || 0;

	        if ( !this.options.ignoreBoundaries ) {
	            if ( x < 0 ) {
	                x = 0;
	            } else if ( x > this.maxPosX ) {
	                x = this.maxPosX;
	            }

	            if ( y < 0 ) {
	                y = 0;
	            } else if ( y > this.maxPosY ) {
	                y = this.maxPosY;
	            }       
	        }

	        this.x = x;
	        this.y = y;

	        if ( this.scroller.options.useTransform ) {
	            this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
	        } else {
	            this.indicatorStyle.left = x + 'px';
	            this.indicatorStyle.top = y + 'px';
	        }
	    },

	    _pos: function (x, y) {
	        if ( x < 0 ) {
	            x = 0;
	        } else if ( x > this.maxPosX ) {
	            x = this.maxPosX;
	        }

	        if ( y < 0 ) {
	            y = 0;
	        } else if ( y > this.maxPosY ) {
	            y = this.maxPosY;
	        }

	        x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
	        y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

	        this.scroller.scrollTo(x, y);
	    }
	};

	IScroll.ease = utils.ease;
	module.exports = IScroll;
	return IScroll;

	})(window, document, Math);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.2
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=d(e,i,4);var o=!w(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=b(r,e);for(var u=null!=t&&t.length,i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t){var r=S.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||o,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=S[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var e=this,u=e._,i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=o.toString,s=o.hasOwnProperty,p=Array.isArray,h=Object.keys,v=a.bind,g=Object.create,y=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};true?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):e._=m,m.VERSION="1.8.2";var d=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},b=function(n,t,r){return null==n?m.identity:m.isFunction(n)?d(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return b(n,t,1/0)};var x=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var l=o[c];t&&r[l]!==void 0||(r[l]=i[l])}return r}},_=function(n){if(!m.isObject(n))return{};if(g)return g(n);y.prototype=n;var t=new y;return y.prototype=null,t},j=Math.pow(2,53)-1,w=function(n){var t=n&&n.length;return"number"==typeof t&&t>=0&&j>=t};m.each=m.forEach=function(n,t,r){t=d(t,r);var e,u;if(w(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=w(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=b(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(b(t)),r)},m.every=m.all=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r){return w(n)||(n=m.values(n)),m.indexOf(n,t,"number"==typeof r&&r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=w(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(w(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=b(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,r,e){var u={};return r=b(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=A(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=A(function(n,t,r){n[r]=t}),m.countBy=A(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):w(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:w(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=b(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var k=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=n&&n.length;a>o;o++){var c=n[o];if(w(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=k(c,t,r));var l=0,f=c.length;for(u.length+=f;f>l;)u[i++]=c[l++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return k(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){if(null==n)return[];m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=b(r,e));for(var u=[],i=[],o=0,a=n.length;a>o;o++){var c=n[o],l=r?r(c,o,n):c;t?(o&&i===l||u.push(c),i=l):r?m.contains(i,l)||(i.push(l),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(k(arguments,!0,!0))},m.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=k(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,"length").length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=n&&n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.indexOf=function(n,t,r){var e=0,u=n&&n.length;if("number"==typeof r)e=0>r?Math.max(0,u+r):r;else if(r&&u)return e=m.sortedIndex(n,t),n[e]===t?e:-1;if(t!==t)return m.findIndex(l.call(n,e),m.isNaN);for(;u>e;e++)if(n[e]===t)return e;return-1},m.lastIndexOf=function(n,t,r){var e=n?n.length:0;if("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1)),t!==t)return m.findLastIndex(l.call(n,0,e),m.isNaN);for(;--e>=0;)if(n[e]===t)return e;return-1},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=b(r,e,1);for(var u=r(t),i=0,o=n.length;o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var O=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=_(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(v&&n.bind===v)return v.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return O(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return O(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var l=m.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f||f>t?(o&&(clearTimeout(o),o=null),a=l,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,f)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=m.now()-o;t>l&&l>=0?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var F=!{toString:null}.propertyIsEnumerable("toString"),S=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)m.has(n,e)&&t.push(e);return F&&r(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var e in n)t.push(e);return F&&r(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=x(m.allKeys),m.extendOwn=m.assign=x(m.keys),m.findKey=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=d(t,r)):(u=k(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var l=u[a],f=o[l];e(f,l,o)&&(i[l]=f)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(k(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=x(m.allKeys,!0),m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var E=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=f.call(n);if(u!==f.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!E(n[c],t[c],r,e))return!1}else{var l,s=m.keys(n);if(c=s.length,m.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!m.has(t,l)||!E(n[l],t[l],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return E(n,t)},m.isEmpty=function(n){return null==n?!0:w(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=p||function(n){return"[object Array]"===f.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return f.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===f.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&s.call(n,t)},m.noConflict=function(){return e._=u,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=function(n){return function(t){return null==t?void 0:t[n]}},m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=d(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=m.invert(M),I=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=I(M),m.unescape=I(N),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var B=0;m.uniqueId=function(n){var t=++B+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,K=function(n){return"\\"+R[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||T).source,(t.interpolate||T).source,(t.evaluate||T).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(q,K),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},l=t.variable||"obj";return c.source="function("+l+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var z=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),z(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],z(this,r)}}),m.each(["concat","join","slice"],function(n){var t=i[n];m.prototype[n]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"=="function"&&__webpack_require__(20)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return m}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);
	//# sourceMappingURL=underscore-min.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(1),
	  __webpack_require__(3),
	  __webpack_require__(8)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	  $, _, Deferred
	) {

	  // 参数增加公众号缩写publicsignalshort是因为站点内的所有路由均加了公众号
	  //keyfn 获取seseion的值
	  //urifn 获取路由地址
	  //datafn 返回数据
	  var initialize = function(keyfn, urifn, datafn) {
	    return function(id, publicsignalshort) {
	      var key = keyfn(id);
	      var defer = new _.Deferred();
	      var item = sessionStorage.getItem(key);
	      if (item) {
	        defer.resolve(JSON.parse(item));
	        return defer.promise();
	      } else {
	        $.get(urifn(id, publicsignalshort), function(data) {
	          item = datafn(data);
	          sessionStorage.setItem(key, JSON.stringify(item));
	          defer.resolve(item);
	        });
	      }
	      return defer.promise();
	    };
	  };

	  var movieCache = initialize(function(id) {
	    return 'movie-' + id;
	  }, function(id, publicsignalshort) {
	    return '/' + publicsignalshort + '/movie_info/' + id + '/';
	  }, function(data) {
	    return data.data.movie;
	  });

	  var publicSignalCache = initialize(function(id) {
	    return 'publicsignal-' + id;
	  }, function(id) {
	    return '/' + id + '/public_signal_info/';
	  }, function(data) {
	    return data;
	  });

	  var cinemaCache = initialize(function(id) {
	    return 'cinema-' + id;
	  }, function(id, publicsignalshort) {
	    return '/' + publicsignalshort + '/cinema_info_html/' + id + '/';
	  }, function(data) {
	    if (data && data.data) {
	      return data.data.cinema;
	    }
	  });

	  //基本排期信息
	  var scheduleInfoCache = initialize(function(mpid) {
	    return 'movieScheduleInfo-' + mpid;
	  }, function(id, publicsignalshort) {
	    return '/' + publicsignalshort + '/movieScheduleInfo/' + id;
	  }, function(data) {
	    return data.data;
	  });

	  return {
	    cinema: cinemaCache,
	    movie: movieCache,
	    publicSignal: publicSignalCache,
	    scheduleInfo: scheduleInfoCache
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function(root){
	  var _ = __webpack_require__(3);
	  // Let's borrow a couple of things from Underscore that we'll need

	  // _.each
	  var breaker = {},
	      AP = Array.prototype,
	      OP = Object.prototype,

	      hasOwn = OP.hasOwnProperty,
	      toString = OP.toString,
	      forEach = AP.forEach,
	      indexOf = AP.indexOf,
	      slice = AP.slice;

	  var _each = function( obj, iterator, context ) {
	    var key, i, l;

	    if ( !obj ) {
	      return;
	    }
	    if ( forEach && obj.forEach === forEach ) {
	      obj.forEach( iterator, context );
	    } else if ( obj.length === +obj.length ) {
	      for ( i = 0, l = obj.length; i < l; i++ ) {
	        if ( i in obj && iterator.call( context, obj[i], i, obj ) === breaker ) {
	          return;
	        }
	      }
	    } else {
	      for ( key in obj ) {
	        if ( hasOwn.call( obj, key ) ) {
	          if ( iterator.call( context, obj[key], key, obj) === breaker ) {
	            return;
	          }
	        }
	      }
	    }
	  };

	  // _.isFunction
	  var _isFunction = function( obj ) {
	    return !!(obj && obj.constructor && obj.call && obj.apply);
	  };

	  // _.extend
	  var _extend = function( obj ) {

	    _each( slice.call( arguments, 1), function( source ) {
	      var prop;

	      for ( prop in source ) {
	        if ( source[prop] !== void 0 ) {
	          obj[ prop ] = source[ prop ];
	        }
	      }
	    });
	    return obj;
	  };

	  // $.inArray
	  var _inArray = function( elem, arr, i ) {
	    var len;

	    if ( arr ) {
	      if ( indexOf ) {
	        return indexOf.call( arr, elem, i );
	      }

	      len = arr.length;
	      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

	      for ( ; i < len; i++ ) {
	        // Skip accessing in sparse arrays
	        if ( i in arr && arr[ i ] === elem ) {
	          return i;
	        }
	      }
	    }

	    return -1;
	  };

	  // And some jQuery specific helpers

	  var class2type = {};

	  // Populate the class2type map
	  _each("Boolean Number String Function Array Date RegExp Object".split(" "), function(name, i) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase();
	  });

	  var _type = function( obj ) {
	    return obj == null ?
	      String( obj ) :
	      class2type[ toString.call(obj) ] || "object";
	  };

	  // Now start the jQuery-cum-Underscore implementation. Some very
	  // minor changes to the jQuery source to get this working.

	  // Internal Deferred namespace
	  var _d = {};
	  // String to Object options format cache
	  var optionsCache = {};

	  // Convert String-formatted options into Object-formatted ones and store in cache
	  function createOptions( options ) {
	    var object = optionsCache[ options ] = {};
	    _each( options.split( /\s+/ ), function( flag ) {
	      object[ flag ] = true;
	    });
	    return object;
	  }

	  _d.Callbacks = function( options ) {

	    // Convert options from String-formatted to Object-formatted if needed
	    // (we check in cache first)
	    options = typeof options === "string" ?
	      ( optionsCache[ options ] || createOptions( options ) ) :
	      _extend( {}, options );

	    var // Last fire value (for non-forgettable lists)
	      memory,
	      // Flag to know if list was already fired
	      fired,
	      // Flag to know if list is currently firing
	      firing,
	      // First callback to fire (used internally by add and fireWith)
	      firingStart,
	      // End of the loop when firing
	      firingLength,
	      // Index of currently firing callback (modified by remove if needed)
	      firingIndex,
	      // Actual callback list
	      list = [],
	      // Stack of fire calls for repeatable lists
	      stack = !options.once && [],
	      // Fire callbacks
	      fire = function( data ) {
	        memory = options.memory && data;
	        fired = true;
	        firingIndex = firingStart || 0;
	        firingStart = 0;
	        firingLength = list.length;
	        firing = true;
	        for ( ; list && firingIndex < firingLength; firingIndex++ ) {
	          if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
	            memory = false; // To prevent further calls using add
	            break;
	          }
	        }
	        firing = false;
	        if ( list ) {
	          if ( stack ) {
	            if ( stack.length ) {
	              fire( stack.shift() );
	            }
	          } else if ( memory ) {
	            list = [];
	          } else {
	            self.disable();
	          }
	        }
	      },
	      // Actual Callbacks object
	      self = {
	        // Add a callback or a collection of callbacks to the list
	        add: function() {
	          if ( list ) {
	            // First, we save the current length
	            var start = list.length;
	            (function add( args ) {
	              _each( args, function( arg ) {
	                var type = _type( arg );
	                if ( type === "function" ) {
	                  if ( !options.unique || !self.has( arg ) ) {
	                    list.push( arg );
	                  }
	                } else if ( arg && arg.length && type !== "string" ) {
	                  // Inspect recursively
	                  add( arg );
	                }
	              });
	            })( arguments );
	            // Do we need to add the callbacks to the
	            // current firing batch?
	            if ( firing ) {
	              firingLength = list.length;
	            // With memory, if we're not firing then
	            // we should call right away
	            } else if ( memory ) {
	              firingStart = start;
	              fire( memory );
	            }
	          }
	          return this;
	        },
	        // Remove a callback from the list
	        remove: function() {
	          if ( list ) {
	            _each( arguments, function( arg ) {
	              var index;
	              while( ( index = _inArray( arg, list, index ) ) > -1 ) {
	                list.splice( index, 1 );
	                // Handle firing indexes
	                if ( firing ) {
	                  if ( index <= firingLength ) {
	                    firingLength--;
	                  }
	                  if ( index <= firingIndex ) {
	                    firingIndex--;
	                  }
	                }
	              }
	            });
	          }
	          return this;
	        },
	        // Control if a given callback is in the list
	        has: function( fn ) {
	          return _inArray( fn, list ) > -1;
	        },
	        // Remove all callbacks from the list
	        empty: function() {
	          list = [];
	          return this;
	        },
	        // Have the list do nothing anymore
	        disable: function() {
	          list = stack = memory = undefined;
	          return this;
	        },
	        // Is it disabled?
	        disabled: function() {
	          return !list;
	        },
	        // Lock the list in its current state
	        lock: function() {
	          stack = undefined;
	          if ( !memory ) {
	            self.disable();
	          }
	          return this;
	        },
	        // Is it locked?
	        locked: function() {
	          return !stack;
	        },
	        // Call all callbacks with the given context and arguments
	        fireWith: function( context, args ) {
	          args = args || [];
	          args = [ context, args.slice ? args.slice() : args ];
	          if ( list && ( !fired || stack ) ) {
	            if ( firing ) {
	              stack.push( args );
	            } else {
	              fire( args );
	            }
	          }
	          return this;
	        },
	        // Call all the callbacks with the given arguments
	        fire: function() {
	          self.fireWith( this, arguments );
	          return this;
	        },
	        // To know if the callbacks have already been called at least once
	        fired: function() {
	          return !!fired;
	        }
	      };

	    return self;
	  };

	  _d.Deferred = function( func ) {

	    var tuples = [
	        // action, add listener, listener list, final state
	        [ "resolve", "done", _d.Callbacks("once memory"), "resolved" ],
	        [ "reject", "fail", _d.Callbacks("once memory"), "rejected" ],
	        [ "notify", "progress", _d.Callbacks("memory") ]
	      ],
	      state = "pending",
	      promise = {
	        state: function() {
	          return state;
	        },
	        always: function() {
	          deferred.done( arguments ).fail( arguments );
	          return this;
	        },
	        then: function( /* fnDone, fnFail, fnProgress */ ) {
	          var fns = arguments;

	          return _d.Deferred(function( newDefer ) {

	            _each( tuples, function( tuple, i ) {
	              var action = tuple[ 0 ],
	                fn = fns[ i ];

	              // deferred[ done | fail | progress ] for forwarding actions to newDefer
	              deferred[ tuple[1] ]( _isFunction( fn ) ?

	                function() {
	                  var returned;
	                  try { returned = fn.apply( this, arguments ); } catch(e){
	                    newDefer.reject(e);
	                    return;
	                  }

	                  if ( returned && _isFunction( returned.promise ) ) {
	                    returned.promise()
	                      .done( newDefer.resolve )
	                      .fail( newDefer.reject )
	                      .progress( newDefer.notify );
	                  } else {
	                    newDefer[ action !== "notify" ? 'resolveWith' : action + 'With']( this === deferred ? newDefer : this, [ returned ] );
	                  }
	                } :

	                newDefer[ action ]
	              );
	            });

	            fns = null;

	          }).promise();

	        },
	        // Get a promise for this deferred
	        // If obj is provided, the promise aspect is added to the object
	        promise: function( obj ) {
	          return obj != null ? _extend( obj, promise ) : promise;
	        }
	      },
	      deferred = {};

	    // Keep pipe for back-compat
	    promise.pipe = promise.then;

	    // Add list-specific methods
	    _each( tuples, function( tuple, i ) {
	      var list = tuple[ 2 ],
	        stateString = tuple[ 3 ];

	      // promise[ done | fail | progress ] = list.add
	      promise[ tuple[1] ] = list.add;

	      // Handle state
	      if ( stateString ) {
	        list.add(function() {
	          // state = [ resolved | rejected ]
	          state = stateString;

	        // [ reject_list | resolve_list ].disable; progress_list.lock
	        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
	      }

	      // deferred[ resolve | reject | notify ] = list.fire
	      deferred[ tuple[0] ] = list.fire;
	      deferred[ tuple[0] + "With" ] = list.fireWith;
	    });

	    // Make the deferred a promise
	    promise.promise( deferred );

	    // Call given func if any
	    if ( func ) {
	      func.call( deferred, deferred );
	    }

	    // All done!
	    return deferred;
	  };

	  // Deferred helper
	  _d.when = function( subordinate /* , ..., subordinateN */ ) { 

	    var i = 0,
	      resolveValues = ( _type(subordinate) === 'array' && arguments.length === 1 ) ? subordinate : slice.call( arguments ),
	      length = resolveValues.length;

	      if ( _type(subordinate) === 'array' && subordinate.length === 1 ) {
	        subordinate = subordinate[ 0 ];
	      }

	      // the count of uncompleted subordinates
	      var remaining = length !== 1 || ( subordinate && _isFunction( subordinate.promise ) ) ? length : 0,

	      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
	      deferred = remaining === 1 ? subordinate : _d.Deferred(),

	      // Update function for both resolve and progress values
	      updateFunc = function( i, contexts, values ) {
	        return function( value ) {
	          contexts[ i ] = this;
	          values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
	          if( values === progressValues ) {
	            deferred.notifyWith( contexts, values );
	          } else if ( !( --remaining ) ) {
	            deferred.resolveWith( contexts, values );
	          }
	        };
	      },

	      progressValues, progressContexts, resolveContexts;

	    // add listeners to Deferred subordinates; treat others as resolved
	    if ( length > 1 ) {
	      progressValues = new Array( length );
	      progressContexts = new Array( length );
	      resolveContexts = new Array( length );
	      for ( ; i < length; i++ ) {
	        if ( resolveValues[ i ] && _isFunction( resolveValues[ i ].promise ) ) {
	          resolveValues[ i ].promise()
	            .done( updateFunc( i, resolveContexts, resolveValues ) )
	            .fail( deferred.reject )
	            .progress( updateFunc( i, progressContexts, progressValues ) );
	        } else {
	          --remaining;
	        }
	      }
	    }

	    // if we're not waiting on anything, resolve the master
	    if ( !remaining ) {
	      deferred.resolveWith( resolveContexts, resolveValues );
	    }

	    return deferred.promise();
	  };

	  // Try exporting as a Common.js Module
	  if ( typeof module !== "undefined" && module.exports ) {


	    module.exports = _d;
	    _.mixin(_d); //黑科技

	  // Or mixin to Underscore.js
	  } else if ( typeof root._ !== "undefined" ) {

	    root._.mixin(_d);

	  // Or assign it to window._
	  } else {

	    root._ = _d;

	  }

	})(this);

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by gaowhen on 14/11/27.
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(1),
	    __webpack_require__(3)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(
	    $,
	    _
	) {
	    var toastModal = {
	        method: function (modal) {
	            modal.$modal.addClass('modal').removeClass('m-modal m-modal-m').html(modal.setting.body);
	            setTimeout(function () {
	                modal.hide();
	            }, 2000);
	        }
	    };

	    var alertModal = {
	        btn: '<a href="#" class="btn btn-cancel">返回</a>',
	        method: function(modal) {
	            modal.hide();
	        }
	    };

	    var confirmModal = {
	        confirm: {
	            btn: '<a href="#" class="btn btn-confirm">确认</a>',
	            method: function(modal) {
	                modal.hide();
	            }
	        },
	        cancel: {
	            btn: '<a href="#" class="btn gray btn-cancel">取消</a>',
	            method: function(modal) {
	                modal.hide();
	            }
	        }
	    };

	    var defaults = {
	        isShowHead: false,
	        head: 'should be text or dom',
	        body: 'text or dom',
	        type: 'alert', // confirm
	        foot: alertModal
	    };

	    function Modal() {
	        this.init();
	    }

	    _.extend(Modal.prototype, {
	        init: function() {
	            this.$overlay = $('<div class="full-screen"></div>');
	            this.$modal = $('' +
	                '<div class="m-modal m-modal-m">' +
	                '<div class="m-m-header"></div>' +
	                '<div class="m-m-body" style="text-align: center;"></div>' +
	                '<div class="m-m-footer"><div class="btn-box"></div></div>' +
	                '</div>');

	            this.$head = this.$modal.find('.m-m-header');
	            this.$body = this.$modal.find('.m-m-body');
	            this.$foot = this.$modal.find('.m-m-footer');
	            this.$btn = this.$foot.find('.btn-box');

	            this.$overlay.hide();
	            this.$modal.hide();

	            this.speed = 150;

	            var $body = $('body');
	            $body.append(this.$overlay);
	            $body.append(this.$modal);

	            this.$overlay.on('click', function(e) {
	                if (e.preventDefault) {
	                    e.preventDefault();
	                }
	                // that.hide();
	            });
	        },
	        setHead: function(head) {
	            this.$head.removeClass('empty').html(head);
	        },
	        setContent: function(content) {
	            this.$body.html(content);
	        },
	        show: function(opt) {
	            var that = this;

	            opt = _.extend(defaults, opt);

	            that.$overlay.show(that.speed);

	            if (opt.isShowHead) {
	                that.$head.removeClass('empty');
	                that.setHead(opt.head);
	            } else {
	                that.$head.addClass('empty');
	            }

	            switch (opt.type) {
	                case 'alert':
	                    if (opt.foot && (opt.foot.btn || opt.foot.method)) {
	                        alertModal = _.extend(alertModal, opt.foot);
	                    }

	                    that.$modal.empty().addClass('m-modal m-modal-m').removeClass('modal')
	                        .append(that.$head).append(that.$body).append(that.$foot);

	                    that.$body.html(opt.body);

	                    that.$btn.empty().append(alertModal.btn);

	                    that.$modal.on('click', '.btn-cancel', function(e) {
	                        e.preventDefault();
	                        alertModal.method(that);
	                        that.hide();
	                    });
	                    break;
	                case 'confirm':
	                    if (opt.foot && (opt.foot.confirm || opt.foot.cancel)) {
	                        confirmModal = _.extend(confirmModal, opt.foot);
	                    }

	                    that.$modal.empty().addClass('m-modal m-modal-m').removeClass('modal')
	                        .append(that.$head).append(that.$body).append(that.$foot);

	                    that.$body.html(opt.body);
	                    that.$btn.empty().append(confirmModal.cancel.btn).append(confirmModal.confirm.btn);

	                    that.$modal.on('click', '.btn-cancel', function(e) {
	                        e.preventDefault();

	                        that.hide();
	                        confirmModal.cancel.method(that);
	                    });

	                    that.$modal.on('click', '.btn-confirm', function(e) {
	                        e.preventDefault();

	                        that.hide();
	                        confirmModal.confirm.method(that);
	                    });
	                    break;
	                case 'tip':
	                    that.$modal.addClass('modal').removeClass('m-modal m-modal-m').html(opt.body);
	                    break;
	                case 'toast':
	                    that.setting = opt;
	                    toastModal.method(that);
	                    break;
	                default:
	            }

	            if (opt.klas === 'full') {
	                this.$modal.removeClass('m-modal-m').addClass('m-modal-full');
	            }

	            that.$modal.show(that.speed);
	        },
	        hide: function() {
	            this.$overlay.remove();
	            this.$modal.remove();
	        }
	    });

	    return Modal;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }
]);