import Link from 'next/link';

export function CallToAction() {
  return (
    <section id="food" className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">

        {/* ── Secret Teta ── */}
        <div className="group relative rounded-2xl overflow-hidden bg-[#08080f] border border-white/[0.08] min-h-[260px] flex flex-col justify-between p-8 lg:p-10 hover:border-pink-500/30 transition-all duration-300">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_80%_50%,rgba(236,72,153,0.1),transparent_70%)]" />

          {/* Decorative food emoji */}
          <div className="pointer-events-none select-none absolute right-5 top-1/2 -translate-y-1/2">
            <div
              className="text-7xl opacity-65"
              style={{ filter: 'drop-shadow(0 0 24px rgba(236,72,153,0.65))' }}
            >
              🍔
            </div>
            <div
              className="text-4xl opacity-55 -mt-3 ml-4"
              style={{ filter: 'drop-shadow(0 0 16px rgba(236,72,153,0.5))' }}
            >
              🍟
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-white/35 text-[10px] font-bold tracking-[0.28em] uppercase mb-3">FOOD & DRINKS</p>
            <h2 className="font-orbitron font-black text-2xl lg:text-3xl text-white uppercase tracking-wide leading-tight mb-2">
              SECRET TETA
            </h2>
            <p className="text-pink-400 text-[15px] font-semibold italic leading-snug mb-3">
              Flavors that feel<br />like home
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Made with love,<br />just like Teta used to.
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <Link
              href="#food"
              className="inline-block px-5 py-2.5 border border-white/28 text-white text-[11px] font-black tracking-[0.22em] uppercase hover:border-pink-400 hover:text-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.3)] transition-all duration-300"
            >
              DISCOVER THE MENU
            </Link>
          </div>
        </div>

        {/* ── Fresh & Healthy ── */}
        <div className="group relative rounded-2xl overflow-hidden bg-[#08080f] border border-white/[0.08] min-h-[260px] flex flex-col justify-between p-8 lg:p-10 hover:border-green-500/30 transition-all duration-300">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_80%_50%,rgba(57,255,20,0.07),transparent_70%)]" />

          {/* Decorative food emoji */}
          <div className="pointer-events-none select-none absolute right-7 top-1/2 -translate-y-1/2">
            <div
              className="text-7xl opacity-65"
              style={{ filter: 'drop-shadow(0 0 24px rgba(57,255,20,0.55))' }}
            >
              🥗
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-white/35 text-[10px] font-bold tracking-[0.28em] uppercase mb-3">HEALTHY OPTIONS</p>
            <h2 className="font-orbitron font-black text-2xl lg:text-3xl uppercase tracking-wide leading-tight mb-3">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                FRESH &<br />HEALTHY
              </span>
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Goodness that fuels<br />your fun.<br />
              Fresh choices,<br />feel good always.
            </p>
          </div>

          <div className="relative z-10 mt-6">
            <Link
              href="#food"
              className="inline-block px-5 py-2.5 border border-white/28 text-white text-[11px] font-black tracking-[0.22em] uppercase hover:border-green-400 hover:text-green-400 hover:shadow-[0_0_18px_rgba(57,255,20,0.3)] transition-all duration-300"
            >
              EXPLORE HEALTHY
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
