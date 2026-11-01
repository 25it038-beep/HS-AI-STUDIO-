/**
 * HS AI SOLUTIONS — BLACK HOLE PORTAL & MULTIVERSE JUMP → THE REAL UNIVERSE
 * 
 * Flow:
 * 1. Idle Black Hole Widget in corner with relativistic canvas rendering.
 * 2. On click:
 *    - Hole smoothly migrates to the center.
 *    - Splits visible text into words (.bh-w).
 *    - Gravitational suction pulls every word, button, image, video, and SVG into the singularity.
 *    - Containers collapse via dynamic circular clip-paths.
 *    - Black hole event horizon expands to swallow the entire viewport.
 * 3. MULTIVERSE JUMP:
 *    - 8 Multiverse Jumps (Universe 001, 014, 233, 1087, 9402, 77310, 640019, 2400000)
 *    - Relativistic warp streaks with dimensional space twists (tw)
 *    - Warp core glows, flash waves, and pop titles
 * 4. THE REAL UNIVERSE:
 *    - Relativistic deceleration to gentle drift
 *    - Procedural Milky Way galactic band (16,000 stars & dark dust rifts)
 *    - 24 deep field spiral galaxies + massive Home Galaxy
 *    - Pinprick stars with stellar cross diffraction spikes
 *    - "YOU ARE HERE" & "Home: the Milky Way · 100–400 billion stars"
 * 5. Automatic (or tap / Space / Escape) return to HS AI Studio with 100% lossless DOM reconstruction.
 */

import { cosmicAudio } from "./audio-engine";

export class BlackHolePortalEngine {
  private static instance: BlackHolePortalEngine | null = null;

  // Widget & Suction Configuration
  private C = {
    size: 86,
    right: 20,
    bottom: 20,
    eat: 2300,
    spread: 4200,
  };

  private TAU = Math.PI * 2;
  private P = Array.from({ length: 650 }, () => ({
    a: Math.random() * Math.PI * 2,
    k: Math.random(),
  }));

  // DOM Elements
  private widgetEl: HTMLDivElement | null = null;
  private overlayCanvas: HTMLCanvasElement | null = null;
  private overlayCtx: CanvasRenderingContext2D | null = null;
  private hudEl: HTMLDivElement | null = null;
  private titleEl: HTMLDivElement | null = null;
  private subEl: HTMLDivElement | null = null;
  private counterEl: HTMLDivElement | null = null;
  private returnPromptEl: HTMLDivElement | null = null;

  // State
  private idle = true;
  private animId: number | null = null;
  private idleAnimId: number | null = null;
  private isDestroyed = false;
  private mvActive = false;
  private autoReturnTimer: NodeJS.Timeout | null = null;

  // Lossless restoration tracking
  private savedScroll = { x: 0, y: 0 };
  private transformedItems: HTMLElement[] = [];
  private clippedContainers: HTMLElement[] = [];
  private textSplits: { parent: Node; originalNode: Text; words: HTMLElement[] }[] = [];

  // ── MULTIVERSE JUMP → THE REAL UNIVERSE STATE ──────────────────────────────
  private U_LIST = [
    { n: "UNIVERSE 001", s: "Gravity ×3 · light bends into spirals", h: 8, tw: 4, v: 1 },
    { n: "UNIVERSE 014", s: "Eleven dimensions · space crystallises", h: 185, tw: 0, v: 1.3 },
    { n: "UNIVERSE 233", s: "Time runs backward · dim violet suns", h: 275, tw: -3, v: 0.9 },
    { n: "UNIVERSE 1,087", s: "No dark matter · galaxies never form", h: 50, tw: 0, v: 0.7 },
    { n: "UNIVERSE 9,402", s: "Closed topology · you see your own back", h: 150, tw: 2, v: 1.2 },
    { n: "UNIVERSE 77,310", s: "Unstable constants · stars flicker out", h: 325, tw: 0, v: 1.6, fl: 1 },
    { n: "UNIVERSE 640,019", s: "Photon-only cosmos · no matter exists", h: 205, tw: -5, v: 1.1 },
    { n: "UNIVERSE 2,400,000", s: "Last echo · searching for ours…", h: 35, tw: 1, v: 1.8 },
  ];

  private D = 1.1; // seconds per multiverse jump
  private T_MULTIVERSE = 8 * 1.1; // 8.8 seconds total multiverse jumps
  private TC = ["170,200,255", "235,240,255", "255,240,205", "255,200,150"];

  // Stars & Galaxies
  private S: Array<{
    x: number;
    y: number;
    z: number;
    pz: number;
    r: number;
    tc: string;
    b: number;
  }> = [];

