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

// Destaca no menu a seção que está visível durante a rolagem.
const secoesObservadas = ["conceito", "estilos", "drops", "marcas", "experiencia", "duvidas"];
const linksPorSecao = new Map();

secoesObservadas.forEach((id) => {
    const link = document.querySelector(`#menu-principal a[href="#${id}"]`);
    if (link) linksPorSecao.set(id, link);
});

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        (entradas) => {
            const visiveis = entradas
                .filter((entrada) => entrada.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visiveis.length) return;

            linksPorSecao.forEach((link) => link.classList.remove("section-active"));
            const linkAtivo = linksPorSecao.get(visiveis[0].target.id);
            if (linkAtivo) linkAtivo.classList.add("section-active");
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] }
    );

    secoesObservadas.forEach((id) => {
        const secao = document.getElementById(id);
        if (secao) observador.observe(secao);
    });
}

// Mantém apenas uma pergunta frequente aberta por vez.
const perguntas = document.querySelectorAll(".faq details");
perguntas.forEach((pergunta) => {
    pergunta.addEventListener("toggle", () => {
        if (!pergunta.open) return;
        perguntas.forEach((outra) => {
            if (outra !== pergunta) outra.open = false;
        });
    });
});
