'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import type { EventPackage } from '@/types/events';

interface EventCardProps {
  event: EventPackage;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function EventCard({ event }: EventCardProps) {
  const [imageBroken, setImageBroken] = useState(false);

  return (
    <article className="feature-card group relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] shadow-[0_20px_65px_rgba(0,0,0,0.38)] transition-all duration-300 hover:border-white/14 hover:shadow-[0_30px_80px_rgba(0,0,0,0.46)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent" />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {imageBroken ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,rgba(236,72,153,0.28),transparent_45%),linear-gradient(160deg,#0f1020_0%,#090914_55%,#050509_100%)] px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] font-orbitron text-2xl font-black tracking-[0.18em] text-white shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              {event.name
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part.charAt(0).toUpperCase())
                .join('')}
            </div>
            <p className="text-sm text-white/40">Image coming soon</p>
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.imageUrl}
              alt={event.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              onError={() => setImageBroken(true)}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020209]/72 via-transparent to-transparent" />
          </>
        )}
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-orbitron text-lg font-black uppercase leading-tight text-white sm:text-xl">
            {event.name}
          </h3>
          <span className="shrink-0 rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1.5 font-orbitron text-xs font-black uppercase tracking-wider text-pink-300 shadow-[0_0_18px_rgba(236,72,153,0.12)]">
            {formatCurrency(event.price)}
          </span>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/8 px-3 py-1.5 text-xs font-medium text-cyan-300">
          <Users size={14} className="text-cyan-300/80" />
          <span>Fits up to {event.capacity} people</span>
        </div>

        {event.description ? (
          <p className="line-clamp-3 text-sm leading-7 text-white/46">
            {event.description}
          </p>
        ) : (
          <p className="text-sm italic text-white/32">No description available.</p>
        )}
      </div>
    </article>
  );
}
