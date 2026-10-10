# LoopVideo · copy da página de vendas (versão 2)

> **Histórico.** A versão 3 (out/2026) refez a estrutura no padrão de páginas de SaaS/plugin e o texto atual está
> direto no `index.html`. A pesquisa de Direct Response no fim deste arquivo continua valendo.

> Fonte dos fatos: README público, Guia do usuário e o app (`ui/index.html`). Pesquisa de mercado no fim do arquivo.
> Tudo entre colchetes (`[ASSIM]`) é placeholder. `[CONFIRMAR]` = o dono precisa validar antes de publicar.
> Convenção: `|` separa itens de uma lista curta (chips, menu). Listas longas vêm em linhas com `-`.
> `visual:` é sugestão pro designer. Ele decide o resto.

## Big idea

**O rosto da sua VSL não acaba.** IA de vídeo entrega segundos; VSL dura minutos. O LoopVideo transforma uma foto
num apresentador que fala do primeiro ao último minuto, sem emenda à vista. Em volta dele, as peças que todo funil de
Direct Response precisa: a matéria da presell, o produto em cena e o criativo no formato certo. Uma linha de produção
de criativos, num app só.

## Ordem das seções (final)

1. `[nav]`
2. `[hero]` · promessa + vídeo rodando com contador
3. `[ticker]` · faixa de vocabulário de DR
4. `[resultado]` · "Ache a emenda" (prova antes do argumento)
5. `[galeria]` · parede com ~10 loops reais
6. `[problema]` · a dor de quem edita VSL e testa criativo
7. `[demo]` · a foto que entrou × o vídeo que saiu
8. `[video-proprio]` · já tem um take? fecha o loop
9. `[esteira]` · as 4 ferramentas no funil (anúncio → presell → VSL → página)
10. `[prova-visual]`
11. `[mockup]`
12. `[imagens]`
13. `[fatos]` · faixa de números, como respiro antes da parte racional
14. `[antes-depois]` · sem × com
15. `[para-quem]`
16. `[dia-a-dia]`
17. `[custos]`
18. `[oferta]` · Individual + Empresarial
19. `[garantia]`
20. `[faq]`
21. `[cta-final]`
22. `[rodape]`
23. `[seo]`

Por que essa ordem: quem chega de anúncio quer ver o vídeo antes de ler. Então o resultado e a galeria vêm logo
depois do hero, o argumento vem em seguida, e as outras ferramentas entram como "e tem mais" antes do preço.
`[fatos]` saiu do topo porque o hero já faz esse papel.

---

## [nav] Menu

itens:
- Ache a emenda → #resultado
- Exemplos → #galeria
- Ferramentas → #esteira
- Preço → #oferta
- Dúvidas → #faq

botao: Quero o LoopVideo

---

## [hero] Topo

eyebrow: App para Windows · feito pra quem vive de VSL e criativo

titulo: Uma foto vira o rosto da sua VSL. E ele não para de falar.

sub: Solte a imagem, aprove o take e receba o apresentador falando na duração que a sua VSL pede, sem emenda à vista. No mesmo app: presell, produto em cena e criativo no formato certo.

cta_primario: Quero o LoopVideo
cta_secundario: Tentar achar a emenda

chips:
- Você aprova antes de gastar
- Custo na tela antes do clique
- Roda na sua conta Magnific

requisitos: Windows 10 ou 11 (64 bits) · internet · conta Magnific com créditos

contador_visual: falando há 00:00:00
(o contador sobe sem parar enquanto o vídeo roda; ver `visual`)

legendas_visual:
- 1: Uma foto
- 2: Um apresentador
- 3: Sem fim à vista

visual: Celular com um loop real tocando e um contador de tempo que nunca zera ("falando há 04:12…"). Ao lado, pequena, a foto que entrou.

---

## [ticker] Faixa rolando

- Fundo de VSL
- Rosto de especialista
- Criativo estilo UGC
- Presell em minutos
- Advertorial em qualquer idioma
- Pote em cena, sem estúdio
- B-roll de 5 s
- 9:16 · 4:5 · 16:9
- Sem legenda queimada
- Você aprova antes de gastar
- Custo antes do clique
- Fila de criativos
- Retoma de onde parou

