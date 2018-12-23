/* td-jsonp 0.3.0 */
(function (global) {
	'use strict';

	function jsonp () {
		return  function (url, callback, arg) {
			var res, cb, r = url.match(/[?&]callback=([^&]+)/);
			var id = 'script' + (Math.random()*67108864|0).toString(16);
	    var auth = /.*:\/\/([^:]+:.+@)/.exec(url);
	    if (auth && auth[1]) { // auth is deprecated
	      url = url.replace(auth[1], '');
	    }
			if (r) {
				cb = r[1];
			} else {
				cb = id;
				url += url.indexOf('?') !== -1 ? '&' : '?';
				url += 'callback=' + cb;
			}
			var tempCb = typeof global[cb] === 'undefined' ? true : false;
			if (tempCb) {
				global[cb] = function (data) {
					try {res = JSON.parse(data)} catch (e) {res = data};
				}
			}
	  		var script = document.createElement('script');
	    	script.type = 'text/javascript';
	    	script.src = url;
	    	script.async = true;
	    	script.id = id;
	    	script.onreadystatechange = script.onload = function() {
	        	script.parentNode.removeChild(document.getElementById(id));
				if (tempCb) {
					delete global[cb];
				}
	        	callback && callback(res, arg);
	    	};
	    	(document.body || document.head).appendChild(script);
		}
	}

    /**
     * Use AMD if a module loader is in place.
     */
    if (global && typeof global.define === 'function') {
        global.define('jsonp', function () {
            return jsonp(global);
        });
    } else if (typeof module === 'object') {
        module.exports = jsonp(global);
    } else {
        global.jsonp = jsonp(global);
    }
}(window));
