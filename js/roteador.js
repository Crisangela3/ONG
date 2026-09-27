export function inicializarRoteador() {
    const conteudoPrincipal = document.querySelector("main");
    const menuPrincipal = document.getElementById("menuPrincipal");
    const secoes = Array.from(conteudoPrincipal.querySelectorAll(":scope > section"));
    const secoesPorId = new Map(secoes.map((secao) => [secao.id, secao]));
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hashRenderizado;

    conteudoPrincipal.classList.add("spa-ativo");

    function resolverRota(hash) {
        let id;
        try {
            id = decodeURIComponent(hash.replace(/^#/, ""));
        } catch {
            return null;
        }

        const destino = document.getElementById(id);
        if (!destino || !conteudoPrincipal.contains(destino)) return null;

        const secao = destino.matches("section") ? destino : destino.closest("section");
        if (!secao || !secoesPorId.has(secao.id)) return null;

        return { secao, destino };
    }

    function renderizarRota(hash, { focar = false, rolar = focar } = {}) {
        const rota = resolverRota(hash);
        if (!rota) return false;

        secoes.forEach((secao) => {
            secao.hidden = secao !== rota.secao;
        });

        menuPrincipal.querySelectorAll('a[aria-current="page"]').forEach((link) => {
            link.removeAttribute("aria-current");
        });
        Array.from(menuPrincipal.querySelectorAll("a")).find((link) => link.hash === `#${rota.destino.id}`)?.setAttribute("aria-current", "page");

        if (hashRenderizado !== hash) {
            rota.secao.classList.remove("spa-route-enter");
            void rota.secao.offsetWidth;
            rota.secao.classList.add("spa-route-enter");
            hashRenderizado = hash;
        }

        if (focar) {
            const destinoDeFoco = rota.destino.matches("section")
                ? rota.secao.querySelector("h2")
                : rota.destino;
            if (destinoDeFoco) {
                destinoDeFoco.tabIndex = -1;
                destinoDeFoco.focus({ preventScroll: true });
            }
        }

        if (rolar) {
            const destinoDeRolagem = rota.destino.matches("section") ? rota.secao : rota.destino;
            destinoDeRolagem.scrollIntoView({
                behavior: movimentoReduzido.matches ? "auto" : "smooth",
                block: "start",
            });
        }

        return true;
    }

    function renderizarRotaAtual() {
        const hash = window.location.hash || "#sobre";
        if (!renderizarRota(hash, { rolar: Boolean(window.location.hash) })) {
            window.history.replaceState(null, "", "#sobre");
            renderizarRota("#sobre", { rolar: true });
        }
    }

    menuPrincipal.addEventListener("click", function (event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        const hash = link.getAttribute("href");
        if (!resolverRota(hash)) return;

        event.preventDefault();
        if (window.location.hash !== hash) {
            window.history.pushState(null, "", hash);
        }
        renderizarRota(hash, { focar: true });
    });

    window.addEventListener("popstate", renderizarRotaAtual);
    window.addEventListener("hashchange", renderizarRotaAtual);
    renderizarRotaAtual();
}
