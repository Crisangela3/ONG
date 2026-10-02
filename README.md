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

O repositório remoto do projeto está no GitHub. Nesta revisão, foi criada a
branch `develop` a partir de `main` e a branch
`feature/activity-iv-corrections` a partir de `develop`. A Issue #1 registra o
escopo, e o Pull Request #2 propõe integrar a branch de funcionalidade em
`develop`. O PR permanece aberto; ainda não foi feito o merge.

Nas próximas alterações, o fluxo planejado é registrar o escopo em uma Issue,
criar uma branch `feature/*` a partir de `develop`, usar commits objetivos e
abrir um Pull Request para revisão antes de integrar. A branch `main` deve
permanecer estável para a versão de produção.

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

O projeto gera arquivos estáticos com Vite. A configuração de build usada é
`npm install`, `npm run build` e diretório de saída `dist`.

Após o push da branch `feature/activity-iv-corrections`, a integração GitHub da
Vercel criou automaticamente um Preview e informou o estado **Ready** no
Pull Request #2. URL do Preview:
<https://ong-git-feature-activity-41d382-angela-cristina-silvas-projects.vercel.app>.
O estado e os detalhes do deploy podem ser consultados em **Deployments** na
Vercel ou no resumo de ambientes do Pull Request.

A URL de produção previamente publicada é
<https://ong-swart-theta.vercel.app/>. Ela não foi atualizada por este Pull
Request: o merge e a verificação do deploy de produção continuam pendentes.
O formulário apenas valida os dados no navegador; não os envia para um
servidor.
