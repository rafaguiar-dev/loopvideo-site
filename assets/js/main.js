/* =====================================================================================================
   CONFIG: troque aqui os dados da oferta. Tudo que estiver entre [colchetes] aparece destacado em
   amarelo na página até ser preenchido. Ex.: preco: "R$ 297", linkCheckout: "https://pay.exemplo.com/..."
   ===================================================================================================== */
const CONFIG = {
  plano: "Plano anual",                           // aparece ao lado de "Individual"
  preco: "R$ 497,90",                             // ex.: "R$ 297"
  periodo: "/ano",                                // aparece colado no preço
  precoAncora: "",                                // ex.: "R$ 697" (preço riscado). Vazio = não aparece
  parcelas: "[PARCELAS]",                         // ex.: "12x de R$ 51,46". Vazio = a linha não aparece
  qtdPcs: "2",                                    // PCs por licença (sem uso ao mesmo tempo)
  diasGarantia: "7",                              // ex.: "7"
  linkCheckout: "[LINK_CHECKOUT]",                // checkout do plano Individual
  linkContato: "[LINK_CONTATO]",                  // contato do plano Empresarial (WhatsApp, formulário ou mailto:)
  plataformaPagamento: "[PLATAFORMA_PAGAMENTO]",  // ex.: "Hotmart"
  emailSuporte: "[EMAIL_SUPORTE]",                // ex.: "suporte@exemplo.com"
};

/* Textos do exemplo de Prova visual, por idioma (veículo fictício). */
const ARTIGO = {
  pt: { tag: "Publicidade", h: "Aos 58, ela trocou o café da manhã e diz que nunca teve tanta disposição", by: "Por Redação · 4 min de leitura",
        p: "Depois de anos tentando de tudo, a aposentada conta o que mudou na rotina e por que a família começou a perguntar o segredo." },
  en: { tag: "Advertorial", h: "At 58, she changed her breakfast and says she has never felt this energized", by: "By Staff · 4 min read",
        p: "After years of trying everything, the retiree shares what changed in her routine and why her family started asking for the secret." },
  es: { tag: "Publicidad", h: "A los 58, cambió su desayuno y dice que nunca tuvo tanta energía", by: "Por Redacción · 4 min de lectura",
        p: "Después de años probando de todo, la jubilada cuenta qué cambió en su rutina y por qué su familia empezó a preguntarle el secreto." },
  de: { tag: "Anzeige", h: "Mit 58 hat sie ihr Frühstück umgestellt und fühlt sich so fit wie nie", by: "Von der Redaktion · 4 Min. Lesezeit",
        p: "Nach Jahren des Ausprobierens erzählt die Rentnerin, was sich verändert hat und warum ihre Familie nach dem Geheimnis fragt." },
};

