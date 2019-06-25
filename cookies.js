/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 * Released under the MIT license
 */
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(s){}return r=t.write?t.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),l=f.slice(1).join("=");'"'===l.charAt(0)&&(l=l.slice(1,-1));try{var m=f[0].replace(u,decodeURIComponent);if(l=t.read?t.read(l,m):t(l,m)||l.replace(u,decodeURIComponent),this.json)try{l=JSON.parse(l)}catch(s){}if(n===m){c=l;break}n||(c[m]=l)}catch(s){}}return c}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n(function(){})});

/* docReady is a single plain javascript function that provides a method of scheduling one or more javascript functions to run at some later point when the DOM has finished loading. */ 
!function(t,e){"use strict";function n(){if(!a){a=!0;for(var t=0;t<o.length;t++)o[t].fn.call(window,o[t].ctx);o=[]}}function d(){"complete"===document.readyState&&n()}t=t||"docReady",e=e||window;var o=[],a=!1,c=!1;e[t]=function(t,e){return a?void setTimeout(function(){t(e)},1):(o.push({fn:t,ctx:e}),void("complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(n,1):c||(document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):(document.attachEvent("onreadystatechange",d),window.attachEvent("onload",n)),c=!0)))}}("docReady",window);

/**
 * Add cookie on page closing event to detect unique visitors.
 * This javascript file checks for the brower/browser tab action.
 */
var exDays = 2;

var validNavigation = false;

function wireUpEvents() {

	var isOnIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var eventName = isOnIOS ? "pagehide" : "beforeunload";

    window.addEventListener(eventName, function(e) {
		if (!validNavigation) {

			if (Cookies.get("IsNotUnique")) {
				Cookies.remove("IsNotUnique");
				Cookies.set('IsNotUnique2', 'true', { expires: exDays });
			}
			else if (Cookies.get("IsNotUnique2")){
				Cookies.remove("IsNotUnique2");
			}
			else {
				Cookies.set('IsNotUnique', 'true', { expires: exDays });
			}

            if(!e) e = window.event;
            e.cancelBubble = true;
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }
		return null;
    });

    // Attach the event keypress to exclude the F5 refresh
	document.addEventListener('keypress', function(e) {
        if (e.keyCode == 116){
            validNavigation = true;
        }
    });
	// Attach the event click for all links, forms, input=submit in the page	
	document.onclick = function(event) {
		var el = event.target;
		if (el.nodeName == "form" || el.nodeName == "a" || el.nodeName == "input[type=submit]") {
			validNavigation = true;
		}
	};
}

// Wire up the events as soon as the DOM tree is ready
docReady(function() {
    wireUpEvents();
});