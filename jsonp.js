/* kitsi jsonp 0.2.4 */
define(function () {
	return  function (url, callback) {
		var res, cb, r = url.match(/[?&]callback=([^&]+)/);
		var id = 'script' + (Math.random()*67108864|0).toString(16);
		if (r) {
			cb = r[1];
		} else {
			cb = id;
			url += url.indexOf('?') !== -1 ? '&' : '?';
			url += 'callback=' + cb;
		}
		window[cb] = function (data) {
			res = typeof data === 'string' ? JSON.parse(data) : data;
		}
  		var script = document.createElement('script');
    	script.type = 'text/javascript';
    	script.src = url;
    	script.async = true;
    	script.id = id;
    	script.onreadystatechange = script.onload = function() {
        	script.parentNode.removeChild(document.getElementById(id));
			delete window[cb];
        	callback && callback(res);
    	};
    	(document.body || document.head).appendChild(script);
	}
});
