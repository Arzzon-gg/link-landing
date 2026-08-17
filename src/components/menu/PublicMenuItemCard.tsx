'use client';

import { cn } from '@/lib/utils';
import type { PublicMenuItem } from '@/types/menu';
import { MenuItemImage } from './MenuItemImage';

interface PublicMenuItemCardProps {
  item: PublicMenuItem;
  category: string;
  imageUrl?: string | null;
  priceLabel: string;
  teaser: string | null;
  priorityImage?: boolean;
}

export function PublicMenuItemCard({
  item,
  category,
  imageUrl,
  priceLabel,
  teaser,
  priorityImage = false,
}: PublicMenuItemCardProps) {
  const hasImage = !!imageUrl;
  const isCombo = item.isCombo || category.trim().toLowerCase().includes('combo');

  return (
    <div className="group flex min-w-0 w-full max-w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[linear-gradient(90deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] px-4 py-3 transition-all duration-200 hover:border-white/[0.13] hover:bg-[linear-gradient(90deg,rgba(12,12,28,0.98),rgba(9,9,18,0.99))] sm:gap-5 sm:px-5">
      {/* Thumbnail — only when image exists */}
      {hasImage ? (
        <div className="relative h-[3.25rem] w-[3.25rem] shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#080810] sm:h-[3.75rem] sm:w-[3.75rem]">
          <MenuItemImage
            src={imageUrl}
            alt={item.name}
            title={item.name}
            priority={priorityImage}
          />
        </div>
      ) : null}

      {/* Name + teaser */}
      <div className="min-w-0 flex-1">
        {isCombo ? (
          <span className="mb-1 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2 py-0.5 font-orbitron text-[9px] font-black uppercase tracking-[0.2em] text-cyan-200">
            Combo
          </span>
        ) : null}
        <h4 className={cn(
          'truncate font-orbitron font-black uppercase leading-tight text-white',
          teaser ? 'text-[13px] sm:text-sm' : 'text-sm sm:text-[15px]',
        )}>
          {item.name}
        </h4>
        {teaser ? (
          <p className="mt-0.5 line-clamp-2 break-words text-xs leading-5 text-white/42 sm:text-[13px]">
            {teaser}
          </p>
        ) : null}
        {isCombo && item.comboItems.length ? (
          <p className="mt-0.5 line-clamp-1 break-words text-[10px] uppercase tracking-[0.08em] text-cyan-100/55">
            Includes: {item.comboItems.map((comboItem) => comboItem.name).join(' + ')}
          </p>
        ) : null}
      </div>

      {/* Price + availability */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-orbitron text-sm font-black text-white sm:text-[15px]">
          {priceLabel}
        </span>
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.22em]',
            item.isAvailable
              ? 'border-green-400/30 bg-green-500/10 text-green-300'
              : 'border-pink-400/30 bg-pink-500/12 text-pink-300',
          )}
        >
          {item.isAvailable ? 'Available' : 'Paused'}
        </span>
      </div>
    </div>
  );
}
