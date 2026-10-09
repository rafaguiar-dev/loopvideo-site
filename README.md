# LoopVideo · site de vendas

Página de vendas do LoopVideo (app para Windows que transforma uma foto num vídeo da pessoa falando, em loop de 2:30).
Site estático: `index.html` + `assets/` (CSS, JS, fontes, imagens e vídeos). Sem build.

**Status: ainda não publicado.**

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
| `plano` | nome do plano Individual e resposta da FAQ "É assinatura?" (use "mensal" ou "vitalício") |
| `preco`, `precoAncora`, `parcelas` | card Individual |
| `qtdPcs` | card Individual e FAQ |
| `diasGarantia` | garantia, FAQ e chamada final |
| `linkCheckout` | botões "Quero o Individual" (oferta e chamada final); os botões do topo levam até a oferta |
| `linkContato` | botão "Falar com a gente" do Empresarial, "Sou agência ou operação", FAQ e rodapé |
| `plataformaPagamento`, `emailSuporte` | oferta, garantia, FAQ e rodapé |
| `duracaoMin`, `duracaoMax` | FAQ "Qual a duração do vídeo?" |

Enquanto um campo estiver entre colchetes (`[PREÇO]`), ele aparece destacado em amarelo na página. Os itens
`[CONFIRMAR]` (Empresarial, custos, garantia e FAQ) também aparecem em amarelo: valide e apague do `index.html`.

Os personagens que se revezam no celular do topo ficam em `HERO_LOOPS`, logo abaixo do `CONFIG`.

Antes de publicar: troque `og:image`/`twitter:image` no `<head>` pela URL absoluta do site (redes sociais não leem
caminho relativo) e, se quiser, adicione `<link rel="canonical">`.

## Mídia que precisa de autorização

- `assets/exemplos/mockup/` (cenas e vídeos do frasco e do pote): são saídas reais de produtos de clientes.
  **Peça autorização ou troque antes de publicar.** Ficam num bloco só no `index.html` (procure
  `MÍDIA DO MOCKUP`) e aparecem também na seção `esteira` e na `prova-visual` (`cena-01`, `cena-04`, `cena-06`, `cena-10`, `video-03`).
- `assets/exemplos/loops/` e o exemplo do especialista: vídeos gerados pelo app. A página diz que são personagens
  criados por IA; mantenha só se for verdade pra todos.
- `assets/exemplos/imagens/loira-antes.webp`: montagem feita pro site (legenda e marca d'água fictícias por cima do pôster).

## Estrutura

- `index.html`: a página, seções na ordem do `COPY.md` (ids iguais).
- `COPY.md`: texto da página e notas da oferta.
- `assets/css/site.css`: identidade "Noite infinita" (cores e curvas do app).
- `assets/js/main.js`: `CONFIG`, animações (GSAP + ScrollTrigger via CDN), vídeos sob demanda, comparador e abas.
- `assets/fonts/`: Geist e Geist Mono (licença OFL em `assets/fonts/OFL.txt`).
- `assets/video/`: vídeo de abertura feito com HyperFrames (MP4 H.264 + WebM) e pôster.
- `assets/exemplos/`: exemplos reais (o especialista, a parede de loops, as saídas do Mockup e a imagem da aba Imagens).
- `motion/`: projetos HyperFrames dos vídeos. Para renderizar de novo, copie as entradas e rode `npm run render`
  dentro de cada pasta:
  - `motion/hero`: `assets/exemplos/medico-loop.mp4` → `motion/hero/assets/` (a foto já está lá).
  - `motion/og`: imagem de compartilhamento (`npx hyperframes snapshot --at 0.5`).
  Depois, recomprima com ffmpeg (ex.: `-c:v libx264 -crf 27 -movflags +faststart` e `-c:v libvpx-vp9 -crf 40 -b:v 0`).
