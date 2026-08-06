"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Copy, Check, Play, Shield, Briefcase, Bot, Cpu, Zap } from "lucide-react";

export default function HeroSection({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-20 os-grid"
    >
      {/* Dynamic Atmospheric Glow Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-amber-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-10">
        
        {/* Top OS Version Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0d1222]/90 border border-cyan-500/40 text-xs font-black tracking-widest text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.25)] backdrop-blur-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
          <span>HS AI OPERATING SYSTEM V2.4 ENTERPRISE</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
            Enterprise Intelligence. <br />
            <span className="hero-gradient-text">
              One Autonomous Platform.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Unified suite engineered for high-performance AI cybersecurity, career intelligence, multimodal coding, and prompt-to-app executable synthesis.
          </p>
        </motion.div>

        {/* CTA Buttons Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <a
            href="#solutions"
            className="h-14 px-9 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 text-zinc-950 font-black text-xs uppercase tracking-widest inline-flex items-center gap-3 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-zinc-950" />
            <span>Explore Solutions Matrix</span>
          </a>

          <button
            onClick={onOpenSearch}
            className="h-14 px-8 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs uppercase tracking-widest border border-white/15 hover:border-cyan-400/50 inline-flex items-center gap-2.5 transition-all shadow-lg cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Quick Search (⌘K)</span>
          </button>
        </motion.div>

        {/* Interactive Live AI Code & Stream Playground Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-5xl rounded-3xl bg-[#080c18]/90 border border-cyan-500/30 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden backdrop-blur-3xl grid md:grid-cols-2 gap-8 items-center text-left"
        >
          {/* Top Laser Accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400" />

          {/* Left: Live Streaming Code Console */}
          <LiveStreamConsole />

          {/* Right: Interactive 3D Core Stage */}
          <div className="flex flex-col items-center justify-center relative min-h-[260px] space-y-4">
            <ThreeScene />
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-bold">
                🛡️ AIShield Cyber
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold">
                ⚡ CareerAI Engine
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold">
                💬 HS AI Chatbot
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function LiveStreamConsole() {
  const [copied, setCopied] = useState(false);
  const codeText = `// Autonomous System Initialization
import { HS_AI_Core } from "@hs-ai/os";

const system = await HS_AI_Core.initialize({
  securityMode: "ENTERPRISE_SHIELD",
  neuralEngine: "v4_HYBRID",
  latencyTarget: "SUB_10MS",
});

await system.streamResponse({
  prompt: "Synthesize executable desktop architecture",
  status: "COMPLETED",
});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs font-mono text-cyan-300 font-bold ml-2">HS AI OS Live Stream</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Simulated Live Stream Code Window */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto space-y-1">
        <div className="text-purple-400 font-semibold">// Autonomous System Initialization</div>
        <div>
          <span className="text-cyan-400">import</span> &#123; HS_AI_Core &#125;{" "}
          <span className="text-cyan-400">from</span> <span className="text-amber-300">&quot;@hs-ai/os&quot;</span>;
        </div>
        <br />
        <div>
          <span className="text-cyan-400">const</span> system ={" "}
          <span className="text-cyan-400">await</span> HS_AI_Core.
          <span className="text-emerald-400">initialize</span>(&#123;
        </div>
        <div className="pl-4 text-zinc-400">
          securityMode: <span className="text-amber-300">&quot;ENTERPRISE_SHIELD&quot;</span>,
        </div>
        <div className="pl-4 text-zinc-400">
          neuralEngine: <span className="text-amber-300">&quot;v4_HYBRID&quot;</span>,
        </div>
        <div className="pl-4 text-zinc-400">
          latencyTarget: <span className="text-amber-300">&quot;SUB_10MS&quot;</span>,
        </div>
        <div>&#125;);</div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Status: 100% Stream Active</span>
        </span>
        <span>Tokens: 1,420 / sec</span>
      </div>
    </div>
  );
}

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(240, 240);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current?.appendChild(renderer.domElement);

      const octaGeo = new THREE.OctahedronGeometry(1.3, 0);
      const octaMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const octa = new THREE.Mesh(octaGeo, octaMat);
      scene.add(octa);

      const icoGeo = new THREE.IcosahedronGeometry(0.75, 1);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const ico = new THREE.Mesh(icoGeo, icoMat);
      scene.add(ico);

      const particlesGeo = new THREE.BufferGeometry();
      const count = 280;
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.4 + Math.random() * 0.9;
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
      }

      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particlesMat = new THREE.PointsMaterial({
        size: 0.035,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      camera.position.z = 4;

      const animate = () => {
        octa.rotation.y += 0.006;
        octa.rotation.x += 0.003;
        ico.rotation.y -= 0.008;
        particles.rotation.y += 0.003;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      };
    };

    init();

    return () => cleanup?.();
  }, []);

  return <div ref={mountRef} className="w-[240px] h-[240px] pointer-events-none" />;
}