/**
  * This banner was created at http://twtbnr.com
**/

// Check for jQuery.  If not there, load it.
if (typeof jQuery == 'undefined') { 
	var head = document.getElementsByTagName("head")[0];
	script = document.createElement('script');
	script.id = 'jQuery';
	script.type = 'text/javascript';
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
	head.appendChild(script);
}
/*
 * This script can be found at http://twtbnr.com
*/
function twtbnr_append(email,pos) {
	// Append necessary divs.
	$("body").append('<div class="twtbnr"><a href="http://twitter.com/' + email + '"><img width="163" height="163" border="0" src="http://twtbnr.com/images/trans_bg.gif"></a></div>');
	
	// Add CSS magic
	if (pos == "left") {
		$("div.twtbnr").css({
			"position":"absolute",
			"top":"0",
			"left":"0",
			"margin":"0 0 0 0",
			"padding":"0",
			"background": "transparent url('http://twtbnr.com/images/banner_left.png') no-repeat -200px -200px",
			"width":"163px",
			"height":"163px",
			"overflow":"visible",
			'z-index':"10000"
		});
	} else {
		$("div.twtbnr").css({
			"position":"absolute",
			"top":"0",
			"left":"100%",
			"margin":"0 0 0 -163px",
			"padding":"0",
			"background": "transparent url('http://twtbnr.com/images/banner_right.png') no-repeat -200px -200px",
			"width":"163px",
			"height":"163px",
			"overflow":"visible",
			'z-index':"10000"
		});
	}
	
}

