/* ========================================
   VitalCare — Patient Landing Page
   Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');

    // Mobile menu toggle
    if (hamburger && nav) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
            const isOpen = nav.classList.contains('open');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close menu on link click
        nav.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate submission
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                showFormMessage('Thank you, ' + name + '! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    function showFormMessage(text, type) {
        // Remove existing message
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message form-message--' + type;
        msg.textContent = text;
        msg.style.cssText = 'padding: 12px 16px; border-radius: 8px; font-size: 14px; margin-top: 12px; font-weight: 500;';

        if (type === 'success') {
            msg.style.background = '#E8F5F2';
            msg.style.color = '#0A7C6F';
            msg.style.border = '1px solid rgba(10, 124, 111, 0.2)';
        } else {
            msg.style.background = '#FEF2F2';
            msg.style.color = '#DC2626';
            msg.style.border = '1px solid rgba(220, 38, 38, 0.15)';
        }

        contactForm.appendChild(msg);

        // Auto-dismiss after 5 seconds
        setTimeout(function () {
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.3s';
            setTimeout(function () { msg.remove(); }, 300);
        }, 5000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Intersection Observer for fade-in animations
    const animateElements = document.querySelectorAll('.about-card, .service-card, .plan-card, .testimonial-card');

    if (animateElements.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        animateElements.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }

    // Sticky header shadow
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 20) {
                header.style.boxShadow = '0 1px 6px rgba(0, 0, 0, 0.06)';
            } else {
                header.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }
});