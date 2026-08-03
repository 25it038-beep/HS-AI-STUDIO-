"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(168, 85, 247, 0.15)",
  "rgba(6, 182, 212, 0.1)",
  "rgba(236, 72, 153, 0.08)",
  "rgba(59, 130, 246, 0.1)",
];

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.002;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      COLORS.forEach((color, i) => {
        const cx = w * (0.2 + 0.6 * Math.sin(time * 0.3 + i * 1.5));
        const cy = h * (0.2 + 0.6 * Math.cos(time * 0.4 + i * 1.2));
        const rx = w * (0.3 + 0.2 * Math.sin(time * 0.2 + i));
        const ry = h * (0.2 + 0.15 * Math.cos(time * 0.25 + i * 1.3));
        const rot = time * 0.1 + i * 1.2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(1, 0.6);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color.replace("0.15", "0.05"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}