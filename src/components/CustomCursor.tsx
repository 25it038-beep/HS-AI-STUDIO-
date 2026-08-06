"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [role='button']");
      ring.style.width = target ? "56px" : "36px";
      ring.style.height = target ? "56px" : "36px";
      ring.style.borderColor = target
        ? "rgba(167,139,250,0.7)"
        : "rgba(255,255,255,0.25)";
      ring.style.transform = `translate(${rx - 28}px, ${ry - 28}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="hidden md:block">
      <div
        ref={dotRef}
        className="fixed z-[95] pointer-events-none w-2 h-2 rounded-full bg-purple-300"
        style={{ boxShadow: "0 0 10px rgba(167,139,250,0.9)" }}
      />
      <div
        ref={ringRef}
        className="fixed z-[94] pointer-events-none w-9 h-9 rounded-full border"
        style={{
          borderColor: "rgba(255,255,255,0.25)",
          transition:
            "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.3s",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
