/**
 * HS COSMIC CONSUMPTION — Physical Gravitational Absorption Engine
 * 
 * Rebuilt from the ground up:
 * - Inspects actual rendered HS AI Studio DOM.
 * - Independently captures every visible image, video, button, navigation item,
 *   logo, project card, heading, text line, icon, SVG, background, and footer.
 * - Deep visual cloning preserving dimensions, styles, inner content, and aspect ratios.
 * - Real physics simulation: Keplerian logarithmic spiral orbits, 3D detachment,
 *   relativistic Doppler stretching, tidal deformation, event horizon crossing.
 * - Synchronized black hole mass growth: each absorbed element adds to singularity mass.
 * - Strict completion tracking: WORMHOLE NEVER STARTS until remainingCount === 0!
 * - 100% reversible: restores original DOM, scroll position, and full interactivity.
 */

export interface DiagnosticStats {
  totalDetected: number;
  capturedCount: number;
  failedCount: number;
  absorbedCount: number;
  remainingCount: number;
  absorptionPercentage: number;
  currentStage: number;
  currentStageName: string;
  singularityMassSolar: number;
}

export interface GravitationalEntity {
  id: string;
  category: "nav" | "button" | "icon" | "image" | "video" | "card" | "text" | "background" | "footer";
  stage: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  originalEl: HTMLElement;
  cloneEl: HTMLElement;
  // Spatial initial coordinates
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  width: number;
  height: number;
  // Orbital Physics
  distanceToSingularity: number;
  initialRadius: number;
  currentRadius: number;
  initialAngle: number;
  currentAngle: number;
  angularVelocity: number;
  spinDirection: number; // 1 or -1
  // Kinematic parameters
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  opacity: number;
  skewX: number;
  skewY: number;
  zDepth: number;
  // State
  stageStartTime: number;
  isDetached: boolean;
  absorbed: boolean;
}

export type SuctionProgressCallback = (stats: DiagnosticStats) => void;
export type SuctionCompleteCallback = (stats: DiagnosticStats) => void;

export class DomSuctionEngine {
  private static savedScroll = { x: 0, y: 0 };
  private static entities: GravitationalEntity[] = [];
  private static overlayContainer: HTMLDivElement | null = null;
  private static hiddenOriginals: HTMLElement[] = [];
  private static animFrameId: number | null = null;

  // Singularity physics parameters
  private static singularityPos = { x: 0, y: 0 };
  private static targetSingularityPos = { x: 0, y: 0 };
  private static eventHorizonRadius = 45; // Base radius in screen pixels
  private static maxEventHorizonRadius = 140;

  // Diagnostic tracking
  private static stats: DiagnosticStats = {
    totalDetected: 0,
    capturedCount: 0,
    failedCount: 0,
    absorbedCount: 0,
    remainingCount: 0,
    absorptionPercentage: 0,
    currentStage: 1,
    currentStageName: "STAGE 1 · NAVIGATION & NEARBY MASS",
    singularityMassSolar: 10,
  };

  private static onProgressCb: SuctionProgressCallback | null = null;
  private static onCompleteCb: SuctionCompleteCallback | null = null;
  private static simulationStartTime = 0;
  private static isRunning = false;

  public static getStats(): DiagnosticStats {
    return { ...this.stats };
  }

  public static getEventHorizonRadius(): number {
    return this.eventHorizonRadius;
  }

  public static getSingularityPosition(): { x: number; y: number } {
    return { ...this.singularityPos };
  }

  /**
   * Initializes genuine element-by-element gravitational suction
   */
  public static initiateSuction(
    origin: { x: number; y: number },
    onProgress?: SuctionProgressCallback,
    onComplete?: SuctionCompleteCallback
  ): DiagnosticStats {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return this.stats;
    }

    this.cleanup();
    this.isRunning = true;
    this.onProgressCb = onProgress || null;
    this.onCompleteCb = onComplete || null;

    // Save scroll position for lossless restore
    this.savedScroll = {
      x: window.scrollX || window.pageXOffset || 0,
      y: window.scrollY || window.pageYOffset || 0,
    };

    const rootEl = document.getElementById("website-root");
    if (!rootEl) {
      console.error("[DomSuctionEngine] #website-root not found.");
      return this.stats;
    }

