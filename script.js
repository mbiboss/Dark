// Global variables
let currentPage = 'home';
let isTransitioning = false;
let particles = [];
let canvas, ctx;
let mouse = { x: 0, y: 0 };
let theme = localStorage.getItem('theme') || 'dark';
let cursorTrails = [];
let customCursor;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Console Easter Egg
    console.log(`
    🌟 Welcome to the Dark Portfolio! 🌟
    
    Created with passion and vanilla JavaScript
    
    ██████╗  █████╗ ██████╗ ██╗  ██╗
    ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝
    ██║  ██║███████║██████╔╝█████╔╝ 
    ██║  ██║██╔══██║██╔══██╗██╔═██╗ 
    ██████╔╝██║  ██║██║  ██║██║  ██╗
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
    
    "stories in silence..."
    `);
    
    initializeApp();
});

// Initialize application
function initializeApp() {
    // Set initial theme
    setTheme(theme);
    
    // Initialize particles
    initParticles();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Load initial page
    loadPage('home');
    
    // Handle loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('hidden');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 3500);
}

// Particle System
function initParticles() {
    canvas = document.getElementById('particle-canvas');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Start animation
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += dx * force * 0.01;
            particle.vy += dy * force * 0.01;
        }
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? 
            `rgba(255, 255, 255, ${particle.opacity})` : 
            `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();
        
        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = theme === 'dark' ? 
                        `rgba(255, 255, 255, ${0.1 * (1 - distance / 80)})` : 
                        `rgba(0, 0, 0, ${0.1 * (1 - distance / 80)})`;
                    ctx.stroke();
                }
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

// Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isTransitioning) return;
            
            const page = this.dataset.page;
            if (page === currentPage) return;
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Load page
            loadPage(page);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            loadPage(e.state.page, false);
        }
    });
}

// Page Loading System
async function loadPage(page, pushState = true) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Show transition overlay
    const transition = document.getElementById('page-transition');
    transition.classList.add('active');
    
    try {
        // Load page content
        const response = await fetch(`${page}.html`);
        const html = await response.text();
        
        // Wait for transition
        setTimeout(() => {
            // Update content
            document.getElementById('main-content').innerHTML = html;
            
            // Scroll to top of page
            window.scrollTo(0, 0);
            
            // Update URL
            if (pushState) {
                history.pushState({ page }, '', `#${page}`);
            }
            
            // Update current page
            currentPage = page;
            
            // Initialize page-specific functionality
            initPageSpecificFeatures(page);
            
            // Re-initialize cursor hover effects for new elements
            if (customCursor) {
                initCursorHoverEffects();
            }
            
            // Hide transition overlay
            setTimeout(() => {
                transition.classList.remove('active');
                isTransitioning = false;
            }, 300);
        }, 300);
        
    } catch (error) {
        console.error('Error loading page:', error);
        isTransitioning = false;
        transition.classList.remove('active');
    }
}

// Page-specific features
function initPageSpecificFeatures(page) {
    switch (page) {
        case 'home':
            initTypewriter();
            break;
        case 'about':
            initSkillBars();
            break;
        case 'projects':
            initProjectFilters();
            break;
        case 'contact':
            initContactForm();
            break;
    }
}

// Typewriter animation
function initTypewriter() {
    const titleElement = document.getElementById('typewriter-title');
    if (!titleElement) return;
    
    const text = 'dark.';
    let index = 0;
    
    titleElement.textContent = '';
    
    function type() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        }
    }
    
    setTimeout(type, 500);
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animationDelay = `${index * 0.1}s`;
                    }, index * 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        let isValid = true;
        const errors = {};
        
        if (!data.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }
        
        if (!data.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email';
            isValid = false;
        }
        
        if (!data.subject.trim()) {
            errors.subject = 'Subject is required';
            isValid = false;
        }
        
        if (!data.message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        }
        
        // Show errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.style.display = 'block';
            }
        });
        
        // Clear previous errors
        ['name', 'email', 'subject', 'message'].forEach(field => {
            if (!errors[field]) {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            }
        });
        
        if (isValid) {
            // Create ripple effect
            const btn = form.querySelector('.submit-btn');
            createRipple(e, btn);
            
            // Submit to database
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            try {
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                
                if (response.ok) {
                    btn.textContent = 'Message Sent!';
                    form.reset();
                    
                    // Clear any previous errors
                    ['name', 'email', 'subject', 'message'].forEach(field => {
                        const errorElement = document.getElementById(`${field}-error`);
                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    });
                } else {
                    btn.textContent = 'Error - Try Again';
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                btn.textContent = 'Error - Try Again';
            }
            
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.disabled = false;
            }, 2000);
        }
    });
}

// Mouse detection utility
function hasMouseSupport() {
    // Check if device supports mouse input
    return window.matchMedia('(any-hover: hover)').matches || 
           window.matchMedia('(pointer: fine)').matches ||
           navigator.maxTouchPoints === 0;
}

