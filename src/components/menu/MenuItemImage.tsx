'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MenuItemImageProps {
  src?: string | null;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
}

function getInitials(title: string) {
  return title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

const MENU_IMAGE_BLUR =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 780'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230f1020'/%3E%3Cstop offset='52%25' stop-color='%23090914'/%3E%3Cstop offset='100%25' stop-color='%23050509'/%3E%3C/linearGradient%3E%3CradialGradient id='pink' cx='28%25' cy='22%25' r='38%25'%3E%3Cstop offset='0%25' stop-color='rgba(236,72,153,0.38)'/%3E%3Cstop offset='100%25' stop-color='rgba(236,72,153,0)'/%3E%3C/radialGradient%3E%3CradialGradient id='cyan' cx='74%25' cy='78%25' r='36%25'%3E%3Cstop offset='0%25' stop-color='rgba(34,211,238,0.32)'/%3E%3Cstop offset='100%25' stop-color='rgba(34,211,238,0)'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='1200' height='780' fill='url(%23bg)'/%3E%3Crect width='1200' height='780' fill='url(%23pink)'/%3E%3Crect width='1200' height='780' fill='url(%23cyan)'/%3E%3C/svg%3E";
const MENU_IMAGE_WIDTHS = [360, 540, 720, 960] as const;
const MENU_IMAGE_SIZES = '(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 92vw';
const MENU_IMAGE_QUALITY = 70;

function buildMenuImageUrl(url: string, width = MENU_IMAGE_WIDTHS[MENU_IMAGE_WIDTHS.length - 1]) {
  if (/^https?:\/\//i.test(url)) {
    const params = new URLSearchParams({
      url,
      w: String(width),
      q: String(MENU_IMAGE_QUALITY),
    });

    return `/api/proxy-image?${params.toString()}`;
  }

  return url;
}

function buildMenuImageSet(url: string) {
  if (!/^https?:\/\//i.test(url)) {
    return undefined;
  }

  return MENU_IMAGE_WIDTHS.map((width) => `${buildMenuImageUrl(url, width)} ${width}w`).join(', ');
}

export function MenuItemImage({
  src,
  alt,
  title,
  className,
  priority = false,
}: MenuItemImageProps) {
  const [broken, setBroken] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const initials = useMemo(() => getInitials(title) || 'TL', [title]);
  const imageSrc = useMemo(() => (src ? buildMenuImageUrl(src) : null), [src]);
  const imageSrcSet = useMemo(() => (src ? buildMenuImageSet(src) : undefined), [src]);

  useEffect(() => {
    setBroken(false);
    setLoaded(false);
  }, [imageSrc]);

  useEffect(() => {
    const image = imageRef.current;

    if (!image || !imageSrc) {
      return;
    }

    if (image.complete) {
      setLoaded(image.naturalWidth > 0);
      setBroken(image.naturalWidth === 0);
    }
  }, [imageSrc]);

  if (!imageSrc || broken) {
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
        key={imageSrc}
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes={MENU_IMAGE_SIZES}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        draggable={false}
        className={cn(
          'absolute inset-0 h-full w-full object-cover object-center transition-all duration-700',
          loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-95',
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setBroken(true)}
      />

      {!loaded ? (
        <div
          className="absolute inset-0 z-[1] bg-cover bg-center opacity-90 transition-opacity duration-500"
          style={{ backgroundImage: `url("${MENU_IMAGE_BLUR}")` }}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.18),transparent_26%),linear-gradient(180deg,transparent,rgba(2,2,9,0.08))]" />
    </div>
  );
}
