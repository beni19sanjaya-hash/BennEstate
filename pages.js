// ===================================================
//  PAGES.JS — Shared scripts for all inner pages
// ===================================================

// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 40
      ? '0 4px 24px rgba(45,59,224,0.14)'
      : '0 2px 16px rgba(45,59,224,0.08)';
  });
}

// ===== SCROLL REVEAL =====
const revealAll = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealAll);
revealAll();

// ===================================================
//  PROPERTIES PAGE
// ===================================================
const propGrid = document.getElementById('prop-grid');
const btnFilter = document.getElementById('btn-filter');
const listingCount = document.getElementById('listing-count');
const sortSelect = document.getElementById('sort-select');

if (propGrid && btnFilter) {

  // Favourite toggle
  document.querySelectorAll('.prop-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  });

  // Filter
  const applyFilter = () => {
    const type  = document.getElementById('filter-type').value;
    const cat   = document.getElementById('filter-cat').value;
    const price = document.getElementById('filter-price').value;
    const bed   = document.getElementById('filter-bed').value;

    let count = 0;
    document.querySelectorAll('#prop-grid .property-card').forEach(card => {
      const cardType  = card.dataset.type;
      const cardCat   = card.dataset.cat;
      const cardPrice = parseFloat(card.dataset.price);
      const cardBed   = parseInt(card.dataset.bed);

      const matchType  = type  === 'all' || cardType  === type;
      const matchCat   = cat   === 'all' || cardCat   === cat;
      const matchPrice = price === 'all' || cardPrice <= parseFloat(price);
      const matchBed   = bed   === 'all' || cardBed   >= parseInt(bed);

      const show = matchType && matchCat && matchPrice && matchBed;
      card.classList.toggle('hidden', !show);
      if (show) count++;
    });

    if (listingCount) {
      listingCount.innerHTML = `Menampilkan <strong>${count} properti</strong>`;
    }
  };

  btnFilter.addEventListener('click', applyFilter);

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const cards = [...document.querySelectorAll('#prop-grid .property-card:not(.hidden)')];
      const getValue = c => parseFloat(c.dataset.price);
      const sorted = sortSelect.value === 'price-asc'
        ? cards.sort((a, b) => getValue(a) - getValue(b))
        : sortSelect.value === 'price-desc'
        ? cards.sort((a, b) => getValue(b) - getValue(a))
        : cards;
      sorted.forEach(c => propGrid.appendChild(c));
    });
  }

  // Pagination (visual only)
  document.querySelectorAll('.pg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.scrollTo({ top: propGrid.offsetTop - 120, behavior: 'smooth' });
    });
  });
}

// ===================================================
//  BLOG PAGE
// ===================================================
const blogTabs   = document.querySelectorAll('.blog-tab');
const blogCards  = document.querySelectorAll('#blog-grid .blog-card');

if (blogTabs.length) {
  blogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      blogTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.tab;
      blogCards.forEach(card => {
        const match = target === 'all' || card.dataset.tab === target;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

// Blog newsletter
const btnNewsletter = document.querySelector('.btn-newsletter');
if (btnNewsletter) {
  btnNewsletter.addEventListener('click', () => {
    const input = document.querySelector('.sidebar-newsletter input');
    if (input && input.value.includes('@')) {
      const orig = btnNewsletter.textContent;
      btnNewsletter.textContent = '✓ Berhasil!';
      btnNewsletter.style.background = '#22c55e';
      setTimeout(() => {
        btnNewsletter.textContent = orig;
        btnNewsletter.style.background = '';
        input.value = '';
      }, 2500);
    } else {
      input.style.borderColor = '#ef4444';
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
    }
  });
}

// ===================================================
//  AGENT PAGE
// ===================================================
const agentGrid   = document.getElementById('agent-grid');
const agentSearch = document.getElementById('agent-search');
const agentArea   = document.getElementById('agent-area');
const btnSearchAgent = document.getElementById('btn-search-agent');

if (agentGrid && btnSearchAgent) {

  const filterAgents = () => {
    const query = agentSearch ? agentSearch.value.toLowerCase().trim() : '';
    const area  = agentArea  ? agentArea.value : 'all';

    document.querySelectorAll('#agent-grid .agent-card').forEach(card => {
      const name    = card.dataset.name || '';
      const cardArea = card.dataset.area || '';
      const matchName = !query || name.includes(query);
      const matchArea = area === 'all' || cardArea === area;
      card.classList.toggle('hidden', !(matchName && matchArea));
    });
  };

  btnSearchAgent.addEventListener('click', filterAgents);
  if (agentSearch) {
    agentSearch.addEventListener('keydown', e => { if (e.key === 'Enter') filterAgents(); });
  }
}

// ===================================================
//  SMOOTH SCROLL for anchor links
// ===================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
