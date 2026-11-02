"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, type ProductDetail } from "@/data/products";
import { PreviewRenderer } from "@/components/previews/PreviewRenderer";
import { DemoVideo, DEMO_VIDEOS } from "@/components/previews/DemoVideo";
import { DownloadIcon, ArrowUpRight, TerminalIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CollaboratorModal } from "@/components/CollaboratorModal";
import { DownloadCompanionModal } from "@/components/DownloadCompanionModal";

export function ProductDetailView({ product }: { product: ProductDetail }) {
  const [collabModalOpen, setCollabModalOpen] = useState(false);
  const [downloadCompanionOpen, setDownloadCompanionOpen] = useState(false);
  const others = products.filter((p) => p.id !== product.id);

  return (
    <div className="bg-ink">
      {/* hero */}
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-24 md:pt-44">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-70"
          style={{
            background: `radial-gradient(60% 90% at 50% -10%, ${product.accent}1e, transparent 70%)`,
          }}
        />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_20%,black,transparent)]" />

        <div className="container-x relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
            >
              ← All applications
            </Link>
          </motion.div>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="font-mono text-xs text-white/40">{product.number}</span>
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: product.accent }}
                />
                <span className="eyebrow" style={{ color: product.accent }}>
                  {product.category}
                </span>
              </motion.div>

              <motion.h1
                className="display-xl mt-4 text-[clamp(2.5rem,6vw,5.5rem)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                {product.name}
              </motion.h1>

              <motion.p
                className="mt-4 font-display text-2xl font-medium text-white/85"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.7 }}
              >
                {product.tagline}
              </motion.p>

              <motion.p
                className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.7 }}
              >
                {product.description}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                {product.downloadUrl ? (
                  <>
                    {product.collaboratorOnly ? (
                      <button
                        type="button"
                        onClick={() => setCollabModalOpen(true)}
                        className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: product.accent,
                          color: "#000",
                          boxShadow: `0 0 25px -4px ${product.accent}80`,
                        }}
                      >
                        <span>Download Collaborator Suite</span>
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    ) : (
                      <MagneticButton
                        href={product.downloadUrl}
                        download={!product.downloadUrl.startsWith("http") ? true : undefined}
                        external={product.downloadUrl.startsWith("http")}
                        lg
                        accent={product.accent}
                        onClick={
                          product.downloadUrl.startsWith("http")
                            ? () => setDownloadCompanionOpen(true)
                            : undefined
                        }
                      >
                        {product.id === "electron" || product.id === "galaxy-vision"
                          ? "Download Standalone ZIP"
                          : "Download for Windows"}
                        <DownloadIcon className="h-4 w-4" />
                      </MagneticButton>
                    )}
                    {product.collaboratorOnly ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/40 px-4 py-2.5 text-[12.5px] font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Collaborator Access · GGUF 5.24GB · 44 Tools
                      </span>
                    ) : product.status === "development" ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 px-4 py-2.5 text-[12.5px] font-medium text-amber-300/90">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        In development · v0.1.0
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-medium text-white/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {product.id === "electron"
                          ? "Offline AI · 4GB RAM Ready · Live Search"
                          : product.id === "galaxy-vision"
                          ? "Multimodal Vision AI · Portable · Q4_K_M"
                          : "Windows Native (x64) · v0.1.0"}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <MagneticButton href={product.url} external lg accent={product.accent}>
                      Launch {product.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-medium text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live · deployed
                    </span>
                  </>
                )}
              </motion.div>

              {/* Special Product Operational & Hardware Notices */}
              {product.notices && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs sm:p-5"
                >
                  {product.notices.extractionNote && (
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 font-bold text-emerald-400">⚡ Setup Instruction:</span>
                      <span className="leading-relaxed text-zinc-300">{product.notices.extractionNote}</span>
                    </div>
                  )}
                  {product.notices.latencyNotice && (
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 font-bold text-amber-400">⏱️ Latency Notice:</span>
                      <span className="leading-relaxed text-zinc-300">{product.notices.latencyNotice}</span>
                    </div>
                  )}
                  {product.notices.hardwareAdvisory && (
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 font-bold text-sky-400">🖥️ Hardware Advisory:</span>
                      <span className="leading-relaxed text-zinc-300">{product.notices.hardwareAdvisory}</span>
                    </div>
                  )}
                  {product.notices.securityNote && (
                    <div className="flex items-start gap-2.5">
                      <span className="shrink-0 font-bold text-purple-400">🔒 Collaborator Access:</span>
                      <span className="leading-relaxed text-zinc-300">{product.notices.securityNote}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.9 }}
            >
              <PreviewRenderer preview={product.preview} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* explanation */}
      <section className="border-t border-white/[0.07] bg-ink py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-white/45">Why it exists</p>
            <h2 className="display-lg mt-5 text-[clamp(1.8rem,3.6vw,3rem)]">
              {product.name} in one breath
            </h2>
          </Reveal>
          <Reveal y={26} delay={0.1}>
            <p className="text-[17px] leading-relaxed text-muted-dark">{product.long}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.technologies.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* key features */}
      <section className="bg-paper py-24 text-ink">
        <div className="container-x">
          <SectionHeading
            eyebrow="Key features"
            theme="light"
            title="What it actually does"
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => (
              <motion.div
                key={f}
                className="group bg-paper p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[12px] font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, ${product.accent}, ${product.accent}99)` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[15px] font-semibold text-ink">{f}</p>
                <div
                  className="mt-3 h-px w-8 transition-all duration-500 group-hover:w-full"
                  style={{ background: product.accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* product in action — big preview */}
      <section className="relative overflow-hidden bg-ink py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-50"
          style={{ background: `radial-gradient(50% 100% at 50% 0%, ${product.accent}1a, transparent)` }}
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Product in action"
            title="A look inside"
          />
          <Reveal y={40} delay={0.1} className="mt-12 lg:mt-16 lg:ml-[12%]">
            <div className="lg:w-[88%]">
              <PreviewRenderer preview={product.preview} />
            </div>
          </Reveal>
        </div>

        {product.preview === "phishing" ||
        product.preview === "ledger" ||
        product.preview === "hsbot" ||
        product.preview === "academia" ||
        product.preview === "pendulum" ? (
          <section className="border-t border-white/[0.07] bg-ink py-24">
            <div className="container-x">
              <SectionHeading eyebrow="Demo" title="Watch it in action" />
              <Reveal y={30} delay={0.1} className="mt-12">
                <div className="mx-auto max-w-3xl">
                  <DemoVideo
                    src={DEMO_VIDEOS[product.preview].src}
                    label={DEMO_VIDEOS[product.preview].label}
                    accent={product.accent}
                    externalLink={DEMO_VIDEOS[product.preview].externalLink}
                    externalLabel={DEMO_VIDEOS[product.preview].externalLabel}
                    caption={DEMO_VIDEOS[product.preview].caption}
                  />
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}
      </section>

      {/* architecture */}
      <section className="bg-paper py-24 text-ink">
        <div className="container-x">
          <SectionHeading eyebrow="Architecture" theme="light" title="How it works, end to end" />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {product.flow.map((f, i) => (
              <motion.div
                key={f.step}
                className="relative rounded-2xl border border-ink/10 bg-white/70 p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <span className="font-mono text-[11px]" style={{ color: product.accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-[16px] font-semibold text-ink">{f.step}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/55">{f.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* portable bat launchers */}
      {product.batLaunchers ? (
        <section className="border-t border-white/[0.07] bg-[#0c0c11] py-24 text-white">
          <div className="container-x">
            <SectionHeading
              eyebrow="One-Click BAT Launchers"
              title="Run any interface instantly"
            />
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-dark">
              Extract the portable ZIP archive and launch your preferred workflow directly with Windows batch scripts. Zero installation, zero admin rights, fully offline-ready.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.batLaunchers.map((b, i) => (
                <motion.div
                  key={b.file}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.04]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[12px] font-semibold text-emerald-300">
                        <TerminalIcon className="h-3.5 w-3.5" />
                        {b.file}
                      </span>
                      <span className="font-mono text-[11px] text-white/35">0{i + 1}</span>
                    </div>
                    <p className="mt-4 text-[16px] font-semibold text-white">{b.title}</p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-dark">{b.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-[11px] text-white/40">Double-click to run</span>
                    <span className="text-xs font-semibold" style={{ color: product.accent }}>→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* technical specs table */}
      {product.technicalSpecs ? (
        <section className="border-t border-white/[0.07] bg-ink py-24 text-white">
          <div className="container-x">
            <SectionHeading
              eyebrow="Hardware & Model Specs"
              title="Technical Specifications"
            />
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-white/45">Property</th>
                    <th className="py-4 px-6 font-mono text-[11px] uppercase tracking-wider text-white/45">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {product.technicalSpecs.map((spec, i) => (
                    <motion.tr
                      key={spec.property}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="py-4 px-6 font-medium text-white/70">{spec.property}</td>
                      <td className="py-4 px-6 font-mono text-[13px] font-semibold text-white">
                        <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2.5 py-1">
                          {spec.value}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {/* AI capabilities + technology */}
      <section className="border-t border-white/[0.07] bg-ink py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow text-white/45">AI capabilities</p>
              <h2 className="display-lg mt-5 text-[clamp(1.8rem,3.6vw,3rem)]">
                The intelligence inside
              </h2>
            </Reveal>
            <div className="mt-8 space-y-3">
              {product.capabilities.map((c, i) => (
                <motion.div
                  key={c}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: product.accent, boxShadow: `0 0 12px ${product.accent}88` }}
                  />
                  <span className="text-[15px] text-white/80">{c}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow text-white/45">Technology</p>
              <h2 className="display-lg mt-5 text-[clamp(1.8rem,3.6vw,3rem)]">Stack</h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {product.technologies.map((t, i) => (
                <motion.span
                  key={t}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-white/75"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* use cases */}
      <section className="bg-ink pb-24 pt-4">
        <div className="container-x">
          <SectionHeading eyebrow="Use cases" title="Where it earns its place" />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {product.useCases.map((u, i) => (
              <Reveal key={u.title} y={24} delay={i * 0.06}>
                <div className="group flex items-start justify-between gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-white/25">
                  <div>
                    <p className="text-[16px] font-semibold text-white">{u.title}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-dark">
                      {u.description}
                    </p>
                  </div>
                  <span
                    className="mt-0.5 h-2 w-2 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-125"
                    style={{ background: product.accent }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* other products */}
      <section className="border-t border-white/[0.07] bg-ink pb-28">
        <div className="container-x">
          <Reveal>
            <p className="flex items-center justify-between">
              <span className="eyebrow text-white/45">Continue exploring</span>
              <Link href="/#projects" className="font-mono text-[11px] text-white/40 hover:text-white">
                all →
              </Link>
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <motion.div key={o.id} whileHover={{ y: -4 }}>
                <Link
                  href={`/products/${o.id}`}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/25"
                >
                  <span className="font-mono text-[10px] text-white/35">{o.number}</span>
                  <span className="mt-2 text-lg font-semibold text-white">{o.name}</span>
                  <span className="text-[12.5px] text-white/50">{o.tagline}</span>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium"
                    style={{ color: o.accent }}
                  >
                    Open <ArrowUpRight className="h-3 w-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborator Access Modal */}
      <CollaboratorModal
        isOpen={collabModalOpen}
        onClose={() => setCollabModalOpen(false)}
        accent={product.accent}
        downloadApiPath={product.downloadUrl || "/api/download/gravity"}
        fileName={product.id === "domcode-llm" ? "DomcodeLLM-Setup.exe" : "Gravity_LLM_Portable.zip"}
      />

      {/* Download Companion & OS Alert Modal */}
      <DownloadCompanionModal
        isOpen={downloadCompanionOpen}
        onClose={() => setDownloadCompanionOpen(false)}
        productName={product.name}
        downloadUrl={product.downloadUrl || ""}
        localBackupUrl={
          product.id === "galaxy-vision"
            ? "/downloads/Galaxy-Vision-v1.0.0-Standalone.zip"
            : undefined
        }
        accent={product.accent}
        fileName={
          product.id === "galaxy-vision"
            ? "Galaxy-Vision-v1.0.0-Standalone.zip"
            : `${product.id}-standalone.zip`
        }
      />
    </div>
  );
}
