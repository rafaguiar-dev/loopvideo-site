/* =====================================================================================================
   CONFIG: troque aqui os dados da oferta. Tudo que estiver entre [colchetes] aparece destacado em
   amarelo na página até ser preenchido. Ex.: preco: "R$ 297", linkCheckout: "https://pay.exemplo.com/..."
   ===================================================================================================== */
const CONFIG = {
  plano: "[PLANO: mensal ou vitalício]",          // "mensal" ou "vitalício" (também escolhe a resposta da FAQ "É assinatura?")
  preco: "[PREÇO]",                               // ex.: "R$ 297"
  precoAncora: "[PREÇO_ANCORA]",                  // ex.: "R$ 497"
  parcelas: "[PARCELAS]",                         // ex.: "12x de R$ 29,70"
  qtdPcs: "[QTD_PCS]",                            // ex.: "1"
  diasGarantia: "[DIAS_GARANTIA]",                // ex.: "7"
  linkCheckout: "[LINK_CHECKOUT]",                // checkout do plano Individual
  linkContato: "[LINK_CONTATO]",                  // contato do plano Empresarial (WhatsApp, formulário ou mailto:)
  plataformaPagamento: "[PLATAFORMA_PAGAMENTO]",  // ex.: "Hotmart"
  emailSuporte: "[EMAIL_SUPORTE]",                // ex.: "suporte@exemplo.com"
  duracaoMin: "[DURAÇÃO_MIN]",                    // ex.: "1:00" (FAQ "Qual a duração do vídeo?")
  duracaoMax: "[DURAÇÃO_MAX]",                    // ex.: "4:00"
};

/* Personagens que se revezam no celular do topo (depois do vídeo de abertura). */
const HERO_LOOPS = [
  { video: "assets/exemplos/loops/ruiva.mp4", foto: "assets/exemplos/loops/ruiva.jpg" },
  { video: "assets/exemplos/loops/homem-oculos.mp4", foto: "assets/exemplos/loops/homem-oculos.jpg" },
  { video: "assets/exemplos/loops/mae-bebe.mp4", foto: "assets/exemplos/loops/mae-bebe.jpg" },
  { video: "assets/exemplos/loops/cirurgiao.mp4", foto: "assets/exemplos/loops/cirurgiao.jpg" },
];

