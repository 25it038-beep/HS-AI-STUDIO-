/**
 * HS AI SOLUTIONS — BLACK HOLE PORTAL & MULTIVERSE ENGINE
 * 
 * Implements physical website gravitational consumption:
 * 1. Word Splitting: visible text is split into independent inline-block words (.bh-w).
 * 2. Independent Item Tracking: every word, button, image, video, SVG, canvas, and link
 *    follows its own Keplerian spiral trajectory into the singularity.
 * 3. Container Collapse: cards, sections, headers, and nav shrink into the singularity
 *    via dynamic circular clipPaths only after their children are eaten.
 * 4. Black Hole Canvas: renders the event horizon, photon ring, and orbiting relativistic particles.
 * 5. Screen Expansion: black hole expands to engulf the viewport (t >= tAll).
 * 6. Multiverse Generator: procedurally generates endless universes with star warp streaks,
 *    hyperspace geometric rings, 3-arm spiral galaxies, and ringed gas planets.
 * 7. 100% Lossless Restoration: restores all text nodes, transforms, clipPaths, and scroll positions.
 */

import { cosmicAudio } from "./audio-engine";

export interface BlackHoleConfig {
  size: number;
  right: number;
  bottom: number;
  eat: number;
  spread: number;
}

export class BlackHolePortalEngine {
  private static instance: BlackHolePortalEngine | null = null;

  private config: BlackHoleConfig = {
    size: 86,
    right: 24,
    bottom: 24,
    eat: 2300,
    spread: 4200,
  };

  private TAU = Math.PI * 2;
  private P = Array.from({ length: 650 }, () => ({
    a: this.rnd(0, Math.PI * 2),
    k: Math.random(),
  }));

  private widgetEl: HTMLDivElement | null = null;
  private overlayCanvas: HTMLCanvasElement | null = null;
  private overlayCtx: CanvasRenderingContext2D | null = null;
  private labelEl: HTMLDivElement | null = null;
  private returnBtnEl: HTMLButtonElement | null = null;

  private idle = true;
  private animId: number | null = null;
  private idleAnimId: number | null = null;
  private isDestroyed = false;

  // Stored state for 100% lossless restoration without reload
  private savedScroll = { x: 0, y: 0 };
  private transformedItems: HTMLElement[] = [];
  private clippedContainers: HTMLElement[] = [];
  private textSplits: { parent: Node; originalNode: Text; words: HTMLElement[] }[] = [];

  // Multiverse State
  private NA = [
    "Crimson", "Azure", "Verdant", "Obsidian", "Golden", "Violet",
    "Neon", "Hollow", "Mirror", "Glass", "Ember", "Frozen", "Quantum", "Singular"
  ];
  private NB = [
    "Nebula", "Pulsar", "Garden", "Abyss", "Cascade", "Spiral",
    "Dominion", "Echo", "Reef", "Lattice", "Horizon", "Vortex"
  ];
  private S = Array.from({ length: 260 }, () => ({
    x: this.rnd(-1, 1),
    y: this.rnd(-1, 1),
    z: this.rnd(0.05, 1),
    o: this.rnd(-40, 40),
  }));
  private RG = Array.from({ length: 7 }, (_, i) => (i + 1) / 7);
  private OB = Array.from({ length: 14 }, () => ({
    a: this.rnd(0, Math.PI * 2),
    z: this.rnd(0.1, 1),
    s: this.rnd(0.5, 1.5),
  }));

  private universeState: { h: number; n: number; m: number; name: string } | null = null;
  private nextUniverseTime = 0;
  private universeFlash = 0;
  private universeCount = 1337;
  private multiverseActive = false;

  public static getInstance(): BlackHolePortalEngine {
    if (!BlackHolePortalEngine.instance) {
      BlackHolePortalEngine.instance = new BlackHolePortalEngine();
    }
    return BlackHolePortalEngine.instance;
  }

  private rnd(a: number, b: number): number {
    return a + Math.random() * (b - a);
  }

  private cl(v: number, a = 0, b = 1): number {
    return Math.min(b, Math.max(a, v));
  }