  private G: Array<{
    x: number;
    y: number;
    z: number;
    sz: number;
    tilt: number;
    rot: number;
    w: number;
  }> = [];

  private galSprite: HTMLCanvasElement | null = null;
  private bandSprite: HTMLCanvasElement | null = null;
  private Bw = 0;
  private Bh = 0;
  private PX = 0;
  private PY = 0;

  // Jump tracking
  private jumpTime = 0;
  private lastJumpNow = 0;
  private curJumpIdx = -1;
  private cap2Triggered = false;

  public static getInstance(): BlackHolePortalEngine {
    if (!BlackHolePortalEngine.instance) {
      BlackHolePortalEngine.instance = new BlackHolePortalEngine();
    }
    return BlackHolePortalEngine.instance;
  }

  private rnd(): number {
    return Math.random();
  }

  private gs(): number {
    return (this.rnd() + this.rnd() + this.rnd() + this.rnd() - 2) / 2;
  }

  private cl(v: number, a = 0, b = 1): number {
    return Math.min(b, Math.max(a, v));
  }

  private ez(p: number): number {
    return p * p * (3 - 2 * p);
  }

  private mkCanvas(w: number, h: number): HTMLCanvasElement {
    const e = document.createElement("canvas");
    e.width = w;
    e.height = h;
    return e;
  }

  /**
   * Procedural Spiral Galaxy Sprite (24,000 stars, core, star-forming knots, and dust lanes)
   */
  private mkGal(): HTMLCanvasElement {
    const g = this.mkCanvas(512, 512);
    const q = g.getContext("2d");
    if (!q) return g;

    q.translate(256, 256);
    q.globalCompositeOperation = "lighter";

    const r = q.createRadialGradient(0, 0, 0, 0, 0, 250);
    r.addColorStop(0, "rgba(255,225,180,.6)");
    r.addColorStop(0.1, "rgba(255,200,150,.25)");
    r.addColorStop(0.5, "rgba(110,140,255,.05)");
    r.addColorStop(1, "rgba(0,0,0,0)");
    q.fillStyle = r;
    q.fillRect(-256, -256, 512, 512);

    for (let i = 0; i < 24000; i++) {
      const d = Math.pow(this.rnd(), 0.7) * 235 + 5;
      const th = d * 0.034 + (i & 1 ? Math.PI : 0) + this.gs() * (0.45 + d / 380) * 0.9;
      const core = Math.max(0, 1 - d / 90);
      q.fillStyle =
        this.rnd() < 0.025 && d > 60
          ? "rgba(255,120,170,.6)"
          : `rgba(${(200 + core * 55) | 0},${(205 + core * 20) | 0},${(255 - core * 100) | 0},${0.08 + this.rnd() * 0.25})`;
      q.fillRect(Math.cos(th) * d, Math.sin(th) * d, 1.2, 1.2);
    }

    for (let i = 0; i < 7000; i++) {
      const a = this.rnd() * 6.283;
      const d = Math.abs(this.gs()) * 45;
      q.fillStyle = "rgba(255,215,160,.22)";
      q.fillRect(Math.cos(a) * d, Math.sin(a) * d * 0.85, 1.5, 1.5);
    }

    q.globalCompositeOperation = "source-over";
    for (let i = 0; i < 3500; i++) {
      const d = Math.pow(this.rnd(), 0.7) * 220 + 30;
      const th = d * 0.034 + (i & 1 ? Math.PI : 0) - 0.28 + this.gs() * 0.12;
      q.fillStyle = "rgba(0,0,6,.1)";
      q.fillRect(Math.cos(th) * d, Math.sin(th) * d, 2.5, 2.5);
    }

    return g;
  }

