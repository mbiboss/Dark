document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const initCursor = () => {
        const cursor = document.querySelector('.cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });

        // Interactive elements cursor effect
        const interactiveElements = document.querySelectorAll('a, button, .cyber-nav li, .skill-item, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    };

    // Theme Toggle
    const initThemeToggle = () => {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    };

    // Navigation System
    const initNavigation = () => {
        const navItems = document.querySelectorAll('.cyber-nav li[data-section]');
        const contents = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all
                navItems.forEach(nav => nav.classList.remove('active'));
                contents.forEach(sec => sec.classList.remove('active'));
                
                // Add active class to clicked
                item.classList.add('active');
                const sectionId = item.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
            });
        });
    };

    // Button Effects
    const initButtonEffects = () => {
        document.querySelectorAll('.cyber-button').forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                this.style.setProperty('--x', `${e.clientX - rect.left}px`);
                this.style.setProperty('--y', `${e.clientY - rect.top}px`);
            });
        });
    };

    // Terminal Typing Effect
    const initTerminalTyping = () => {
        document.querySelectorAll('.cyber-text').forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    el.textContent += text.charAt(i++);
                } else {
                    clearInterval(typing);
                    el.innerHTML += '<span class="blinking-cursor">_</span>';
                }
            }, 100);
        });
    };

    // Matrix Rain Effect (Enhanced Version)
    const initMatrixRain = () => {
        const canvas = document.getElementById('matrixRain');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;
        const fontSize = 16;
        let columns, rainDrops;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            rainDrops = Array(columns).fill(1);
        };

        const drawMatrixRain = () => {
            // More transparent background for better visibility of other elements
            ctx.fillStyle = 'rgba(5, 5, 8, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Classic matrix green with slight variation
            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                // Random character from the combined set
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                // Reset drop to top when it reaches bottom with random chance
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        // Handle window resize
        window.addEventListener('resize', () => {
            columns = resizeCanvas();
            rainDrops = Array(columns).fill(1);
        });

        // Initialize and start animation
        resizeCanvas();
        
        // Use requestAnimationFrame for smoother animation
        let lastTime = 0;
        const frameRate = 30; // frames per second
        const interval = 1000 / frameRate;
        
        const animate = (timestamp) => {
            if (timestamp - lastTime > interval) {
                drawMatrixRain();
                lastTime = timestamp;
            }
            requestAnimationFrame(animate);
        };
        
        animate();
    };

    // Initialize all components
    initCursor();
    initThemeToggle();
    initNavigation();
    initButtonEffects();
    initTerminalTyping();
    initMatrixRain();
});