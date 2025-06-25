(function ($, Drupal) {
  Drupal.behaviors.sTheme = {
    attach: function (context, settings) {
      // Mobile navigation toggle
      $('.nav-toggle', context).once('navToggle').click(function() {
        $('nav ul').toggleClass('open');
        $(this).html($(this).text() === '☰' ? '✕' : '☰');
      });
      
      // Smooth scrolling for anchor links
      $('a[href^="#"]').once('smoothScroll').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 80
          }, 800);
        }
      });
      
      // Card hover effect enhancement
      $('.card').once('cardHover').hover(
        function() {
          $(this).css('z-index', '10');
        },
        function() {
          $(this).css('z-index', '1');
        }
      );
      
      // Get Involved button animation
      $('.get-involved').once('btnAnimation').click(function() {
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => {
          $(this).css('transform', 'scale(1)');
          // Scroll to activities section
          $('html, body').animate({
            scrollTop: $('.activities').offset().top - 100
          }, 600);
        }, 200);
      });
    }
  };
})(jQuery, Drupal);