// Dark - Personal Website Script
// Minimalist navigation and interactions

class DarkWebsite {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.pageContent = document.getElementById('page-content');
        this.loadingOverlay = document.querySelector('.loading-overlay');
        
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupCursor();
        this.setupNavigation();
        this.loadPage('home');
        this.hideLoadingOverlay();
    }

    setupCursor() {
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        let trail = [];
        let particles = [];

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
            
            // Add to trail
            this.addTrailPoint(mouseX, mouseY);
            
            // Create particles occasionally
            if (Math.random() < 0.1) {
                this.createParticle(mouseX, mouseY);
            }
        });

        // Smooth follower animation
        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            this.cursorFollower.style.left = followerX + 'px';
            this.cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-item, input, textarea');
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .project-item, input, textarea')) {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('a, button, .project-item, input, textarea')) {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            }
        });
    }

    addTrailPoint(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        // Remove trail point after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
        particle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                
                if (page !== this.currentPage && !this.isLoading) {
                    this.navigateToPage(page);
                    this.updateActiveNav(link);
                }
            });
        });

        // Form submission
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('contact-form')) {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            }
        });

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }

        // Social media interactions
        this.setupSocialMedia();
        
        // CTA button functionality
        this.setupCTAButton();
    }

    async navigateToPage(page) {
        this.isLoading = true;
        this.showLoading();
        
        // Exit animation
        this.pageContent.classList.add('page-exit');
        
        await this.delay(600);
        
        // Scroll to top immediately before loading new content
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Load new page content
        await this.loadPage(page);
        
        // Ensure scroll to top again after content loads
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }, 50);
        
        // Enter animation
        this.pageContent.classList.remove('page-exit');
        this.pageContent.classList.add('page-enter');
        
        this.hideLoading();
        this.currentPage = page;
        this.isLoading = false;
        
        // Remove enter class after animation
        setTimeout(() => {
            this.pageContent.classList.remove('page-enter');
        }, 600);
    }

    async loadPage(page) {
        try {
            const response = await fetch(`${page}.html`);
            const html = await response.text();
            this.pageContent.innerHTML = html;
            this.pageContent.classList.add('active');
            
            // Initialize page-specific functionality
            this.initializePageFeatures(page);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.pageContent.innerHTML = '<div class="error">Page could not be loaded</div>';
        }
    }

    initializePageFeatures(page) {
        // Enable scrolling for all pages
        document.body.classList.add('allow-scroll');
        
        // Force scroll to top when initializing any page
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        switch(page) {
            case 'home':
                this.initTypewriter();
                break;
            case 'about':
                this.initPoeticText();
                break;
            case 'projects':
                this.initProjectHovers();
                break;
            case 'contact':
                this.initContactForm();
                this.initPoeticText();
                break;
        }
    }

    initPoeticText() {
        // Enhanced text splitting for poetic animations
        const poeticElements = document.querySelectorAll('.main-quote, .signature p, .fade-in-text');
        
        poeticElements.forEach(element => {
            if (!element.querySelector('.letter')) {
                const splitter = new TextSplitter(element);
                splitter.addPoeticHoverEffect();
            }
        });

        // Add dissolve effect on page transitions
        const quotes = document.querySelectorAll('.main-quote');
        quotes.forEach(quote => {
            quote.addEventListener('click', () => {
                quote.classList.add('text-dissolve');
                setTimeout(() => {
                    quote.classList.remove('text-dissolve');
                }, 800);
            });
        });
    }

    initTypewriter() {
        // Typewriter effect is handled by CSS animation
        // Initialize animated counters
        this.initAnimatedCounters();
    }

    initAnimatedCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
            
            // Start animation after a delay
            setTimeout(() => {
                // Reset and start
                current = 0;
                counter.textContent = '0';
            }, 5000);
        });
    }

    initProjectHovers() {
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.createGlowEffect(item);
            });
        });
        
        // Initialize project filters
        this.initProjectFilters();
    }

    initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'flex';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    createGlowEffect(element) {
        // Subtle background glow on hover
        element.style.background = 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.05), transparent)';
        element.style.transition = 'background 0.5s ease';
        
        element.addEventListener('mouseleave', () => {
            element.style.background = 'transparent';
        }, { once: true });
    }

    initContactForm() {
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.querySelector('label').style.color = 'var(--accent-gold)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.querySelector('label').style.color = 'var(--soft-grey)';
                }
            });
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show submission feedback
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'sent to the void';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
        
        console.log('Form submitted:', data);
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    showLoading() {
        this.loadingOverlay.classList.remove('hidden');
    }

    hideLoading() {
        setTimeout(() => {
            this.loadingOverlay.classList.add('hidden');
        }, 300);
    }

    hideLoadingOverlay() {
        setTimeout(() => {
            this.loadingOverlay.classList.add('hidden');
        }, 1000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = isLight ? '☀' : '◐';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const themeIcon = document.querySelector('.theme-icon');
            if (themeIcon) themeIcon.textContent = '☀';
        }
    }

    setupSocialMedia() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.getAttribute('data-platform');
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 100;
                `;
                
                // Add ripple animation to CSS if not exists
                if (!document.querySelector('#ripple-style')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-style';
                    style.textContent = `
                        @keyframes ripple {
                            to {
                                transform: translate(-50%, -50%) scale(1);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                link.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
                
                // Show platform message
                this.showPlatformMessage(platform);
            });
        });
    }

    showPlatformMessage(platform) {
        const messages = {
            youtube: 'Subscribe for creative coding tutorials and digital art!',
            discord: 'Join our community of digital artists and creators.',
            facebook: 'Follow for design inspiration and project updates.',
            tiktok: 'Quick design tips and creative process videos.',
            github: 'Explore the code behind the magic.'
        };
        
        // Create message overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: var(--accent-gold);
            padding: 30px 40px;
            border-radius: 12px;
            border: 1px solid var(--accent-gold);
            text-align: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            max-width: 300px;
        `;
        
        overlay.innerHTML = `
            <h3 style="margin: 0 0 15px 0; font-family: var(--serif-font);">${platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
            <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">${messages[platform]}</p>
            <button onclick="this.parentElement.remove()" style="
                background: transparent;
                border: 1px solid var(--accent-gold);
                color: var(--accent-gold);
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 12px;
                letter-spacing: 1px;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='var(--accent-gold)'; this.style.color='black';" 
               onmouseout="this.style.background='transparent'; this.style.color='var(--accent-gold)';">Close</button>
        `;
        
        document.body.appendChild(overlay);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (overlay.parentElement) {
                overlay.remove();
            }
        }, 4000);
    }

    setupCTAButton() {
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.navigateToPage('contact');
            });
        }
    }
}

// Text splitting effect for poetic hover animations
class TextSplitter {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.splitText();
    }

    splitText() {
        const words = this.originalText.split(' ');
        this.element.innerHTML = '';
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.transition = 'all 0.3s ease';
            
            const letters = word.split('');
            letters.forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'letter';
                letterSpan.textContent = letter;
                letterSpan.style.display = 'inline-block';
                letterSpan.style.transition = `all 0.3s ease ${letterIndex * 0.05}s`;
                wordSpan.appendChild(letterSpan);
            });
            
            this.element.appendChild(wordSpan);
            
            if (index < words.length - 1) {
                this.element.appendChild(document.createTextNode(' '));
            }
        });
    }

    addHoverEffect() {
        this.element.addEventListener('mouseenter', () => {
            const letters = this.element.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(-5px)';
                    letter.style.color = 'var(--accent-gold)';
                }, index * 50);
            });
        });

        this.element.addEventListener('mouseleave', () => {
            const letters = this.element.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(0)';
                    letter.style.color = '';
                }, index * 30);
            });
        });
    }

    addPoeticHoverEffect() {
        this.element.addEventListener('mouseenter', () => {
            const letters = this.element.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(-3px) scale(1.1)';
                    letter.style.color = 'var(--accent-gold)';
                    letter.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
                }, index * 30);
            });
        });

        this.element.addEventListener('mouseleave', () => {
            const letters = this.element.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(0) scale(1)';
                    letter.style.color = '';
                    letter.style.textShadow = '';
                }, index * 20);
            });
        });

        // Individual letter hover effects
        const letters = this.element.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.addEventListener('mouseenter', () => {
                letter.style.transform = 'translateY(-5px) scale(1.2)';
                letter.style.color = 'var(--accent-gold)';
                letter.style.textShadow = '0 0 15px rgba(212, 175, 55, 0.8)';
            });
        });
    }
}

// Allow scrolling on all pages now
// Removed scroll prevention to enable scrolling everywhere

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    const website = new DarkWebsite();
    
    // Add text splitting effects to specific elements
    setTimeout(() => {
        const quotesElements = document.querySelectorAll('.main-quote, .signature p');
        quotesElements.forEach(element => {
            const splitter = new TextSplitter(element);
            splitter.addHoverEffect();
        });
    }, 1000);
});

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}
