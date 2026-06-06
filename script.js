// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

if (hamburger && navLinksMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinksMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    }
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 24px rgba(45,59,224,0.14)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(45,59,224,0.08)';
  }
});

// ===== ACTIVE NAV LINK on SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#2D3BE0';
    }
  });
});

// ===== CATEGORY CARD ACTIVE =====
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    categoryCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.category-card, .stat-card, .service-card, .property-card, .about-left, .about-right, .properties-header, .contact-left, .contact-form, .section-header'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // run on load

// ===== SEARCH BAR =====
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    const propertiesSection = document.getElementById('properties');
    propertiesSection.scrollIntoView({ behavior: 'smooth' });

    // Highlight effect
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      if (title.includes(query.toLowerCase())) {
        card.style.border = '2px solid #2D3BE0';
        card.style.boxShadow = '0 0 0 4px rgba(45,59,224,0.15)';
      } else {
        card.style.border = '';
        card.style.boxShadow = '';
      }
    });
  }
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

// Clear highlight when search is cleared
searchInput.addEventListener('input', () => {
  if (!searchInput.value.trim()) {
    document.querySelectorAll('.property-card').forEach(card => {
      card.style.border = '';
      card.style.boxShadow = '';
    });
  }
});

// ===== CONTACT FORM SUBMIT =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Pesan Terkirim!';
  btn.style.background = '#22c55e';
  btn.style.color = 'white';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.color = '';
    contactForm.reset();
  }, 3000);
});

// ===== SMOOTH SCROLL for all internal links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

