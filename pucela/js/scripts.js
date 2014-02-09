/* 
* FishThemes 
* Copyright 2012, FishThemes
* www.FishThemes.com
* 16/07/2012
*/	
	
// Begin Document Ready 

$(document).ready(function() { 	

/* If Javascript is disabled a class named no-js will be available on Html tag*/
$('html').removeClass('.no-js').addClass('js');
 
/* Carousel Hover Effect */
$(".carousel .hover").hide();
$('.carousel li').hover(
  function () {
      $(this).find(".hover").fadeIn();
   },
  function () {
      $(this).find(".hover").fadeOut();
  }
);
/* Carousel Hover Effect IE8 ShowHide instead of Fade ( PNG bug) */
 $('.ie8 .carousel li').hover(
  function () {
      $(this).find(".hover").show();
   },
  function () {
      $(this).find(".hover").hide();
  }
);

		
/* Triggering Popup */
	$('.popup').fancybox({
					'transitionIn'	: 'elastic',
					'transitionOut'	: 'elastic'	,
					'overlayColor'		: '#333',
					'overlayOpacity'	: 0.5,
					'padding' : 0,
                                        'type' : "inline"
	});


/* Triggering Testimonial Slideshow */
	$('.flexslider').flexslider({
	animation: "fade"
	});

/* Triggering Responsive Carousel */
$('#carousel').elastislide({
		minItems	: 1,
		margin      : 24,
		imageW      : 240
	});
 

});
$('#carousel').find(".es-nav-next").hide();
// End of Document Ready


 