---

## [resultado] Ache a emenda

eyebrow: Desafio

titulo: Ache a emenda.

sub: Este vídeo está em loop agora. Toque quando ele voltar ao começo.

botao: Achei

resposta_1: Tem certeza? Olha de novo.
resposta_2: Ele já voltou ao começo [N] vezes enquanto você olhava.
resposta_3: É isso que vai rodar atrás da sua narração.

contador: voltas: [N] · falando há [TEMPO]

nota: Vídeo real gerado pelo LoopVideo, sem edição depois.

visual: Um vídeo grande, sem barra de progresso nem timecode do player (pra não denunciar o reinício). Botão "Achei" embaixo; cada toque mostra a próxima resposta. O contador de voltas é calculado pela duração real do ciclo, sem mostrar onde ele está.

---

## [galeria] Parede de exemplos

eyebrow: Rodando agora

titulo: Qualquer rosto que a sua oferta pedir.

sub: Dez vídeos reais saídos do app, em loop. Todos personagens de IA, todos sem áudio: o fundo da sua narração.

rotulos (um por vídeo, sem nome de pessoa):
- Especialista de jaleco
- Laboratório
- Bloco cirúrgico
- Depoimento em casa (mãe e bebê)
- Cozinha
- Apresentador
- Campo / rural
- UGC
- Selfie
- Casual

filtros (opcional, chips acima da parede): Todos | Especialista | UGC | Depoimento | Estilo de vida

cta: Quero o meu rosto de VSL

nota: Exemplos gerados com o LoopVideo a partir de personagens criados por IA. O resultado varia com a imagem usada.

visual: Grade tipo mosaico, todos tocando mudos ao mesmo tempo, rótulo pequeno no canto de cada um. Sem play: já entram rodando.

---

## [problema] O problema

eyebrow: O problema

titulo: A VSL tem minutos. O vídeo de IA tem segundos.

paragrafo: Quem edita VSL conhece o resto. Ou você grava com alguém, ou junta trechos de IA na timeline até fechar o tempo e torce pra ninguém notar o pulo. E o criativo que vendeu ontem cansa na semana que vem.

dores:
- ✕ Ator ou especialista pra agendar, gravar e pagar
- ✕ Vídeo de IA que acaba antes do lead
- ✕ Pulo visível bem no meio da história
- ✕ Crédito gasto num take que você nem aprovou
- ✕ Presell, mockup e formato espalhados em cinco ferramentas

virada: O LoopVideo cuida do fundo. Você cuida da copy.

---

## [demo] Exemplo real

titulo: Entrou uma foto. Saiu o especialista.

sub: A imagem que entrou e o vídeo que saiu do app. Arraste e compare.

rotulo_antes: A foto
rotulo_depois: O vídeo

nota_rodape: Exemplo gerado com o LoopVideo a partir de personagem criado por IA. O resultado varia com a imagem e com a IA escolhida.

visual: Comparador arrastável (já existe). Contador "falando há" rodando no lado do vídeo.

---

## [video-proprio] Já tem um take?

titulo: Já tem um take bom? O app só fecha o loop.

texto: Solte o seu vídeo no lugar da foto. Ele vira um loop sem emenda à vista, por menos da metade do custo.

chip: cerca de 325 créditos em vez de 775

---

## [esteira] Linha de produção de criativos

eyebrow: Do anúncio à página

titulo: Quatro ferramentas. O funil inteiro.

sub: Em Direct Response, cada etapa pede uma peça diferente. O LoopVideo faz as quatro, e o resultado de uma vira a entrada da próxima.

etapas:
- etapa: Anúncio
  pede: Volume. Hook novo, ângulo novo, formato certo pra cada posicionamento.
  ferramentas: Mockup (vídeos de 5 s) · Imagens (9:16, 4:5, 16:9) · Vídeos (rosto falando)
- etapa: Presell / advertorial
  pede: Cara de matéria, não de anúncio.
  ferramentas: Prova visual
