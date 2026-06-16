// smooth scroll
const navCollapseEl = document.getElementById('navMenu');
const bsCollapse = navCollapseEl ? new bootstrap.Collapse(navCollapseEl, { toggle: false }) : null;

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (bsCollapse && navCollapseEl.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});

// highlight active nav 
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// contact button scroll
const contactBtn = document.querySelector('.hero .btn-lilac');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });
}

// contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// image modal
const imgModal = document.getElementById('imgModal');
if (imgModal) {
  imgModal.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const imgSrc = trigger.getAttribute('data-img');
    const caption = trigger.getAttribute('data-caption') || '';
    document.getElementById('imgModalPic').src = imgSrc;
    document.getElementById('imgModalPic').alt = caption;
    document.getElementById('imgModalCaption').textContent = caption;
  });
}

// skills background animation
(function () {
  const canvas = document.getElementById('skillsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const orbs = [
    { x: 0.15, y: 0.2,  r: 0.35, hue: 290, speed: 0.00015, phase: 0 },
    { x: 0.75, y: 0.6,  r: 0.30, hue: 330, speed: 0.00020, phase: 1.5 },
    { x: 0.5,  y: 0.85, r: 0.25, hue: 270, speed: 0.00018, phase: 0.8 },
  ];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    orbs.forEach(o => {
      const px = (o.x + 0.025 * Math.sin(t * o.speed * 1000 + o.phase)) * W;
      const py = (o.y + 0.020 * Math.cos(t * o.speed * 800 + o.phase)) * H;
      const radius = o.r * Math.min(W, H);
      const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
      grad.addColorStop(0, `hsla(${o.hue}, 35%, 50%, 0.07)`);
      grad.addColorStop(1, `hsla(${o.hue}, 25%, 30%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    t += 16;
    requestAnimationFrame(draw);
  }
  draw();
})();

// sparkles
(function () {
  const container = document.getElementById('sparkleContainer');
  if (!container) return;

  const total = 14;
  for (let i = 0; i < total; i++) {
    const isStar = i % 4 === 0;
    const el = document.createElement('div');
    el.className = isStar ? 'sparkle-star' : 'sparkle';
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      --dur:   ${2.5 + Math.random() * 3}s;
      --delay: ${Math.random() * 5}s;
    `;
    if (!isStar) {
      const size = 2 + Math.random() * 4;
      el.style.width  = size + 'px';
      el.style.height = size + 'px';
      const colors = ['var(--blush-light)', 'var(--lilac-light)', '#fff'];
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    container.appendChild(el);
  }
})();

// hero image hover effect
document.querySelectorAll('.hero-image').forEach(img => {
  const imgElement = img.querySelector('img');
  const defaultImg = img.getAttribute('data-default-img');
  const hoverImg = img.getAttribute('data-hover-img');

  img.addEventListener('mouseenter', () => {
    imgElement.src = hoverImg;
  });

  img.addEventListener('mouseleave', () => {
    imgElement.src = defaultImg;
  });
});

// loading screen
(function () {
  const screen = document.getElementById('loadingScreen');
  const bar = document.getElementById('loadingBar');
  if (!screen || !bar) return;

  // prevent scrolling while loading
  document.body.style.overflow = 'hidden';

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      bar.style.width = '100%';
      setTimeout(() => {
        screen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 400);
    }
    bar.style.width = progress + '%';
  }, 120);
})();

// typewriter effect
const typedText = document.getElementById("typedText");

if (typedText) {
  const text = "Eula";
  let index = 0;

  // add blinking cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  typedText.parentNode.insertBefore(cursor, typedText.nextSibling);

  function typeWriter() {
    if (index < text.length) {
      typedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 150);
    }
    // cursor stays blinking after typing is done
  }

  typedText.textContent = "";
  typeWriter();
}

// reveal on scroll
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(item => observer.observe(item));