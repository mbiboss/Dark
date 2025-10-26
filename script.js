'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// Custom Cursor Implementation
// Only activate on physical mouse presence, not touch devices

const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
let hasPhysicalMouse = false;
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;
const speed = 0.18;

const cursorTrails = [];
const maxTrails = 15;

// Detect touch device
const isTouchDevice = () => {
  return ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0) || 
         (navigator.msMaxTouchPoints > 0);
};

// Create ripple effect
function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'cursor-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);

  setTimeout(() => ripple.remove(), 800);
}

// Create cursor trail
function createTrailParticle(x, y) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = x + 'px';
  trail.style.top = y + 'px';
  document.body.appendChild(trail);

  cursorTrails.push(trail);

  if (cursorTrails.length > maxTrails) {
    const oldTrail = cursorTrails.shift();
    if (oldTrail && oldTrail.parentNode) {
      oldTrail.remove();
    }
  }

  setTimeout(() => {
    if (trail.parentNode) trail.remove();
  }, 600);
}

// Initialize custom cursor after DOM is ready
function initCustomCursor() {
  // Only initialize cursor if not a touch device and cursor element exists
  if (!isTouchDevice() && cursor && cursorDot && cursorOutline) {
    // Activate cursor immediately on desktop
    document.body.classList.add('has-mouse');
    hasPhysicalMouse = true;

    let trailCounter = 0;

    document.addEventListener('mousemove', (e) => {
      // Update mouse position
      mouseX = e.pageX;
      mouseY = e.pageY;

      // Update cursor container position
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';

      // Create trail effect
      trailCounter++;
      if (trailCounter % 2 === 0) {
        createTrailParticle(mouseX, mouseY);
      }
    }, { passive: true });

    // Click animation with ripple
    document.addEventListener('mousedown', (e) => {
      cursor.classList.add('click');
      createRipple(e.pageX, e.pageY);
    }, { passive: true });

    document.addEventListener('mouseup', () => {
      cursor.classList.remove('click');
    }, { passive: true });

    // Initialize hover effects with event delegation
    initCursorHoverEffects();
  } else if (isTouchDevice()) {
    // Ensure cursor stays hidden on touch devices
    document.addEventListener('touchstart', () => {
      hasPhysicalMouse = false;
      document.body.classList.remove('has-mouse');
    }, { once: true, passive: true });
  }
}

// Wait for DOM to be ready before initializing cursor
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
  initCustomCursor();
}

// Typing animation for About section
const typingTexts = [
  'Creator & Developer',
  'Storyteller & Filmmaker',
  'Innovator & Thinker',
  'Digital Artist',
  'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing animation when About page is active
setTimeout(() => {
  if (document.querySelector('.about.active')) {
    typeEffect();
  }
}, 1000);

// Initialize cursor hover effects with event delegation
function initCursorHoverEffects() {
  if (!cursor) return;

  // Use event delegation for better performance and dynamic content
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(
      'a, button, input, textarea, select, ' +
      '.service-item, .project-item, .testimonials-item, ' +
      '.cv-btn-nav, .theme-btn, .navbar-link, ' +
      '.info_more-btn, .social-link, .contact-link, ' +
      '.filter-item button, .modal-close-btn, ' +
      '.project-item > a, .project-img'
    );

    if (target && hasPhysicalMouse) {
      cursor.classList.add('hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(
      'a, button, input, textarea, select, ' +
      '.service-item, .project-item, .testimonials-item, ' +
      '.cv-btn-nav, .theme-btn, .navbar-link, ' +
      '.info_more-btn, .social-link, .contact-link, ' +
      '.filter-item button, .modal-close-btn, ' +
      '.project-item > a, .project-img'
    );

    if (target && hasPhysicalMouse) {
      cursor.classList.remove('hover');
    }
  }, { passive: true });
}



// theme switching
const themes = ['default', 'blue', 'purple', 'green', 'red', 'orange', 'pink', 'cyan', 'lime', 'silver'];
let currentThemeIndex = 0;

const themeBtn = document.querySelector('.theme-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];

    if (newTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }

    localStorage.setItem('portfolio-theme', newTheme);
  });
}

// load saved theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme && savedTheme !== 'default') {
  currentThemeIndex = themes.indexOf(savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
}



// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function initMatrixRain() {
  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const columns = Math.floor(canvas.width / 20);
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
  }

  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  let lastTime = 0;
  const frameDelay = 50;

  function draw(currentTime) {
    if (currentTime - lastTime >= frameDelay) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get current theme color
      const computedStyle = getComputedStyle(document.documentElement);
      const themeColor = computedStyle.getPropertyValue('--theme-color-primary').trim();

      ctx.fillStyle = themeColor;
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * 20, drops[i]);

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 20;
      }

      lastTime = currentTime;
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, 100);
});

if (canvas) {
  initMatrixRain();
}