(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSet = (v) => typeof v === "string" && v.trim() !== "" && !/^\[.*\]$/.test(v.trim());
  const play = (v) => { const p = v.play(); if (p) p.catch(() => {}); };
  const hasIO = "IntersectionObserver" in window;

  /* ---------- CONFIG → página ---------- */
  $$("[data-cfg]").forEach((el) => {
    const v = CONFIG[el.dataset.cfg];
    if (v === "") { (el.closest("[data-cfg-wrap]") || el).remove(); return; }
    if (isSet(v)) { el.textContent = v; el.classList.remove("ph"); }
  });
  $$("[data-cfg-href]").forEach((a) => {
    const v = CONFIG[a.dataset.cfgHref];
    if (isSet(v)) { a.href = v; a.rel = "noopener"; }
  });
  $$("[data-cfg-link]").forEach((a) => {
    const v = CONFIG[a.dataset.cfgLink];
    if (isSet(v)) { a.href = v; a.rel = "noopener"; a.textContent = a.dataset.cfgLabel || "Falar com a gente"; a.classList.remove("ph"); }
  });
  $$("[data-cfg-mailto]").forEach((a) => { const v = CONFIG[a.dataset.cfg]; if (isSet(v)) a.href = "mailto:" + v; });

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const menu = $("#navMenu");
  const setMenu = (open) => { nav.classList.toggle("is-open", open); menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu"); };
  menu.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); menu.focus(); }
  });
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) setMenu(false); });

  /* ---------- revelar no scroll ---------- */
  const reveals = $$(".reveal");
  if (hasIO && !reduce) {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add("is-in"));

  /* ---------- vídeos: carregam perto da tela, tocam só quando visíveis ----------
     Com "reduzir movimento" ligado nada toca sozinho: um clique no vídeo toca/pausa. */
  const held = new WeakSet();   // pausados pelo visitante
  const load = (v) => { if (v.dataset.src && !v.src) { v.src = v.dataset.src; v.load(); } };
  const lazy = $$("video[data-src]");
  if (hasIO) {
    const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(e.target); near.unobserve(e.target); } }), { rootMargin: "400px 0px" });
    const seen = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting && e.intersectionRatio >= .2) { if (!reduce && !held.has(v) && !v.closest(".mock__set:not(.is-on)")){ load(v); play(v); } }
      else v.pause();
    }), { threshold: .2 });
    lazy.forEach((v) => { near.observe(v); seen.observe(v); });
  } else lazy.forEach((v) => { load(v); if (!reduce) play(v); });
  const toggleVideo = (v) => { load(v); if (v.paused) { held.delete(v); play(v); } else { held.add(v); v.pause(); } };
  lazy.forEach((v) => {
    v.addEventListener("click", () => toggleVideo(v));
    if (v.closest('[aria-hidden="true"]')) return;
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "vbtn media-toggle";
    btn.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#i-play"/></svg>';
    const label = v.getAttribute("aria-label") || "Exemplo";
    const sync = () => {
      btn.setAttribute("aria-label", (v.paused ? "Tocar vídeo: " : "Pausar vídeo: ") + label);
      btn.querySelector("use").setAttribute("href", v.paused ? "#i-play" : "#i-pause");
    };
    btn.addEventListener("click", () => toggleVideo(v));
    v.addEventListener("play", sync); v.addEventListener("pause", sync);
    v.parentElement.appendChild(btn); sync();
  });

  /* ---------- hero: a foto "ganha vida" ---------- */
  const stage = $("#heroStage"), hv = $("#heroVideo"), tag = $("#heroTagTxt"), hbtn = $('[data-toggle="heroVideo"]');
  const setBtn = () => { const p = hv.paused; hbtn.setAttribute("aria-label", p ? "Tocar vídeo" : "Pausar vídeo"); hbtn.querySelector("use").setAttribute("href", p ? "#i-play" : "#i-pause"); };
  const alive = () => { stage.classList.add("is-alive"); tag.textContent = "em loop · sem áudio"; };
  let heroVisible = stage.getBoundingClientRect().bottom > 0 && stage.getBoundingClientRect().top < window.innerHeight;
  let ready = hv.readyState >= 3, waited = false;
  const go = () => { if (ready && waited && heroVisible && !held.has(hv) && !reduce) play(hv); };
  setBtn();
  if (!reduce) {
    hv.addEventListener("canplay", () => { ready = true; go(); }, { once: true });
    setTimeout(() => { waited = true; go(); }, 1100);
  }
  hv.addEventListener("play", () => { alive(); setBtn(); });
  hv.addEventListener("pause", setBtn);
  hbtn.addEventListener("click", () => { if (hv.paused) { held.delete(hv); play(hv); } else { held.add(hv); hv.pause(); } });
  if (hasIO) new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; if (!heroVisible) hv.pause(); else go(); }).observe(stage);

  /* ---------- auto-avanço genérico: troca sozinho enquanto visível, para no primeiro clique ---------- */
  function autoCycle(root, count, ms, show, controls = root) {
    let i = 0, t = null, user = false, visible = false;
    const tick = () => { i = (i + 1) % count; show(i, false); };
    const run = () => { clearInterval(t); if (!user && visible && !reduce) t = setInterval(tick, ms); };
    const stop = () => { user = true; clearInterval(t); root.classList.remove("is-auto"); };
    controls.addEventListener("focusin", stop);
    controls.addEventListener("pointerenter", stop);
    root.addEventListener("pointerdown", stop);
    if (hasIO) new IntersectionObserver(([e]) => { visible = e.isIntersecting && e.intersectionRatio >= .35; run(); }, { threshold: .35 }).observe(root);
    return { pick(n) { user = true; clearInterval(t); i = n; show(n, true); }, get user() { return user; } };
  }

  /* ---------- como funciona: janela do app em 3 estados ---------- */
  const app = $("#app"), how = $("#how"), steps = $$(".how__step");
  const HOW_MS = 4200;
  how.style.setProperty("--how-t", HOW_MS + "ms");
  const showStep = (n) => {
    steps.forEach((b, k) => { b.classList.toggle("is-on", k === n); b.setAttribute("aria-pressed", String(k === n)); });
    clearTimeout(app._t1); clearTimeout(app._t2);
    app.classList.remove("is-dropped", "is-gen");
    app.dataset.state = String(n);
    if (n === 0) {
      if (reduce) app.classList.add("is-dropped", "is-gen");
      else {
        app._t1 = setTimeout(() => app.classList.add("is-dropped"), 400);
        app._t2 = setTimeout(() => app.classList.add("is-gen"), 2000);
      }
    }
    // reinicia a barrinha do passo atual
    const bar = steps[n].querySelector(".how__bar"); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
  };
  if (!reduce) how.classList.add("is-auto");
  const howCycle = autoCycle(how, steps.length, HOW_MS, showStep);
  steps.forEach((b, k) => b.addEventListener("click", () => { how.classList.remove("is-auto"); howCycle.pick(k); }));
  showStep(0);

  /* ---------- mockup: cenas por tipo ---------- */
  const tabs = $$("#mockTabs .chip"), sets = $$("#mock .mock__set");
  const showSet = (n) => {
    tabs.forEach((b, k) => { b.classList.toggle("is-on", k === n); b.setAttribute("aria-pressed", String(k === n)); });
    sets.forEach((s, k) => {
      const on = k === n; s.classList.toggle("is-on", on);
      const v = $("video", s); if (!v) return;
      const rect = v.getBoundingClientRect();
      if (on && rect.bottom > 0 && rect.top < window.innerHeight && !reduce && !held.has(v)) { load(v); play(v); } else v.pause();
    });
  };
  const mockCycle = autoCycle($("#mock"), sets.length, 5200, showSet, $("#mockTabs"));
  tabs.forEach((b, k) => b.addEventListener("click", () => mockCycle.pick(k)));

  /* ---------- prova visual: idioma do exemplo ---------- */
  const page = $(".art__page"), langs = $$("#artLang .chip");
  const LANGS = ["pt", "en", "es", "de"];
  const showLang = (n, byUser = false) => {
    const d = ARTIGO[LANGS[n]];
    langs.forEach((b, k) => { b.classList.toggle("is-on", k === n); b.setAttribute("aria-pressed", String(k === n)); });
    clearTimeout(page._swap);
    page.setAttribute("aria-live", byUser ? "polite" : "off");
    page.classList.add("is-swap");
    page._swap = setTimeout(() => { $$("[data-t]", page).forEach((el) => { el.textContent = d[el.dataset.t]; }); page.setAttribute("lang", LANGS[n] === "pt" ? "pt-BR" : LANGS[n]); page.classList.remove("is-swap"); }, reduce ? 0 : 220);
  };
  // só troca quando o visitante escolhe: trocar sozinho atrapalha quem está lendo
  langs.forEach((b, k) => b.addEventListener("click", () => showLang(k, true)));
})();
