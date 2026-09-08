document.documentElement.classList.add('js');

const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const mainNav = document.querySelector('.main-nav');
const mobileNav = window.matchMedia('(max-width: 820px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');

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
  const labels = isEnglish
    ? { close: 'Close navigation', open: 'Open navigation', collapse: 'Collapse sidebar', expand: 'Expand sidebar' }
    : { close: '关闭导航', open: '打开导航', collapse: '折叠侧栏', expand: '展开侧栏' };
  navToggle.setAttribute('aria-label', mobileNav.matches ? (isOpen ? labels.close : labels.open) : (isOpen ? labels.collapse : labels.expand));
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

const siteData = window.QIG_DATA;

const makeElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

const makeArrowIcon = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 19 19 5M9 5h10v10');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-width', '1.8');
  svg.append(path);
  return svg;
};

const sortedPublications = () => [...(siteData?.publications || [])].sort((a, b) => b.date.localeCompare(a.date));

document.querySelectorAll('[data-publication-list="featured"]').forEach((root) => {
  const publications = sortedPublications().filter((item) => item.featured).slice(0, 3);
  root.replaceChildren(...publications.map((item) => {
    const link = makeElement('a', 'paper-row');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener';
    const arrow = makeElement('span', 'paper-arrow');
    arrow.append(makeArrowIcon());
    link.append(
      makeElement('span', 'paper-year', String(item.year)),
      makeElement('span', 'paper-title', item.title),
      makeElement('span', 'paper-journal', item.journal),
      arrow
    );
    return link;
  }));
});

const publicationsRoot = document.querySelector('#publications-root');
const publicationYears = document.querySelector('#publication-years');
if (publicationsRoot && publicationYears && siteData) {
  const groups = sortedPublications().reduce((map, item) => {
    if (!map.has(item.year)) map.set(item.year, []);
    map.get(item.year).push(item);
    return map;
  }, new Map());
  const sections = [];
  const yearLinks = [];
  groups.forEach((items, year) => {
    const section = makeElement('section', 'year-block reveal is-visible');
    section.id = `y${year}`;
    const heading = makeElement('h2', 'year-heading', String(year));
    heading.append(makeElement('small', '', `${items.length} ${isEnglish ? (items.length === 1 ? 'PUBLICATION' : 'PUBLICATIONS') : '篇论文'}`));
    section.append(heading);
    items.forEach((item) => {
      const article = makeElement('article', 'publication');
      const title = makeElement('h3', '', item.title);
      const authors = makeElement('p', 'authors', item.authors.join(', '));
      const venue = makeElement('span', 'venue', item.venue);
      const date = makeElement('time', 'date', item.dateLabel);
      date.dateTime = item.date;
      const link = makeElement('a', 'publication-link');
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', isEnglish ? `Open publication: ${item.title}` : `访问论文：${item.title}`);
      link.append(makeArrowIcon());
      article.append(title, authors, venue, date, link);
      section.append(article);
    });
    const yearLink = makeElement('a', '', String(year));
    yearLink.href = `#y${year}`;
    yearLink.append(makeElement('span', '', String(items.length).padStart(2, '0')));
    sections.push(section);
    yearLinks.push(yearLink);
  });
  publicationsRoot.replaceChildren(...sections);
  publicationYears.replaceChildren(...yearLinks);
}

const membersRoot = document.querySelector('#members-root');
if (membersRoot && siteData) {
  const cards = [];
  siteData.memberGroups.forEach((group) => {
    const members = siteData.members.filter((member) => member.group === group.id);
    if (!members.length) return;
    members.forEach((member) => {
      const card = makeElement('article', 'person');
      card.append(makeElement('span', 'person-role', member.title || group.role));
      const name = makeElement('h2', '', isEnglish && member.nameEn ? member.nameEn : member.name);
      if (member.profileUrl) {
        const link = makeElement('a', '', name.textContent);
        link.href = member.profileUrl;
        name.replaceChildren(link);
      }
      card.append(name);
      const research = (member.research || []).join(isEnglish ? ' · ' : '、');
      if (research) card.append(makeElement('p', '', research));
      if (member.email) {
        const email = makeElement('a', 'person-contact', member.email);
        email.href = `mailto:${member.email}`;
        card.append(email);
      }
      cards.push(card);
    });
  });
  membersRoot.replaceChildren(...cards);
}

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
