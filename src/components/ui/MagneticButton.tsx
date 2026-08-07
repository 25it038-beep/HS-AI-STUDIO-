"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { MouseEvent } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.32, className = "" }: MagneticProps) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * strength);
    my.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={{ scale: { duration: 0.25 } }}
    >
      {children}
    </motion.span>
  );
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  external = false,
  lg = false,
  className = "",
  accent,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "inverse";
  external?: boolean;
  lg?: boolean;
  className?: string;
  accent?: string;
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[background-color,color,border-color] duration-300 select-none";

  const size = lg ? "h-14 px-7 text-[15px]" : "h-11 px-5 text-[13.5px]";

  const variants: Record<string, string> = {
    primary: "bg-paper text-ink hover:bg-white",
    ghost: "border border-white/20 text-paper hover:border-white/50 hover:bg-white/5",
    inverse: "bg-ink text-paper hover:bg-black",
  };

  const accentStyle =
    accent !== undefined
      ? ({ "--acc": accent } as React.CSSProperties)
      : undefined;

  const cls = `${base} ${size} ${variants[variant]} ${className}`;

  return (
    <Magnetic>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        style={accentStyle}
      >
        {children}
      </a>
    </Magnetic>
  );
}