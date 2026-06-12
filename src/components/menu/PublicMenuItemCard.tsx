'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { PublicMenuItem } from '@/types/menu';
import { MenuItemImage } from './MenuItemImage';

interface PublicMenuItemCardProps {
  item: PublicMenuItem;
  category: string;
  imageUrl?: string | null;
  priceLabel: string;
  teaser: string;
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
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();
  const modifiers = item.modifiers.slice();
  const hasModifiers = modifiers.length > 0;

  return (
    <motion.article
      className="group relative h-[31.5rem] [perspective:1800px] sm:h-[32.5rem]"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={reduceMotion ? undefined : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="feature-card relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] shadow-[0_20px_65px_rgba(0,0,0,0.38)] transition-all duration-300 group-hover:border-white/14 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.46)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent" />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-12 top-8 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />
              <div className="absolute -left-10 bottom-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative p-4">
              <div className="relative overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#080810]">
                <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div
                  className={cn(
                    'absolute left-3 top-3 z-20 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] backdrop-blur-sm',
                    item.isAvailable
                      ? 'border-green-400/30 bg-green-500/12 text-green-300'
                      : 'border-pink-400/30 bg-pink-500/15 text-pink-300',
                  )}
                >
                  {item.isAvailable ? 'Available' : 'Paused'}
                </div>
                <div className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-[#020209]/82 px-3 py-1 text-sm font-black text-white shadow-[0_0_24px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                  {priceLabel}
                </div>

                <div className="h-[250px] sm:h-[260px]">
                  <MenuItemImage
                    src={imageUrl}
                    alt={item.name}
                    title={item.name}
                    priority={priorityImage}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_28%,transparent_72%,rgba(7,7,14,0.78)_100%)] opacity-75" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07070e] via-[#07070e]/55 to-transparent" />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-white/34">
                    {category}
                  </p>
                  <h4 className="font-orbitron text-lg font-black uppercase leading-tight text-white sm:text-xl">
                    {item.name}
                  </h4>
                </div>

                <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/48 transition-colors duration-300 group-hover:text-white/70">
                  {hasModifiers
                    ? `${modifiers.length} ${modifiers.length === 1 ? 'add-on' : 'add-ons'}`
                    : 'House plate'}
                </div>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/44 transition-colors duration-300 group-hover:text-white/56">
                {teaser}
              </p>

              {false && (
                <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 transition-all duration-300 group-hover:border-cyan-400/14 group-hover:bg-white/[0.04]">
                  <div>
                    <p className="font-orbitron text-[11px] font-black uppercase tracking-[0.24em] text-white/82">
                      {hasModifiers ? 'Flip for details' : 'Flip for chef notes'}
                    </p>
                    <p className="mt-1 text-xs text-white/36">
                      {hasModifiers
                        ? 'Description and customizations on the back.'
                        : 'Quick description and serving notes on the back.'}
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setFlipped(true)}
                    className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300 transition-all duration-300 hover:border-cyan-300/55 hover:bg-cyan-400/14"
                    aria-label={`View details for ${item.name}`}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  >
                    View
                    <span className="text-sm leading-none">&gt;</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="feature-card relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(8,11,22,0.98),rgba(8,8,18,0.98))] shadow-[0_20px_65px_rgba(0,0,0,0.42)]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-400/55 to-transparent" />

            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-4 py-4">
              <div className="min-w-0">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.26em] text-cyan-300">
                  Dish details
                </p>
                <h4 className="font-orbitron text-lg font-black uppercase leading-tight text-white">
                  {item.name}
                </h4>
              </div>

              <motion.button
                type="button"
                onClick={() => setFlipped(false)}
                className="button-sheen shrink-0 overflow-hidden rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/72 transition-all duration-300 hover:border-pink-400/35 hover:text-pink-300"
                aria-label={`Return to ${item.name} card front`}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              >
                Back
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors duration-300 hover:bg-white/[0.04]">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.26em] text-white/34">
                  Full description
                </p>
                <p className="text-sm leading-6 text-white/54">
                  {item.description?.trim() ||
                    'This dish is currently shown without a written description, but the kitchen still serves the full signature recipe.'}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(7,9,18,0.96),rgba(10,10,20,0.92))] p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-orbitron text-[11px] font-black uppercase tracking-[0.26em] text-white/82">
                      Customizations
                    </p>
                    <p className="mt-1 text-xs text-white/36">
                      {hasModifiers
                        ? 'Optional add-ons and swaps for this dish.'
                        : 'This item is already presented as a complete plate.'}
                    </p>
                  </div>
                  <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                    {modifiers.length}
                  </div>
                </div>

                {hasModifiers ? (
                  <div className="grid gap-3">
                    {modifiers.map((modifier) => (
                      <div
                        key={modifier.id}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{modifier.name}</p>
                            <p className="mt-1 text-xs text-white/38">
                              {modifier.isAvailable
                                ? 'Available to add'
                                : 'Temporarily unavailable'}
                            </p>
                          </div>
                          <div
                            className={cn(
                              'rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]',
                              modifier.isAvailable
                                ? 'border-green-400/20 bg-green-500/10 text-green-300'
                                : 'border-pink-400/20 bg-pink-500/10 text-pink-300',
                            )}
                          >
                            {modifier.additionalPrice > 0
                              ? `+${formatCurrency(modifier.additionalPrice)}`
                              : 'Included'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.03] p-4">
                    <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.26em] text-white/54">
                      House note
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/46">
                      No optional modifiers are attached right now. The base dish is already
                      plated as the full intended flavor profile.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}
