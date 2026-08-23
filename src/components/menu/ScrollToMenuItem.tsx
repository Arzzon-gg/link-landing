"use client";

import { useEffect } from "react";

export function ScrollToMenuItem({ itemId }: { itemId: number | null }) {
  useEffect(() => {
    if (!itemId) return;

    let timeoutId: number | null = null;
    let attempts = 0;
    const findAndScroll = () => {
      const element = document.getElementById(`menu-item-${itemId}`);
      if (element) {
        const catalog = element.closest<HTMLElement>('[data-menu-catalog-content]');
        const menuId = catalog?.dataset.menuId;
        if (menuId) {
          window.dispatchEvent(
            new CustomEvent('link-menu-select', { detail: Number(menuId) }),
          );
          timeoutId = window.setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 100);
        } else {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      // The menu can switch to the item's menu after hydration. Retry briefly
      // so promotion links remain reliable even while that client state settles.
      attempts += 1;
      if (attempts < 20) {
        timeoutId = window.setTimeout(findAndScroll, 50);
      }
    };

    const frameId = window.requestAnimationFrame(findAndScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [itemId]);

  return null;
}
