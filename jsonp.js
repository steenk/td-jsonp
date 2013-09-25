define(function () {
	return  function (url, callback) {
  		var script = document.createElement('script');
    	script.type = 'text/javascript';
    	script.src = url;
    	script.async = true;
    	var id = 'script' + (Math.random()*67108864|0).toString(16);
    	script.id = id;
    	script.onreadystatechange = script.onload = function() {
        	script.parentNode.removeChild(document.getElementById(id));
        	callback && callback();
    	};
    	(document.body || document.head).appendChild(script);
	}
});
