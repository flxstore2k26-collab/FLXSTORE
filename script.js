const botaoMenu = document.getElementById("menu-mobile");
const menu = document.getElementById("menu-principal");
const linksMenu = document.querySelectorAll("#menu-principal a[href^='#']");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("ativo");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        botaoMenu.textContent = aberto ? "×" : "☰";
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("ativo");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            menu.classList.remove("ativo");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        }
    });
}

const secoes = ["inicio", "colecao", "sobre", "redes", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

function atualizarMenuAtivo() {
    const referencia = window.scrollY + 180;
    let atual = "inicio";

    secoes.forEach((secao) => {
        if (secao.offsetTop <= referencia) atual = secao.id;
    });

    linksMenu.forEach((link) => {
        link.classList.toggle("ativo-menu", link.getAttribute("href") === `#${atual}`);
    });
}

window.addEventListener("scroll", atualizarMenuAtivo, { passive: true });
atualizarMenuAtivo();

const elementosReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12 });

    elementosReveal.forEach((elemento) => observador.observe(elemento));
} else {
    elementosReveal.forEach((elemento) => elemento.classList.add("visible"));
}

const anoAtual = document.getElementById("ano-atual");
if (anoAtual) anoAtual.textContent = String(new Date().getFullYear());