// Enhanced Floating particles with magnetic effect
function createFloatingParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particles-container';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  `;

  const particles = [];

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: var(--theme-color-primary);
      border-radius: 50%;
      left: ${startX}%;
      top: ${startY}%;
      opacity: ${Math.random() * 0.6 + 0.3};
      animation: float ${Math.random() * 15 + 20}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      box-shadow: 0 0 ${Math.random() * 30 + 15}px var(--theme-color-primary);
      filter: blur(${Math.random() * 0.5}px);
    `;

    particles.push({ element: particle, baseX: startX, baseY: startY });
    particleContainer.appendChild(particle);
  }

  document.body.insertBefore(particleContainer, document.body.firstChild);

  // Magnetic effect - particles react to cursor (optimized with RAF)
  if (!isTouchDevice()) {
    let mouseXPercent = 50;
    let mouseYPercent = 50;
    let rafId = null;

    document.addEventListener('mousemove', (e) => {
      mouseXPercent = (e.clientX / window.innerWidth) * 100;
      mouseYPercent = (e.clientY / window.innerHeight) * 100;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          particles.forEach((p) => {
            const dx = mouseXPercent - parseFloat(p.element.style.left);
            const dy = mouseYPercent - parseFloat(p.element.style.top);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 20) {
              const force = (20 - distance) / 20;
              const offsetX = dx * force * 2;
              const offsetY = dy * force * 2;

              p.element.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + force * 0.5})`;
            } else {
              p.element.style.transform = 'translate(0, 0) scale(1)';
            }
          });
          rafId = null;
        });
      }
    }, { passive: true });
  }

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(90deg);
      }
      50% {
        transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(180deg);
      }
      75% {
        transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) rotate(270deg);
      }
    }
  `;
  document.head.appendChild(style);
}

// Scroll-triggered reveal animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const animatables = document.querySelectorAll(
    '.service-item, .about-card, .project-item, .contact-info-card, article section'
  );

  animatables.forEach(el => {
    el.classList.add('reveal-element');
    observer.observe(el);
  });
}

// Liquid hover effect - track mouse position on cards
function initLiquidHoverEffect() {
  const cards = document.querySelectorAll(
    '.service-item, .about-card, .project-item > a, .contact-info-card'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);

      // Add 3D tilt effect for project cards
      if (card.closest('.project-item')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateX = ((mouseY - centerY) / centerY) * 8;
        const rotateY = ((mouseX - centerX) / centerX) * -8;

        card.style.transform = `translateY(-20px) translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      }
    });

    // Reset transform on mouse leave for project cards
    card.addEventListener('mouseleave', () => {
      if (card.closest('.project-item')) {
        card.style.transform = '';
      }
    });
  });
}

// Initialize particles and animations after page load
window.addEventListener('load', () => {
  createFloatingParticles();
  initScrollAnimations();
  initLiquidHoverEffect();
});

// Sound effects system
let soundEnabled = true;
const soundBtn = document.querySelector('.sound-btn');

function playSound(frequency, duration = 50) {
  if (!soundEnabled) return;

  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  } catch (e) {
    // Audio context not supported
  }
}

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.classList.toggle('muted');
    const icon = soundBtn.querySelector('ion-icon');
    icon.setAttribute('name', soundEnabled ? 'volume-medium-outline' : 'volume-mute-outline');
    playSound(800, 100);
  });
}

// Add hover sounds to interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('button, a, .navbar-link, .project-item, .service-item')) {
    playSound(400, 30);
  }
}, true);

// Add click sounds
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a')) {
    playSound(600, 50);
  }
}, true);


// Prevent browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top immediately
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Scroll to top on page load/refresh
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 0);
});

// Also handle beforeunload to ensure clean state
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});


// Scroll to top button functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
  // Show/hide button based on scroll position
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    }, 50);
  }, { passive: true });

  // Smooth scroll to top on click
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// loader - tap anywhere to continue
const loader = document.querySelector('.loader-overlay');
if (loader) {
  loader.addEventListener('click', () => {
    loader.classList.remove('active');
  });

  // Also allow any key press
  document.addEventListener('keydown', (e) => {
    if (loader.classList.contains('active')) {
      loader.classList.remove('active');
    }
  }, { once: true });
}



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    }

  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}



// filter function
const filterFunc = function (selectedValue) {
  const filterItems = document.querySelectorAll("[data-filter-item]");

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// Initialize filter controls
function initializeFilters() {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// WhatsApp Contact Form Integration
const whatsappForm = document.getElementById('whatsapp-contact-form');

if (whatsappForm) {
  const formInputs = whatsappForm.querySelectorAll("[data-form-input]");
  const formBtn = whatsappForm.querySelector("[data-form-btn]");

  // Enable/disable submit button based on form validation
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (whatsappForm.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  // Handle form submission
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    // Build WhatsApp message with formatting
    const whatsappMessage = `🔔 *New Contact Request*

👤 *Name:* ${name}
📧 *Email:* ${email}

💬 *Message:*
${message}

_Sent from Portfolio Website_`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Your WhatsApp number (international format without + or spaces)
    // Format: country code + number
    const whatsappNumber = '8801317460865'; // Bangladesh: 880 + 1317460865

    // Build WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Optional: Clear form after sending
    setTimeout(() => {
      whatsappForm.reset();
      formBtn.setAttribute("disabled", "");
    }, 500);
  });
}



// Load projects from JSON file
async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    const projects = await response.json();
    const projectList = document.querySelector('.project-list');

    if (projectList) {
      projectList.innerHTML = projects.map(project => `
        <li class="project-item active" data-filter-item data-category="${project.category}">
          <a href="${project.link}" target="_blank">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </figure>
            <div class="project-content">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-category">${project.category}</p>
              <p class="project-description">${project.description}</p>
            </div>
          </a>
        </li>
      `).join('');

      // Initialize filter controls after projects are loaded
      initializeFilters();

      // Set all projects as active initially
      filterFunc("all");
    }
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load projects when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProjects);
} else {
  loadProjects();
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedPage = this.innerHTML.toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (clickedPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);

        // Reset animations when switching to About page
        if (pages[j].dataset.page === 'about') {
          const aboutCards = pages[j].querySelectorAll('.about-card');
          aboutCards.forEach(card => {
            card.style.animation = 'none';
            setTimeout(() => {
              card.style.animation = '';
            }, 10);
          });

          // Restart typing animation
          setTimeout(() => {
            textIndex = 0;
            charIndex = 0;
            isDeleting = false;
            const typingElement = document.querySelector('.typing-text');
            if (typingElement) {
              typingElement.textContent = '';
              typeEffect();
            }
          }, 300);
        }
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}