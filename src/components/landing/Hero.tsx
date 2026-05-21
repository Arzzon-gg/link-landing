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
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_65%_45%,rgba(88,28,220,0.22),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_35%_40%_at_80%_25%,rgba(6,182,212,0.1),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

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

          {/* ── Right: Neon arcade scene ── */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[580px] flex items-center justify-center overflow-hidden">

            {/* Deep purple/violet halo */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_42%_48%,rgba(88,28,220,0.38),transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,rgba(6,182,212,0.15),transparent_70%)]" />

            {/* ── Neon portal frame ── */}
            <div className="relative z-10" style={{ width: '58%', paddingTop: '40%' }}>
              {/* Outer cyan frame */}
              <div
                className="absolute inset-0 rounded-2xl border-[3px] border-cyan-400"
                style={{
                  boxShadow:
                    '0 0 25px rgba(6,182,212,0.9), 0 0 70px rgba(6,182,212,0.5), 0 0 140px rgba(6,182,212,0.2), inset 0 0 40px rgba(6,182,212,0.08)',
                }}
              />
              {/* Pink/violet inner glow border */}
              <div
                className="absolute -inset-[5px] rounded-[18px] border border-fuchsia-500/40"
                style={{ boxShadow: '0 0 35px rgba(192,38,211,0.35)' }}
              />
              {/* Corner accent squares */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-300/80" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-300/80" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-300/80" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-300/80" />
              {/* Logo inside frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center select-none">
                  <div className="text-[11px] tracking-[0.4em] text-white/80 font-orbitron">THE</div>
                  <div
                    className="text-4xl sm:text-5xl font-black text-white font-orbitron leading-tight"
                    style={{ textShadow: '0 0 30px rgba(139,92,246,1), 0 0 70px rgba(139,92,246,0.5)' }}
                  >Link</div>
                  <div className="text-[9px] tracking-[0.45em] text-white/50 font-orbitron mt-1">FOREVER YOUNG</div>
                </div>
              </div>
            </div>

            {/* ── Bowling pins cluster (right side, outside frame) ── */}
            <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/3 flex flex-col items-center gap-0 select-none pointer-events-none">
              {/* Back row */}
              <div className="flex gap-0.5">
                <span
                  className="text-4xl sm:text-5xl"
                  style={{ filter: 'drop-shadow(0 0 16px rgba(139,92,246,1)) drop-shadow(0 0 40px rgba(139,92,246,0.6))' }}
                >🎳</span>
                <span
                  className="text-4xl sm:text-5xl mt-3"
                  style={{ filter: 'drop-shadow(0 0 16px rgba(236,72,153,0.9)) drop-shadow(0 0 35px rgba(236,72,153,0.5))' }}
                >🎳</span>
              </div>
              {/* Front pin */}
              <span
                className="text-5xl sm:text-6xl -mt-1"
                style={{ filter: 'drop-shadow(0 0 20px rgba(139,92,246,1)) drop-shadow(0 0 50px rgba(139,92,246,0.6))' }}
              >🎳</span>
            </div>

            {/* ── 8-ball (lower left, prominent) ── */}
            <div className="absolute bottom-6 sm:bottom-10 left-[10%] select-none pointer-events-none">
              <span
                className="text-6xl sm:text-7xl"
                style={{ filter: 'drop-shadow(0 0 24px rgba(6,182,212,0.85)) drop-shadow(0 0 60px rgba(6,182,212,0.45))' }}
              >🎱</span>
            </div>

            {/* ── Neon orb particles ── */}
            <div className="absolute top-8 left-[30%] w-3 h-3 rounded-full bg-cyan-400 animate-pulse-slow"
              style={{ boxShadow: '0 0 16px rgba(6,182,212,1)' }} />
            <div className="absolute top-20 right-[28%] w-2 h-2 rounded-full bg-pink-400 animate-pulse-slow"
              style={{ boxShadow: '0 0 12px rgba(236,72,153,1)', animationDelay: '0.8s' }} />
            <div className="absolute bottom-24 right-[22%] w-4 h-4 rounded-full bg-violet-400/80 animate-pulse-slow"
              style={{ boxShadow: '0 0 18px rgba(139,92,246,0.9)', animationDelay: '1.6s' }} />
            <div className="absolute top-1/3 right-[8%] w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse-slow"
              style={{ boxShadow: '0 0 14px rgba(6,182,212,0.9)', animationDelay: '2.4s' }} />
            <div className="absolute bottom-[35%] left-[8%] w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse-slow"
              style={{ boxShadow: '0 0 12px rgba(192,38,211,0.9)', animationDelay: '1.2s' }} />

            {/* ── Neon light streaks (diagonal) ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-violet-500/0 via-violet-500/18 to-violet-500/0"
                style={{ transform: 'rotate(-45deg) scaleY(2) translateX(-40px)' }} />
              <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/12 to-cyan-500/0"
                style={{ transform: 'rotate(40deg) scaleY(2)' }} />
              <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-pink-500/0 via-pink-500/10 to-pink-500/0"
                style={{ transform: 'rotate(-55deg) scaleY(2) translateX(20px)' }} />
            </div>

            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_49.5%,rgba(139,92,246,0.025)_50%,transparent_50.5%)] bg-[length:100%_16px]" />
          </div>

        </div>
      </div>
    </section>
  );
}

