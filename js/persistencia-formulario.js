const chavePreferenciaFormulario = "sementes-do-futuro:preferencia-participacao";
const opcoesParticipacao = new Set(["doacao", "voluntariado"]);

export function inicializarPersistenciaFormulario() {
    const formulario = document.getElementById("formularioCadastro");
    const campoParticipacao = document.getElementById("interesse");
    const consentimento = document.getElementById("guardarPreferencia");
    const botaoLimpar = document.getElementById("limparPreferencia");
    const status = document.getElementById("statusPersistenciaFormulario");

    if (!(formulario instanceof HTMLFormElement)
        || !(campoParticipacao instanceof HTMLSelectElement)
        || !(consentimento instanceof HTMLInputElement)
        || !(botaoLimpar instanceof HTMLButtonElement)
        || !(status instanceof HTMLElement)) {
        throw new Error("Os controles de persistência da preferência estão incompletos.");
    }

    function anunciar(mensagem) {
        status.textContent = mensagem;
        status.hidden = false;
    }

    function informarFalha(acao, error) {
        if (!(error instanceof DOMException)) throw error;
        anunciar(`O navegador não permitiu ${acao} a preferência (${error.name}).`);
    }

    function removerPreferencia({ anunciarRemocao = false } = {}) {
        try {
            window.localStorage.removeItem(chavePreferenciaFormulario);
            if (anunciarRemocao) {
                anunciar("A opção salva foi apagada deste navegador.");
            }
            return true;
        } catch (error) {
            informarFalha("apagar", error);
            return false;
        }
    }

    function carregarPreferencia() {
        let preferenciaSalva;
        try {
            preferenciaSalva = window.localStorage.getItem(chavePreferenciaFormulario);
        } catch (error) {
            informarFalha("ler", error);
            return;
        }

        if (preferenciaSalva === null) return;

        let dados;
        try {
            dados = JSON.parse(preferenciaSalva);
        } catch (error) {
            if (!(error instanceof SyntaxError)) throw error;
            removerPreferencia();
            anunciar("A opção salva estava inválida e foi removida.");
            return;
        }

        if (typeof dados !== "object"
            || dados === null
            || dados.versao !== 1
            || dados.consentimento !== true
            || !opcoesParticipacao.has(dados.participacao)) {
            removerPreferencia();
            anunciar("A opção salva não era válida e foi removida.");
            return;
        }

        campoParticipacao.value = dados.participacao;
        consentimento.checked = true;
        anunciar("Sua opção de participação salva foi restaurada neste navegador.");
    }

    function salvarPreferencia() {
        if (!consentimento.checked) {
            removerPreferencia();
            return;
        }

        if (!opcoesParticipacao.has(campoParticipacao.value)) {
            anunciar("Selecione uma opção de participação válida antes de salvá-la.");
            return;
        }

        const dados = {
            versao: 1,
            participacao: campoParticipacao.value,
            consentimento: true,
        };

        try {
            window.localStorage.setItem(chavePreferenciaFormulario, JSON.stringify(dados));
            anunciar("Somente sua opção de participação foi salva neste navegador. Os demais dados não foram armazenados.");
        } catch (error) {
            informarFalha("salvar", error);
        }
    }

    consentimento.addEventListener("change", function () {
        if (!consentimento.checked) {
            removerPreferencia({ anunciarRemocao: true });
        } else {
            anunciar("A opção será salva somente após o cadastro ser validado.");
        }
    });

    botaoLimpar.addEventListener("click", function () {
        consentimento.checked = false;
        removerPreferencia({ anunciarRemocao: true });
    });

    carregarPreferencia();

    return { salvarPreferencia };
}
