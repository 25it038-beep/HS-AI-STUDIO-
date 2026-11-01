"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { DownloadIcon, ArrowUpRight } from "@/components/ui/icons";

export function CinematicJourney() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"oneliner" | "local">("oneliner");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const oneLinerCmd = `powershell -ExecutionPolicy Bypass -Command "irm https://hs-ai-studio.vercel.app/api/journey | iex"`;
  const localFileCmd = `powershell -ExecutionPolicy Bypass -File .\\hs-cinematic-journey-v2.ps1`;

  const handleCopy = async (cmd: string, id: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2200);
    } catch {
      // fallback
    }
  };

  // Interactive procedural preview canvas simulating the Eye -> Pupil Dive -> Endless Worlds
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    const width = 640;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    const render = () => {
      time += 0.025;
      const t = time % 24; // 24-second continuous simulation loop

      ctx.fillStyle = "#04070c";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      if (t < 5) {
        // --- Phase 1: Intro Stars & Title Glow ---
        const introAlpha = Math.min(1, t / 1.5) * Math.max(0, 1 - (t - 4) / 1);

        // Starfield
        for (let i = 0; i < 90; i++) {
          const sx = (Math.sin(i * 123.45 + 1) * 0.5 + 0.5) * width;
          const sy = (Math.cos(i * 678.91 + 2) * 0.5 + 0.5) * height;
          const tw = 0.5 + 0.5 * Math.sin(time * 2 + i);
          ctx.fillStyle = `rgba(180, 220, 255, ${tw * 0.7 * introAlpha})`;
          ctx.fillRect(sx, sy, 1.5, 1.5);
        }

        // Glowing Horizon Line
        const len = (width * 0.45 * Math.min(1, t / 1.8));
        const grad = ctx.createLinearGradient(cx - len, cy - 20, cx + len, cy - 20);
        grad.addColorStop(0, "rgba(34, 211, 238, 0)");
        grad.addColorStop(0.5, `rgba(56, 189, 248, ${0.8 * introAlpha})`);
        grad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(cx - len, cy - 21, len * 2, 2);

        // Title Text
        ctx.fillStyle = `rgba(255, 255, 255, ${introAlpha})`;
        ctx.font = "bold 15px monospace";
        ctx.textAlign = "center";
        ctx.fillText("H S   A I   S O L U T I O N S", cx, cy - 30);

        ctx.fillStyle = `rgba(148, 163, 184, ${introAlpha * 0.8})`;
        ctx.font = "11px monospace";
        ctx.fillText("P R E S E N T S", cx, cy);

        ctx.fillStyle = `rgba(56, 189, 248, ${introAlpha})`;
        ctx.font = "bold 14px monospace";
        ctx.fillText("E N D L E S S   J O U R N E Y   v 2", cx, cy + 28);
      } else if (t < 11) {
        // --- Phase 2: The Eye Opens & Pupil Expands ---
        const eyeT = t - 5;
        const openProgress = Math.min(1, eyeT / 1.8);
        const blink = eyeT > 2.8 && eyeT < 3.2 ? Math.sin((eyeT - 2.8) / 0.4 * Math.PI) : 0;
        const eyeOpen = Math.max(0.04, openProgress * (1 - blink * 0.85));

        // Ambient Eye Glow
        const bgRad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 180);
        bgRad.addColorStop(0, "rgba(14, 165, 233, 0.22)");
        bgRad.addColorStop(0.8, "rgba(4, 7, 12, 0)");
        ctx.fillStyle = bgRad;
        ctx.fillRect(0, 0, width, height);

        // Eyelid Path Clip
        ctx.save();
        ctx.beginPath();
        const eyeWidth = 190;
        const eyeHeight = 85 * eyeOpen;
        ctx.moveTo(cx - eyeWidth, cy);
        ctx.quadraticCurveTo(cx, cy - eyeHeight, cx + eyeWidth, cy);
        ctx.quadraticCurveTo(cx, cy + eyeHeight, cx - eyeWidth, cy);
        ctx.closePath();
        ctx.clip();

        // Sclera (White of Eye)
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(cx - eyeWidth, cy - eyeHeight, eyeWidth * 2, eyeHeight * 2);

        // Iris
        const irisRad = 62;
        const irisGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, irisRad);
        irisGrad.addColorStop(0, "#0369a1");
        irisGrad.addColorStop(0.5, "#0284c7");
        irisGrad.addColorStop(0.85, "#06b6d4");
        irisGrad.addColorStop(1, "#082f49");
        ctx.fillStyle = irisGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, irisRad, 0, Math.PI * 2);
        ctx.fill();

        // Iris fibers
        ctx.strokeStyle = "rgba(186, 230, 253, 0.25)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 48; i++) {
          const ang = (i / 48) * Math.PI * 2 + time * 0.1;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(ang) * 16, cy + Math.sin(ang) * 16);
          ctx.lineTo(cx + Math.cos(ang) * irisRad, cy + Math.sin(ang) * irisRad);
          ctx.stroke();
        }

        // Pupil (grows as we approach dive at eyeT > 4)
        const zoomT = Math.max(0, (eyeT - 4) / 2);
        const pupilRad = 24 * (1 + zoomT * zoomT * 8);
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(cx, cy, pupilRad, 0, Math.PI * 2);
        ctx.fill();

        // Specular Glint
        if (eyeOpen > 0.4 && zoomT < 0.6) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(cx - 18, cy - 18, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Eyelid Rim Glow
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - eyeWidth, cy);
        ctx.quadraticCurveTo(cx, cy - eyeHeight, cx + eyeWidth, cy);
        ctx.quadraticCurveTo(cx, cy + eyeHeight, cx - eyeWidth, cy);
        ctx.stroke();

        ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText("L O O K   C L O S E R", cx, height - 25);
      } else {
        // --- Phase 3: Endless World (Galaxy / Nebula Spiral / Wormhole) ---
        const worldT = t - 11;
        const zoom = Math.exp((worldT % 6.5) * 0.45);

        // Core Spiral Galaxy Ray-Marching Simulator
        const arms = 3;
        for (let r = 8; r < 200; r += 7) {
          const count = Math.floor(r * 0.8);
          for (let k = 0; k < count; k++) {
            const angle = (k / count) * Math.PI * 2 + Math.log(r * 0.1) * 2.2 - worldT * 0.6;
            const armOffset = Math.sin(angle * arms);
            if (armOffset > -0.2) {
              const dist = (r * zoom) % 240;
              const px = cx + Math.cos(angle) * dist * 1.4;
              const py = cy + Math.sin(angle) * dist * 0.9;
              const alpha = Math.max(0, 1 - dist / 220);
              const colChoice = (r + k) % 3;
              const col =
                colChoice === 0
                  ? `rgba(168, 85, 247, ${alpha * 0.8})`
                  : colChoice === 1
                  ? `rgba(56, 189, 248, ${alpha * 0.7})`
                  : `rgba(244, 63, 94, ${alpha * 0.6})`;

              ctx.fillStyle = col;
              ctx.fillRect(px, py, 2.2, 2.2);
            }
          }
        }

        // Luminous Core
        const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 45);
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        coreGrad.addColorStop(0.3, "rgba(224, 231, 255, 0.75)");
        coreGrad.addColorStop(0.6, "rgba(168, 85, 247, 0.35)");
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, Math.PI * 2);
        ctx.fill();

        // Overlay Text: World Name
        const worldNames = [
          "SWIRLING SPIRAL IN NEON",
          "A GALAXY, TURNING SLOWLY",
          "KALEIDOSCOPIC PLASMA IN TWO TONES",
          "INSIDE THE STORM",
          "ENDLESS LABYRINTH IN EMBERS",
        ];
        const worldIndex = Math.floor(worldT / 6.5) % worldNames.length;
        const currentWorldName = worldNames[worldIndex];

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText(currentWorldName, cx, height - 38);

        ctx.fillStyle = "rgba(148, 163, 184, 0.75)";
        ctx.font = "11px monospace";
        ctx.fillText(`WORLD 000${worldIndex + 1} · DIVE IN PROGRESS`, cx, height - 18);
      }

      // CRT Scanline Overlay
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section id="journey" className="relative overflow-hidden bg-ink py-28 md:py-36 border-t border-white/5">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute -left-48 top-20 h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(56, 189, 248, 0.4), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -right-48 bottom-20 h-[560px] w-[640px] rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(closest-side, rgba(168, 85, 247, 0.4), transparent)" }}
      />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      <div className="container-x relative">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/30 px-3.5 py-1 text-xs font-semibold text-sky-300">
              <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>TERMINAL GRAPHICS &amp; GENERATIVE ART</span>
            </div>
            <h2 className="display-xl mt-4 text-[clamp(2.4rem,6vw,4.8rem)] font-bold tracking-tight text-white leading-tight">
              PowerShell Endless Journey v2
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              An infinite procedural cinematic experience compiled and executed directly inside your native{" "}
              <strong>Windows Terminal / PowerShell</strong> at 60 FPS in 24-bit True Colour. Intro &rarr; the Eye opens &rarr; you dive into the pupil &rarr; new worlds bloom endlessly from inside it.
            </p>
          </Reveal>
        </div>

        {/* Main Terminal Experience Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/15 bg-[#080d16] shadow-2xl shadow-black/80">
          {/* Windows Terminal Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-black/60 px-5 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-white/60">
                Windows Terminal — powershell.exe [HS AI Solutions | Endless Journey v2]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-sky-400/30 bg-sky-950/40 px-2.5 py-0.5 font-mono text-[11px] text-sky-300 font-semibold">
                60 FPS · 24-Bit True-Colour
              </span>
            </div>
          </div>

          {/* Interactive Live Canvas Simulation */}
          <div className="relative aspect-video w-full bg-[#04070c] overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} className="h-full w-full object-cover" />

            {/* Corner Badge */}
            <div className="absolute top-4 left-4 rounded-lg border border-white/10 bg-black/70 px-3 py-1.5 backdrop-blur-md font-mono text-[11px] text-zinc-300">
              <span className="text-emerald-400 font-bold">● LIVE TERMINAL SIMULATION</span> · The Eye &amp; 520 Procedural Worlds
            </div>
          </div>

          {/* Interactive Command Runner Controls */}
          <div className="border-t border-white/10 bg-[#06090e] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Ready-to-Run PowerShell Command
                </span>
                <h3 className="mt-1 text-xl font-bold text-white">
                  Paste &amp; Press Enter to Watch Live in Your Terminal
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Open Windows Terminal, Command Prompt, or PowerShell, paste the command below and hit Enter.
                </p>
              </div>

              {/* Tab Selector: One-Liner vs Local File */}
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("oneliner")}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "oneliner"
                      ? "bg-sky-500 text-black shadow-md shadow-sky-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  🌐 Direct One-Liner (Web)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("local")}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === "local"
                      ? "bg-sky-500 text-black shadow-md shadow-sky-500/20"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  📁 Local Script File (.ps1)
                </button>
              </div>
            </div>

            {/* Command Box */}
            <div className="mt-5 relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-white/15 bg-black/80 p-3 sm:p-4 font-mono text-xs">
              <div className="flex-1 overflow-x-auto select-all text-sky-300 font-mono py-1">
                {activeTab === "oneliner" ? oneLinerCmd : localFileCmd}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      activeTab === "oneliner" ? oneLinerCmd : localFileCmd,
                      activeTab
                    )
                  }
                  className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 font-sans text-xs font-bold text-black transition-all hover:bg-sky-300"
                >
                  <span>{copiedCmd === activeTab ? "✓ Copied to Clipboard!" : "Copy Command"}</span>
                </button>

                <a
                  href="/scripts/hs-cinematic-journey-v2.ps1"
                  download="hs-cinematic-journey-v2.ps1"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2.5 font-sans text-xs font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
                  title="Download .ps1 script file"
                >
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download .ps1</span>
                </a>
              </div>
            </div>

            {/* Technical Highlights 4-Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xl">👁️</div>
                <h4 className="mt-2 text-sm font-semibold text-white">The Living Eye</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Ray-marched iris fibers, pupil dilation, animated blinking, and an accelerating zoom into the center of the pupil.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xl">🌌</div>
                <h4 className="mt-2 text-sm font-semibold text-white">520 World Recipes</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  13 field patterns &times; 8 space-warps &times; 5 colour looks &times; overlays with dynamically generated names.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xl">🪐</div>
                <h4 className="mt-2 text-sm font-semibold text-white">Special Worlds</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Every 5th world unveils rare cosmic spectacles: Galaxies, Exoplanets, Violent Storms, Cities of Light, and Stars.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-xl">⚡</div>
                <h4 className="mt-2 text-sm font-semibold text-white">Zero Dependencies</h4>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Direct in-memory C# compilation via .NET CLR &amp; Win32 console APIs. No npm, Python, or installations required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
