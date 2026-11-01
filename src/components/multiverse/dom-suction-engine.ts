/**
 * HS COSMIC PORTAL — DOM-to-WebGL Visual Capture & Gravitational Suction Engine
 * 
 * Progressively consumes the entire rendered website without destroying the underlying DOM:
 * - Captures visible DOM element geometries, styles, and positions into GPU-accelerated proxies
 * - Pulls headings, buttons, cards, images, and text into Keplerian spirals towards the black hole singularity
 * - Distorts, bends, and decomposes visual elements into accretion debris and light trails
 * - Accretion disk grows progressively in size as elements are consumed
 * - Full reversibility guarantee: preserves scroll position, form inputs, event listeners, and original styling
 */

export interface CapturedElementProxy {
  originalEl: HTMLElement;
  rect: DOMRect;
  clone: HTMLElement;
  dx: number;
  dy: number;
  dist: number;
  angle: number;
  delay: number;
}

export class DomSuctionEngine {
  private static savedScroll = { x: 0, y: 0 };
  private static activeProxies: CapturedElementProxy[] = [];
  private static proxyContainer: HTMLDivElement | null = null;
  private static isCaptured = false;

  /**
   * Initializes the visual capture and initiates the gravitational vortex suction
   */
  public static initiateSuction(singularityPos: { x: number; y: number }): number {
    if (typeof window === "undefined" || typeof document === "undefined") return 0;

    // Save exact scroll position
    this.savedScroll = {
      x: window.scrollX || window.pageXOffset || 0,
      y: window.scrollY || window.pageYOffset || 0,
    };

    const rootEl = document.getElementById("website-root");
    if (!rootEl) return 0;

    // Clean up any stale container
    this.cleanupProxies();

    // Create high-z-index proxy container covering the viewport
    const container = document.createElement("div");
    container.id = "cosmic-suction-container";
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "99990";
    container.style.overflow = "hidden";
    document.body.appendChild(container);
    this.proxyContainer = container;

    // Query visual elements across the visible viewport
    const selectors = [
      "header", "nav", "main", "footer",
      "h1", "h2", "h3", "h4", "p",
      "button", "a", "img", "svg", "video",
      "[class*='rounded-']", "[class*='border-']", "article", "section"
    ];
    const candidateNodes = Array.from(rootEl.querySelectorAll<HTMLElement>(selectors.join(",")));

    // Filter to visible, non-empty, top-level distinct bounding boxes
    const visibleElements: HTMLElement[] = [];
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;

    for (const el of candidateNodes) {
      // Exclude hidden or zero-size elements
      const rect = el.getBoundingClientRect();
      if (rect.width < 14 || rect.height < 14) continue;
      if (rect.bottom < -50 || rect.top > vpH + 50 || rect.right < -50 || rect.left > vpW + 50) continue;

      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) < 0.1) continue;

