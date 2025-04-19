document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Custom Cursor
    const cursor = document.querySelector('.cursor');
    const hoverElements = document.querySelectorAll('a, button, .nav-links li, .skill-card, .project-card, .profile-card, .highlight-card');
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    
    // Play sound on hover
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-active');
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-active');
        });
    });

    // Play sound on click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
        clickSound.currentTime = 0;
        clickSound.volume = 0.1;
        clickSound.play();
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('lightMode', isLightMode);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        clickSound.currentTime = 0;
        clickSound.play();
        
        // Update animated background
        initAnimatedBackground();
    });

    // Check for saved theme preference
    if (localStorage.getItem('lightMode') === 'true') {
        document.body.classList.add('light-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Download CV
    const downloadBtn = document.querySelector('.download-cv');
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create visual feedback
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.width = '10px';
        pulse.style.height = '10px';
        pulse.style.borderRadius = '50%';
        pulse.style.background = 'var(--accent)';
        pulse.style.pointerEvents = 'none';
        pulse.style.transform = 'translate(-50%, -50%)';
        pulse.style.boxShadow = '0 0 15px var(--accent)';
        pulse.style.animation = 'pulse 0.5s ease-out forwards';
        
        // Position pulse at click location
        const rect = downloadBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        pulse.style.left = `${x}px`;
        pulse.style.top = `${y}px`;
        
        downloadBtn.appendChild(pulse);
        
        // Remove pulse after animation
        setTimeout(() => {
            pulse.remove();
        }, 500);
        
        // Simulate download
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'DARK_SECURITY_ARCHITECT_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 300);
        
        clickSound.currentTime = 0;
        clickSound.play();
    });

    // Navigation
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            // Scroll to top of content
            document.querySelector('.glass-box').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.cyber-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animated Background
    const initAnimatedBackground = () => {
        const canvas = document.getElementById('animatedBackground');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = Math.floor(window.innerWidth / 10);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random() * 0.05 + 0.01;
                this.color = document.body.classList.contains('light-mode') ? 
                    'rgba(10, 25, 47, 0.1)' : 'rgba(100, 255, 218, 0.1)';
            }
            
            update() {
                this.y += this.speed;
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        };
        
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    };

    // Time Display
    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('current-time').textContent = 
            `${hours}:${minutes}:${seconds} UTC`;
        
        setTimeout(updateTime, 1000);
    };
    updateTime();

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create submission effect
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> ENCRYPTING...';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>ESTABLISH CONNECTION</span>';
            }, 2000);
        }, 1500);
        
        clickSound.currentTime = 0;
        clickSound.play();
    });

    // Initialize effects
    initAnimatedBackground();
});
