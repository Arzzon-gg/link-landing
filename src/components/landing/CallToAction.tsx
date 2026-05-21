import Link from 'next/link';

export function CallToAction() {
  return (
    <section id="food" className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">

        {/* ── Secret Teta ── */}
        <div className="group relative rounded-2xl overflow-hidden bg-[#07070e] border border-white/[0.08] hover:border-pink-500/30 transition-all duration-300">
          <div className="flex min-h-[280px]">

            {/* Left: Text */}
            <div className="flex-1 p-7 lg:p-9 flex flex-col justify-between relative z-10">
              <div>
                <p className="text-white/30 text-[10px] font-bold tracking-[0.28em] uppercase mb-3">FOOD & DRINKS</p>
                <h2 className="font-orbitron font-black text-xl lg:text-2xl text-white uppercase tracking-wide leading-tight mb-2">
                  SECRET TETA
                </h2>
                <p className="text-pink-400 text-sm font-semibold italic leading-snug mb-3">
                  Flavors that feel<br />like home
                </p>
                <p className="text-white/40 text-xs leading-relaxed">
                  Made with love,<br />just like Teta used to.
                </p>
              </div>
              <Link
                href="#food"
                className="mt-5 self-start inline-block px-5 py-2.5 border border-white/28 text-white text-[11px] font-black tracking-[0.22em] uppercase hover:border-pink-400 hover:text-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.3)] transition-all duration-300"
              >
                DISCOVER THE MENU
              </Link>
            </div>

            {/* Right: Image area — swap inner div for <Image src="..." fill alt="..."> */}
            <div className="w-[46%] relative overflow-hidden flex-shrink-0">
              {/* Gradient bleed from card bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07070e] via-transparent to-transparent z-10" />
              {/* Background color */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a0515] via-[#0e020c] to-[#07070e]" />
              {/* Radial glow */}
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 85% 80% at 60% 50%, rgba(236,72,153,0.2), transparent 70%)' }}
              />
              {/* ── Image placeholder: replace with <Image> ── */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span
                    className="text-8xl lg:text-9xl select-none block transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'drop-shadow(0 0 28px rgba(236,72,153,0.8)) drop-shadow(0 0 60px rgba(236,72,153,0.4))' }}
                  >🍔</span>
                  <span
                    className="text-5xl select-none block -mt-2"
                    style={{ filter: 'drop-shadow(0 0 18px rgba(251,146,60,0.75))' }}
                  >🍟</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Fresh & Healthy ── */}
        <div className="group relative rounded-2xl overflow-hidden bg-[#07070e] border border-white/[0.08] hover:border-green-500/30 transition-all duration-300">
          <div className="flex min-h-[280px]">

            {/* Left: Text */}
            <div className="flex-1 p-7 lg:p-9 flex flex-col justify-between relative z-10">
              <div>
                <p className="text-white/30 text-[10px] font-bold tracking-[0.28em] uppercase mb-3">HEALTHY OPTIONS</p>
                <h2 className="font-orbitron font-black text-xl lg:text-2xl uppercase tracking-wide leading-tight mb-3">
                  <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    FRESH &<br />HEALTHY
                  </span>
                </h2>
                <p className="text-white/55 text-xs leading-relaxed">
                  Goodness that fuels<br />your fun.<br />
                  Fresh choices,<br />feel good always.
                </p>
              </div>
              <Link
                href="#food"
                className="mt-5 self-start inline-block px-5 py-2.5 border border-white/28 text-white text-[11px] font-black tracking-[0.22em] uppercase hover:border-green-400 hover:text-green-400 hover:shadow-[0_0_18px_rgba(57,255,20,0.3)] transition-all duration-300"
              >
                EXPLORE HEALTHY
              </Link>
            </div>

            {/* Right: Image area — swap inner div for <Image src="..." fill alt="..."> */}
            <div className="w-[46%] relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#07070e] via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#011a08] via-[#01100a] to-[#07070e]" />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 85% 80% at 60% 50%, rgba(34,197,94,0.18), transparent 70%)' }}
              />
              {/* ── Image placeholder: replace with <Image> ── */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span
                    className="text-8xl lg:text-9xl select-none block transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'drop-shadow(0 0 28px rgba(34,197,94,0.8)) drop-shadow(0 0 60px rgba(34,197,94,0.4))' }}
                  >🥗</span>
                  <span
                    className="text-4xl select-none block mt-1"
                    style={{ filter: 'drop-shadow(0 0 16px rgba(16,185,129,0.7))' }}
                  >🌿</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