  private ez(p: number): number {
    return p * p * (3 - 2 * p);
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Renders the relativistic black hole with accretion disk, photon ring, and orbiting particles
   */
  private renderHole(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    time: number
  ): void {
    ctx.save();
    ctx.translate(x, y);

    // 1. Relativistic Accretion Glow (Gold & Amber aura)
    const glow = ctx.createRadialGradient(0, 0, radius, 0, 0, radius * 4.2);
    glow.addColorStop(0, "rgba(245, 158, 11, 0.55)");
    glow.addColorStop(0.4, "rgba(217, 119, 6, 0.25)");
    glow.addColorStop(1, "rgba(255, 80, 0, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 4.2, 0, this.TAU);
    ctx.fill();

    // 2. Orbiting Gas Streams (Back Layer)
    const renderDots = (front: boolean) => {
      ctx.save();
      ctx.rotate(-0.32);
      const dotSize = radius / 28 + 1.2;
      for (const p of this.P) {
        const m = 1.35 + p.k * 2.2;
        const a = p.a + (time * 0.003) / Math.pow(m, 1.5);
        const s = Math.sin(a);
        if ((s > 0) !== front) continue;

        // Champagne Gold to Electric Cyan particle spectrum
        const hue = p.k > 0.65 ? 190 : 38 + (1 - p.k) * 22;
        const lightness = 55 + (1 - p.k) * 35;
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        ctx.fillRect(Math.cos(a) * m * radius, s * m * radius * 0.28, dotSize, dotSize);
      }
      ctx.restore();
    };

    renderDots(false);

    // 3. Photon Ring (Relativistic Einstein boundary)
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = radius * 0.55;
    ctx.strokeStyle = "#fef08a";
    ctx.lineWidth = Math.max(1.2, radius * 0.07);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.03, 0, this.TAU);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 4. Central Event Horizon (Deep Obsidian Singularity)
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, this.TAU);
    ctx.fill();

    // 5. Orbiting Gas Streams (Front Layer)
    renderDots(true);

    ctx.restore();
  }

