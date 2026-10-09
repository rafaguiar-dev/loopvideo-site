/* =====================================================================================================
   CONFIG: troque aqui os dados da oferta. Tudo que estiver entre [colchetes] aparece destacado em
   amarelo na página até ser preenchido. Ex.: preco: "R$ 297", linkCheckout: "https://pay.exemplo.com/..."
   ===================================================================================================== */
const CONFIG = {
  plano: "[PLANO: mensal ou vitalício]",      // "mensal" ou "vitalício" (também escolhe a resposta da FAQ "É assinatura?")
  preco: "[PREÇO]",                           // ex.: "R$ 297"
  precoAncora: "[PREÇO_ANCORA]",              // ex.: "R$ 497"
  parcelas: "[PARCELAS]",                     // ex.: "12x de R$ 29,70"
  qtdPcs: "[QTD_PCS]",                        // ex.: "1"
  diasGarantia: "[DIAS_GARANTIA]",            // ex.: "7"
  linkCheckout: "[LINK_CHECKOUT]",            // URL do checkout (botões da oferta e da chamada final)
  plataformaPagamento: "[PLATAFORMA_PAGAMENTO]", // ex.: "Hotmart"
  emailSuporte: "[EMAIL_SUPORTE]",            // ex.: "suporte@exemplo.com"
};

