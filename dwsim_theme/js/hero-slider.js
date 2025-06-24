(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.heroSlider = {
    attach: function (context, settings) {
      // Initialize Bootstrap Carousel
      $('#heroSlider').carousel({
        interval: 5000, // Rotate every 5 seconds
        pause: 'hover' // Pause on hover
      });

      // Optional: Add custom controls
      $('.carousel-control-prev').click(function() {
        $('#heroSlider').carousel('prev');
      });
      $('.carousel-control-next').click(function() {
        $('#heroSlider').carousel('next');
      });
    }
  };
})(jQuery, Drupal);