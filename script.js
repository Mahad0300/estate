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

/* ------------------------------------------
   TEAM MEMBER PHOTO FALLBACK
   ------------------------------------------ */
document.querySelectorAll('.team-member-photo img, .leadership-photo img').forEach((img) => {
  const hideBrokenPhoto = () => img.classList.add('is-hidden');

  if (img.complete && img.naturalWidth === 0) {
    hideBrokenPhoto();
    return;
  }

  img.addEventListener('error', hideBrokenPhoto);
});

/* ------------------------------------------
   FAQ — ONLY ONE OPEN AT A TIME
   ------------------------------------------ */
const faqItems = document.querySelectorAll('.faq-list .faq-item');

faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;

    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

/* ------------------------------------------
   TEXT REVEAL (no library)
   ------------------------------------------ */
(function initTextReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  document.documentElement.classList.add('js-reveal');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    reveals.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const groups = document.querySelectorAll('.reveal-group');

  groups.forEach((group) => {
    group.querySelectorAll('.reveal').forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${index * 110}ms`);
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;

        if (target.classList.contains('reveal-group')) {
          target.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
        } else {
          target.classList.add('is-visible');
        }

        observer.unobserve(target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  groups.forEach((group) => revealObserver.observe(group));

  reveals.forEach((el) => {
    if (!el.closest('.reveal-group')) {
      revealObserver.observe(el);
    }
  });
})();

/* ------------------------------------------
   STRICT 11-DIGIT PAKISTAN PHONE NUMBER INPUT RESTRICTION
   ------------------------------------------ */
document.querySelectorAll('input[type="tel"]').forEach((input) => {
  input.setAttribute('inputmode', 'numeric');
  input.setAttribute('maxlength', '11');
  input.setAttribute('pattern', '[0-9]{11}');

  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
  });
});

/* ------------------------------------------
   FORM SELECT OPTION COLOR TOGGLE
   ------------------------------------------ */
document.querySelectorAll('.contact-field select').forEach((select) => {
  const updateColor = () => {
    if (select.value && select.value !== '') {
      select.classList.add('has-value');
    } else {
      select.classList.remove('has-value');
    }
  };
  updateColor();
  select.addEventListener('change', updateColor);
});
