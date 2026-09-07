document.documentElement.classList.add('js');

const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const mainNav = document.querySelector('.main-nav');
const mobileNav = window.matchMedia('(max-width: 820px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const glyphs = ['ψ', '∴', 'Δ', 'Σ', '⊗', '∂', '∞'];
if (mainNav && navToggle) {
  mainNav.id ||= 'primary-navigation';
  navToggle.setAttribute('aria-controls', mainNav.id);
}
navLinks.forEach((link, index) => {
  link.dataset.glyph ||= glyphs[index] || '·';
  const label = link.textContent.trim();
  link.title = label;
  const span = document.createElement('span');
  span.className = 'nav-label';
  span.textContent = label;
  link.replaceChildren(span);
});

const storedSidebar = (() => {
  try { return localStorage.getItem('nju-qig-sidebar'); } catch { return null; }
})();
if (storedSidebar === 'collapsed' && !mobileNav.matches) body.classList.add('sidebar-collapsed');

const updateNavToggle = () => {
  if (!navToggle) return;
  const isOpen = mobileNav.matches ? body.classList.contains('nav-open') : !body.classList.contains('sidebar-collapsed');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', mobileNav.matches ? (isOpen ? '关闭导航' : '打开导航') : (isOpen ? '折叠侧栏' : '展开侧栏'));
};

navToggle?.addEventListener('click', () => {
  if (mobileNav.matches) {
    body.classList.toggle('nav-open');
  } else {
    const collapsed = body.classList.toggle('sidebar-collapsed');
    try { localStorage.setItem('nju-qig-sidebar', collapsed ? 'collapsed' : 'expanded'); } catch {}
  }
  updateNavToggle();
});

mobileNav.addEventListener('change', () => {
  body.classList.remove('nav-open');
  updateNavToggle();
});
navLinks.forEach((link) => link.addEventListener('click', () => {
  body.classList.remove('nav-open');
  updateNavToggle();
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('nav-open')) {
    body.classList.remove('nav-open');
    navToggle?.focus();
    updateNavToggle();
  }
});
updateNavToggle();

const currentPage = location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const progress = document.querySelector('.reading-progress span');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
};
updateProgress();
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress, { passive: true });

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });

  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    revealObserver.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const thetaControl = document.querySelector('#theta-control');
const phiControl = document.querySelector('#phi-control');
const stateVector = document.querySelector('#state-vector');
const stateProjection = document.querySelector('#state-projection');
const statePoint = document.querySelector('#state-point');
const stateLabel = document.querySelector('#state-label');
const stateEquation = document.querySelector('#state-equation');

const updateBlochState = () => {
  if (!thetaControl || !phiControl || !stateVector) return;
  const thetaDegrees = Number(thetaControl.value);
  const phiDegrees = Number(phiControl.value);
  const theta = thetaDegrees * Math.PI / 180;
  const phi = phiDegrees * Math.PI / 180;
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);
  const radius = 128;
  const project = (px, py, pz) => ({
    x: 180 + radius * (.819 * px - .574 * py),
    y: 180 + radius * (.196 * px + .28 * py - .94 * pz)
  });
  const tip = project(x, y, z);
  const equator = project(x, y, 0);
  stateVector.setAttribute('x2', tip.x.toFixed(2));
  stateVector.setAttribute('y2', tip.y.toFixed(2));
  stateProjection?.setAttribute('x1', tip.x.toFixed(2));
  stateProjection?.setAttribute('y1', tip.y.toFixed(2));
  stateProjection?.setAttribute('x2', equator.x.toFixed(2));
  stateProjection?.setAttribute('y2', equator.y.toFixed(2));
  statePoint?.setAttribute('cx', tip.x.toFixed(2));
  statePoint?.setAttribute('cy', tip.y.toFixed(2));
  stateLabel?.setAttribute('x', (tip.x + 10).toFixed(2));
  stateLabel?.setAttribute('y', (tip.y - 8).toFixed(2));
  document.querySelector('#theta-value').textContent = `${thetaDegrees}°`;
  document.querySelector('#phi-value').textContent = `${phiDegrees}°`;
  const alpha = Math.cos(theta / 2).toFixed(3);
  const beta = Math.sin(theta / 2).toFixed(3);
  stateEquation.innerHTML = `|ψ⟩ = ${alpha}|0⟩ + e<sup>i${phi.toFixed(2)}</sup>${beta}|1⟩`;
};
thetaControl?.addEventListener('input', updateBlochState);
phiControl?.addEventListener('input', updateBlochState);
updateBlochState();

const canvas = document.querySelector('#phase-field');
if (canvas && !reducedMotion.matches) {
  const context = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let time = 0;
  let frame = 0;
  const particles = Array.from({ length: 28 }, (_, index) => ({
    phase: index * 2.399,
    orbit: .12 + (index % 7) * .055,
    speed: .00018 + (index % 5) * .000035,
    size: index % 6 === 0 ? 2.2 : 1.1
  }));

  const resizeCanvas = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = (stamp) => {
    time = stamp;
    context.clearRect(0, 0, width, height);
    const centerX = width * .77;
    const centerY = height * .42;
    particles.forEach((particle, index) => {
      const angle = particle.phase + time * particle.speed;
      const radius = Math.min(width, height) * particle.orbit;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle * 1.17) * radius * .48;
      context.beginPath();
      context.fillStyle = index % 5 === 0 ? 'rgba(194, 38, 126, .38)' : 'rgba(75, 47, 131, .2)';
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fill();
    });
    frame = requestAnimationFrame(draw);
  };
  resizeCanvas();
  addEventListener('resize', resizeCanvas, { passive: true });
  frame = requestAnimationFrame(draw);
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(frame);
    if (!document.hidden) frame = requestAnimationFrame(draw);
  });
}
