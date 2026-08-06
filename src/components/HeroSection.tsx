"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const METRICS = [
  { label: "AI Products", value: "4+" },
  { label: "AI Operations", value: "Thousands" },
  { label: "Growth Rate", value: "Accelerating" },
  { label: "Performance", value: "Lightning Fast" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-32 lg:pb-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Hero Column */}
        <div className="flex flex-col gap-8 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-200 tracking-wider w-fit shadow-[0_0_15px_rgba(245,158,11,0.12)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>HS AI SOLUTIONS ECOSYSTEM V2.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-white">
              One Ecosystem.
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Infinite AI
              </span>
              <br />
              <span className="text-zinc-400">Possibilities.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
              Build, secure, automate, learn, and innovate with a bespoke
              suite of high-performance AI solutions engineered for real-world supremacy.
            </p>
          </motion.div>

          {/* CTA Button Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#solutions"
              className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>Explore Solutions</span>
              <svg className="w-4 h-4 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="#solutions"
              className="h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs uppercase tracking-wider border border-white/15 hover:border-amber-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
            >
              <span>Launch Dashboard</span>
              <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>

          {/* Metrics Grid Container */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="bg-gradient-to-b from-[#13141f]/90 to-[#090a10] rounded-3xl p-7 border border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 items-center shadow-xl"
          >
            {METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className={`flex flex-col gap-1.5 ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""
                } ${i % 2 === 1 ? "max-sm:border-l max-sm:border-white/10 max-sm:pl-6" : ""} ${
                  i >= 2 ? "max-sm:border-t max-sm:border-white/10 max-sm:pt-4" : ""
                }`}
              >
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {metric.value}
                </span>
                <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-[0.18em]">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right 3D Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="hidden lg:flex items-center justify-center"
        >
          <ThreeScene />
        </motion.div>
      </div>
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

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(480, 480);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current?.appendChild(renderer.domElement);

      // Outer Gold Particle Sphere
      const particlesGeo = new THREE.BufferGeometry();
      const count = 450;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2 + Math.random() * 1.8;
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);

        colors[i] = 0.95 + Math.random() * 0.05;
        colors[i + 1] = 0.7 + Math.random() * 0.25;
        colors[i + 2] = 0.15 + Math.random() * 0.2;
      }

      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particlesMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      // Inner Core Cluster
      const innerGeo = new THREE.BufferGeometry();
      const innerCount = 80;
      const innerPos = new Float32Array(innerCount * 3);
      for (let i = 0; i < innerCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.4 + Math.random() * 0.9;
        innerPos[i] = r * Math.sin(phi) * Math.cos(theta);
        innerPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        innerPos[i + 2] = r * Math.cos(phi);
      }
      innerGeo.setAttribute("position", new THREE.BufferAttribute(innerPos, 3));

      const innerMat = new THREE.PointsMaterial({
        size: 0.065,
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const innerSphere = new THREE.Points(innerGeo, innerMat);
      scene.add(innerSphere);

      // Ring 1 (Gold)
      const ringGeo = new THREE.TorusGeometry(1.85, 0.012, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      scene.add(ring);

      // Ring 2 (Purple Accent)
      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.35, 0.009, 16, 100),
        new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          transparent: true,
          opacity: 0.2,
        })
      );
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 6;
      scene.add(ring2);

      camera.position.z = 5;

      // Mouse Parallax Interaction
      let mouseX = 0;
      let mouseY = 0;
      const onPointerMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("mousemove", onPointerMove);

      const animate = () => {
        particles.rotation.y += 0.0025 + mouseX * 0.005;
        particles.rotation.x += 0.0008 + mouseY * 0.005;
        innerSphere.rotation.y -= 0.0035;
        innerSphere.rotation.z += 0.0015;
        ring.rotation.z += 0.003;
        ring2.rotation.y += 0.0025;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        window.removeEventListener("mousemove", onPointerMove);
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      };
    };

    init();

    return () => cleanup?.();
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] xl:w-[480px] xl:h-[480px] max-w-full pointer-events-none"
    />
  );
}