- etapa: VSL
  pede: Um rosto do começo ao fim, b-roll e prova na tela.
  ferramentas: Vídeos · Mockup · Prova visual
- etapa: Página de vendas
  pede: Produto em cena e imagens limpas.
  ferramentas: Mockup · Imagens

fecho: Teste mais ângulos sem abrir mais abas.

visual: Uma linha horizontal com 4 paradas (Anúncio → Presell → VSL → Página). Ao passar o mouse em cada parada, acendem os ícones das ferramentas que alimentam aquela etapa.

---

## [prova-visual] Prova visual

eyebrow: Prova visual · para presell, advertorial e VSL

titulo: A matéria que vem antes da VSL.

sub: Cole a copy ou uma matéria real e saia com uma página de portal, revista ou blog. Sem designer, no idioma da oferta.

bullets:
- **Presell com cara de editorial.** Portal, revista, jornal, blog, infográfico, newsletter, passo a passo.
- **Qualquer idioma.** O texto entra em português e a página sai em inglês, alemão, espanhol… Pronta pra escalar em outro país.
- **Prova de mídia de verdade.** Resuma uma matéria publicada e mostre na VSL, com o nome do veículo e o link no rodapé.
- **Sem fonte, não entra.** Estudo, número ou especialista só aparecem com fonte real. Se a copy citar sem fonte, o app recusa antes de gastar. Menos risco pra conta de anúncio.
- **Advertorial sinalizado.** No modo da marca, a página leva a etiqueta de publicidade do idioma.

frase_destaque: A prova que segura o lead, pronta em minutos.

cta: Quero fazer minhas presells

visual: Três páginas em leque (portal, revista, blog) com o mesmo texto em três idiomas. A etiqueta de publicidade visível em uma delas.

---

## [mockup] Mockup

eyebrow: Mockup · produto em cena

titulo: Seu pote em cena. Sem estúdio, sem fotógrafo.

sub: Suba a foto do frasco e escolha o nicho. Saem cenas do produto prontas pra criativo, VSL e página. As melhores viram vídeos de 5 s.

bullets:
- **Cenas por nicho.** Produto sozinho, com pessoa ou em ambiente de fábrica. Idade e sexo da pessoa já vêm do nicho.
- **Cores do seu pote.** A paleta da cena sai do rótulo, pra tudo parecer da mesma marca.
- **Sem texto no fundo.** A mesma imagem serve pra qualquer país.
- **De imagem a vídeo.** Marque as melhores e elas viram vídeos de 5 s, com movimento suave e o rótulo parado. B-roll pra VSL ou abertura de criativo.
- **Sempre cena nova.** Pediu mais? Saem variações da mesma cena, cada uma diferente.

frase_destaque: Um ângulo novo por dia sem marcar sessão de foto.

cta: Quero meu produto em cena

visual: Um pote de verdade à esquerda; à direita, uma grade de cenas geradas, uma delas virando vídeo de 5 s.

---

## [imagens] Imagens

eyebrow: Imagens · o criativo no formato certo

titulo: Cada posicionamento no formato certo.

sub: Pegue a imagem que você já tem e deixe pronta pro feed, pros Stories e pro YouTube. Sem refazer do zero.

bullets:
- **Muda o formato.** 9:16, 4:5, 16:9 e outros. A IA preenche o que falta, sem esticar.
- **Tira legenda e marca d'água.** Das suas peças, prints e exportações antigas, mantendo o resto igual.
- **Melhora a qualidade.** Mais detalhe, mais nitidez ou só a pele.
- **Antes e depois ilustrativo.** Para VSL e página, em ambientes diferentes.
- **Encadeia.** Limpa, muda o formato e melhora numa sequência só.

frase_destaque: Um criativo vencedor vira três posicionamentos.

nota: Use só imagens que são suas ou que você tem direito de usar. Antes e depois tem regra própria em cada plataforma de anúncio: confira antes de subir.

visual: A mesma imagem se desdobrando em 9:16, 4:5 e 16:9, com a legenda queimada sumindo na primeira passada.

---

## [fatos] Faixa de números

- valor: 1 foto
  rotulo: é o que entra
