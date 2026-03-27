/* =============================================
   MBI DARK PORTFOLIO — Vanilla JavaScript
   ============================================= */

'use strict';

/* ===== HELPERS ===== */
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

/* ===== PRELOADER ===== */
(function initPreloader() {
  const overlay = $('#preloader');
  const bar     = $('#preloader-bar');
  const num     = $('#preloader-num');
  if (!overlay) return;

  let pct = 0;
  const interval = setInterval(() => {
    pct = Math.min(pct + (Math.random() * 14 + 4), 100);
    bar.style.width = pct + '%';
    num.textContent  = Math.round(pct);
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => overlay.classList.add('hidden'), 350);
      setTimeout(() => overlay.remove(), 1300);
    }
  }, 110);
})();

/* ===== SERVICE WORKER ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ===== SHARED FOOTER ===== */
(function initFooter() {
  const ft = $('#site-footer');
  if (!ft) return;
  const yr = new Date().getFullYear();
  ft.innerHTML = `
    <div class="container footer-inner">
      <a href="index.html" class="footer-logo">
        <span class="logo-flower">✿</span>ㅤ"MʙɪㅤDᴀʀᴋ"
      </a>
      <p class="footer-copy">© ${yr} MD Ismail Hossen · Crafted with passion from Bangladesh</p>
      <div class="footer-socials">
        <a href="https://www.facebook.com/mbidark" target="_blank" class="foot-social" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.youtube.com/@Bekar_Golpo" target="_blank" class="foot-social" aria-label="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
        </a>
        <a href="https://discord.com/users/731544517542674443" target="_blank" class="foot-social" aria-label="Discord">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.021.012.042.029.054a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
        </a>
        <a href="https://wa.me/8801317460865" target="_blank" class="foot-social" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
      </div>
    </div>`;
})();

/* ===== CURRENT YEAR ===== */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== CUSTOM CURSOR ===== */
(function initCursor() {
  const ring = $('#cursor-ring');
  const dot  = $('#cursor-dot');
  if (!ring || !dot) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Lag for the ring
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover detection
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('a, button, [data-hover]');
    document.body.classList.toggle('cursor-hover', !!t);
  });
  document.addEventListener('mouseout', () => {
    document.body.classList.remove('cursor-hover');
  });
})();

/* ===== PARTICLE NETWORK ===== */
(function initParticles() {
  const canvas = $('#particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, particles = [];
  const mouse = { x: -9999, y: -9999 };
  const COLORS = ['#00d4ff', '#7c3aed', '#ffffff', '#ffd700'];

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
    spawn();
  }

  function spawn() {
    const count = Math.min(Math.floor((w * h) / 14000), 130);
    particles = Array.from({ length: count }, () => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const f = (120 - dist) / 120;
        p.vx += (dx / dist) * f * 0.3;
        p.vy += (dy / dist) * f * 0.3;
      }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = w + 5;
      if (p.x > w + 5) p.x = -5;
      if (p.y < -5) p.y = h + 5;
      if (p.y > h + 5) p.y = -5;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const hex = Math.round(p.alpha * 255).toString(16).padStart(2, '0');
      ctx.fillStyle = p.color + hex;
      ctx.fill();

      // Connect nearby
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ddx = p.x - q.x, ddy = p.y - q.y;
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 140) * 0.14})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('resize', resize);
  resize();
  tick();
})();

/* ===== SCROLL PROGRESS + NAVBAR ===== */
(function initScroll() {
  const bar  = $('#scroll-progress');
  const nav  = $('#navbar');
  const top  = $('#back-top');

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    if (top) top.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  if (top) top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ===== MOBILE MENU ===== */
(function initMobileMenu() {
  const btn   = $('#nav-hamburger');
  const menu  = $('#mobile-menu');
  const close = $('#mobile-close');
  if (!btn || !menu) return;

  const open  = () => menu.classList.add('open');
  const shut  = () => menu.classList.remove('open');

  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  $$('.mobile-link', menu).forEach(a => a.addEventListener('click', shut));
})();

/* ===== TYPEWRITER ===== */
(function initTypewriter() {
  const el = $('#typed-text');
  if (!el) return;

  const roles = ['Web Designer', 'Film Maker', 'Storyteller', 'Videographer'];
  let ri = 0, ci = 0, deleting = false;

  function type() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci >= word.length) { deleting = true; return setTimeout(type, 2000); }
      setTimeout(type, 80);
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; return setTimeout(type, 300); }
      setTimeout(type, 40);
    }
  }
  // Start after preloader
  setTimeout(type, 3200);
})();

