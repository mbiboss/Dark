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
        const navItems = document.querySelectorAll('.cyber-nav li[data-target]');
        const contents = document.querySelectorAll('.content');

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.dataset.target;
                
                // Click animation
                this.style.animation = 'clickEffect 0.3s';
                setTimeout(() => this.style.animation = '', 300);

                // Content switching
                contents.forEach(content => {
                    content.classList.remove('active');
                    if(content.id === target) {
                        content.classList.add('active');
                    }
                });
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

    // Matrix Rain Effect
    const initMatrixRain = () => {
        const canvas = document.getElementById('matrixRain');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const chars = "01";
        const fontSize = 18;
        let columns, drops;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        };

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        setInterval(draw, 33);
    };

    // Initialize all components
    initCursor();
    initThemeToggle();
    initNavigation();
    initButtonEffects();
    initTerminalTyping();
    initMatrixRain();
});

// Matrix Rain Effect
document.addEventListener('DOMContentLoaded', () => {
    const initMatrixRain = () => {
      const canvas = document.getElementById('matrixRain');
      if (!canvas) return;
  
      const ctx = canvas.getContext('2d');
      const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
      const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const nums = '0123456789';
      const alphabet = katakana + latin + nums;
      const fontSize = 16;
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return Math.floor(canvas.width / fontSize);
      };
  
      let columns = resizeCanvas();
      let rainDrops = Array(columns).fill(1);
  
      const drawMatrixRain = () => {
        ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;
  
        for (let i = 0; i < rainDrops.length; i++) {
          const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
          
          if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
          }
          rainDrops[i]++;
        }
      };
  
      window.addEventListener('resize', () => {
        columns = resizeCanvas();
        rainDrops = Array(columns).fill(1);
      });
  
      setInterval(drawMatrixRain, 30);
    };
  
    initMatrixRain();
  });