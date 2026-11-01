/**
 * HS INFINITE — GLSL Shaders for Black Hole Accretion Disk & Gravitational Lensing
 * Color Palette: Obsidian Black × Cosmic Silver × Champagne Gold
 */

export const AccretionDiskVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const AccretionDiskFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uInnerRadius;
  uniform float uOuterRadius;
  uniform float uAcceleration;
  uniform vec3 uColorCore;       // Champagne Gold (#f59e0b)
  uniform vec3 uColorMid;        // Cosmic Silver / Electric White (#e0e7ff)
  uniform vec3 uColorOuter;      // Deep Amber / Obsidian Red (#78350f)
  uniform vec3 uCameraPos;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  // Procedural Simplex Noise 2D
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
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
    // Polar coordinates centered at (0.5, 0.5)
    vec2 center = vUv - vec2(0.5);
    float dist = length(center) * 2.0; // 0 to 1 range across disk

    // Discard outside valid accretion bounds
    if (dist < uInnerRadius || dist > uOuterRadius) {
      discard;
    }

    float angle = atan(center.y, center.x);

    // Keplerian differential rotation: Inner orbits rotate faster than outer orbits
    float speedMultiplier = 1.0 + uAcceleration * 2.5;
    float keplerianSpeed = pow(dist, -1.2) * 0.45 * speedMultiplier;
    float twistedAngle = angle + uTime * keplerianSpeed;

    // Multi-octave turbulence
    vec2 noiseCoord1 = vec2(cos(twistedAngle) * dist * 3.5, sin(twistedAngle) * dist * 3.5);
    vec2 noiseCoord2 = vec2(cos(twistedAngle * 2.0) * dist * 7.0, sin(twistedAngle * 2.0) * dist * 7.0 + uTime * 0.5);

    float n1 = snoise(noiseCoord1) * 0.5 + 0.5;
    float n2 = snoise(noiseCoord2) * 0.5 + 0.5;
    float plasma = mix(n1, n2, 0.4);

    // Relativistic Doppler Beaming:
    // Gas moving towards the observer (left side of disk) is boosted in brightness and blue-shifted;
    // Gas moving away (right side) is dimmed and red-shifted.
    float doppler = sin(angle) * 0.45;
    float beaming = clamp(1.0 + doppler, 0.35, 1.85);

    // Radial intensity profile: Peaks near ISCO (Innermost Stable Circular Orbit)
    float radialFactor = smoothstep(uInnerRadius, uInnerRadius + 0.12, dist) *
                         (1.0 - smoothstep(uOuterRadius - 0.25, uOuterRadius, dist));

    // Temperature color interpolation
    vec3 color = mix(uColorCore, uColorMid, smoothstep(0.3, 0.7, plasma));
    color = mix(color, uColorOuter, smoothstep(uInnerRadius + 0.3, uOuterRadius, dist));

    // Relativistic intensity boost
    color *= beaming * (plasma * 1.6 + 0.4);

    // Gravitational glow density
    float alpha = radialFactor * (0.65 + plasma * 0.35);

    gl_FragColor = vec4(color * 1.4, alpha);
  }
`;

export const PhotonRingVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const PhotonRingFragmentShader = /* glsl */ `
  uniform vec3 uGlowColor;     // Champagne Gold / Light Cyan
  uniform float uIntensity;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // High exponent Fresnel for razor-sharp photon ring
    float fresnel = 1.0 - abs(dot(viewDir, normal));
    float ring = pow(fresnel, 5.0) * uIntensity;

    // Subtle relativistic shimmer
    float shimmer = 0.9 + 0.1 * sin(uTime * 4.0 + normal.y * 12.0);

    vec3 finalColor = uGlowColor * ring * shimmer;
    gl_FragColor = vec4(finalColor, clamp(ring, 0.0, 1.0));
  }
`;

export const LensingBackgroundVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const LensingBackgroundFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uBlackHolePos; // Screen coordinates of singularity (0.0 to 1.0)
  uniform float uEinsteinRadius;
  uniform float uAbsorption;

  varying vec2 vUv;

  // Star generator
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv;
    vec2 delta = (uv - uBlackHolePos) * aspect;
    float r = length(delta);

    // Einstein Ring Gravitational Deflection
    // Light rays bend around the event horizon: theta_new = theta - r_E^2 / theta
    vec2 offset = vec2(0.0);
    if (r > 0.001) {
      float deflection = (uEinsteinRadius * uEinsteinRadius) / (r + 0.02);
      offset = -normalize(delta) * deflection / aspect;
    }

    vec2 distortedUv = uv + offset;

    // Deep cosmic space background with gravitationally distorted stars
    vec2 starGrid = floor(distortedUv * 180.0);
    float starRand = hash(starGrid);
    float star = 0.0;
    if (starRand > 0.985) {
      vec2 starPos = fract(distortedUv * 180.0) - vec2(0.5);
      float starDist = length(starPos);
      star = smoothstep(0.18, 0.0, starDist) * (0.4 + 0.6 * sin(uTime * 2.0 + starRand * 20.0));
    }

    // Black Hole Shadow / Event Horizon absorption
    float shadow = smoothstep(uEinsteinRadius * 0.42, uEinsteinRadius * 0.48, r);
    vec3 spaceColor = vec3(0.005, 0.007, 0.012) + vec3(star * 0.95);

    // Einstein Ring subtle luminous edge
    float ringGlow = exp(-pow((r - uEinsteinRadius * 0.6) * 14.0, 2.0)) * 0.35;
    vec3 ringColor = vec3(0.95, 0.82, 0.6) * ringGlow;

    gl_FragColor = vec4((spaceColor + ringColor) * shadow, 1.0);
  }
`;
