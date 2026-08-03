"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const METRICS = [
  { label: "AI Products", value: "4+" },
  { label: "AI Operations", value: "Thousands" },
  { label: "Growth", value: "Always Growing" },
  { label: "Speed", value: "Lightning Fast" },
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
      className="relative min-h-screen flex items-center px-6 pt-32 pb-20"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 lg:gap-16 items-center">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-zinc-400 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              HS AI Solutions Ecosystem v2.0
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              <span className="gradient-text">One Ecosystem.</span>
              <br />
              <span className="text-white">Infinite AI</span>
              <br />
              <span className="text-white/80">Possibilities.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-lg leading-relaxed">
              Build, secure, automate, learn, and innovate with a growing
              collection of AI-powered solutions designed to solve real-world
              problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Explore Solutions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass glass-hover text-white font-medium text-sm transition-all duration-300"
            >
              Launch Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="glass rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className={`flex flex-col gap-1 ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""
                }`}
              >
                <span className="text-lg sm:text-xl font-bold text-white">
                  {metric.value}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

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

      const particlesGeo = new THREE.BufferGeometry();
      const count = 400;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2 + Math.random() * 2;
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);

        colors[i] = 0.5 + Math.random() * 0.5;
        colors[i + 1] = 0.2 + Math.random() * 0.3;
        colors[i + 2] = 0.7 + Math.random() * 0.3;
      }

      particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particlesMat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(particlesGeo, particlesMat);
      scene.add(particles);

      const innerGeo = new THREE.BufferGeometry();
      const innerCount = 60;
      const innerPos = new Float32Array(innerCount * 3);
      for (let i = 0; i < innerCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 0.5 + Math.random() * 1;
        innerPos[i] = r * Math.sin(phi) * Math.cos(theta);
        innerPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        innerPos[i + 2] = r * Math.cos(phi);
      }
      innerGeo.setAttribute("position", new THREE.BufferAttribute(innerPos, 3));

      const innerMat = new THREE.PointsMaterial({
        size: 0.06,
        color: 0xa855f7,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const innerSphere = new THREE.Points(innerGeo, innerMat);
      scene.add(innerSphere);

      const ringGeo = new THREE.TorusGeometry(1.8, 0.01, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.2,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      scene.add(ring);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.3, 0.008, 16, 100),
        new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.15,
        })
      );
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 6;
      scene.add(ring2);

      camera.position.z = 5;

      const animate = () => {
        particles.rotation.y += 0.002;
        particles.rotation.x += 0.0005;
        innerSphere.rotation.y -= 0.003;
        innerSphere.rotation.z += 0.001;
        ring.rotation.z += 0.003;
        ring2.rotation.y += 0.002;

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

  return (
    <div
      ref={mountRef}
      className="w-[400px] h-[400px] xl:w-[480px] xl:h-[480px]"
    />
  );
}