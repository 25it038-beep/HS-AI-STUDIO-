/**
 * HS INFINITE — GLSL Shaders for Multidimensional Wormhole Engine
 * Provides cylindrical depth, spacetime warping, chromatic aberration,
 * and relativistic light streaks.
 */

export const WormholeVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const WormholeFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDistortion;
  uniform vec3 uColorA; // Champagne Gold / Amber (#f59e0b)
  uniform vec3 uColorB; // Deep Cyan / Electric Silver (#38bdf8)
  uniform vec3 uColorCore;

  varying vec2 vUv;
  varying vec3 vPosition;

  // Simplex 2D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Cylindrical coordinates: vUv.x is around circumference, vUv.y is down length of tunnel
    float angle = vUv.x * 6.2831853;
    float depth = vUv.y;

    // Relativistic forward velocity
    float zTravel = depth * 8.0 - uTime * uSpeed;

    // Twisting spacetime rotation
    float twist = sin(depth * 3.0 + uTime * 1.5) * uDistortion;
    float twistedAngle = angle + twist;

    // Dimensional Energy Ribs
    float ribs = sin(zTravel * 12.0) * 0.5 + 0.5;
    ribs = pow(ribs, 4.0);

    // Longitudinal light streaks
    float streaks = sin(twistedAngle * 18.0 + snoise(vec2(twistedAngle * 4.0, zTravel * 2.0)) * 2.0) * 0.5 + 0.5;
    streaks = pow(streaks, 6.0);

    // Volumetric plasma noise along the cylinder wall
    float noiseVal = snoise(vec2(twistedAngle * 2.0, zTravel * 0.8)) * 0.5 + 0.5;

    // Chromatic aberration simulation (channel offsets along velocity vector)
    float redChannel   = ribs * 1.2 + streaks * 0.8 + noiseVal * 0.5;
    float greenChannel = (sin((zTravel + 0.08) * 12.0) * 0.5 + 0.5) * ribs + streaks * 0.6 + noiseVal * 0.4;
    float blueChannel  = (sin((zTravel + 0.16) * 12.0) * 0.5 + 0.5) * ribs + streaks * 1.1 + noiseVal * 0.6;

    // Palette blending: Champagne Gold to Cosmic Cyan
    vec3 baseColor = mix(uColorA, uColorB, noiseVal);
    vec3 color = vec3(
      baseColor.r * redChannel,
      baseColor.g * greenChannel,
      baseColor.b * blueChannel
    );

    // Core light glow at center of singularity tunnel
    color += uColorCore * pow(depth, 3.0) * 0.6;

    // Depth fog: Fade out far away for realistic infinite horizon
    float fog = smoothstep(0.0, 0.25, depth) * (1.0 - smoothstep(0.85, 1.0, depth));

    gl_FragColor = vec4(color * 1.5, fog * 0.85);
  }
`;
