 document.addEventListener('DOMContentLoaded', function() {
            // Enhanced JavaScript implementation with modern features
            
            // Set current year in footer
            document.getElementById('current-year').textContent = new Date().getFullYear();
            
            // Enhanced sticky header with scroll detection
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const headerOffset = 200;
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > headerOffset) {
                    header.classList.add('sticky-header');
                    document.body.style.paddingTop = headerHeight + 'px';
                } else {
                    header.classList.remove('sticky-header');
                    document.body.style.paddingTop = '0';
                }
                
                // Highlight active nav link based on scroll position
                highlightActiveNavLink();
            });
            
            // Mobile navigation toggle
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('nav ul');
            
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('open');
                navToggle.textContent = navToggle.textContent === '☰' ? '✕' : '☰';
                document.body.classList.toggle('nav-open');
            });
            
            // Enhanced smooth scrolling with offset for sticky header
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('header').offsetHeight + 20;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (navMenu.classList.contains('open')) {
                            navMenu.classList.remove('open');
                            navToggle.textContent = '☰';
                            document.body.classList.remove('nav-open');
                        }
                    }
                });
            });
            
            // Enhanced card hover effects
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px)';
                    this.querySelector('.card-header').style.background = 'linear-gradient(to right, var(--accent), #0a7d48)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.querySelector('.card-header').style.background = 'linear-gradient(to right, var(--primary), #3a86ff)';
                });
            });
            
            // Get Involved button with ripple effect
            const getInvolvedBtn = document.querySelector('.get-involved');
            getInvolvedBtn.addEventListener('click', function(e) {
                // Create ripple effect
                createRipple(e);
                
                // Button animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    
                    // Scroll to activities section
                    const activities = document.querySelector('.activities');
                    const headerOffset = document.querySelector('header').offsetHeight + 20;
                    const targetPosition = activities.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            });
            
            // Hero text animation with Intersection Observer
            const heroText = document.querySelector('.hero-text');
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
            
            // Activity item hover effects
            const activityItems = document.querySelectorAll('.activities ul li a');
            activityItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(8px)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                });
            });
            
            // Newsletter form submission
            const newsletterForm = document.getElementById('newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    
                    // Simulate form submission
                    setTimeout(() => {
                        showToast('Thank you for subscribing!');
                        this.reset();
                    }, 500);
                });
            }
            
            // Contact form submission
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simulate form submission
                    setTimeout(() => {
                        showToast('Your message has been sent successfully!');
                        this.reset();
                    }, 500);
                });
            }
            
            // Testimonial slider
            const testimonials = document.querySelectorAll('.testimonial');
            let currentTestimonial = 0;
            
            if (testimonials.length > 1) {
                setInterval(() => {
                    testimonials[currentTestimonial].classList.remove('active');
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                    testimonials[currentTestimonial].classList.add('active');
                }, 5000);
            }
            
            // Scroll animation for feature cards
            const featureCards = document.querySelectorAll('.feature-card');
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, index * 200);
                        featureObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            featureCards.forEach(card => {
                featureObserver.observe(card);
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
                    if (scrollY >= sectionTop - 200) {
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
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        });