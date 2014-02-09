/* ------------------------------------------------------------------------------------------------------------------------ */
/* DOCUMENT READY --------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */
$(document).ready(function()
{
	/* BEGIN CALLING FUNCTIONS ------------------------------------------------------------------------------------------------ */

	init_logo(); 																	// Logo
	init_navigation(); 																// Main navigation
	init_banner(); 																	// Banner
	init_modules();																	// Modules
	init_portfolio(); 																// Portfolio
	init_team();																	// Team
	init_albums();																	// Albums
	commands_anim('#slider', '64'); 												// Show/Hide cycle commands (arrow - banner)
	commands_anim('.module, .hidden_content .col_sx', '24'); 						// Show/Hide cycle commands (arrow - other)
	excerpt_anim('#slider .edge, .portfolio .cycle .elem'); 						// Show/Hide banner and portfolio excerpt
	icons_page_anim(); 																// Slide up/down icons on page
	icons_anim('.back_home, .team .cycle .icon, .service .cycle .icon, .clients .cycle a, .social a'); 	// Slide up/down icons

	/* END CALLING FUNCTIONS -------------------------------------------------------------------------------------------------- */

	/* BEGIN INITIALIZATIONS -------------------------------------------------------------------------------------------------- */

	// Uniform
	$('.file').uniform({ selectClass : 'file' });
	$('#select_main_navigation').uniform({ selectClass : 'selector' });

	// Jscrollpane
	$('.scroll-pane').jScrollPane({
		autoReinitialise : true,
		verticalGutter   : 0
	});

	// Tooltip
	$('.tooltip').tooltip(
	{
		fade 		: 250,
		track 		: true,
		delay 		: 0,
		showURL 	: false,
		showBody 	: " / "
	});

	// Fancybox
	$('.fancybox').fancybox(
	{
		'speedIn'		 : 600,
		'speedOut'		 : 200,
		'titlePosition'  : 'over',
		'overlayColor'   : '#000',
		'overlayOpacity' : 0.8
	});

	/* END INITIALIZATIONS ---------------------------------------------------------------------------------------------------- */

}); // End document ready


/* ------------------------------------------------------------------------------------------------------------------------ */
/* WINDOW RESIZE ---------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */
$(window).bind('resize', function()
{
	resize_navigation(); 																	// Main navigation
	resize_banner(); 																		// Banner
	resize_team();																			// Team
	reset_icons_anim('.back_home, .team .cycle .icon, .service .cycle .icon, .clients .cycle a, .social a'); 	// Slide up/down icons
});

/* ------------------------------------------------------------------------------------------------------------------------ */
/* FUNCTIONS -------------------------------------------------------------------------------------------------------------- */
/* ------------------------------------------------------------------------------------------------------------------------ */

/* BEGIN LOGO FUNCTIONS --------------------------------------------------------------------------------------------------- */
function init_logo()
{
	var nav_length 	= $('#main_nav ul li').length - 1;
	$('#main_nav ul li#logo').insertAfter($('#main_nav ul li').eq((nav_length / 2)));
	$($('#main_nav ul li#logo').html()).prependTo($("#main_nav .mobile")).attr("id", "logo_mobile");
}
/* END LOGO FUNCTIONS ----------------------------------------------------------------------------------------------------- */

/* BEGIN MAIN NAVIGATION FUNCTIONS ---------------------------------------------------------------------------------------- */
function init_navigation()
{
	// Resize
	$("#logo img").one('load', function() {
		resize_navigation();
	});

	/* --- Actions --- */
	// Desktop and Tablet
	$('nav#main_nav ul li a').click(function(e)
	{
		// Prevent a page reload when a link is pressed
		e.preventDefault();

		// Active class
		$('nav#main_nav ul li').removeClass('active');
		$(this).parent('li').addClass('active');

		// Call the scroll to function
		goToByScroll($(this).attr('data-link'));
	});

	// Mobile
	$('#select_main_navigation').change(function(){
		if ($(this).val()){
			goToByScroll($(this).attr('value'));
		}
	});
}

function resize_navigation()
{
	// Header height
	if($('#wrapper').width() > 767)
	$("#main_content").css("padding-top" , $("#top").outerHeight() + "px");
}

/* END MAIN NAVIGATION FUNCTIONS ------------------------------------------------------------------------------------------ */

