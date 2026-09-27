const tamanhoMaximoArquivo = 5 * 1024 * 1024;
const tiposPermitidos = new Set([
    "application/pdf",
    "image/avif",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/webp",
]);

export function inicializarEnvioComprovante() {
    const formulario = document.getElementById("formularioComprovante");
    const campoArquivo = document.getElementById("arquivoComprovante");
    const status = document.getElementById("statusComprovante");

    if (!(formulario instanceof HTMLFormElement)
        || !(campoArquivo instanceof HTMLInputElement)
        || !(status instanceof HTMLElement)) {
        throw new Error("O formulário demonstrativo de comprovante está incompleto.");
    }

    function anunciar(mensagem) {
        status.textContent = mensagem;
        status.hidden = false;
    }

    campoArquivo.addEventListener("change", function () {
        const arquivo = campoArquivo.files[0];
        if (!arquivo) {
            campoArquivo.setCustomValidity("");
            status.hidden = true;
            return;
        }

        if (!tiposPermitidos.has(arquivo.type)) {
            campoArquivo.setCustomValidity("Selecione uma imagem PNG, JPEG, GIF, WebP, AVIF ou um arquivo PDF.");
            campoArquivo.reportValidity();
            campoArquivo.value = "";
            anunciar("Formato não aceito. Escolha uma imagem ou um arquivo PDF.");
            return;
        }

        if (arquivo.size > tamanhoMaximoArquivo) {
            campoArquivo.setCustomValidity("O arquivo deve ter no máximo 5 MB.");
            campoArquivo.reportValidity();
            campoArquivo.value = "";
            anunciar("O arquivo ultrapassa o limite de 5 MB. Escolha outro arquivo.");
            return;
        }

        campoArquivo.setCustomValidity("");
        anunciar(`Arquivo selecionado: ${arquivo.name}. Ele permanece neste dispositivo e não foi enviado.`);
    });

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!formulario.reportValidity()) return;

        anunciar("Demonstração concluída: nenhum arquivo ou mensagem foi enviado ou armazenado. Para uma confirmação real, use somente os canais oficiais da ONG.");
        status.focus();
    });
}
