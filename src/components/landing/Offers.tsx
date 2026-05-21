import Image from 'next/image';
import Link from 'next/link';

export function Offers() {
  return (
    <section id="offers" className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Contained card — image fills this rounded box */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
          {/* Background image */}
          <Image
            src="/images/offer_bg.png"
            alt=""
            fill
            className="object-cover object-center !left-[20%]"
          />
          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[#020209]/55" />
          {/* Left edge fade so text sits cleanly */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020209]/80 via-transparent to-transparent" />
          {/* Arcade grid scanlines */}
          <div className="pointer-events-none absolute inset-0 arcade-grid opacity-15" />

          {/* Content */}
          <div className="relative z-10 py-10 px-8 lg:px-14">
            <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-14 items-center">

              {/* Left: Weekday deals */}
              <div>
                <p className="font-orbitron font-black text-base lg:text-lg text-white uppercase tracking-wide mb-2">
                  WEEKDAY DEALS
                </p>
                <div className="flex items-end gap-3 mb-3">
                  <span className="text-white/60 font-orbitron font-black text-base uppercase leading-none">UP TO</span>
                  <span
                    className="font-orbitron font-black text-6xl lg:text-7xl leading-none bg-gradient-to-b from-pink-400 to-fuchsia-600 bg-clip-text text-transparent"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.55))' }}
                  >
                    20%
                  </span>
                  <span className="text-white/60 font-orbitron font-black text-base uppercase leading-none">OFF</span>
                </div>
                <p className="text-white/35 text-[11px] font-bold tracking-[0.22em] uppercase">
                  ON SELECTED ACTIVITIES
                </p>
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
        </div>

      </div>
    </section>
  );
}