/* BEGIN ADJUST BANNER ELEMENT WIDTH -------------------------------------------------------------------------------------- */
var banner_animation = false;

function init_banner()
{
	// Resize
	resize_banner();
}


function resize_banner()
{
	// Set number of visible elements
	if($('#wrapper').width() > 990) var n_vis_elem = 4
	else if($('#wrapper').width() > 767 && $('#wrapper').width() < 990) var n_vis_elem = 3
	else if($('#wrapper').width() > 439 && $('#wrapper').width() < 768) var n_vis_elem = 2
	else if($('#wrapper').width() < 440) var n_vis_elem = 1

	// Set elements width
	var w_banner = $('#slider').width();
	$('#slider .elem').width(parseInt(w_banner / n_vis_elem));
}




/* END ADJUST BANNER ELEMENT WIDTH ---------------------------------------------------------------------------------------- */


/* BEGIN MODULES ---------------------------------------------------------------------------------------- */
function init_modules()
{
	// Set an unique id to every module
	var i = 0;
	$(".module").each(function(){
		$(this).attr("id", "module_" + i);
		i++;
	});

	// Add zebra styles
	$(".module:odd").addClass("black");
	$(".module:even").addClass("white");

	// Commands pager
	$(".module.company, .module.service, .module.portfolio").each(function()
	{
		if($('.cycle .block', this).length > 1)
		{
			var id = $(this).attr("id");

			// Add commands to white modules
			var commands = '<div class="commands">';
				commands += '<div class="arrow prev"></div>';
				commands += '<div class="arrow next"></div>';
			commands += '</div>';
			$(this).prepend(commands);

			// Init cycle
			$('.cycle', this).cycle({
				fx 		: 'scrollHorz',
				easing 	: 'easeOutQuart',
				speed 	: 600,
				timeout : 4500,
				prev	: '#' + id + ' .prev',
				next	: '#' + id + ' .next',
			});
		}
	});

	// Dots pager
	$(".module.team, .module.clients").each(function()
	{
		if($('.cycle .block', this).length > 1)
		{
			var id = $(this).attr("id");

			// Add pager to black modules
			var pager = '<div class="pager"></div><div class="clear"></div>';
			$('.page', this).append(pager);

			// Cycle
			$('.cycle', this).cycle({
				fx 		: 'scrollHorz',
				easing 	: 'easeOutQuart',
				speed 	: 600,
				timeout : 4500,
				pager	: '#' + id + ' .pager',
			});
		}
	});
}
/* END MODULES ---------------------------------------------------------------------------------------- */



/* BEGIN TEAM FUNCTIONS ---------------------------------------------------------------------------------------------- */
function init_team()
{
	// Resize
	resize_team();
}

function resize_team()
{
}

/* END TEAM FUNCTIONS ---------------------------------------------------------------------------------------- */


/* BEGIN PORTFOLIO FUNCTIONS ---------------------------------------------------------------------------------------------- */
function init_portfolio()
{
	/* --- Hide portfolio excerpts --- */
	$('.portfolio .cycle .excerpt').css('display', 'none');

	/* --- Category filter --- */
	var speed = 500;
	var ease = 'easeOutQuart';

	$('#category_filter ul li a').click(function(){
		var title = $(this).attr('title');
		$('#category_filter ul li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('.portfolio .cycle .elem').each(function(){
			if(title == 'All') {
				$(this).removeClass('disable').animate({
					'opacity' : 1
				}, speed, ease);
			} else if(title == $(this).find('h4').text()) {
				$(this).removeClass('disable').animate({
					'opacity' : 1
				}, speed, ease);
			} else {
				$(this).addClass('disable').animate({
					'opacity' : 0.1
				}, speed, ease);
			}
		});
	});
}
/* END PORTFOLIO FUNCTIONS ------------------------------------------------------------------------------------------------ */


/* BEGIN ALBUMS FUNCTIONS ------------------------------------------------------------------------------------------------ */
function init_albums()
{
	$(".album").each(function()
	{
		var id = $(this).attr("id");

		if($('img', this).length > 1) {
			$('.cycle_album_commands', this).css('display', 'block');
		}

		$('.gallery', this).cycle({
			fx 		: 'fade',
			easing 	: 'easeOutQuart',
			speed 	: 600,
			timeout : 0,
			prev	: '#' + id + ' .cycle_album_prev',
			next	: '#' + id + ' .cycle_album_next'
		});
	});
}
/* END ALBUMS FUNCTIONS ------------------------------------------------------------------------------------------------ */