- valor: 0 pulos
  rotulo: à vista, do começo ao fim
- valor: 1 aprovação
  rotulo: antes de gastar o resto
- valor: 4 ferramentas
  rotulo: do anúncio à página

---

## [antes-depois] Sem × com

titulo: A mesma VSL, dois caminhos.

sem_loopvideo:
- Especialista pra agendar e gravar
- Trechos de IA colados na timeline
- Pulo que o público nota
- Crédito gasto antes de ver o take
- Presell com designer, foto com estúdio

com_loopvideo:
- Uma foto e um clique
- Um rosto do começo ao fim
- Sem emenda à vista
- Você aprova antes de gastar o resto
- Presell, mockup e formato no mesmo app

---

## [para-quem] Para quem é

titulo: Pra quem vive de criativo.

perfis:
- titulo: Editor de VSL
  frase: Entrega o fundo da VSL no mesmo dia, sem esperar gravação.
- titulo: Gestor de tráfego
  frase: Sobe criativo novo antes do atual cansar. Mais rostos, mais formatos, mais ângulos.
- titulo: Copywriter
  frase: Testa a copy com rosto, presell e prova sem depender de ninguém.
- titulo: Produtor e infoprodutor
  frase: Monta o funil de uma oferta nova sem montar uma equipe junto.
- titulo: Agência e operação
  frase: Fila de criativos rodando enquanto o time cuida do resto. Ver plano Empresarial.

---

## [dia-a-dia] No dia a dia

titulo: Roda enquanto você edita.

itens:
- titulo: Fila
  frase: Solte várias imagens. Ele gera uma depois da outra.
- titulo: Retoma sozinho
  frase: Fechou no meio? Continua de onde parou, sem cobrar de novo.
- titulo: Custo antes
  frase: Cada botão mostra os créditos antes do clique.
- titulo: Perto do relógio
  frase: Minimiza e segue gerando. O PC continua seu.
- titulo: Avisos do Windows
  frase: Pronto, erro ou esperando aprovação: o Windows te chama.
- titulo: Atualiza num clique
  frase: Versão nova aparece no app. Um clique e pronto.

---

## [custos] Custos, às claras

eyebrow: Transparência

titulo: Você paga a IA direto na fonte.

texto: A IA roda na sua conta Magnific, com o seu login. Os créditos saem de lá, sem margem nossa no meio. O app mostra o custo antes de cada clique.

linhas_custo:
- rotulo: Vídeo a partir de uma foto
  valor: cerca de 775 créditos
- rotulo: Loop a partir de um vídeo seu
  valor: cerca de 325 créditos
- rotulo: Refazer um take antes de aprovar
  valor: cerca de 450 créditos

destaque: O custo não muda com a duração do vídeo. [CONFIRMAR]

nota: Valores com as opções padrão. Outra IA ou 4K pode custar mais, e o app mostra a diferença antes de você gerar. Imagens, Prova visual e Mockup mostram o custo em cada botão.

---

## [oferta] Oferta

eyebrow: Planos

titulo: Escolha como você trabalha.

### Card 1 · Individual

nome_plano: Individual · [PLANO: mensal ou vitalício]

pra_quem: Pra editor, copywriter ou gestor que cria sozinho.

itens:
- ✓ Vídeos em loop a partir de uma foto, na duração que você escolher
- ✓ Loop a partir de um vídeo seu, por menos da metade do custo
- ✓ Você aprova o take antes de gastar o resto
- ✓ Prova visual: presell e advertorial em qualquer idioma
- ✓ Mockup: produto em cena e vídeos de 5 s
- ✓ Imagens: formato, limpeza, qualidade e antes e depois
- ✓ Fila, retomada e avisos do Windows
- ✓ Atualizações num clique · ativação em [QTD_PCS] PC(s)

preco_ancora: de [PREÇO_ANCORA]
preco: por [PREÇO]
parcelas: ou [PARCELAS]

cta: Quero o Individual
cta_link: [LINK_CHECKOUT]

pagamento_seguro: Pagamento pela [PLATAFORMA_PAGAMENTO]. O código de ativação chega no seu e-mail.