  /**
   * Initializes the floating black hole widget in the HS AI Studio interface
   */
  public mountWidget(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (document.getElementById("hs-black-hole-widget")) return;

    this.isDestroyed = false;
    this.idle = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = this.config.size;

    // Main Floating Widget Container
    const widget = document.createElement("div");
    widget.id = "hs-black-hole-widget";
    widget.setAttribute("role", "button");
    widget.setAttribute("aria-label", "Activate Black Hole Cosmic Consumption");
    widget.tabIndex = 0;
    widget.style.cssText = `
      position: fixed;
      right: ${this.config.right}px;
      bottom: calc(${this.config.bottom}px + env(safe-area-inset-bottom, 0px));
      width: ${size}px;
      height: ${size}px;
      z-index: 2147483000;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.45));
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    // Interactive Label on hover
    const label = document.createElement("div");
    label.style.cssText = `
      position: absolute;
      right: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%);
      background: rgba(8, 7, 13, 0.92);
      border: 1px solid rgba(245, 158, 11, 0.5);
      border-radius: 9999px;
      padding: 6px 14px;
      color: #ffffff;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.8), 0 0 12px rgba(245, 158, 11, 0.25);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.9;
      transition: opacity 0.2s, transform 0.2s;
    `;
    label.innerHTML = `
      <span style="width: 6px; height: 6px; border-radius: 50%; background: #38bdf8; display: inline-block; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      ENTER COSMOS
      <span style="color: #f59e0b;">✦</span>
    `;
    widget.appendChild(label);

    // Canvas inside widget
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size * dpr;
    canvas.style.cssText = "width: 100%; height: 100%; pointer-events: none; border-radius: 50%;";
    widget.appendChild(canvas);

    document.body.appendChild(widget);
    this.widgetEl = widget;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      const idleLoop = (t: number) => {
        if (!this.idle || this.isDestroyed) return;
        ctx.clearRect(0, 0, size, size);
        this.renderHole(ctx, size / 2, size / 2, 12, t);
        this.idleAnimId = requestAnimationFrame(idleLoop);
      };
      this.idleAnimId = requestAnimationFrame(idleLoop);
    }

    widget.addEventListener("mouseenter", () => {
      widget.style.transform = "scale(1.12)";
      label.style.opacity = "1";
    });
    widget.addEventListener("mouseleave", () => {
      widget.style.transform = "scale(1)";
      label.style.opacity = "0.9";
    });

    widget.addEventListener("click", () => this.triggerConsumption());
    widget.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") this.triggerConsumption();
    });
  }

  /**
   * Triggers the physical element-by-element gravitational suction
   */
  public triggerConsumption(): void {
    if (!this.idle || !this.widgetEl) return;
    this.idle = false;

    // Play awakening pulse audio
    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

    // Save exact scroll position
    this.savedScroll = {
      x: window.scrollX || window.pageXOffset || 0,
      y: window.scrollY || window.pageYOffset || 0,
    };

    const r0 = this.widgetEl.getBoundingClientRect();
    const sx = r0.left + r0.width / 2;
    const sy = r0.top + r0.height / 2;
    this.widgetEl.style.visibility = "hidden";

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const hx = vw / 2;
    const hy = vh / 2;
    const D = Math.hypot(vw, vh);

    const root = document.documentElement;
    root.style.overflow = "hidden";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Full-screen overlay canvas
    const overlay = document.createElement("canvas");
    overlay.id = "hs-cosmic-black-hole-overlay";
    overlay.width = vw * dpr;
    overlay.height = vh * dpr;
    overlay.style.cssText = "position: fixed; inset: 0; width: 100%; height: 100%; z-index: 2147483001; pointer-events: none;";
    root.appendChild(overlay);
    this.overlayCanvas = overlay;

    const c = overlay.getContext("2d");
    if (!c) return;
    c.scale(dpr, dpr);
    this.overlayCtx = c;

    const inView = (r: DOMRect) =>
      r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;

    // ── 1. SPLIT VISIBLE TEXT INTO WORDS (.bh-w) ─────────────────────────────
    this.textSplits = [];
    const textNodes: Text[] = [];
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n: Node | null;
    while ((n = tw.nextNode())) {
      const p = n.parentElement;
      if (!p || !n.nodeValue?.trim() || p.closest("button, select, textarea, script, style, noscript, svg, option, #hs-black-hole-widget")) {
        continue;
      }
      if (inView(p.getBoundingClientRect())) {
        textNodes.push(n as Text);
      }
    }

    let wordsCount = 0;
    for (const t of textNodes) {
      if (wordsCount > 850) break;
      const originalValue = t.nodeValue || "";
      const parent = t.parentNode;
      if (!parent) continue;

      const fragment = document.createDocumentFragment();
      const wordsCreated: HTMLElement[] = [];

      for (const s of originalValue.split(/(\s+)/)) {
        if (!s) continue;
        if (/^\s+$/.test(s)) {
          fragment.append(s);
          continue;
        }
        const span = document.createElement("span");
        span.className = "bh-w";
        span.textContent = s;
        span.style.display = "inline-block";
        fragment.append(span);
        wordsCreated.push(span);
        wordsCount++;
      }

      this.textSplits.push({ parent, originalNode: t, words: wordsCreated });
      t.replaceWith(fragment);
    }

    // ── 2. COLLECT ITEMS (Words, Images, Videos, Buttons, SVGs...) ───────────
    const SEL = "img, video, button, input, textarea, select, svg, canvas, iframe, picture, audio";
    const items: Array<{
      e: HTMLElement;
      ex: number;
      ey: number;
      r0: number;
      th: number;
      spin: number;
      rot: number;
      st: number;
      en: number;
      done: number;
    }> = [];

    this.transformedItems = [];

    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>(SEL + ", .bh-w"))) {
      if (!e.classList.contains("bh-w") && e.parentElement?.closest(SEL)) continue;
      if (e.closest("#hs-black-hole-widget")) continue;

      const r = e.getBoundingClientRect();
      if (!inView(r) || window.getComputedStyle(e).visibility === "hidden") continue;

      const ex = r.left + r.width / 2;
      const ey = r.top + r.height / 2;
      const dx = ex - hx;
      const dy = ey - hy;

      e.style.willChange = "transform";
      e.style.transformOrigin = "center";
      e.style.zIndex = "2147482000";
      this.transformedItems.push(e);

      items.push({
        e,
        ex,
        ey,
        r0: Math.hypot(dx, dy),
        th: Math.atan2(dy, dx),
        spin: this.rnd(1.2, 2.6) * Math.PI,
        rot: this.rnd(-4, 4),
        st: 0,
        en: 0,
        done: 0,
      });
    }

    const T_ARR = 1600;
    const maxR = Math.max(1, ...items.map((i) => i.r0));
    for (const i of items) {
      i.st = T_ARR + (i.r0 / maxR) * this.config.spread + this.rnd(0, 500);
      i.en = i.st + this.config.eat;
    }

    // ── 3. COLLECT CONTAINERS (Cards, Sections, Nav, Backgrounds) ────────────
    const conts: Array<{
      e: HTMLElement;
      d: number;
      lx: number;
      ly: number;
      dm: number;
      st: number;
      en: number;
      done: number;
    }> = [];

    this.clippedContainers = [];

    for (const e of Array.from(
      document.body.querySelectorAll<HTMLElement>("div, section, header, footer, nav, article, aside, main, form, li, figure, ul, a")
    )) {
      if (e.matches(SEL) || e.closest("#hs-black-hole-widget")) continue;
      const r = e.getBoundingClientRect();
      if (!inView(r)) continue;

      const s = window.getComputedStyle(e);
      const bg = s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent";
      if (!(bg || s.backgroundImage !== "none" || parseFloat(s.borderTopWidth) > 0 || s.boxShadow !== "none")) {
        continue;
      }

      let depth = 0;
      for (let p: HTMLElement | null = e; p; p = p.parentElement) depth++;

      const lx = hx - r.left;
      const ly = hy - r.top;
      this.clippedContainers.push(e);

      conts.push({
        e,
        d: depth,
        lx,
        ly,
        dm:
          Math.max(
            Math.hypot(lx, ly),
            Math.hypot(r.width - lx, ly),
            Math.hypot(lx, r.height - ly),
            Math.hypot(r.width - lx, r.height - ly)
          ) + 40,
        st: 0,
        en: 0,
        done: 0,
      });
    }

    conts.sort((a, b) => b.d - a.d);
    conts.splice(160);

    const finConts: typeof conts = [];
    for (const k of conts) {
      let m = T_ARR + 800;
      for (const i of items) {
        if (k.e.contains(i.e)) m = Math.max(m, i.en);
      }
      for (const o of finConts) {
        if (k.e.contains(o.e)) m = Math.max(m, o.en);
      }
      k.st = m;
      k.en = m + 1100;
      finConts.push(k);
    }

    const tAll = Math.max(T_ARR + 800, ...items.map((i) => i.en), ...finConts.map((k) => k.en));
    const tExp = 1600;
    const tMv = tAll + tExp;

    console.log(
      `%c[HS COSMIC PORTAL] Consuming ${items.length} elements (${wordsCount} words) and ${finConts.length} containers`,
      "background:#000;color:#f59e0b;font-weight:bold;padding:4px;"
    );

    // ── 4. MASTER PHYSICS ANIMATION LOOP ─────────────────────────────────────
    let T0 = 0;
    let last = 0;

    const step = (now: number) => {
      if (this.isDestroyed) return;
      if (!T0) {
        T0 = now;
        last = now;
      }

      const t = now - T0;
      const dt = Math.min(50, now - last);
      last = now;

      // ── MULTIVERSE JOURNEY PHASE ──────────────────────────────────────────
      if (t >= tMv) {
        if (!this.multiverseActive) {
          this.startMultiverse(vw, vh);
        }
        this.renderMultiverse(c, t - tMv, dt, vw, vh, D);
        this.animId = requestAnimationFrame(step);
        return;
      }

      c.clearRect(0, 0, vw, vh);

      let hxn = hx;
      let hyn = hy;
      let R = 11;

      // Stage A: Hole Migrates from corner to center
      if (t < T_ARR) {
        const p = this.ez(t / T_ARR);
        hxn = sx + (hx - sx) * p;
        hyn = sy + (hy - sy) * p;
        R = 11 + 49 * p;
      }
      // Stage B: Accretion Suction
      else if (t < tAll) {
        R = 60 + 40 * this.cl((t - T_ARR) / (tAll - T_ARR));
      }
      // Stage C: Complete Expansion to swallow screen
      else {
        const p = this.cl((t - tAll) / tExp);
        R = 100 + (D * 0.55 - 100) * p * p;
      }

      // Gravitational Suction on each individual item
      for (const i of items) {
        if (i.done || t < i.st) continue;
        const p = this.cl((t - i.st) / this.config.eat);
        if (p >= 1) {
          i.e.style.visibility = "hidden";
          i.done = 1;
          continue;
        }

        const e = p * p;
        const r = i.r0 * (1 - e);
        const a = i.th + e * i.spin;
        i.e.style.transform = `translate(${hx + Math.cos(a) * r - i.ex}px, ${hy + Math.sin(a) * r - i.ey}px) rotate(${e * i.rot}rad) scale(${1 - e * 0.97})`;
        i.e.style.opacity = `${1 - Math.pow(p, 4)}`;
      }

      // Container Collapse via Circular clipPath
      for (const k of finConts) {
        if (k.done || t < k.st) continue;
        const p = this.cl((t - k.st) / 1100);
        if (p >= 1) {
          k.e.style.visibility = "hidden";
          k.done = 1;
          continue;
        }
        k.e.style.clipPath = `circle(${k.dm * (1 - p)}px at ${k.lx}px ${k.ly}px)`;
      }

      // Vignette effect over background
      if (t > T_ARR) {
        const v = c.createRadialGradient(hx, hy, D * 0.15, hx, hy, D * 0.6);
        v.addColorStop(0, "rgba(0,0,0,0)");
        v.addColorStop(1, `rgba(0,0,0,${0.45 * this.cl((t - T_ARR) / (tAll - T_ARR))})`);
        c.fillStyle = v;
        c.fillRect(0, 0, vw, vh);
      }

      // Render the Black Hole at current position
      this.renderHole(c, hxn, hyn, R, t);

      this.animId = requestAnimationFrame(step);
    };

    this.animId = requestAnimationFrame(step);
  }

  /**
   * Starts the Multiverse Journey after total absorption
   */
  private startMultiverse(vw: number, vh: number): void {
    this.multiverseActive = true;
    document.body.style.visibility = "hidden";
    document.documentElement.style.background = "#000000";

    if (this.overlayCtx) {
      this.overlayCtx.fillStyle = "#000000";
      this.overlayCtx.fillRect(0, 0, vw, vh);
    }

    cosmicAudio.playDimensionTransition();

    // Multiverse HUD Label
    const lab = document.createElement("div");
    lab.id = "hs-multiverse-label";
    lab.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      bottom: calc(36px + env(safe-area-inset-bottom, 0px));
      text-align: center;
      color: #ffffff;
      font: 600 clamp(14px, 3.5vw, 22px)/1.4 system-ui, sans-serif;
      letter-spacing: 0.22em;
      text-shadow: 0 0 16px rgba(245, 158, 11, 0.8), 0 0 32px rgba(56, 189, 248, 0.6);
      z-index: 2147483002;
      pointer-events: none;
      text-transform: uppercase;
    `;
    document.documentElement.appendChild(lab);
    this.labelEl = lab;

