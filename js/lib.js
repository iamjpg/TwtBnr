$(document).ready(function() {
	$("#radio").buttonset();
	$("input:submit", ".center").button();
	$("#radio1,#radio2").bind("click",function(){
		$("#code").slideUp("slow");
		if ($("input[name='radio']:checked").val() == "left:0px;") {
			$("#banner").fadeOut("fast",function() {
				var bnr_pos = 'left';
				var style_left_right = 'top: -90px; left: -70px;';
				$("#banner").html('<div style="overflow:hidden; top: 0px; ' + bnr_pos + ': 0px; display: inline-block; position: absolute; z-index: 1000; width: 200px; height: 200px;"><div style="position: relative;' + style_left_right + '"><a href="http://twitter.com/iamjpg"><img border="0" src="http://twtbnr.com/images/bnr_' + bnr_pos + '.png"></a></div></div>');
				$("#banner").fadeIn("slow");
			});
			
		} else {
			$("#banner").fadeOut("fast",function() {
				var bnr_pos = 'right';
				var style_left_right = 'top: -76px; right: 18px;';
				$("#banner").html('<div style="overflow:hidden; top: 0px; ' + bnr_pos + ': 0px; display: inline-block; position: absolute; z-index: 1000; width: 200px; height: 200px;"><div style="position: relative;' + style_left_right + '"><a href="http://twitter.com/iamjpg"><img border="0" src="http://twtbnr.com/images/bnr_' + bnr_pos + '.png"></a></div></div>');
				$("#banner").fadeIn("slow");
			});
		}
		
	});
	$("#twt_un").bind("focus",function() {
		$(this).val("");
	});
	$("#twt_un").bind("blur",function() {
		if ($(this).val() == "") {
			$(this).val("Enter Twitter Username Here");
		}
	});
	
	$("#twt_un").keypress(function (e) {
    	if (e.which == 13) {
			getCode();
		}
	});
	
	$("#sb").click(function(){
		getCode();
	});
		
		$("#code_ta").bind("focus",function() {
			$(this).select();
		});

		$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent('http://iamjpg.posterous.com/rss.xml')+"%22&format=json&callback=?", function(d) {
			//grab ever rss item from the json result request
			if (d.query.results.rss) {
				var count = 0;
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');

					//append to the div
					if (count == 0) {
						document.getElementById("blog").innerHTML += 'posted <a href="' + link + '" target="_blank">' + title + '</a> on Posterous about ' + twitter_relative_time(pubDate);
					}
					count++;
				});
			}

			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent('http://twitter.com/statuses/user_timeline/35092196.rss')+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				var count = 0;
				if (d.query.results.rss) {
					$(d.query.results.rss.channel.item).each(function() {
						//if set up to be infinite or the limit is not reached, keep grabbing items
						var title = this.title;
						var link = this.link;
						var description = this.description;
						var pubDate = this.pubDate;
						pubDate = pubDate.replace(/\,/g,'');

						var status = title.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
							return '<a href="'+url+'">'+url+'</a>';
						}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
							return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
						});

						//Remove twitter username from front of status.
						status = '@' + status;
						status = status.replace(/\B@([_a-z0-9]+):/ig, "");

						//append to the div
						if (count == 0) {
							document.getElementById('twitter_data').innerHTML += status+'" about '+twitter_relative_time(pubDate)+' on <a href="http://twitter.com/iamjpg">Twitter</a></li>';

						}
						count++
					});

				}

				$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent('http://feeds.delicious.com/v2/rss/jgiven')+"%22&format=json&callback=?", function(d) {
					//grab ever rss item from the json result request
					var count = 0;
					if (d.query.results.rss) {
						$(d.query.results.rss.channel.item).each(function() {
							//if set up to be infinite or the limit is not reached, keep grabbing items
							var title = this.title;
							var link = this.link;
							var description = this.description;
							var pubDate = this.pubDate;
							pubDate = pubDate.replace(/\,/g,'');
							title = title.toString();
							title = title.split(",");
							title = title[0];
							if (count == 0) {
								document.getElementById('delicious').innerHTML += '<a href="' + link + '" target="_blank">' + title + '</a> about ' + twitter_relative_time(pubDate);
							}
							count++;
						});

					}


				});



			});



		});

		$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent('http://ws.audioscrobbler.com/1.0/user/jgiven/recenttracks.rss')+"%22&format=json&callback=?", function(d) {
			//grab ever rss item from the json result request
			if (d.query.results.rss) {
				var count = 0;
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');

					//append to the div
					if (count == 0) {
						document.getElementById("lastfm").innerHTML += '<a href="' + link + '" target="_blank">' + title + '</a> on about ' + twitter_relative_time(pubDate);
					}
					count++;
				});
			}


		});

	});
	