/* ===== SMOOTH NAV LINKS ===== */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ===== REVEAL ON SCROLL ===== */
(function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (i * 0.05) + 's';
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '-50px' });

  $$('.reveal').forEach(el => io.observe(el));
})();

/* ===== STAT COUNTER ===== */
(function initStats() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card   = entry.target;
      const target = parseInt(card.dataset.target, 10);
      const suffix = card.dataset.suffix || '';
      const numEl  = card.querySelector('.stat-num');
      if (!numEl) return;

      let start = 0;
      const dur  = 1800;
      const step = target / (dur / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        numEl.textContent = Math.floor(start) + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
      io.unobserve(card);
    });
  }, { threshold: 0.5 });

  $$('.stat-card[data-target]').forEach(el => io.observe(el));
})();

/* ===== TILT CARDS ===== */
(function initTilt() {
  $$('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -10;
      const ry = ((x / r.width)  - 0.5) *  10;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===== SKILL BARS ===== */
(function initSkillBars() {
  const fills = $$('.skill-fill');
  if (!fills.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(el => io.observe(el));
})();

/* ===== MAGNETIC BUTTONS ===== */
(function initMagnetic() {
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r  = btn.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top  + r.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ===== PROJECTS ===== */
(function initProjects() {
  const grid = $('#projects-grid');
  if (!grid) return;

  let allProjects = [];

  function cardHTML(p, idx) {
    const catMap = { websites: 'Website', youtube: 'YouTube', stories: 'Story' };
    const label  = catMap[p.category] || p.category;
    const num    = String(idx + 1).padStart(2, '0');
    const tags   = (p.tags || []).map(t => `<span class="pc-tag">${t}</span>`).join('');
    const ytIcon = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>`;
    const extIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
    const arrowIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    const linkIcon = p.category === 'youtube' ? ytIcon : extIcon;
    return `
      <div class="project-card glass tilt-card reveal showing" data-cat="${p.category}">
        <div class="pc-img-wrap">
          <img src="${p.img}" alt="${p.title}" loading="lazy" />
          <div class="pc-img-overlay"></div>
          <span class="pc-num">${num}</span>
          <span class="pc-badge pc-badge--${p.category}">${label}</span>
          <a href="${p.link}" target="_blank" rel="noreferrer" class="pc-quick-link" aria-label="Open ${p.title}">${linkIcon}</a>
        </div>
        <div class="pc-body">
          <h4 class="pc-title">${p.title}</h4>
          <p class="pc-desc">${p.desc}</p>
          <div class="pc-tags">${tags}</div>
          <div class="pc-footer">
            <div class="pc-meta">
              <span class="pc-role">${p.role || 'Creator'}</span>
              <span class="pc-dot">·</span>
              <span class="pc-year">${p.year || ''}</span>
            </div>
            <a href="${p.link}" target="_blank" rel="noreferrer" class="pc-cta">
              View ${arrowIcon}
            </a>
          </div>
        </div>
        <div class="pc-glow-border"></div>
      </div>`;
  }

  function render(filter) {
    const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);
    grid.innerHTML = filtered.map((p, i) => cardHTML(p, i)).join('');

    $$('.tilt-card', grid).forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
        const ry = ((e.clientX - r.left) / r.width  - 0.5) *  10;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i * 0.06) + 's';
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    $$('.reveal', grid).forEach(el => io.observe(el));
  }

  function bindFilters() {
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.filter);
      });
    });
  }

  fetch('projects.json')
    .then(r => r.json())
    .then(data => {
      allProjects = data;
      render('all');
      bindFilters();
    })
    .catch(() => {
      grid.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.4)">Could not load projects.</p>';
    });
})();

/* ===== CONTACT FORM (WhatsApp) ===== */
(function initContact() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#fname').value.trim();
    const email   = form.querySelector('#femail').value.trim();
    const message = form.querySelector('#fmessage').value.trim();
    const text    = encodeURIComponent(`🌸From Dark Portfolio...\n>>${name}\n>>${email}\n>>${message}`);
    window.open(`https://wa.me/8801317460865?text=${text}`, '_blank');
  });
})();

/* ===== KONAMI CODE ===== */
(function initKonami() {
  const overlay = $('#konami-overlay');
  if (!overlay) return;
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === seq[idx]) {
      idx++;
      if (idx === seq.length) {
        idx = 0;
        overlay.classList.add('active');
        setTimeout(() => overlay.classList.remove('active'), 4000);
      }
    } else { idx = 0; }
  });
  overlay.addEventListener('click', () => overlay.classList.remove('active'));
})();
