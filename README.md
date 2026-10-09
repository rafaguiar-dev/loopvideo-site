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

## Onde trocar preço, link e garantia

Tudo fica no objeto `CONFIG`, no topo de `assets/js/main.js`:

| campo | onde aparece |
| --- | --- |
| `plano` | nome do plano na oferta e resposta da FAQ "É assinatura?" (use "mensal" ou "vitalício") |
| `preco`, `precoAncora`, `parcelas` | cartão da oferta |
| `qtdPcs` | oferta e FAQ |
| `diasGarantia` | garantia, FAQ e chamada final |
| `linkCheckout` | botões "Quero o LoopVideo" da oferta e da chamada final (os do topo levam até a oferta) |
| `plataformaPagamento`, `emailSuporte` | oferta, garantia, FAQ e rodapé |

Enquanto um campo estiver entre colchetes (`[PREÇO]`), ele aparece destacado em amarelo na página. O HTML também
traz os mesmos colchetes, então dá pra achar tudo procurando por `[`.

Antes de publicar: troque `og:image`/`twitter:image` no `<head>` pela URL absoluta do site (redes sociais não leem
caminho relativo) e, se quiser, adicione `<link rel="canonical">`.

## Estrutura

- `index.html`: a página, seções na ordem do `COPY.md` (ids iguais).
- `COPY.md`: texto da página e notas da oferta.
- `assets/css/site.css`: identidade "Noite infinita" (cores e curvas do app).
- `assets/js/main.js`: `CONFIG`, animações (GSAP + ScrollTrigger via CDN), vídeos sob demanda, comparador e abas.
- `assets/fonts/`: Geist e Geist Mono (licença OFL em `assets/fonts/OFL.txt`).
- `assets/video/`: vídeos feitos com HyperFrames (MP4 H.264 + WebM) e pôsteres.
- `assets/exemplos/`: o exemplo real (foto de entrada e o loop gerado pelo app, sem som).
- `motion/`: projetos HyperFrames dos vídeos. Para renderizar de novo, copie as entradas e rode `npm run render`
  dentro de cada pasta:
  - `motion/hero`: `assets/exemplos/medico-loop.mp4` → `motion/hero/assets/` (a foto já está lá).
  - `motion/ferramentas`: `ui/guia_imagens.mp4`, `guia_prova.mp4`, `guia_mockup.mp4` do repositório do app → `motion/ferramentas/assets/`.
  - `motion/og`: imagem de compartilhamento (`npx hyperframes snapshot --at 0.5`).
  Depois, recomprima com ffmpeg (ex.: `-c:v libx264 -crf 27 -movflags +faststart` e `-c:v libvpx-vp9 -crf 40 -b:v 0`).
