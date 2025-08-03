// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1200);
    }
    
    // Navigation menu toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            if (navToggle.classList.contains('active')) {
                navToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                navToggle.querySelector('span:nth-child(2)').style.opacity = '0';
                navToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                navToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                navToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                navToggle.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                navToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                navToggle.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.querySelector('span:nth-child(1)').style.transform = 'none';
                    navToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                    navToggle.querySelector('span:nth-child(3)').style.transform = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Add 'scrolled' class to navbar when scrolling
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100; // Adjust for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call on page load
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formSubmitBtn = contactForm.querySelector('.form-submit');
            const originalBtnText = formSubmitBtn.innerHTML;
            
            formSubmitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
            formSubmitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                formSubmitBtn.innerHTML = '<span class="btn-text">Message Sent!</span> <span class="btn-icon"><i class="fas fa-check"></i></span>';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    formSubmitBtn.innerHTML = originalBtnText;
                    formSubmitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Add animation to elements when they enter viewport
    const animateElements = document.querySelectorAll('.skill-progress, .about-box, .project-card, .experience-card');
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    animateElements.forEach(element => {
        animateOnScroll.observe(element);
    });
    
    // Initialize skill bars with animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1s ease-in-out';
                    entry.target.style.width = width;
                }, 100);
                
                animateSkills.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        animateSkills.observe(bar);
    });
});