### Card 2 · Empresarial

nome_plano: Empresarial

pra_quem: Pra agências, operações e times de Direct Response.

titulo_card: Montado pro tamanho da sua operação.

itens:
- ✓ Tudo do Individual
- ✓ Mais máquinas, na quantidade que o time precisa [CONFIRMAR]
- ✓ Liberação das máquinas centralizada pelo seu time [CONFIRMAR]
- ✓ Onboarding da equipe [CONFIRMAR]
- ✓ Suporte prioritário [CONFIRMAR]
- ✓ Ajustes pro fluxo da operação, como prompts padrão por nicho [CONFIRMAR]

preco: Sob consulta

cta: Falar com a gente
cta_link: [LINK_CONTATO]

nota_card: Conte quantas pessoas e quantas ofertas rodam aí. A gente monta a proposta.

### Abaixo dos dois cards

requisitos: Windows 10 ou 11 (64 bits) · internet · conta Magnific com créditos (cobrados à parte, pela Magnific)

visual: Dois cards lado a lado. O Individual com preço e destaque principal; o Empresarial escuro, sem preço, com o botão de contato. No celular, Individual primeiro.

---

## [garantia] Garantia

titulo: [DIAS_GARANTIA] dias pra testar.

texto: Instale, gere seus vídeos e use as outras ferramentas. Não serviu pro seu trabalho? Peça o reembolso em até [DIAS_GARANTIA] dias pela [PLATAFORMA_PAGAMENTO] ou pelo [EMAIL_SUPORTE]. Os créditos gastos na Magnific são da sua conta lá e não entram no reembolso.

nota: Vale pro plano Individual. No Empresarial, as condições entram na proposta. [CONFIRMAR]

---

## [faq] Perguntas frequentes

- p: Qual a duração do vídeo?
  r: Você escolhe no app. O padrão é 2:30, e hoje dá pra ir de [DURAÇÃO_MIN] a [DURAÇÃO_MAX]. [CONFIRMAR]

- p: Dá pra perceber que é loop?
  r: O app foi feito pra a volta ao começo não aparecer, e você confere antes do vídeo final. O resultado varia com a imagem: por isso você aprova o take antes de gastar o resto.

- p: O vídeo sai com voz?
  r: Não. Sai sem áudio: é o apresentador falando como fundo, pra você pôr a narração da VSL por cima.

- p: Posso usar em anúncio?
  r: Pode, com responsabilidade. Use só imagens que são suas ou que você tem direito de usar. Não use pra imitar uma pessoa real ou famosa, se passar por um profissional real ou inventar depoimento de cliente. Siga as regras da plataforma onde vai anunciar, inclusive a sinalização de conteúdo feito com IA quando ela for exigida.

- p: Funciona com qualquer foto?
  r: Aceita PNG, JPG ou WebP de até 25 MB. Você escolhe Homem ou Mulher e o app cuida do resto.

- p: Quanto custa a IA?
  r: Os créditos são da Magnific, na sua conta. Cerca de 775 por vídeo a partir de foto e 325 a partir de um vídeo seu. Cada botão mostra o custo antes do clique.

- p: Preciso de conta na Magnific?
  r: Sim, com créditos. Você conecta pelo login no navegador. Todas as ferramentas usam essa conta.

- p: Preciso de placa de vídeo boa?
  r: Não. A IA roda na nuvem, pela sua conta Magnific. O PC só finaliza o vídeo, um por vez, e você continua usando o computador.

- p: Funciona no Mac?
  r: Não. É um app para Windows 10 ou 11, 64 bits.

- p: Qual a diferença entre Individual e Empresarial?
  r: O Individual é pra quem cria sozinho, com preço fechado e ativação em [QTD_PCS] PC(s). O Empresarial é pra time: mais máquinas, onboarding e suporte prioritário, montado sob medida. Fale com a gente pelo [LINK_CONTATO].

- p: Em quantos computadores posso usar?
  r: O Individual ativa [QTD_PCS] PC(s). Vai trocar de computador? Fale com o [EMAIL_SUPORTE] e liberamos a troca. Precisa de mais máquinas? Veja o Empresarial.

