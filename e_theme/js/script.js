(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.eTheme = {
    attach: function (context, settings) {
      // Fixed header solution - now applies to entire header container
      once('stickyHeader', '.header-container', context).forEach(function (headerContainer) {
        const headerHeight = headerContainer.offsetHeight;
        const headerOffset = 200;
        
        window.addEventListener('scroll', function() {
          if (window.scrollY > headerOffset) {
            headerContainer.classList.add('sticky-header');
            document.body.style.paddingTop = headerHeight + 'px';
          } else {
            headerContainer.classList.remove('sticky-header');
            document.body.style.paddingTop = '0';
          }
          highlightActiveNavLink();
        });
      });

      // Mobile navigation toggle
      once('navToggle', '.nav-toggle', context).forEach(function (toggle) {
        const navMenu = document.querySelector('nav ul');
        toggle.addEventListener('click', function() {
          navMenu.classList.toggle('open');
          this.textContent = this.textContent === '☰' ? '✕' : '☰';
          document.body.classList.toggle('nav-open');
        });
      });

      // Smooth scrolling for anchor links
      once('smoothScroll', 'a[href^="#"]', context).forEach(function (anchor) {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerOffset = document.querySelector('.header-container').offsetHeight + 20;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

      // Get Involved button with ripple effect
      once('getInvolved', '.get-involved', context).forEach(function (button) {
        button.addEventListener('click', function(e) {
          // Create ripple effect
          createRipple(e);
          
          // Button animation
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = '';
            
            // Scroll to activities section
            const activities = document.querySelector('.activities');
            const headerOffset = document.querySelector('.header-container').offsetHeight + 20;
            const targetPosition = activities.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 300);
        });
      });

      // Form submissions
      once('newsletterForm', '#newsletter-form', context).forEach(function (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          setTimeout(() => {
            showToast(Drupal.t('Thank you for subscribing!'));
            this.reset();
          }, 500);
        });
      });

      once('contactForm', '#contactForm', context).forEach(function (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          setTimeout(() => {
            showToast(Drupal.t('Your message has been sent successfully!'));
            this.reset();
          }, 500);
        });
      });

      // Helper function: Create ripple effect
      function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) ripple.remove();
        
        button.appendChild(circle);
      }

      // Helper function: Highlight active nav link
      function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section, .section-title');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      }

      // Helper function: Show toast notification
      function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
            toast.remove();
          }, 300);
        }, 3000);
      }
    }
  };
})(Drupal, once);