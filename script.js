// script.js
// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    
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

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // Navigation
    const navItems = document.querySelectorAll('.cyber-nav li');
    const contents = document.querySelectorAll('.content');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Add animation to clicked item
            this.style.animation = 'clickEffect 0.3s';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);

            // Switch content
            contents.forEach(content => {
                content.classList.remove('active');
                if(content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Button Hover Effect
    document.querySelectorAll('.cyber-button').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });
});