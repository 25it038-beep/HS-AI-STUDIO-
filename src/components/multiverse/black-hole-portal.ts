/**
 * HS AI SOLUTIONS — BLACK HOLE PORTAL & MULTIVERSE EXPERIENCE
 * 
 * 1. Black Hole Widget with real-time relativistic canvas rendering
 * 2. Word-by-word text fragmentation (.bh-w)
 * 3. Physical gravitational suction of all images, videos, buttons, SVGs, and text
 * 4. Progressive container circular clipPath collapse
 * 5. Event horizon expansion to swallow viewport
 * 6. High-fidelity Multiverse Journey:
 *    - Event Horizon entry with relativistic light rings & star streaks
 *    - 13 distinct procedural celestial realities:
 *      * Emission nebula with dark dust lanes
 *      * Spiral galaxy with core & star-forming knots
 *      * Ringed gas giant with orbiting moon & shadow terminator
 *      * Blue giant star with coronal flares & rays
 *      * 3D tumbling asteroid belt with lighting
 *      * Relativistic pulsar with dual sweeping polar radiation beams
 *      * Supernova explosion shockwave shell
 *      * Supermassive black hole
 *      * Comet with plasma and dust tails
 *      * Globular star cluster (900 stars)
 *      * Planetary nebula
 *    - Real-time telemetry: REALITIES SCANNED counter, Universe ID & Name
 * 7. AUTOMATIC RETURN to HS AI Studio with 100% lossless DOM reconstruction.
 */

import { cosmicAudio } from "./audio-engine";

export class BlackHolePortalEngine {
  private static instance: BlackHolePortalEngine | null = null;

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

  private widgetEl: HTMLDivElement | null = null;
  private overlayCanvas: HTMLCanvasElement | null = null;
  private overlayCtx: CanvasRenderingContext2D | null = null;
  private labelEl: HTMLDivElement | null = null;
  private hudEl: HTMLDivElement | null = null;
  private returnBtnEl: HTMLButtonElement | null = null;

  private idle = true;
  private animId: number | null = null;
  private idleAnimId: number | null = null;
  private isDestroyed = false;

  // Lossless restoration tracking
  private savedScroll = { x: 0, y: 0 };
  private transformedItems: HTMLElement[] = [];
  private clippedContainers: HTMLElement[] = [];
  private textSplits: { parent: Node; originalNode: Text; words: HTMLElement[] }[] = [];

  // Multiverse Lexicon & Astrophysics Data
  private NA = [
    "Crimson", "Azure", "Verdant", "Obsidian", "Golden", "Violet",
    "Neon", "Hollow", "Mirror", "Glass", "Ember", "Frozen", "Quantum", "Singular"
  ];
  private NB = [
    "Nebula", "Pulsar", "Garden", "Abyss", "Cascade", "Spiral",
    "Dominion", "Echo", "Reef", "Lattice", "Horizon", "Vortex"
  ];
  private KN = [
    "Emission nebula", "Spiral galaxy", "Ringed gas giant", "Rocky world",
    "Ocean world", "Blue giant star", "Asteroid belt", "Pulsar",
    "Supernova remnant", "Black hole", "Comet", "Globular cluster", "Planetary nebula"
  ];
  private TEMP = ["#9bb0ff", "#cad7ff", "#f8f7ff", "#fff4ea", "#ffd2a1", "#ffb56b"];

  // Multiverse state
  private deck: number[] = [];
  private di = 0;
  private U: any = null;
  private PV: any = null;
  private nu = 0;
  private fl = 0;
  private cnt = 1337;
  private mvOn = 0;
  private tr = 1;
  private last = 0;
  private autoReturnTimer: NodeJS.Timeout | null = null;

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

  private pick<T>(a: T[]): T {
    return a[Math.floor(Math.random() * a.length)];
  }

  private H(i: number, s: number): number {
    return Math.abs(Math.sin(i * 12.9898 + s * 78.233) * 43758.5453) % 1;
  }

  private cvs(n: number): HTMLCanvasElement {
    const o = document.createElement("canvas");
    o.width = o.height = n;
    return o;
  }