    // Set singularity initial position (starts at widget, drifts toward center)
    this.singularityPos = { x: origin.x, y: origin.y };
    this.targetSingularityPos = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
    };
    this.eventHorizonRadius = 42;

    // Lock page scrolling while preserving visual scroll layout
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";

    // 1. Create transparent animation layer
    const overlay = document.createElement("div");
    overlay.id = "cosmic-consumption-overlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "99990"; // Floats directly over website, under black hole
    overlay.style.overflow = "hidden";
    overlay.style.perspective = "1400px";
    overlay.style.perspectiveOrigin = `${this.singularityPos.x}px ${this.singularityPos.y}px`;
    document.body.appendChild(overlay);
    this.overlayContainer = overlay;

    // 2. Scan and independently capture all visible DOM elements
    this.captureElements(rootEl);

    console.log(
      `%c[HS COSMIC CONSUMPTION] Gravitational Singularity Activated`,
      "background: #000; color: #f59e0b; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
    );
    console.table({
      "Total Detected": this.stats.totalDetected,
      "Successfully Captured": this.stats.capturedCount,
      "Failed Captures": this.stats.failedCount,
      "Singularity Initial X": Math.round(this.singularityPos.x),
      "Singularity Initial Y": Math.round(this.singularityPos.y),
    });

    // 3. Start high-frequency physics simulation loop
    this.simulationStartTime = performance.now();
    this.animFrameId = requestAnimationFrame(this.physicsStep.bind(this));

    return this.stats;
  }

  /**
   * Scans the rendered DOM and captures individual elements into independent physics entities
   */
  private static captureElements(rootEl: HTMLElement): void {
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;

    // Selectors targeting every key component of the studio
    const targetSelectors = [
      "header", "nav", "nav a", "nav button",
      "h1", "h2", "h3", "h4",
      "p", "span.font-mono", "span.font-display",
      "button", "a.group", "a[role='button']",
      "img", "video", "canvas",
      "svg",
      "article", "[class*='card']", "[class*='rounded-2xl']", "[class*='rounded-3xl']",
      "footer", "footer a"
    ];

    const rawNodes = Array.from(rootEl.querySelectorAll<HTMLElement>(targetSelectors.join(",")));
    this.stats.totalDetected = rawNodes.length;
    this.entities = [];
    this.hiddenOriginals = [];

    let captured = 0;
    let failed = 0;

    const seenElements = new Set<HTMLElement>();

    for (const el of rawNodes) {
      // Avoid capturing overlay or widget itself
      if (
        el.closest("#cosmic-consumption-overlay") ||
        el.closest("[data-multiverse-widget]") ||
        el.closest("[data-multiverse-hud]") ||
        seenElements.has(el)
      ) {
        continue;
      }

      const rect = el.getBoundingClientRect();

      // Only capture elements with non-zero dimensions that are currently inside viewport
      if (rect.width < 14 || rect.height < 14) continue;
      if (rect.bottom < -20 || rect.top > vpH + 20 || rect.right < -20 || rect.left > vpW + 20) {
        continue;
      }

      const compStyle = window.getComputedStyle(el);
      if (
        compStyle.display === "none" ||
        compStyle.visibility === "hidden" ||
        parseFloat(compStyle.opacity) < 0.05
      ) {
        continue;
      }

      // Avoid capturing a huge parent container if we are already capturing its discrete children,
      // EXCEPT when it is a self-contained card or navigation block.
      const isCard =
        el.tagName.toLowerCase() === "article" ||
        (el.className && typeof el.className === "string" && (el.className.includes("card") || el.className.includes("rounded-2xl") || el.className.includes("rounded-3xl")));

      if (rect.width > vpW * 0.95 && rect.height > vpH * 0.95 && !isCard) {
        continue;
      }

      seenElements.add(el);

      try {
        const entity = this.createEntityClone(el, rect, compStyle);
        if (entity) {
          this.entities.push(entity);
          captured++;
        } else {
          failed++;
        }
      } catch (err) {
        console.warn("[DomSuctionEngine] Failed to capture element:", el, err);
        failed++;
      }

      if (this.entities.length >= 180) break; // Keep high FPS across all hardware
    }

    this.stats.capturedCount = captured;
    this.stats.failedCount = failed;
    this.stats.remainingCount = captured;
    this.stats.absorbedCount = 0;
    this.stats.absorptionPercentage = 0;
  }

  /**
   * Creates an independent visual clone preserving visual content and computes orbital parameters
   */
  private static createEntityClone(
    el: HTMLElement,
    rect: DOMRect,
    compStyle: CSSStyleDeclaration
  ): GravitationalEntity | null {
    if (!this.overlayContainer) return null;

    const tag = el.tagName.toLowerCase();
    let category: GravitationalEntity["category"] = "nav";
    let stage: GravitationalEntity["stage"] = 2;

    const elCenterX = rect.left + rect.width * 0.5;
    const elCenterY = rect.top + rect.height * 0.5;

    const dx = elCenterX - this.singularityPos.x;
    const dy = elCenterY - this.singularityPos.y;
    const initialRadius = Math.hypot(dx, dy);
    const initialAngle = Math.atan2(dy, dx);

    // Stage Classification (Strict Sequential Stages 1-7)
    if (el.closest("nav") || el.closest("header") || initialRadius < 260) {
      category = "nav";
      stage = 1; // Stage 1: Navigation and nearby elements
    } else if (tag === "button" || tag === "a" || el.getAttribute("role") === "button") {
      category = "button";
      stage = 2; // Stage 2: Buttons and interactive components
    } else if (tag === "svg" || tag === "path") {
      category = "icon";
      stage = 2; // Stage 2: Icons
    } else if (tag === "img") {
      category = "image";
      stage = 3; // Stage 3: Images
    } else if (tag === "video") {
      category = "video";
      stage = 3; // Stage 3: Videos
    } else if (el.tagName.toLowerCase() === "article" || (el.className && typeof el.className === "string" && (el.className.includes("card") || el.className.includes("rounded")))) {
      category = "card";
      stage = 4; // Stage 4: Project cards & content blocks
    } else if (tag.startsWith("h") || tag === "p") {
      category = "text";
      stage = 5; // Stage 5: Headings and text
    } else if (el.closest("footer")) {
      category = "footer";
      stage = 7; // Stage 7: Footer
    } else {
      category = "background";
      stage = 6; // Stage 6: Backgrounds and decorative layers
    }

    // Clone element container
    const clone = document.createElement("div");
    clone.className = "cosmic-physical-clone";
    clone.style.position = "absolute";
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.boxSizing = "border-box";
    clone.style.pointerEvents = "none";
    clone.style.overflow = "hidden";
    clone.style.borderRadius = compStyle.borderRadius || "8px";
    clone.style.transformOrigin = "center center";
    clone.style.willChange = "transform, opacity, filter";

    // 1. Image Clone
    if (tag === "img" && el instanceof HTMLImageElement) {
      const img = document.createElement("img");
      img.src = el.src;
      img.alt = el.alt || "";
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = compStyle.objectFit || "cover";
      img.style.borderRadius = compStyle.borderRadius || "8px";
      clone.appendChild(img);
    }
    // 2. Video Clone (preserve current frame / poster)
    else if (tag === "video" && el instanceof HTMLVideoElement) {
      const vid = document.createElement("video");
      vid.src = el.currentSrc || el.src;
      vid.poster = el.poster || "";
      vid.currentTime = el.currentTime || 0;
      vid.muted = true;
      vid.autoplay = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.style.width = "100%";
      vid.style.height = "100%";
      vid.style.objectFit = compStyle.objectFit || "cover";
      clone.appendChild(vid);
    }
    // 3. Buttons & Interactive links
    else if (category === "button") {
      clone.style.backgroundColor =
        compStyle.backgroundColor !== "rgba(0, 0, 0, 0)"
          ? compStyle.backgroundColor
          : "rgba(255, 255, 255, 0.08)";
      clone.style.border = `${compStyle.borderWidth || "1px"} ${compStyle.borderStyle || "solid"} ${compStyle.borderColor || "rgba(245, 158, 11, 0.4)"}`;
      clone.style.boxShadow = compStyle.boxShadow !== "none" ? compStyle.boxShadow : "0 0 16px rgba(245, 158, 11, 0.3)";
      clone.style.color = compStyle.color;
      clone.style.display = compStyle.display === "inline" ? "inline-flex" : compStyle.display;
      clone.style.alignItems = "center";
      clone.style.justifyContent = "center";
      clone.style.font = compStyle.font;
      clone.innerHTML = el.innerHTML;
    }
    // 4. Project Cards & Feature Cards
    else if (category === "card") {
      clone.style.backgroundColor =
        compStyle.backgroundColor !== "rgba(0, 0, 0, 0)" && compStyle.backgroundColor !== "transparent"
          ? compStyle.backgroundColor
          : "rgba(10, 10, 18, 0.88)";
      clone.style.border = `1px solid ${compStyle.borderColor && compStyle.borderColor !== "rgba(0, 0, 0, 0)" ? compStyle.borderColor : "rgba(255, 255, 255, 0.15)"}`;
      clone.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.85)";
      clone.style.backdropFilter = "blur(12px)";
      // Preserve inner HTML structure for full recognizable card appearance
      clone.innerHTML = el.innerHTML;
    }
    // 5. Typography Headings & Paragraphs
    else if (category === "text") {
      clone.style.color = compStyle.color || "#ffffff";
      clone.style.font = compStyle.font;
      clone.style.fontSize = compStyle.fontSize;
      clone.style.fontWeight = compStyle.fontWeight;
      clone.style.lineHeight = compStyle.lineHeight;
      clone.style.letterSpacing = compStyle.letterSpacing;
      clone.innerText = el.innerText;
    }
    // 6. Generic SVGs, Backgrounds, Footers
    else {
      clone.style.backgroundColor =
        compStyle.backgroundColor !== "rgba(0, 0, 0, 0)" ? compStyle.backgroundColor : "transparent";
      clone.innerHTML = el.innerHTML;
    }

    this.overlayContainer.appendChild(clone);

    // Hide original element in DOM so it visibly detaches
    el.style.visibility = "hidden";
    this.hiddenOriginals.push(el);

    // Compute Keplerian orbital velocities
    const spinDirection = (rect.left + rect.top) % 2 === 0 ? 1 : -1;
    // Keplerian angular velocity inversely proportional to square root of radius
    const baseAngularVel = (0.7 + Math.random() * 0.4) * (spinDirection);

    return {
      id: `grav-entity-${Math.random().toString(36).slice(2, 9)}`,
      category,
      stage,
      originalEl: el,
      cloneEl: clone,
      startX: rect.left,
      startY: rect.top,
      currentX: rect.left,
      currentY: rect.top,
      width: rect.width,
      height: rect.height,
      distanceToSingularity: initialRadius,
      initialRadius: Math.max(initialRadius, 60),
      currentRadius: initialRadius,
      initialAngle,
      currentAngle: initialAngle,
      angularVelocity: baseAngularVel,
      spinDirection,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      opacity: 1,
      skewX: 0,
      skewY: 0,
      zDepth: 0,
      stageStartTime: 0,
      isDetached: false,
      absorbed: false,
    };
  }

  /**
   * Physics step driven by requestAnimationFrame
   */
  private static physicsStep(timestamp: number): void {
    if (!this.isRunning) return;

    const elapsedSeconds = (timestamp - this.simulationStartTime) / 1000;

    // Singularity center gradually migrates towards viewport center as gravity deepens
    const centerT = Math.min(elapsedSeconds / 6.0, 1.0);
    this.singularityPos.x += (this.targetSingularityPos.x - this.singularityPos.x) * 0.02 * centerT;
    this.singularityPos.y += (this.targetSingularityPos.y - this.singularityPos.y) * 0.02 * centerT;

    // Update perspective origin to match moving singularity
    if (this.overlayContainer) {
      this.overlayContainer.style.perspectiveOrigin = `${this.singularityPos.x}px ${this.singularityPos.y}px`;
    }

    // Stage Timings (Strict Sequential Stages 1-7)
    // Stage 1: t >= 0.4s (Nav & nearby)
    // Stage 2: t >= 1.6s (Buttons & icons)
    // Stage 3: t >= 3.0s (Images & videos)
    // Stage 4: t >= 4.4s (Project cards)
    // Stage 5: t >= 5.8s (Headings & text)
    // Stage 6: t >= 7.0s (Backgrounds & gradients)
    // Stage 7: t >= 8.2s (Footer & final content)
    let activeStage = 1;
    let activeStageName = "STAGE 1 · NAVIGATION & NEARBY MASS";

    if (elapsedSeconds >= 8.2) {
      activeStage = 7;
      activeStageName = "STAGE 7 · FINAL SYSTEM ABSORPTION";
    } else if (elapsedSeconds >= 7.0) {
      activeStage = 6;
      activeStageName = "STAGE 6 · BACKGROUND & DECORATIVE COLLAPSE";
    } else if (elapsedSeconds >= 5.8) {
      activeStage = 5;
      activeStageName = "STAGE 5 · TYPOGRAPHY & TEXT FRAGMENTATION";
    } else if (elapsedSeconds >= 4.4) {
      activeStage = 4;
      activeStageName = "STAGE 4 · PROJECT CARDS & SECTIONS";
    } else if (elapsedSeconds >= 3.0) {
      activeStage = 3;
      activeStageName = "STAGE 3 · IMAGES & VIDEO PREVIEWS";
    } else if (elapsedSeconds >= 1.6) {
      activeStage = 2;
      activeStageName = "STAGE 2 · BUTTONS, ICONS & CONTROLS";
    }

    this.stats.currentStage = activeStage;
    this.stats.currentStageName = activeStageName;

    // Process each entity
    let unabsorbedCount = 0;

    for (const entity of this.entities) {
      if (entity.absorbed) continue;

      // Has this entity's stage arrived?
      const stageDelay = this.getStageTriggerTime(entity.stage);

      if (elapsedSeconds < stageDelay) {
        // Subtle tidal pre-detachment trembling as gravity approaches
        const proximityToStage = Math.max(0, 1 - (stageDelay - elapsedSeconds) / 1.0);
        if (proximityToStage > 0) {
          const jitter = Math.sin(timestamp * 0.05 + entity.initialRadius) * (proximityToStage * 1.5);
          entity.cloneEl.style.transform = `translate3d(${jitter}px, ${jitter * 0.5}px, 0px)`;
        }
        unabsorbedCount++;
        continue;
      }

      // Record when entity detached
      if (!entity.isDetached) {
        entity.isDetached = true;
        entity.stageStartTime = timestamp;
      }

      const entityAge = (timestamp - entity.stageStartTime) / 1000;

      // ── Physical Infall & Keplerian Logarithmic Spiral ──────────────────────
      // Angular velocity accelerates as radius decreases (Kepler's 2nd Law)
      const currentRadiusNormalized = Math.max(0.01, entity.currentRadius / entity.initialRadius);
      const speedMultiplier = 1.0 + (1.0 / Math.sqrt(currentRadiusNormalized)) * 1.2;
      entity.currentAngle += entity.angularVelocity * 0.018 * speedMultiplier;

      // Radial infall towards singularity
      // Accelerating exponential collapse: dr/dt increases over time
      const infallRate = 120 + Math.pow(entityAge, 2.2) * 95;
      entity.currentRadius = Math.max(0, entity.currentRadius - infallRate * 0.016);

      // Cartesian coordinates on screen
      const targetScreenX = this.singularityPos.x + Math.cos(entity.currentAngle) * entity.currentRadius;
      const targetScreenY = this.singularityPos.y + Math.sin(entity.currentAngle) * entity.currentRadius;

      const deltaX = targetScreenX - entity.startX;
      const deltaY = targetScreenY - entity.startY;

      // 3D Detachment: lifts off the page into 3D space (+Z towards viewer then plunging in -Z)
      if (entityAge < 0.8) {
        entity.zDepth = (entityAge / 0.8) * 85; // Lift off
      } else {
        entity.zDepth = 85 - (entityAge - 0.8) * 110; // Plunge inward
      }

      // 3D Rotation along spiral trajectory
      if (entity.category === "card") {
        entity.rotationX += entity.spinDirection * 1.6;
        entity.rotationY += 2.2;
        entity.rotationZ += entity.spinDirection * 2.8;
      } else if (entity.category === "button" || entity.category === "icon") {
        entity.rotationZ += entity.spinDirection * 4.5;
        entity.rotationX += 1.8;
      } else if (entity.category === "image" || entity.category === "video") {
        entity.rotationZ += entity.spinDirection * 2.0;
        // Relativistic skewing along the tangent of the spiral
        entity.skewX = Math.sin(entity.currentAngle) * 35 * (1 - currentRadiusNormalized);
        entity.skewY = Math.cos(entity.currentAngle) * 35 * (1 - currentRadiusNormalized);
      } else {
        // Text and typography: stretches into glowing tidal filament
        entity.rotationZ += entity.spinDirection * 3.0;
        entity.skewX = Math.sin(entity.currentAngle) * 25;
      }

      // Scale compression as it nears event horizon
      entity.scale = Math.max(0.02, Math.pow(currentRadiusNormalized, 0.85));

      // ── Event Horizon Crossing Check ───────────────────────────────────────
      const distFromSingularity = Math.hypot(targetScreenX - this.singularityPos.x, targetScreenY - this.singularityPos.y);

      if (distFromSingularity <= this.eventHorizonRadius + 14 || entity.currentRadius <= this.eventHorizonRadius + 14) {
        // Crossed the Event Horizon!
        entity.absorbed = true;
        entity.cloneEl.style.opacity = "0";
        entity.cloneEl.style.filter = "brightness(3.5) blur(6px)";
        setTimeout(() => {
          if (entity.cloneEl.parentNode) {
            entity.cloneEl.parentNode.removeChild(entity.cloneEl);
          }
        }, 120);

        this.stats.absorbedCount++;
        this.stats.remainingCount = Math.max(0, this.stats.remainingCount - 1);
        this.stats.absorptionPercentage = Math.round(
          (this.stats.absorbedCount / Math.max(1, this.stats.capturedCount)) * 100
        );

        // Black Hole Growth: each absorbed element adds to solar mass & event horizon radius!
        this.stats.singularityMassSolar += 1.25;
        this.eventHorizonRadius = Math.min(
          this.maxEventHorizonRadius,
          42 + (this.stats.absorbedCount / Math.max(1, this.stats.capturedCount)) * 85
        );
      } else {
        // Apply 3D CSS transform to clone
        entity.cloneEl.style.transform = `
          translate3d(${deltaX}px, ${deltaY}px, ${entity.zDepth}px)
          rotateX(${entity.rotationX}deg)
          rotateY(${entity.rotationY}deg)
          rotateZ(${entity.rotationZ}deg)
          skew(${entity.skewX}deg, ${entity.skewY}deg)
          scale(${entity.scale})
        `;

        // Doppler brightening near accretion disk
        if (currentRadiusNormalized < 0.35) {
          entity.cloneEl.style.filter = `brightness(${1.4 + (1 - currentRadiusNormalized) * 2.0}) drop-shadow(0 0 12px #f59e0b)`;
        }

        unabsorbedCount++;
      }
    }

    // Notify progress callback
    if (this.onProgressCb) {
      this.onProgressCb({ ...this.stats });
    }

    // ── STRICT COMPLETION CHECK ──────────────────────────────────────────────
    // The wormhole MUST NOT start while even one website element remains unconsumed!
    if (unabsorbedCount === 0 && this.stats.capturedCount > 0) {
      this.isRunning = false;
      this.stats.absorptionPercentage = 100;
      this.stats.remainingCount = 0;

      console.log(
        `%c[HS COSMIC CONSUMPTION] Complete Website Absorption Achieved! All ${this.stats.capturedCount} elements consumed into singularity.`,
        "background: #000; color: #38bdf8; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
      );

      if (this.onCompleteCb) {
        this.onCompleteCb({ ...this.stats });
      }
      return;
    }

    this.animFrameId = requestAnimationFrame(this.physicsStep.bind(this));
  }

  private static getStageTriggerTime(stage: GravitationalEntity["stage"]): number {
    switch (stage) {
      case 1: return 0.4;  // Nav & nearby
      case 2: return 1.6;  // Buttons & icons
      case 3: return 3.0;  // Images & videos
      case 4: return 4.4;  // Project cards
      case 5: return 5.8;  // Headings & text
      case 6: return 7.0;  // Backgrounds & gradients
      case 7: return 8.2;  // Footer & remaining
      default: return 0.5;
    }
  }

  /**
   * Reconstructs the website and restores all original elements, scroll position, and interactions
   */
  public static restoreWebsite(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    this.cleanup();

    const rootEl = document.getElementById("website-root");
    if (rootEl) {
      rootEl.style.transition = "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s cubic-bezier(0.16, 1, 0.3, 1)";
      rootEl.style.opacity = "1";
      rootEl.style.filter = "none";
      rootEl.style.pointerEvents = "auto";
    }

    // Unhide all original elements
    this.hiddenOriginals.forEach((el) => {
      try {
        el.style.visibility = "";
      } catch {
        // ignore
      }
    });
    this.hiddenOriginals = [];

    // Re-enable page scrolling
    document.body.style.overflow = "";
    document.body.style.userSelect = "";

    // Restore exact scroll position
    window.scrollTo({
      left: this.savedScroll.x,
      top: this.savedScroll.y,
      behavior: "instant",
    });

    console.log(
      `%c[HS COSMIC CONSUMPTION] Website Reconstructed & Restored 100%`,
      "background: #000; color: #10b981; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
    );
  }

  public static cleanup(): void {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.overlayContainer && this.overlayContainer.parentNode) {
      this.overlayContainer.parentNode.removeChild(this.overlayContainer);
    }
    this.overlayContainer = null;
    this.entities = [];
  }
}
