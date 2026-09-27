export function inicializarNavegacao() {
    const cabecalhoTopo = document.getElementById("cabecalhoTopo");
    const botaoMenu = document.getElementById("alternarMenu");
    const menuPrincipal = document.getElementById("menuPrincipal");

    function definirMenuAberto(aberto) {
        cabecalhoTopo.classList.toggle("cabecalho__topo--menu-aberto", aberto);
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu de navegação" : "Abrir menu de navegação");
    }

    botaoMenu.addEventListener("click", function () {
        definirMenuAberto(botaoMenu.getAttribute("aria-expanded") !== "true");
    });

    menuPrincipal.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            definirMenuAberto(false);
            menuPrincipal.querySelectorAll("details[open]").forEach((detalhes) => {
                detalhes.open = false;
            });
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
            definirMenuAberto(false);
            botaoMenu.focus();
        }
    });

    window.matchMedia("(min-width: 769px)").addEventListener("change", function (event) {
        if (event.matches) definirMenuAberto(false);
    });
}
