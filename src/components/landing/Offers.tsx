import Link from 'next/link';

export function Offers() {
  return (
    <section id="offers" className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#06060f]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(139,92,246,0.09),transparent_70%)]" />
      {/* Neon scan lines */}
      <div className="pointer-events-none absolute inset-0 arcade-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-14 items-center">

          {/* Left: Weekday deals */}
          <div>
            <p className="text-white/40 text-[10px] font-bold tracking-[0.28em] uppercase mb-3">LIMITED TIME</p>
            <p className="font-orbitron font-black text-lg text-white uppercase tracking-wide mb-3">
              WEEKDAY DEALS
            </p>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-white/60 font-orbitron font-black text-xl uppercase leading-none">UP TO</span>
              <span
                className="font-orbitron font-black text-6xl lg:text-7xl leading-none bg-gradient-to-b from-pink-400 to-fuchsia-600 bg-clip-text text-transparent"
                style={{ textShadow: 'none', filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.55))' }}
              >
                20%
              </span>
              <span className="text-white/60 font-orbitron font-black text-xl uppercase leading-none">OFF</span>
            </div>
            <p className="text-white/35 text-[11px] font-bold tracking-[0.22em] uppercase">
              ON SELECTED ACTIVITIES
            </p>
          </div>

          {/* Center: Neon % badge */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border-2 border-pink-500/70 animate-pulse-slow"
                style={{ boxShadow: '0 0 32px rgba(236,72,153,0.55), inset 0 0 20px rgba(236,72,153,0.18)' }}
              />
              <span
                className="font-orbitron font-black text-3xl text-pink-400"
                style={{ textShadow: '0 0 18px rgba(236,72,153,0.95)' }}
              >
                %
              </span>
            </div>
          </div>

          {/* Right: More games text + CTA */}
          <div>
            <p className="font-orbitron font-black text-2xl lg:text-3xl text-white uppercase leading-tight mb-6">
              MORE{' '}
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                GAMES.
              </span>
              <br />
              MORE{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                FLAVORS.
              </span>
              <br />
              MORE{' '}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                MEMORIES.
              </span>
            </p>
            <Link
              href="#offers"
              className="inline-block px-7 py-3 border border-white/28 text-white text-[11px] font-black tracking-[0.28em] uppercase hover:border-pink-400 hover:text-pink-400 hover:shadow-[0_0_22px_rgba(236,72,153,0.3)] transition-all duration-300"
            >
              SEE OFFERS
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
