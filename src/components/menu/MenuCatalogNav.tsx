'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MenuCatalogNavItem {
  id: string;
  name: string;
  sectionCount: number;
  itemCount: number;
}

type MenuSelection = number | 'all';

export function MenuCatalogNav({
  menus,
  initialMenuId,
}: {
  menus: MenuCatalogNavItem[];
  initialMenuId: number | null;
}) {
  const reduceMotion = useReducedMotion();
  const firstMenuId = Number(menus[0]?.id.replace('menu-catalog-', ''));
  const [activeMenuId, setActiveMenuId] = useState<MenuSelection>(
    initialMenuId ?? firstMenuId ?? 'all',
  );

  useEffect(() => {
    if (initialMenuId !== null) setActiveMenuId(initialMenuId);
  }, [initialMenuId]);

  useEffect(() => {
    const allSelected = activeMenuId === 'all';
    document.querySelectorAll<HTMLElement>('[data-menu-catalog-content]').forEach(
      (element) => {
        element.hidden =
          !allSelected && Number(element.dataset.menuId) !== activeMenuId;
      },
    );
    document.querySelectorAll<HTMLElement>('[data-menu-category-menu-id]').forEach(
      (element) => {
        element.hidden =
          !allSelected && Number(element.dataset.menuCategoryMenuId) !== activeMenuId;
      },
    );
  }, [activeMenuId]);

  useEffect(() => {
    const handleMenuSelectionRequest = (event: Event) => {
      const requestedMenuId = (event as CustomEvent<number>).detail;
      if (typeof requestedMenuId === 'number') setActiveMenuId(requestedMenuId);
    };

    window.addEventListener('link-menu-select', handleMenuSelectionRequest);
    return () =>
      window.removeEventListener('link-menu-select', handleMenuSelectionRequest);
  }, []);

  if (menus.length < 2) return null;

  function selectMenu(menuId: MenuSelection) {
    setActiveMenuId(menuId);
    window.requestAnimationFrame(() => {
      document.getElementById('menu-categories')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  const allSelected = activeMenuId === 'all';

  return (
    <nav
      aria-label="Menu collections"
      className="mb-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <MenuChoice
        active={allSelected}
        reduceMotion={reduceMotion}
        onClick={() => selectMenu('all')}
        name="All menus"
        detail="Browse the full menu"
      />
      {menus.map((menu) => {
        const menuId = Number(menu.id.replace('menu-catalog-', ''));
        return (
          <MenuChoice
            key={menu.id}
            active={!allSelected && menuId === activeMenuId}
            reduceMotion={reduceMotion}
            onClick={() => selectMenu(menuId)}
            name={menu.name}
            detail={`${menu.sectionCount} ${menu.sectionCount === 1 ? 'section' : 'sections'} · ${menu.itemCount} dishes`}
          />
        );
      })}
    </nav>
  );
}

function MenuChoice({
  active,
  reduceMotion,
  onClick,
  name,
  detail,
}: {
  active: boolean;
  reduceMotion: boolean | null;
  onClick: () => void;
  name: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`relative min-w-max overflow-hidden rounded-xl border px-4 py-2.5 text-left transition-colors duration-300 ${
        active
          ? 'border-cyan-300/45 bg-cyan-400/[0.12] text-white shadow-[0_0_24px_rgba(34,211,238,0.12)]'
          : 'border-white/[0.09] bg-[#090916]/80 text-white/58 hover:border-cyan-300/30 hover:text-white'
      }`}
    >
      {active && !reduceMotion ? (
        <motion.span
          layoutId="active-menu-catalog"
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(139,92,246,0.14))]"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      ) : null}
      <span className="relative block font-orbitron text-[10px] font-black uppercase tracking-[0.2em]">
        {name}
      </span>
      <span className="relative mt-1 block text-[10px] text-white/42">
        {detail}
      </span>
    </button>
  );
}
