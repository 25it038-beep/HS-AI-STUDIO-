/**
 * HS INFINITE — Procedural Multiverse Generator
 * 8 distinct physical dimensions with deterministic procedural seeds.
 * Every environment has unique geometry, particle systems, lighting, and camera kinematics.
 */

import * as THREE from "three";

export interface DimensionConfig {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  seed: number;
  palette: {
    primary: string;
    secondary: string;
    ambient: string;
    accent: string;
  };
  metrics: {
    gravitationalConstant: string;
    relativisticBeta: string;
    curvatureTensor: string;
    entropyIndex: string;
  };
}

export const DIMENSIONS: DimensionConfig[] = [
  {
    id: "cosmic-origins",
    name: "DIMENSION 01",
    title: "COSMIC ORIGINS",
    subtitle: "Primordial Protostellar Genesis",
    description: "Deep-black newborn universe. Protostellar accretion clouds collapse into the very first generation of luminous stars.",
    seed: 104729,
    palette: {
      primary: "#f59e0b",   // Champagne Gold
      secondary: "#fbbf24", // Solar Amber
      ambient: "#030712",   // Deep Void
      accent: "#ffffff",    // Stellar Core
    },
    metrics: {
      gravitationalConstant: "G = 6.674×10⁻¹¹ N·m²/kg²",
      relativisticBeta: "β = 0.14 c",
      curvatureTensor: "R_μν = 0.082 m⁻²",
      entropyIndex: "S/k_B = 1.04×10⁷",
    },
  },
  {
    id: "nebula-kingdom",
    name: "DIMENSION 02",
    title: "NEBULA KINGDOM",
    subtitle: "Interstellar Ionized Plasma Realm",
    description: "Gigantic glowing emission nebulae spanning hundreds of light years, sculpted by immense stellar winds.",
    seed: 224737,
    palette: {
      primary: "#ec4899",   // Hot Ionized Pink
      secondary: "#8b5cf6", // Deep Violet
      ambient: "#090514",   // Cosmic Dust
      accent: "#38bdf8",    // Cyan Ion Stream
    },
    metrics: {
      gravitationalConstant: "G = 7.120×10⁻¹¹ N·m²/kg²",
      relativisticBeta: "β = 0.28 c",
      curvatureTensor: "R_μν = 0.214 m⁻²",
      entropyIndex: "S/k_B = 4.89×10⁸",
    },
  },
  {
    id: "galactic-ocean",
    name: "DIMENSION 03",
    title: "GALACTIC OCEAN",
    subtitle: "Double-Spiral Megastructure",
    description: "Vast rotating logarithmic spiral galaxies composed of billions of orbiting stellar systems across cosmic voids.",
    seed: 384911,
    palette: {
      primary: "#38bdf8",   // Electric Cyan
      secondary: "#6366f1", // Indigo Arm
      ambient: "#020617",   // Galactic Sea
      accent: "#facc15",    // Galactic Core
    },
    metrics: {
      gravitationalConstant: "G = 6.674×10⁻¹¹ N·m²/kg²",
      relativisticBeta: "β = 0.45 c",
      curvatureTensor: "R_μν = 0.540 m⁻²",
      entropyIndex: "S/k_B = 9.12×10¹⁰",
    },
  },
  {
    id: "quantum-dimension",
    name: "DIMENSION 04",
    title: "QUANTUM DIMENSION",
    subtitle: "Planck-Scale Geometric Lattice",
    description: "Abstract non-Euclidean quantum foam. Spacetime crystallizes into pulsating hyper-dimensional lattices.",
    seed: 492017,
    palette: {
      primary: "#10b981",   // Quantum Emerald
      secondary: "#06b6d4", // Wavefunction Cyan
      ambient: "#011612",   // Subatomic Void
      accent: "#a7f3d0",    // Coherence White
    },
    metrics: {
      gravitationalConstant: "G = 1.616×10⁻³⁵ m (Planck)",
      relativisticBeta: "β = 0.99 c",
      curvatureTensor: "R_μν = 8.450 m⁻² (Quantized)",
      entropyIndex: "S/k_B = ln(2)^N",
    },
  },
  {
    id: "infinite-hyperspace",
    name: "DIMENSION 05",
    title: "INFINITE HYPERSPACE",
    subtitle: "Tachyon Relativistic Accelerator",
    description: "Superluminal corridor where starlight stretches into infinite chromatic streaks and time dilates towards infinity.",
    seed: 581923,
    palette: {
      primary: "#f43f5e",   // Redshift Crimson
      secondary: "#3b82f6", // Blueshift Cobalt
      ambient: "#050510",   // Hyperspace Void
      accent: "#ffffff",    // Flash Core
    },
    metrics: {
      gravitationalConstant: "G_warp = 14.2×10⁻¹¹",
      relativisticBeta: "β = 4.82 c (Superluminal)",
      curvatureTensor: "R_μν = 12.30 m⁻²",
      entropyIndex: "S/k_B = 0.00 (Frozen Time)",
    },
  },
  {
    id: "planetary-frontier",
    name: "DIMENSION 06",
    title: "PLANETARY FRONTIER",
    subtitle: "Colossal Ringed Gas Giants & Moons",
    description: "Massive Keplerian worlds with razor-sharp particulate rings, auroral curtains, and orbiting crystalline satellites.",
    seed: 673921,
    palette: {
      primary: "#d97706",   // Saturnian Gold
      secondary: "#9a3412", // Terracotta Band
      ambient: "#09090b",   // Deep Shadow
      accent: "#fed7aa",    // Ring Highlight
    },
    metrics: {
      gravitationalConstant: "g_surface = 24.79 m/s²",
      relativisticBeta: "β = 0.04 c",
      curvatureTensor: "R_μν = 0.012 m⁻²",
      entropyIndex: "S/k_B = 3.40×10⁶",
    },
  },
  {
    id: "black-hole-cluster",
    name: "DIMENSION 07",
    title: "BLACK HOLE CLUSTER",
    subtitle: "Binary Singularity Gravitational Matrix",
    description: "Multiple intermediate-mass black holes orbiting each other, producing extreme gravitational wave ripples in spacetime.",
    seed: 765431,
    palette: {
      primary: "#e11d48",   // Hawking Radiation
      secondary: "#d97706", // Collision Lensing
      ambient: "#000000",   // Absolute Abyss
      accent: "#ffffff",    // Photon Boundary
    },
    metrics: {
      gravitationalConstant: "G = 2.450×10⁻¹⁰ N·m²/kg²",
      relativisticBeta: "β = 0.88 c",
      curvatureTensor: "R_μν = 98.40 m⁻² (Extreme)",
      entropyIndex: "S/k_B = A / 4ℓ_P²",
    },
  },
  {
    id: "the-unknown",
    name: "DIMENSION 08",
    title: "THE UNKNOWN",
    subtitle: "Procedural Non-Standard Metric",
    description: "Reality dynamically generated from mathematical chaotic attractors, evolving fractal fields, and emergent dimensional physics.",
    seed: 889911,
    palette: {
      primary: "#a855f7",   // Dimensional Magenta
      secondary: "#06b6d4", // Electric Turquoise
      ambient: "#03071e",   // Deep Continuum
      accent: "#fef08a",    // Singularity Spark
    },
    metrics: {
      gravitationalConstant: "G = ∇×F(x,y,z,t)",
      relativisticBeta: "β = 0.73 c",
      curvatureTensor: "R_μν = Evolving",
      entropyIndex: "S/k_B = Dynamic",
    },
  },
];

