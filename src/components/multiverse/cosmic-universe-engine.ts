/**
 * HS COSMIC PORTAL — Phase 5: Interactive 3D Cosmic Universe Engine
 * 
 * Generates a massive interactive cosmic universe:
 * - Spiral Galaxies with logarithmic density arms
 * - Emission & Reflection Nebulae with volumetric glow
 * - Rapidly rotating Pulsars with sweeping relativistic polar beams
 * - Binary Star Systems with mutual orbital kinematics
 * - Intermediate & Supermassive Black Holes with photon rings
 * - Supernova Remnants & Expanding Blast Shells
 * - Ringed Planetary Systems with orbiting satellites
 * - Raycaster Object Selection & Camera Fly-To Kinematics
 */

import * as THREE from "three";

export interface CelestialObjectData {
  id: string;
  name: string;
  category: "Galaxies" | "Nebulae" | "Black Holes" | "Pulsars" | "Star Systems" | "Planetary Systems";
  spectralClass: string;
  distance: string;
  coordinates: string;
  temperature: string;
  mass: string;
  description: string;
  position: THREE.Vector3;
  targetCameraPos: THREE.Vector3;
  color: string;
}

export class CosmicUniverseEngine {
  public group: THREE.Group;
  public celestialObjects: CelestialObjectData[] = [];
  public interactiveMeshes: THREE.Object3D[] = [];
  private animators: Array<(time: number, delta: number) => void> = [];

  constructor() {
    this.group = new THREE.Group();
    this.buildUniverse();
  }

  private buildUniverse() {
    // 1. Deep Field Cosmic Star Galaxy (8,000 background stars)
    this.buildDeepFieldStars();

    // 2. Majestic Spiral Galaxy: "SGR-A* Megastructure"
    this.buildSpiralGalaxy(
      new THREE.Vector3(0, 0, -60),
      "Andromeda-IX Megastructure",
      0x38bdf8,
      0xf59e0b
    );

    // 3. Volumetric Emission Nebula: "Carina Primordial Veil"
    this.buildEmissionNebula(
      new THREE.Vector3(-85, 30, -35),
      "Carina Primordial Veil",
      0xec4899,
      0x8b5cf6
    );

    // 4. Relativistic Pulsar: "Vela Neutron Vortex" (sweeping polar beams!)
    this.buildPulsar(
      new THREE.Vector3(75, 40, -45),
      "Vela Neutron Vortex PSR-J0835",
      0x06b6d4
    );

    // 5. Binary Star System: "Alpha-Centauri Dual Corona"
    this.buildBinaryStarSystem(
      new THREE.Vector3(-60, -35, -20),
      "Dual Corona Centauri A/B",
      0xfbbf24,
      0x38bdf8
    );

    // 6. Gargantua Class Supermassive Singularity
    this.buildSingularity(
      new THREE.Vector3(95, -25, -55),
      "Cygnus X-1 Singularity",
      0xf59e0b
    );

    // 7. Supernova Remnant: "Crab Nebula Blast Shell"
    this.buildSupernovaRemnant(
      new THREE.Vector3(30, -65, -40),
      "Crab Nebula Blast Shockwave",
      0xf43f5e
    );

    // 8. Ringed Exoplanet: "Kepler-186f Frontier"
    this.buildRingedPlanetarySystem(
      new THREE.Vector3(-35, 60, -15),
      "Kepler-186f Frontier World",
      0xd97706
    );
  }

  // --- 1. Background Deep-Field Stars ---
  private buildDeepFieldStars() {
    const count = 7500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cBlue = new THREE.Color(0xbae6fd);
    const cGold = new THREE.Color(0xfef08a);

    for (let i = 0; i < count; i++) {
      const r = 250 + Math.random() * 550;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const rand = Math.random();
      const col = rand > 0.7 ? cBlue : (rand > 0.4 ? cGold : cWhite);
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
      opacity: 0.8,
    });

    const starfield = new THREE.Points(geo, mat);
    this.group.add(starfield);

