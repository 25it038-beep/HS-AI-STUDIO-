"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, type ProductDetail } from "@/data/products";
import { PreviewRenderer } from "@/components/previews/PreviewRenderer";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { CollaboratorModal } from "@/components/CollaboratorModal";
import { triggerFullscreenExploreVideo } from "@/components/fullscreen-explore-video";

function ProductCell({
  product,
  onOpenCollab,
}: {
  product: ProductDetail;
  onOpenCollab: (p: ProductDetail) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#111116] p-4 text-white shadow-2xl transition-all duration-500 hover:border-white/25 sm:p-5"
      style={{ ["--acc" as string]: product.accent }}
    >
      <Link
        href={`/products/${product.id}`}
        onClick={(e) => {
          e.preventDefault();
          triggerFullscreenExploreVideo(`/products/${product.id}`);
        }}
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
            {product.collaboratorOnly ? (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-950/40 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-emerald-300">
                Collaborator Only
              </span>
            ) : product.status === "development" ? (
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
            product.collaboratorOnly ? (
              <button
                type="button"
                onClick={() => onOpenCollab(product)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-4 text-[13px] font-semibold text-emerald-300 transition-colors duration-300 hover:border-emerald-400 hover:bg-emerald-900/30"
              >
                Collaborator Download <ArrowUpRight className="h-3.5 w-3.5 rotate-90" />
              </button>
            ) : (
              <a
                href={product.downloadUrl}
                target={product.downloadUrl.startsWith("http") ? "_blank" : undefined}
                rel={product.downloadUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-[13px] font-semibold text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
              >
                Download <ArrowUpRight className="h-3.5 w-3.5 rotate-90" />
              </a>
            )
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
            onClick={(e) => {
              e.preventDefault();
              triggerFullscreenExploreVideo(`/products/${product.id}`);
            }}
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
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  const handleOpenCollab = (p: ProductDetail) => {
    setSelectedProduct(p);
    setCollabModalOpen(true);
  };

  return (
    <section id="projects" className="relative bg-paper py-28 text-ink md:py-40">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-ink/45">Complete Portfolio</p>
              <h2 className="display-xl mt-4 text-[clamp(2.2rem,6vw,5.5rem)]">
                Every application, built to serve a purpose
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-ink/65">
              Each tool represents an exploration into what software becomes when intelligence is
              deeply integrated — from offline edge systems to multimodal understanding.
            </p>
          </Reveal>
        </div>

        {/* products grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCell key={p.id} product={p} onOpenCollab={handleOpenCollab} />
          ))}
        </div>
      </div>

      <CollaboratorModal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
        accent={selectedProduct?.accent || "#10b981"}
        downloadApiPath={selectedProduct?.downloadUrl || "/api/download/gravity"}
        fileName={selectedProduct?.id === "domcode-llm" ? "DomcodeLLM-Setup.exe" : "Gravity_LLM_Portable.zip"}
      />
    </section>
  );
}
