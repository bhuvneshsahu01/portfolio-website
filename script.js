// ===================================
// SMOOTH SCROLLING & NAVIGATION
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // ===================================
    // THEME TOGGLE
    // ===================================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Optional: Show notification
        showNotification(`Switched to ${newTheme} mode`);
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ===================================
    // NAVBAR SCROLL EFFECTS
    // ===================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // ACTIVE SECTION HIGHLIGHTING
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===================================
    // HAMBURGER MENU
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards, skill categories, education cards, etc.
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .education-card, .timeline-item, .stat-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ===================================
    // DYNAMIC GRADIENT BACKGROUND
    // ===================================
    const gradientOrbs = document.querySelectorAll('.gradient-orb');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        gradientOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = mouseX * speed;
            const y = mouseY * speed;

            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ===================================
    // TYPING EFFECT FOR HERO SUBTITLE (Optional)
    // ===================================
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';

        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                subtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }

    // ===================================
    // PROJECT CARD TILT EFFECT
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // SKILL ITEM STAGGER ANIMATION
    // ===================================
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const skillItems = category.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-2px)';
                    item.style.background = 'rgba(99, 102, 241, 0.1)';
                    item.style.borderColor = 'var(--accent-primary)';
                    item.style.color = 'var(--accent-primary)';
                }, index * 30);
            });
        });

        category.addEventListener('mouseleave', () => {
            const skillItems = category.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.style.transform = 'translateY(0)';
                item.style.background = 'rgba(255, 255, 255, 0.03)';
                item.style.borderColor = 'var(--border-color)';
                item.style.color = 'var(--text-secondary)';
            });
        });
    });

    // ===================================
    // CURSOR TRAIL EFFECT (PREMIUM TOUCH)
    // ===================================
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    if (circles.length === 0) {
        // Create cursor circles dynamically
        const colors = [
            'rgba(99, 102, 241, 0.1)',
            'rgba(139, 92, 246, 0.08)',
            'rgba(236, 72, 153, 0.06)'
        ];

        for (let i = 0; i < 3; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: ${30 - i * 8}px;
                height: ${30 - i * 8}px;
                border-radius: 50%;
                background: ${colors[i]};
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.${i + 1}s ease-out;
                display: none;
            `;
            document.body.appendChild(circle);
        }
    }

    const cursorCircles = document.querySelectorAll('.cursor-circle');

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;

        cursorCircles.forEach((circle, index) => {
            circle.style.display = 'block';
            circle.style.transform = `translate(${coords.x - circle.offsetWidth / 2}px, ${coords.y - circle.offsetHeight / 2}px)`;
        });
    });

    // ===================================
    // PARALLAX EFFECT FOR SECTIONS
    // ===================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');

        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===================================
    // COPY EMAIL ON CLICK
    // ===================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.href.replace('mailto:', '');

            // Create temporary input to copy email
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // Show copied notification
            showNotification('Email copied to clipboard!');
        });
    });

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    function showNotification(message) {
        // Remove existing notification
        const existingNotif = document.querySelector('.notification');
        if (existingNotif) {
            existingNotif.remove();
        }

        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 1rem 2rem;
            background: var(--accent-gradient);
            color: white;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // LOADING ANIMATION
    // ===================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===================================
    // STATS COUNTER ANIMATION
    // ===================================
    const statItems = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statItems.forEach(stat => {
                    const finalValue = stat.textContent;

                    // Only animate if it's a number
                    if (!isNaN(parseFloat(finalValue))) {
                        const numValue = parseFloat(finalValue);
                        let currentValue = 0;
                        const increment = numValue / 50;
                        const timer = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= numValue) {
                                stat.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                stat.textContent = currentValue.toFixed(numValue % 1 !== 0 ? 1 : 0);
                            }
                        }, 30);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about-stats');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    // ===================================
    // ENHANCED MOBILE MENU
    // ===================================
    if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.textContent = `
            .nav-links.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(10, 10, 15, 0.98);
                backdrop-filter: blur(20px);
                padding: 2rem;
                gap: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                animation: slideDown 0.3s ease-out;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(8px, 8px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
        `;
        document.head.appendChild(style);
    }

    console.log('🚀 Portfolio loaded successfully!');
});
