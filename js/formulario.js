export function inicializarFormulario({ mostrarToast, abrirModalCadastro }) {
    const formulario = document.getElementById("formularioCadastro");
    const alertaFeedback = document.getElementById("alertaFeedback");
    const tituloAlertaFeedback = document.getElementById("tituloAlertaFeedback");
    const mensagemAlertaFeedback = document.getElementById("mensagemAlertaFeedback");
    const listaErrosCadastro = document.getElementById("listaErrosCadastro");
    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

    function mensagemDeValidacao(controle) {
        if (controle.validity.valueMissing) {
            return controle.tagName === "SELECT"
                ? "Selecione uma opção."
                : "Este campo é obrigatório.";
        }
        if (controle.validity.typeMismatch && controle.type === "email") {
            return "Informe um endereço de e-mail válido.";
        }
        if (controle.validity.patternMismatch) {
            const mensagensPorCampo = {
                cpf: "Informe o CPF no formato 000.000.000-00.",
                telefone: "Informe o telefone no formato (11) 99999-9999.",
                cep: "Informe o CEP no formato 00000-000."
            };
            return mensagensPorCampo[controle.name] || "Confira o formato informado.";
        }
        if (controle.validity.rangeUnderflow) {
            return `Informe um valor igual ou maior que ${controle.min}.`;
        }
        if (controle.validity.rangeOverflow) {
            return `Informe um valor igual ou menor que ${controle.max}.`;
        }
        if (controle.validity.badInput) {
            return "Informe um valor válido.";
        }
        return "Confira este campo.";
    }

    function mostrarAlerta({ focar = true } = {}) {
        const controles = Array.from(formulario.querySelectorAll("input, select, textarea"));
        const invalidos = controles.filter((controle) => !controle.validity.valid);

        controles.forEach((controle) => {
            if (controle.validity.valid) {
                controle.removeAttribute("aria-invalid");
            } else {
                controle.setAttribute("aria-invalid", "true");
            }
        });

        listaErrosCadastro.replaceChildren();
        alertaFeedback.classList.toggle("alerta-aviso", invalidos.length > 0);
        alertaFeedback.classList.toggle("alerta-sucesso", invalidos.length === 0);

        if (invalidos.length > 0) {
            tituloAlertaFeedback.textContent = "Atenção";
            mensagemAlertaFeedback.textContent = "Corrija os campos indicados antes de continuar:";
            invalidos.forEach((controle) => {
                const item = document.createElement("li");
                const link = document.createElement("a");
                const rotulo = (controle.labels[0]?.textContent.trim() || controle.name).replace(/:\s*$/, "");
                link.href = `#${controle.id}`;
                link.textContent = `${rotulo}: ${mensagemDeValidacao(controle)}`;
                item.append(link);
                listaErrosCadastro.append(item);
            });
        } else {
            tituloAlertaFeedback.textContent = "Cadastro verificado";
            mensagemAlertaFeedback.textContent = "Nenhum erro foi encontrado no cadastro.";
        }

        alertaFeedback.hidden = false;

        if (focar) {
            alertaFeedback.scrollIntoView({
                behavior: movimentoReduzido.matches ? "auto" : "smooth",
                block: "start",
            });
            alertaFeedback.focus({ preventScroll: true });
        }
    }

    function atualizarEstadoDoCampo(event) {
        const controle = event.target;
        if (!(controle instanceof HTMLInputElement || controle instanceof HTMLSelectElement || controle instanceof HTMLTextAreaElement)) {
            return;
        }

        if (controle.validity.valid) {
            controle.removeAttribute("aria-invalid");
        } else {
            controle.setAttribute("aria-invalid", "true");
        }

        if (!alertaFeedback.hidden) mostrarAlerta({ focar: false });
    }

    document.getElementById("btn-alert").addEventListener("click", mostrarAlerta);
    document.getElementById("fecharAlerta").addEventListener("click", function () {
        alertaFeedback.hidden = true;
    });

    listaErrosCadastro.addEventListener("click", function (event) {
        const link = event.target.closest("a");
        if (!link) return;

        const controle = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!controle) return;

        event.preventDefault();
        controle.focus();
        controle.scrollIntoView({
            behavior: movimentoReduzido.matches ? "auto" : "smooth",
            block: "center",
        });
    });

    formulario.addEventListener("input", atualizarEstadoDoCampo);
    formulario.addEventListener("change", atualizarEstadoDoCampo);

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!formulario.checkValidity()) {
            mostrarAlerta();
            return;
        }
        formulario.querySelectorAll("[aria-invalid]").forEach((controle) => {
            controle.removeAttribute("aria-invalid");
        });
        alertaFeedback.hidden = true;

        mostrarToast("Formulário validado!", "Este é um exemplo visual; os dados não foram enviados.");
        abrirModalCadastro();
    });
}
