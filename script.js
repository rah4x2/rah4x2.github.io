const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  };

  const openMenu = () => {
    mobileMenu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
  };

  // Always begin closed, regardless of browser/CSS cache state.
  closeMenu();

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // Prevent the mobile panel from lingering when resizing back to desktop.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
}

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach(el => {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add('is-visible');
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-process-stage]').forEach(stage => {
  const callout = stage.querySelector('[data-process-callout]');
  const units = stage.querySelectorAll('[data-stage]');

  const showStage = unit => {
    if (!callout) return;
    const title = unit.dataset.stage || 'Process stage';
    const detail = unit.dataset.detail || '';
    callout.innerHTML = `<span class="callout-code">PROCESS INFO</span><strong>${title}</strong><small>${detail}</small>`;
  };

  units.forEach(unit => {
    unit.addEventListener('mouseenter', () => showStage(unit));
    unit.addEventListener('focus', () => showStage(unit));
    unit.addEventListener('click', () => showStage(unit));
  });

  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    stage.addEventListener('pointermove', event => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.dataset.tilting = 'true';
      stage.style.transform = `perspective(1100px) rotateX(${(-y * 3.5).toFixed(2)}deg) rotateY(${(x * 4.5).toFixed(2)}deg)`;
    });
    stage.addEventListener('pointerleave', () => {
      delete stage.dataset.tilting;
      stage.style.transform = '';
    });
  }
});
