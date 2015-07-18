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

	/*$(window).scroll(function () {
	  var currentDiv;
	  $('section.section').each(function () {
	    var div = $(this);
	    if (div.position().top - $(window).scrollTop() <= 0) {
	      currentDiv = div;
	    }
	  });
	  var activeDivId = $('ul.navigation li.active').attr('id').substring(3);
	  if (currentDiv && currentDiv.attr('id') !== activeDivId) {
	    $('ul.navigation li').removeClass('active');
	    var liQuery = 'ul.navigation li#li-' + currentDiv.attr('id');
	    var li = $(liQuery);
	    li.addClass('active');
	    var id = currentDiv.attr('id');
	    currentDiv.removeAttr('id');
	    location.hash = id;
	    currentDiv.attr('id', id);
	    ga('send', 'event', 'navigation', id);
	  }

	  if ($(window).scrollTop() + $(window).height() === $(document).height()) {
	    $('ul.navigation li').removeClass('active');
	    var li = $('ul.navigation li#li-contact');
	    li.addClass('active');
	    var contact = $('#contact');
	    contact.removeAttr('id');
	    location.hash = 'contact';
	    contact.attr('id', 'contact');
	    ga('send', 'event', 'navigation', 'contact');
	  }
	});
  */

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
