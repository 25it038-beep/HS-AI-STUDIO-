"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products, type ProductDetail } from "@/data/products";
import { PreviewRenderer } from "@/components/previews/PreviewRenderer";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";

function ProductCell({ product }: { product: ProductDetail }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-4 transition-colors duration-500 hover:border-white/20 sm:p-5"
      style={{ ["--acc" as string]: product.accent }}
    >
      <Link
        href={`/products/${product.id}`}
        aria-label={`Open ${product.name} details`}
        className="relative block overflow-hidden rounded-xl"
      >
        <div className="scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <PreviewRenderer preview={product.preview} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-6">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] text-white/35">{product.number}</span>
          <span className="flex items-center gap-2">
            {product.status === "development" ? (
              <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-amber-300">
                In development
              </span>
            ) : null}
            <span className="eyebrow text-[0.6rem]" style={{ color: product.accent }}>
              {product.category}
            </span>
          </span>
        </div>

        <h3 className="display-lg mt-3 text-3xl sm:text-4xl">{product.name}</h3>
        <p className="mt-1.5 font-medium text-white/75">{product.tagline}</p>
        <p className="mt-4 text-[14.5px] leading-relaxed text-muted-dark">
          {product.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {product.technologies.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono text-white/50"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
          {product.downloadUrl ? (
            <a
              href={product.downloadUrl}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Download <ArrowUpRight className="h-3.5 w-3.5 rotate-90" />
            </a>
          ) : (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Launch <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/products/${product.id}`}
            className="group/link inline-flex items-center gap-1 text-[12.5px] font-medium text-white/55 transition-colors hover:text-white"
          >
            View details
            <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function AllApplications() {
  return (
    <section id="projects" className="relative bg-paper py-28 text-ink md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal y={16}>
              <p className="eyebrow text-ink/45">The collection</p>
            </Reveal>
            <Reveal y={24} delay={0.05}>
              <h2 className="display-lg mt-5 text-[clamp(2.2rem,5vw,4.2rem)]">
                Explore the Applications
              </h2>
            </Reveal>
          </div>
          <Reveal y={20} delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink/55">
              Four live systems, each exploring a different way AI can solve a real problem.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {products.map((p) => (
            <ProductCell key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}