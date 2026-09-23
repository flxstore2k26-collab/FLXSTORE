const botaoMenu = document.getElementById('menu-mobile');
const menu = document.getElementById('menu-principal');

if (botaoMenu && menu) {
  botaoMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('ativo');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    botaoMenu.textContent = aberto ? '×' : '☰';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('ativo');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir menu');
      botaoMenu.textContent = '☰';
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      menu.classList.remove('ativo');
      botaoMenu.setAttribute('aria-expanded', 'false');
      botaoMenu.setAttribute('aria-label', 'Abrir menu');
      botaoMenu.textContent = '☰';
    }
  });
}

const anoAtual = document.getElementById('ano-atual');
if (anoAtual) {
  anoAtual.textContent = String(new Date().getFullYear());
}
