// JavaScript for form handling, smooth scroll, EmailJS, animations


        // Initialize EmailJS when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize EmailJS - Replace 'YOUR_PUBLIC_KEY' with your actual public key
            if (typeof emailjs !== 'undefined') {
                emailjs.init("6q3Xz_LJuR1_exAtT"); // Replace with your EmailJS public key
            }
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                alert('EmailJS is not loaded. Please check your internet connection or contact me directly at lenkewarnikhil104@gmail.com');
                btn.innerHTML = originalText;
                btn.disabled = false;
                return;
            }

            // Get form data
            const formData = {
                from_name: this.querySelector('#name').value,
                from_email: this.querySelector('#email').value,
                subject: this.querySelector('#subject').value,
                message: this.querySelector('#message').value,
                to_name: 'Nikhil'
            };

            // EmailJS send function
            emailjs.send('service_ilyn8y2', 'template_xs8vdsi', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully! I\'ll get back to you soon😊');
                    document.getElementById('contact-form').reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Failed😥. Please try again or contact me directly at l.nikhil.codes@gmail.com');
                })
                .finally(function() {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        });

        // Floating tech icons click handlers
        document.querySelectorAll('.floating-tech').forEach(tech => {
            tech.addEventListener('click', function() {
                this.style.animationPlayState = this.style.animationPlayState === 'paused' ? 'running' : 'paused';
            });
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(15, 15, 35, 0.98)';
                nav.style.boxShadow = '0 4px 30px rgba(0, 212, 255, 0.2)';
            } else {
                nav.style.background = 'rgba(15, 15, 35, 0.95)';
                nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
            }
        });

        // Add animation to cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.experience-card, .project-card, .skill-category').forEach(card => {
            observer.observe(card);
        });
    