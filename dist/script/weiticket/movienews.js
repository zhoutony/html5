webpackJsonp([2,18],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* jshint ignore:start */
	var $ = __webpack_require__(1);
	var cookie = __webpack_require__(3);
	var mui = __webpack_require__(6);

	/* jshint ignore:end */
	$(document).ready(function() {
	    if(newscontent){
	        $('._txt').html(newscontent);
	    }

	    if(title){
	    	$('.infotit').html('<div>'+title+'</div>');
	    }

	}); //END of jquery documet.ready 


/***/ },

/***/ 1:
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

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function(_) {

	    // var pluses = /\+/g;

	    // function raw(s) {
	    //     return s;
	    // }

	    // function decoded(s) {
	    //     return decodeURIComponent(s.replace(pluses, ' '));
	    // }

	    // var cookie = function cookie(key, value, options) {

	    //     // write
	    //     if (value !== undefined) {
	    //         options = _.extend({}, cookie.defaults, options);

	    //         if (value === null) {
	    //             options.expires = -1;
	    //         }

	    //         if (typeof options.expires === 'number') {
	    //             var days = options.expires,
	    //                 t = options.expires = new Date();
	    //             t.setDate(t.getDate() + days);
	    //         }

	    //         value = cookie.json ? JSON.stringify(value) : String(value);

	    //         return (document.cookie = [
	    //             encodeURIComponent(key), '=', cookie.raw ? value : encodeURIComponent(value),
	    //             options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	    //             options.path ? '; path=' + options.path : '',
	    //             options.domain ? '; domain=' + options.domain : '',
	    //             options.secure ? '; secure' : ''
	    //         ].join(''));
	    //     }

	    //     // read
	    //     var decode = cookie.raw ? raw : decoded;
	    //     var cookies = document.cookie.split('; ');
	    //     for (var i = 0, l = cookies.length; i < l; i++) {
	    //         var parts = cookies[i].split('=');
	    //         if (decode(parts.shift()) === key) {
	    //             var c = decode(parts.join('='));
	    //             return cookie.json ? JSON.parse(c) : c;
	    //         }
	    //     }

	    //     return null;
	    // };

	    // cookie.defaults = {};

	    // function removeCookie(key, options) {
	    //     if (cookie(key) !== null) {
	    //         cookie(key, null, options);
	    //         return true;
	    //     }
	    //     return false;
	    // };

	    // cookie.remove = removeCookie;

	    // return cookie;

	    var docCookies = {
	      getItem: function (sKey) {
	        if (!sKey) { return null; }
	        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	      },
	      setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
	        var sExpires = "";
	        if (vEnd) {
	          switch (vEnd.constructor) {
	            case Number:
	              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
	              break;
	            case String:
	              sExpires = "; expires=" + vEnd;
	              break;
	            case Date:
	              sExpires = "; expires=" + vEnd.toUTCString();
	              break;
	          }
	        }
	        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	        return true;
	      },
	      removeItem: function (sKey, sPath, sDomain) {
	        if (!this.hasItem(sKey)) { return false; }
	        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
	        return true;
	      },
	      hasItem: function (sKey) {
	        if (!sKey) { return false; }
	        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	      },
	      keys: function () {
	        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
	        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
	        return aKeys;
	      }
	    };

	    return docCookies;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	 /*!
	 * =====================================================
	 * Mui v1.0.0 (https://github.com/dcloudio/mui)
	 * =====================================================
	 */
	var mui = function(a, b) {
	    var c = /complete|loaded|interactive/, d = /^#([\w-]*)$/, e = /^\.([\w-]+)$/, f = /^[\w-]+$/, g = /translate(?:3d)?\((.+?)\)/, h = /matrix(3d)?\((.+?)\)/, i = function(b, c) {
	        if (c = c || a, !b)
	            return j();
	        if ("object" == typeof b)
	            return j([b], null);
	        if ("function" == typeof b)
	            return i.ready(b);
	        try {
	            if (d.test(b)) {
	                var e = a.getElementById(RegExp.$1);
	                return j(e ? [e] : [])
	            }
	            return j(i.qsa(b, c), b)
	        } catch (f) {
	        }
	        return j()
	    }, j = function(a, b) {
	        return a = a || [], Object.setPrototypeOf(a, i.fn), a.selector = b || "", a
	    };
	    i.uuid = 0, i.data = {}, i.extend = function(a, c, d) {
	        a || (a = {}), c || (c = {});
	        for (var e in c)
	            c[e] !== b && (d && "object" == typeof a[e] ? i.extend(a[e], c[e], d) : a[e] = c[e]);
	        return a
	    }, i.noop = function() {
	    }, i.slice = [].slice, i.type = function(a) {
	        return null === a ? String(a) : k[{}.toString.call(a)] || "object"
	    }, i.isArray = Array.isArray || function(a) {
	        return a instanceof Array
	    }, i.isWindow = function(a) {
	        return null !== a && a === a.window
	    }, i.isObject = function(a) {
	        return "object" === i.type(a)
	    }, i.isPlainObject = function(a) {
	        return i.isObject(a) && !i.isWindow(a) && Object.getPrototypeOf(a) === Object.prototype
	    }, i.isFunction = function(a) {
	        return "function" === i.type(a)
	    }, i.qsa = function(b, c) {
	        return c = c || a, i.slice.call(e.test(b) ? c.getElementsByClassName(RegExp.$1) : f.test(b) ? c.getElementsByTagName(b) : c.querySelectorAll(b))
	    }, i.ready = function(b) {
	        return c.test(a.readyState) ? b(i) : a.addEventListener("DOMContentLoaded", function() {
	            b(i)
	        }, !1), this
	    }, i.map = function(a, b) {
	        var c, d, e, f = [];
	        if ("number" == typeof a.length)
	            for (d = 0, len = a.length; d < len; d++)
	                c = b(a[d], d), null !== c && f.push(c);
	        else
	            for (e in a)
	                c = b(a[e], e), null !== c && f.push(c);
	        return f.length > 0 ? [].concat.apply([], f) : f
	    }, i.each = function(a, b) {
	        if ("number" == typeof a.length)
	            [].every.call(a, function(a, c) {
	                return b.call(a, c, a) !== !1
	            });
	        else
	            for (var c in a)
	                if (b.call(a[c], c, a[c]) === !1)
	                    return a;
	        return this
	    }, i.focus = function(a) {
	        i.os.ios ? setTimeout(function() {
	            a.focus()
	        }, 10) : a.focus()
	    }, i.trigger = function(a, b, c) {
	        return a.dispatchEvent(new CustomEvent(b, {detail: c,bubbles: !0,cancelable: !0})), this
	    }, i.getStyles = function(a, b) {
	        var c = a.ownerDocument.defaultView.getComputedStyle(a, null);
	        return b ? c.getPropertyValue(b) || c[b] : c
	    }, i.parseTranslate = function(a, b) {
	        var c = a.match(g || "");
	        return c && c[1] || (c = ["", "0,0,0"]), c = c[1].split(","), c = {x: parseFloat(c[0]),y: parseFloat(c[1]),z: parseFloat(c[2])}, b && c.hasOwnProperty(b) ? c[b] : c
	    }, i.parseTranslateMatrix = function(a, b) {
	        var c = a.match(h), d = c && c[1];
	        c ? (c = c[2].split(","), "3d" === d ? c = c.slice(12, 15) : (c.push(0), c = c.slice(4, 7))) : c = [0, 0, 0];
	        var e = {x: parseFloat(c[0]),y: parseFloat(c[1]),z: parseFloat(c[2])};
	        return b && e.hasOwnProperty(b) ? e[b] : e
	    }, i.regesterHandler = function(a, b) {
	        var c = i[a];
	        return c || (c = []), b.index = b.index || 1e3, c.push(b), c.sort(function(a, b) {
	            return a.index - b.index
	        }), i[a] = c, i[a]
	    };
	    var k = {};
	    return i.each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"], function(a, b) {
	        k["[object " + b + "]"] = b.toLowerCase()
	    }), window.JSON && (i.parseJSON = JSON.parse), i.fn = {each: function(a) {
	            return [].every.call(this, function(b, c) {
	                return a.call(b, c, b) !== !1
	            }), this
	        }}, i
	}(document);
	!function(a, b) {
	    function c(c) {
	        this.os = {};
	        var d = [function() {
	                var a = c.match(/(Android);?[\s\/]+([\d.]+)?/);
	                return a && (this.os.android = !0, this.os.version = a[2], this.os.isBadAndroid = !/Chrome\/\d/.test(b.navigator.appVersion)), this.os.android === !0
	            }, function() {
	                var a = c.match(/(iPhone\sOS)\s([\d_]+)/);
	                if (a)
	                    this.os.ios = this.os.iphone = !0, this.os.version = a[2].replace(/_/g, ".");
	                else {
	                    var b = c.match(/(iPad).*OS\s([\d_]+)/);
	                    b && (this.os.ios = this.os.ipad = !0, this.os.version = b[2].replace(/_/g, "."))
	                }
	                return this.os.ios === !0
	            }];
	        [].every.call(d, function(b) {
	            return !b.call(a)
	        })
	    }
	    c.call(a, navigator.userAgent)
	}(mui, window), function(a) {
	    function b(a) {
	        this.os = this.os || {};
	        var b = a.match(/Html5Plus/i);
	        b && (this.os.plus = !0)
	    }
	    b.call(a, navigator.userAgent)
	}(mui), function(a, b, c) {
	    a.targets = {}, a.targetHandles = [], a.registerTarget = function(b) {
	        return b.index = b.index || 1e3, a.targetHandles.push(b), a.targetHandles.sort(function(a, b) {
	            return a.index - b.index
	        }), a.targetHandles
	    }, b.addEventListener("touchstart", function(b) {
	        for (var d = b.target, e = {}; d && d !== c; d = d.parentNode) {
	            var f = !1;
	            if (a.each(a.targetHandles, function(c, g) {
	                var h = g.name;
	                f || e[h] || !g.hasOwnProperty("handle") ? e[h] || g.isReset !== !1 && (a.targets[h] = !1) : (a.targets[h] = g.handle(b, d), a.targets[h] && (e[h] = !0, g.isContinue !== !0 && (f = !0)))
	            }), f)
	                break
	        }
	    })
	}(mui, window, document), function(a) {
	    String.prototype.trim === a && (String.prototype.trim = function() {
	        return this.replace(/^\s+|\s+$/g, "")
	    }), Object.setPrototypeOf = Object.setPrototypeOf || function(a, b) {
	        return a.__proto__ = b, a
	    }
	}(), function() {
	    function a(a, b) {
	        b = b || {bubbles: !1,cancelable: !1,detail: void 0};
	        var c = document.createEvent("Events"), d = !0;
	        if (b)
	            for (var e in b)
	                "bubbles" === e ? d = !!b[e] : c[e] = b[e];
	        return c.initEvent(a, d, !0), c
	    }
	    "undefined" == typeof window.CustomEvent && (a.prototype = window.Event.prototype, window.CustomEvent = a)
	}(), function(a) {
	    "classList" in a.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {get: function() {
	            function a(a) {
	                return function(c) {
	                    var d = b.className.split(/\s+/), e = d.indexOf(c);
	                    a(d, e, c), b.className = d.join(" ")
	                }
	            }
	            var b = this, c = {add: a(function(a, b, c) {
	                    ~b || a.push(c)
	                }),remove: a(function(a, b) {
	                    ~b && a.splice(b, 1)
	                }),toggle: a(function(a, b, c) {
	                    ~b ? a.splice(b, 1) : a.push(c)
	                }),contains: function(a) {
	                    return !!~b.className.split(/\s+/).indexOf(a)
	                },item: function(a) {
	                    return b.className.split(/\s+/)[a] || null
	                }};
	            return Object.defineProperty(c, "length", {get: function() {
	                    return b.className.split(/\s+/).length
	                }}), c
	        }})
	}(document), function(a) {
	    var b = 0;
	    a.requestAnimationFrame || (a.requestAnimationFrame = a.webkitRequestAnimationFrame, a.cancelAnimationFrame = a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame), a.requestAnimationFrame || (a.requestAnimationFrame = function(c) {
	        var d = (new Date).getTime(), e = Math.max(0, 16.7 - (d - b)), f = a.setTimeout(function() {
	            c(d + e)
	        }, e);
	        return b = d + e, f
	    }), a.cancelAnimationFrame || (a.cancelAnimationFrame = function(a) {
	        clearTimeout(a)
	    })
	}(window), function(a, b, c) {
	    if (!b.FastClick) {
	        var d = function(a, b) {
	            return !b.type || "radio" !== b.type && "checkbox" !== b.type ? !1 : b
	        };
	        a.registerTarget({name: c,index: 40,handle: d,target: !1});
	        var e = function(c) {
	            var d = a.targets.click;
	            if (d) {
	                var e, f;
	                document.activeElement && document.activeElement !== d && document.activeElement.blur(), f = c.detail.gesture.changedTouches[0], e = document.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, b, 1, f.screenX, f.screenY, f.clientX, f.clientY, !1, !1, !1, !1, 0, null), e.forwardedTouchEvent = !0, d.dispatchEvent(e)
	            }
	        };
	        b.addEventListener("tap", e), b.addEventListener("doubletap", e), b.addEventListener("click", function(b) {
	            return a.targets.click && !b.forwardedTouchEvent ? (b.stopImmediatePropagation ? b.stopImmediatePropagation() : b.propagationStopped = !0, b.stopPropagation(), b.preventDefault(), !1) : void 0
	        }, !0)
	    }
	}(mui, window, "click"), function(a, b) {
	    a(function() {
	        if (a.os.ios) {
	            var c = "mui-focusin", d = "mui-bar-tab", e = "mui-bar-footer", f = "mui-bar-footer-secondary", g = "mui-bar-footer-secondary-tab";
	            b.addEventListener("focusin", function(a) {
	                var h = a.target;
	                if (!h.tagName || "INPUT" === h.tagName) {
	                    b.body.classList.add(c);
	                    for (var i = !1; h && h !== b; h = h.parentNode) {
	                        var j = h.classList;
	                        if (j && j.contains(d) || j.contains(e) || j.contains(f) || j.contains(g)) {
	                            i = !0;
	                            break
	                        }
	                    }
	                    if (i) {
	                        var k = b.body.scrollHeight, l = b.body.scrollLeft;
	                        setTimeout(function() {
	                            window.scrollTo(l, k)
	                        }, 20)
	                    }
	                }
	            }), b.addEventListener("focusout", function() {
	                var a = b.body.classList;
	                a.contains(c) && (a.remove(c), setTimeout(function() {
	                    window.scrollTo(b.body.scrollLeft, b.body.scrollTop)
	                }, 20))
	            })
	        }
	    })
	}(mui, document), function(a) {
	    a.namespace = "mui", a.classNamePrefix = a.namespace + "-", a.classSelectorPrefix = "." + a.classNamePrefix, a.className = function(b) {
	        return a.classNamePrefix + b
	    }, a.classSelector = function(b) {
	        return b.replace(/\./g, a.classSelectorPrefix)
	    }, a.eventName = function(b, c) {
	        return b + (a.namespace ? "." + a.namespace : "") + (c ? "." + c : "")
	    }
	}(mui), function(a, b) {
	    a.EVENT_START = "touchstart", a.EVENT_MOVE = "touchmove", a.EVENT_END = "touchend", a.EVENT_CANCEL = "touchcancel", a.EVENT_CLICK = "click", a.preventDefault = function(a) {
	        a.preventDefault()
	    }, a.stopPropagation = function(a) {
	        a.stopPropagation()
	    }, a.registerGesture = function(b) {
	        return a.regesterHandler("gestures", b)
	    };
	    var c = function(a, b) {
	        var c = b.x - a.x, d = b.y - a.y;
	        return Math.sqrt(c * c + d * d)
	    }, d = function(a, b) {
	        return 180 * Math.atan2(b.y - a.y, b.x - a.x) / Math.PI
	    }, e = function(a) {
	        return -45 > a && a > -135 ? "up" : a >= 45 && 135 > a ? "down" : a >= 135 || -135 >= a ? "left" : a >= -45 && 45 >= a ? "right" : null
	    }, f = function(b, c) {
	        a.gestures.stoped || a.each(a.gestures, function(d, e) {
	            a.gestures.stoped || a.options.gestureConfig[e.name] !== !1 && e.handle(b, c)
	        })
	    }, g = {}, h = function(b) {
	        a.gestures.stoped = !1;
	        var c = Date.now(), d = b.touches ? b.touches[0] : b;
	        g = {target: b.target,lastTarget: g.lastTarget ? g.lastTarget : null,startTime: c,touchTime: 0,flickStartTime: c,lastTapTime: g.lastTapTime ? g.lastTapTime : 0,start: {x: d.pageX,y: d.pageY},flickStart: {x: d.pageX,y: d.pageY},flickDistanceX: 0,flickDistanceY: 0,move: {x: 0,y: 0},deltaX: 0,deltaY: 0,lastDeltaX: 0,lastDeltaY: 0,angle: "",direction: "",distance: 0,drag: !1,swipe: !1,gesture: b}, f(b, g)
	    }, i = function(b) {
	        if (!a.gestures.stoped && b.target == g.target) {
	            var h = Date.now(), i = b.touches ? b.touches[0] : b;
	            g.touchTime = h - g.startTime, g.move = {x: i.pageX,y: i.pageY}, h - g.flickStartTime > 300 && (g.flickStartTime = h, g.flickStart = g.move), g.distance = c(g.start, g.move), g.angle = d(g.start, g.move), g.direction = e(g.angle), g.lastDeltaX = g.deltaX, g.lastDeltaY = g.deltaY, g.deltaX = g.move.x - g.start.x, g.deltaY = g.move.y - g.start.y, g.gesture = b, f(b, g)
	        }
	    }, j = function(b) {
	        if (!a.gestures.stoped && b.target == g.target) {
	            var c = Date.now();
	            g.touchTime = c - g.startTime, g.flickTime = c - g.flickStartTime, g.flickDistanceX = g.move.x - g.flickStart.x, g.flickDistanceY = g.move.y - g.flickStart.y, g.gesture = b, f(b, g)
	        }
	    };
	    b.addEventListener(a.EVENT_START, h), b.addEventListener(a.EVENT_MOVE, i), b.addEventListener(a.EVENT_END, j), b.addEventListener(a.EVENT_CANCEL, j), b.addEventListener(a.EVENT_CLICK, function(b) {
	        (a.targets.popover && b.target === a.targets.popover || a.targets.tab && a.targets.tab.hash && b.target === a.targets.tab || a.targets.offcanvas || a.targets.modal) && b.preventDefault()
	    }), a.fn.on = function(b, c, d) {
	        this.each(function() {
	            var e = this;
	            e.addEventListener(b, function(b) {
	                var f = a.qsa(c, e), g = b.target;
	                if (f && f.length > 0)
	                    for (; g && g !== document && g !== e; g = g.parentNode)
	                        g && ~f.indexOf(g) && (b.detail ? b.detail.currentTarget = g : b.detail = {currentTarget: g}, d.call(g, b))
	            }), e.removeEventListener(a.EVENT_CLICK, k), e.addEventListener(a.EVENT_CLICK, k)
	        })
	    };
	    var k = function(a) {
	        a.target && "INPUT" !== a.target.tagName && a.preventDefault()
	    }
	}(mui, window), function(a, b) {
	    var c = function(c, d) {
	        if (c.type === a.EVENT_END || c.type === a.EVENT_CANCEL) {
	            var e = this.options;
	            d.direction && e.flickMaxTime > d.flickTime && d.distance > e.flickMinDistince && (d.flick = !0, a.trigger(c.target, b, d), a.trigger(c.target, b + d.direction, d))
	        }
	    };
	    a.registerGesture({name: b,index: 5,handle: c,options: {flickMaxTime: 200,flickMinDistince: 10}})
	}(mui, "flick"), function(a, b) {
	    var c = function(c, d) {
	        if (c.type === a.EVENT_END || c.type === a.EVENT_CANCEL) {
	            var e = this.options;
	            d.direction && e.swipeMaxTime > d.touchTime && d.distance > e.swipeMinDistince && (d.swipe = !0, a.trigger(c.target, b + d.direction, d))
	        }
	    };
	    a.registerGesture({name: b,index: 10,handle: c,options: {swipeMaxTime: 300,swipeMinDistince: 18}})
	}(mui, "swipe"), function(a, b) {
	    var c = !1, d = function(d, e) {
	        switch (d.type) {
	            case a.EVENT_MOVE:
	                e.direction && (c ? c && c !== e.direction && (e.direction = "up" === c || "down" === c ? e.deltaY < 0 ? "up" : "down" : e.deltaX < 0 ? "left" : "right") : c = e.direction, e.drag || (e.drag = !0, a.trigger(d.target, b + "start", e)), a.trigger(d.target, b, e), a.trigger(d.target, b + e.direction, e));
	                break;
	            case a.EVENT_END:
	            case a.EVENT_CANCEL:
	                e.drag && a.trigger(d.target, b + "end", e), c = !1
	        }
	    };
	    a.registerGesture({name: b,index: 20,handle: d,options: {}})
	}(mui, "drag"), function(a, b) {
	    var c = function(c, d) {
	        if (c.type === a.EVENT_END) {
	            var e = this.options;
	            if (d.distance < e.tapMaxDistance && d.touchTime < e.tapMaxTime) {
	                if (a.options.gestureConfig.doubletap && d.lastTarget && d.lastTarget === c.target && d.lastTapTime && d.startTime - d.lastTapTime < e.tapMaxInterval)
	                    return a.trigger(c.target, "doubletap", d), d.lastTapTime = Date.now(), void (d.lastTarget = c.target);
	                a.trigger(c.target, b, d), d.lastTapTime = Date.now(), d.lastTarget = c.target
	            }
	        }
	    };
	    a.registerGesture({name: b,index: 30,handle: c,options: {tapMaxInterval: 300,tapMaxDistance: 5,tapMaxTime: 250}})
	}(mui, "tap"), function(a, b) {
	    var c, d = function(d, e) {
	        var f = this.options;
	        switch (d.type) {
	            case a.EVENT_START:
	                clearTimeout(c), c = setTimeout(function() {
	                    e.drag || a.trigger(d.target, b, e)
	                }, f.holdTimeout);
	                break;
	            case a.EVENT_MOVE:
	                e.distance > f.holdThreshold && clearTimeout(c);
	                break;
	            case a.EVENT_END:
	            case a.EVENT_CANCEL:
	                clearTimeout(c)
	        }
	    };
	    a.registerGesture({name: b,index: 10,handle: d,options: {holdTimeout: 500,holdThreshold: 2}})
	}(mui, "longtap"), function(a) {
	    a.global = a.options = {gestureConfig: {tap: !0,doubletap: !1,longtap: !1,flick: !0,swipe: !0,drag: !0}}, a.initGlobal = function(b) {
	        return a.options = a.extend(a.global, b, !0), this
	    };
	    var b = {}, c = !1;
	    a.init = function(d) {
	        return c = !0, a.options = a.extend(a.global, d || {}, !0), a.ready(function() {
	            a.each(a.inits, function(c, d) {
	                var e = !(b[d.name] && !d.repeat);
	                e && (d.handle.call(a), b[d.name] = !0)
	            })
	        }), this
	    }, a.registerInit = function(b) {
	        return a.regesterHandler("inits", b)
	    }, a(function() {
	        a.os.ios ? document.body.classList.add("mui-ios") : a.os.android && document.body.classList.add("mui-android")
	    })
	}(mui), function(a) {
	    var b = {swipeBack: !1,preloadPages: [],preloadLimit: 10,keyEventBind: {backbutton: !0,menubutton: !0}}, c = {autoShow: !0,duration: a.os.ios ? 200 : 100,aniShow: "slide-in-right"};
	    a.options.show && (c = a.extend(c, a.options.show, !0)), a.currentWebview = null, a.isHomePage = !1, a.extend(a.global, b, !0), a.extend(a.options, b, !0), a.waitingOptions = function(b) {
	        return a.extend({autoShow: !0,title: ""}, b)
	    }, a.showOptions = function(b) {
	        return a.extend(c, b)
	    }, a.windowOptions = function(b) {
	        return a.extend({scalable: !1,bounce: ""}, b)
	    }, a.plusReady = function(a) {
	        return window.plus ? a() : document.addEventListener("plusready", function() {
	            a()
	        }, !1), this
	    }, a.fire = function(a, b, c) {
	        a && a.evalJS("mui&&mui.receive('" + b + "','" + JSON.stringify(c || {}) + "')")
	    }, a.receive = function(b, c) {
	        b && (c = JSON.parse(c), a.trigger(document, b, c))
	    };
	    var d = function(b) {
	        if (!b.preloaded) {
	            a.fire(b, "preload");
	            for (var c = b.children(), d = 0; d < c.length; d++)
	                a.fire(c[d], "preload");
	            b.preloaded = !0
	        }
	    }, e = function(b, c, d) {
	        if (d) {
	            if (!b[c + "ed"]) {
	                a.fire(b, c);
	                for (var e = b.children(), f = 0; f < e.length; f++)
	                    a.fire(e[f], c);
	                b[c + "ed"] = !0
	            }
	        } else {
	            a.fire(b, c);
	            for (var e = b.children(), f = 0; f < e.length; f++)
	                a.fire(e[f], c)
	        }
	    };
	    a.openWindow = function(b, c, f) {
	        if (window.plus) {
	            "object" == typeof b ? (f = b, b = f.url, c = f.id || b) : "object" == typeof c ? (f = c, c = b) : c = c || b, f = f || {};
	            var g, h, i, j = f.params || {};
	            if (a.webviews[c]) {
	                var k = a.webviews[c];
	                return g = k.webview, g && g.getURL() || (f = a.extend(f, {id: c,url: b,preload: !0}, !0), g = a.createWindow(f)), h = k.show, h = f.show ? a.extend(h, f.show) : h, g.show(h.aniShow, h.duration, function() {
	                    d(g), e(g, "pagebeforeshow", !1)
	                }), k.afterShowMethodName && g.evalJS(k.afterShowMethodName + "('" + JSON.stringify(j) + "')"), g
	            }
	            var l = a.waitingOptions(f.waiting);
	            return l.autoShow && (i = plus.nativeUI.showWaiting(l.title, l.options)), f = a.extend(f, {id: c,url: b}), g = a.createWindow(f), h = a.showOptions(f.show), h.autoShow && g.addEventListener("loaded", function() {
	                i && i.close(), g.show(h.aniShow, h.duration, function() {
	                    d(g), e(g, "pagebeforeshow", !1)
	                }), g.showed = !0, f.afterShowMethodName && g.evalJS(f.afterShowMethodName + "('" + JSON.stringify(j) + "')")
	            }, !1), g
	        }
	    }, a.createWindow = function(b, c) {
	        if (window.plus) {
	            var d, e = b.id || b.url;
	            if (b.preload) {
	                a.webviews[e] && a.webviews[e].webview.getURL() ? d = a.webviews[e].webview : (d = plus.webview.create(b.url, e, a.windowOptions(b.styles), a.extend({preload: !0}, b.extras)), b.subpages && a.each(b.subpages, function(b, c) {
	                    var e = plus.webview.create(c.url, c.id || c.url, a.windowOptions(c.styles), a.extend({preload: !0}, c.extras));
	                    d.append(e)
	                })), a.webviews[e] = {webview: d,preload: !0,show: a.showOptions(b.show),afterShowMethodName: b.afterShowMethodName};
	                var f = a.data.preloads, g = f.indexOf(e);
	                if (~g && f.splice(g, 1), f.push(e), f.length > a.options.preloadLimit) {
	                    var h = a.data.preloads.shift(), i = a.webviews[h];
	                    i && i.webview && a.closeAll(i.webview), delete a.webviews[h]
	                }
	            } else
	                c !== !1 && (d = plus.webview.create(b.url, e, a.windowOptions(b.styles), b.extras), b.subpages && a.each(b.subpages, function(b, c) {
	                    var e = plus.webview.create(c.url, c.id || c.url, a.windowOptions(c.styles), c.extras);
	                    d.append(e)
	                }));
	            return d
	        }
	    }, a.preload = function(b) {
	        return b.preload || (b.preload = !0), a.createWindow(b)
	    }, a.closeOpened = function(b) {
	        var c = b.opened();
	        if (c)
	            for (var d = 0, e = c.length; e > d; d++) {
	                var f = c[d], g = f.opened();
	                g && g.length > 0 ? a.closeOpened(f) : f.parent() !== b && f.close("none")
	            }
	    }, a.closeAll = function(b, c) {
	        a.closeOpened(b), c ? b.close(c) : b.close()
	    }, a.createWindows = function(b) {
	        a.each(b, function(b, c) {
	            a.createWindow(c, !1)
	        })
	    }, a.appendWebview = function(b) {
	        if (window.plus) {
	            var c, d = b.id || b.url;
	            return a.webviews[d] || (c = plus.webview.create(b.url, d, b.styles, b.extras), c.addEventListener("loaded", function() {
	                a.currentWebview.append(c)
	            }), a.webviews[d] = b), c
	        }
	    }, a.webviews = {}, a.data.preloads = [], a.plusReady(function() {
	        a.currentWebview = plus.webview.currentWebview()
	    }), a.registerInit({name: "5+",index: 100,handle: function() {
	            var b = a.options, c = b.subpages || [];
	            if (a.os.plus)
	                a.plusReady(function() {
	                    a.each(c, function(b, c) {
	                        a.appendWebview(c)
	                    }), a.currentWebview === plus.webview.getWebviewById(plus.runtime.appid) && (a.isHomePage = !0, setTimeout(function() {
	                        d(a.currentWebview)
	                    }, 300)), a.os.ios && a.options.statusBarBackground && plus.navigator.setStatusBarBackground(a.options.statusBarBackground)
	                });
	            else if (c.length > 0) {
	                var e = document.createElement("div");
	                e.className = "mui-error";
	                var f = document.createElement("span");
	                f.innerHTML = "在该浏览器下，不支持创建子页面，具体参考", e.appendChild(f);
	                var g = document.createElement("a");
	                g.innerHTML = '"mui框架适用场景"', g.href = "http://ask.dcloud.net.cn/article/113", e.appendChild(g), document.body.appendChild(e), console.log("在该浏览器下，不支持创建子页面")
	            }
	        }}), window.addEventListener("preload", function() {
	        var b = a.options.preloadPages || [];
	        a.plusReady(function() {
	            a.each(b, function(b, c) {
	                a.createWindow(a.extend(c, {preload: !0}))
	            })
	        })
	    })
	}(mui), function(a, b) {
	    a.registerBack = function(b) {
	        return a.regesterHandler("backs", b)
	    }, a.registerBack({name: "browser",index: 100,handle: function() {
	            return b.history.length > 1 ? (b.history.back(), !0) : !1
	        }}), a.back = function() {
	        ("function" != typeof a.options.back || a.options.back() !== !1) && a.each(a.backs, function(a, b) {
	            return !b.handle()
	        })
	    }, b.addEventListener("tap", function() {
	        var b = a.targets.action;
	        b && b.classList.contains("mui-action-back") && a.back()
	    }), b.addEventListener("swiperight", function(b) {
	        var c = b.detail;
	        a.options.swipeBack === !0 && Math.abs(c.angle) < 3 && a.back()
	    })
	}(mui, window), function(a, b) {
	    a.os.plus && a.os.android && a.registerBack({name: "mui",index: 5,handle: function() {
	            if (a.targets._popover)
	                return a(a.targets._popover).popover("hide"), !0;
	            var b = document.querySelector(".mui-off-canvas-wrap.mui-active");
	            return b ? (a(b).offCanvas("close"), !0) : void 0
	        }}), a.registerBack({name: "5+",index: 10,handle: function() {
	            if (!b.plus)
	                return !1;
	            var c = a.currentWebview, d = c.parent();
	            return d ? d.evalJS("mui.back();") : c.canBack(function(d) {
	                if (d.canBack)
	                    b.history.back();
	                else {
	                    var e = c.opener();
	                    e && (c.preload ? c.hide("auto") : a.closeAll(c))
	                }
	            }), !0
	        }}), a.menu = function() {
	        var c = document.querySelector(".mui-action-menu");
	        if (c)
	            a.trigger(c, "touchstart"), a.trigger(c, "tap");
	        else if (b.plus) {
	            var d = a.currentWebview, e = d.parent();
	            e && e.evalJS("mui&&mui.menu();")
	        }
	    }, a.registerInit({name: "keyEventBind",index: 1e3,handle: function() {
	            a.plusReady(function() {
	                a.options.keyEventBind.backbutton && plus.key.addEventListener("backbutton", a.back, !1), a.options.keyEventBind.menubutton && plus.key.addEventListener("menubutton", a.menu, !1)
	            })
	        }})
	}(mui, window), function(a) {
	    a.registerInit({name: "pullrefresh",index: 1e3,handle: function() {
	            var b = a.options, c = b.pullRefresh || {}, d = c.down && c.down.hasOwnProperty("callback"), e = c.up && c.up.hasOwnProperty("callback");
	            if (d || e) {
	                var f = c.container;
	                if (f) {
	                    var g = a(f);
	                    1 === g.length && (a.os.plus && a.os.android ? a.plusReady(function() {
	                        var b = plus.webview.currentWebview();
	                        if (e) {
	                            var f = {};
	                            f.up = c.up, f.webviewId = b.id || b.getURL(), g.pullRefresh(f)
	                        }
	                        if (d) {
	                            var h = b.parent(), i = b.id || b.getURL();
	                            if (h) {
	                                e || g.pullRefresh({webviewId: i});
	                                var j = {webviewId: i};
	                                j.down = a.extend({}, c.down), j.down.callback = "_CALLBACK", h.evalJS("mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(j) + "')")
	                            }
	                        }
	                    }) : g.pullRefresh(c))
	                }
	            }
	        }})
	}(mui), function(a, b, c) {
	    var d = "application/json", e = "text/html", f = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, g = /^(?:text|application)\/javascript/i, h = /^(?:text|application)\/xml/i, i = /^\s*$/;
	    a.ajaxSettings = {type: "GET",success: a.noop,error: a.noop,complete: a.noop,context: null,xhr: function() {
	            return new b.XMLHttpRequest
	        },accepts: {script: "text/javascript, application/javascript, application/x-javascript",json: d,xml: "application/xml, text/xml",html: e,text: "text/plain"},timeout: 0,processData: !0,cache: !0};
	    var j = function(a, b, c) {
	        c.success.call(c.context, a, "success", b), l("success", b, c)
	    }, k = function(a, b, c, d) {
	        d.error.call(d.context, c, b, a), l(b, c, d)
	    }, l = function(a, b, c) {
	        c.complete.call(c.context, b, a)
	    }, m = function(b, c, d, e) {
	        var f, g = a.isArray(c), h = a.isPlainObject(c);
	        a.each(c, function(c, i) {
	            f = a.type(i), e && (c = d ? e : e + "[" + (h || "object" === f || "array" === f ? c : "") + "]"), !e && g ? b.add(i.name, i.value) : "array" === f || !d && "object" === f ? m(b, i, d, c) : b.add(c, i)
	        })
	    }, n = function(b) {
	        b.processData && b.data && "string" != typeof b.data && (b.data = a.param(b.data, b.traditional)), !b.data || b.type && "GET" !== b.type.toUpperCase() || (b.url = o(b.url, b.data), b.data = c)
	    }, o = function(a, b) {
	        return "" === b ? a : (a + "&" + b).replace(/[&?]{1,2}/, "?")
	    }, p = function(a) {
	        return a && (a = a.split(";", 2)[0]), a && (a === e ? "html" : a === d ? "json" : g.test(a) ? "script" : h.test(a) && "xml") || "text"
	    }, q = function(b, d, e, f) {
	        return a.isFunction(d) && (f = e, e = d, d = c), a.isFunction(e) || (f = e, e = c), {url: b,data: d,success: e,dataType: f}
	    };
	    a.ajax = function(d, e) {
	        "object" == typeof d && (e = d, d = c);
	        var f = e || {};
	        f.url = d || f.url;
	        for (key in a.ajaxSettings)
	            f[key] === c && (f[key] = a.ajaxSettings[key]);
	        n(f);
	        var g = f.dataType;
	        f.cache !== !1 && (e && e.cache === !0 || "script" !== g) || (f.url = o(f.url, "_=" + Date.now()));
	        var h, l = f.accepts[g], m = {}, q = function(a, b) {
	            m[a.toLowerCase()] = [a, b]
	        }, r = /^([\w-]+:)\/\//.test(f.url) ? RegExp.$1 : b.location.protocol, s = f.xhr(), t = s.setRequestHeader;
	        if (q("X-Requested-With", "XMLHttpRequest"), q("Accept", l || "*/*"), (l = f.mimeType || l) && (l.indexOf(",") > -1 && (l = l.split(",", 2)[0]), s.overrideMimeType && s.overrideMimeType(l)), (f.contentType || f.contentType !== !1 && f.data && "GET" !== f.type.toUpperCase()) && q("Content-Type", f.contentType || "application/x-www-form-urlencoded"), f.headers)
	            for (name in f.headers)
	                q(name, f.headers[name]);
	        if (s.setRequestHeader = q, s.onreadystatechange = function() {
	            if (4 === s.readyState) {
	                s.onreadystatechange = a.noop, clearTimeout(h);
	                var b, c = !1;
	                if (s.status >= 200 && s.status < 300 || 304 === s.status || 0 === s.status && "file:" === r) {
	                    g = g || p(f.mimeType || s.getResponseHeader("content-type")), b = s.responseText;
	                    try {
	                        "script" === g ? (1, eval)(b) : "xml" === g ? b = s.responseXML : "json" === g && (b = i.test(b) ? null : a.parseJSON(b))
	                    } catch (d) {
	                        c = d
	                    }
	                    c ? k(c, "parsererror", s, f) : j(b, s, f)
	                } else
	                    k(s.statusText || null, s.status ? "error" : "abort", s, f)
	            }
	        }, f.xhrFields)
	            for (name in f.xhrFields)
	                s[name] = f.xhrFields[name];
	        var u = "async" in f ? f.async : !0;
	        s.open(f.type, f.url, u, f.username, f.password);
	        for (name in m)
	            t.apply(s, m[name]);
	        return f.timeout > 0 && (h = setTimeout(function() {
	            s.onreadystatechange = a.noop, s.abort(), k(null, "timeout", s, f)
	        }, f.timeout)), s.send(f.data ? f.data : null), s
	    }, a.param = function(a, b) {
	        var c = [];
	        return c.add = function(a, b) {
	            this.push(encodeURIComponent(a) + "=" + encodeURIComponent(b))
	        }, m(c, a, b), c.join("&").replace(/%20/g, "+")
	    }, a.get = function() {
	        return a.ajax(q.apply(null, arguments))
	    }, a.post = function() {
	        var b = q.apply(null, arguments);
	        return b.type = "POST", a.ajax(b)
	    }, a.getJSON = function() {
	        var b = q.apply(null, arguments);
	        return b.dataType = "json", a.ajax(b)
	    }, a.fn.load = function(b, c, d) {
	        if (!this.length)
	            return this;
	        var e, g = this, h = b.split(/\s/), i = q(b, c, d), j = i.success;
	        return h.length > 1 && (i.url = h[0], e = h[1]), i.success = function(a) {
	            if (e) {
	                var b = document.createElement("div");
	                b.innerHTML = a.replace(f, "");
	                var c = document.createElement("div"), d = b.querySelectorAll(e);
	                if (d && d.length > 0)
	                    for (var h = 0, i = d.length; i > h; h++)
	                        c.appendChild(d[h]);
	                g[0].innerHTML = c.innerHTML
	            } else
	                g[0].innerHTML = a;
	            j && j.apply(g, arguments)
	        }, a.ajax(i), this
	    }
	}(mui, window), function(a) {
	    a.plusReady(function() {
	        a.ajaxSettings = a.extend(a.ajaxSettings, {xhr: function() {
	                return new plus.net.XMLHttpRequest
	            }})
	    })
	}(mui), function(a, b, c) {
	    a.offset = function(a) {
	        var d = {top: 0,left: 0};
	        return typeof a.getBoundingClientRect !== c && (d = a.getBoundingClientRect()), {top: d.top + b.pageYOffset - a.clientTop,left: d.left + b.pageXOffset - a.clientLeft}
	    }
	}(mui, window), function(a, b) {
	    a.scrollTo = function(a, c, d) {
	        c = c || 1e3;
	        var e = function(c) {
	            if (0 >= c)
	                return void (d && d());
	            var f = a - b.scrollY;
	            setTimeout(function() {
	                b.scrollTo(0, b.scrollY + f / c * 10), e(c - 10)
	            }, 16.7)
	        };
	        e(c)
	    }, a.animationFrame = function(a) {
	        var b, c, d;
	        return function() {
	            b = arguments, d = this, c || (c = !0, requestAnimationFrame(function() {
	                a.apply(d, b), c = !1
	            }))
	        }
	    }
	}(mui, window), function(a) {
	    var b = !1, c = /xyz/.test(function() {
	        xyz
	    }) ? /\b_super\b/ : /.*/, d = function() {
	    };
	    d.extend = function(a) {
	        function d() {
	            !b && this.init && this.init.apply(this, arguments)
	        }
	        var e = this.prototype;
	        b = !0;
	        var f = new this;
	        b = !1;
	        for (var g in a)
	            f[g] = "function" == typeof a[g] && "function" == typeof e[g] && c.test(a[g]) ? function(a, b) {
	                return function() {
	                    var c = this._super;
	                    this._super = e[a];
	                    var d = b.apply(this, arguments);
	                    return this._super = c, d
	                }
	            }(g, a[g]) : a[g];
	        return d.prototype = f, d.prototype.constructor = d, d.extend = arguments.callee, d
	    }, a.Class = d
	}(mui), function(a, b) {
	    var c = "mui-pull-top-pocket", d = "mui-pull-bottom-pocket", e = "mui-pull", f = "mui-pull-loading", g = "mui-pull-caption", h = "mui-icon", i = "mui-spinner", j = "mui-icon-pulldown", k = "mui-in", l = "mui-block", m = "mui-visibility", n = f + " " + h + " " + j, o = f + " " + h + " " + j, p = f + " " + h + " " + i, q = ['<div class="' + e + '">', '<div class="{icon}"></div>', '<div class="' + g + '">{contentrefresh}</div>', "</div>"].join(""), r = {init: function(b, c) {
	            this._super(b, a.extend({scrollY: !0,scrollX: !1,indicators: !0,down: {height: 50,contentdown: "下拉可以刷新",contentover: "释放立即刷新",contentrefresh: "正在刷新..."},up: {height: 50,contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了",duration: 300}}, c, !0))
	        },_init: function() {
	            this._super(), this._initPocket()
	        },_initPulldownRefresh: function() {
	            this.pulldown = !0, this.pullPocket = this.topPocket, this.pullPocket.classList.add(l), this.pullPocket.classList.add(m), this.pullCaption = this.topCaption, this.pullLoading = this.topLoading
	        },_initPullupRefresh: function() {
	            this.pulldown = !1, this.pullPocket = this.bottomPocket, this.pullPocket.classList.add(l), this.pullPocket.classList.add(m), this.pullCaption = this.bottomCaption, this.pullLoading = this.bottomLoading
	        },_initPocket: function() {
	            var a = this.options;
	            a.down && a.down.hasOwnProperty("callback") && (this.topPocket = this.scroller.querySelector("." + c), this.topPocket || (this.topPocket = this._createPocket(c, a.down, o), this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild)), this.topLoading = this.topPocket.querySelector("." + f), this.topCaption = this.topPocket.querySelector("." + g)), a.up && a.up.hasOwnProperty("callback") && (this.bottomPocket = this.scroller.querySelector("." + d), this.bottomPocket || (this.bottomPocket = this._createPocket(d, a.up, p), this.scroller.appendChild(this.bottomPocket)), this.bottomLoading = this.bottomPocket.querySelector("." + f), this.bottomCaption = this.bottomPocket.querySelector("." + g), this.wrapper.addEventListener("scrollbottom", this))
	        },_createPocket: function(a, c, d) {
	            var e = b.createElement("div");
	            return e.className = a, e.innerHTML = q.replace("{contentrefresh}", c.contentrefresh).replace("{icon}", d), e
	        },_resetPullDownLoading: function() {
	            var a = this.pullLoading;
	            a && (this.pullCaption.innerHTML = this.options.down.contentdown, a.style.webkitTransition = "", a.style.webkitTransform = "", a.style.webkitAnimation = "", a.className = o)
	        },_setCaption: function(a, b) {
	            if (!this.loading) {
	                var c = this.options, d = this.pullPocket, e = this.pullCaption, f = this.pullLoading, g = this.pulldown;
	                d && (b ? setTimeout(function() {
	                    e.innerHTML = a, f.className = g ? o : p, f.style.webkitAnimation = "", f.style.webkitTransition = "", f.style.webkitTransform = ""
	                }, 100) : a !== this.lastTitle && (e.innerHTML = a, g ? a === c.down.contentrefresh ? (f.className = p, f.style.webkitAnimation = "spinner-spin 1s step-end infinite") : a === c.down.contentover ? (f.className = n, f.style.webkitTransition = "-webkit-transform 0.3s ease-in", f.style.webkitTransform = "rotate(180deg)") : a === c.down.contentdown && (f.className = o, f.style.webkitTransition = "-webkit-transform 0.3s ease-in", f.style.webkitTransform = "rotate(0deg)") : f.className = a === c.up.contentrefresh ? p + " " + k : p, this.lastTitle = a))
	            }
	        }};
	    a.PullRefresh = r
	}(mui, document), function(a, b, c, d) {
	    var e = "mui-scrollbar", f = "mui-scrollbar-indicator", g = e + "-vertical", h = e + "-horizontal", i = {quadratic: {style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn: function(a) {
	                return a * (2 - a)
	            }},circular: {style: "cubic-bezier(0.1, 0.57, 0.1, 1)",fn: function(a) {
	                return Math.sqrt(1 - --a * a)
	            }}}, j = a.Class.extend({init: function(b, c) {
	            this.wrapper = this.element = b, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.stopped = !1, this.options = a.extend({scrollY: !0,scrollX: !1,startX: 0,startY: 0,indicators: !0,stopPropagation: !1,hardwareAccelerated: !0,fixedBadAndorid: !1,preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/},momentum: !0,bounce: !0,bounceTime: 300,bounceEasing: i.circular.style,directionLockThreshold: 5}, c, !0), this.x = 0, this.y = 0, this.translateZ = this.options.hardwareAccelerated ? " translateZ(0)" : "", this._init(), this.scroller && (this.refresh(), this.scrollTo(this.options.startX, this.options.startY))
	        },_init: function() {
	            this._initIndicators(), this._initEvent()
	        },_initIndicators: function() {
	            var a = this;
	            if (a.indicators = [], this.options.indicators) {
	                var b, c = [];
	                a.options.scrollY && (b = {el: this._createScrollBar(g),listenX: !1}, this.wrapper.appendChild(b.el), c.push(b)), this.options.scrollX && (b = {el: this._createScrollBar(h),listenY: !1}, this.wrapper.appendChild(b.el), c.push(b));
	                for (var d = c.length; d--; )
	                    this.indicators.push(new k(this, c[d]));
	                this.wrapper.addEventListener("scrollend", function() {
	                    a.indicators.map(function(a) {
	                        a.fade()
	                    })
	                }), this.wrapper.addEventListener("scrollstart", function() {
	                    a.indicators.map(function(a) {
	                        a.fade(1)
	                    })
	                }), this.wrapper.addEventListener("refresh", function() {
	                    a.indicators.map(function(a) {
	                        a.refresh()
	                    })
	                })
	            }
	        },_initEvent: function() {
	            b.addEventListener("orientationchange", this), b.addEventListener("resize", this), this.scroller.addEventListener("webkitTransitionEnd", this), this.wrapper.addEventListener("touchstart", this), this.wrapper.addEventListener("touchcancel", this), this.wrapper.addEventListener("touchend", this), this.wrapper.addEventListener("drag", this), this.wrapper.addEventListener("dragend", this), this.wrapper.addEventListener("flick", this), this.wrapper.addEventListener("scrollend", this), this.options.scrollX && this.wrapper.addEventListener("swiperight", this)
	        },handleEvent: function(a) {
	            if (this.stopped)
	                return void this.resetPosition();
	            switch (a.type) {
	                case "touchstart":
	                    this._start(a);
	                    break;
	                case "drag":
	                    this.options.stopPropagation && a.stopPropagation(), this._drag(a);
	                    break;
	                case "dragend":
	                case "flick":
	                    this.options.stopPropagation && a.stopPropagation(), this._flick(a);
	                    break;
	                case "touchcancel":
	                case "touchend":
	                    this._end(a);
	                    break;
	                case "webkitTransitionEnd":
	                    this._transitionEnd(a);
	                    break;
	                case "scrollend":
	                    this._scrollend(a);
	                    break;
	                case "orientationchange":
	                case "resize":
	                    this._resize();
	                    break;
	                case "swiperight":
	                    a.stopPropagation()
	            }
	        },_start: function(b) {
	            if (this.moved = this.needReset = !1, this._transitionTime(), this.isInTransition) {
	                this.needReset = !0, this.isInTransition = !1;
	                var c = a.parseTranslateMatrix(a.getStyles(this.scroller, "webkitTransform"));
	                this.setTranslate(Math.round(c.x), Math.round(c.y)), this.resetPosition(), a.trigger(this.wrapper, "scrollend", this), b.preventDefault()
	            }
	            this.reLayout(), a.trigger(this.wrapper, "beforescrollstart", this)
	        },_drag: function(c) {
	            var d = c.detail;
	            if (a.os.ios && parseFloat(a.os.version) >= 8 && d.gesture.touches[0].clientY + 10 > b.innerHeight)
	                return void this.resetPosition(this.options.bounceTime);
	            var e = isReturn = !1;
	            if ("left" === d.direction || "right" === d.direction ? this.options.scrollX ? e = !0 : this.options.scrollY && !this.moved && (isReturn = !0) : ("up" === d.direction || "down" === d.direction) && (this.options.scrollY ? e = !0 : this.options.scrollX && !this.moved && (isReturn = !0)), e && (c.stopPropagation(), d.gesture && d.gesture.preventDefault()), !isReturn) {
	                this.moved ? c.stopPropagation() : a.trigger(this.wrapper, "scrollstart", this);
	                var f = d.deltaX - d.lastDeltaX, g = d.deltaY - d.lastDeltaY, h = Math.abs(d.deltaX), i = Math.abs(d.deltaY);
	                h > i + this.options.directionLockThreshold ? g = 0 : i >= h + this.options.directionLockThreshold && (f = 0), f = this.hasHorizontalScroll ? f : 0, g = this.hasVerticalScroll ? g : 0;
	                var j = this.x + f, k = this.y + g;
	                (j > 0 || j < this.maxScrollX) && (j = this.options.bounce ? this.x + f / 3 : j > 0 ? 0 : this.maxScrollX), (k > 0 || k < this.maxScrollY) && (k = this.options.bounce ? this.y + g / 3 : k > 0 ? 0 : this.maxScrollY), this.requestAnimationFrame || this._updateTranslate(), this.moved = !0, this.x = j, this.y = k
	            }
	        },_flick: function(b) {
	            if (this.moved) {
	                var c = b.detail;
	                if (this._clearRequestAnimationFrame(), "dragend" !== b.type || !c.flick) {
	                    var d = Math.round(this.x), e = Math.round(this.y);
	                    if (this.isInTransition = !1, !this.resetPosition(this.options.bounceTime)) {
	                        if (this.scrollTo(d, e), "dragend" === b.type)
	                            return void a.trigger(this.wrapper, "scrollend", this);
	                        var f = 0, g = "";
	                        if (this.options.momentum && c.flickTime < 300 && (momentumX = this.hasHorizontalScroll ? this._momentum(this.x, c.flickDistanceX, c.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {destination: d,duration: 0}, momentumY = this.hasVerticalScroll ? this._momentum(this.y, c.flickDistanceY, c.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {destination: e,duration: 0}, d = momentumX.destination, e = momentumY.destination, f = Math.max(momentumX.duration, momentumY.duration), this.isInTransition = !0), d != this.x || e != this.y)
	                            return (d > 0 || d < this.maxScrollX || e > 0 || e < this.maxScrollY) && (g = i.quadratic), void this.scrollTo(d, e, f, g);
	                        a.trigger(this.wrapper, "scrollend", this), b.stopPropagation()
	                    }
	                }
	            }
	        },_end: function(a) {
	            this.needReset = !1, (!this.moved && this.needReset || "touchcancel" === a.type) && this.resetPosition()
	        },_transitionEnd: function(b) {
	            b.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, a.trigger(this.wrapper, "scrollend", this)))
	        },_scrollend: function() {
	            Math.abs(this.y) > 0 && this.y <= this.maxScrollY && a.trigger(this.wrapper, "scrollbottom", this)
	        },_resize: function() {
	            var a = this;
	            clearTimeout(a.resizeTimeout), a.resizeTimeout = setTimeout(function() {
	                a.refresh()
	            }, a.options.resizePolling)
	        },_transitionTime: function(b) {
	            if (b = b || 0, this.scrollerStyle.webkitTransitionDuration = b + "ms", this.options.fixedBadAndorid && !b && a.os.isBadAndroid && (this.scrollerStyle.webkitTransitionDuration = "0.001s"), this.indicators)
	                for (var c = this.indicators.length; c--; )
	                    this.indicators[c].transitionTime(b)
	        },_transitionTimingFunction: function(a) {
	            if (this.scrollerStyle.webkitTransitionTimingFunction = a, this.indicators)
	                for (var b = this.indicators.length; b--; )
	                    this.indicators[b].transitionTimingFunction(a)
	        },_translate: function(a, b) {
	            this.x = a, this.y = b
	        },_clearRequestAnimationFrame: function() {
	            this.requestAnimationFrame && (cancelAnimationFrame(this.requestAnimationFrame), this.requestAnimationFrame = null)
	        },_updateTranslate: function() {
	            var a = this;
	            (a.x !== a.lastX || a.y !== a.lastY) && a.setTranslate(a.x, a.y), a.requestAnimationFrame = requestAnimationFrame(function() {
	                a._updateTranslate()
	            })
	        },_createScrollBar: function(a) {
	            var b = c.createElement("div"), d = c.createElement("div");
	            return b.className = e + " " + a, d.className = f, b.appendChild(d), a === g ? (this.scrollbarY = b, this.scrollbarIndicatorY = d) : a === h && (this.scrollbarX = b, this.scrollbarIndicatorX = d), this.wrapper.appendChild(b), b
	        },_preventDefaultException: function(a, b) {
	            for (var c in b)
	                if (b[c].test(a[c]))
	                    return !0;
	            return !1
	        },_reLayout: function() {
	            this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.indicators.map(function(a) {
	                a.refresh()
	            })
	        },_momentum: function(a, b, c, e, f, g) {
	            var h, i, j = parseFloat(Math.abs(b) / c);
	            return g = g === d ? 6e-4 : g, h = a + j * j / (2 * g) * (0 > b ? -1 : 1), i = j / g, e > h ? (h = f ? e - f / 2.5 * (j / 8) : e, b = Math.abs(h - a), i = b / j) : h > 0 && (h = f ? f / 2.5 * (j / 8) : 0, b = Math.abs(a) + h, i = b / j), {destination: Math.round(h),duration: i}
	        },setStopped: function(a) {
	            this.stopped = !!a
	        },setTranslate: function(a, b) {
	            if (this.x = a, this.y = b, this.scrollerStyle.webkitTransform = "translate3d(" + a + "px," + b + "px,0px)" + this.translateZ, this.indicators)
	                for (var c = this.indicators.length; c--; )
	                    this.indicators[c].updatePosition();
	            this.lastX = this.x, this.lastY = this.y
	        },reLayout: function() {
	            this.wrapper.offsetHeight;
	            var b = parseFloat(a.getStyles(this.wrapper, "padding-left")) || 0, c = parseFloat(a.getStyles(this.wrapper, "padding-right")) || 0, d = parseFloat(a.getStyles(this.wrapper, "padding-top")) || 0, e = parseFloat(a.getStyles(this.wrapper, "padding-bottom")) || 0, f = this.wrapper.clientWidth, g = this.wrapper.clientHeight;
	            this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.wrapperWidth = f - b - c, this.wrapperHeight = g - d - e, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this._reLayout()
	        },resetPosition: function(a) {
	            var b = this.x, c = this.y;
	            return a = a || 0, !this.hasHorizontalScroll || this.x > 0 ? b = 0 : this.x < this.maxScrollX && (b = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? c = 0 : this.y < this.maxScrollY && (c = this.maxScrollY), b == this.x && c == this.y ? !1 : (this.scrollTo(b, c, a, this.options.bounceEasing), !0)
	        },refresh: function() {
	            this.reLayout(), a.trigger(this.wrapper, "refresh", this), this.resetPosition()
	        },scrollTo: function(a, b, c, d) {
	            var d = d || i.circular;
	            this.isInTransition = c > 0 && (this.lastX != a || this.lastY != b), this.isInTransition ? (this._clearRequestAnimationFrame(), this._transitionTimingFunction(d.style), this._transitionTime(c), this.setTranslate(a, b)) : this.setTranslate(a, b)
	        },scrollToBottom: function(a, b) {
	            a = a || this.options.bounceTime, this.scrollTo(0, this.maxScrollY, a, b)
	        }}), k = function(b, d) {
	        this.wrapper = "string" == typeof d.el ? c.querySelector(d.el) : d.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = b, this.options = a.extend({listenX: !0,listenY: !0,fade: !1,speedRatioX: 0,speedRatioY: 0}, d), this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.fade && (this.wrapperStyle.webkitTransform = this.scroller.translateZ, this.wrapperStyle.webkitTransitionDuration = this.options.fixedBadAndorid && a.os.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
	    };
	    k.prototype = {handleEvent: function() {
	        },transitionTime: function(b) {
	            b = b || 0, this.indicatorStyle.webkitTransitionDuration = b + "ms", this.scroller.options.fixedBadAndorid && !b && a.os.isBadAndroid && (this.indicatorStyle.webkitTransitionDuration = "0.001s")
	        },transitionTimingFunction: function(a) {
	            this.indicatorStyle.webkitTransitionTimingFunction = a
	        },refresh: function() {
	            this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX, this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
	        },updatePosition: function() {
	            var a = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0, b = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
	            a < this.minBoundaryX ? (this.width = Math.max(this.indicatorWidth + a, 8), this.indicatorStyle.width = this.width + "px", a = this.minBoundaryX) : a > this.maxBoundaryX ? (this.width = Math.max(this.indicatorWidth - (a - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", a = this.maxPosX + this.indicatorWidth - this.width) : this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), b < this.minBoundaryY ? (this.height = Math.max(this.indicatorHeight + 3 * b, 8), this.indicatorStyle.height = this.height + "px", b = this.minBoundaryY) : b > this.maxBoundaryY ? (this.height = Math.max(this.indicatorHeight - 3 * (b - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", b = this.maxPosY + this.indicatorHeight - this.height) : this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px"), this.x = a, this.y = b, this.indicatorStyle.webkitTransform = "translate3d(" + a + "px," + b + "px,0px)" + this.scroller.translateZ
	        },fade: function(a, b) {
	            if (!b || this.visible) {
	                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
	                var c = a ? 250 : 500, d = a ? 0 : 300;
	                a = a ? "1" : "0", this.wrapperStyle.webkitTransitionDuration = c + "ms", this.fadeTimeout = setTimeout(function(a) {
	                    this.wrapperStyle.opacity = a, this.visible = +a
	                }.bind(this, a), d)
	            }
	        }}, a.Scroll = j, a.fn.scroll = function(b) {
	        var c = [];
	        return this.each(function() {
	            var d = null, e = this, f = e.getAttribute("data-scroll");
	            f ? d = a.data[f] : (f = ++a.uuid, a.data[f] = d = new j(e, b), e.setAttribute("data-scroll", f)), c.push(d)
	        }), 1 === c.length ? c[0] : c
	    }
	}(mui, window, document), function(a) {
	    var b = "mui-visibility", c = a.Scroll.extend(a.extend({handleEvent: function(a) {
	            this._super(a), "scrollbottom" === a.type && this._scrollbottom()
	        },_scrollbottom: function() {
	            this.pulldown || this.loading || (this.pulldown = !1, this._initPullupRefresh(), this.pullupLoading())
	        },_start: function(a) {
	            this.loading || (this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = !1), this._super(a)
	        },_drag: function(a) {
	            this._super(a), !this.pulldown && !this.loading && this.topPocket && "down" === a.detail.direction && this.y >= 0 && this._initPulldownRefresh(), this.pulldown && this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown)
	        },_reLayout: function() {
	            this.hasVerticalScroll = !0, this._super()
	        },resetPosition: function(a) {
	            return this.pulldown && this.y >= this.options.down.height ? (this.pulldownLoading(0, a || 0), !0) : this._super(a)
	        },pulldownLoading: function(a, b) {
	            if (a = a || 0, this.scrollTo(a, this.options.down.height, b, this.options.bounceEasing), !this.loading) {
	                this.pulldown || this._initPulldownRefresh(), this._setCaption(this.options.down.contentrefresh), this.loading = !0, this.indicators.map(function(a) {
	                    a.fade(0)
	                });
	                var c = this.options.down.callback;
	                c && c.call(this)
	            }
	        },endPulldownToRefresh: function() {
	            var a = this;
	            a.topPocket && (a.scrollTo(0, 0, a.options.bounceTime, a.options.bounceEasing), a.loading = !1, a._setCaption(a.options.down.contentdown, !0), setTimeout(function() {
	                a.loading || a.topPocket.classList.remove(b)
	            }, 350))
	        },pullupLoading: function(a, b) {
	            if (a = a || 0, this.scrollTo(a, this.maxScrollY, b, this.options.bounceEasing), !this.loading) {
	                this._initPullupRefresh(), this._setCaption(this.options.up.contentrefresh), this.indicators.map(function(a) {
	                    a.fade(0)
	                }), this.loading = !0;
	                var c = this.options.up.callback;
	                c && c.call(this)
	            }
	        },endPullupToRefresh: function(a) {
	            var c = this;
	            c.bottomPocket && (c.loading = !1, a ? (c._setCaption(c.options.up.contentnomore), c.wrapper.removeEventListener("scrollbottom", c)) : (c._setCaption(c.options.up.contentdown), setTimeout(function() {
	                c.loading || c.bottomPocket.classList.remove(b)
	            }, 350)))
	        },refresh: function(a) {
	            a && this.wrapper.addEventListener("scrollbottom", this), this._super()
	        }}, a.PullRefresh));
	    a.fn.pullRefresh = function(b) {
	        if (1 === this.length) {
	            var d = this[0], e = null, f = d.getAttribute("data-pullrefresh");
	            return f ? e = a.data[f] : (f = ++a.uuid, a.data[f] = e = new c(d, b), d.setAttribute("data-pullrefresh", f)), e
	        }
	    }
	}(mui, window, document), function(a, b) {
	    var c = "mui-slider", d = "mui-slider-group", e = "mui-slider-loop", f = "mui-slider-indicator", g = "mui-action-previous", h = "mui-action-next", i = "mui-slider-item", j = "mui-active", k = "." + i, l = "." + f, m = ".mui-slider-progress-bar", n = a.Scroll.extend({init: function(b, c) {
	            this._super(b, a.extend({interval: 0,scrollY: !1,scrollX: !0,indicators: !1,bounceTime: 200,startX: !1}, c, !0)), this.options.startX && a.trigger(this.wrapper, "scrollend", this)
	        },_init: function() {
	            this.scroller = this.wrapper.querySelector("." + d), this.scroller && (this.scrollerStyle = this.scroller.style, this.progressBar = this.wrapper.querySelector(m), this.progressBar && (this.progressBarWidth = this.progressBar.offsetWidth, this.progressBarStyle = this.progressBar.style), this._super(), this._initTimer())
	        },_initEvent: function() {
	            var b = this;
	            b._super(), b.wrapper.addEventListener("swiperight", a.stopPropagation), b.wrapper.addEventListener("scrollend", function() {
	                b.isInTransition = !1, b.slideNumber = b._getSlideNumber();
	                var c = b.slideNumber;
	                b.loop && (0 === b.slideNumber ? (b.slideNumber = b.itemLength - 2, b.setTranslate(-b.wrapperWidth * (b.itemLength - 2), 0)) : b.slideNumber === b.itemLength - 1 && (b.slideNumber = 1, b.setTranslate(-b.wrapperWidth, 0)), c = b.slideNumber - 1), a.trigger(b.wrapper, "slide", {slideNumber: c})
	            }), b.wrapper.addEventListener("slide", function(a) {
	                if (a.target === b.wrapper) {
	                    var c = a.detail;
	                    c.slideNumber = c.slideNumber || 0;
	                    var d = b.wrapper.querySelectorAll(k), e = c.slideNumber;
	                    b.loop && (e += 1);
	                    for (var f = 0, g = d.length; g > f; f++) {
	                        var h = d[f];
	                        h.parentNode === b.scroller && (f === e ? h.classList.add(j) : h.classList.remove(j))
	                    }
	                    var i = b.wrapper.querySelector(".mui-slider-indicator");
	                    if (i) {
	                        var l = i.querySelectorAll(".mui-indicator");
	                        if (l.length > 0)
	                            for (var f = 0, g = l.length; g > f; f++)
	                                l[f].classList[f === c.slideNumber ? "add" : "remove"](j);
	                        else {
	                            var m = i.querySelector(".mui-number span");
	                            if (m)
	                                m.innerText = c.slideNumber + 1;
	                            else
	                                for (var n = b.wrapper.querySelectorAll(".mui-control-item"), f = 0, g = n.length; g > f; f++)
	                                    n[f].classList[f === c.slideNumber ? "add" : "remove"](j)
	                        }
	                    }
	                    a.stopPropagation()
	                }
	            }), b.wrapper.addEventListener(a.eventName("shown", "tab"), function(a) {
	                b.gotoItem(a.detail.tabNumber || 0, b.options.bounceTime)
	            });
	            var c = b.wrapper.querySelector(l);
	            c && c.addEventListener("tap", function(a) {
	                var c = a.target;
	                (c.classList.contains(g) || c.classList.contains(h)) && (b[c.classList.contains(g) ? "prevItem" : "nextItem"](), a.stopPropagation())
	            })
	        },_drag: function(a) {
	            this._super(a);
	            var b = a.detail.direction;
	            ("left" === b || "right" === b) && a.stopPropagation()
	        },_initTimer: function() {
	            var a = this, c = a.wrapper, d = a.options.interval, e = c.getAttribute("data-slidershowTimer");
	            e && b.clearTimeout(e), d && (e = b.setTimeout(function() {
	                c && ((c.offsetWidth || c.offsetHeight) && a.nextItem(!0), a._initTimer())
	            }, d), c.setAttribute("data-slidershowTimer", e))
	        },_reLayout: function() {
	            this.hasHorizontalScroll = !0, this.loop = this.scroller.classList.contains(e);
	            var a = this.scroller.querySelectorAll(k);
	            this.itemLength = 0;
	            for (var b = 0, c = 0, d = a.length; d > c; c++)
	                a[c].parentNode === this.scroller && (a[c].classList.contains(j) && (b = this.itemLength), this.itemLength++);
	            b = 0 === b ? this.loop ? 1 : 0 : b, this.options.startX = b ? -this.scrollerWidth * b : 0, this.scrollerWidth = this.itemLength * this.scrollerWidth, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this.slideNumber = this._getSlideNumber(), this._super()
	        },_getScroll: function() {
	            var b = a.parseTranslateMatrix(a.getStyles(this.scroller, "webkitTransform"));
	            return b ? b.x : 0
	        },_getSlideNumber: function() {
	            return Math.abs(Math.round(Math.abs(this.x) / this.wrapperWidth))
	        },_transitionEnd: function(b) {
	            b.target === this.scroller && this.isInTransition && (this._transitionTime(), this.isInTransition = !1, a.trigger(this.wrapper, "scrollend", this))
	        },_flick: function(a) {
	            var b = a.detail, c = b.direction;
	            return this._clearRequestAnimationFrame(), this.isInTransition = !0, "up" === c || "down" === c ? void this.resetPosition(this.options.bounceTime) : ("flick" === a.type ? (b.touchTime < 200 && (this.x = -(this.slideNumber + ("left" === c ? 1 : -1)) * this.wrapperWidth), this.resetPosition(this.options.bounceTime)) : "dragend" !== a.type || b.flick || this.resetPosition(this.options.bounceTime), void a.stopPropagation())
	        },_gotoItem: function(b, c) {
	            this.scrollTo(-b * this.wrapperWidth, 0, c, this.options.bounceEasing), 0 === c && a.trigger(this.wrapper, "scrollend", this), this._initTimer()
	        },_fixedSlideNumber: function(a) {
	            return this.loop || (0 > a ? a = 0 : a >= this.itemLength && (a = this.itemLength - 1)), a
	        },setTranslate: function(a, b) {
	            this._super(a, b);
	            var c = this.progressBar;
	            c && (this.progressBarStyle.webkitTransform = "translate3d(" + -a * (this.progressBarWidth / this.wrapperWidth) + "px,0,0)")
	        },resetPosition: function(a) {
	            return a = a || 0, this.x > 0 ? this.x = 0 : this.x < this.maxScrollX && (this.x = this.maxScrollX), this._gotoItem(this._getSlideNumber(), a), !0
	        },gotoItem: function(a, b) {
	            this._gotoItem(this._fixedSlideNumber(this.loop ? a + 1 : a), b || this.options.bounceEasing)
	        },nextItem: function(a) {
	            var b = this._fixedSlideNumber(this.slideNumber + 1), c = 800;
	            a && !this.loop && this.slideNumber + 1 >= this.itemLength && (c = b = 0), this._gotoItem(b, c)
	        },prevItem: function() {
	            this._gotoItem(this._fixedSlideNumber(this.slideNumber - 1), this.options.bounceTime)
	        },refresh: function(b) {
	            b ? (a.extend(this.options, b), this._super(), this._gotoItem(this._getSlideNumber() + 1, this.options.bounceTime)) : this._super()
	        }});
	    a.fn.slider = function(b) {
	        var d = null;
	        return this.each(function() {
	            var e = this;
	            if (this.classList.contains(c) || (e = this.querySelector("." + c)), e) {
	                var f = e.getAttribute("data-slider");
	                f ? (d = a.data[f], d && b && d.refresh(b)) : (f = ++a.uuid, a.data[f] = d = new n(e, b), e.setAttribute("data-slider", f))
	            }
	        }), d
	    }, a.ready(function() {
	        a(".mui-slider").slider()
	    })
	}(mui, window), function(a, b) {
	    if (a.os.plus && a.os.android) {
	        var c = "mui-plus-pullrefresh", d = "mui-in", e = "mui-block", f = a.Class.extend({init: function(a, b) {
	                this.element = a, this.options = b, this.wrapper = this.scroller = a, this._init(), this._initPulldownRefreshEvent()
	            },_init: function() {
	                window.addEventListener("dragup", this)
	            },_initPulldownRefreshEvent: function() {
	                var b = this;
	                b.topPocket && b.options.webviewId && a.plusReady(function() {
	                    var a = plus.webview.getWebviewById(b.options.webviewId);
	                    if (a) {
	                        b.options.webview = a;
	                        var c = b.options.down, d = c.height;
	                        a.addEventListener("dragBounce", function(d) {
	                            switch (b.pulldown ? b.pullPocket.classList.add(e) : b._initPulldownRefresh(), d.status) {
	                                case "beforeChangeOffset":
	                                    b._setCaption(c.contentdown);
	                                    break;
	                                case "afterChangeOffset":
	                                    b._setCaption(c.contentover);
	                                    break;
	                                case "dragEndAfterChangeOffset":
	                                    a.evalJS("mui.options.pullRefresh.down.callback()"), b._setCaption(c.contentrefresh)
	                            }
	                        }, !1), a.setBounce({position: {top: 2 * d + "px"},changeoffset: {top: d + "px"}})
	                    }
	                })
	            },handleEvent: function(a) {
	                var c = this;
	                if (!c.stopped) {
	                    var d = !1;
	                    setInterval(function() {
	                        d && window.pageYOffset + window.innerHeight + 10 >= b.documentElement.scrollHeight && (d = !1, c.bottomPocket && c.pullupLoading())
	                    }, 100), "dragup" === a.type && (d = !0)
	                }
	            }}).extend(a.extend({setStopped: function(a) {
	                this.stopped = !!a;
	                var b = plus.webview.currentWebview();
	                if (this.stopped)
	                    b.setStyle({bounce: "none"}), b.setBounce({position: {top: "none"}});
	                else {
	                    var c = this.options.down.height;
	                    b.setStyle({bounce: "vertical"}), b.setBounce({position: {top: 2 * c + "px"},changeoffset: {top: c + "px"}})
	                }
	            },pulldownLoading: function() {
	                throw new Error("暂不支持")
	            },endPulldownToRefresh: function() {
	                var a = plus.webview.currentWebview();
	                a.parent().evalJS("mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify({webviewId: a.id}) + "')._endPulldownToRefresh()")
	            },_endPulldownToRefresh: function() {
	                var a = this;
	                a.topPocket && a.options.webview && (a.options.webview.endPullToRefresh(), a.loading = !1, a._setCaption(a.options.down.contentdown, !0), setTimeout(function() {
	                    a.loading || a.topPocket.classList.remove(e)
	                }, 350))
	            },pullupLoading: function() {
	                var a = this;
	                a.isLoading || (a.isLoading = !0, a.pulldown !== !1 ? a._initPullupRefresh() : this.pullPocket.classList.add(e), setTimeout(function() {
	                    a.pullLoading.classList.add(d), a.pullCaption.innerHTML = "", a.pullCaption.innerHTML = a.options.up.contentrefresh;
	                    var b = a.options.up.callback;
	                    b && b.call(a)
	                }, 300))
	            },endPullupToRefresh: function(a) {
	                var b = this;
	                b.pullLoading && (b.pullLoading.classList.remove(d), b.isLoading = !1, a ? (b.pullCaption.innerHTML = b.options.up.contentnomore, window.removeEventListener("dragup", b)) : b.pullCaption.innerHTML = b.options.up.contentdown)
	            },refresh: function(a) {
	                a && window.addEventListener("dragup", this)
	            }}, a.PullRefresh));
	        a.fn.pullRefresh = function(d) {
	            var e;
	            0 === this.length ? (e = b.createElement("div"), e.className = "mui-content", b.body.appendChild(e)) : e = this[0], d = d || {webviewId: plus.webview.currentWebview().id || plus.webview.currentWebview().getURL()}, "string" == typeof d && (d = a.parseJSON(d));
	            var g = null, h = e.getAttribute("data-pullrefresh-plus-" + d.webviewId);
	            return h ? g = a.data[h] : (h = ++a.uuid, e.setAttribute("data-pullrefresh-plus-" + d.webviewId, h), b.body.classList.add(c), a.data[h] = g = new f(e, d)), g
	        }
	    }
	}(mui, document), function(a, b, c, d) {
	    var e = "mui-off-canvas-left", f = "mui-off-canvas-right", g = "mui-off-canvas-backdrop", h = "mui-off-canvas-wrap", i = "mui-slide-in", j = "mui-active", k = "mui-transitioning", l = ".mui-inner-wrap", m = a.Class.extend({init: function(b, d) {
	            this.wrapper = this.element = b, this.scroller = this.wrapper.querySelector(l), this.classList = this.wrapper.classList, this.scroller && (this.options = a.extend({dragThresholdX: 10}, d, !0), c.body.classList.add("mui-fullscreen"), this.refresh(), this.initEvent())
	        },refresh: function() {
	            this.classList.remove(j), this.slideIn = this.classList.contains(i), this.scroller = this.wrapper.querySelector(l), this.scroller.classList.remove(k), this.scroller.setAttribute("style", ""), this.offCanvasRight = this.wrapper.querySelector("." + f), this.offCanvasLeft = this.wrapper.querySelector("." + e), this.offCanvasRightWidth = this.offCanvasLeftWidth = 0, this.offCanvasLeftSlideIn = this.offCanvasRightSlideIn = !1, this.offCanvasRight && (this.offCanvasRightWidth = this.offCanvasRight.offsetWidth, this.offCanvasRightSlideIn = this.slideIn && this.offCanvasRight.parentNode === this.wrapper, this.offCanvasRight.classList.remove(k), this.offCanvasRight.classList.remove(j), this.offCanvasRight.setAttribute("style", "")), this.offCanvasLeft && (this.offCanvasLeftWidth = this.offCanvasLeft.offsetWidth, this.offCanvasLeftSlideIn = this.slideIn && this.offCanvasLeft.parentNode === this.wrapper, this.offCanvasLeft.classList.remove(k), this.offCanvasLeft.classList.remove(j), this.offCanvasLeft.setAttribute("style", "")), this.backdrop = this.scroller.querySelector("." + g), this.options.dragThresholdX = this.options.dragThresholdX || 10, this.visible = !1, this.startX = null, this.lastX = null, this.offsetX = null, this.lastTranslateX = null
	        },handleEvent: function(a) {
	            switch (a.type) {
	                case "touchstart":
	                    a.preventDefault();
	                    break;
	                case "webkitTransitionEnd":
	                    a.target === this.scroller && this._dispatchEvent();
	                    break;
	                case "drag":
	                    var b = a.detail;
	                    this.startX ? this.lastX = b.move.x : (this.startX = b.move.x, this.lastX = this.startX), !this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && ("left" === b.direction || "right" === b.direction) && (this.slideIn && (this.scroller = this.classList.contains(j) ? this.offCanvasRight && this.offCanvasRight.classList.contains(j) ? this.offCanvasRight : this.offCanvasLeft : "left" === b.direction && this.offCanvasRight ? this.offCanvasRight : "right" === b.direction && this.offCanvasLeft ? this.offCanvasLeft : null), this.scroller && (this.startX = this.lastX, this.isDragging = !0, this.scroller.classList.remove(k), this.offsetX = this.getTranslateX(), this._initOffCanvasVisible())), this.isDragging && (this.updateTranslate(this.offsetX + (this.lastX - this.startX)), b.gesture.preventDefault(), a.stopPropagation());
	                    break;
	                case "dragend":
	                    if (this.isDragging) {
	                        var b = a.detail, c = b.direction;
	                        this.isDragging = !1, this.scroller.classList.add(k);
	                        var d = 0, e = this.getTranslateX();
	                        if (this.slideIn) {
	                            if (d = e >= 0 ? this.offCanvasRightWidth && e / this.offCanvasRightWidth || 0 : this.offCanvasLeftWidth && e / this.offCanvasLeftWidth || 0, this.openPercentage(d >= .5 && "left" === c ? 0 : d > 0 && .5 >= d && "left" === c ? -100 : d >= .5 && "right" === c ? 0 : d >= -.5 && 0 > d && "left" === c ? 100 : d > 0 && .5 >= d && "right" === c ? -100 : -.5 >= d && "right" === c ? 0 : d >= -.5 && "right" === c ? 100 : -.5 >= d && "left" === c ? 0 : d >= -.5 && "left" === c ? -100 : 0), 1 === d || -1 === d || 0 === d)
	                                return void this._dispatchEvent()
	                        } else {
	                            if (d = e >= 0 ? this.offCanvasLeftWidth && e / this.offCanvasLeftWidth || 0 : this.offCanvasRightWidth && e / this.offCanvasRightWidth || 0, 0 === d)
	                                return this.openPercentage(0), void this._dispatchEvent();
	                            this.openPercentage(d > 0 && .5 > d && "right" === c ? 0 : d > .5 && "left" === c ? 100 : 0 > d && d > -.5 && "left" === c ? 0 : "right" === c && 0 > d && d > -.5 ? 0 : .5 > d && "right" === c ? -100 : "right" === c && d >= 0 && (d >= .5 || b.flick) ? 100 : "left" === c && 0 >= d && (-.5 >= d || b.flick) ? -100 : 0), (1 === d || -1 === d) && this._dispatchEvent()
	                        }
	                    }
	            }
	        },_dispatchEvent: function() {
	            this.classList.contains(j) ? a.trigger(this.wrapper, "shown", this) : a.trigger(this.wrapper, "hidden", this)
	        },_initOffCanvasVisible: function() {
	            this.visible || (this.visible = !0, this.offCanvasLeft && (this.offCanvasLeft.style.visibility = "visible"), this.offCanvasRight && (this.offCanvasRight.style.visibility = "visible"))
	        },initEvent: function() {
	            var a = this;
	            a.backdrop && a.backdrop.addEventListener("tap", function(b) {
	                a.close(), b.detail.gesture.preventDefault()
	            }), this.classList.contains("mui-draggable") && (this.wrapper.addEventListener("touchstart", this), this.wrapper.addEventListener("drag", this), this.wrapper.addEventListener("dragend", this)), this.wrapper.addEventListener("webkitTransitionEnd", this)
	        },openPercentage: function(a) {
	            var b = a / 100;
	            this.slideIn ? (this.offCanvasLeft && a >= 0 ? (b = 0 === b ? -1 : 0, this.updateTranslate(this.offCanvasLeftWidth * b), this.offCanvasLeft.classList[0 !== a ? "add" : "remove"](j)) : this.offCanvasRight && 0 >= a && (b = 0 === b ? 1 : 0, this.updateTranslate(this.offCanvasRightWidth * b), this.offCanvasRight.classList[0 !== a ? "add" : "remove"](j)), this.classList[0 !== a ? "add" : "remove"](j)) : (this.offCanvasLeft && a >= 0 ? (this.updateTranslate(this.offCanvasLeftWidth * b), this.offCanvasLeft.classList[0 !== b ? "add" : "remove"](j)) : this.offCanvasRight && 0 >= a && (this.updateTranslate(this.offCanvasRightWidth * b), this.offCanvasRight.classList[0 !== b ? "add" : "remove"](j)), this.classList[0 !== b ? "add" : "remove"](j))
	        },updateTranslate: function(a) {
	            if (a !== this.lastTranslateX) {
	                if (this.slideIn) {
	                    if (this.scroller.classList.contains(f)) {
	                        if (0 > a)
	                            return void this.setTranslateX(0);
	                        if (a > this.offCanvasRightWidth)
	                            return void this.setTranslateX(this.offCanvasRightWidth)
	                    } else {
	                        if (a > 0)
	                            return void this.setTranslateX(0);
	                        if (a < -this.offCanvasLeftWidth)
	                            return void this.setTranslateX(-this.offCanvasLeftWidth)
	                    }
	                    this.setTranslateX(a)
	                } else {
	                    if (!this.offCanvasLeft && a > 0 || !this.offCanvasRight && 0 > a)
	                        return void this.setTranslateX(0);
	                    if (this.leftShowing && a > this.offCanvasLeftWidth)
	                        return void this.setTranslateX(this.offCanvasLeftWidth);
	                    if (this.rightShowing && a < -this.offCanvasRightWidth)
	                        return void this.setTranslateX(-this.offCanvasRightWidth);
	                    this.setTranslateX(a), a >= 0 ? (this.leftShowing = !0, this.rightShowing = !1, a > 0 && (this.offCanvasLeft && (this.offCanvasLeft.style.zIndex = 0), this.offCanvasRight && (this.offCanvasRight.style.zIndex = -1))) : (this.rightShowing = !0, this.leftShowing = !1, this.offCanvasRight && (this.offCanvasRight.style.zIndex = 0), this.offCanvasLeft && (this.offCanvasLeft.style.zIndex = -1))
	                }
	                this.lastTranslateX = a
	            }
	        },setTranslateX: a.animationFrame(function(a) {
	            this.scroller && (this.scroller.style.webkitTransform = "translate3d(" + a + "px,0,0)")
	        }),getTranslateX: function() {
	            if (this.scroller) {
	                var b = a.parseTranslateMatrix(a.getStyles(this.scroller, "webkitTransform"));
	                return b && b.x || 0
	            }
	            return 0
	        },isShown: function(a) {
	            var b = !1;
	            if (this.slideIn)
	                b = "left" === a ? this.offCanvasLeft && this.offCanvasLeft.classList.contains(j) : "right" === a ? this.offCanvasRight && this.offCanvasRight.classList.contains(j) : this.offCanvasLeft && this.offCanvasLeft.classList.contains(j) || this.offCanvasRight && this.offCanvasRight.classList.contains(j);
	            else {
	                var c = this.getTranslateX();
	                b = "right" === a ? this.classList.contains(j) && 0 > c : "left" === a ? this.classList.contains(j) && c > 0 : this.classList.contains(j) && 0 !== c
	            }
	            return b
	        },close: function() {
	            this._initOffCanvasVisible(), this.slideIn && (this.scroller = this.offCanvasRight && this.offCanvasRight.classList.contains(j) ? this.offCanvasRight : this.offCanvasLeft), this.scroller && (this.scroller.classList.add(k), this.openPercentage(0))
	        },show: function(a) {
	            this._initOffCanvasVisible(), this.isShown(a) || (a || (a = this.wrapper.querySelector("." + f) ? "right" : "left"), this.slideIn && (this.scroller = "right" === a ? this.offCanvasRight : this.offCanvasLeft), this.scroller && (this.scroller.classList.add(k), this.openPercentage("left" === a ? 100 : -100)))
	        },toggle: function(a) {
	            this.isShown(a) ? this.close() : this.show(a)
	        }}), n = function(a) {
	        if (parentNode = a.parentNode, parentNode) {
	            if (parentNode.classList.contains(h))
	                return parentNode;
	            if (parentNode = parentNode.parentNode, parentNode.classList.contains(h))
	                return parentNode
	        }
	    }, o = function(b, d) {
	        if ("A" === d.tagName && d.hash) {
	            var e = c.getElementById(d.hash.replace("#", ""));
	            if (e) {
	                var f = n(e);
	                if (f)
	                    return a.targets._container = f, b.preventDefault(), e
	            }
	        }
	        return !1
	    };
	    a.registerTarget({name: d,index: 60,handle: o,target: !1,isReset: !1,isContinue: !0}), b.addEventListener("tap", function(b) {
	        if (a.targets.offcanvas)
	            for (var d = b.target; d && d !== c; d = d.parentNode)
	                if ("A" === d.tagName && d.hash && d.hash === "#" + a.targets.offcanvas.id) {
	                    a(a.targets._container).offCanvas("toggle"), a.targets.offcanvas = a.targets._container = null;
	                    break
	                }
	    }), a.fn.offCanvas = function(b) {
	        var c = [];
	        return this.each(function() {
	            var d = null, e = this;
	            e.classList.contains(h) || (e = n(e));
	            var f = e.getAttribute("data-offCanvas");
	            f ? d = a.data[f] : (f = ++a.uuid, a.data[f] = d = new m(e, b), e.setAttribute("data-offCanvas", f)), ("show" === b || "close" === b || "toggle" === b) && d.toggle(), c.push(d)
	        }), 1 === c.length ? c[0] : c
	    }, a.ready(function() {
	        a(".mui-off-canvas-wrap").offCanvas()
	    })
	}(mui, window, document, "offcanvas"), function(a, b) {
	    var c = "mui-action", d = function(a, b) {
	        return b.className && ~b.className.indexOf(c) ? (a.preventDefault(), b) : !1
	    };
	    a.registerTarget({name: b,index: 50,handle: d,target: !1,isContinue: !0})
	}(mui, "action"), function(a, b, c, d) {
	    var e = "mui-modal", f = function(a, b) {
	        if ("A" === b.tagName && b.hash) {
	            var d = c.getElementById(b.hash.replace("#", ""));
	            if (d && d.classList.contains(e))
	                return a.preventDefault(), d
	        }
	        return !1
	    };
	    a.registerTarget({name: d,index: 50,handle: f,target: !1,isReset: !1,isContinue: !0}), b.addEventListener("tap", function() {
	        a.targets.modal && a.targets.modal.classList.toggle("mui-active")
	    })
	}(mui, window, document, "modal"), function(a, b, c, d) {
	    var e = "mui-popover", f = "mui-popover-arrow", g = "mui-popover-action", h = "mui-backdrop", i = "mui-bar-popover", j = "mui-bar-backdrop", k = "mui-backdrop-action", l = "mui-active", m = "mui-bottom", n = function(b, d) {
	        if ("A" === d.tagName && d.hash) {
	            if (a.targets._popover = c.getElementById(d.hash.replace("#", "")), a.targets._popover && a.targets._popover.classList.contains(e))
	                return b.preventDefault(), d;
	            a.targets._popover = null
	        }
	        return !1
	    };
	    a.registerTarget({name: d,index: 60,handle: n,target: !1,isReset: !1,isContinue: !0});
	    var o = function() {
	    }, p = function() {
	        this.removeEventListener("webkitTransitionEnd", p), this.addEventListener("touchmove", a.preventDefault), a.trigger(this, "shown", this)
	    }, q = function() {
	        this.setAttribute("style", ""), this.removeEventListener("webkitTransitionEnd", q), this.removeEventListener("touchmove", a.preventDefault), o(!1), a.trigger(this, "hidden", this)
	    }, r = function() {
	        var b = c.createElement("div");
	        return b.classList.add(h), b.addEventListener("touchmove", a.preventDefault), b.addEventListener("tap", function() {
	            var b = a.targets._popover;
	            b && (b.addEventListener("webkitTransitionEnd", q), b.classList.remove(l), s(b), c.body.setAttribute("style", ""))
	        }), b
	    }(), s = function(b) {
	        r.setAttribute("style", "opacity:0"), a.targets.popover = a.targets._popover = null, setTimeout(function() {
	            !b.classList.contains(l) && r.parentNode && r.parentNode === c.body && c.body.removeChild(r)
	        }, 350)
	    };
	    b.addEventListener("tap", function(b) {
	        if (a.targets.popover) {
	            for (var d = !1, e = b.target; e && e !== c; e = e.parentNode)
	                e === a.targets.popover && (d = !0);
	            d && t(a.targets._popover, a.targets.popover)
	        }
	    });
	    var t = function(a, b) {
	        r.classList.remove(j), r.classList.remove(k);
	        var d = c.querySelector(".mui-popover.mui-active");
	        if (d && (d.addEventListener("webkitTransitionEnd", q), d.classList.remove(l), a === d))
	            return void s(d);
	        var e = !1;
	        (a.classList.contains(i) || a.classList.contains(g)) && (a.classList.contains(g) ? (e = !0, r.classList.add(k)) : r.classList.add(j)), a.setAttribute("style", "display:block"), a.offsetHeight, a.classList.add(l), r.setAttribute("style", ""), c.body.appendChild(r), o(!0), u(a, b, e), r.classList.add(l), a.addEventListener("webkitTransitionEnd", p)
	    }, u = function(d, e, h) {
	        if (d && e) {
	            var i = b.innerWidth, j = b.innerHeight, k = d.offsetWidth, l = d.offsetHeight;
	            if (h)
	                return void d.setAttribute("style", "display:block;top:" + (j - l + b.pageYOffset) + "px;left:" + (i - k) / 2 + "px;");
	            var n = e.offsetWidth, o = e.offsetHeight, p = a.offset(e), q = d.querySelector("." + f);
	            q || (q = c.createElement("div"), q.className = f, d.appendChild(q));
	            var r = q && q.offsetWidth / 2 || 0, s = 0, t = 0, u = 0, v = 0, w = d.classList.contains(g) ? 0 : 5, x = "top";
	            l + r < p.top - b.pageYOffset ? s = p.top - l - r : l + r < j - (p.top - b.pageYOffset) - o ? (x = "bottom", s = p.top + o + r) : (x = "middle", s = Math.max((j - l) / 2 + b.pageYOffset, 0), t = Math.max((i - k) / 2 + b.pageXOffset, 0)), "top" === x || "bottom" === x ? (t = n / 2 + p.left - k / 2, u = t, w > t && (t = w), t + k > i && (t = i - k - w), q && ("top" === x ? q.classList.add(m) : q.classList.remove(m), u -= t, v = k / 2 - r / 2 + u, v = Math.max(Math.min(v, k - 2 * r - 6), 6), q.setAttribute("style", "left:" + v + "px"))) : "middle" === x && q.setAttribute("style", "display:none"), d.setAttribute("style", "display:block;top:" + s + "px;left:" + t + "px;")
	        }
	    };
	    a.createMask = function(b) {
	        var d = c.createElement("div");
	        d.classList.add(h), d.addEventListener("touchmove", a.preventDefault), d.addEventListener("tap", function() {
	            b && b(), e.close()
	        });
	        var e = [d];
	        return e._show = !1, e.show = function() {
	            return this._show = !0, d.setAttribute("style", "opacity:1"), c.body.appendChild(d), this
	        }, e._remove = function() {
	            return this._show && (this._show = !1, d.setAttribute("style", "opacity:0"), setTimeout(function() {
	                c.body.removeChild(d)
	            }, 350)), this
	        }, e.close = function() {
	            return this._remove()
	        }, e
	    }, a.fn.popover = function() {
	        var b = arguments;
	        this.each(function() {
	            a.targets._popover = this, ("show" === b[0] || "hide" === b[0] || "toggle" === b[0]) && t(this, b[1])
	        })
	    }
	}(mui, window, document, "popover"), function(a, b, c, d) {
	    var e = "mui-control-item", f = "mui-control-content", g = "mui-tab-item", h = function(a, b) {
	        return b.classList && (b.classList.contains(e) || b.classList.contains(g)) ? b : !1
	    };
	    a.registerTarget({name: d,index: 80,handle: h,target: !1}), b.addEventListener("tap", function(b) {
	        var e = a.targets.tab;
	        if (e) {
	            var g, h, i, j = "mui-active", k = "." + j;
	            g = e.parentNode.querySelector(k), g && g.classList.remove(j);
	            var l = e === g;
	            if (e && e.classList.add(j), e.hash && (i = c.getElementById(e.hash.replace("#", "")))) {
	                if (!i.classList.contains(f))
	                    return void e.classList[l ? "remove" : "add"](j);
	                if (!l) {
	                    var m = i.parentNode;
	                    h = m.querySelectorAll("." + f + k);
	                    for (var n = 0; n < h.length; n++) {
	                        var o = h[n];
	                        o.parentNode === m && o.classList.remove(j)
	                    }
	                    i.classList.add(j);
	                    var p = i.parentNode.querySelectorAll("." + f);
	                    a.trigger(i, a.eventName("shown", d), {tabNumber: Array.prototype.indexOf.call(p, i)}), b.detail.gesture.preventDefault()
	                }
	            }
	        }
	    })
	}(mui, window, document, "tab"), function(a, b, c) {
	    var d = "mui-switch", e = "mui-switch-handle", f = "mui-active", g = "mui-dragging", h = "." + e, i = function(a, b) {
	        return b.classList && b.classList.contains(d) ? b : !1
	    };
	    a.registerTarget({name: c,index: 100,handle: i,target: !1});
	    var j = function(a) {
	        this.element = a, this.classList = this.element.classList, this.handle = this.element.querySelector(h), this.toggleWidth = this.element.offsetWidth, this.handleWidth = this.handle.offsetWidth, this.handleX = this.toggleWidth - this.handleWidth - 3, this.initEvent()
	    };
	    j.prototype.initEvent = function() {
	        this.element.addEventListener("touchstart", this), this.element.addEventListener("drag", this), this.element.addEventListener("swiperight", this), this.element.addEventListener("touchend", this), this.element.addEventListener("touchcancel", this)
	    }, j.prototype.handleEvent = function(a) {
	        switch (a.type) {
	            case "touchstart":
	                this.start(a);
	                break;
	            case "drag":
	                this.drag(a);
	                break;
	            case "swiperight":
	                this.swiperight();
	                break;
	            case "touchend":
	            case "touchcancel":
	                this.end(a)
	        }
	    }, j.prototype.start = function() {
	        this.classList.add(g)
	    }, j.prototype.drag = function(a) {
	        var b = a.detail;
	        this.isDragging || ("left" === b.direction || "right" === b.direction) && (this.isDragging = !0, this.lastChanged = void 0, this.initialState = this.classList.contains(f)), this.isDragging && (this.setTranslateX(b.deltaX), a.stopPropagation(), b.gesture.preventDefault())
	    }, j.prototype.swiperight = function(a) {
	        this.isDragging && a.stopPropagation()
	    }, j.prototype.end = function(b) {
	        this.classList.remove(g), this.isDragging ? (this.isDragging = !1, b.stopPropagation(), a.trigger(this.element, "toggle", {isActive: this.classList.contains(f)})) : this.toggle()
	    }, j.prototype.toggle = function() {
	        var b = this.classList;
	        b.contains(f) ? (b.remove(f), this.handle.style.webkitTransform = "translate3d(0,0,0)") : (b.add(f), this.handle.style.webkitTransform = "translate3d(" + this.handleX + "px,0,0)"), a.trigger(this.element, "toggle", {isActive: this.classList.contains(f)})
	    }, j.prototype.setTranslateX = a.animationFrame(function(a) {
	        if (this.isDragging) {
	            var b = !1;
	            (this.initialState && -a > this.handleX / 2 || !this.initialState && a > this.handleX / 2) && (b = !0), this.lastChanged !== b && (b ? (this.handle.style.webkitTransform = "translate3d(" + (this.initialState ? 0 : this.handleX) + "px,0,0)", this.classList[this.initialState ? "remove" : "add"](f)) : (this.handle.style.webkitTransform = "translate3d(" + (this.initialState ? this.handleX : 0) + "px,0,0)", this.classList[this.initialState ? "add" : "remove"](f)), this.lastChanged = b)
	        }
	    }), a.fn["switch"] = function() {
	        var b = [];
	        return this.each(function() {
	            var c = null, d = this.getAttribute("data-switch");
	            d ? c = a.data[d] : (d = ++a.uuid, a.data[d] = new j(this), this.setAttribute("data-switch", d)), b.push(c)
	        }), b.length > 1 ? b : b[0]
	    }, a.ready(function() {
	        a("." + d)["switch"]()
	    })
	}(mui, window, "toggle"), function(a, b, c) {
	    function d(a, b) {
	        var c = b ? "removeEventListener" : "addEventListener";
	        a[c]("drag", E), a[c]("dragend", E), a[c]("swiperight", E), a[c]("swipeleft", E), a[c]("flick", E)
	    }
	    var e, f, g = "mui-active", h = "mui-selected", i = "mui-grid-view", j = "mui-table-view-cell", k = "mui-collapse-content", l = "mui-disabled", m = "mui-switch", n = "mui-btn", o = "mui-slider-handle", p = "mui-slider-left", q = "mui-slider-right", r = "mui-transitioning", s = "." + o, t = "." + p, u = "." + q, v = "." + h, w = "." + n, x = .8, y = isOpened = openedActions = progress = !1, z = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1, A = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0, B = function(a) {
	        a ? f ? f.classList.add(g) : e && e.classList.add(g) : f ? f.classList.remove(g) : e && e.classList.remove(g)
	    }, C = function() {
	        if (A !== lastTranslateX) {
	            if (buttonsRight && buttonsRight.length > 0) {
	                progress = A / sliderActionRightWidth, A < -sliderActionRightWidth && (A = -sliderActionRightWidth - Math.pow(-A - sliderActionRightWidth, x));
	                for (var a = 0, b = buttonsRight.length; b > a; a++) {
	                    var c = buttonsRight[a];
	                    "undefined" == typeof c._buttonOffset && (c._buttonOffset = c.offsetLeft), buttonOffset = c._buttonOffset, D(c, A - buttonOffset * (1 + Math.max(progress, -1)))
	                }
	            }
	            if (buttonsLeft && buttonsLeft.length > 0)
	                for (progress = A / sliderActionLeftWidth, A > sliderActionLeftWidth && (A = sliderActionLeftWidth + Math.pow(A - sliderActionLeftWidth, x)), a = 0, b = buttonsLeft.length; b > a; a++) {
	                    var d = buttonsLeft[a];
	                    "undefined" == typeof d._buttonOffset && (d._buttonOffset = sliderActionLeftWidth - d.offsetLeft - d.offsetWidth), buttonOffset = d._buttonOffset, buttonsLeft.length > 1 && (d.style.zIndex = buttonsLeft.length - a), D(d, A + buttonOffset * (1 - Math.min(progress, 1)))
	                }
	            D(z, A), lastTranslateX = A
	        }
	        sliderRequestAnimationFrame = requestAnimationFrame(function() {
	            C()
	        })
	    }, D = function(a, b) {
	        a && (a.style.webkitTransform = "translate3d(" + b + "px,0,0)")
	    };
	    b.addEventListener("touchstart", function(b) {
	        e && B(!1), e = f = !1, y = isOpened = openedActions = !1;
	        for (var g = b.target, h = !1; g && g !== c; g = g.parentNode)
	            if (g.classList) {
	                var o = g.classList;
	                if (("INPUT" === g.tagName && "radio" !== g.type && "checkbox" !== g.type || "BUTTON" === g.tagName || o.contains(m) || o.contains(n) || o.contains(l)) && (h = !0), o.contains(k))
	                    break;
	                if (o.contains(j)) {
	                    e = g;
	                    var p = e.parentNode.querySelector(v);
	                    if (p && p !== e)
	                        return a.swipeoutClose(p), void (e = h = !1);
	                    if (!e.parentNode.classList.contains(i)) {
	                        var q = e.querySelector("a");
	                        q && q.parentNode === e && (f = q)
	                    }
	                    e.querySelector(s) && (d(e), b.stopPropagation()), h || e.querySelector("input") || e.querySelector(w) || e.querySelector("." + m) || B(!0);
	                    break
	                }
	            }
	    }), b.addEventListener("touchmove", function() {
	        B(!1)
	    });
	    var E = {handleEvent: function(a) {
	            switch (a.type) {
	                case "drag":
	                    this.drag(a);
	                    break;
	                case "dragend":
	                    this.dragend(a);
	                    break;
	                case "flick":
	                    this.flick(a);
	                    break;
	                case "swiperight":
	                    this.swiperight(a);
	                    break;
	                case "swipeleft":
	                    this.swipeleft(a)
	            }
	        },drag: function(a) {
	            if (e) {
	                y || (z = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1, z = e.querySelector(s), z && (sliderActionLeft = e.querySelector(t), sliderActionRight = e.querySelector(u), sliderActionLeft && (sliderActionLeftWidth = sliderActionLeft.offsetWidth, buttonsLeft = sliderActionLeft.querySelectorAll(w)), sliderActionRight && (sliderActionRightWidth = sliderActionRight.offsetWidth, buttonsRight = sliderActionRight.querySelectorAll(w)), e.classList.remove(r), isOpened = e.classList.contains(h), isOpened && (openedActions = e.querySelector(t + v) ? "left" : "right")));
	                var b = a.detail, c = b.direction, d = b.angle;
	                if ("left" === c && (d > 150 || -150 > d) ? (buttonsRight || buttonsLeft && isOpened) && (y = !0) : "right" === c && d > -30 && 30 > d && (buttonsLeft || buttonsRight && isOpened) && (y = !0), y) {
	                    a.stopPropagation(), a.detail.gesture.preventDefault();
	                    var f = a.detail.deltaX;
	                    if (isOpened && ("right" === openedActions ? f -= sliderActionRightWidth : f += sliderActionLeftWidth), f > 0 && !buttonsLeft || 0 > f && !buttonsRight) {
	                        if (!isOpened)
	                            return;
	                        f = 0
	                    }
	                    0 > f ? sliderDirection = "toLeft" : f > 0 ? sliderDirection = "toRight" : sliderDirection || (sliderDirection = "toLeft"), sliderRequestAnimationFrame || C(), A = f
	                }
	            }
	        },flick: function(a) {
	            y && a.stopPropagation()
	        },swipeleft: function(a) {
	            y && a.stopPropagation()
	        },swiperight: function(a) {
	            y && a.stopPropagation()
	        },dragend: function(b) {
	            if (y) {
	                b.stopPropagation(), sliderRequestAnimationFrame && (cancelAnimationFrame(sliderRequestAnimationFrame), sliderRequestAnimationFrame = null);
	                var c = b.detail;
	                y = !1;
	                var d = "close", f = "toLeft" === sliderDirection ? sliderActionRightWidth : sliderActionLeftWidth, g = c.swipe || Math.abs(A) > f / 2;
	                g && (isOpened ? "left" === c.direction && "right" === openedActions ? d = "open" : "right" === c.direction && "left" === openedActions && (d = "open") : d = "open"), e.classList.add(r);
	                var i;
	                if ("open" === d) {
	                    var j = "toLeft" === sliderDirection ? -f : f;
	                    if (D(z, j), i = "toLeft" === sliderDirection ? buttonsRight : buttonsLeft, "undefined" != typeof i) {
	                        var k = null;
	                        for (m = 0; m < i.length; m++)
	                            k = i[m], D(k, j);
	                        k.parentNode.classList.add(h), e.classList.add(h), isOpened || a.trigger(e, "toLeft" === sliderDirection ? "slideleft" : "slideright")
	                    }
	                } else
	                    D(z, 0), sliderActionLeft && sliderActionLeft.classList.remove(h), sliderActionRight && sliderActionRight.classList.remove(h), e.classList.remove(h);
	                var l;
	                if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== i)
	                    for (var m = 0, n = buttonsLeft.length; n > m; m++) {
	                        var o = buttonsLeft[m];
	                        l = o._buttonOffset, "undefined" == typeof l && (o._buttonOffset = sliderActionLeftWidth - o.offsetLeft - o.offsetWidth), D(o, l)
	                    }
	                if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== i)
	                    for (var m = 0, n = buttonsRight.length; n > m; m++) {
	                        var p = buttonsRight[m];
	                        l = p._buttonOffset, "undefined" == typeof l && (p._buttonOffset = p.offsetLeft), D(p, -l)
	                    }
	            }
	        }};
	    a.swipeoutOpen = function(b, c) {
	        if (b) {
	            var d = b.classList;
	            if (!d.contains(h)) {
	                c || (c = b.querySelector(u) ? "right" : "left");
	                var e = b.querySelector(a.classSelector(".slider-" + c));
	                if (e) {
	                    e.classList.add(h), d.add(h), d.remove(r);
	                    for (var f, g = e.querySelectorAll(w), i = e.offsetWidth, j = "right" === c ? -i : i, k = g.length, l = 0; k > l; l++)
	                        f = g[l], "right" === c ? D(f, -f.offsetLeft) : D(f, i - f.offsetWidth - f.offsetLeft);
	                    d.add(r);
	                    for (var l = 0; k > l; l++)
	                        D(g[l], j);
	                    D(b.querySelector(s), j)
	                }
	            }
	        }
	    }, a.swipeoutClose = function(b) {
	        if (b) {
	            var c = b.classList;
	            if (c.contains(h)) {
	                var d = b.querySelector(u + v) ? "right" : "left", e = b.querySelector(a.classSelector(".slider-" + d));
	                if (e) {
	                    e.classList.remove(h), c.remove(h), c.add(r);
	                    var f, g = e.querySelectorAll(w), i = e.offsetWidth, j = g.length;
	                    D(b.querySelector(s), 0);
	                    for (var k = 0; j > k; k++)
	                        f = g[k], "right" === d ? D(f, -f.offsetLeft) : D(f, i - f.offsetWidth - f.offsetLeft)
	                }
	            }
	        }
	    }, b.addEventListener("touchend", function() {
	        e && (B(!1), z && d(e, !0))
	    }), b.addEventListener("touchcancel", function() {
	        e && (B(!1), z && d(e, !0))
	    });
	    var F = function() {
	        var a = e.classList;
	        if (a.contains("mui-radio")) {
	            var b = e.querySelector("input[type=radio]");
	            b && b.click()
	        } else if (a.contains("mui-checkbox")) {
	            var b = e.querySelector("input[type=checkbox]");
	            b && b.click()
	        }
	    };
	    b.addEventListener(a.EVENT_CLICK, function(a) {
	        e && e.classList.contains("mui-collapse") && a.preventDefault()
	    }), b.addEventListener("doubletap", function() {
	        e && F()
	    }), b.addEventListener("tap", function(b) {
	        if (e) {
	            var c = !1, d = e.classList;
	            if (d.contains("mui-collapse") && !e.parentNode.classList.contains("mui-unfold")) {
	                if (b.detail.gesture.preventDefault(), !d.contains(g)) {
	                    var f = e.parentNode.querySelector(".mui-collapse.mui-active");
	                    f && f.classList.remove(g), c = !0
	                }
	                d.toggle(g), c && a.trigger(e, "expand")
	            }
	            F()
	        }
	    })
	}(mui, window, document), function(a, b) {
	    a.alert = function(c, d, e, f) {
	        if (a.os.plus) {
	            if (void 0 === typeof c)
	                return;
	            "function" == typeof d ? (f = d, d = null, e = "确定") : "function" == typeof e && (f = e, e = null), plus.nativeUI.alert(c, f, d, e)
	        } else
	            b.alert(c)
	    }
	}(mui, window), function(a, b) {
	    a.confirm = function(c, d, e, f) {
	        if (a.os.plus) {
	            if (void 0 === typeof c)
	                return;
	            "function" == typeof d ? (f = d, d = null, e = null) : "function" == typeof e && (f = e, e = null), plus.nativeUI.confirm(c, f, d, e)
	        } else
	            b.confirm(c)
	    }
	}(mui, window), function(a, b) {
	    a.prompt = function(c, d, e, f, g) {
	        if (a.os.plus) {
	            if (void 0 === typeof message)
	                return;
	            "function" == typeof d ? (g = d, d = null, e = null, f = null) : "function" == typeof e ? (g = e, e = null, f = null) : "function" == typeof f && (g = f, f = null), plus.nativeUI.prompt(c, g, e, d, f)
	        } else
	            b.prompt(c)
	    }
	}(mui, window), function(a) {
	    a.toast = function(b) {
	        if (a.os.plus && a.os.android)
	            plus.nativeUI.toast(b, {verticalAlign: "bottom"});
	        else {
	            var c = document.createElement("div");
	            c.classList.add("mui-toast-container"), c.innerHTML = '<div class="mui-toast-message">' + b + "</div>", document.body.appendChild(c), setTimeout(function() {
	                document.body.removeChild(c)
	            }, 2e3)
	        }
	    }
	}(mui, window), function(a, b, c) {
	    var d = "mui-icon", e = "mui-icon-clear", f = "mui-icon-speech", g = "mui-icon-search", h = "mui-input-row", i = "mui-placeholder", j = "mui-tooltip", k = "mui-hidden", l = "mui-focusin", m = "." + e, n = "." + f, o = "." + i, p = "." + j, q = function(a) {
	        for (; a && a !== c; a = a.parentNode)
	            if (a.classList && a.classList.contains(h))
	                return a;
	        return null
	    }, r = function(a, b) {
	        this.element = a, this.options = b || {actions: "clear"}, ~this.options.actions.indexOf("slider") ? (this.sliderActionClass = j + " " + k, this.sliderActionSelector = p) : (~this.options.actions.indexOf("clear") && (this.clearActionClass = d + " " + e + (a.value ? "" : " " + k), this.clearActionSelector = m), ~this.options.actions.indexOf("speech") && (this.speechActionClass = d + " " + f, this.speechActionSelector = n), ~this.options.actions.indexOf("search") && (this.searchActionClass = i, this.searchActionSelector = o)), this.init()
	    };
	    r.prototype.init = function() {
	        this.initAction(), this.initElementEvent()
	    }, r.prototype.initAction = function() {
	        var b = this, c = b.element.parentNode;
	        c && (b.sliderActionClass ? b.sliderAction = b.createAction(c, b.sliderActionClass, b.sliderActionSelector) : (b.searchActionClass && (b.searchAction = b.createAction(c, b.searchActionClass, b.searchActionSelector), b.searchAction.addEventListener("tap", function(c) {
	            a.focus(b.element), c.stopPropagation()
	        })), b.speechActionClass && (b.speechAction = b.createAction(c, b.speechActionClass, b.speechActionSelector), b.speechAction.addEventListener("click", a.stopPropagation), b.speechAction.addEventListener("tap", function(a) {
	            b.speechActionClick(a)
	        })), b.clearActionClass && (b.clearAction = b.createAction(c, b.clearActionClass, b.clearActionSelector), b.clearAction.addEventListener("tap", function(a) {
	            b.clearActionClick(a)
	        }))))
	    }, r.prototype.createAction = function(a, b, e) {
	        var f = a.querySelector(e);
	        if (!f) {
	            var f = c.createElement("span");
	            f.className = b, b === this.searchActionClass && (f.innerHTML = '<span class="' + d + " " + g + '"></span>' + this.element.getAttribute("placeholder"), this.element.setAttribute("placeholder", "")), a.insertBefore(f, this.element.nextSibling)
	        }
	        return f
	    }, r.prototype.initElementEvent = function() {
	        var b = this.element;
	        if (this.sliderActionClass) {
	            var c = this.sliderAction, d = b.offsetLeft, e = b.offsetWidth - 28, f = c.offsetWidth, g = Math.abs(b.max - b.min), h = null, i = function() {
	                c.classList.remove(k), f = f || c.offsetWidth;
	                var a = Math.abs(b.value) / g * e;
	                c.style.left = 14 + d + a - f / 2 + "px", c.innerText = b.value, h && clearTimeout(h), h = setTimeout(function() {
	                    c.classList.add(k)
	                }, 1e3)
	            };
	            b.addEventListener("input", i), b.addEventListener("tap", i), b.addEventListener("touchmove", function(a) {
	                a.stopPropagation()
	            })
	        } else {
	            if (this.clearActionClass) {
	                var j = this.clearAction;
	                if (!j)
	                    return;
	                a.each(["keyup", "change", "input", "focus", "blur", "cut", "paste"], function(a, c) {
	                    !function(a) {
	                        b.addEventListener(a, function() {
	                            j.classList[b.value.trim() ? "remove" : "add"](k)
	                        })
	                    }(c)
	                })
	            }
	            this.searchActionClass && (b.addEventListener("focus", function() {
	                b.parentNode.classList.add("mui-active")
	            }), b.addEventListener("blur", function() {
	                b.value.trim() || b.parentNode.classList.remove("mui-active")
	            }))
	        }
	    }, r.prototype.clearActionClick = function(b) {
	        var c = this;
	        c.element.value = "", a.focus(c.element), c.clearAction.classList.add(k), b.preventDefault()
	    }, r.prototype.speechActionClick = function(d) {
	        if (b.plus) {
	            var e = this;
	            e.element.value = "", c.body.classList.add(l), plus.speech.startRecognize({engine: "iFly"}, function(b) {
	                e.element.value += b, a.focus(e.element), plus.speech.stopRecognize(), a.trigger(e.element, "recognized", {value: e.element.value})
	            }, function() {
	                c.body.classList.remove(l)
	            })
	        } else
	            alert("only for 5+");
	        d.preventDefault()
	    }, a.fn.input = function() {
	        this.each(function() {
	            var b = [], c = q(this.parentNode), d = c.querySelector("label");
	            if (d) {
	                var e = this;
	                d.addEventListener("tap", function() {
	                    "text" === e.type || e.click()
	                })
	            }
	            if ("range" === this.type && c.classList.contains("mui-input-range"))
	                b.push("slider");
	            else {
	                var f = this.classList;
	                f.contains("mui-input-clear") && b.push("clear"), f.contains("mui-input-speech") && b.push("speech"), "search" === this.type && c.classList.contains("mui-search") && b.push("search")
	            }
	            var g = this.getAttribute("data-input-" + b[0]);
	            if (!g) {
	                g = ++a.uuid, a.data[g] = new r(this, {actions: b.join(",")});
	                for (var h = 0, i = b.length; i > h; h++)
	                    this.setAttribute("data-input-" + b[h], g)
	            }
	        })
	    }, a.ready(function() {
	        a(".mui-input-row input").input()
	    })
	    module.exports = mui;
	    return mui;
	}(mui, window, document);


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ }

});