- p: É assinatura?
  r: O Individual é [PLANO: mensal ou vitalício]. [Se mensal: renova a cada 30 dias e você cancela quando quiser. Se vitalício: paga uma vez e usa sem mensalidade.] Os créditos da Magnific são cobrados à parte, por ela.

- p: Como eu recebo?
  r: Depois do pagamento, chega no seu e-mail o link de download e o código de ativação. Instala, digita o código e o app libera na hora.

- p: E se eu não gostar?
  r: Você tem [DIAS_GARANTIA] dias de garantia. Peça o reembolso pela [PLATAFORMA_PAGAMENTO] ou pelo [EMAIL_SUPORTE].

- p: O Windows mostrou um aviso ao instalar. É normal?
  r: É. Na primeira vez o Windows pode avisar "aplicativo desconhecido". Clique em Mais informações e depois em Executar assim mesmo. Não pede senha de administrador.

---

## [cta-final] Chamada final

titulo: O próximo criativo começa com uma foto.

sub: O rosto da VSL, a presell e o produto em cena. Tudo no mesmo app.

botao_primario: Quero o Individual
botao_primario_link: [LINK_CHECKOUT]

botao_secundario: Sou agência ou operação
botao_secundario_link: [LINK_CONTATO]

chips:
- Garantia de [DIAS_GARANTIA] dias
- Ativação na hora
- Custo sempre visível

visual: Fundo com a parede de loops da galeria, desfocada, ainda rodando.

---

## [rodape] Rodapé

linha: LoopVideo · app para Windows que transforma uma foto no rosto da sua VSL, mais presell, mockup e imagens pro criativo.
suporte: [EMAIL_SUPORTE]
contato_empresas: [LINK_CONTATO]
credito: Desenvolvido por rafaguiar.dev

---

## [seo] SEO e compartilhamento

title: LoopVideo · Sua foto falando a VSL inteira
(43 caracteres)

meta_description: App para Windows que transforma uma foto no apresentador da sua VSL, falando sem emenda à vista. Mais presell, mockup e criativos no mesmo app.
(145 caracteres)

og_title: LoopVideo · O rosto da sua VSL não acaba
og_description: Uma foto vira o apresentador da VSL, sem emenda à vista. E no mesmo app: presell em qualquer idioma, produto em cena e criativo no formato certo.

---

## Notas para o dono

### Placeholders a preencher
- `[PREÇO]`, `[PREÇO_ANCORA]`, `[PARCELAS]`, `[PLANO: mensal ou vitalício]`, `[QTD_PCS]` (card Individual e FAQ)
- `[LINK_CHECKOUT]` (card Individual, botão primário do CTA final)
- `[LINK_CONTATO]` (card Empresarial, FAQ, CTA final, rodapé). Pode ser WhatsApp, formulário ou e-mail.
- `[DIAS_GARANTIA]`, `[PLATAFORMA_PAGAMENTO]`, `[EMAIL_SUPORTE]`
- `[DURAÇÃO_MIN]`, `[DURAÇÃO_MAX]` (FAQ "Qual a duração")
- `[N]` e `[TEMPO]` em `[resultado]` são calculados pela página, não por você.

### Itens [CONFIRMAR]
1. **Duração máxima (o mais importante).** A página promete o apresentador "na duração que a sua VSL pede". Hoje o app
   oferece de 1:00 a 4:00, e VSL de oferta costuma ter de 5 a 15 minutos. O motor já aceita durações bem maiores;
   vale liberar opções mais longas no app antes de publicar. Se não for liberar, troque o hero por:
   "Uma foto vira o rosto da sua VSL. Até [DURAÇÃO_MAX] sem emenda à vista." Atenção: emendar dois arquivos na
   timeline do editor hoje não garante a volta sem pulo (o vídeo é cortado no tempo exato, não no fim de uma volta).
2. **"O custo não muda com a duração"** (`[custos]`). Pela lógica do app parece verdade (a IA gera o mesmo tanto e o
   resto é montagem no PC), mas confira o número na tela com 1:00 e com 4:00 antes de manter.