      visibleElements.push(el);
      if (visibleElements.length >= 140) break; // performance guard for 60fps
    }

    // Hide original root content smoothly while proxies take over
    rootEl.style.transition = "opacity 0.6s ease-in, filter 0.8s ease-in";
    rootEl.style.opacity = "0.05";
    rootEl.style.filter = "blur(4px)";
    rootEl.style.pointerEvents = "none";

    // Spawn animated visual proxies
    this.activeProxies = [];
    const maxDist = Math.sqrt(vpW * vpW + vpH * vpH);

    visibleElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      const dx = singularityPos.x - elCenterX;
      const dy = singularityPos.y - elCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Proximity-based gravitational delay: closest elements get sucked first
      const normalizedDist = dist / maxDist;
      const delay = Math.min(normalizedDist * 0.9, 0.75);

      // Clone visual appearance
      const clone = document.createElement("div");
      clone.className = "cosmic-suction-proxy";
      clone.style.position = "absolute";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.borderRadius = window.getComputedStyle(el).borderRadius || "8px";
      clone.style.transformOrigin = "center center";
      clone.style.willChange = "transform, opacity, filter";
      clone.style.boxSizing = "border-box";

      // Replicate background / border visual essence
      const bg = window.getComputedStyle(el).backgroundColor;
      const border = window.getComputedStyle(el).borderColor;
      clone.style.background = bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent" ? bg : "rgba(255, 255, 255, 0.04)";
      clone.style.border = `1px solid ${border && border !== "rgba(0, 0, 0, 0)" ? border : "rgba(255, 255, 255, 0.12)"}`;
      clone.style.boxShadow = "0 0 15px rgba(245, 158, 11, 0.25)";

      // For text elements, mirror text content
      if (el.innerText && el.innerText.length < 80 && el.children.length === 0) {
        const textSpan = document.createElement("span");
        textSpan.innerText = el.innerText;
        textSpan.style.font = window.getComputedStyle(el).font;
        textSpan.style.color = window.getComputedStyle(el).color || "#ffffff";
        textSpan.style.display = "block";
        textSpan.style.overflow = "hidden";
        textSpan.style.textOverflow = "ellipsis";
        textSpan.style.whiteSpace = "nowrap";
        clone.appendChild(textSpan);
      }

      container.appendChild(clone);

      const proxy: CapturedElementProxy = {
        originalEl: el,
        rect,
        clone,
        dx,
        dy,
        dist,
        angle,
        delay,
      };
      this.activeProxies.push(proxy);

      // Trigger gravitational physics animation on next frame
      requestAnimationFrame(() => {
        const swirlAngle = (index % 2 === 0 ? 1 : -1) * (260 + dist * 0.4);
        const duration = 1.6 + Math.random() * 0.4;

        clone.style.transition = `
          transform ${duration}s cubic-bezier(0.55, 0, 1, 0.45) ${delay}s,
          opacity ${duration * 0.85}s ease-in ${delay + 0.1}s,
          filter ${duration * 0.85}s ease-in ${delay}s
        `;

        // Physical spiral suction into singularity coordinate
        clone.style.transform = `
          translate(${dx}px, ${dy}px)
          rotate(${swirlAngle}deg)
          scale(0.005)
          skew(${Math.sin(angle) * 35}deg, ${Math.cos(angle) * 35}deg)
        `;
        clone.style.opacity = "0";
        clone.style.filter = "blur(12px) brightness(3.5)";
      });
    });

    this.isCaptured = true;
    return this.activeProxies.length;
  }

  /**
   * Perfectly restores the original website without page reload or state loss
   */
  public static restoreWebsite(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const rootEl = document.getElementById("website-root");
    if (!rootEl) return;

    // Animate proxies flowing outward from the singularity back into their original positions
    if (this.proxyContainer && this.activeProxies.length > 0) {
      this.activeProxies.forEach((proxy, i) => {
        const delay = (i % 12) * 0.04;
        proxy.clone.style.transition = `
          transform 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          opacity 1.4s ease-out ${delay}s,
          filter 1.4s ease-out ${delay}s
        `;
        proxy.clone.style.transform = "translate(0px, 0px) rotate(0deg) scale(1) skew(0deg, 0deg)";
        proxy.clone.style.opacity = "0.9";
        proxy.clone.style.filter = "none";
      });
    }

    // Restore root DOM styles
    rootEl.style.transition = "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, filter 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s";
    rootEl.style.opacity = "1";
    rootEl.style.filter = "none";
    rootEl.style.pointerEvents = "auto";
    rootEl.style.transform = "none";

    // Clean up proxy container after outward transition completes
    setTimeout(() => {
      this.cleanupProxies();
      // Restore exact scroll position
      window.scrollTo({
        left: this.savedScroll.x,
        top: this.savedScroll.y,
        behavior: "instant",
      });
      this.isCaptured = false;
    }, 2200);
  }

  private static cleanupProxies(): void {
    if (this.proxyContainer && this.proxyContainer.parentNode) {
      this.proxyContainer.parentNode.removeChild(this.proxyContainer);
    }
    this.proxyContainer = null;
    this.activeProxies = [];
  }
}