  /**
   * Procedural Milky Way Galactic Band Sprite (16,000 stars & dark dust rifts)
   */
  private mkBand(W: number, H: number): void {
    this.Bw = (W * 1.5) | 0;
    this.Bh = (H * 1.5) | 0;
    this.bandSprite = this.mkCanvas(this.Bw, this.Bh);
    const q = this.bandSprite.getContext("2d");
    if (!q) return;

    q.translate(this.Bw / 2, this.Bh / 2);
    q.rotate(-0.5);
    q.globalCompositeOperation = "lighter";

    const L = Math.max(this.Bw, this.Bh);
    for (let i = 0; i < 9; i++) {
      const t = ((i / 8 - 0.5) * L * 0.9);
      const r = q.createRadialGradient(t, 0, 0, t, 0, L * 0.2);
      const w = 1 - Math.abs(i / 8 - 0.5) * 1.4;
      r.addColorStop(0, `rgba(255,205,150,${0.12 * w})`);
      r.addColorStop(0.5, `rgba(150,160,230,${0.05 * w})`);
      r.addColorStop(1, "rgba(0,0,0,0)");
      q.fillStyle = r;
      q.fillRect(-L, -L, 2 * L, 2 * L);
    }

    for (let i = 0; i < 16000; i++) {
      const t = (this.rnd() - 0.5) * L * 1.1;
      const o = this.gs() * L * 0.07 * (1 - (Math.abs(t) / L) * 0.9);
      q.fillStyle = `rgba(${(220 + this.rnd() * 35) | 0},${(215 + this.rnd() * 30) | 0},255,${0.1 + this.rnd() * 0.3})`;
      q.fillRect(t, o, 1.3, 1.3);
    }

    q.globalCompositeOperation = "source-over";
    for (let i = 0; i < 140; i++) {
      const t = (this.rnd() - 0.5) * L * 0.9;
      const o = this.gs() * L * 0.03;
      const r = q.createRadialGradient(t, o, 0, t, o, L * 0.05 * (0.4 + this.rnd()));
      r.addColorStop(0, "rgba(0,0,4,.16)");
      r.addColorStop(1, "rgba(0,0,4,0)");
      q.fillStyle = r;
      q.fillRect(t - L * 0.1, o - L * 0.1, L * 0.2, L * 0.2);
    }
  }

  private initStar(s: any): void {
    s.x = (this.rnd() * 2 - 1) * 2.2;
    s.y = (this.rnd() * 2 - 1) * 2.2;
    s.z = this.rnd() + 0.03;
    s.pz = s.z;
    s.r = this.rnd();
    const u = this.rnd();
    s.tc = this.TC[u < 0.1 ? 0 : u < 0.5 ? 1 : u < 0.8 ? 2 : 3];
    s.b = Math.pow(this.rnd(), 4);
  }

  private initStarsAndGalaxies(): void {
    this.S = [];
    for (let i = 0; i < 800; i++) {
      const s = {} as any;
      this.initStar(s);
      this.S.push(s);
    }

    this.G = [];
    for (let i = 0; i < 24; i++) {
      this.G.push({
        x: (this.rnd() * 2 - 1) * 1.7,
        y: (this.rnd() * 2 - 1) * 1.2,
        z: 0.5 + this.rnd() * 0.9,
        sz: 0.5 + this.rnd(),
        tilt: 0.25 + this.rnd() * 0.7,
        rot: this.rnd() * 6.28,
        w: 0.3 + this.rnd() * 0.5,
      });
    }

    this.galSprite = this.mkGal();
  }

  private projectStar(s: any, z: number, tw: number, cx: number, cy: number, M: number): void {
    let X = s.x;
    let Y = s.y;
    if (tw) {
      const a = (1 - z) * tw;
      const co = Math.cos(a);
      const si = Math.sin(a);
      const n = X * co - Y * si;
      Y = X * si + Y * co;
      X = n;
    }
    const k = M / z;
    this.PX = cx + X * k;
    this.PY = cy + Y * k;
  }

  /**
   * Renders the relativistic black hole with accretion disk, photon ring, and orbiting particles
   */
  private renderHole(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    R: number,
    t: number
  ): void {
    ctx.save();
    ctx.translate(x, y);

    const g = ctx.createRadialGradient(0, 0, R, 0, 0, R * 4);
    g.addColorStop(0, "rgba(255,140,40,.55)");
    g.addColorStop(1, "rgba(255,80,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, R * 4, 0, this.TAU);
    ctx.fill();

    const dots = (front: boolean) => {
      ctx.save();
      ctx.rotate(-0.3);
      const z = R / 30 + 1;
      for (const p of this.P) {
        const m = 1.35 + p.k * 2.2;
        const a = p.a + (t * 0.003) / Math.pow(m, 1.5);
        const s = Math.sin(a);
        if ((s > 0) !== front) continue;
        ctx.fillStyle = `hsl(${18 + (1 - p.k) * 35},100%,${50 + (1 - p.k) * 40}%)`;
        ctx.fillRect(Math.cos(a) * m * R, s * m * R * 0.28, z, z);
      }
      ctx.restore();
    };

    dots(false);

    ctx.shadowColor = "#ff9a3c";
    ctx.shadowBlur = R * 0.5;
    ctx.strokeStyle = "#ffd9a0";
    ctx.lineWidth = Math.max(1, R * 0.06);
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.03, 0, this.TAU);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, this.TAU);
    ctx.fill();

