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
