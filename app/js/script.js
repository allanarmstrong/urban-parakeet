	$(document).ready(function() {
		$(document).on("scroll", function() {
			var scrollHeight = $(window).scrollTop();
			if (scrollHeight >= 378) {
				//$('header').css('background-color', 'rgba(255,255,255,0.5)');
				$('header').css('padding-top', '0rem');
			} else {
				//$('header').css('background-color', 'white');
				$('header').css('padding-top', '1.75rem');
			}
		});
	})