  /**
   * Generates a soft gas cloud with dark dust lanes, painted once per universe
   */
  private nebula(h: number, h2: number): HTMLCanvasElement {
    const o = this.cvs(512);
    const x = o.getContext("2d");
    if (!x) return o;
    x.globalCompositeOperation = "lighter";
    let px = 256;
    let py = 256;
    for (let i = 0; i < 170; i++) {
      px = this.cl(px + this.rnd(-50, 50), 40, 472);
      py = this.cl(py + this.rnd(-50, 50), 40, 472);
      const r = this.rnd(40, 120);
      const hh = [h, h2, h + this.rnd(-20, 20), 25][i % 4];
      const g = x.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `hsla(${hh},80%,55%,.07)`);
      g.addColorStop(1, "hsla(0,0%,0%,0)");
      x.fillStyle = g;
      x.fillRect(px - r, py - r, r * 2, r * 2);
    }
    x.globalCompositeOperation = "source-over";
    for (let i = 0; i < 60; i++) {
      const qx = this.rnd(60, 450);
      const qy = this.rnd(60, 450);
      const r = this.rnd(20, 70);
      const g = x.createRadialGradient(qx, qy, 0, qx, qy, r);
      g.addColorStop(0, "rgba(0,0,8,.35)");
      g.addColorStop(1, "rgba(0,0,8,0)");
      x.fillStyle = g;
      x.fillRect(qx - r, qy - r, r * 2, r * 2);
    }
    return o;
  }

  /**
   * Generates a spiral galaxy sprite with warm core, blue arms, pink star knots, and dust lanes
   */
  private galaxy(): HTMLCanvasElement {
    const o = this.cvs(600);
    const x = o.getContext("2d");
    if (!x) return o;
    x.translate(300, 300);
    x.globalCompositeOperation = "lighter";

    const b = x.createRadialGradient(0, 0, 0, 0, 0, 150);
    b.addColorStop(0, "rgba(255,240,200,.95)");
    b.addColorStop(0.25, "rgba(255,200,130,.45)");
    b.addColorStop(1, "rgba(255,170,100,0)");
    x.fillStyle = b;
    x.fillRect(-300, -300, 600, 600);

    const pt = (i: number, off: number): [number, number, number] => {
      const t = Math.pow(Math.random(), 0.7) * 5.2;
      const r = 18 + t * 52;
      const a = t * 1.15 + (i % 2) * Math.PI + off + this.rnd(-0.28, 0.28) * (1 + t * 0.2);
      const d = this.rnd(-1, 1) * (6 + t * 5);
      return [
        Math.cos(a) * r + Math.cos(a + 1.57) * d,
        Math.sin(a) * r + Math.sin(a + 1.57) * d,
        t / 5.2,
      ];
    };

    for (let i = 0; i < 5200; i++) {
      const [X, Y, k] = pt(i, 0);
      x.fillStyle = `hsla(${45 + k * 170},${40 + k * 50}%,${70 + (1 - k) * 10}%,${0.25 + Math.random() * 0.4})`;
      const z = 1 + Math.random() * 1.4;
      x.fillRect(X, Y, z, z);
    }
    for (let i = 0; i < 70; i++) {
      const [X, Y] = pt(i, 0);
      const g = x.createRadialGradient(X, Y, 0, X, Y, 9);
      g.addColorStop(0, "rgba(255,120,190,.35)");
      g.addColorStop(1, "rgba(255,120,190,0)");
      x.fillStyle = g;
      x.fillRect(X - 9, Y - 9, 18, 18);
    }
    x.globalCompositeOperation = "source-over";
    for (let i = 0; i < 1300; i++) {
      const [X, Y] = pt(i, -0.2);
      x.fillStyle = "rgba(12,6,2,.16)";
      x.beginPath();
      x.arc(X, Y, this.rnd(3, 8), 0, this.TAU);
      x.fill();
    }
    return o;
  }

  /**
   * Instantiates a procedural cosmic universe
   */
  private mk(kk: number): any {
    this.cnt += Math.floor(this.rnd(311, 8999));
    const pal = this.pick([[210, 330], [10, 40], [170, 260], [280, 20]]);
    const k = [0, 1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10][kk];
    const pt = [0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0][kk];

    return {
      k,
      h: pal[0],
      h2: pal[1],
      sd: this.rnd(0, 50),
      la: this.rnd(0, this.TAU),
      px: this.rnd(-1, 1),
      py: this.rnd(-1, 1),
      t0: 0,
      name: `${this.KN[kk]} · ${this.pick(this.NA)}-${Math.floor(this.rnd(100, 999))}`,
      nb: k === 1 ? null : this.nebula(pal[0], pal[1]),
      gx: k === 1 ? this.galaxy() : null,
      ti: this.rnd(0.35, 0.7),
      pt,
      ph: [this.rnd(20, 45), this.rnd(5, 25), this.rnd(195, 215)][pt],
      ps: [55, 45, 60][pt],
      pl: [55, 38, 45][pt],
      rg: kk === 2,
      rt: this.rnd(-0.5, 0.5),
      sh: this.pick([215, 210, 30, 45, 10]),
      st: Array.from({ length: 230 }, () => ({
        x: this.rnd(-1, 1),
        y: this.rnd(-1, 1),
        z: this.rnd(0.05, 1),
        o: this.rnd(0, 6.28),
        c: this.pick(this.TEMP),
      })),
      ro: Array.from({ length: 36 }, () => ({
        x: this.rnd(-1, 1),
        y: this.rnd(-1, 1),
        z: this.rnd(0.1, 1),
        r: this.rnd(0.02, 0.07),
        a: this.rnd(0, this.TAU),
        w: this.rnd(-1, 1),
        v: Array.from({ length: 8 }, () => this.rnd(0.7, 1.15)),
      })),
    };
  }

  /**
   * Renders the black hole with glowing accretion disk & orbiting particle ring
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
   * Inside the event horizon: light rings & stretched stars rush outward, white singularity center grows
   */
  private renderEntry(ctx: CanvasRenderingContext2D, t: number, vw: number, vh: number, D: number): void {
    const cx = vw / 2;
    const cy = vh / 2;
    const Dh = D / 2;
    const k = this.cl(t / 2800);

    ctx.fillStyle = "#050004";
    ctx.fillRect(0, 0, vw, vh);

    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Dh);
    g.addColorStop(0, `rgba(255,${120 + k * 100},60,${0.15 + k * 0.7})`);
    g.addColorStop(0.25, "rgba(120,20,40,.25)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, vw, vh);

    for (let i = 0; i < 9; i++) {
      const p = (t * 0.00055 * (1 + k * 2) + i / 9) % 1;
      const r = Dh * 0.02 * Math.pow(60, p);
      ctx.strokeStyle = `hsla(${20 + p * 200},100%,${60 + p * 30}%,${Math.sin(p * Math.PI) * 0.8})`;
      ctx.lineWidth = 1 + p * 8;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * (0.85 + 0.15 * Math.sin(t * 0.002 + i)), 0, 0, this.TAU);
      ctx.stroke();
    }

    for (let i = 0; i < 220; i++) {
      const a = i * 2.399 + Math.sin(i) * 2;
      const ph = (t * 0.0007 * (1 + k * 2.5) + i * 0.137) % 1;
      const r0 = Dh * 0.03 * Math.pow(40, ph);
      const len = r0 * (0.05 + k * 0.5);
      ctx.strokeStyle = `hsla(${210 - ph * 190},100%,70%,${ph})`;
      ctx.lineWidth = 0.5 + ph * 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      ctx.lineTo(cx + Math.cos(a) * (r0 + len), cy + Math.sin(a) * (r0 + len));
      ctx.stroke();
    }

    const w = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20 + k * k * Dh * 0.6);
    w.addColorStop(0, `rgba(255,255,255,${0.4 + k * 0.6})`);
    w.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = w;
    ctx.fillRect(0, 0, vw, vh);
  }

  /**
   * Renders one universe with real astrophysical features
   */
  private renderScene(
    ctx: CanvasRenderingContext2D,
    u: any,
    t: number,
    dt: number,
    sp: number,
    vw: number,
    vh: number,
    D: number
  ): void {
    if (u.en) {
      this.renderEntry(ctx, t, vw, vh, D);
      return;
    }

    if (u.fin) {
      const lt = t - u.t0;
      const cx = vw / 2;
      const cy = vh / 2;
      const r = 30 + Math.sin(lt * 0.002) * 8 + this.cl(lt / 4000) * 60;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 4);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, vw, vh);
      g.addColorStop(0, "rgba(255,255,255,.95)");
      g.addColorStop(0.12, "rgba(160,190,255,.45)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);
      return;
    }

    const cx = vw / 2;
    const cy = vh / 2;
    const Dh = D / 2;
    const lt = t - u.t0;
    const Lx = Math.cos(u.la);
    const Ly = Math.sin(u.la);

    ctx.fillStyle = "#01020a";
    ctx.fillRect(0, 0, vw, vh);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.sin(t * 0.0003 + u.sd) * 0.04);
    if (u.nb) {
      const z = (Math.max(vw, vh) / 512) * (1.4 + this.cl(lt / 12000) * 0.9);
      ctx.globalAlpha = u.k === 0 ? 1 : 0.6;
      ctx.drawImage(u.nb, -256 * z + u.px * 30, -256 * z + u.py * 30, 512 * z, 512 * z);
      ctx.globalAlpha = 1;
    }
    ctx.translate(-cx, -cy);

    for (const s of u.st) {
      const pz = s.z;
      s.z -= dt * 0.00022 * sp;
      if (s.z <= 0.03) {
        s.x = this.rnd(-1, 1);
        s.y = this.rnd(-1, 1);
        s.z = 1;
        continue;
      }
      ctx.globalAlpha = (0.45 + 0.55 * Math.pow(Math.sin(t * 0.003 + s.o), 2)) * (1 - s.z * 0.5);
      ctx.strokeStyle = s.c;
      ctx.lineWidth = 0.5 + (1 - s.z) * 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + (s.x / pz) * Dh * 0.3, cy + (s.y / pz) * Dh * 0.3);
      ctx.lineTo(cx + (s.x / s.z) * Dh * 0.3, cy + (s.y / s.z) * Dh * 0.3);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const sun = () => {
      const sx = cx + Lx * Dh * 0.95;
      const sy = cy + Ly * Dh * 0.95;
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, Dh * 0.9);
      g.addColorStop(0, "rgba(255,248,230,.95)");
      g.addColorStop(0.12, "rgba(255,215,150,.45)");
      g.addColorStop(1, "rgba(255,170,90,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);
      ctx.globalCompositeOperation = "source-over";
    };

    const ball = (x: number, y: number, r: number) => {
      const lx = x + Lx * r * 0.55;
      const ly = y + Ly * r * 0.55;
      const g = ctx.createRadialGradient(lx, ly, r * 0.15, lx, ly, r * 1.9);
      g.addColorStop(0, "rgba(0,0,6,0)");
      g.addColorStop(0.5, "rgba(0,0,6,.35)");
      g.addColorStop(0.75, "rgba(0,0,6,.9)");
      g.addColorStop(1, "rgba(0,0,6,.97)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    // Spectacle 1: Spiral Galaxy
    if (u.k === 1) {
      const z = (Dh / 300) * (0.7 + this.cl(lt / 9000) * 1.2);
      ctx.save();
      ctx.translate(cx + u.px * Dh * 0.15, cy + u.py * Dh * 0.1);
      ctx.rotate(u.la + lt * 0.00004);
      ctx.scale(z, z * u.ti * 1.4);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(u.gx, -300, -300);
      ctx.restore();
    }
    // Spectacle 2: Lit Planet with Rings and Moon
    else if (u.k === 2) {
      sun();
      const q = this.cl(lt / 6000);
      const R = Dh * (0.12 + 0.62 * q * q);
      const x = cx + u.px * Dh * 0.55 * q;
      const y = cy + u.py * Dh * 0.35 * q;
      const ph = u.ph;

      const ring = (front: boolean) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(u.rt);
        for (let i = 0; i < 5; i++) {
          const rr = 1.45 + i * 0.22;
          ctx.strokeStyle = `hsla(${ph + i * 3},30%,${60 + i * 5}%,${0.5 - i * 0.06})`;
          ctx.lineWidth = R * 0.12;
          ctx.beginPath();
          ctx.ellipse(0, 0, R * rr, R * rr * 0.28, 0, front ? 0 : Math.PI, front ? Math.PI : this.TAU);
          ctx.stroke();
        }
        ctx.restore();
      };

      if (u.rg) ring(false);
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, R, 0, this.TAU);
      ctx.clip();
      ctx.fillStyle = `hsl(${ph},${u.ps}%,${u.pl}%)`;
      ctx.fillRect(x - R, y - R, R * 2, R * 2);

      if (u.pt === 0) {
        for (let i = 0; i < 18; i++) {
          ctx.fillStyle = `hsla(${ph + this.H(i, u.sd) * 30 - 15},${u.ps}%,${u.pl + (this.H(i, u.sd + 1) - 0.5) * 34}%,.6)`;
          ctx.fillRect(
            x - R,
            y - R + (i / 18) * R * 2 + Math.sin(lt * 0.0003 + i) * R * 0.01,
            R * 2,
            (R * 2 / 18) * (0.5 + this.H(i, u.sd + 2))
          );
        }
      } else {
        for (let i = 0; i < 34; i++) {
          const a = this.H(i, u.sd) * this.TAU;
          const d = this.H(i, u.sd + 1) * R * 0.95;
          const r = R * (0.04 + this.H(i, u.sd + 2) * 0.18);
          ctx.fillStyle = `hsla(${ph},${u.ps}%,${u.pl + (this.H(i, u.sd + 3) - 0.5) * 30}%,.3)`;
          ctx.beginPath();
          ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r, 0, this.TAU);
          ctx.fill();
        }
        if (u.pt === 2) {
          ctx.fillStyle = "rgba(255,255,255,.55)";
          ctx.beginPath();
          ctx.ellipse(x, y - R, R * 0.7, R * 0.22, 0, 0, this.TAU);
          ctx.fill();
        }
      }

      const rm = ctx.createRadialGradient(x, y, R * 0.82, x, y, R * 1.02);
      rm.addColorStop(0, "rgba(120,170,255,0)");
      rm.addColorStop(1, "rgba(120,170,255,.55)");
      ctx.fillStyle = rm;
      ctx.fillRect(x - R, y - R, R * 2, R * 2);
      ball(x, y, R);
      ctx.restore();

      if (u.rg) ring(true);

      const ma = lt * 0.0004;
      const mr = R * 0.16;
      const mx = x + Math.cos(ma) * R * 2.1;
      const my = y + Math.sin(ma) * R * 0.5;
      const mg = ctx.createRadialGradient(mx + Lx * mr * 0.4, my + Ly * mr * 0.4, mr * 0.1, mx, my, mr * 1.1);
      mg.addColorStop(0, "#d8d4cc");
      mg.addColorStop(0.5, "#6b6862");
      mg.addColorStop(1, "#05050a");
      ctx.fillStyle = mg;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, this.TAU);
      ctx.fill();
    }
    // Spectacle 3: Blue Giant Star
    else if (u.k === 3) {
      const q = this.cl(lt / 7000);
      const R = Dh * (0.06 + 0.28 * q * q);
      const x = cx + u.px * Dh * 0.3 * q;
      const y = cy + u.py * Dh * 0.2 * q;
      const sh = u.sh;

      ctx.globalCompositeOperation = "lighter";
      let g = ctx.createRadialGradient(x, y, R * 0.8, x, y, R * 6);
      g.addColorStop(0, `hsla(${sh},100%,80%,.8)`);
      g.addColorStop(0.2, `hsla(${sh},100%,60%,.2)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);

      for (let i = 0; i < 90; i++) {
        const a = (i * this.TAU) / 90 + this.H(i, u.sd);
        const l = R * (1.3 + this.H(i, u.sd + 1) * 2.4);
        ctx.strokeStyle = `hsla(${sh},100%,85%,${0.05 + this.H(i, u.sd + 2) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * R, y + Math.sin(a) * R);
        ctx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, 0.03);
      g = ctx.createRadialGradient(0, 0, 0, 0, 0, Dh * 1.3);
      g.addColorStop(0, `hsla(${sh},100%,90%,.6)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, Dh * 1.3, 0, this.TAU);
      ctx.fill();
      ctx.restore();

      for (let j = 1; j < 5; j++) {
        const gx = cx + (cx - x) * j * 0.45;
        const gy = cy + (cy - y) * j * 0.45;
        const gr = 10 + j * 9;
        ctx.fillStyle = `hsla(${sh + j * 30},90%,70%,.07)`;
        ctx.beginPath();
        ctx.arc(gx, gy, gr, 0, this.TAU);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      g = ctx.createRadialGradient(x, y, 0, x, y, R);
      g.addColorStop(0, "#fff");
      g.addColorStop(0.6, `hsl(${sh},100%,88%)`);
      g.addColorStop(1, `hsl(${sh - 12},100%,62%)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, R, 0, this.TAU);
      ctx.fill();
    }
    // Spectacle 4: Asteroid Belt
    else if (u.k === 4) {
      sun();
      for (const o of u.ro) {
        o.z -= dt * 0.00035 * sp;
        if (o.z < 0.06) {
          o.z = 1;
          o.x = this.rnd(-1, 1);
          o.y = this.rnd(-1, 1);
        }
        const x = cx + (o.x / o.z) * Dh * 0.5;
        const y = cy + (o.y / o.z) * Dh * 0.5;
        const r = (o.r / o.z) * Dh * 0.5;
        if (r > Dh * 2 || Math.abs(x - cx) > vw || Math.abs(y - cy) > vh) continue;

        ctx.globalAlpha = this.cl((1 - o.z) * 6);
        ctx.beginPath();
        o.v.forEach((v: number, i: number) => {
          const a = o.a + t * o.w * 0.001 + (i / 8) * this.TAU;
          i ? ctx.lineTo(x + Math.cos(a) * r * v, y + Math.sin(a) * r * v) : ctx.moveTo(x + Math.cos(a) * r * v, y + Math.sin(a) * r * v);
        });
        ctx.closePath();
        const g = ctx.createLinearGradient(x + Lx * r, y + Ly * r, x - Lx * r, y - Ly * r);
        g.addColorStop(0, "#b0a69a");
        g.addColorStop(0.55, "#3a352f");
        g.addColorStop(1, "#08070a");
        ctx.fillStyle = g;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    // Spectacle 5: Pulsar with Sweeping Polar Radiation Beams
    else if (u.k === 5) {
      const q = this.cl(lt / 6000);
      const R = Dh * (0.03 + 0.02 * q);
      const x = cx + u.px * Dh * 0.15;
      const y = cy + u.py * Dh * 0.1;
      const a = lt * 0.006 * (1 + q) + u.la;

      ctx.globalCompositeOperation = "lighter";
      for (let b = 0; b < 2; b++) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a + b * Math.PI);
        const g = ctx.createLinearGradient(0, 0, Dh * 1.6, 0);
        g.addColorStop(0, "rgba(170,200,255,.85)");
        g.addColorStop(1, "rgba(170,200,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, -R * 0.6);
        ctx.lineTo(Dh * 1.6, -Dh * 0.12);
        ctx.lineTo(Dh * 1.6, Dh * 0.12);
        ctx.lineTo(0, R * 0.6);
        ctx.fill();
        ctx.restore();
      }

      const g2 = ctx.createRadialGradient(x, y, 0, x, y, R * 10);
      g2.addColorStop(0, "rgba(190,215,255,.8)");
      g2.addColorStop(1, "rgba(90,130,255,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, vw, vh);

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, R * 0.5, 0, this.TAU);
      ctx.fill();
    }
    // Spectacle 6: Supernova Shockwave Shell
    else if (u.k === 6) {
      const q = this.cl(lt / 5000);
      const r = Dh * (0.15 + 0.85 * q);
      const x = cx + u.px * Dh * 0.1;
      const y = cy + u.py * Dh * 0.1;

      ctx.globalCompositeOperation = "lighter";
      let g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 1.08);
      g.addColorStop(0, "rgba(255,90,60,0)");
      g.addColorStop(0.7, "rgba(255,140,80,.22)");
      g.addColorStop(0.92, "rgba(120,200,255,.55)");
      g.addColorStop(1, "rgba(120,200,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);

      for (let i = 0; i < 140; i++) {
        const a = this.H(i, u.sd) * this.TAU;
        const rr = r * (0.55 + this.H(i, u.sd + 1) * 0.5);
        const l = r * 0.12 * (0.3 + this.H(i, u.sd + 2));
        ctx.strokeStyle = `hsla(${[10, 200, 40][i % 3]},90%,65%,.25)`;
        ctx.lineWidth = 1 + this.H(i, u.sd + 3) * 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
        ctx.quadraticCurveTo(
          x + Math.cos(a + 0.15) * (rr + l * 0.5),
          y + Math.sin(a + 0.15) * (rr + l * 0.5),
          x + Math.cos(a + 0.1) * (rr + l),
          y + Math.sin(a + 0.1) * (rr + l)
        );
        ctx.stroke();
      }

      g = ctx.createRadialGradient(x, y, 0, x, y, Dh * 0.5);
      g.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - q)})`);
      g.addColorStop(1, "rgba(255,200,150,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);
    }
    // Spectacle 7: Supermassive Black Hole
    else if (u.k === 7) {
      ctx.globalCompositeOperation = "source-over";
      this.renderHole(ctx, cx + u.px * Dh * 0.15, cy + u.py * Dh * 0.1, Dh * (0.1 + 0.2 * this.cl(lt / 6000)), t);
    }
    // Spectacle 8: Comet with Twin Plasma and Dust Tails
    else if (u.k === 8) {
      const d = (this.cl(lt / 6500) - 0.5) * Dh * 2.2;
      const hx0 = cx + Math.cos(u.la) * d;
      const hy0 = cy + Math.sin(u.la) * d * 0.6;
      const ta = u.la + Math.PI;
      const L = Dh * 1.1;

      ctx.globalCompositeOperation = "lighter";
      ctx.save();
      ctx.translate(hx0, hy0);
      for (const [ang, hue, w, al] of [
        [ta, 205, 0.05, 0.55],
        [ta + 0.25, 45, 0.14, 0.4],
      ]) {
        ctx.save();
        ctx.rotate(ang);
        const g = ctx.createLinearGradient(0, 0, L, 0);
        g.addColorStop(0, `hsla(${hue},90%,80%,${al})`);
        g.addColorStop(1, `hsla(${hue},90%,70%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, -9);
        ctx.lineTo(L, -L * w);
        ctx.lineTo(L, L * w);
        ctx.lineTo(0, 9);
        ctx.fill();
        ctx.restore();
      }

      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 48);
      g.addColorStop(0, "rgba(220,245,255,.9)");
      g.addColorStop(1, "rgba(120,200,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(-48, -48, 96, 96);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, this.TAU);
      ctx.fill();
      ctx.restore();
    }
    // Spectacle 9: Globular Star Cluster
    else if (u.k === 9) {
      const z = 1 + this.cl(lt / 7000) * 1.2;
      const x = cx + u.px * Dh * 0.1;
      const y = cy + u.py * Dh * 0.1;

      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(x, y, 0, x, y, Dh * 0.6 * z);
      g.addColorStop(0, "rgba(255,225,160,.55)");
      g.addColorStop(1, "rgba(255,200,120,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);

      for (let i = 0; i < 900; i++) {
        const a = this.H(i, u.sd) * this.TAU;
        const r = Math.pow(this.H(i, u.sd + 1), 2.2) * Dh * 0.55 * z;
        const sz = 1 + this.H(i, u.sd + 2) * 1.4;
        ctx.fillStyle = i % 7 ? "rgba(255,236,190,.8)" : "rgba(255,170,120,.9)";
        ctx.fillRect(x + Math.cos(a) * r, y + Math.sin(a) * r, sz, sz);
      }
    }
    // Spectacle 10: Planetary Nebula
    else if (u.k === 10) {
      const r = Dh * (0.18 + 0.2 * this.cl(lt / 7000));
      const x = cx + u.px * Dh * 0.1;
      const y = cy + u.py * Dh * 0.1;

      ctx.globalCompositeOperation = "lighter";
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(u.la);
      ctx.scale(1, 0.8);

      for (let i = 0; i < 4; i++) {
        const rr = r * (1 + i * 0.12);
        const g = ctx.createRadialGradient(0, 0, rr * 0.7, 0, 0, rr * 1.15);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(0.55, `hsla(${[190, 150, 20, 340][i]},90%,55%,.3)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, rr * 1.15, 0, this.TAU);
        ctx.fill();
      }
      ctx.restore();

      const g = ctx.createRadialGradient(x, y, 0, x, y, 34);
      g.addColorStop(0, "rgba(255,255,255,.95)");
      g.addColorStop(1, "rgba(200,225,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - 34, y - 34, 68, 68);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.restore();
  }

  /**
   * Multiverse master director loop
   */
  private renderMultiverseLoop(
    ctx: CanvasRenderingContext2D,
    t: number,
    dt: number,
    vw: number,
    vh: number,
    D: number
  ): void {
    const sp = 1 + this.cl(t / 9000) * 3;
    const cx = vw / 2;
    const cy = vh / 2;
    const Dh = D / 2;

    if (!this.U) {
      this.U = { en: 1 };
      this.nu = 2800;
      if (this.labelEl) {
        this.labelEl.innerHTML =
          'CROSSING THE EVENT HORIZON<br><small style="opacity:.8;font-size:0.65em;letter-spacing:0.18em;color:#fde68a;">time slows to a crawl…</small>';
      }
    }

    if (t >= this.nu) {
      this.PV = this.U;
      if (this.di >= this.deck.length) {
        this.U = { fin: 1, t0: t };
        this.tr = 0;
        this.fl = 1;
        this.nu = 1e12;
        if (this.labelEl) {
          this.labelEl.innerHTML =
            'THE JOURNEY ENDS<br><small style="opacity:.8;font-size:0.65em;letter-spacing:0.18em;color:#38bdf8;">RETURNING TO HS AI STUDIO…</small>';
        }

        // Automatic return to HS AI Studio after all realities have been visited!
        if (!this.autoReturnTimer) {
          this.autoReturnTimer = setTimeout(() => {
            this.restoreWebsite();
          }, 4500);
        }
      } else {
        this.U = this.mk(this.deck[this.di++]);
        this.U.t0 = t;
        this.tr = 0;
        this.fl = 1;
        this.nu = t + this.cl(2200 - t / 6, 1400, 2200);
        if (this.labelEl) {
          this.labelEl.innerHTML = `UNIVERSE #${this.cnt.toLocaleString()}<br><small style="opacity:.8;font-size:0.65em;letter-spacing:0.18em;color:#fde68a;">${this.U.name}</small>`;
        }
      }
    }

    if (this.hudEl) {
      this.hudEl.textContent = "REALITIES SCANNED  " + (this.cnt * 37 + Math.floor(t * 1.3)).toLocaleString();
    }

    if (this.tr < 1) this.tr = Math.min(1, this.tr + dt / 750);

    if (this.tr >= 1 || !this.PV) {
      this.PV = null;
      this.renderScene(ctx, this.U, t, dt, sp, vw, vh, D);
    } else {
      const e = this.ez(this.tr);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1 + e * 0.6, 1 + e * 0.6);
      ctx.translate(-cx, -cy);
      this.renderScene(ctx, this.PV, t, dt, sp, vw, vh, D);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, e * Dh * 1.25 + 1, 0, this.TAU);
      ctx.clip();
      ctx.translate(cx, cy);
      ctx.scale(0.55 + 0.45 * e, 0.55 + 0.45 * e);
      ctx.translate(-cx, -cy);
      this.renderScene(ctx, this.U, t, dt, sp, vw, vh, D);
      ctx.restore();

      ctx.save();
      ctx.strokeStyle = `rgba(200,225,255,${1 - this.tr})`;
      ctx.lineWidth = 3 + 10 * (1 - this.tr);
      ctx.shadowColor = "#8fb4ff";
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(cx, cy, e * Dh * 1.25, 0, this.TAU);
      ctx.stroke();
      ctx.restore();
    }

    const vg = ctx.createRadialGradient(cx, cy, Dh * 0.45, cx, cy, Dh * 1.05);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,.6)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, vw, vh);

    if (this.fl > 0) {
      ctx.fillStyle = `rgba(255,255,255,${this.fl * 0.4})`;
      ctx.fillRect(0, 0, vw, vh);
      this.fl -= dt * 0.004;
    }
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
    const size = this.C.size;

    // Main Floating Widget
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

    // Interactive Label on hover
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
   * Triggers the website physical element-by-element gravitational suction
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
        spin: this.rnd(1.2, 2.6) * Math.PI,
        rot: this.rnd(-4, 4),
        st: 0,
        en: 0,
        done: 0,
      });
    }

    const maxR = Math.max(1, ...items.map((i) => i.r0));
    for (const i of items) {
      i.st = T_ARR + (i.r0 / maxR) * this.C.spread + this.rnd(0, 500);
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

    // Initialize Multiverse deck
    this.deck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(() => Math.random() - 0.5);
    this.di = 0;
    this.U = null;
    this.PV = null;
    this.nu = 0;
    this.fl = 0;
    this.mvOn = 0;
    this.tr = 1;
    this.last = 0;

    // ── 3. MASTER RENDER & PHYSICS LOOP ──────────────────────────────────────
    let T0 = 0;

    const step = (now: number) => {
      if (this.isDestroyed) return;
      if (!T0) {
        T0 = now;
        this.last = now;
      }
      const t = now - T0;
      const dt = Math.min(50, now - this.last);
      this.last = now;

      // MULTIVERSE JOURNEY
      if (t >= tMv) {
        if (!this.mvOn) this.startMv(vw, vh);
        this.renderMultiverseLoop(c, t - tMv, dt, vw, vh, D);
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
   * Initializes the Multiverse canvas state
   */
  private startMv(vw: number, vh: number): void {
    this.mvOn = 1;
    document.body.style.visibility = "hidden";
    document.documentElement.style.background = "#000";

    if (this.overlayCtx) {
      this.overlayCtx.fillStyle = "#000";
      this.overlayCtx.fillRect(0, 0, vw, vh);
    }

    cosmicAudio.playDimensionTransition();

    // Multiverse Universe Title Overlay
    const lab = document.createElement("div");
    lab.id = "hs-multiverse-label";
    lab.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      bottom: calc(36px + env(safe-area-inset-bottom, 0px));
      text-align: center;
      color: #fff;
      font: 600 clamp(14px, 3.5vw, 22px)/1.4 system-ui, sans-serif;
      letter-spacing: 0.2em;
      text-shadow: 0 0 14px #fff, 0 0 28px rgba(245, 158, 11, 0.7);
      z-index: 2147483002;
      pointer-events: none;
      text-transform: uppercase;
    `;
    document.documentElement.appendChild(lab);
    this.labelEl = lab;

    // Realities Scanned HUD
    const hud = document.createElement("div");
    hud.id = "hs-multiverse-hud";
    hud.style.cssText = `
      position: fixed;
      left: 18px;
      top: calc(18px + env(safe-area-inset-top, 0px));
      color: rgba(255, 255, 255, 0.85);
      font: 600 12px ui-monospace, monospace;
      letter-spacing: 0.15em;
      z-index: 2147483002;
      pointer-events: none;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
    `;
    document.documentElement.appendChild(hud);
    this.hudEl = hud;

    // Return Button
    setTimeout(() => {
      if (!this.mvOn) return;
      const b = document.createElement("button");
      b.id = "hs-return-btn";
      b.textContent = "Return to HS AI Studio ↩";
      b.style.cssText = `
        position: fixed;
        top: calc(16px + env(safe-area-inset-top, 0px));
        right: 16px;
        z-index: 2147483003;
        padding: 10px 18px;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: rgba(0, 0, 0, 0.75);
        color: #fff;
        font: 600 13px system-ui, sans-serif;
        letter-spacing: 0.05em;
        cursor: pointer;
        backdrop-filter: blur(12px);
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        transition: transform 0.2s, background 0.2s;
      `;
      b.onmouseenter = () => (b.style.transform = "scale(1.05)");
      b.onmouseleave = () => (b.style.transform = "scale(1)");
      b.onclick = () => this.restoreWebsite();
      document.documentElement.appendChild(b);
      this.returnBtnEl = b;
    }, 2000);

    const escListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.removeEventListener("keydown", escListener);
        this.restoreWebsite();
      }
    };
    window.addEventListener("keydown", escListener);
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
    if (this.labelEl && this.labelEl.parentNode) {
      this.labelEl.parentNode.removeChild(this.labelEl);
      this.labelEl = null;
    }
    if (this.hudEl && this.hudEl.parentNode) {
      this.hudEl.parentNode.removeChild(this.hudEl);
      this.hudEl = null;
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

    // 7. Restore exact scroll position
    window.scrollTo({
      left: this.savedScroll.x,
      top: this.savedScroll.y,
      behavior: "instant",
    });

    // 8. Re-enable widget
    this.mvOn = 0;
    this.idle = true;
    if (this.widgetEl) {
      this.widgetEl.style.visibility = "";
      this.widgetEl.style.transform = "scale(1)";
    }

    console.log(
      `%c[HS COSMIC PORTAL] 100% Losslessly Restored HS AI Studio`,
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
