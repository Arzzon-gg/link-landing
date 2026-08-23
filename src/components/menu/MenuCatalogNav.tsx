'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MenuCatalogNavItem {
  id: string;
  name: string;
  sectionCount: number;
  itemCount: number;
}

export function MenuCatalogNav({ menus }: { menus: MenuCatalogNavItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(menus[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menus.length) return;

    const updateActive = () => {
      const anchor = window.scrollY + 156;
      let active = menus[0]?.id ?? null;
      for (const menu of menus) {
        const element = document.getElementById(menu.id);
        if (element && element.offsetTop <= anchor) active = menu.id;
      }
      setActiveId(active);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [menus]);

  if (menus.length < 2) return null;

  return (
    <nav
      aria-label="Menu collections"
      className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {menus.map((menu) => {
        const isActive = menu.id === activeId;
        return (
          <a
            key={menu.id}
            href={`#${menu.id}`}
            className={`relative min-w-max overflow-hidden rounded-xl border px-4 py-2.5 transition-colors duration-300 ${
              isActive
                ? 'border-cyan-300/45 bg-cyan-400/[0.12] text-white shadow-[0_0_24px_rgba(34,211,238,0.12)]'
                : 'border-white/[0.09] bg-[#090916]/80 text-white/58 hover:border-cyan-300/30 hover:text-white'
            }`}
          >
            {isActive && !reduceMotion ? (
              <motion.span
                layoutId="active-menu-catalog"
                className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(139,92,246,0.14))]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            ) : null}
            <span className="relative block font-orbitron text-[10px] font-black uppercase tracking-[0.2em]">
              {menu.name}
            </span>
            <span className="relative mt-1 block text-[10px] text-white/42">
              {menu.sectionCount} {menu.sectionCount === 1 ? 'section' : 'sections'} · {menu.itemCount} dishes
            </span>
          </a>
        );
      })}
    </nav>
  );
}
