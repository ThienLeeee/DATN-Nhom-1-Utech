$(document).ready(function(){
    // Get current position child hover event
      $('.lst-prd > li').hover(function(){
       var vitri = $(this).position().top;
       $('.list-prod-lv2').css({'top':vitri+'px'})
    });
    $(".list-group-item label").click(function(event) {
        $('.payment_collapse_wrap').removeClass('show');
        $(this).parents('.list-group-item').find('.payment_collapse_wrap').addClass('show');
    });

    /* Menu fixed */
    if($(".menu").length > 0)
    {
       $(window).scroll(function(){
          if($(window).scrollTop() >= ($(".menu").position().top + $(".menu").height() + $(".slideshow").height()))
          {
             $(".menu").addClass('menu-fix');
             $(".header").css({position:"fixed",left:'0px',right:'0px',top:'0px',zIndex:'100'});
             $(".show-menu").addClass("dispmenu");
             $(".header").addClass('ef-slide-down');
          }
          else
          {
             $(".menu").removeClass('menu-fix');
             $(".header").css({position:"relative"});
             $(".show-menu").removeClass("dispmenu");
             $(".header").removeClass('ef-slide-down');
          }
       });
    }

    // Click to scroll event
    $('body').on("click",".goto-form",function() {
        $('html, body').animate({scrollTop : $('.wrap-newsletter').position().top},800);
        return false; 
    });

    // Run Slick Event 
    $(".slick-slideshow").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        infinity: true
    });
    $(".slick-bannerqc2").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        infinity: true
    });
    $(".slick-prolistnb").slick({
        slidesToShow: 10,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        infinity: true
    });
	if($('.slick-bannerqc1').length>0) {
        $(".slick-bannerqc1").slick({
            slidesToShow:2,
            slidesToScroll:1,
            infinite:!0,
            autoplay: true,
            autoplaySpeed:5e3,            
            arrows:!1,
            vertical: true,
            dots:!1,            
            verticalSwiping:true,
            responsive: [
                {
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        vertical: false,
                        verticalSwiping:false,
                    }
                }
            ]
        });
    }
    $(".slick-tieuchi").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        infinity: true
    });
    $(".slick-product").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: true,
        infinity: true
    });
});