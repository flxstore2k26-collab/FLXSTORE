const botaoMenu = document.getElementById('menu-mobile');
const menu = document.getElementById('menu-principal');
const linksMenu = [...document.querySelectorAll('#menu-principal a[href^="#"]')];

// Compatibilidade com abertura local no Windows (file://).
// Ao abrir os arquivos direto no navegador, links para pastas mostram um índice de diretório.
// Nesta situação, apontamos explicitamente para os arquivos index.html.
if (window.location.protocol === 'file:') {
  document.querySelectorAll('a[href="../"]').forEach((link) => {
    link.setAttribute('href', '../index.html');
  });

  document.querySelectorAll('a[href="./"]').forEach((link) => {
    link.setAttribute('href', 'index.html');
  });
}

function fecharMenu() {
  if (!menu || !botaoMenu) return;
  menu.classList.remove('ativo');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu');
  botaoMenu.textContent = '☰';
}

if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('ativo');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    botaoMenu.textContent = aberto ? '×' : '☰';
  });

  document.querySelectorAll('#menu-principal a').forEach((link) => {
    link.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') fecharMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) fecharMenu();
  });
}

const chips = [...document.querySelectorAll('.filter-chip')];
const cards = [...document.querySelectorAll('.preview-card')];

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filtro = chip.dataset.filter;
    chips.forEach((item) => item.classList.toggle('ativo', item === chip));
    cards.forEach((card) => {
      const categorias = (card.dataset.category || '').split(' ');
      card.classList.toggle('oculto', filtro !== 'todos' && !categorias.includes(filtro));
    });
  });
});

const detalhes = [...document.querySelectorAll('.faq details')];
detalhes.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    detalhes.forEach((outro) => {
      if (outro !== item) outro.open = false;
    });
  });
});

const revealEls = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => obs.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visivel'));
}

const secoes = ['conceito', 'preview', 'marcas', 'processo', 'duvidas', 'contato']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const navObs = new IntersectionObserver((entries) => {
    const visiveis = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (!visiveis.length) return;
    const id = visiveis[0].target.id;
    linksMenu.forEach((link) => {
      link.classList.toggle('ativo-secao', link.getAttribute('href') === `#${id}`);
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });

  secoes.forEach((secao) => navObs.observe(secao));
}

const anoAtualImports = document.getElementById('ano-atual-imports');
if (anoAtualImports) {
  anoAtualImports.textContent = String(new Date().getFullYear());
}
