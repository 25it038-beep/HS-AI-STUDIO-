/**
 * HS INFINITE — Wormhole Hyperspace Engine
 * Real-time infinite cylindrical wormhole with rotating dimensional rings,
 * relativistic speed variations, and spacetime ripples.
 */

import * as THREE from "three";
import { WormholeVertexShader, WormholeFragmentShader } from "./shaders/wormhole-shaders";

export class WormholeEngine {
  public group: THREE.Group;
  private tunnelMaterial: THREE.ShaderMaterial;
  private ringsGroup: THREE.Group;
  private streakPoints: THREE.Points;
  private streakCount: number = 1800;

  constructor() {
    this.group = new THREE.Group();

    // 1. Cylindrical Spacetime Tunnel
    const radius = 14;
    const length = 180;
    const tunnelGeo = new THREE.CylinderGeometry(radius, radius, length, 48, 64, true);
    // Rotate so cylinder points along Z axis
    tunnelGeo.rotateX(Math.PI * 0.5);

    this.tunnelMaterial = new THREE.ShaderMaterial({
      vertexShader: WormholeVertexShader,
      fragmentShader: WormholeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 1.5 },
        uDistortion: { value: 0.8 },
        uColorA: { value: new THREE.Color(0xf59e0b) },    // Champagne Gold
        uColorB: { value: new THREE.Color(0x38bdf8) },    // Electric Cyan
        uColorCore: { value: new THREE.Color(0xffffff) }, // Singularity Core
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const tunnelMesh = new THREE.Mesh(tunnelGeo, this.tunnelMaterial);
    this.group.add(tunnelMesh);

    // 2. Rotating Dimensional Energy Rings
    this.ringsGroup = new THREE.Group();
    const ringCount = 12;
    const ringGeo = new THREE.TorusGeometry(radius * 0.96, 0.15, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < ringCount; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -length / 2 + (i / ringCount) * length;
      this.ringsGroup.add(ring);
    }
    this.group.add(this.ringsGroup);

    // 3. Forward Flying Star Streaks
    const sGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(this.streakCount * 3);
    for (let i = 0; i < this.streakCount; i++) {
      const r = Math.random() * (radius - 1.5);
      const theta = Math.random() * Math.PI * 2;
      sPos[i * 3] = Math.cos(theta) * r;
      sPos[i * 3 + 1] = Math.sin(theta) * r;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * length;
    }
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));

    const sMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    this.streakPoints = new THREE.Points(sGeo, sMat);
    this.group.add(this.streakPoints);
  }

  public update(time: number, delta: number, speedMultiplier: number = 1.0) {
    this.tunnelMaterial.uniforms.uTime.value = time;
    this.tunnelMaterial.uniforms.uSpeed.value = 1.8 * speedMultiplier;

    // Move energy rings backward to simulate high forward camera velocity
    const length = 180;
    const ringSpeed = delta * 45 * speedMultiplier;
    this.ringsGroup.children.forEach((ring, idx) => {
      ring.position.z += ringSpeed;
      ring.rotation.z += delta * (idx % 2 === 0 ? 1 : -1) * 0.8;
      if (ring.position.z > length / 2) {
        ring.position.z -= length;
      }
    });

    // Move star streaks
    const streakPos = this.streakPoints.geometry.attributes.position.array as Float32Array;
    const streakSpeed = delta * 120 * speedMultiplier;
    for (let i = 0; i < this.streakCount; i++) {
      streakPos[i * 3 + 2] += streakSpeed;
      if (streakPos[i * 3 + 2] > length / 2) {
        streakPos[i * 3 + 2] -= length;
      }
    }
    this.streakPoints.geometry.attributes.position.needsUpdate = true;
  }

  public setPalette(colorA: string, colorB: string) {
    this.tunnelMaterial.uniforms.uColorA.value.set(colorA);
    this.tunnelMaterial.uniforms.uColorB.value.set(colorB);
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
