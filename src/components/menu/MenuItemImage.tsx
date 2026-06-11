'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const encoded = encodeURIComponent(url);
    return `/api/proxy-image?url=${encoded}`;
  }

  return url;
}

export function MenuItemImage({
  src,
  alt,
  title,
  className,
}: MenuItemImageProps) {
  const [broken, setBroken] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const initials = useMemo(() => getInitials(title) || 'TL', [title]);
  const proxiedSrc = useMemo(() => (src ? proxyImageUrl(src) : null), [src]);

  useEffect(() => {
    setBroken(false);
    setLoaded(false);
  }, [proxiedSrc]);

  useEffect(() => {
    const image = imageRef.current;

    if (!image || !proxiedSrc) {
      return;
    }

    const markLoaded = () => setLoaded(true);
    const markBroken = () => setBroken(true);

    if (image.complete) {
      if (image.naturalWidth > 0) {
        markLoaded();
      } else {
        markBroken();
      }

      return;
    }

    image.addEventListener('load', markLoaded);
    image.addEventListener('error', markBroken);

    return () => {
      image.removeEventListener('load', markLoaded);
      image.removeEventListener('error', markBroken);
    };
  }, [proxiedSrc]);

  if (!proxiedSrc || broken) {
    return (
      <div
        className={cn(
          'relative flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-4 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(236,72,153,0.28),transparent_45%),linear-gradient(160deg,#0f1020_0%,#090914_55%,#050509_100%)] px-6 text-center',
          className,
        )}
      >
        <div className="menu-orb-float absolute -left-6 top-6 h-24 w-24 rounded-full bg-pink-500/12 blur-3xl" />
        <div className="menu-orb-float menu-orb-float-delayed absolute -bottom-4 right-4 h-28 w-28 rounded-full bg-cyan-500/12 blur-3xl" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] font-orbitron text-2xl font-black tracking-[0.18em] text-white shadow-[0_0_30px_rgba(139,92,246,0.2)]">
          {initials}
        </div>
        <div className="relative space-y-1.5">
          <p className="font-orbitron text-[11px] font-black uppercase tracking-[0.28em] text-white/72">
            Menu Preview
          </p>
          <p className="text-sm text-white/40">Image coming soon for this dish.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {!loaded ? (
        <div className="menu-shimmer absolute inset-0 z-10 bg-[linear-gradient(160deg,#0f1020_0%,#090914_55%,#050509_100%)]" />
      ) : null}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        key={proxiedSrc}
        src={proxiedSrc}
        alt={alt}
        className={cn(
          'h-full w-full object-cover object-center transition-all duration-700',
          loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-100',
        )}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setBroken(true)}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_26%),linear-gradient(180deg,transparent,rgba(2,2,9,0.08))]" />
    </div>
  );
}
