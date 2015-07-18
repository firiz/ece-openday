$(document).ready(function () {
  $(window).scroll(function () {
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

  $('ul.navigation li, a#aa-education').click(function (e) {
    e.preventDefault();
    var divId = $(this).attr('id').substring(3);
    if ($(this).attr('id') === 'aa-education' || $('ul.navigation').height() !== 50 || $('ul.navigation').hasClass('open')) {
      $('ul.navigation').removeClass('open');

      if (divId === 'contact') {
        $('html, body').animate({
          scrollTop: $(document).height()
        }, 500); //$(document).height() - $(window).scrollTop()
      } else {
        var div = $('section.section#' + divId);
        if (div) {
          $('html, body').animate({
            scrollTop: div.position().top + 1
          }, 500); //Math.abs(div.position().top + 1 - $(window).scrollTop())
        }
      }
    } else {
      $('ul.navigation').addClass('open');
    }
  });

  $('a.section-title-info-button').mouseenter(function (e) {
    var button = $(this);
    var infoWrapper = button.parent().parent().children('div.section-title-info-wrapper');
    button.addClass('open');
    infoWrapper.addClass('open');
  });

  $('a.section-title-info-button').mouseleave(function (e) {
    var button = $(this);
    var infoWrapper = button.parent().parent().children('div.section-title-info-wrapper');
    button.removeClass('open');
    infoWrapper.removeClass('open');
  });

  $('a.section-title-info-button').click(function (e) {
    e.preventDefault();
  });

  $('#contact-form').submit(function (e) {
    e.preventDefault();
    var button = $('#contact-form div.input-wrapper button');
    button.html('Sending...');
    button.attr('disabled', true);
    $.ajax({
      url: 'contact.php',
      type: 'post',
      data: $('#contact-form').serialize(),
      success: function (data) {
        $('#contact-form div.input-wrapper input').val('');
        $('#contact-form div.input-wrapper textarea').val('');
        button.html('Thanks!');
      },
      error: function () {
        button.html('Try again');
        button.attr('disabled', false);
      }
    });
  });

  $('div.button').click(function (e) {
    var button = $(this);
    var moreLis = button.parent().parent().children('li.more');
    if (button.children('p')[0].innerHTML === 'More...') {
      moreLis.css('display', 'block');
      button.children('p')[0].innerHTML = 'Less...';
    } else {
      moreLis.css('display', 'none');
      button.children('p')[0].innerHTML = 'More...';
    }
  });
});