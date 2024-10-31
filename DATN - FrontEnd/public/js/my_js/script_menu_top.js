$(document).ready(function(e) {
    $('#menu ul li').hover(
		function(){
			 $(this).children('ul').stop().slideDown();
		},
		function(){
			$(this).children('ul').css({'display':'none'});
		}
	);
});