(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSet = (v) => typeof v === "string" && v.trim() !== "" && !/^\[.*\]$/.test(v.trim());

  /* ---------- CONFIG → página ---------- */
  function applyConfig() {
    $$("[data-cfg]").forEach((el) => {
      const v = CONFIG[el.dataset.cfg];
      if (isSet(v)) { el.textContent = v; el.classList.remove("ph"); }
    });
    $$("[data-cfg-href]").forEach((a) => {
      const v = CONFIG[a.dataset.cfgHref];
      if (isSet(v)) { a.href = v; a.rel = "noopener"; }
      else { a.href = "#oferta"; a.title = "Defina CONFIG." + a.dataset.cfgHref + " em assets/js/main.js"; }
    });
    $$("[data-cfg-mailto]").forEach((a) => {
      const v = CONFIG[a.dataset.cfg];
      if (isSet(v)) a.href = "mailto:" + v;
    });
    // FAQ "É assinatura?": mostra só a frase do plano escolhido
    const plano = isSet(CONFIG.plano) ? CONFIG.plano.toLowerCase() : "";
    const frases = { mensal: "Renova a cada 30 dias e você pode cancelar quando quiser.", vitalicio: "Paga uma vez e usa sem mensalidade." };
    const escolhido = /mensal/.test(plano) ? "mensal" : /vital/.test(plano) ? "vitalicio" : "";
    if (escolhido) {
      $$("[data-plano]").forEach((el) => {
        if (el.dataset.plano === escolhido) { el.textContent = frases[escolhido]; el.classList.remove("ph"); }
        else el.remove();
      });
    }
  }
  applyConfig();

  /* ---------- ticker: duplica a fila pra rolar sem emenda ---------- */
  const row = $(".ticker__row");
  if (row) { const c = row.cloneNode(true); c.setAttribute("aria-hidden", "true"); row.parentNode.appendChild(c); }

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const heroCta = $('[data-cta="hero"]');
  if (heroCta && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => nav.classList.toggle("is-cta", !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroCta);
  }

  /* ---------- vídeos: carregam perto da tela, tocam só quando visíveis ---------- */
  function lazyVideo(video, { autoplay = true, onReady } = {}) {
    if (!video) return () => {};
    let loaded = false;
    const load = () => {
      if (loaded) return; loaded = true;
      $$("source[data-src]", video).forEach((s) => { s.src = s.dataset.src; });
      video.load(); onReady && onReady();
    };
    if (!("IntersectionObserver" in window)) { load(); return load; }
    new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) load(); }), { rootMargin: "400px 0px" }).observe(video);
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting && autoplay && !reduce) { const p = video.play(); p && p.catch(() => {}); }
      else if (!e.isIntersecting) video.pause();
    }), { threshold: 0.15 }).observe(video);
    return load;
  }

  /* ---------- hero: anel, timecode e passos acompanham o vídeo ---------- */
  const heroVideo = $("#heroVideo");
  const ring = $("#heroRing");
  const tcEl = $("#heroTc");
  const steps = $$("#heroSteps li");
  const HERO_D = 15.66;           // duração da composição (motion/hero)
  const CUTS = [0, 1.85, 9.0, HERO_D];
  const fmt = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");

  function heroFrame(t) {
    const p = Math.min(1, Math.max(0, t / HERO_D));
    ring.style.strokeDashoffset = String(1 - p);
    tcEl.textContent = fmt(Math.min(150, p * 150 + 0.25));
    steps.forEach((li, i) => {
      const a = CUTS[i], b = CUTS[i + 1];
      const f = Math.min(1, Math.max(0, (t - a) / (b - a)));
      li.querySelector("i").style.transform = "scaleX(" + f + ")";
      li.classList.toggle("is-on", t >= a && t < b);
    });
  }
  if (heroVideo) {
    if (reduce) {
      heroVideo.removeAttribute("autoplay"); heroVideo.pause();
      ring.style.strokeDashoffset = "0"; tcEl.textContent = "2:30";
      steps.forEach((li) => { li.classList.add("is-on"); li.querySelector("i").style.transform = "scaleX(1)"; });
    } else {
      let raf = 0, visible = true;
      const loop = () => { heroFrame(heroVideo.currentTime || 0); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible) { const p = heroVideo.play(); p && p.catch(() => {}); if (!raf) raf = requestAnimationFrame(loop); }
          else { heroVideo.pause(); cancelAnimationFrame(raf); raf = 0; }
        }, { threshold: 0.05 }).observe(heroVideo);
      }
    }
  }

  /* ---------- demo: foto × vídeo ---------- */
  const compare = $("#compare");
  const range = $("#compareRange");
  const demoVideo = $("#demoVideo");
  let touched = false;
  if (compare && range) {
    const set = (v) => compare.style.setProperty("--pos", v + "%");
    range.addEventListener("input", () => {
      touched = true; set(range.value); loadDemo();
      if (demoVideo.paused) { const p = demoVideo.play(); p && p.catch(() => {}); }
    });
    const loadDemo = lazyVideo(demoVideo);
  }

  /* ---------- ferramentas: abas seguem o vídeo ---------- */
  const tabs = $$(".tool");
  const toolsVideo = $("#toolsVideo");
  const panel = $("#toolsPanel");
  const CH = [0, 4.0, 7.6, 11.2];    // começo de cada aba no motion/ferramentas (já sem a fusão)
  let current = -1;
  function setTab(i, focus) {
    if (i === current) return; current = i;
    tabs.forEach((t, k) => {
      const on = k === i;
      t.classList.toggle("is-on", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tabs[i].id);
    if (focus) tabs[i].focus();
  }
  if (tabs.length && toolsVideo) {
    setTab(0);
    const loadTools = lazyVideo(toolsVideo);
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => {
        setTab(i); loadTools();
        const seek = () => { try { toolsVideo.currentTime = CH[i] + 0.02; } catch (e) {} };
        if (toolsVideo.readyState >= 1) seek(); else toolsVideo.addEventListener("loadedmetadata", seek, { once: true });
        if (toolsVideo.paused && !reduce) { const p = toolsVideo.play(); p && p.catch(() => {}); }
      });
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return; e.preventDefault();
        const n = (i + d + tabs.length) % tabs.length; setTab(n, true); tabs[n].click();
      });
    });
    const tick = () => {
      const t = toolsVideo.currentTime || 0;
      let i = t < 3.8 ? 0 : t < 7.4 ? 1 : 2;
      if (!toolsVideo.paused) setTab(i);
      const a = CH[current], b = CH[current + 1];
      const f = Math.min(1, Math.max(0, (t - a) / (b - a)));
      const bar = tabs[current] && tabs[current].querySelector(".tool__prog i");
      if (bar) bar.style.transform = "scaleX(" + f + ")";
    };
    toolsVideo.addEventListener("timeupdate", tick);
    if (!reduce) { const raf = () => { if (!toolsVideo.paused) tick(); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
  }

  /* ---------- a faixa que vira anel (seção #loop) ---------- */
  const curl = (function () {
    const svg = $("#curlSvg");
    if (!svg) return null;
    const el = (id) => document.getElementById(id);
    const segA = el("cSegA"), segB = el("cSegB"), glowA = el("cGlowA"), glowB = el("cGlowB");
    const ticks = el("cTicks"), hatch = el("cHatch");
    const labA = el("cLabelA"), labB = el("cLabelB"), fStart = el("cStart"), fEnd = el("cEnd");
    const join = el("cJoin"), head = el("cHead"), center = el("cCenter"), tc = el("cTc");
    const world = el("curlWorld");
    let VW = 1200, VH = 560, L = 1100, mobile = false;
    let state = { p: 0, ox: 0, oy: 0, k: 0 };

    function layout() {
      mobile = window.innerWidth < 700;
      VW = mobile ? 700 : 1200; VH = mobile ? 640 : 560; L = mobile ? 1000 : 1100;
      svg.setAttribute("viewBox", "0 0 " + VW + " " + VH);
    }
    const ptAt = (k, s) => (k < 1e-7 ? [s, 0] : [Math.sin(k * s) / k, (1 - Math.cos(k * s)) / k]);
    const tanAt = (k, s) => [Math.cos(k * s), Math.sin(k * s)];
    function P(s) { const q = ptAt(state.k, s); return [q[0] + state.ox, q[1] + state.oy]; }
    function poly(a, b, n) {
      let d = "";
      for (let i = 0; i <= n; i++) { const s = a + (b - a) * (i / n); const q = P(s); d += (i ? "L" : "M") + q[0].toFixed(1) + " " + q[1].toFixed(1); }
      return d;
    }
    function draw(p) {
      p = Math.max(0, Math.min(1, p));
      state.p = p;
      const ease = p < 1 ? p * p * (3 - 2 * p) : 1; // suave nas pontas
      const k = (ease * 2 * Math.PI) / L; state.k = k;
      // centraliza pelo contorno
      let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
      for (let i = 0; i <= 64; i++) { const q = ptAt(k, (L * i) / 64); minx = Math.min(minx, q[0]); maxx = Math.max(maxx, q[0]); miny = Math.min(miny, q[1]); maxy = Math.max(maxy, q[1]); }
      state.ox = VW / 2 - (minx + maxx) / 2;
      state.oy = VH / 2 - (miny + maxy) / 2 + (mobile ? 20 : 18);
      // no meio da curva o desenho fica maior que a caixa: encolhe um pouco pra caber
      const padX = mobile ? 200 : 130, padY = mobile ? 110 : 90;
      const sc = Math.min(1, (VW - 20) / (maxx - minx + padX * 2), (VH - 10) / (maxy - miny + padY * 2));
      world.setAttribute("transform", "translate(" + (VW / 2 * (1 - sc)).toFixed(1) + " " + (VH / 2 * (1 - sc)).toFixed(1) + ") scale(" + sc.toFixed(4) + ")");
      const cut = (L * 2) / 3, gap = 3;
      const dA = poly(0, cut - gap, 120), dB = poly(cut + gap, L, 60);
      segA.setAttribute("d", dA); glowA.setAttribute("d", dA);
      segB.setAttribute("d", dB); glowB.setAttribute("d", dB);
      // marcas de quadro no principal, hachura na volta
      let t = "";
      for (let s = 14; s < cut - 8; s += 22) {
        const q = P(s), tg = tanAt(k, s), n = [-tg[1], tg[0]];
        t += "M" + (q[0] + n[0] * 11).toFixed(1) + " " + (q[1] + n[1] * 11).toFixed(1) + "L" + (q[0] - n[0] * 11).toFixed(1) + " " + (q[1] - n[1] * 11).toFixed(1);
      }
      ticks.setAttribute("d", t);
      let h = "";
      for (let s = cut + 10; s < L - 4; s += 11) {
        const q = P(s), tg = tanAt(k, s), n = [-tg[1], tg[0]];
        h += "M" + (q[0] + n[0] * 13 - tg[0] * 6).toFixed(1) + " " + (q[1] + n[1] * 13 - tg[1] * 6).toFixed(1) +
             "L" + (q[0] - n[0] * 13 + tg[0] * 6).toFixed(1) + " " + (q[1] - n[1] * 13 + tg[1] * 6).toFixed(1);
      }
      hatch.setAttribute("d", h);
      // rótulos por fora da curva
      const lab = (g, s, off) => {
        const q = P(s), tg = tanAt(k, s), ox = tg[1], oy = -tg[0]; // normal pra fora da curva
        const anchor = ox > 0.4 ? "start" : ox < -0.4 ? "end" : "middle";
        const dy = oy > 0.4 ? (mobile ? 24 : 18) : oy < -0.4 ? -2 : 7;
        g.firstElementChild.setAttribute("text-anchor", anchor);
        g.setAttribute("transform", "translate(" + (q[0] + ox * off).toFixed(1) + " " + (q[1] + oy * off + dy).toFixed(1) + ")");
      };
      lab(labA, cut / 2, mobile ? 36 : 32); lab(labB, (cut + L) / 2, mobile ? 36 : 32);
      // os dois quadros (primeiro e último) se encontram na emenda
      const sep = 46 * (1 - Math.max(0, (p - 0.82) / 0.18));
      const q0 = P(0), t0 = tanAt(k, 0), qL = P(L), tL = tanAt(k, L);
      fStart.setAttribute("transform", "translate(" + (q0[0] - t0[0] * sep).toFixed(1) + " " + (q0[1] - t0[1] * sep).toFixed(1) + ")");
      fEnd.setAttribute("transform", "translate(" + (qL[0] + tL[0] * sep).toFixed(1) + " " + (qL[1] + tL[1] * sep).toFixed(1) + ")");
      const closed = p >= 0.995;
      join.setAttribute("transform", "translate(" + q0[0].toFixed(1) + " " + q0[1].toFixed(1) + ")");
      join.setAttribute("opacity", closed ? "1" : String(Math.max(0, (p - 0.9) / 0.1) * 0.6));
      const cx = VW / 2 + (state.ox - VW / 2) * sc, cy = VH / 2 + (state.oy + (k > 1e-7 ? 1 / k : 0) - VH / 2) * sc;
      center.setAttribute("transform", "translate(" + cx.toFixed(1) + " " + cy.toFixed(1) + ")");
      center.setAttribute("opacity", String(Math.max(0, (p - 0.85) / 0.15)));
      head.setAttribute("opacity", closed ? "1" : "0");
      if (!closed) tc.textContent = "0:00";
    }
    // depois de fechado, um cursor dá a volta e o tempo corre até 2:30
    let s0 = 0, lastT = 0, running = false, total = 0;
    const LAP = 1.5;  // segundos por volta na tela
    function spin(now) {
      if (!running) return;
      const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 0; lastT = now;
      if (state.p >= 0.995) {
        total += dt; const lapF = total / LAP;
        s0 = (lapF % 1) * L;
        const q = P(s0); head.setAttribute("cx", q[0].toFixed(1)); head.setAttribute("cy", q[1].toFixed(1));
        const sec = Math.min(150, (lapF % 10) * 15);
        tc.textContent = fmt(sec);
      }
      requestAnimationFrame(spin);
    }
    function play(on) { if (on && !running && !reduce) { running = true; lastT = 0; requestAnimationFrame(spin); } else if (!on) running = false; }
    layout(); draw(0);
    window.addEventListener("resize", () => { const was = mobile; layout(); if (was !== mobile || true) draw(state.p); });
    return { draw, play, setStatic() { draw(1); tc.textContent = "2:30"; const q = P(0); head.setAttribute("cx", q[0]); head.setAttribute("cy", q[1]); } };
  })();

  /* ---------- GSAP ---------- */
  function startGsap() {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap) { document.documentElement.classList.remove("js"); if (curl) curl.setStatic(); return; }
    if (ST) gsap.registerPlugin(ST);
    const IN = "power3.out";

    if (reduce) {
      gsap.set("[data-intro], [data-intro-stage]", { opacity: 1 });
      if (curl) curl.setStatic();
      $("#rulerHead") && gsap.set("#rulerHead", { left: "100%" });
      return;
    }

    // abertura: um único momento orquestrado
    const intro = gsap.timeline({ defaults: { ease: IN } });
    intro.fromTo(".nav", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
      .fromTo("[data-intro]", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.1)
      .fromTo("[data-intro-stage]", { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.25);

    if (!ST) { if (curl) curl.setStatic(); return; }

    // régua dos números: o cursor anda com a rolagem
    gsap.fromTo("#rulerHead", { left: "0%" }, { left: "100%", ease: "none",
      scrollTrigger: { trigger: "#fatos", start: "top 90%", end: "bottom 30%", scrub: 0.6 } });

    // o "pulo" do trecho repetido
    const track = $("#jumpTrack");
    if (track) {
      const seams = $$(".jump__seam", track), headEl = $("#jumpHead"), jtc = $("#jumpTc");
      const st = { x: 0 };
      let lastHit = -1;
      const jt = gsap.timeline({ repeat: -1, paused: true });
      jt.to(st, { x: 1, duration: 6, ease: "none", onUpdate() {
        const w = track.clientWidth; const x = st.x * w;
        headEl.style.transform = "translateX(" + x + "px)";
        jtc.textContent = fmt(st.x * 30);
        seams.forEach((s, i) => {
          const c = s.offsetLeft + s.offsetWidth / 2; const hit = Math.abs(x - c) < 10;
          s.classList.toggle("is-hit", hit);
          if (hit && lastHit !== i) { lastHit = i; track.classList.remove("is-shake"); void track.offsetWidth; track.classList.add("is-shake"); }
        });
        if (st.x < 0.05) lastHit = -1;
      } }).to({}, { duration: 0.6 });
      ST.create({ trigger: track, start: "top 90%", end: "bottom 10%", onToggle: (self) => (self.isActive ? jt.play() : jt.pause()) });
    }

    // faixa → anel
    if (curl) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (min-height: 640px)", () => {
        const t = ST.create({ trigger: "#loopPin", start: "top top", end: "+=120%", pin: true, scrub: 0.6,
          onUpdate: (self) => curl.draw(Math.min(1, self.progress / 0.82)) });
        const v = ST.create({ trigger: "#loop", start: "top bottom", end: "bottom top", onToggle: (s) => curl.play(s.isActive) });
        return () => { t.kill(); v.kill(); };
      });
      mm.add("(max-width: 899.98px), (max-height: 639.98px)", () => {
        const t = ST.create({ trigger: "#curl", start: "top 85%", end: "center 45%", scrub: 0.5,
          onUpdate: (self) => curl.draw(self.progress) });
        const v = ST.create({ trigger: "#loop", start: "top bottom", end: "bottom top", onToggle: (s) => curl.play(s.isActive) });
        return () => { t.kill(); v.kill(); };
      });
    }

    // demo: a divisória mostra que dá pra arrastar
    if (compare) {
      ST.create({ trigger: compare, start: "top 70%", once: true, onEnter: () => {
        if (touched) return;
        const o = { v: 92 };
        gsap.to(o, { v: 50, duration: 1.4, ease: "power3.inOut", onUpdate: () => { if (!touched) { compare.style.setProperty("--pos", o.v + "%"); range.value = o.v; } } });
      } });
    }

    // vídeo próprio: as barras entram e a volta fecha o arco
    const pv = $("#proprioViz");
    if (pv) {
      const arc = $("#pvArc");
      const tl = gsap.timeline({ scrollTrigger: { trigger: pv, start: "top 80%", once: true }, defaults: { ease: IN } });
      tl.fromTo(".pv__bar--mine", { scaleX: 0 }, { scaleX: 1, duration: 0.6 })
        .fromTo(".pv__bar--back", { scaleX: 0 }, { scaleX: 1, duration: 0.45 }, "-=0.15")
        .fromTo(arc, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.1")
        .fromTo(".pv__old", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 }, "-=0.25")
        .fromTo(".pv__new", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.15");
    }

    window.addEventListener("load", () => ST.refresh());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startGsap); else startGsap();
})();
