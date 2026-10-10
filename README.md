# LoopVideo · site de vendas

Página de vendas do LoopVideo (app para Windows que transforma uma foto num vídeo da pessoa falando, em loop, sem emenda à vista).
Site estático: `index.html` + `assets/` (CSS, JS, fontes, imagens e vídeos). Sem build.

**Status: prévia online em https://rafaguiar-dev.github.io/loopvideo-site/ (GitHub Pages, `noindex`, com placeholders de oferta). Ainda não é o site oficial.**

## Rodar local

Precisa de um servidor com suporte a Range (senão os vídeos não aceitam pulo). Use uma porta livre que não seja a 8765:

```bash
npx --yes http-server@14.1.1 . -p 8790 -c-1
```

Abra http://localhost:8790.

## Onde trocar preço, links e garantia

Tudo fica no objeto `CONFIG`, no topo de `assets/js/main.js`:

| campo | onde aparece |
| --- | --- |
| `plano` | ao lado do nome do plano Individual (hoje "Plano anual") |
| `preco`, `periodo`, `precoAncora`, `parcelas` | card Individual. Valor vazio (`""`) esconde o item (hoje sem preço riscado) |
| `qtdPcs` | card Individual e FAQ (hoje 2 PCs, sem uso ao mesmo tempo) |
| `diasGarantia` | card Individual e FAQ |
| `linkCheckout` | botões "Quero o Individual" (planos e chamada final); os botões "Ver planos" levam até os planos |
| `linkContato` | "Falar com a gente" do Empresarial, "Sou agência ou operação" e "Não achou?" da FAQ |
| `plataformaPagamento`, `emailSuporte` | FAQ e rodapé |

Enquanto um campo estiver entre colchetes (`[PREÇO]`), ele aparece destacado em amarelo na página. O item
`[CONFIRMAR itens do Empresarial]` também: valide a lista do card e apague do `index.html`.

O texto do exemplo de Prova visual (nos 4 idiomas) fica em `ARTIGO`, logo abaixo do `CONFIG`.

## Mídia (o que é real e o que confirmar)

- `assets/exemplos/medico-*` e `assets/exemplos/loops/`: vídeos reais gerados pelo app. A página diz que os
  personagens foram criados por IA; mantenha só se for verdade pra todos.
- `assets/exemplos/campanha/`: saída real da aba Mockup (Melt Peak): a foto do pote que entrou, as cenas e os vídeos.
  Produto de cliente, liberado pelo dono pra aparecer.
- `assets/exemplos/imagens/textos-*`: entrada e saída reais de "Remover textos" (aba Imagens). Confirme que a pessoa
  da imagem é personagem de IA.
- Prova visual: o exemplo é HTML com veículo fictício ("Vida & Bem-estar"), porque as saídas reais usam nomes de
  veículos de verdade e não podem ir pra um site público.
- A janela do app em "Como funciona" é uma ilustração em HTML fiel à interface, simplificada de propósito (sem custos,
  modelos nem detalhes internos).
- `assets/img/marcas/`: logos de Magnific (aparece como "Magnific, antiga Freepik": freepik.com hoje redireciona pra
  Magnific), Higgsfield e Dreamface (seção "Por que ele existe"), tirados dos sites oficiais em 2026-10-10. Uso
  só nominativo ("funciona com"), com a nota de que o LoopVideo não tem vínculo com elas.

## Estrutura

- `index.html`: a página. Seções: hero, público, exemplos, por que ele existe (automação, tempo, contas de IA e Dreamface), como funciona, onde ele trabalha, ferramentas (Mockup,
  Prova visual, Imagens), planos, FAQ, chamada final e rodapé.
- `assets/css/site.css`: identidade "Noite infinita" (cores e curvas do app).
- `assets/js/main.js`: `CONFIG`, vídeos sob demanda (tocam só quando visíveis; com "reduzir movimento" nada toca
  sozinho), passos do "Como funciona", abas do Mockup e idiomas da Prova visual. Sem dependências externas.
- `assets/fonts/`: Geist e Geist Mono (licença OFL em `assets/fonts/OFL.txt`).
- `assets/exemplos/`: os exemplos reais.
- `COPY.md`: copy e pesquisa da versão 2 (histórico; o texto atual está no `index.html`).
- `_review/` (fora do git): auditoria do Codex e pesquisa de referências que guiaram a versão 3.
- `motion/`: projetos HyperFrames. `motion/og` gera a imagem de compartilhamento (`npx hyperframes snapshot --at 0.5`);
  `motion/hero` era o vídeo de abertura da versão 2 e não é mais usado pela página.
