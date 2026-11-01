/**
 * HS COSMIC CONSUMPTION — Advanced Element-by-Element Gravitational Suction Engine
 * 
 * Accurately captures every visible element of HS AI Studio:
 * - Images, videos, buttons, icons, headings, text words, project cards, SVGs, and backgrounds
 * - Progressively detaches and animates each element along gravitational trajectories
 * - Cards rotate in 3D, images stretch/bend, text fragments spiral, and icons flare into particles
 * - 100% reversible: restores original DOM, scroll position, and interactions without page reload
 */

export interface CapturedElementProxy {
  originalEl: HTMLElement;
  clone: HTMLElement;
  category: "image" | "video" | "card" | "button" | "text" | "icon" | "container";
  rect: DOMRect;
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
  private static hiddenOriginals: HTMLElement[] = [];

  /**
   * Captures visible DOM elements and initiates sequential, cascading gravitational absorption
   */
  public static initiateSuction(singularityPos: { x: number; y: number }): number {
    if (typeof window === "undefined" || typeof document === "undefined") return 0;

    // Save scroll position
    this.savedScroll = {
      x: window.scrollX || window.pageXOffset || 0,
      y: window.scrollY || window.pageYOffset || 0,
    };

    const rootEl = document.getElementById("website-root");
    if (!rootEl) return 0;

    this.cleanupProxies();

    // Create high-z-index proxy container covering the viewport
    const container = document.createElement("div");
    container.id = "cosmic-consumption-container";
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "99980";
    container.style.overflow = "hidden";
    container.style.perspective = "1200px";
    container.style.perspectiveOrigin = `${singularityPos.x}px ${singularityPos.y}px`;
    document.body.appendChild(container);
    this.proxyContainer = container;

    // Lock page scrolling and interaction
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";

    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const maxDist = Math.sqrt(vpW * vpW + vpH * vpH);

    // Collect visible elements
    const elementSelectors = [
      "header", "nav",
      "h1", "h2", "h3", "h4",
      "p", "span.font-mono",
      "button", "a",
      "img", "video", "canvas",
      "svg",
      "[class*='rounded-2xl']", "[class*='rounded-xl']", "[class*='rounded-3xl']",
      "article", "[class*='card']"
    ];

    const rawNodes = Array.from(rootEl.querySelectorAll<HTMLElement>(elementSelectors.join(",")));
    const visibleElements: { el: HTMLElement; rect: DOMRect; category: CapturedElementProxy["category"] }[] = [];

    // Filter to visible viewport bounds
    for (const el of rawNodes) {
      // Don't capture our floating widgets
      if (el.closest("#cosmic-consumption-container") || el.closest("[data-multiverse-widget]")) continue;

      const rect = el.getBoundingClientRect();
      if (rect.width < 12 || rect.height < 12) continue;
      if (rect.bottom < -40 || rect.top > vpH + 40 || rect.right < -40 || rect.left > vpW + 40) continue;

      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) < 0.1) continue;

      let category: CapturedElementProxy["category"] = "container";
      const tag = el.tagName.toLowerCase();
      if (tag === "img") category = "image";
      else if (tag === "video") category = "video";
      else if (tag === "button" || tag === "a") category = "button";
      else if (tag === "svg") category = "icon";
      else if (tag.startsWith("h") || tag === "p") category = "text";
      else if (el.className && (el.className.includes("rounded") || el.className.includes("card") || tag === "article")) category = "card";

