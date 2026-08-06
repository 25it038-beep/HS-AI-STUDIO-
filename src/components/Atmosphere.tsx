"use client";

import { useEffect, useRef } from "react";

/* ---------------- Aurora canvas ---------------- */

function useAurora() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const blobs = [
      { hue: 262, a: 0.16, sx: 0.24, sy: 0.18, rw: 0.34, rh: 0.26, sp: 0.31, ph: 0.0 },
      { hue: 196, a: 0.13, sx: 0.78, sy: 0.30, rw: 0.30, rh: 0.22, sp: 0.24, ph: 2.1 },
      { hue: 320, a: 0.10, sx: 0.50, sy: 0.85, rw: 0.38, rh: 0.20, sp: 0.27, ph: 4.2 },
      { hue: 155, a: 0.07, sx: 0.92, sy: 0.80, rw: 0.22, rh: 0.16, sp: 0.19, ph: 1.3 },
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.0016;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const b of blobs) {
        const cx = w * (b.sx + 0.1 * Math.sin(t * b.sp + b.ph));
        const cy = h * (b.sy + 0.1 * Math.cos(t * b.sp * 0.9 + b.ph));
        const rx = w * b.rw * (1 + 0.15 * Math.sin(t * 0.4 + b.ph * 2));
        const ry = h * b.rh * (1 + 0.15 * Math.cos(t * 0.33 + b.ph * 3));

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
        grad.addColorStop(0, `hsla(${b.hue}, 90%, 60%, ${b.a})`);
        grad.addColorStop(0.55, `hsla(${b.hue}, 90%, 55%, ${b.a * 0.35})`);
        grad.addColorStop(1, "transparent");

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * 0.05 + b.ph);
        ctx.scale(1, 0.72);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(rx, ry), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return ref;
}

/* ---------------- Starfield canvas ---------------- */

function useStars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let stars: { x: number; y: number; r: number; tw: number; sp: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 16000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.1 + 0.3) * DPR,
        tw: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 0.9,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(now * 0.001 * s.sp + s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 215, 255, ${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return ref;
}

/* ---------------- Component ---------------- */

export default function Atmosphere() {
  const auroraRef = useAurora();
  const starsRef = useStars();

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(76,29,149,0.25),transparent_60%),radial-gradient(80%_60%_at_90%_20%,rgba(8,51,68,0.35),transparent_60%),linear-gradient(180deg,#05070f_0%,#070a16_50%,#05070f_100%)]" />

      {/* Aurora */}
      <canvas ref={auroraRef} className="absolute inset-0 w-full h-full" />

      {/* Starfield */}
      <canvas ref={starsRef} className="absolute inset-0 w-full h-full" />

      {/* Constellation grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_70%)] blur-2xl animate-orb-a" />
      <div className="absolute bottom-[18%] right-[6%] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_70%)] blur-2xl animate-orb-b" />
      <div className="absolute top-[45%] left-[55%] w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.08),transparent_70%)] blur-2xl animate-orb-c" />

      {/* Light rays */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[140%] h-[45%] animate-rays bg-[conic-gradient(from_180deg_at_50%_100%,transparent_40%,rgba(139,92,246,0.06)_50%,transparent_60%)] blur-xl" />

      {/* Bottom fog */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#05070f] via-[#05070f]/60 to-transparent" />
    </div>
  );
}
