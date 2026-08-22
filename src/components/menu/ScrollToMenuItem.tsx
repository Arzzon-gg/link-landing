"use client";

import { useEffect } from "react";

export function ScrollToMenuItem({ itemId }: { itemId: number | null }) {
  useEffect(() => {
    if (!itemId) return;

    let timeoutId: number | null = null;
    const frameId = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        document
          .getElementById(`menu-item-${itemId}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [itemId]);

  return null;
}