(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSet = (v) => typeof v === "string" && v.trim() !== "" && !/^\[.*\]$/.test(v.trim());
  const pad = (n) => String(Math.floor(n)).padStart(2, "0");
  const hms = (s) => pad(s / 3600) + ":" + pad((s % 3600) / 60) + ":" + pad(s % 60);
  const play = (v) => { const p = v.play(); p && p.catch(() => {}); };
  const hasIO = "IntersectionObserver" in window;

  /* ---------- CONFIG → página ---------- */
  $$("[data-cfg]").forEach((el) => {
    const v = CONFIG[el.dataset.cfg];
    if (isSet(v)) { el.textContent = v; el.classList.remove("ph"); }
  });
  $$("[data-cfg-href]").forEach((a) => {
    const v = CONFIG[a.dataset.cfgHref];
    if (isSet(v)) { a.href = v; a.rel = "noopener"; }
    else { a.href = "#oferta"; a.title = "Defina CONFIG." + a.dataset.cfgHref + " em assets/js/main.js"; }
  });
  $$("[data-cfg-link]").forEach((a) => {
    const v = CONFIG[a.dataset.cfgLink];
    if (isSet(v)) { a.href = v; a.rel = "noopener"; a.textContent = a.dataset.cfgLabel || "Falar com a gente"; a.classList.remove("ph"); }
  });
  $$("[data-cfg-mailto]").forEach((a) => { const v = CONFIG[a.dataset.cfg]; if (isSet(v)) a.href = "mailto:" + v; });
  {
    const plano = isSet(CONFIG.plano) ? CONFIG.plano.toLowerCase() : "";
    const frases = { mensal: "Renova a cada 30 dias e você cancela quando quiser.", vitalicio: "Paga uma vez e usa sem mensalidade." };
    const escolhido = /mensal/.test(plano) ? "mensal" : /vital/.test(plano) ? "vitalicio" : "";
    if (escolhido) $$("[data-plano]").forEach((el) => {
      if (el.dataset.plano === escolhido) { el.textContent = frases[escolhido]; el.classList.remove("ph"); } else el.remove();
    });
  }

  /* ---------- ticker: duplica a fila pra rolar sem emenda ---------- */
  const row = $(".ticker__row");
  if (row) { const c = row.cloneNode(true); c.setAttribute("aria-hidden", "true"); row.parentNode.appendChild(c); }

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const heroCta = $('[data-cta="hero"]');
  if (heroCta && hasIO) new IntersectionObserver(([e]) => nav.classList.toggle("is-cta", !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroCta);

  /* ---------- vídeos: carregam perto da tela, tocam só quando visíveis ---------- */
  // Vale pra todo <video> com data-src (ou <source data-src>), fora os do topo, do desafio e do comparador.
  function loadVideo(v) {
    if (v.dataset.loaded) return; v.dataset.loaded = "1";
    if (v.dataset.src) v.src = v.dataset.src;
    $$("source[data-src]", v).forEach((s) => { s.src = s.dataset.src; });
    v.load();
  }
  const managed = $$("video").filter((v) => (v.dataset.src || v.querySelector("source[data-src]")) && !v.closest(".hunt__video, .compare"));
  if (hasIO) {
    const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { loadVideo(e.target); near.unobserve(e.target); } }), { rootMargin: "300px 0px" });
    const vis = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && !reduce) { loadVideo(e.target); play(e.target); } else e.target.pause();
    }), { threshold: 0.2 });
    managed.forEach((v) => { near.observe(v); vis.observe(v); });
  } else managed.forEach(loadVideo);

  // observa se um elemento está na tela
  function watch(el, cb, threshold = 0.15) {
    if (!el) return;
    if (!hasIO) { cb(true); return; }
    new IntersectionObserver(([e]) => cb(e.isIntersecting), { threshold }).observe(el);
  }

  /* ---------- topo: personagens se revezam, o contador só sobe ---------- */
  const hero = (function () {
    const A = $("#heroVideoA"), B = $("#heroVideoB");
    if (!A) return null;
    const ring = $("#heroRing"), tc = $("#heroTc"), scan = $("#heroScan"), intake = $("#heroIntake");
    const steps = $$("#heroSteps li");
    const HERO_D = 15.66, CUTS = [0, 1.85, 9.0, HERO_D];
    let cur = A, nxt = B, idx = -1, total = 0, last = 0, visible = true, busy = false, raf = 0;

    function setSteps(t, d, isOpening) {
      steps.forEach((li, i) => {
        let f, on;
        if (isOpening) { const a = CUTS[i], b = CUTS[i + 1]; f = Math.min(1, Math.max(0, (t - a) / (b - a))); on = t >= a && t < b; }
        else { f = i < 2 ? 1 : Math.min(1, t / (d || 15)); on = i === 2; }
        li.querySelector("i").style.transform = "scaleX(" + f + ")";
        li.classList.toggle("is-on", on);
      });
    }
    if (reduce) {
      A.removeAttribute("autoplay"); A.pause();
      ring.style.strokeDasharray = "1 0"; tc.textContent = "00:00:00"; setSteps(HERO_D, HERO_D, true);
      steps.forEach((li) => { li.classList.add("is-on"); li.querySelector("i").style.transform = "scaleX(1)"; });
      return null;
    }
    function frame(now) {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0; last = now;
      if (!cur.paused) total += dt;
      tc.textContent = hms(total);
      ring.style.strokeDashoffset = String(-((now / 5200) % 1));
      setSteps(cur.currentTime || 0, cur.duration, idx === -1);
      raf = visible ? requestAnimationFrame(frame) : 0;
    }
    function prepare() {
      const n = HERO_LOOPS[(idx + 1) % HERO_LOOPS.length];
      if (nxt.dataset.want !== n.video) { nxt.dataset.want = n.video; nxt.src = n.video; nxt.preload = "auto"; nxt.load(); }
    }
    function swap() {
      if (busy) return; busy = true;
      const gsap = window.gsap;
      const n = HERO_LOOPS[(idx + 1) % HERO_LOOPS.length];
      prepare();
      const go = () => {
        nxt.currentTime = 0; play(nxt);
        intake.style.opacity = 0;
        setTimeout(() => { intake.src = n.foto; intake.style.opacity = 1; }, 250);
        const done = () => {
          cur.classList.remove("is-on"); cur.pause();
          nxt.classList.remove("is-top"); nxt.classList.add("is-on"); nxt.style.clipPath = "";
          const t = cur; cur = nxt; nxt = t; idx = (idx + 1) % HERO_LOOPS.length; busy = false;
          nxt.removeAttribute("poster");
        };
        if (!gsap) { done(); return; }
        nxt.classList.add("is-top");
        const h = $("#heroScreen").clientHeight;
        const tl = gsap.timeline({ onComplete: done });
        tl.set(scan, { y: 0, opacity: 1 })
          .fromTo(nxt, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.inOut" }, 0)
          .fromTo(scan, { y: 0 }, { y: h, duration: 1.1, ease: "power2.inOut" }, 0)
          .to(scan, { opacity: 0, duration: 0.25 }, 0.95);
      };
      if (nxt.readyState >= 2) go(); else nxt.addEventListener("canplay", go, { once: true });
    }
    [A, B].forEach((v) => {
      v.addEventListener("ended", () => { if (v === cur) swap(); });
      v.addEventListener("timeupdate", () => { if (v === cur && v.duration && v.currentTime > v.duration - 4) prepare(); });
    });
    raf = requestAnimationFrame(frame);
    watch($("#heroPhone"), (on) => {
      visible = on;
      if (on) { if (!busy) play(cur); last = 0; if (!raf) raf = requestAnimationFrame(frame); }
      else cur.pause();
    }, 0.05);
    return true;
  })();

  /* ---------- comparadores (foto × vídeo, legenda × limpa) ---------- */
  $$(".compare").forEach((c) => {
    const r = $(".compare__range", c);
    c._touched = false;
    r.addEventListener("input", () => { c._touched = true; c.style.setProperty("--pos", r.value + "%"); c.dispatchEvent(new Event("touch")); });
  });

  /* ---------- demo: o vídeo do especialista + contador ---------- */
  const demoVideo = $("#demoVideo"), demoTc = $("#demoTc");
  if (demoVideo) {
    let total = 0, last = 0, on = false;
    const tick = (now) => {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0; last = now;
      if (!demoVideo.paused) total += dt;
      demoTc.textContent = hms(total);
      if (on) requestAnimationFrame(tick);
    };
    watch(demoVideo, (vis) => {
      on = vis;
      if (vis) { loadVideo(demoVideo); if (!reduce) play(demoVideo); last = 0; requestAnimationFrame(tick); } else demoVideo.pause();
    });
    $("#compare").addEventListener("touch", () => { loadVideo(demoVideo); if (demoVideo.paused) play(demoVideo); });
  }

  /* ---------- desafio: ache a emenda ---------- */
  (function () {
    const v = $("#huntVideo"); if (!v) return;
    const btn = $("#huntBtn"), msg = $("#huntMsg"), lapsEl = $("#huntLaps"), timeEl = $("#huntTime"), flash = $("#huntFlash");
    const strip = $("#strip"), ticksEl = $("#stripTicks"), marksEl = $("#stripMarks");
    const PPS = 26; // pixels por segundo na linha do tempo
    let total = 0, last = 0, lastT = 0, laps = 0, shownLaps = 0, tries = 0, on = false, nextLapsUpdate = 0;
    const marks = [], tickPool = [];
    const answers = [
      () => "Tem certeza? Olha de novo.",
      () => "Ele já voltou ao começo " + laps + (laps === 1 ? " vez" : " vezes") + " enquanto você olhava.",
      () => "É isso que vai rodar atrás da sua narração.",
    ];
    const fmtTick = (s) => (s >= 3600 ? hms(s) : Math.floor(s / 60) + ":" + pad(s % 60));
    function drawStrip() {
      const w = strip.clientWidth, half = w / 2;
      const from = Math.max(0, Math.ceil((total - half / PPS) / 5) * 5), to = total + half / PPS + 5;
      let k = 0;
      for (let s = from; s <= to; s += 5, k++) {
        let el = tickPool[k];
        if (!el) { el = document.createElement("span"); ticksEl.appendChild(el); tickPool[k] = el; }
        el.style.display = ""; el.style.left = (half + (s - total) * PPS) + "px"; el.textContent = fmtTick(s);
      }
      for (; k < tickPool.length; k++) tickPool[k].style.display = "none";
      for (let i = marks.length - 1; i >= 0; i--) {
        const x = half + (marks[i].t - total) * PPS;
        if (x < -20) { marks[i].el.remove(); marks.splice(i, 1); } else marks[i].el.style.left = x + "px";
      }
    }
    function frame(now) {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0; last = now;
      const t = v.currentTime || 0;
      if (!v.paused) total += dt;
      if (t + 1 < lastT) laps++;            // voltou ao começo
      lastT = t;
      if (now > nextLapsUpdate) { shownLaps = laps; lapsEl.textContent = shownLaps; nextLapsUpdate = now + 3700; } // atualiza devagar pra não entregar o momento
      timeEl.textContent = hms(total);
      drawStrip();
      if (on) requestAnimationFrame(frame);
    }
    btn.addEventListener("click", () => {
      loadVideo(v); if (v.paused) play(v);
      const a = answers[tries % answers.length]; tries++;
      msg.textContent = a();
      const m = document.createElement("i"); marksEl.appendChild(m); marks.push({ t: total, el: m });
      if (window.gsap && !reduce) window.gsap.fromTo(flash, { opacity: 1 }, { opacity: 0, duration: 0.8, ease: "power2.out" });
      drawStrip();
    });
    watch(v, (vis) => {
      on = vis;
      if (vis) { loadVideo(v); if (!reduce) play(v); last = 0; requestAnimationFrame(frame); } else v.pause();
    });
    window.addEventListener("resize", drawStrip);
  })();

  /* ---------- esteira: cada etapa acende as ferramentas que a alimentam ---------- */
  (function () {
    const stages = $$(".stage"), tools = $$("#toolbar li");
    if (!stages.length) return;
    let i = 0, hold = false, timer = 0;
    const light = (k) => {
      stages.forEach((s, j) => s.classList.toggle("is-on", j === k));
      const want = stages[k].dataset.tools.split(" ");
      tools.forEach((t) => t.classList.toggle("is-lit", want.includes(t.dataset.tool)));
    };
    stages.forEach((s, k) => {
      s.addEventListener("mouseenter", () => { hold = true; light(k); });
      s.addEventListener("focus", () => { hold = true; light(k); });
      s.addEventListener("mouseleave", () => { hold = false; i = k; });
      s.addEventListener("blur", () => { hold = false; });
    });
    light(0);
    if (reduce) return;
    watch($("#belt"), (on) => {
      clearInterval(timer);
      if (on) timer = setInterval(() => { if (!hold) { i = (i + 1) % stages.length; light(i); } }, 2200);
    });
  })();

  /* ---------- GSAP ---------- */
  function startGsap() {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap) { document.documentElement.classList.remove("js"); return; }
    if (ST) gsap.registerPlugin(ST);
    const IN = "power3.out";

    // prova visual: o texto entra e as três páginas abrem em leque
    const fanCards = $$("#fan .art"), pressText = $("#pressText");
    const PASTE = "Pequenas mudanças na rotina da manhã aparecem no resto do dia. Nesta matéria, reunimos hábitos simples que cabem antes do café.";
    const narrow = () => window.innerWidth < 600;
    const fanTo = () => {
      const k = narrow() ? 0.36 : 1.12;
      return [{ x: -150 * k, y: 18, rotation: -10 }, { x: 0, y: -14, rotation: 0 }, { x: 150 * k, y: 18, rotation: 10 }];
    };

    if (reduce) {
      gsap.set("[data-intro], [data-intro-stage]", { opacity: 1 });
      if (pressText) pressText.textContent = PASTE;
      fanCards.forEach((c, k) => gsap.set(c, fanTo()[k]));
      $("#rulerHead") && gsap.set("#rulerHead", { left: "100%" });
      $$("#ratioChips span")[0] && $$("#ratioChips span")[0].classList.add("is-on");
      return;
    }

    // abertura: um único momento orquestrado
    gsap.timeline({ defaults: { ease: IN } })
      .fromTo(".nav", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
      .fromTo("[data-intro]", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.1)
      .fromTo("[data-intro-stage]", { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.25);

    if (!ST) return;

    // galeria: as colunas deslizam em velocidades diferentes com a rolagem
    $$(".wall__col").forEach((col) => {
      gsap.fromTo(col, { yPercent: 0 }, { yPercent: +col.dataset.speed, ease: "none",
        scrollTrigger: { trigger: "#wall", start: "top bottom", end: "bottom top", scrub: 0.8 } });
    });

    // o "pulo" dos trechos colados
    const track = $("#jumpTrack");
    if (track) {
      const seams = $$(".jump__seam", track), headEl = $("#jumpHead"), jtc = $("#jumpTc");
      const st = { x: 0 }; let lastHit = -1;
      const jt = gsap.timeline({ repeat: -1, paused: true });
      jt.to(st, { x: 1, duration: 6, ease: "none", onUpdate() {
        const x = st.x * track.clientWidth;
        headEl.style.transform = "translateX(" + x + "px)";
        jtc.textContent = Math.floor(st.x * 30 / 60) + ":" + pad(st.x * 30 % 60);
        seams.forEach((s, i) => {
          const hit = Math.abs(x - (s.offsetLeft + s.offsetWidth / 2)) < 10;
          s.classList.toggle("is-hit", hit);
          if (hit && lastHit !== i) { lastHit = i; track.classList.remove("is-shake"); void track.offsetWidth; track.classList.add("is-shake"); }
        });
        if (st.x < 0.05) lastHit = -1;
      } }).to({}, { duration: 0.6 });
      ST.create({ trigger: track, start: "top 90%", end: "bottom 10%", onToggle: (self) => (self.isActive ? jt.play() : jt.pause()) });
    }

    // comparadores: a divisória mostra que dá pra arrastar
    $$(".compare").forEach((c) => {
      const r = $(".compare__range", c);
      const seq = c.id === "cleanCompare" ? [92, 12, 55] : [92, 50];
      ST.create({ trigger: c, start: "top 70%", once: true, onEnter: () => {
        if (c._touched) return;
        const o = { v: seq[0] }, tl = gsap.timeline();
        seq.slice(1).forEach((v) => tl.to(o, { v, duration: 1.2, ease: "power3.inOut", onUpdate: () => { if (!c._touched) { c.style.setProperty("--pos", o.v + "%"); r.value = o.v; } } }));
      } });
    });

    // vídeo próprio: o preço cai
    if ($("#cost2")) gsap.timeline({ scrollTrigger: { trigger: "#cost2", start: "top 80%", once: true }, defaults: { ease: IN } })
      .fromTo(".cost2__old", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5 })
      .fromTo(".cost2__new", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.1")
      .fromTo(".cost2__chip", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3");

    // prova visual: começa aberto; depois fecha, o texto é colado de novo e as páginas abrem outra vez
    if (fanCards.length) {
      const pos = fanTo();
      fanCards.forEach((c, k) => gsap.set(c, pos[k]));
      pressText.textContent = PASTE;
      const typed = { n: PASTE.length };
      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.to({}, { duration: 2.2 })
        .to(fanCards, { x: 0, y: 24, rotation: 0, opacity: 0, scale: 0.94, duration: 0.5, ease: "power2.in", stagger: 0.05 })
        .set(typed, { n: 0 })
        .to(typed, { n: PASTE.length, duration: 2.4, ease: "none", onUpdate: () => { pressText.textContent = PASTE.slice(0, Math.round(typed.n)); } })
        .to(".press__btn", { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1 }, "+=0.15")
        .to(fanCards, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: IN, stagger: 0.1 })
        .to(fanCards, { x: (k) => fanTo()[k].x, y: (k) => fanTo()[k].y, rotation: (k) => fanTo()[k].rotation, duration: 0.9, ease: "power3.inOut" }, "-=0.05")
        .to({}, { duration: 2.5 });
      ST.create({ trigger: "#press", start: "top 85%", end: "bottom 10%", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });
    }

    // imagens: o quadro troca de formato
    const frameEl = $("#ratioFrame"), box = $("#ratio"), chips = $$("#ratioChips span");
    if (frameEl) {
      const R = [9 / 16, 4 / 5, 16 / 9];
      const size = (r) => { const W = box.clientWidth * 0.86, H = box.clientHeight * 0.86; let h = H, w = h * r; if (w > W) { w = W; h = w / r; } return { width: w, height: h }; };
      frameEl.style.aspectRatio = "auto";
      gsap.set(frameEl, size(R[0])); chips[0].classList.add("is-on");
      const tl = gsap.timeline({ repeat: -1, paused: true });
      [1, 2, 0].forEach((k) => {
        tl.to(frameEl, { width: () => size(R[k]).width, height: () => size(R[k]).height, duration: 0.9, ease: "power3.inOut",
          onStart: () => chips.forEach((c, j) => c.classList.toggle("is-on", j === k)) }, "+=1.4")
          .fromTo(".ratio__sweep", { xPercent: -100 }, { xPercent: 100, duration: 0.8, ease: "power2.inOut" }, "<0.3");
      });
      ST.create({ trigger: box, start: "top 85%", end: "bottom 10%", invalidateOnRefresh: true, onToggle: (s) => (s.isActive ? tl.play() : tl.pause()), onRefresh: () => tl.invalidate() });
    }

    // números: o cursor da régua anda com a rolagem
    gsap.fromTo("#rulerHead", { left: "0%" }, { left: "100%", ease: "none",
      scrollTrigger: { trigger: "#fatos", start: "top 90%", end: "bottom 30%", scrub: 0.6 } });

    window.addEventListener("load", () => ST.refresh());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startGsap); else startGsap();
})();