3. **Empresarial:** mais máquinas, liberação centralizada pelo time do cliente, onboarding, suporte prioritário e
   prompts padrão por nicho. Hoje quem aprova máquina é você, pelo painel. Decida se o cliente terá um "gestor" que
   libera as próprias máquinas ou se a liberação continua com você, a pedido dele. Ajuste o texto conforme.
4. **Garantia no Empresarial:** deixei "condições na proposta".
5. **Entrega do código "na hora":** hoje o código de venda é criado no painel. Se não for automático, troque por um prazo real.
6. **Exemplos da galeria e do desafio:** precisam ser vídeos realmente gerados pelo app, de personagens criados por IA
   ou com autorização. A nota diz "personagens de IA"; mantenha só se for verdade pra todos.
7. **Personagens de saúde (jaleco, laboratório, bloco cirúrgico):** são os rótulos que mais vendem pra nutra, e os
   mais sensíveis. Plataformas e conselhos profissionais restringem anúncio que sugere endosso de profissional de
   saúde. A FAQ já orienta a não se passar por profissional real; vale manter os rótulos como "Especialista" e nunca
   "Médico" na página.
8. **Antes e depois:** mantive como "ilustrativo, pra VSL e página", com aviso de regra da plataforma. Meta e outras
   restringem antes e depois em saúde e emagrecimento.

### Headlines alternativas para teste A/B
1. (escolhida) **Uma foto vira o rosto da sua VSL. E ele não para de falar.**
2. **A VSL tem minutos. O seu apresentador também.**
3. **Ache a emenda. A gente espera.** (hero que já abre no desafio)

### Palavras que a página evita de propósito
Nada de "10 s + 5 s", "ponte", "trecho de volta", "último quadro", nome da IA de vídeo ou passo a passo da montagem.
A página mostra o resultado; o "como" fica dentro do app.

---

## Pesquisa

Achados que embasaram a copy. A maioria das fontes é de agências e ferramentas de anúncio (interesse comercial), então
usei como direção, não como número na página. Nenhuma estatística de terceiros foi pra copy.

