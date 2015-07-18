$(document).ready(function() {
	$('.slider').unslider({
		speed: 500, //  The speed to animate each slide (in milliseconds)
		delay: 3000, //  The delay between slide animations (in milliseconds)
		keys: false, //  Enable keyboard (left, right) arrow shortcuts
		dots: true, //  Display dot navigation
		fluid: true
	});

	window.sr = new scrollReveal();

	var mapCanvas = document.getElementById('map-canvas');
	var latLng = new google.maps.LatLng(35.724892, 51.386467);
	var mapOptions = {
		center: latLng,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false
	};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		title: 'دانشکده مهندسی برق و کامپیوتر'
	});

	var $body = $(document);
	$body.bind('scroll', function() {
		// "Disable" the horizontal scroll.
		if ($body.scrollLeft() !== 0) {
			$body.scrollLeft(0);
		}
	});

	$('.menu li a').click(function(e) {
		e.preventDefault();
		$('.menu li a').removeClass('active');
		$(this).addClass('active');
		var divId = $(this).attr('id').substring(2);
		var div = $('section.section#' + divId);
		if (div) {
			$('html, body').animate({
				scrollTop: div.position().top + 1
			}, 500); //Math.abs(div.position().top + 1 - $(window).scrollTop())
		}
	});

});
