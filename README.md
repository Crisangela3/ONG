# Sementes do Futuro

Site estático de apresentação da ONG Sementes do Futuro. O projeto usa HTML,
CSS e módulos JavaScript nativos, com Vite como ferramenta de desenvolvimento
e build de produção.

## Desenvolvimento local

Instale as dependências e inicie o servidor de desenvolvimento:

```sh
npm install
npm run dev
```

Abra a URL local exibida pelo Vite. Não abra `index.html` diretamente com
`file://`, pois o projeto usa módulos ES.

## Build de produção

Gere os arquivos otimizados com:

```sh
npm run build
```

O Vite compila os módulos JavaScript, minifica JavaScript e CSS, processa as
referências estáticas e grava a versão de produção em `dist/`. Para testar
localmente o resultado gerado, execute `npm run preview`.

## Estrutura

- `index.html`: conteúdo, formulário, galeria e template dos cartões de projetos.
- `style.css`: identidade visual, layout responsivo e estilos de interação.
- `vite.config.js`: configuração do build e caminhos relativos para hospedagem estática.
- `package.json`: dependências e comandos de desenvolvimento, build e preview.
- `js/main.js`: ponto de entrada que inicializa os módulos.
- `js/navegacao.js`: menu responsivo.
- `js/roteador.js`: navegação entre seções e histórico do navegador.
- `js/formulario.js`: validação do formulário, mensagens junto aos campos e estados visuais de erro/sucesso durante o preenchimento.
- `js/persistencia-formulario.js`: restaura e salva, mediante consentimento, somente a opção de participação no navegador.
- `js/feedback.js`: notificações toast.
- `js/modal.js`: diálogos e gerenciamento de foco.
- `js/doacoes.js`: validação local do anexo demonstrativo, sem envio ou armazenamento.
- `js/projetos.js`: renderização da galeria usando os dados e o `<template>`.
- `assets/`: imagens do site.

Os dados de e-mail, telefone e WhatsApp exibidos no contato e na seção de
doações são fictícios e não recebem mensagens ou ligações. A imagem do QR Code
é decorativa, não é escaneável e não inicia pagamentos. Não use esses dados para
transferências nem para enviar comprovantes.

O formulário de comprovante é apenas uma demonstração local. Ele não transmite
nem armazena arquivos ou mensagens; para habilitar recebimento real, será
necessário configurar um serviço seguro e canais oficiais confirmados.

No cadastro, a persistência no `localStorage` é opcional e requer consentimento.
Somente a opção de participação (doação ou voluntariado) é salva e pode ser
apagada pelo próprio usuário. Nome, e-mail, data de nascimento, CPF, telefone,
endereço e mensagem não são persistidos.

## Fluxo de versionamento

O repositório remoto do projeto está no GitHub. Até o momento, o trabalho foi
feito principalmente na branch `main`; o fluxo abaixo é uma recomendação para
as próximas alterações, não uma descrição de práticas já realizadas:

1. Mantenha `main` como branch estável.
2. Crie uma branch por alteração, por exemplo `feat/acessibilidade` ou
   `docs/guia-de-uso`.
3. Use mensagens de commit objetivas, como `feat: adiciona atalho para o conteúdo`
   ou `docs: documenta publicação na Vercel`.
4. Abra um Pull Request para `main`, descreva a mudança, anexe evidências reais
   e registre os testes executados antes de integrar.

## Verificações antes da entrega

- Testar navegação, formulário, alerta, toast e modais com mouse e teclado.
- Testar links diretos com hash e os botões voltar/avançar do navegador.
- Conferir o menu, o conteúdo e o formulário em telas estreitas e largas.
- Confirmar que não há rolagem horizontal em telas móveis.
- Verificar foco visível, rótulos, textos alternativos e mensagens de erro junto aos campos, tanto durante o preenchimento quanto ao enviar o formulário.
- Auditar todas as páginas e estados com ferramentas de acessibilidade antes de
  declarar conformidade WCAG 2.1 nível AA.

### Pares de contraste revisados

Os seguintes pares usados na interface foram medidos pela fórmula de contraste
WCAG para texto normal:

| Texto | Fundo | Contraste |
| --- | --- | ---: |
| `#FFFFFF` | azul principal `#00757D` | 5,47:1 |
| `#FFFFFF` | azul escuro `#005F63` | 7,45:1 |
| `#333333` | laranja dos botões `#F28C28` | 5,15:1 |
| `#333333` | fundo de aviso `#FFF3E0` | 11,52:1 |

Essas medições cobrem pares selecionados, não uma certificação completa de
conformidade. Faça uma auditoria de todas as combinações, componentes e estados
antes de afirmar que o site atende integralmente à WCAG 2.1 AA.

## Publicação na Vercel

O projeto gera arquivos estáticos com Vite. Para publicar:

1. Crie ou use um repositório GitHub que contenha estes arquivos na raiz.
2. Na Vercel, importe o repositório, selecione o preset **Other**, configure o
   comando de instalação como `npm install`, o comando de build como
   `npm run build` e o diretório de saída como `dist`.
3. Faça o deploy e teste a URL gerada, incluindo a navegação por hash, imagens e
   formulário. O formulário apenas valida os dados no navegador; não os envia
   para um servidor.
4. Registre a URL publicada e evidências dos testes reais na entrega.

A URL atualmente publicada é <https://ong-swart-theta.vercel.app/>. Ela ainda
precisa receber e validar um novo deploy para refletir o build configurado
com Vite.
