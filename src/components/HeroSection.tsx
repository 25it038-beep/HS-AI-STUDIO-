"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";
import { ArrowRight, Sparkles, Cpu } from "lucide-react";
import { EASE, fadeUp, stagger } from "@/lib/motion";
import { STATS, SOLUTIONS, type Stat } from "@/lib/data";

function Counter({ value, suffix = "", format = false }: { value: number; suffix?: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = format ? value.toLocaleString() : `${value}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = format ? Math.round(v).toLocaleString() : `${Math.round(v)}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, format, reduced]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function StatValue({ stat }: { stat: Stat }) {
  if (stat.text !== undefined) {
    return (
      <span>
        {stat.text}
        {stat.suffix ?? ""}
      </span>
    );
  }
  return <Counter value={stat.value ?? 0} suffix={stat.suffix ?? ""} format={(stat.value ?? 0) >= 1000} />;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <motion.section
      ref={sectionRef}
      style={reduced ? undefined : { opacity: fade }}
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-center px-4 sm:px-6 pt-24 pb-8"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        {/* ---------- Left ---------- */}
        <motion.div
          variants={stagger(0.12, reduced ? 0 : 0.2)}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="section-kicker">
              <span className="kicker-dot" />
              HS AI Solutions Ecosystem v2.0
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              4 products live
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold tracking-tight leading-[1.08] text-[clamp(2.2rem,4.2vw,3.8rem)]"
          >
            <span className="block text-white">One Ecosystem.</span>
            <span className="block text-gradient">Infinite AI</span>
            <span className="block text-zinc-400">Possibilities.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Build, secure, automate, learn, and innovate with a growing
            collection of AI-powered solutions designed to solve real-world
            problems — all in one place.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5">
            <a href="#solutions" className="btn-primary sheen group">
              <Sparkles className="w-4 h-4" />
              Explore Solutions
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#download" className="btn-ghost">
              <Cpu className="w-4 h-4 text-purple-300" />
              Get HS CODE
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="glass-card !rounded-2xl px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:gap-y-0"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-0.5 ${i > 0 ? "sm:pl-5 sm:border-l sm:border-white/10" : ""}`}
              >
                <span className="font-display text-lg sm:text-xl font-semibold text-gradient-static">
                  <StatValue stat={stat} />
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Right: 3D scene ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: reduced ? 0 : 0.35, ease: EASE }}
          style={reduced ? undefined : { y: drift }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_65%)] blur-xl" />
          <ThreeScene />
        </motion.div>
      </div>

      {/* ---------- Marquee ---------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1, duration: 1 }}
        className="max-w-7xl mx-auto w-full mt-6"
      >
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-3">
          Powering the ecosystem
        </p>
        <div className="mask-fade-x overflow-hidden">
          <motion.div
            className="flex gap-10 w-max"
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...SOLUTIONS, ...SOLUTIONS].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex items-center gap-3 text-zinc-500">
                  <Icon className="w-4 h-4" style={{ color: s.glow }} />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {s.title}
                  </span>
                  <span className="text-zinc-700">•</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

useEffect(() => {
      if (!mountRef.current) return;

      let cleanup: (() => void) | undefined;

      const init = async () => {
        const THREE = await import("three");
        const size = Math.min(mountRef.current?.clientWidth ?? 420, 460);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        mountRef.current?.appendChild(renderer.domElement);

      const outerCount = 500;
      const positions = new Float32Array(outerCount * 3);
      const colors = new Float32Array(outerCount * 3);
      for (let i = 0; i < outerCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2 + Math.random() * 2.4;
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
        colors[i] = 0.55 + Math.random() * 0.45;
        colors[i + 1] = 0.35 + Math.random() * 0.3;
        colors[i + 2] = 0.85 + Math.random() * 0.15;
      }
      const outerGeo = new THREE.BufferGeometry();
      outerGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      outerGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const outer = new THREE.Points(
        outerGeo,
        new THREE.PointsMaterial({
          size: 0.035,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        })
      );
      scene.add(outer);

      const innerCount = 90;
      const innerPos = new Float32Array(innerCount * 3);
      for (let i = 0; i < innerCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.45 + Math.random() * 1.1;
        innerPos[i] = r * Math.sin(phi) * Math.cos(theta);
        innerPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        innerPos[i + 2] = r * Math.cos(phi);
      }
      const innerGeo = new THREE.BufferGeometry();
      innerGeo.setAttribute("position", new THREE.BufferAttribute(innerPos, 3));
      const inner = new THREE.Points(
        innerGeo,
        new THREE.PointsMaterial({
          size: 0.07,
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
        })
      );
      scene.add(inner);

      const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.85, 0.008, 16, 120),
        new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.22 })
      );
      ring1.rotation.x = Math.PI / 2.8;
      scene.add(ring1);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.35, 0.006, 16, 120),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.16 })
      );
      ring2.rotation.x = -Math.PI / 3.6;
      ring2.rotation.y = Math.PI / 5;
      scene.add(ring2);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.9 })
      );
      scene.add(core);

      camera.position.z = 5;

      const animate = () => {
        outer.rotation.y += 0.0018;
        outer.rotation.x += 0.0004;
        inner.rotation.y -= 0.0024;
        inner.rotation.z += 0.0008;
        ring1.rotation.z += 0.0025;
        ring2.rotation.y += 0.0018;
        core.rotation.y += 0.004;
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

  return <div ref={mountRef} className="w-full max-w-[380px] aspect-square" />;
}
