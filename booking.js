// ===================================================
//  BOOKING.JS
// ===================================================

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

if (hamburger && navLinksMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinksMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    }
  });
}

// ===== NAVBAR SCROLL =====
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

// ===== MODE SWITCH (Book / Buy) =====
const modeBtns  = document.querySelectorAll('.bk-mode-btn');
const panelBook = document.getElementById('panel-book');
const panelBuy  = document.getElementById('panel-buy');

modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.dataset.mode === 'book') {
      panelBook.classList.add('active');
      panelBuy.classList.remove('active');
    } else {
      panelBuy.classList.add('active');
      panelBook.classList.remove('active');
    }

    // scroll to form
    document.querySelector('.bk-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Handle URL param ?mode=buy on page load
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('mode') === 'buy') {
  document.querySelector('[data-mode="buy"]').click();
}

// ===== MODAL =====
const modal      = document.getElementById('bk-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalMsg   = document.getElementById('modal-msg');

function showModal(title, msg) {
  modalTitle.textContent = title;
  modalMsg.textContent   = msg;
  modal.classList.add('show');
}

modalClose.addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

// ===== FORM SUBMITS =====
const formBook = document.getElementById('form-book');
const formBuy  = document.getElementById('form-buy');

if (formBook) {
  formBook.addEventListener('submit', e => {
    e.preventDefault();
    const btn = formBook.querySelector('.bk-submit');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-calendar-check"></i> Jadwalkan Kunjungan';
      btn.disabled = false;
      formBook.reset();
      showModal(
        'Jadwal Dikonfirmasi!',
        'Permintaan kunjungan Anda telah diterima. Agent kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi jadwal.'
      );
    }, 1800);
  });
}

if (formBuy) {
  formBuy.addEventListener('submit', e => {
    e.preventDefault();
    const btn = formBuy.querySelector('.bk-submit');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-key"></i> Ajukan Pembelian';
      btn.disabled = false;
      formBuy.reset();
      showModal(
        'Pengajuan Berhasil!',
        'Data pembelian Anda telah kami terima. Konsultan properti kami akan menghubungi Anda segera untuk langkah selanjutnya.'
      );
    }, 1800);
  });
}
