const botaoMenu = document.getElementById("menu-mobile");
const menu = document.querySelector("header nav");
const linksMenu = document.querySelectorAll("header nav a");

// Barra superior que conecta as duas frentes da FLX no mesmo site.
(function criarNavegacaoFLX() {
    if (document.querySelector(".flx-network-root")) return;

    const barra = document.createElement("div");
    barra.className = "flx-network-root";
    barra.setAttribute("aria-label", "Navegação entre marcas FLX");
    barra.innerHTML = `
        <div class="flx-network-root__inner">
            <span class="flx-network-root__label">FLX</span>
            <div class="flx-network-root__links">
                <a class="flx-network-root__link ativo" href="./" aria-current="page">FLX STORE</a>
                <a class="flx-network-root__link" href="imports/">FLX IMPORTS</a>
            </div>
        </div>
    `;

    document.body.insertBefore(barra, document.body.firstChild);

    const estilos = document.createElement("style");
    estilos.textContent = `
        .flx-network-root {
            position: sticky;
            top: 0;
            z-index: 1200;
            background: #030303;
            border-bottom: 1px solid #1f1f1f;
        }

        .flx-network-root__inner {
            min-height: 42px;
            padding: 0 6%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            max-width: 1500px;
            margin: 0 auto;
        }

        .flx-network-root__label {
            color: #777;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 4px;
        }

        .flx-network-root__links {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .flx-network-root__link {
            min-height: 42px;
            padding: 0 14px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            color: #777;
            text-decoration: none;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2px;
            transition: .25s ease;
        }

        .flx-network-root__link:hover,
        .flx-network-root__link.ativo {
            color: #fff;
            background: #0b0b0b;
            border-color: #1c1c1c;
        }

        body > header {
            top: 42px;
        }

        @media (max-width: 520px) {
            .flx-network-root__inner {
                padding: 0 3%;
                justify-content: center;
            }

            .flx-network-root__label {
                display: none;
            }

            .flx-network-root__link {
                padding: 0 10px;
                font-size: 9px;
                letter-spacing: 1.3px;
            }
        }
    `;
    document.head.appendChild(estilos);
})();

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
        const aberto = menu.classList.toggle("ativo");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
}

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        if (menu) menu.classList.remove("ativo");
        if (botaoMenu) {
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
        }
    });
});
