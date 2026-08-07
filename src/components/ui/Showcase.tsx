"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ComponentType } from "react";
import type { ProductDetail } from "@/data/products";

export function Parallax({
  children,
  depth = 40,
  className,
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Showcase({
  product,
  reverse = false,
  renderPreview: Preview,
  children,
}: {
  product: ProductDetail;
  reverse?: boolean;
  renderPreview?: ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <p className="eyebrow flex items-center gap-3 text-white/45">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: product.accent }} />
          {product.number} · {product.category}
        </p>
        <h2 className="display-lg mt-6 text-[clamp(2.2rem,4.6vw,4rem)]">{product.name}</h2>
        <p className="mt-3 font-display text-xl font-medium text-white/85">{product.tagline}</p>
        <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted-dark">
          {product.description}
        </p>
        {children}
      </div>

      <Parallax depth={-40} className={reverse ? "lg:order-first" : undefined}>
        {Preview ? <Preview /> : null}
      </Parallax>
    </div>
  );
}