1. **Fadiga de criativo é o motor da demanda.** Guias de Meta Ads falam em trocar criativo a cada 2 a 4 semanas como
   ponto de partida, e mais rápido quanto maior a verba; os sinais são frequência subindo e CTR e hook rate caindo.
   → Ângulo "sobe criativo novo antes do atual cansar" (gestor de tráfego) e a seção `[esteira]`.
   Fontes: [Segwise](https://segwise.ai/blog/how-often-refresh-ad-creatives), [Hawke Media](https://hawkemedia.com/insights/ad-fatigue-creative-refresh-timer/), [Billo](https://billo.app/blog/how-many-ad-creatives-do-you-need/)
2. **Variedade virou a nova segmentação.** Com o Andromeda, a Meta passou a tratar diversidade de criativo (ângulo,
   formato, persona) como a principal alavanca de entrega. Variar só a cor do botão não basta; precisa de pessoas e
   contextos diferentes. → Galeria com "qualquer rosto que a sua oferta pedir" e Mockup com cena por nicho.
   Fontes: [Jon Loomer · Andromeda](https://www.jonloomer.com/meta-andromeda-creative-diversification/), [Funnel.io](https://funnel.io/blog/meta-advantage-plus)
3. **Os primeiros segundos decidem.** Hook rate (visualizações de 3 s ÷ impressões) é a métrica de diagnóstico, e a
   prática comum é testar vários hooks sobre o mesmo corpo. → Mockup vendido como "abertura de criativo" e "um
   ângulo novo por dia".
   Fontes: [Kickbite · hook rate](https://www.kickbite.io/en/blog/hook-rate), [Invideo · hooks](https://invideo.io/faq/should-you-spend-more-time-on-hooks-or-full-ad/)
4. **UGC ganha em feed, polido ganha em outros lugares.** Fontes de mercado relatam que estilo UGC tende a ir melhor
   em Reels e TikTok, e o polido em pré-roll de YouTube. → Rótulos "UGC", "Selfie" e "Depoimento em casa" ao lado de
   "Especialista" na galeria: o app serve aos dois.
   Fontes: [Stackmatix](https://stackmatix.com/blog/ugc-style-ads-vs-polished-creative), [Billo · UGC ads](https://billo.app/blog/ugc-ads/)
5. **O funil de DR passa pela presell.** Em nutra e nativo, o caminho comum é criativo → advertorial/presell →
   página de vendas → checkout. A presell aquece tráfego frio com cara de editorial, e "as seen on" aparece como
   elemento de confiança, com obrigação de sinalizar publicidade. → `[prova-visual]` como "a matéria que vem antes
   da VSL", com destaque pra etiqueta de publicidade e pra regra "sem fonte, não entra".
   Fontes: [AdLibrary · funil nativo](https://adlibrary.com/posts/native-ads-funnel-direct-response-teardown), [Outbrain · guia de advertorial](https://www.outbrain.com/resources/wp-content/uploads/2024/04/OB_EBOOK-Advertorial-Guide-2024-1.pdf), [LanderLab · presell](https://landerlab.io/blog/presell-page-examples)
6. **VSL dura minutos e o especialista fica na tela.** VSL de oferta costuma ter de 5 a 15 minutos (sem regra fixa),
   e vagas de editor pedem formato com especialista num canto da tela enquanto o conteúdo roda, trocando de
   especialista com transição. → Problema "A VSL tem minutos. O vídeo de IA tem segundos." e o item [CONFIRMAR] 1.
   Fontes: [Teleprompter.com](https://www.teleprompter.com/blog/video-sales-letter), [AWAI](https://www.awai.com/question/video-sales-letter-vsl-how-long-is-too-long/), [HeroSpark · VSL](https://herospark.com/guias/vsl), [Workana · vaga de editor de VSL](https://www.workana.com/job/editor-profissional-de-vsls-com-formato-ugc-e-multiplos-especialistas)
7. **Cada posicionamento pede um formato.** Na Meta, 4:5 é o recomendado pro feed, 9:16 pra Stories e Reels, 1:1 pra
   carrossel; 16:9 segue no YouTube. → `[imagens]` com "cada posicionamento no formato certo" e "um criativo vencedor
   vira três posicionamentos".
   Fontes: [Jon Loomer · formatos por posicionamento](https://www.jonloomer.com/recommended-aspect-ratios-by-placement-for-meta-ad-creative/), [AdsUploader](https://adsuploader.com/blog/meta-ads-aspect-ratios)
8. **Foto de produto em cena custa caro e a IA só vale se o rótulo sair fiel.** Sessões de estúdio cobram por
   produto ou por diária, e cena lifestyle é a parte mais cara; o risco da IA é deformar rótulo e cor. → Mockup com
   "sem estúdio, sem fotógrafo", "cores do seu pote" e "rótulo parado" no vídeo.
   Fontes: [Claid · preço de foto de produto](https://claid.ai/blog/article/product-photography-pricing), [Photta · IA × tradicional](https://www.photta.app/blog/ai-vs-traditional-product-photography-roi-comparison)
9. **Conteúdo de IA realista exige sinalização.** O TikTok exige o rótulo de conteúdo gerado por IA em criativo
   realista (inclusive porta-voz e cena geradas); a Meta exige declaração em anúncios políticos e sociais e pede que
   criadores sinalizem vídeo realista alterado; o novo guia do Conar diz que peça feita com IA segue as mesmas regras
   da publicidade comum. → FAQ "Posso usar em anúncio?" e a linguagem de "personagem" e "apresentador", nunca de
   pessoa real.
   Fontes: [Cinerads · regras de IA em anúncios](https://www.cinerads.com/blog/ai-ad-disclosure-requirements), [Social Media Today · Meta](https://www.socialmediatoday.com/news/metas-new-disclosure-requirements-for-digitally-altered-ad-content-are-now/704266/), [Propmark · Conar e IA](https://propmark.com.br/digital/conar-atualiza-guia-de-publicidade-com-influenciadores-e-inclui-regras-sobre-ia/)
