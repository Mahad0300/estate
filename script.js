const mobileToggle = document.getElementById('mobileToggle');
const mobileClose = document.getElementById('mobileClose');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

function openMenu() {
  navMenu.classList.add('active');
  navOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('active');
  navOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (mobileToggle) mobileToggle.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
if (navOverlay) navOverlay.addEventListener('click', closeMenu);

navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ------------------------------------------
   MILESTONE COUNTERS
   ------------------------------------------ */
const milestoneNumbers = document.querySelectorAll('.milestone-number[data-target]');

function formatMilestoneValue(value) {
  return value.toLocaleString('en-US');
}

function animateMilestone(el) {
  const target = Number(el.dataset.target) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);

    el.textContent = formatMilestoneValue(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

if (milestoneNumbers.length) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    milestoneNumbers.forEach(el => {
      const target = Number(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      el.textContent = formatMilestoneValue(target) + suffix;
    });
  } else {
    const milestonesObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const numbers = entry.target.querySelectorAll('.milestone-number[data-target]');
          numbers.forEach(animateMilestone);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    const milestonesSection = document.querySelector('.milestones-section');
    if (milestonesSection) {
      milestonesObserver.observe(milestonesSection);
    }
  }
}