    dots(true);
    ctx.restore();
  }

  /**
   * Injects keyframe pop animation and styles for HUD
   */
  private injectHudStyles(): void {
    if (document.getElementById("hs-multiverse-styles")) return;
    const style = document.createElement("style");
    style.id = "hs-multiverse-styles";
    style.textContent = `
      @keyframes hs-pop {
        0% { transform: scale(1.35); opacity: 0; filter: blur(8px); }
        100% { transform: none; opacity: 1; filter: none; }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Mounts the idle black hole widget on the page
   */
  public mountWidget(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (document.getElementById("hs-black-hole-widget")) return;

    this.isDestroyed = false;
    this.idle = true;
    this.injectHudStyles();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = this.C.size;

    const widget = document.createElement("div");
    widget.id = "hs-black-hole-widget";
    widget.setAttribute("role", "button");
    widget.setAttribute("aria-label", "Activate Black Hole Cosmic Consumption");
    widget.title = "Click the black hole to enter the infinite multiverse";
    widget.tabIndex = 0;
    widget.style.cssText = `
      position: fixed;
      right: ${this.C.right}px;
      bottom: calc(${this.C.bottom}px + env(safe-area-inset-bottom, 0px));
      width: ${size}px;
      height: ${size}px;
      z-index: 2147483000;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      filter: drop-shadow(0 0 22px rgba(255, 140, 40, 0.45));
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    const label = document.createElement("div");
    label.style.cssText = `
      position: absolute;
      right: calc(100% + 14px);
      top: 50%;
      transform: translateY(-50%);
      background: rgba(8, 7, 13, 0.94);
      border: 1px solid rgba(255, 160, 50, 0.55);
      border-radius: 9999px;
      padding: 7px 16px;
      color: #ffffff;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.85), 0 0 14px rgba(255, 140, 40, 0.3);
      backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      gap: 7px;
      opacity: 0.92;
      transition: opacity 0.2s, transform 0.2s;
    `;
    label.innerHTML = `
      <span style="width: 6px; height: 6px; border-radius: 50%; background: #38bdf8; display: inline-block; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      ENTER COSMOS
      <span style="color: #f59e0b;">✦</span>
    `;
    widget.appendChild(label);

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
        this.renderHole(ctx, size / 2, size / 2, 11, t);
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
      label.style.opacity = "0.92";
    });

    widget.addEventListener("click", () => this.triggerConsumption());
    widget.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") this.triggerConsumption();
    });
  }

  /**
   * Triggers the website physical element-by-element gravitational consumption
   */
  public triggerConsumption(): void {
    if (!this.idle || !this.widgetEl) return;
    this.idle = false;

    cosmicAudio.start();
    cosmicAudio.playAwakeningPulse();

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

    const F = document.createElement("canvas");
    F.id = "hs-cosmic-black-hole-overlay";
    F.width = vw * dpr;
    F.height = vh * dpr;
    F.style.cssText = "position: fixed; inset: 0; width: 100%; height: 100%; z-index: 2147483001; pointer-events: none;";
    root.appendChild(F);
    this.overlayCanvas = F;

    const c = F.getContext("2d");
    if (!c) return;
    c.scale(dpr, dpr);
    this.overlayCtx = c;

    const inView = (r: DOMRect) =>
      r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < vh && r.left < vw;

    // ── 1. SPLIT VISIBLE TEXT INTO WORDS (.bh-w) ─────────────────────────────
    this.textSplits = [];
    const nodes: Text[] = [];
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n: Node | null;
    while ((n = tw.nextNode())) {
      const p = n.parentElement;
      if (!p || !n.nodeValue?.trim() || p.closest("button,select,textarea,script,style,noscript,svg,option,#hs-black-hole-widget")) {
        continue;
      }
      if (inView(p.getBoundingClientRect())) nodes.push(n as Text);
    }

    let words = 0;
    for (const t of nodes) {
      if (words > 800) break;
      const originalValue = t.nodeValue || "";
      const parent = t.parentNode;
      if (!parent) continue;

      const f = document.createDocumentFragment();
      const wordsCreated: HTMLElement[] = [];

      for (const s of originalValue.split(/(\s+)/)) {
        if (!s) continue;
        if (/^\s+$/.test(s)) {
          f.append(s);
          continue;
        }
        const e = document.createElement("span");
        e.className = "bh-w";
        e.textContent = s;
        e.style.display = "inline-block";
        f.append(e);
        wordsCreated.push(e);
        words++;
      }

      this.textSplits.push({ parent, originalNode: t, words: wordsCreated });
      t.replaceWith(f);
    }

    // ── 2. COLLECT ITEMS AND DECORATED CONTAINERS ────────────────────────────
    const SEL = "img,video,button,input,textarea,select,svg,canvas,iframe,picture,audio";
    const T_ARR = 1600;
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

    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>(SEL + ",.bh-w"))) {
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
        spin: this.rnd() * 1.4 * Math.PI + 1.2 * Math.PI,
        rot: this.rnd() * 8 - 4,
        st: 0,
        en: 0,
        done: 0,
      });
    }

    const maxR = Math.max(1, ...items.map((i) => i.r0));
    for (const i of items) {
      i.st = T_ARR + (i.r0 / maxR) * this.C.spread + this.rnd() * 500;
      i.en = i.st + this.C.eat;
    }

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
      document.body.querySelectorAll<HTMLElement>("div,section,header,footer,nav,article,aside,main,form,li,figure,ul,a")
    )) {
      if (e.matches(SEL) || e.closest("#hs-black-hole-widget")) continue;
      const r = e.getBoundingClientRect();
      if (!inView(r)) continue;

      const s = window.getComputedStyle(e);
      const bg = s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent";
      if (!(bg || s.backgroundImage !== "none" || parseFloat(s.borderTopWidth) > 0 || s.boxShadow !== "none")) {
        continue;
      }

      let d = 0;
      for (let p: HTMLElement | null = e; p; p = p.parentElement) d++;

      const lx = hx - r.left;
      const ly = hy - r.top;
      this.clippedContainers.push(e);

      conts.push({
        e,
        d,
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
    conts.splice(150);

    const fin: typeof conts = [];
    for (const k of conts) {
      let m = T_ARR + 800;
      for (const i of items) {
        if (k.e.contains(i.e)) m = Math.max(m, i.en);
      }
      for (const o of fin) {
        if (k.e.contains(o.e)) m = Math.max(m, o.en);
      }
      k.st = m;
      k.en = m + 1100;
      fin.push(k);
    }

    const tAll = Math.max(T_ARR + 800, ...items.map((i) => i.en), ...fin.map((k) => k.en));
    const tExp = 1600;
    const tMv = tAll + tExp;

    // ── 3. MASTER RENDER & PHYSICS LOOP ──────────────────────────────────────
    let T0 = 0;

    const step = (now: number) => {
      if (this.isDestroyed) return;
      if (!T0) T0 = now;
      const t = now - T0;

      // ── MULTIVERSE JUMP → THE REAL UNIVERSE TRANSITION ────────────────────
      if (t >= tMv) {
        if (!this.mvActive) {
          this.startMultiverseJump(vw, vh);
        }
        this.renderMultiverseJumpLoop(c, now, vw, vh);
        this.animId = requestAnimationFrame(step);
        return;
      }

      c.clearRect(0, 0, vw, vh);

      let hxn = hx;
      let hyn = hy;
      let R = 11;

      if (t < T_ARR) {
        const p = this.ez(t / T_ARR);
        hxn = sx + (hx - sx) * p;
        hyn = sy + (hy - sy) * p;
        R = 11 + 49 * p;
      } else if (t < tAll) {
        R = 60 + 40 * this.cl((t - T_ARR) / (tAll - T_ARR));
      } else {
        const p = this.cl((t - tAll) / tExp);
        R = 100 + (D * 0.55 - 100) * p * p;
      }

      for (const i of items) {
        if (i.done || t < i.st) continue;
        const p = this.cl((t - i.st) / this.C.eat);
        if (p >= 1) {
          i.e.style.visibility = "hidden";
          i.done = 1;
          continue;
        }
        const e = p * p;
        const r = i.r0 * (1 - e);
        const a = i.th + e * i.spin;
        i.e.style.transform = `translate(${hx + Math.cos(a) * r - i.ex}px,${hy + Math.sin(a) * r - i.ey}px) rotate(${e * i.rot}rad) scale(${1 - e * 0.97})`;
        i.e.style.opacity = `${1 - Math.pow(p, 4)}`;
      }

      for (const k of fin) {
        if (k.done || t < k.st) continue;
        const p = this.cl((t - k.st) / 1100);
        if (p >= 1) {
          k.e.style.visibility = "hidden";
          k.done = 1;
          continue;
        }
        k.e.style.clipPath = `circle(${k.dm * (1 - p)}px at ${k.lx}px ${k.ly}px)`;
      }

      if (t > T_ARR) {
        const v = c.createRadialGradient(hx, hy, D * 0.15, hx, hy, D * 0.6);
        v.addColorStop(0, "rgba(0,0,0,0)");
        v.addColorStop(1, `rgba(0,0,0,${0.4 * this.cl((t - T_ARR) / (tAll - T_ARR))})`);
        c.fillStyle = v;
        c.fillRect(0, 0, vw, vh);
      }

      this.renderHole(c, hxn, hyn, R, t);
      this.animId = requestAnimationFrame(step);
    };

    this.animId = requestAnimationFrame(step);
  }

  /**
   * Initializes the Multiverse Jump → The Real Universe DOM & Graphics
   */
  private startMultiverseJump(vw: number, vh: number): void {
    this.mvActive = true;
    document.body.style.visibility = "hidden";
    document.documentElement.style.background = "#000000";

    this.initStarsAndGalaxies();
    this.mkBand(vw, vh);

    this.jumpTime = 0;
    this.lastJumpNow = performance.now();
    this.curJumpIdx = -1;
    this.cap2Triggered = false;

    // HUD Container
    const hud = document.createElement("div");
    hud.id = "hud";
    hud.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 18px calc(7vh + env(safe-area-inset-bottom, 0px));
      text-align: center;
      pointer-events: none;
      z-index: 2147483002;
    `;

    const n = document.createElement("div");
    n.id = "n";
    n.style.cssText = `
      font-size: clamp(1.2rem, 5vw, 2.6rem);
      letter-spacing: .32em;
      font-weight: 300;
      text-shadow: 0 0 30px currentColor;
      text-transform: uppercase;
    `;
    hud.appendChild(n);
    this.titleEl = n;

    const s = document.createElement("div");
    s.id = "s";
    s.style.cssText = `
      margin-top: 12px;
      font-size: clamp(.7rem, 2.1vw, .95rem);
      letter-spacing: .16em;
      color: #8394b4;
      transition: opacity .6s;
    `;
    hud.appendChild(s);
    this.subEl = s;

    document.documentElement.appendChild(hud);
    this.hudEl = hud;

    // Counter Top Left
    const c2 = document.createElement("div");
    c2.id = "c2";
    c2.style.cssText = `
      position: fixed;
      left: 18px;
      top: calc(16px + env(safe-area-inset-top, 0px));
      font-size: .7rem;
      letter-spacing: .22em;
      color: #8394b4;
      z-index: 2147483002;
      pointer-events: none;
      font-family: ui-monospace, monospace;
    `;
    document.documentElement.appendChild(c2);
    this.counterEl = c2;

    // Return to HS AI Studio Prompt / Button Top Right
    const r = document.createElement("div");
    r.id = "r";
    r.style.cssText = `
      position: fixed;
      right: 18px;
      top: calc(16px + env(safe-area-inset-top, 0px));
      font-size: .72rem;
      letter-spacing: .22em;
      color: #d6e6ff;
      opacity: 0;
      transition: opacity 1s;
      z-index: 2147483003;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 9999px;
      padding: 8px 16px;
      backdrop-filter: blur(12px);
      text-transform: uppercase;
    `;
    r.textContent = "RETURN TO HS AI STUDIO ↩";
    r.onclick = () => this.restoreWebsite();
    document.documentElement.appendChild(r);
    this.returnPromptEl = r;

    // Pointer down / Space listener to return or replay
    const pointerListener = () => {
      if (this.jumpTime > this.T_MULTIVERSE + 3) {
        this.restoreWebsite();
      }
    };
    window.addEventListener("pointerdown", pointerListener, { once: true });

    const keyListener = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Escape") {
        e.preventDefault();
        window.removeEventListener("keydown", keyListener);
        this.restoreWebsite();
      }
    };
    window.addEventListener("keydown", keyListener);

    // Automatic return to HS AI Studio after fully experiencing The Real Universe (~18s total)
    this.autoReturnTimer = setTimeout(() => {
      if (this.mvActive) {
        this.restoreWebsite();
      }
    }, (this.T_MULTIVERSE + 14) * 1000);
  }

  private updateLabel(title: string, sub: string, col: string): void {
    if (this.titleEl) {
      this.titleEl.textContent = title;
      this.titleEl.style.color = col;
      this.titleEl.style.animation = "none";
      // Trigger reflow for pop animation
      void this.titleEl.offsetWidth;
      this.titleEl.style.animation = "hs-pop .4s ease-out";
    }
    if (this.subEl) {
      this.subEl.textContent = sub;
    }
  }

  /**
   * Multiverse Jump → The Real Universe Master Graphics Render Loop
   */
  private renderMultiverseJumpLoop(
    x: CanvasRenderingContext2D,
    now: number,
    W: number,
    H: number
  ): void {
    const dt = Math.max(0, Math.min(0.05, (now - this.lastJumpNow) / 1000));
    this.lastJumpNow = now;
    this.jumpTime += dt;

    const t = this.jumpTime;
    const real = t >= this.T_MULTIVERSE;
    const i = Math.max(0, Math.min(this.U_LIST.length - 1, Math.floor(t / this.D)));
    const lf = real ? 0 : t - i * this.D;
    const rt = t - this.T_MULTIVERSE;
    const u = this.U_LIST[i];
    const idx = real ? 99 : i;

    const cx = W / 2;
    const cy = H / 2;
    const M = Math.min(W, H) * 0.5;

    if (idx !== this.curJumpIdx) {
      this.curJumpIdx = idx;
      this.cap2Triggered = false;
      if (real) {
        this.updateLabel(
          "THE REAL UNIVERSE",
          "13.8 billion years old · ~2 trillion galaxies · this one is ours",
          "#d6e6ff"
        );
        if (this.counterEl) this.counterEl.textContent = "YOU ARE HERE";
      } else {
        this.updateLabel(u.n, u.s, `hsl(${u.h},90%,72%)`);
        if (this.counterEl) this.counterEl.textContent = "UNIVERSES VISITED: " + (i + 1);
      }
    }

    if (real && rt > 9 && !this.cap2Triggered) {
      this.cap2Triggered = true;
      if (this.subEl) {
        this.subEl.textContent = "Home: the Milky Way · 100–400 billion stars · 100,000 light-years wide";
      }
    }

    if (real && rt > 3 && this.returnPromptEl) {
      this.returnPromptEl.style.opacity = "1";
    }

    // Deceleration speed curve into The Real Universe
    const sp = real
      ? Math.max(0.004, 6 * Math.exp(-rt * 1.7))
      : (2.4 + 7 * Math.exp(-lf * 5)) * u.v;

    x.globalCompositeOperation = "source-over";
    x.fillStyle = real
      ? `rgba(1,2,7,${Math.min(1, 0.3 + rt * 0.5)})`
      : `hsla(${u.h},50%,2%,.3)`;
    x.fillRect(0, 0, W, H);

    const fa = real ? Math.min(1, Math.max(0, (rt - 0.6) / 2.5)) : 0;

    x.save();
    x.translate(cx, cy);
    if (!real) {
      x.rotate((i % 2 ? 1 : -1) * lf * 0.45 * Math.exp(-lf * 1.4));
    }
    x.translate(-cx, -cy);

    // Fade in Milky Way Band in The Real Universe
    if (real && fa > 0 && this.bandSprite) {
      x.globalCompositeOperation = "lighter";
      x.globalAlpha = fa * 0.9;
      x.drawImage(this.bandSprite, -(this.Bw - W) / 2 - rt * 1.2, -(this.Bh - H) / 2 + rt * 0.5);
      x.globalAlpha = 1;
    } else if (!real) {
      // Warp Core Glow
      const gl = x.createRadialGradient(cx, cy, 0, cx, cy, M * 0.9);
      const a = Math.min(0.3, sp / 30);
      gl.addColorStop(0, `hsla(${u.h},100%,75%,${a})`);
      gl.addColorStop(1, "rgba(0,0,0,0)");
      x.globalCompositeOperation = "lighter";
      x.fillStyle = gl;
      x.fillRect(0, 0, W, H);
    }

    // Fade in Galaxies in The Real Universe
    if (real && fa > 0 && this.galSprite) {
      x.globalCompositeOperation = "lighter";
      for (const g of this.G) {
        const k = M / g.z;
        const px = cx + g.x * k - rt * 3 * g.w;
        const py = cy + g.y * k;
        const s = g.sz * k * 0.22;
        if (px < -s || px > W + s || py < -s || py > H + s) continue;
        x.save();
        x.translate(px, py);
        x.rotate(g.rot + rt * 0.01);
        x.scale(1, g.tilt);
        x.globalAlpha = fa * 0.75;
        x.drawImage(this.galSprite, -s / 2, -s / 2, s, s);
        x.restore();
      }

      // Massive Home Galaxy
      const hs = M * (1.1 + 0.05 * Math.max(0, rt - 1));
      const hx = cx + M * 0.45;
      const hy = cy - M * 0.12;
      x.save();
      x.translate(hx, hy);
      x.rotate(-0.6 + rt * 0.012);
      x.scale(1, 0.52);
      x.globalAlpha = fa;
      x.drawImage(this.galSprite, -hs / 2, -hs / 2, hs, hs);
      x.restore();
      x.globalAlpha = 1;
    }

    // 3D Relativistic Starfield with Dimensional Twists
    x.globalCompositeOperation = "lighter";
    x.lineCap = "round";

    for (const s of this.S) {
      s.pz = s.z;
      s.z -= sp * dt;
      if (s.z <= 0.02) {
        this.initStar(s);
        s.z = 1;
        s.pz = 1;
      }

      if (!real && (u as any).fl && this.rnd() < 0.3) continue;

      const tw = real ? 0 : u.tw;
      this.projectStar(s, s.z, tw, cx, cy, M);
      const px = this.PX;
      const py = this.PY;

      this.projectStar(s, s.pz, tw, cx, cy, M);
      const qx = this.PX;
      const qy = this.PY;

      if (px < -40 || px > W + 40 || py < -40 || py > H + 40) continue;

      const f = 1 - s.z;
      const len = Math.hypot(px - qx, py - qy);

      if (real) {
        const al = (0.25 + s.b * 0.75) * (0.4 + 0.6 * f + 0.3);
        x.strokeStyle = `rgba(${s.tc},${Math.min(1, al)})`;
        x.fillStyle = x.strokeStyle;

        if (len > 1.5) {
          x.lineWidth = 0.6 + s.b * 1.4;
          x.beginPath();
          x.moveTo(qx, qy);
          x.lineTo(px, py);
          x.stroke();
        } else {
          const r = 0.5 + s.b * 1.5 + f * 0.4;
          x.beginPath();
          x.arc(px, py, r, 0, 6.283);
          x.fill();

          // Stellar cross diffraction spikes
          if (s.b > 0.35 && rt > 1) {
            x.lineWidth = 0.6;
            x.globalAlpha = Math.min(1, fa);
            const L = 6 + s.b * 22;
            x.beginPath();
            x.moveTo(px - L, py);
            x.lineTo(px + L, py);
            x.moveTo(px, py - L);
            x.lineTo(px, py + L);
            x.stroke();
            x.globalAlpha = 1;
          }
        }
      } else {
        const d = Math.hypot(px - cx, py - cy) / (Math.hypot(W, H) * 0.5);
        x.strokeStyle = `hsla(${u.h + (1 - d) * 25 - d * 20},${70 + s.r * 30}%,${58 + f * 32}%,${0.3 + f * 0.7})`;
        x.lineWidth = 0.5 + f * 2.3 * (0.5 + s.r);
        x.beginPath();
        x.moveTo(qx, qy);
        x.lineTo(px, py);
        x.stroke();
      }
    }

    x.restore();
    x.globalCompositeOperation = "source-over";

    // Dimensional Jump Entry Flash
    if (!real) {
      if (lf < 0.18) {
        x.fillStyle = `hsla(${u.h},100%,88%,${(1 - lf / 0.18) * 0.8})`;
        x.fillRect(0, 0, W, H);
      }
    } else if (rt < 0.4) {
      x.fillStyle = `rgba(255,255,255,${(1 - rt / 0.4) * 0.9})`;
      x.fillRect(0, 0, W, H);
    }

    // Outer Vignette
    const vg = x.createRadialGradient(cx, cy, M * 0.7, cx, cy, Math.hypot(W, H) * 0.55);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,.7)");
    x.fillStyle = vg;
    x.fillRect(0, 0, W, H);
  }

  /**
   * 100% Lossless Restoration of the HS AI Studio Website
   */
  public restoreWebsite(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.autoReturnTimer) {
      clearTimeout(this.autoReturnTimer);
      this.autoReturnTimer = null;
    }

    cosmicAudio.playReturnSwell();

    // 1. Remove HUD overlays
    if (this.hudEl && this.hudEl.parentNode) {
      this.hudEl.parentNode.removeChild(this.hudEl);
      this.hudEl = null;
      this.titleEl = null;
      this.subEl = null;
    }
    if (this.counterEl && this.counterEl.parentNode) {
      this.counterEl.parentNode.removeChild(this.counterEl);
      this.counterEl = null;
    }
    if (this.returnPromptEl && this.returnPromptEl.parentNode) {
      this.returnPromptEl.parentNode.removeChild(this.returnPromptEl);
      this.returnPromptEl = null;
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

    // 7. Restore exact scroll position
    window.scrollTo({
      left: this.savedScroll.x,
      top: this.savedScroll.y,
      behavior: "instant",
    });

    // 8. Re-enable widget
    this.mvActive = false;
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
    if (this.autoReturnTimer) clearTimeout(this.autoReturnTimer);
    this.restoreWebsite();
    if (this.widgetEl && this.widgetEl.parentNode) {
      this.widgetEl.parentNode.removeChild(this.widgetEl);
      this.widgetEl = null;
    }
    BlackHolePortalEngine.instance = null;
  }
}
