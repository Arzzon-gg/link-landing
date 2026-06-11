'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface MenuItemImageProps {
  src?: string | null;
  alt: string;
  title: string;
  className?: string;
}

function getInitials(title: string) {
  return title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function proxyImageUrl(url: string): string {
  // If the URL is external (from the backend API), proxy it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const encoded = encodeURIComponent(url);
    return `/api/proxy-image?url=${encoded}`;
  }
  // If it's a relative URL, use it as-is
  return url;
}

export function MenuItemImage({
  src,
  alt,
  title,
  className,
}: MenuItemImageProps) {
  const [broken, setBroken] = useState(false);
  const initials = useMemo(() => getInitials(title) || 'TL', [title]);
  const proxiedSrc = useMemo(() => (src ? proxyImageUrl(src) : null), [src]);

  if (!proxiedSrc || broken) {
    return (
      <div
        className={cn(
          'flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_35%,rgba(236,72,153,0.28),transparent_45%),linear-gradient(160deg,#0f1020_0%,#090914_55%,#050509_100%)] px-6 text-center',
          className,
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] font-orbitron text-2xl font-black tracking-[0.18em] text-white shadow-[0_0_30px_rgba(139,92,246,0.2)]">
          {initials}
        </div>
        <div className="space-y-1.5">
          <p className="font-orbitron text-[11px] font-black uppercase tracking-[0.28em] text-white/72">
            Menu Preview
          </p>
          <p className="text-sm text-white/40">
            Image coming soon for this dish.
          </p>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={proxiedSrc}
      alt={alt}
      className={cn('h-full w-full object-cover object-center', className)}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}