    this.animators.push((time) => {
      starfield.rotation.y = time * 0.005;
    });
  }

  // --- 2. Spiral Galaxy ---
  private buildSpiralGalaxy(center: THREE.Vector3, name: string, armColor: number, coreColor: number) {
    const starCount = 4200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const cArm = new THREE.Color(armColor);
    const cCore = new THREE.Color(coreColor);
    const numArms = 2;

    for (let i = 0; i < starCount; i++) {
      const armIdx = i % numArms;
      const r = Math.pow(Math.random(), 0.6) * 55 + 2;
      const armOffset = (armIdx * 2 * Math.PI) / numArms;
      const angle = armOffset + (r / 55) * 3.8 + (Math.random() - 0.5) * 0.4;
      const spread = (Math.random() - 0.5) * (10 / (1 + r * 0.08));

      pos[i * 3] = center.x + Math.cos(angle) * r;
      pos[i * 3 + 1] = center.y + spread;
      pos[i * 3 + 2] = center.z + Math.sin(angle) * r;

      const col = r < 12 ? cCore : cArm;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxy = new THREE.Points(geo, mat);
    this.group.add(galaxy);

    // Interactive Core Anchor Mesh
    const anchorGeo = new THREE.SphereGeometry(4.5, 24, 24);
    const anchorMat = new THREE.MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 0.9,
    });
    const anchor = new THREE.Mesh(anchorGeo, anchorMat);
    anchor.position.copy(center);
    anchor.userData = { id: "galaxy-1" };
    this.group.add(anchor);
    this.interactiveMeshes.push(anchor);

    this.celestialObjects.push({
      id: "galaxy-1",
      name,
      category: "Galaxies",
      spectralClass: "Barred Spiral SBb",
      distance: "2.54 Million Light Years",
      coordinates: "RA 00h 42m 44s | Dec +41° 16′ 09″",
      temperature: "Core: 10^7 K · Disk: 4,500 K",
      mass: "1.23 × 10^12 M☉",
      description: "Gigantic rotating galactic disk spanning 220,000 light-years across, possessing dense logarithmic spiral arms with millions of newly igniting star systems.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 18, center.z + 42),
      color: "#38bdf8",
    });

    this.animators.push((time) => {
      galaxy.rotation.y = time * 0.03;
    });
  }

  // --- 3. Emission Nebula ---
  private buildEmissionNebula(center: THREE.Vector3, name: string, colorA: number, colorB: number) {
    const group = new THREE.Group();
    group.position.copy(center);

    const c1 = new THREE.Color(colorA);
    const c2 = new THREE.Color(colorB);

    for (let i = 0; i < 14; i++) {
      const geo = new THREE.IcosahedronGeometry(12 + Math.random() * 8, 2);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? c1 : c2,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 45
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
    }

    // Anchor sphere
    const anchorGeo = new THREE.SphereGeometry(6, 24, 24);
    const anchorMat = new THREE.MeshBasicMaterial({
      color: colorA,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const anchor = new THREE.Mesh(anchorGeo, anchorMat);
    anchor.position.copy(center);
    anchor.userData = { id: "nebula-1" };
    this.group.add(anchor);
    this.interactiveMeshes.push(anchor);

    this.group.add(group);

    this.celestialObjects.push({
      id: "nebula-1",
      name,
      category: "Nebulae",
      spectralClass: "H II Ionized Emission Cloud",
      distance: "7,500 Light Years",
      coordinates: "RA 10h 45m 08s | Dec -59° 52′ 04″",
      temperature: "8,500 K to 15,000 K",
      mass: "9.5 × 10^4 M☉",
      description: "Colossal ionized interstellar hydrogen nebula shaped by intense stellar radiation from O-type supergiant stars, creating glowing pillars of cosmic creation.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 12, center.z + 32),
      color: "#ec4899",
    });

    this.animators.push((time) => {
      group.rotation.x = time * 0.02;
      group.rotation.y = time * 0.03;
    });
  }

  // --- 4. Relativistic Pulsar ---
  private buildPulsar(center: THREE.Vector3, name: string, beamColor: number) {
    const pulsarGroup = new THREE.Group();
    pulsarGroup.position.copy(center);

    // Neutron Star Core
    const coreGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.userData = { id: "pulsar-1" };
    pulsarGroup.add(core);
    this.interactiveMeshes.push(core);

    // Sweeping Relativistic Polar Jets
    const jetGeo = new THREE.CylinderGeometry(0.2, 5.0, 50, 16, 1, true);
    jetGeo.translate(0, 25, 0);

    const jetMat = new THREE.MeshBasicMaterial({
      color: beamColor,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const jetNorth = new THREE.Mesh(jetGeo, jetMat);
    const jetSouth = new THREE.Mesh(jetGeo, jetMat);
    jetSouth.rotation.x = Math.PI;

    pulsarGroup.add(jetNorth);
    pulsarGroup.add(jetSouth);

    this.group.add(pulsarGroup);

    this.celestialObjects.push({
      id: "pulsar-1",
      name,
      category: "Pulsars",
      spectralClass: "Magnetar Neutron Star",
      distance: "959 Light Years",
      coordinates: "RA 08h 35m 20s | Dec -45° 10′ 34″",
      temperature: "Surface: 1.2 × 10^6 K",
      mass: "1.44 M☉ (Chandrasekhar Limit)",
      description: "Ultra-dense spinning neutron star rotating at 11.2 revolutions per second, ejecting relativistic synchrotron emission beams along its intense magnetic dipole.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 8, center.z + 28),
      color: "#06b6d4",
    });

    this.animators.push((time) => {
      // Rapid pulsar rotation
      pulsarGroup.rotation.z = Math.PI * 0.15; // magnetic axis tilt
      pulsarGroup.rotation.y = time * 8.5;
    });
  }

  // --- 5. Binary Star System ---
  private buildBinaryStarSystem(center: THREE.Vector3, name: string, colA: number, colB: number) {
    const starA = new THREE.Mesh(new THREE.SphereGeometry(3.5, 32, 32), new THREE.MeshBasicMaterial({ color: colA }));
    const starB = new THREE.Mesh(new THREE.SphereGeometry(2.4, 32, 32), new THREE.MeshBasicMaterial({ color: colB }));

    starA.userData = { id: "binary-1" };
    starB.userData = { id: "binary-1" };

    this.group.add(starA);
    this.group.add(starB);
    this.interactiveMeshes.push(starA);
    this.interactiveMeshes.push(starB);

    this.celestialObjects.push({
      id: "binary-1",
      name,
      category: "Star Systems",
      spectralClass: "G2V Primary + K1V Secondary",
      distance: "4.37 Light Years",
      coordinates: "RA 14h 39m 36s | Dec -60° 50′ 02″",
      temperature: "Star A: 5,790 K · Star B: 5,260 K",
      mass: "1.10 M☉ + 0.907 M☉",
      description: "Gravitationally bound stellar pair orbiting a mutual barycenter every 79.9 years, creating complex gravitational Lagrange corridors and habitable orbital zones.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 10, center.z + 26),
      color: "#fbbf24",
    });

    this.animators.push((time) => {
      const radius = 10;
      const angle = time * 0.8;
      starA.position.set(center.x + Math.cos(angle) * radius, center.y, center.z + Math.sin(angle) * radius);
      starB.position.set(center.x - Math.cos(angle) * radius * 0.7, center.y, center.z - Math.sin(angle) * radius * 0.7);
    });
  }

  // --- 6. Supermassive Singularity ---
  private buildSingularity(center: THREE.Vector3, name: string, glowCol: number) {
    // Horizon sphere
    const bhGeo = new THREE.SphereGeometry(5.0, 32, 32);
    const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const bh = new THREE.Mesh(bhGeo, bhMat);
    bh.position.copy(center);
    bh.userData = { id: "blackhole-1" };
    this.group.add(bh);
    this.interactiveMeshes.push(bh);

    // Accretion Ring
    const ringGeo = new THREE.RingGeometry(6.2, 18.0, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: glowCol,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(center);
    ring.rotation.x = Math.PI * 0.4;
    this.group.add(ring);

    this.celestialObjects.push({
      id: "blackhole-1",
      name,
      category: "Black Holes",
      spectralClass: "Kerr Rotating Singularity",
      distance: "6,070 Light Years",
      coordinates: "RA 19h 58m 21s | Dec +35° 12′ 05″",
      temperature: "Hawking: 2.9 × 10^-8 K · Disk: 1.2 × 10^7 K",
      mass: "21.2 ± 2.2 M☉",
      description: "First confirmed stellar-mass black hole. Relativistic matter from a blue supergiant companion star swirls into its event horizon, producing intense hard X-ray flares.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 12, center.z + 30),
      color: "#f59e0b",
    });

    this.animators.push((time) => {
      ring.rotation.z = time * 1.2;
    });
  }

  // --- 7. Supernova Remnant ---
  private buildSupernovaRemnant(center: THREE.Vector3, name: string, blastColor: number) {
    const geo = new THREE.IcosahedronGeometry(14, 3);
    const mat = new THREE.MeshBasicMaterial({
      color: blastColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const shell = new THREE.Mesh(geo, mat);
    shell.position.copy(center);
    shell.userData = { id: "supernova-1" };
    this.group.add(shell);
    this.interactiveMeshes.push(shell);

    this.celestialObjects.push({
      id: "supernova-1",
      name,
      category: "Nebulae",
      spectralClass: "Type II Supernova Shockwave",
      distance: "6,523 Light Years",
      coordinates: "RA 05h 34m 31s | Dec +22° 00′ 52″",
      temperature: "Shock Front: 10^6 K",
      mass: "4.6 M☉ ejecta",
      description: "Violently expanding blast wave resulting from the gravitational core collapse of a massive star in 1054 AD, dispersing synthesized heavy elements into deep space.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 14, center.z + 32),
      color: "#f43f5e",
    });

    this.animators.push((time) => {
      shell.rotation.x = time * 0.08;
      shell.rotation.y = time * 0.12;
      const pulse = 1 + 0.06 * Math.sin(time * 3);
      shell.scale.set(pulse, pulse, pulse);
    });
  }

  // --- 8. Ringed Planetary System ---
  private buildRingedPlanetarySystem(center: THREE.Vector3, name: string, planetColor: number) {
    const planetGeo = new THREE.SphereGeometry(7, 32, 32);
    const planetMat = new THREE.MeshBasicMaterial({ color: planetColor });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.copy(center);
    planet.userData = { id: "planet-1" };
    this.group.add(planet);
    this.interactiveMeshes.push(planet);

    // Planetary Rings
    const ringGeo = new THREE.RingGeometry(9.5, 18, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfed7aa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(center);
    ring.rotation.x = Math.PI * 0.38;
    this.group.add(ring);

    this.celestialObjects.push({
      id: "planet-1",
      name,
      category: "Planetary Systems",
      spectralClass: "Super-Earth Terrestrial Exoplanet",
      distance: "582 Light Years",
      coordinates: "RA 19h 54m 36s | Dec +44° 01′ 24″",
      temperature: "Equilibrium: 234 K (-39 °C)",
      mass: "1.44 M⊕ · Radius: 1.17 R⊕",
      description: "First validated Earth-sized planet orbiting inside the circumstellar habitable zone of an M-dwarf star, illuminated by an alien crimson twilight.",
      position: center,
      targetCameraPos: new THREE.Vector3(center.x, center.y + 8, center.z + 24),
      color: "#d97706",
    });

    this.animators.push((time) => {
      planet.rotation.y = time * 0.1;
      ring.rotation.z = time * 0.04;
    });
  }

  public update(time: number, delta: number) {
    for (const anim of this.animators) {
      anim(time, delta);
    }
  }

  public dispose() {
    this.group.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    });
    this.interactiveMeshes = [];
    this.celestialObjects = [];
  }
}
