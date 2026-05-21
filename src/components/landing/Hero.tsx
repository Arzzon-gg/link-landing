import Image from 'next/image';
import Link from 'next/link';

const badges = [
  { icon: '👥', label: 'ALL AGES' },
  { icon: '🍔', label: 'AWESOME FOOD' },
  { icon: '🕹️', label: 'EPIC GAMES' },
  { icon: '⭐', label: 'UNFORGETTABLE' },
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
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020209] via-[#020209]/80 to-[#020209]/10" /> */}
      {/* Top & bottom vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020209]/50 via-transparent to-[#020209]/60" />

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
                <span className="text-sm">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

