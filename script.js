const botaoMenu = document.getElementById('menu-mobile');
const menu = document.getElementById('menu-principal');

// Compatibilidade com abertura local no Windows (file://).
// Em um servidor, "imports/" abre imports/index.html automaticamente.
// Ao abrir os arquivos direto no navegador, precisamos apontar para o arquivo explicitamente.
if (window.location.protocol === 'file:') {
  document.querySelectorAll('a[href="imports/"]').forEach((link) => {
    link.setAttribute('href', 'imports/index.html');
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

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', fecharMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') fecharMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) fecharMenu();
  });
}

const anoAtual = document.getElementById('ano-atual');
if (anoAtual) {
  anoAtual.textContent = String(new Date().getFullYear());
}
