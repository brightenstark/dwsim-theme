(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.dThemeAnimations = {
    attach: function (context, settings) {
      // Hero text animation with Intersection Observer
      once('heroAnimation', '.hero-text', context).forEach(function (heroText) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              heroText.style.opacity = '1';
              heroText.style.transform = 'translateY(0)';
              observer.unobserve(heroText);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(heroText);
      });

      // Card hover effects
      once('cardHover', '.card', context).forEach(function (card) {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-15px)';
          this.querySelector('.card-header').style.background = 'linear-gradient(to right, var(--accent), #0a7d48)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = '';
          this.querySelector('.card-header').style.background = 'linear-gradient(to right, var(--primary), #3a86ff)';
        });
      });

      // Activity item hover effects
      once('activityHover', '.activities ul li a', context).forEach(function (item) {
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = '';
        });
      });

      // Scroll animation for feature cards
      once('featureCards', '.feature-card', context).forEach(function (card, index) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('animate-in');
              }, index * 200);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(card);
      });

      // Testimonial slider
      once('testimonialSlider', '.testimonials-slider', context).forEach(function (slider) {
        const testimonials = slider.querySelectorAll('.testimonial');
        if (testimonials.length > 1) {
          let currentTestimonial = 0;
          testimonials[currentTestimonial].classList.add('active');
          
          setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
          }, 5000);
        }
      });
    }
  };
})(Drupal, once);