function getCode() {
	if ($("#twt_un").val() == "" || $("#twt_un").val() == "Enter Twitter Username Here") {
		
		$("#code").slideUp("fast");
		
		$("#error_container").slideDown();

		setTimeout( function() { $("#error_container").slideUp(); }, 5000);

	} else {
		$("#code_ta").html("");
		if ($("input[name='radio']:checked").val() == "left:0px;") {
			var bnr_pos = 'left';
			var style_left_right = 'top: -90px; left: -70px;';
		} else {
			var bnr_pos = 'right';
			var style_left_right = 'top: -76px; right: 18px;';
		}
		$("#code_ta").append('&lt;!-- Begin Twitter banner code - http://twtbnr.com --&gt;\n&lt;div style="overflow:hidden; top: 0px; ' + bnr_pos + ': 0px; display: inline-block; position: absolute; z-index: 1000; width: 200px; height: 200px;"&gt;&lt;div style="position: relative;' + style_left_right + '"&gt;&lt;a href="http://twitter.com/' + $("#twt_un").val() + '"&gt;&lt;img border="0" src="http://twtbnr.com/images/bnr_' + bnr_pos + '.png"&gt;&lt;/a&gt;&lt;/div&gt;&lt;/div&gt;\n&lt;!-- End Twitter banner code - http://twtbnr.com --&gt;');
		$("#code").slideDown("slow", function() {
			FitToContent("code_ta", document.documentElement.clientHeight)
			var thsH = findPosY(document.getElementById("code"));
			$("body").scrollTo($("#code"), 1000);
		});
	}
}

function twitter_relative_time(time_value) {
	var values = time_value.split(" ");
		time_value = values[2] + " " + values[1] + ", " + values[3] + " " + values[4];
		var parsed_date = Date.parse(time_value);
		var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
		var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
		if (values[5] == "+0000") {
			delta = delta + (relative_to.getTimezoneOffset() * 60);
		} else {
			delta = delta + relative_to.getTimezoneOffset();
		}
	
	

	if (delta < 60) {
		return 'less than a minute ago';
	} else if(delta < 120) {
		return 'about a minute ago';
	} else if(delta < (60*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (120*60)) {
		return 'about an hour ago';
	} else if(delta < (24*60*60)) {
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	}
}

function findPosY(obj) {
	var curtop = 0;
	if(obj.offsetParent)
	while(1) {
		curtop += obj.offsetTop;
		if(!obj.offsetParent)
		break;
		obj = obj.offsetParent;
	}
	else if(obj.y)
	curtop += obj.y;
	return curtop;
}

function FitToContent(id, maxHeight)
{
   var text = id && id.style ? id : document.getElementById(id);

   if ( !text )
      return;

   var adjustedHeight = text.clientHeight;
   if ( !maxHeight || maxHeight > adjustedHeight )
   {
      adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
      if ( maxHeight )
         adjustedHeight = Math.min(maxHeight, adjustedHeight);
      if ( adjustedHeight > text.clientHeight )
         text.style.height = adjustedHeight + "px";
   }
}

