export function inicializarFeedback() {
    const toast = document.getElementById("toast");
    const tituloToast = document.getElementById("tituloToast");
    const mensagemToast = document.getElementById("mensagemToast");
    let temporizadorToast;

    function esconderToast() {
        toast.hidden = true;
        temporizadorToast = undefined;
    }

    function mostrarToast(titulo, mensagem) {
        clearTimeout(temporizadorToast);
        tituloToast.textContent = titulo;
        mensagemToast.textContent = mensagem;
        toast.hidden = false;
        temporizadorToast = setTimeout(esconderToast, 4000);
    }

    function fecharToast() {
        clearTimeout(temporizadorToast);
        esconderToast();
    }

    document.getElementById("btn-toast").addEventListener("click", function () {
        mostrarToast("Operação concluída!", "A ação foi realizada com sucesso.");
    });

    document.getElementById("fecharToast").addEventListener("click", fecharToast);

    return mostrarToast;
}
