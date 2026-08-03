"use client";

import { useEffect, useRef } from "react";

export default function ConstellationGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const SIZE = 80;
    const DOT_RADIUS = 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / SIZE);
      const rows = Math.ceil(canvas.height / SIZE);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SIZE + (r % 2 === 0 ? 0 : SIZE / 2);
          const y = r * SIZE * 0.8;

          const pulse = Math.sin(Date.now() * 0.001 + r * 2 + c * 3) * 0.3 + 0.5;
          const alpha = 0.08 + pulse * 0.12;

          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.fill();

          if (c < cols - 1) {
            const nx = (c + 1) * SIZE + (r % 2 === 0 ? 0 : SIZE / 2);
            const connAlpha = alpha * 0.3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${connAlpha})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }

          if (r < rows - 1) {
            const ny = (r + 1) * SIZE * 0.8;
            const connAlpha = alpha * 0.3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, ny);
            ctx.strokeStyle = `rgba(168, 85, 247, ${connAlpha})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }

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
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.6 }}
    />
  );
}