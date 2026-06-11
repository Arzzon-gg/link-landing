'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MenuCategoryNavItem {
  id: string;
  name: string;
  itemCount: number;
}

interface MenuCategoryNavProps {
  categories: MenuCategoryNavItem[];
}

export function MenuCategoryNav({ categories }: MenuCategoryNavProps) {
  const [activeId, setActiveId] = useState<string | null>(categories[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!categories.length) return;

    const updateActive = () => {
      const scrollAnchor = window.scrollY + 170;
      let current = categories[0]?.id ?? null;

      for (const category of categories) {
        const section = document.getElementById(category.id);
        if (!section) continue;

        if (section.offsetTop <= scrollAnchor) {
          current = category.id;
        }
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });

    return () => window.removeEventListener('scroll', updateActive);
  }, [categories]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-16 z-20 -mx-1 mb-10 flex gap-3 overflow-x-auto px-1 py-2 sm:top-20"
    >
      {categories.map((category) => {
        const isActive = category.id === activeId;

        return (
          <a
            key={category.id}
            href={`#${category.id}`}
            className={`button-sheen group relative min-w-max overflow-hidden rounded-full border px-5 py-3 text-left backdrop-blur-sm transition-all duration-300 ${
              isActive
                ? 'border-cyan-400/40 bg-[#0d1322] shadow-[0_0_30px_rgba(34,211,238,0.16)]'
                : 'border-white/10 bg-[#0a0a17]/92 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-[#0c1020] hover:shadow-[0_0_28px_rgba(34,211,238,0.14)]'
            }`}
          >
            {isActive && !reduceMotion ? (
              <motion.span
                layoutId="active-menu-category"
                className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(139,92,246,0.12))]"
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              />
            ) : null}

            <span className="relative block font-orbitron text-[11px] font-black uppercase tracking-[0.28em] text-white/86 transition-colors group-hover:text-cyan-300">
              {category.name}
            </span>
            <span className="relative mt-1 block text-xs text-white/38">
              {category.itemCount} {category.itemCount === 1 ? 'dish' : 'dishes'}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
