import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';

export function Offers() {
  return (
    <section id="offers" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="offer-card relative overflow-hidden rounded-[28px] border border-white/[0.08]">
            <Image
              src="/images/offer_bg.png"
              alt=""
              fill
              className="object-cover object-center !left-[20%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#020209]/58" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020209]/82 via-[#020209]/16 to-transparent" />
            <div className="pointer-events-none absolute inset-0 arcade-grid opacity-[0.14]" />
            <div className="offer-glow pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute -right-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-pink-500/18 blur-[90px]" />

            <div className="relative z-10 px-8 py-10 lg:px-14">
              <div className="mb-6 flex items-center justify-between gap-4">
                <FadeIn className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/55">
                  <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_16px_rgba(244,114,182,0.9)]" />
                  Limited-time offer
                </FadeIn>
              </div>

              <StaggerGroup className="grid items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-14" stagger={0.14}>
                <StaggerItem x={-28}>
                  <div>
                    <p className="mb-2 font-orbitron text-base font-black uppercase tracking-wide text-white lg:text-lg">
                      WEEKDAY DEALS
                    </p>
                    <div className="mb-3 flex items-end gap-3">
                      <span className="font-orbitron text-base font-black uppercase leading-none text-white/60">
                        UP TO
                      </span>
                      <span
                        className="font-orbitron text-6xl font-black leading-none text-transparent lg:text-7xl bg-gradient-to-b from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text"
                        style={{ filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.55))' }}
                      >
                        20%
                      </span>
                      <span className="font-orbitron text-base font-black uppercase leading-none text-white/60">
                        OFF
                      </span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/35">
                      ON SELECTED ACTIVITIES
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem x={28}>
                  <div>
                    <p className="mb-6 font-orbitron text-2xl font-black uppercase leading-tight text-white lg:text-3xl">
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
                      href="/menu"
                      className="button-sheen inline-block overflow-hidden border border-white/28 px-7 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400 hover:text-pink-300 hover:shadow-[0_0_24px_rgba(236,72,153,0.3)]"
                    >
                      SEE THE MENU
                    </Link>
                  </div>
                </StaggerItem>
              </StaggerGroup>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
