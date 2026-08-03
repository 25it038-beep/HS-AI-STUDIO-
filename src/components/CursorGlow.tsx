"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      if (glow) {
        glow.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[3]"
      style={{
        width: 300,
        height: 300,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)",
        transition: "opacity 0.3s",
      }}
    />
  );
}