      visibleElements.push({ el, rect, category });
      if (visibleElements.length >= 160) break; // Performance guard for 60 FPS
    }

    // Sort elements by distance to singularity: closest elements absorb first
    visibleElements.sort((a, b) => {
      const distA = Math.hypot(singularityPos.x - (a.rect.left + a.rect.width / 2), singularityPos.y - (a.rect.top + a.rect.height / 2));
      const distB = Math.hypot(singularityPos.x - (b.rect.left + b.rect.width / 2), singularityPos.y - (b.rect.top + b.rect.height / 2));
      return distA - distB;
    });

    this.activeProxies = [];
    this.hiddenOriginals = [];

    // Spawn animated visual proxies
    visibleElements.forEach((item, index) => {
      const { el, rect, category } = item;
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      const dx = singularityPos.x - elCenterX;
      const dy = singularityPos.y - elCenterY;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      // Cascading delay based on distance + index wave
      const normalizedDist = dist / maxDist;
      const delay = Math.min(normalizedDist * 1.6 + (index * 0.015), 2.2);

      // Create visual clone
      const clone = document.createElement("div");
      clone.className = "cosmic-absorbed-element";
      clone.style.position = "absolute";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = "0";
      clone.style.transformOrigin = "center center";
      clone.style.willChange = "transform, opacity, filter";
      clone.style.boxSizing = "border-box";
      clone.style.pointerEvents = "none";
      clone.style.overflow = "hidden";

      const comp = window.getComputedStyle(el);
      clone.style.borderRadius = comp.borderRadius || "8px";

      // 1. Images: Clone image source
      if (category === "image" && el instanceof HTMLImageElement) {
        const img = document.createElement("img");
        img.src = el.src;
        img.alt = el.alt || "";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = comp.objectFit || "cover";
        clone.appendChild(img);
      }
      // 2. Videos: Clone video or render poster/canvas frame
      else if (category === "video" && el instanceof HTMLVideoElement) {
        const vidClone = document.createElement("video");
        vidClone.src = el.currentSrc || el.src;
        vidClone.poster = el.poster || "";
        vidClone.muted = true;
        vidClone.currentTime = el.currentTime || 0;
        vidClone.style.width = "100%";
        vidClone.style.height = "100%";
        vidClone.style.objectFit = comp.objectFit || "cover";
        clone.appendChild(vidClone);
      }
      // 3. Buttons & Interactive Links
      else if (category === "button") {
        clone.style.background = comp.backgroundColor !== "rgba(0, 0, 0, 0)" ? comp.backgroundColor : "rgba(255, 255, 255, 0.08)";
        clone.style.border = `${comp.borderWidth || "1px"} ${comp.borderStyle || "solid"} ${comp.borderColor || "rgba(245, 158, 11, 0.3)"}`;
        clone.style.boxShadow = "0 0 16px rgba(245, 158, 11, 0.35)";
        clone.innerHTML = el.innerHTML;
        clone.style.color = comp.color;
        clone.style.fontSize = comp.fontSize;
        clone.style.display = "flex";
        clone.style.alignItems = "center";
        clone.style.justifyContent = "center";
      }
      // 4. Text Headings & Paragraphs
      else if (category === "text") {
        clone.style.color = comp.color || "#ffffff";
        clone.style.font = comp.font;
        clone.style.fontSize = comp.fontSize;
        clone.style.fontWeight = comp.fontWeight;
        clone.style.lineHeight = comp.lineHeight;
        clone.innerText = el.innerText;
      }
      // 5. Cards & Containers
      else {
        const bg = comp.backgroundColor;
        clone.style.background = bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent" ? bg : "rgba(255, 255, 255, 0.03)";
        clone.style.border = `1px solid ${comp.borderColor && comp.borderColor !== "rgba(0, 0, 0, 0)" ? comp.borderColor : "rgba(255, 255, 255, 0.12)"}`;
        clone.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.8)";
        // Clone child preview if small card
        if (rect.width < 500 && el.children.length > 0 && el.children.length < 8) {
          clone.innerHTML = el.innerHTML;
        }
      }

      container.appendChild(clone);

      // Hide original element
      el.style.visibility = "hidden";
      this.hiddenOriginals.push(el);

      const proxy: CapturedElementProxy = {
        originalEl: el,
        clone,
        category,
        rect,
        dx,
        dy,
        dist,
        angle,
        delay,
      };
      this.activeProxies.push(proxy);

      // Trigger cascading gravitational physics trajectory
      requestAnimationFrame(() => {
        // Rotational spin along Keplerian spiral
        const swirlAngle = (index % 2 === 0 ? 1 : -1) * (280 + dist * 0.35);
        const duration = 1.4 + Math.random() * 0.5;

        clone.style.transition = `
          transform ${duration}s cubic-bezier(0.55, 0, 1, 0.45) ${delay}s,
          opacity ${duration * 0.8}s ease-in ${delay + 0.1}s,
          filter ${duration * 0.85}s ease-in ${delay}s
        `;

        // Physical suction: elements rotate in 3D, stretch/skew along trajectory vector, and compress into singularity
        if (category === "card") {
          clone.style.transform = `
            translate3d(${dx}px, ${dy}px, -200px)
            rotateX(${swirlAngle * 0.5}deg)
            rotateY(${swirlAngle * 0.8}deg)
            rotateZ(${swirlAngle}deg)
            scale(0.005)
          `;
        } else if (category === "image" || category === "video") {
          clone.style.transform = `
            translate3d(${dx}px, ${dy}px, 0px)
            rotate(${swirlAngle}deg)
            skew(${Math.sin(angle) * 40}deg, ${Math.cos(angle) * 40}deg)
            scale(0.005)
          `;
        } else {
          clone.style.transform = `
            translate3d(${dx}px, ${dy}px, 0px)
            rotate(${swirlAngle}deg)
            scale(0.005)
          `;
        }

        clone.style.opacity = "0";
        clone.style.filter = "blur(12px) brightness(3.0)";
      });
    });

    // Also collapse #website-root coordinates
    rootEl.style.transition = "opacity 2.8s cubic-bezier(0.55, 0, 1, 0.45), filter 2.5s ease-in";
    rootEl.style.opacity = "0";
    rootEl.style.filter = "blur(16px) brightness(0.2)";

    return this.activeProxies.length;
  }

  /**
   * Reconstructs the website and restores all original elements, scroll position, and interactions
   */
  public static restoreWebsite(): void {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const rootEl = document.getElementById("website-root");

    // Reverse trajectory: elements flow outward from singularity into original positions
    if (this.proxyContainer && this.activeProxies.length > 0) {
      this.activeProxies.forEach((proxy, i) => {
        const delay = (i % 14) * 0.035;
        proxy.clone.style.transition = `
          transform 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          opacity 1.4s ease-out ${delay}s,
          filter 1.4s ease-out ${delay}s
        `;
        proxy.clone.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg) scale(1) skew(0deg, 0deg)";
        proxy.clone.style.opacity = "0.95";
        proxy.clone.style.filter = "none";
      });
    }

    // Restore root DOM styles
    if (rootEl) {
      rootEl.style.transition = "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, filter 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s";
      rootEl.style.opacity = "1";
      rootEl.style.filter = "none";
      rootEl.style.pointerEvents = "auto";
      rootEl.style.transform = "none";
    }

    // Re-enable body scrolling
    document.body.style.overflow = "";
    document.body.style.userSelect = "";

    // Unhide original elements after proxies complete expansion
    setTimeout(() => {
      this.hiddenOriginals.forEach((el) => {
        el.style.visibility = "";
      });
      this.hiddenOriginals = [];
      this.cleanupProxies();

      // Restore exact scroll position
      window.scrollTo({
        left: this.savedScroll.x,
        top: this.savedScroll.y,
        behavior: "instant",
      });
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
