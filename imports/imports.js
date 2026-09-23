const botaoMenu = document.getElementById("menu-mobile");
const menu = document.getElementById("menu-principal");
const linksMenu = document.querySelectorAll("#menu-principal a");

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
