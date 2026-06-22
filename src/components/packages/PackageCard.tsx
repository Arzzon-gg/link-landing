'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';
import type { Package } from '@/types/packages';

interface PackageCardProps {
  pkg: Package;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function PackageCard({ pkg }: PackageCardProps) {
  const [imageBroken, setImageBroken] = useState(false);

  return (
    <article className="feature-card group relative overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] shadow-[0_20px_65px_rgba(0,0,0,0.38)] transition-all duration-300 hover:border-white/14 hover:shadow-[0_30px_80px_rgba(0,0,0,0.46)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent" />

      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageBroken || !pkg.imageUrl ? '/images/birthday.png' : pkg.imageUrl}
          alt={pkg.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={() => setImageBroken(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020209]/72 via-transparent to-transparent" />
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-orbitron text-lg font-black uppercase leading-tight text-white sm:text-xl">
            {pkg.name}
          </h3>
          <span className="shrink-0 rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1.5 font-orbitron text-xs font-black uppercase tracking-wider text-pink-300 shadow-[0_0_18px_rgba(236,72,153,0.12)]">
            {formatCurrency(pkg.price)}
          </span>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/18 bg-cyan-400/8 px-3 py-1.5 text-xs font-medium text-cyan-300">
          <Users size={14} className="text-cyan-300/80" />
          <span>Fits up to {pkg.capacity} people</span>
        </div>

        {pkg.description ? (
          <p className="line-clamp-3 text-sm leading-7 text-white/46">
            {pkg.description}
          </p>
        ) : (
          <p className="text-sm italic text-white/32">No description available.</p>
        )}
      </div>
    </article>
  );
}
