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
      {/* Radial spotlights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_70%_50%,rgba(139,92,246,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_15%_60%,rgba(6,182,212,0.08),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left column ── */}
          <div className="space-y-8 relative z-10">
            <div className="space-y-1">
              <h1 className="font-orbitron font-black text-5xl sm:text-6xl xl:text-7xl leading-[1.05] text-white uppercase">
                MORE THAN<br />A PLACE.
              </h1>
              <h1 className="font-orbitron font-black text-5xl sm:text-6xl xl:text-7xl leading-[1.05] uppercase bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                IT'S A VIBE.
              </h1>
              <p className="text-white/45 text-xs font-bold tracking-[0.2em] uppercase mt-6 leading-loose">
                PLAY. EAT. CELEBRATE.<br />ALL CONNECTED.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
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

          {/* ── Right: Neon arcade visual ── */}
          <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
            {/* Deep glow halo */}
            <div className="absolute inset-4 rounded-3xl bg-violet-700/[0.12] blur-3xl" />

            {/* Outer cyan neon frame */}
            <div className="absolute inset-8 rounded-2xl border-2 border-cyan-400/55"
              style={{ boxShadow: '0 0 50px rgba(6,182,212,0.35), inset 0 0 50px rgba(6,182,212,0.07)' }}
            />

            {/* Corner accent marks */}
            <div className="absolute top-8 left-8 w-7 h-7 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl" />
            <div className="absolute top-8 right-8 w-7 h-7 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl" />
            <div className="absolute bottom-8 left-8 w-7 h-7 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl" />
            <div className="absolute bottom-8 right-8 w-7 h-7 border-b-2 border-r-2 border-cyan-400 rounded-br-xl" />

            {/* Inner pink frame */}
            <div className="absolute inset-16 rounded-xl border border-pink-500/30"
              style={{ boxShadow: '0 0 30px rgba(236,72,153,0.2), inset 0 0 30px rgba(236,72,153,0.06)' }}
            />

            {/* Center brand text */}
            <div className="relative z-10 text-center select-none">
              <div className="text-xs font-black tracking-[0.4em] text-white/75 font-orbitron">THE</div>
              <div
                className="text-4xl sm:text-5xl font-black text-white font-orbitron leading-tight"
                style={{ textShadow: '0 0 30px rgba(139,92,246,0.9), 0 0 60px rgba(139,92,246,0.4)' }}
              >
                Link
              </div>
              <div className="text-[9px] tracking-[0.45em] text-white/45 font-orbitron mt-1">FOREVER YOUNG</div>
            </div>

            {/* Floating game props */}
            <div
              className="absolute top-12 right-12 text-5xl select-none animate-pulse-slow"
              style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.85))' }}
            >
              🎳
            </div>
            <div
              className="absolute bottom-16 left-10 text-4xl select-none"
              style={{ filter: 'drop-shadow(0 0 18px rgba(6,182,212,0.85))', animationDelay: '1.5s' }}
            >
              🎱
            </div>

            {/* Neon orb accents */}
            <div className="absolute top-1/2 left-6 w-3 h-3 rounded-full bg-cyan-400 animate-pulse-slow"
              style={{ boxShadow: '0 0 14px rgba(6,182,212,1)' }}
            />
            <div className="absolute top-16 left-1/2 w-2 h-2 rounded-full bg-pink-400 animate-pulse-slow"
              style={{ boxShadow: '0 0 12px rgba(236,72,153,1)', animationDelay: '0.8s' }}
            />
            <div className="absolute bottom-14 right-14 w-4 h-4 rounded-full bg-violet-400/80 animate-pulse-slow"
              style={{ boxShadow: '0 0 16px rgba(139,92,246,0.9)', animationDelay: '2s' }}
            />

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[linear-gradient(0deg,transparent_49%,rgba(139,92,246,0.03)_50%,transparent_51%)] bg-[length:100%_18px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