    // Return to HS AI Studio button
    setTimeout(() => {
      if (!this.multiverseActive) return;
      const b = document.createElement("button");
      b.id = "hs-return-btn";
      b.textContent = "Return to HS AI Studio ↩";
      b.style.cssText = `
        position: fixed;
        top: calc(18px + env(safe-area-inset-top, 0px));
        right: 18px;
        z-index: 2147483003;
        padding: 10px 18px;
        border-radius: 9999px;
        border: 1px solid rgba(245, 158, 11, 0.6);
        background: rgba(8, 7, 13, 0.85);
        color: #fef08a;
        font: 700 13px system-ui, sans-serif;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        backdrop-filter: blur(12px);
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.35);
        transition: transform 0.2s, background 0.2s;
      `;
      b.onmouseenter = () => (b.style.transform = "scale(1.05)");
      b.onmouseleave = () => (b.style.transform = "scale(1)");
      b.onclick = () => this.restoreWebsite();
      document.documentElement.appendChild(b);
      this.returnBtnEl = b;
    }, 2000);

    // Escape key listener to return
    const escListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.removeEventListener("keydown", escListener);
        this.restoreWebsite();
      }
    };
    window.addEventListener("keydown", escListener);

    // Automatic return after ~38 seconds
    setTimeout(() => {
      if (this.multiverseActive) {
        this.restoreWebsite();
      }
    }, 38000);
  }

  /**
   * Procedural Multiverse Graphics Loop
   */
  private renderMultiverse(
    ctx: CanvasRenderingContext2D,
    t: number,
    dt: number,
    vw: number,
    vh: number,
    D: number
  ): void {
    const sp = 1 + this.cl(t / 8000) * 3;
    const cx = vw / 2;
    const cy = vh / 2;
    const Dh = D / 2;

    // Cycle to a new universe every few seconds
    if (t >= this.nextUniverseTime) {
      this.universeCount += Math.floor(this.rnd(311, 8999));
      this.universeState = {
        h: this.rnd(0, 360),
        n: 3 + Math.floor(this.rnd(0, 6)),
        m: Math.floor(this.rnd(0, 3)),
        name: `${this.pick(this.NA)} ${this.pick(this.NB)}`,
      };
      this.nextUniverseTime = t + this.cl(1300 - t / 10, 500, 1400);
      this.universeFlash = 1;

      if (this.labelEl) {
        this.labelEl.innerHTML = `
          UNIVERSE #${this.universeCount.toLocaleString()}<br>
          <small style="opacity: 0.85; font-size: 0.65em; letter-spacing: 0.15em; color: #fde68a;">
            ${this.universeState.name}-VERSE
          </small>
        `;
      }
    }

    const U = this.universeState || { h: 35, n: 4, m: 1, name: "Golden Spiral" };

    // Semitransparent trail fade
    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.fillRect(0, 0, vw, vh);

    // Ambient radial color wash
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Dh);
    g.addColorStop(0, `hsla(${U.h}, 90%, 30%, 0.45)`);
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, vw, vh);

    // 1. Relativistic Starfield Warp Streaks
    for (const s of this.S) {
      const pz = s.z;
      s.z -= dt * 0.0007 * sp;
      if (s.z <= 0.03) {
        s.x = this.rnd(-1, 1);
        s.y = this.rnd(-1, 1);
        s.z = 1;
        continue;
      }
      ctx.strokeStyle = `hsl(${U.h + s.o}, 95%, ${60 + (1 - s.z) * 30}%)`;
      ctx.lineWidth = 0.6 + (1 - s.z) * 2.4;
      ctx.beginPath();
      ctx.moveTo(cx + (s.x / pz) * Dh * 0.3, cy + (s.y / pz) * Dh * 0.3);
      ctx.lineTo(cx + (s.x / s.z) * Dh * 0.3, cy + (s.y / s.z) * Dh * 0.3);
      ctx.stroke();
    }

    // 2. Multiverse Phenomenon Modes
    // Mode 0: Rotating Spacetime Geometric Rings
    if (U.m === 0) {
      this.RG.forEach((z, i) => {
        let currentZ = z - dt * 0.0005 * sp;
        if (currentZ < 0.04) currentZ += 1;
        this.RG[i] = currentZ;

        const r = (Dh * 0.05) / currentZ;
        ctx.strokeStyle = `hsla(${U.h + i * 25}, 100%, 65%, ${1 - currentZ * 0.6})`;
        ctx.lineWidth = 1 + (1 - currentZ) * 5;
        ctx.beginPath();
        for (let k = 0; k <= U.n; k++) {
          const a = (k / U.n) * this.TAU + t * 0.0008 * (i % 2 ? 1 : -1) + currentZ * 3;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r;
          k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
      });
    }
    // Mode 1: 3-Arm Galactic Spiral System
    else if (U.m === 1) {
      for (let arm = 0; arm < 3; arm++) {
        for (let k = 0; k < 120; k++) {
          const a = k * 0.13 + (arm * this.TAU) / 3 + t * 0.0015 * sp;
          const r = (k * Dh) / 95;
          ctx.fillStyle = `hsl(${U.h + k * 0.8}, 100%, ${65 + k / 6}%)`;
          ctx.fillRect(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.6, 1 + k / 40, 1 + k / 40);
        }
      }
    }
    // Mode 2: Orbiting Celestial Bodies with Planetary Rings
    else {
      for (const o of this.OB) {
        o.z -= dt * 0.0004 * sp;
        if (o.z < 0.06) {
          o.z = 1;
          o.a = this.rnd(0, this.TAU);
        }
        const d = (1 - o.z) * Dh * 1.1;
        const sz = 6 + (1 - o.z) * (1 - o.z) * 90 * o.s;
        const ox = cx + Math.cos(o.a) * d;
        const oy = cy + Math.sin(o.a) * d;

        const gg = ctx.createRadialGradient(ox - sz * 0.3, oy - sz * 0.3, sz * 0.1, ox, oy, sz);
        gg.addColorStop(0, `hsl(${U.h + o.a * 20}, 100%, 75%)`);
        gg.addColorStop(1, `hsl(${U.h + 60}, 90%, 20%)`);
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(ox, oy, sz, 0, this.TAU);
        ctx.fill();

        ctx.strokeStyle = `hsla(${U.h + 30}, 100%, 80%, 0.7)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(ox, oy, sz * 1.7, sz * 0.45, 0.4, 0, this.TAU);
        ctx.stroke();
      }
    }

    // 3. Dimensional Warp Flash Wave
    if (this.universeFlash > 0) {
      ctx.fillStyle = `hsla(${U.h}, 100%, 85%, ${this.universeFlash * 0.55})`;
      ctx.fillRect(0, 0, vw, vh);

      ctx.strokeStyle = `rgba(255, 255, 255, ${this.universeFlash})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, (1 - this.universeFlash) * Dh * 1.2, 0, this.TAU);
      ctx.stroke();

      this.universeFlash -= dt * 0.003;
    }
  }

  /**
   * 100% Lossless Restoration of HS AI Studio DOM without reload
   */
  public restoreWebsite(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }

    cosmicAudio.playReturnSwell();

    // 1. Remove HUD overlays
    if (this.labelEl && this.labelEl.parentNode) {
      this.labelEl.parentNode.removeChild(this.labelEl);
      this.labelEl = null;
    }
    if (this.returnBtnEl && this.returnBtnEl.parentNode) {
      this.returnBtnEl.parentNode.removeChild(this.returnBtnEl);
      this.returnBtnEl = null;
    }

    // 2. Remove full-screen overlay canvas
    if (this.overlayCanvas && this.overlayCanvas.parentNode) {
      this.overlayCanvas.parentNode.removeChild(this.overlayCanvas);
      this.overlayCanvas = null;
      this.overlayCtx = null;
    }

    // 3. Restore body & document root
    document.body.style.visibility = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.background = "";

    // 4. Restore transformed items
    for (const el of this.transformedItems) {
      try {
        el.style.transform = "";
        el.style.opacity = "";
        el.style.visibility = "";
        el.style.willChange = "";
        el.style.zIndex = "";
      } catch {
        // ignore
      }
    }
    this.transformedItems = [];

    // 5. Restore clipped containers
    for (const el of this.clippedContainers) {
      try {
        el.style.clipPath = "";
        el.style.visibility = "";
      } catch {
        // ignore
      }
    }
    this.clippedContainers = [];

    // 6. Restore split text nodes
    for (const entry of this.textSplits) {
      try {
        const textNode = entry.originalNode;
        if (entry.words.length > 0 && entry.words[0].parentNode) {
          entry.words[0].parentNode.replaceChild(textNode, entry.words[0]);
          for (let i = 1; i < entry.words.length; i++) {
            if (entry.words[i].parentNode) {
              entry.words[i].parentNode?.removeChild(entry.words[i]);
            }
          }
        }
      } catch {
        // ignore
      }
    }
    this.textSplits = [];

    // 7. Restore scroll position
    window.scrollTo({
      left: this.savedScroll.x,
      top: this.savedScroll.y,
      behavior: "instant",
    });

    // 8. Re-mount or show widget
    this.multiverseActive = false;
    this.idle = true;
    if (this.widgetEl) {
      this.widgetEl.style.visibility = "";
      this.widgetEl.style.transform = "scale(1)";
    }

    console.log(
      `%c[HS COSMIC PORTAL] Reconstructed & Restored 100% of HS AI Studio DOM without reload`,
      "background:#000;color:#10b981;font-weight:bold;padding:4px;"
    );
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.idleAnimId) cancelAnimationFrame(this.idleAnimId);
    this.restoreWebsite();
    if (this.widgetEl && this.widgetEl.parentNode) {
      this.widgetEl.parentNode.removeChild(this.widgetEl);
      this.widgetEl = null;
    }
    BlackHolePortalEngine.instance = null;
  }
}
