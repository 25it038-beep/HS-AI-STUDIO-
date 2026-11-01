/**
 * HS INFINITE — Black Hole Physics & Visualization Engine
 * Renders the Event Horizon, Accretion Disk with Doppler beaming,
 * Photon Sphere, and Infalling Particle Orbits.
 */

import * as THREE from "three";
import {
  AccretionDiskVertexShader,
  AccretionDiskFragmentShader,
  PhotonRingVertexShader,
  PhotonRingFragmentShader,
} from "./shaders/black-hole-shaders";

export class BlackHoleEngine {
  public group: THREE.Group;
  private diskMaterial: THREE.ShaderMaterial;
  private photonMaterial: THREE.ShaderMaterial;
  private particles: THREE.Points;
  private particlePositions: Float32Array;
  private particleRadii: Float32Array;
  private particleAngles: Float32Array;
  private particleSpeeds: Float32Array;
  private particleCount: number = 2200;

  constructor() {
    this.group = new THREE.Group();

    // 1. Central Event Horizon Sphere (Deep black singularity)
    const horizonGeo = new THREE.SphereGeometry(4.8, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      depthTest: true,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    this.group.add(horizonMesh);

    // 2. Photon Ring (Thin relativistic Einstein boundary at ~1.5 Rs)
    const photonGeo = new THREE.SphereGeometry(5.2, 48, 48);
    this.photonMaterial = new THREE.ShaderMaterial({
      vertexShader: PhotonRingVertexShader,
      fragmentShader: PhotonRingFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.8 },
        uGlowColor: { value: new THREE.Color(0xfde68a) }, // Champagne Gold
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const photonMesh = new THREE.Mesh(photonGeo, this.photonMaterial);
    this.group.add(photonMesh);

    // 3. Multi-layer Rotating Accretion Disk
    const diskGeo = new THREE.PlaneGeometry(36, 36, 1, 1);
    this.diskMaterial = new THREE.ShaderMaterial({
      vertexShader: AccretionDiskVertexShader,
      fragmentShader: AccretionDiskFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uInnerRadius: { value: 0.28 },
        uOuterRadius: { value: 0.98 },
        uAcceleration: { value: 0.0 },
        uColorCore: { value: new THREE.Color(0xf59e0b) },   // Champagne Gold
        uColorMid: { value: new THREE.Color(0xf8fafc) },    // Cosmic Silver / Electric White
        uColorOuter: { value: new THREE.Color(0x78350f) },  // Deep Amber / Obsidian Edge
        uCameraPos: { value: new THREE.Vector3() },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const diskMesh = new THREE.Mesh(diskGeo, this.diskMaterial);
    diskMesh.rotation.x = Math.PI * 0.38; // Tilted towards the observer
    this.group.add(diskMesh);

    // 4. Infalling Gas Streams & Dynamic Particle Orbits
    const pGeo = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.particleCount * 3);
    this.particleRadii = new Float32Array(this.particleCount);
    this.particleAngles = new Float32Array(this.particleCount);
    this.particleSpeeds = new Float32Array(this.particleCount);
    const pColors = new Float32Array(this.particleCount * 3);

    const gold = new THREE.Color(0xf59e0b);
    const silver = new THREE.Color(0xe2e8f0);

    for (let i = 0; i < this.particleCount; i++) {
      const radius = 6.0 + Math.pow(Math.random(), 0.7) * 22.0;
      const angle = Math.random() * Math.PI * 2;
      this.particleRadii[i] = radius;
      this.particleAngles[i] = angle;
      this.particleSpeeds[i] = (1.8 / Math.sqrt(radius)) * (0.8 + Math.random() * 0.4);

      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * (1.8 / (1 + radius * 0.1));
      const z = Math.sin(angle) * radius;

      this.particlePositions[i * 3] = x;
      this.particlePositions[i * 3 + 1] = y;
      this.particlePositions[i * 3 + 2] = z;

      const col = Math.random() > 0.4 ? gold : silver;
      pColors[i * 3] = col.r;
      pColors[i * 3 + 1] = col.g;
      pColors[i * 3 + 2] = col.b;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(this.particlePositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(pGeo, pMat);
    this.particles.rotation.x = Math.PI * 0.38;
    this.group.add(this.particles);
  }

  public update(time: number, delta: number, acceleration: number = 0, mouseX: number = 0, mouseY: number = 0) {
    // Update disk uniforms
    this.diskMaterial.uniforms.uTime.value = time;
    this.diskMaterial.uniforms.uAcceleration.value = acceleration;
    this.photonMaterial.uniforms.uTime.value = time;
    this.photonMaterial.uniforms.uIntensity.value = 1.8 + acceleration * 2.5;

    // Interactive cursor gravitational tilt
    const targetRotX = Math.PI * 0.38 + mouseY * 0.18;
    const targetRotY = mouseX * 0.25;
    this.group.rotation.x += (targetRotX - this.group.rotation.x) * 0.08;
    this.group.rotation.y += (targetRotY - this.group.rotation.y) * 0.08;

    // Update infalling particle orbits
    const positions = this.particles.geometry.attributes.position.array as Float32Array;
    const speedMult = 1.0 + acceleration * 3.5;

    for (let i = 0; i < this.particleCount; i++) {
      this.particleAngles[i] += this.particleSpeeds[i] * delta * speedMult;
      // Infall spiral
      this.particleRadii[i] -= 0.35 * delta * speedMult;

      // Reset particles absorbed into the event horizon
      if (this.particleRadii[i] < 5.0) {
        this.particleRadii[i] = 22.0 + Math.random() * 6.0;
        this.particleAngles[i] = Math.random() * Math.PI * 2;
      }

      const r = this.particleRadii[i];
      const a = this.particleAngles[i];
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
  }

  public setAcceleration(amt: number) {
    this.diskMaterial.uniforms.uAcceleration.value = amt;
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
  }
}
