const toggle = document.getElementById('menu-mobile');
const menu = document.getElementById('menu-principal');
const desktop = window.matchMedia('(min-width: 841px)');

// O mesmo pacote pode ser aberto diretamente pelo index.html no Windows.
if (window.location.protocol === 'file:') {
  document.querySelectorAll('a[href="imports/"]').forEach((link) => {
    link.href = 'imports/index.html';
  });
  document.querySelectorAll('a[href="./"]').forEach((link) => {
    link.href = 'index.html';
  });
}

if (toggle && menu) {
  function closeMenu(returnFocus = false) {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (menu.classList.contains('is-open') && !menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  desktop.addEventListener('change', (event) => { if (event.matches) closeMenu(); });
}

const currentYear = document.getElementById('ano-atual');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
