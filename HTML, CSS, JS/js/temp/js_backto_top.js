
$('body').append('<div id="top" ><img src="images/commont/top.png" alt="top"/></div>');
$(window).scroll(function() {
	if($(window).scrollTop() > 100) {
		$('#top').fadeIn();
	} else {
		$('#top').fadeOut();
	}
	});
	$('#top').click(function() {
	$('html, body').animate({scrollTop:0},500);
	});
