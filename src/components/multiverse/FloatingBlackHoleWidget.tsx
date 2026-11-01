"use client";

import { useEffect } from "react";
import { BlackHolePortalEngine } from "./black-hole-portal";

export function FloatingBlackHoleWidget() {
  useEffect(() => {
    const engine = BlackHolePortalEngine.getInstance();
    engine.mountWidget();

    return () => {
      engine.destroy();
    };
  }, []);

  return null;
}