/* BEGIN CYCLE COMMANDS ANIMATION (SHOW/HIDE ARROW) ----------------------------------------------------------------------- */
function commands_anim(div, width)
{
	// Vars
	var time = 250;
	var ease = 'easeOutQuart';

	// Mouseenter
	$(div).mouseenter(function(){
		$(this).find('.arrow').stop(true, false).animate({
			'width' : width + 'px'
		}, time, ease);
	});

	// Mouseleave
	$(div).mouseleave(function(){
		$(this).find('.arrow').stop(true, false).animate({
			'width' : '0px'
		}, time, ease);
	});
}
/* END CYCLE COMMANDS ANIMATION (SHOW/HIDE ARROW) ------------------------------------------------------------------------- */

/* BEGIN EXCERPT ANIMATION (BANNER AND PORTFOLIO ELEMENTS) ---------------------------------------------------------------- */
function excerpt_anim(div)
{
	// Vars
	var time = 250;
	var ease = 'easeOutQuart';

	// Mouseenter
	$(div).mouseenter(function(){
		$(this).not('.disable').find('.excerpt').stop(true, false).fadeIn(time, ease);
	});

	// Mouseleave
	$(div).mouseleave(function(){
		$(this).not('.disable').find('.excerpt').stop(true, false).fadeOut(time, ease);
	});
}
/* END EXCERPT ANIMATION (BANNER AND PORTFOLIO ELEMENTS) ------------------------------------------------------------------ */

/* BEGIN ICONS ANIMATION (SLIDE UP/DOWN) ---------------------------------------------------------------------------------- */

/* --- standard icons --- */
function icons_anim(div)
{
	// Vars
	var time = 250;
	var ease = 'easeOutQuart';

	// Mouseenter
	$(div).mouseenter(function(){
		$(this).find('img').stop(true, false).animate({
			'top' : '0px'
		}, time, ease);
	});

	// Mouseleave
	$(div).mouseleave(function(){
		var h_icon = $(this).find('img').height() / 2;
		$(this).find('img').stop(true, false).animate({
			'top' : '-' + h_icon + 'px'
		}, time, ease);
	});
}

/* --- standard icons resetting top (window resize) --- */
function reset_icons_anim(div)
{
	$(div).find('img').each(function(){
		var h_icon = $(this).height() / 2;
		$(this).css({
			'top' : '-' + h_icon + 'px'
		});
	});
}

/* --- page icons --- */
function icons_page_anim()
{
	// Vars
	var time = 250;
	var ease = 'easeOutQuart';

	// Mouseenter
	$('.page .link').mouseenter(function(){
		$(this).stop(true, false).animate({
			'background-position-y' : '0px'
		}, time, ease);
	});

	// Mouseleave
	$('.page .link').mouseleave(function(){
		var h_icon = $(this).height();

		$(this).stop(true, false).animate({
			'background-position-y' : '-' + h_icon + 'px'
		}, time, ease);
	});
}

/* END ICONS ANIMATION (SLIDE UP/DOWN) ------------------------------------------------------------------------------------ */

/* BEGIN SCROLL TO FUNCTION (MAIN NAVIGATION) ----------------------------------------------------------------------------- */
function goToByScroll(id)
{
	// Vars
	var time = 1000;
	var ease = 'easeOutQuad';

    // Remove "link" from the ID
	id = id.replace('link', '');

    // Scroll
    $('html, body').animate({
        scrollTop: $(id).offset().top - parseInt($(id).css('padding-top'))
	}, time, ease);
}
/* END SCROLL TO FUNCTION (MAIN NAVIGATION) ------------------------------------------------------------------------------- */

/* BEGIN OTHER FUNCTIONS -------------------------------------------------------------------------------------------------- */

/* --- Show div --- */
function show_div(div)
{
	// Vars
	var speed = 500;
	var ease = 'easeOutQuart';

	$('#' + div).fadeIn(speed, ease);

	$("body").css("overflow-y", "hidden");
}

/* --- Hide div --- */
function hide_div()
{
	// Vars
	var speed = 500;
	var ease = 'easeOutQuart';

	$('.hidden_content').fadeOut(speed, ease);

	$("body").css("overflow-y", "scroll");
}
/* END OTHER FUNCTIONS -------------------------------------------------------------------------------------------------- */
