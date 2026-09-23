const botaoMenu = document.getElementById("menu-mobile");
const menu = document.getElementById("menu-principal");
const linksMenu = document.querySelectorAll("#menu-principal a");

// Mantém a navegação FLX visível e alinhada nas duas áreas do site.
const ajustesNavegacao = document.createElement("style");
ajustesNavegacao.textContent = `
    .flx-network {
        position: sticky;
        top: 0;
        z-index: 1200;
    }

    .site-header {
        top: 42px;
    }
`;
document.head.appendChild(ajustesNavegacao);

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("ativo");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        botaoMenu.textContent = aberto ? "×" : "☰";
    });

    linksMenu.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("ativo");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            menu.classList.remove("ativo");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.textContent = "☰";
        }
    });
}
