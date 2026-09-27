const projetos = [
    {
        imagem: "assets/educacao-inclusiva.png",
        descricaoImagem: "Ilustração de estudantes e cadeiras de rodas com o título Educação Inclusiva",
        titulo: "Educação inclusiva",
    },
    {
        imagem: "assets/projeto-inclusao.jpg",
        descricaoImagem: "Cartaz de mobilização por uma educação inclusiva",
        titulo: "Mobilização pela inclusão",
    },
    {
        imagem: "assets/campanha-escola.jpg",
        descricaoImagem: "Cartaz com a mensagem Todas as escolas são para todos os alunos",
        titulo: "Escola para todos",
    },
    {
        imagem: "assets/acao-sustentavel.png",
        descricaoImagem: "Mãos segurando uma muda de planta com símbolos de ações sociais",
        titulo: "Ações sociais",
    },
];

export function inicializarProjetos() {
    const galeria = document.getElementById("galeriaProjetos");
    const modelo = document.getElementById("modeloProjeto");

    if (!(galeria instanceof HTMLElement)) {
        throw new Error("A galeria de projetos não foi encontrada.");
    }

    if (!(modelo instanceof HTMLTemplateElement)) {
        throw new Error("O template dos projetos não foi encontrado.");
    }

    const primeiroElemento = modelo.content.firstElementChild;
    if (!(primeiroElemento instanceof HTMLElement) || primeiroElemento.tagName !== "FIGURE") {
        throw new Error("O template precisa conter um cartão <figure>.");
    }

    const fragmento = document.createDocumentFragment();

    projetos.forEach((projeto) => {
        const cartao = primeiroElemento.cloneNode(true);
        const imagem = cartao.querySelector("img");
        const legenda = cartao.querySelector("figcaption");

        if (!(imagem instanceof HTMLImageElement) || !(legenda instanceof HTMLElement)) {
            throw new Error("O cartão do projeto precisa conter imagem e legenda.");
        }

        imagem.src = projeto.imagem;
        imagem.alt = projeto.descricaoImagem;
        legenda.textContent = projeto.titulo;
        fragmento.append(cartao);
    });

    galeria.replaceChildren(fragmento);
}