// Utility functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('btn-ripple');
    
    const ripple = element.querySelector('.btn-ripple');
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
}

// Theme System
function initThemeToggle() {
    const themeButton = document.getElementById('theme-button');
    
    // Load theme from database on startup
    loadThemeFromDatabase();
    
    // Set initial button state
    updateThemeButton();
    
    themeButton.addEventListener('click', function(e) {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Add ripple effect
        createRipple(e, this);
        
        // Add switching animation
        this.classList.add('switching');
        
        setTimeout(() => {
            setTheme(newTheme);
            saveThemeToDatabase(newTheme);
            updateThemeButton();
            this.classList.remove('switching');
        }, 150);
    });
}

function updateThemeButton() {
    const themeButton = document.getElementById('theme-button');
    if (themeButton) {
        if (theme === 'light') {
            themeButton.classList.add('light-mode');
            // Font Awesome sun icon will be handled by CSS
        } else {
            themeButton.classList.remove('light-mode');
            // Font Awesome moon icon will be handled by CSS
        }
    }
}

function setTheme(newTheme) {
    document.documentElement.setAttribute('data-theme', newTheme);
    theme = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeButton();
}

// Database integration for theme
async function loadThemeFromDatabase() {
    try {
        const response = await fetch('/api/theme');
        if (response.ok) {
            const data = await response.json();
            const savedTheme = data.theme || 'dark';
            setTheme(savedTheme);
            
            // Update button state
            updateThemeButton();
        }
    } catch (error) {
        console.log('Using localStorage theme fallback:', error);
        // Fallback to localStorage if API is not available
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }
}

async function saveThemeToDatabase(theme) {
    try {
        await fetch('/api/theme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theme }),
        });
    } catch (error) {
        console.log('Theme saved to localStorage only:', error);
        // Fallback to localStorage if API is not available
        localStorage.setItem('theme', theme);
    }
}

// Custom Cursor System
function initCustomCursor() {
    // Only initialize on desktop devices and when mouse is available
    if (window.innerWidth <= 768 || !hasMouseSupport()) return;
    
    // Create custom cursor element
    customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Update cursor position
        customCursor.style.left = e.clientX - 10 + 'px';
        customCursor.style.top = e.clientY - 10 + 'px';
        
        // Create trailing particles
        createCursorTrail(e.clientX, e.clientY);
    });
    
    // Add hover effects for interactive elements
    initCursorHoverEffects();
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        customCursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        customCursor.style.opacity = '1';
    });
    
    // Start cursor trail animation
    animateCursorTrails();
}

function createCursorTrail(x, y) {
    if (cursorTrails.length > 8) {
        const oldTrail = cursorTrails.shift();
        if (oldTrail.element && oldTrail.element.parentNode) {
            oldTrail.element.parentNode.removeChild(oldTrail.element);
        }
    }
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x - 3 + 'px';
    trail.style.top = y - 3 + 'px';
    document.body.appendChild(trail);
    
    cursorTrails.push({
        element: trail,
        x: x,
        y: y,
        opacity: 0.7,
        life: 30
    });
}

function animateCursorTrails() {
    cursorTrails.forEach((trail, index) => {
        if (trail.element && trail.element.parentNode) {
            trail.life--;
            trail.opacity -= 0.02;
            
            if (trail.life <= 0 || trail.opacity <= 0) {
                trail.element.parentNode.removeChild(trail.element);
                cursorTrails.splice(index, 1);
            } else {
                trail.element.style.opacity = trail.opacity;
                trail.element.style.transform = `scale(${trail.opacity})`;
            }
        }
    });
    
    requestAnimationFrame(animateCursorTrails);
}

function initCursorHoverEffects() {
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .social-link, .project-card, .filter-btn, .hire-btn, .submit-btn, .skill-item, .timeline-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (customCursor) {
                customCursor.classList.add('hover');
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (customCursor) {
                customCursor.classList.remove('hover');
            }
        });
    });
}

// Smooth scrolling utility
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that need animation
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Enhanced mobile menu toggle with better UX
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        // Create overlay for better UX
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Toggle menu function
        function toggleMenu(show) {
            if (show) {
                navMenu.classList.add('active');
                mobileMenuBtn.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            } else {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            }
        }
        
        // Menu button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navMenu.classList.contains('active');
            toggleMenu(!isActive);
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                toggleMenu(false);
            });
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            toggleMenu(false);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                toggleMenu(false);
            }
        });
    }
}

// Navigation helper function
function navigateToContact() {
    const contactLink = document.querySelector('.nav-link[data-page="contact"]');
    if (contactLink) {
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        contactLink.classList.add('active');
        
        // Load contact page
        loadPage('contact');
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could implement error reporting here
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could implement error reporting here
});
