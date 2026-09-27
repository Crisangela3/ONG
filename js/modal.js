export function inicializarModais() {
    const formulario = document.getElementById("formularioCadastro");
    const modalCadastro = document.getElementById("modal");
    const botaoFecharModalCadastro = document.getElementById("fecharModal");
    const modalFeedback = document.getElementById("modalFeedback");
    const tituloModalFeedback = document.getElementById("tituloModalFeedback");
    const botaoAbrirModalFeedback = document.getElementById("btn-modal");

    let focoAnteriorCadastro;
    let focoAnteriorFeedback;

    function abrirModalFeedback() {
        focoAnteriorFeedback = document.activeElement;
        modalFeedback.hidden = false;
        tituloModalFeedback.focus();
    }

    function fecharModalFeedback() {
        if (modalFeedback.hidden) return;
        modalFeedback.hidden = true;
        (focoAnteriorFeedback || botaoAbrirModalFeedback).focus();
    }

    function abrirModalCadastro() {
        focoAnteriorCadastro = document.activeElement;
        modalCadastro.hidden = false;
        botaoFecharModalCadastro.focus();
    }

    function fecharModalCadastro() {
        if (modalCadastro.hidden) return;
        modalCadastro.hidden = true;
        (focoAnteriorCadastro || formulario.querySelector('[type="submit"]')).focus();
    }

    botaoAbrirModalFeedback.addEventListener("click", abrirModalFeedback);
    document.getElementById("entendiModal").addEventListener("click", fecharModalFeedback);
    document.getElementById("fecharModalFeedback").addEventListener("click", fecharModalFeedback);

    botaoFecharModalCadastro.addEventListener("click", fecharModalCadastro);
    modalCadastro.addEventListener("click", function (event) {
        if (event.target === modalCadastro) fecharModalCadastro();
    });
    modalFeedback.addEventListener("click", function (event) {
        if (event.target === modalFeedback) fecharModalFeedback();
    });

    document.addEventListener("keydown", function (event) {
        if (!modalFeedback.hidden) {
            if (event.key === "Escape") fecharModalFeedback();
            if (event.key === "Tab") {
                const botoes = modalFeedback.querySelectorAll("button:not(:disabled)");
                const primeiroBotao = botoes[0];
                const ultimoBotao = botoes[botoes.length - 1];

                if (event.shiftKey && (document.activeElement === primeiroBotao || document.activeElement === tituloModalFeedback)) {
                    event.preventDefault();
                    ultimoBotao.focus();
                } else if (!event.shiftKey && document.activeElement === ultimoBotao) {
                    event.preventDefault();
                    primeiroBotao.focus();
                }
            }
            return;
        }

        if (!modalCadastro.hidden) {
            if (event.key === "Escape") fecharModalCadastro();
            if (event.key === "Tab") {
                event.preventDefault();
                botaoFecharModalCadastro.focus();
            }
        }
    });

    return { abrirModalCadastro };
}