/**
 * Builds the visual scene objects for a specific dimension.
 */
export class DimensionSceneBuilder {
  public static buildDimension(dimIndex: number, scene: THREE.Scene): {
    cleanup: () => void;
    animate: (time: number, delta: number) => void;
  } {
    const config = DIMENSIONS[dimIndex % DIMENSIONS.length];
    const group = new THREE.Group();
    scene.add(group);

    const animators: Array<(time: number, delta: number) => void> = [];

    switch (dimIndex % 8) {
      case 0: // Cosmic Origins
        this.buildCosmicOrigins(group, config, animators);
        break;
      case 1: // Nebula Kingdom
        this.buildNebulaKingdom(group, config, animators);
        break;
      case 2: // Galactic Ocean
        this.buildGalacticOcean(group, config, animators);
        break;
      case 3: // Quantum Dimension
        this.buildQuantumDimension(group, config, animators);
        break;
      case 4: // Infinite Hyperspace
        this.buildHyperspace(group, config, animators);
        break;
      case 5: // Planetary Frontier
        this.buildPlanetaryFrontier(group, config, animators);
        break;
      case 6: // Black Hole Cluster
        this.buildBlackHoleCluster(group, config, animators);
        break;
      case 7: // The Unknown
      default:
        this.buildTheUnknown(group, config, animators);
        break;
    }

    return {
      cleanup: () => {
        // Deep disposal
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material?.dispose();
            }
          }
        });
        scene.remove(group);
      },
      animate: (time, delta) => {
        for (const anim of animators) {
          anim(time, delta);
        }
      },
    };
  }

  // --- Dimension 01: Cosmic Origins ---
  private static buildCosmicOrigins(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    const count = 3500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const c1 = new THREE.Color(config.palette.primary);
    const c2 = new THREE.Color(config.palette.secondary);
    const cWhite = new THREE.Color(config.palette.accent);

    for (let i = 0; i < count; i++) {
      // Golden protostellar disc + surrounding sphere
      const theta = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.6) * 120 + 5;
      const y = (Math.random() - 0.5) * (30 / (1 + r * 0.05));

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      const lerpC = Math.random() < 0.2 ? cWhite : (Math.random() < 0.6 ? c1 : c2);
      colors[i * 3] = lerpC.r;
      colors[i * 3 + 1] = lerpC.g;
      colors[i * 3 + 2] = lerpC.b;

      sizes[i] = Math.random() * 2.8 + 0.6;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    parent.add(points);

    // Glowing core star
    const coreGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xfffbeb,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    parent.add(core);

    animators.push((time) => {
      points.rotation.y = time * 0.04;
      const scale = 1 + 0.08 * Math.sin(time * 2.5);
      core.scale.set(scale, scale, scale);
    });
  }

  // --- Dimension 02: Nebula Kingdom ---
  private static buildNebulaKingdom(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    const cloudCount = 18;
    const c1 = new THREE.Color(config.palette.primary);
    const c2 = new THREE.Color(config.palette.secondary);
    const c3 = new THREE.Color(config.palette.accent);

    const clouds: THREE.Mesh[] = [];

    for (let i = 0; i < cloudCount; i++) {
      const geo = new THREE.DodecahedronGeometry(14 + Math.random() * 10, 2);
      const color = i % 3 === 0 ? c1 : (i % 3 === 1 ? c2 : c3);

      const mat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 140
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      parent.add(mesh);
      clouds.push(mesh);
    }

    // Stellar dust field
    const dustCount = 2000;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 200;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0xec4899,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    parent.add(dust);

    animators.push((time) => {
      clouds.forEach((c, idx) => {
        c.rotation.x += 0.002 * (idx % 2 === 0 ? 1 : -1);
        c.rotation.y += 0.003 * (idx % 2 === 0 ? 1 : -1);
      });
      dust.rotation.y = time * 0.015;
    });
  }

  // --- Dimension 03: Galactic Ocean ---
  private static buildGalacticOcean(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    const starCount = 5000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const cArm = new THREE.Color(config.palette.primary);
    const cCore = new THREE.Color(config.palette.accent);
    const cOuter = new THREE.Color(config.palette.secondary);

    const numArms = 2;
    const armCoil = 3.5;

    for (let i = 0; i < starCount; i++) {
      const armIndex = i % numArms;
      const r = Math.pow(Math.random(), 0.5) * 90 + 3;
      const armOffset = (armIndex * 2 * Math.PI) / numArms;
      const angle = armOffset + (r / 90) * armCoil + (Math.random() - 0.5) * 0.45;

      const spread = (Math.random() - 0.5) * (14 / (1 + r * 0.08));

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = spread;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      const col = r < 15 ? cCore : (r < 55 ? cArm : cOuter);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxy = new THREE.Points(geo, mat);
    parent.add(galaxy);

    animators.push((time) => {
      galaxy.rotation.y = time * 0.035;
    });
  }

  // --- Dimension 04: Quantum Dimension ---
  private static buildQuantumDimension(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    const latticeCount = 14;
    const cubes: THREE.LineSegments[] = [];

    const mat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < latticeCount; i++) {
      const size = 6 + i * 4;
      const geo = new THREE.BoxGeometry(size, size, size);
      const wire = new THREE.WireframeGeometry(geo);
      const line = new THREE.LineSegments(wire, mat);
      parent.add(line);
      cubes.push(line);
    }

    animators.push((time) => {
      cubes.forEach((c, idx) => {
        c.rotation.x = time * 0.1 * (idx % 2 === 0 ? 1 : -1) + idx * 0.2;
        c.rotation.y = time * 0.15 * (idx % 2 === 0 ? -1 : 1) + idx * 0.3;
      });
    });
  }

  // --- Dimension 05: Infinite Hyperspace ---
  private static buildHyperspace(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    const streakCount = 1500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(streakCount * 6); // Lines: 2 vertices per line
    const colors = new Float32Array(streakCount * 6);

    const cBlue = new THREE.Color(config.palette.secondary);
    const cRed = new THREE.Color(config.palette.primary);

    for (let i = 0; i < streakCount; i++) {
      const radius = 10 + Math.random() * 60;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 300;
      const streakLength = 20 + Math.random() * 40;

      // Start vertex
      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;

      // End vertex
      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = z - streakLength;

      const c = Math.random() > 0.5 ? cBlue : cRed;
      colors[i * 6] = c.r;
      colors[i * 6 + 1] = c.g;
      colors[i * 6 + 2] = c.b;
      colors[i * 6 + 3] = 1.0;
      colors[i * 6 + 4] = 1.0;
      colors[i * 6 + 5] = 1.0;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(geo, mat);
    parent.add(lines);

    animators.push((_time, delta) => {
      const positions = lines.geometry.attributes.position.array as Float32Array;
      const speed = delta * 450;
      for (let i = 0; i < streakCount; i++) {
        positions[i * 6 + 2] += speed;
        positions[i * 6 + 5] += speed;
        if (positions[i * 6 + 2] > 150) {
          positions[i * 6 + 2] -= 300;
          positions[i * 6 + 5] -= 300;
        }
      }
      lines.geometry.attributes.position.needsUpdate = true;
    });
  }

  // --- Dimension 06: Planetary Frontier ---
  private static buildPlanetaryFrontier(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    // Planet body
    const planetGeo = new THREE.SphereGeometry(18, 48, 48);
    const planetMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      wireframe: false,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(0, 0, -40);
    parent.add(planet);

    // Planetary Ring System
    const ringGeo = new THREE.RingGeometry(24, 42, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfed7aa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(planet.position);
    ring.rotation.x = Math.PI * 0.42;
    ring.rotation.y = Math.PI * 0.15;
    parent.add(ring);

    // Distant orbiting moons
    const moonGeo = new THREE.SphereGeometry(2.5, 24, 24);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    parent.add(moon);

    animators.push((time) => {
      planet.rotation.y = time * 0.05;
      ring.rotation.z = time * 0.02;
      moon.position.set(
        Math.cos(time * 0.4) * 65,
        Math.sin(time * 0.2) * 15,
        -40 + Math.sin(time * 0.4) * 65
      );
    });
  }

  // --- Dimension 07: Black Hole Cluster ---
  private static buildBlackHoleCluster(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    // Binary singularities orbiting each other
    const bh1Geo = new THREE.SphereGeometry(6, 32, 32);
    const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const bh1 = new THREE.Mesh(bh1Geo, bhMat);

    const bh2 = new THREE.Mesh(bh1Geo, bhMat);
    parent.add(bh1);
    parent.add(bh2);

    // Accretion rings around each
    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(8, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0xe11d48, side: THREE.DoubleSide, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
    );
    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(8, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0xd97706, side: THREE.DoubleSide, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending })
    );
    parent.add(ring1);
    parent.add(ring2);

    animators.push((time) => {
      const dist = 32;
      const x1 = Math.cos(time * 0.8) * dist;
      const z1 = Math.sin(time * 0.8) * dist;
      bh1.position.set(x1, 0, z1);
      bh2.position.set(-x1, 0, -z1);

      ring1.position.copy(bh1.position);
      ring2.position.copy(bh2.position);
      ring1.rotation.x = Math.PI * 0.35 + Math.sin(time) * 0.1;
      ring2.rotation.x = -Math.PI * 0.35 + Math.cos(time) * 0.1;
      ring1.rotation.z = time * 2;
      ring2.rotation.z = -time * 2;
    });
  }

  // --- Dimension 08: The Unknown ---
  private static buildTheUnknown(
    parent: THREE.Group,
    config: DimensionConfig,
    animators: Array<(time: number, delta: number) => void>
  ) {
    const geo = new THREE.TorusKnotGeometry(18, 5, 128, 32, 3, 5);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const knot = new THREE.Mesh(geo, mat);
    parent.add(knot);

    // Orbiting particle sphere
    const count = 1800;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 80 + 25;
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 1.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    parent.add(pPoints);

    animators.push((time) => {
      knot.rotation.x = time * 0.2;
      knot.rotation.y = time * 0.3;
      pPoints.rotation.y = -time * 0.1;
    });
  }
}
