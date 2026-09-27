import { inicializarFormulario } from "./formulario.js";
import { inicializarFeedback } from "./feedback.js";
import { inicializarModais } from "./modal.js";
import { inicializarNavegacao } from "./navegacao.js";
import { inicializarProjetos } from "./projetos.js";
import { inicializarRoteador } from "./roteador.js";

inicializarNavegacao();
inicializarRoteador();
inicializarProjetos();
const mostrarToast = inicializarFeedback();
const { abrirModalCadastro } = inicializarModais();

inicializarFormulario({ mostrarToast, abrirModalCadastro });
