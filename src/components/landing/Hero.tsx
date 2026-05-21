import Image from 'next/image';
import Link from 'next/link';

const badges = [
  {
    label: 'ALL AGES',
    icon: (
      <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'AWESOME FOOD',
    icon: (
      <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z" />
        <path d="M21 15v7" />
      </svg>
    ),
  },
  {
    label: 'EPIC GAMES',
    icon: (
      <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="7" y1="12" x2="11" y2="12" />
        <line x1="9" y1="10" x2="9" y2="14" />
        <circle cx="15.5" cy="11.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="13.5" r=".5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'UNFORGETTABLE',
    icon: (
      <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* ── Full-bleed hero image as background ── */}
      <Image
        src="/images/hero.png"
        alt="The Link – Forever Young arcade experience"
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── Gradient overlays for text legibility ── */}
      {/* Strong dark on left → transparent on right */}
      {/* Left overlay: readable text on all screens, less opaque on large */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020209]/90 via-[#020209]/55 lg:via-[#020209]/30 to-transparent" />
      {/* Top & bottom vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020209]/40 via-transparent to-[#020209]/50" />

      {/* ── Content overlaid on left ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-28">
        <div className="max-w-[540px]">

          {/* Headline */}
          <div className="mb-5">
            <h1 className="font-orbitron font-black text-5xl sm:text-6xl xl:text-7xl leading-[1.02] text-white uppercase">
              MORE THAN<br />A PLACE.
            </h1>
            {/* Original design: green → cyan → blue gradient */}
            <h1 className="font-orbitron font-black text-5xl sm:text-6xl xl:text-7xl leading-[1.02] uppercase bg-gradient-to-r from-[#39ff14] via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              IT'S A VIBE.
            </h1>
          </div>

          <p className="text-white/55 text-xs font-bold tracking-[0.22em] uppercase mb-8 leading-loose">
            PLAY. EAT. CELEBRATE.<br />ALL CONNECTED.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white text-[11px] font-black tracking-widest uppercase hover:from-pink-500 hover:to-fuchsia-500 transition-all duration-300 shadow-[0_0_28px_rgba(236,72,153,0.5)] hover:shadow-[0_0_44px_rgba(236,72,153,0.7)]"
            >
              BOOK YOUR EXPERIENCE <span className="text-base leading-none">›</span>
            </Link>
            <Link
              href="#activities"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/40 text-white text-[11px] font-black tracking-widest uppercase hover:border-white hover:bg-white/[0.04] transition-all duration-300"
            >
              EXPLORE ACTIVITIES <span className="text-base leading-none">›</span>
            </Link>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 text-white/55 text-[10px] font-bold tracking-[0.18em] uppercase"
              >
              {b.icon}
              {b.label}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

