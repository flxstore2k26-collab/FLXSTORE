const botaoMenu = document.getElementById("menu-mobile");
const menu = document.querySelector("header nav");
const linksMenu = document.querySelectorAll("header nav a");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", function () {
        menu.classList.toggle("ativo");
    });

}

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("ativo");

    });

});