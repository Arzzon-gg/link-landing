import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';

export function CallToAction() {
  return (
    <section id="food" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-400/40" />
          <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-white/45">
            Signature flavors
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400/35" />
        </FadeIn>

        <StaggerGroup className="grid gap-5 md:grid-cols-2" stagger={0.14}>
          <StaggerItem>
            <div className="group cta-panel relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07070e] transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/32 hover:shadow-[0_24px_55px_-22px_rgba(236,72,153,0.45)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(236,72,153,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_34%,rgba(255,255,255,0.02)_100%)]" />
              <div className="flex min-h-[280px]">
                <div className="relative z-10 flex flex-1 flex-col justify-between p-7 lg:p-9">
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
                      FOOD & DRINKS
                    </p>
                    <h2 className="mb-2 font-orbitron text-xl font-black uppercase tracking-wide text-white lg:text-2xl">
                      SECRET TETA
                    </h2>
                    <p className="mb-3 text-sm font-semibold italic leading-snug text-pink-400">
                      Flavors that feel
                      <br />
                      like home
                    </p>
                    <p className="text-xs leading-relaxed text-white/40">
                      Made with love,
                      <br />
                      just like Teta used to.
                    </p>
                  </div>
                  <Link
                    href="/menu"
                    className="button-sheen mt-5 inline-block self-start overflow-hidden border border-white/28 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400 hover:text-pink-300 hover:shadow-[0_0_24px_rgba(236,72,153,0.24)]"
                  >
                    DISCOVER THE MENU
                  </Link>
                </div>

                <div className="relative w-[46%] flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#07070e] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1a0515] via-[#0e020c] to-[#07070e]" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(ellipse 85% 80% at 60% 50%, rgba(236,72,153,0.24), transparent 70%)',
                    }}
                  />
                  <Image
                    src="/images/burger.png"
                    alt="Secret Teta food"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="group cta-panel relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07070e] transition-all duration-300 hover:-translate-y-1 hover:border-green-500/32 hover:shadow-[0_24px_55px_-22px_rgba(34,197,94,0.4)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(34,197,94,0.14),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_34%,rgba(255,255,255,0.02)_100%)]" />
              <div className="flex min-h-[280px]">
                <div className="relative z-10 flex flex-1 flex-col justify-between p-7 lg:p-9">
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
                      HEALTHY OPTIONS
                    </p>
                    <h2 className="mb-3 font-orbitron text-xl font-black uppercase tracking-wide leading-tight lg:text-2xl">
                      <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                        FRESH &
                        <br />
                        HEALTHY
                      </span>
                    </h2>
                    <p className="text-xs leading-relaxed text-white/55">
                      Goodness that fuels
                      <br />
                      your fun.
                      <br />
                      Fresh choices,
                      <br />
                      feel good always.
                    </p>
                  </div>
                  <Link
                    href="/menu"
                    className="button-sheen mt-5 inline-block self-start overflow-hidden border border-white/28 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-green-400 hover:text-green-300 hover:shadow-[0_0_24px_rgba(57,255,20,0.22)]"
                  >
                    EXPLORE HEALTHY
                  </Link>
                </div>

                <div className="relative w-[46%] flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#07070e] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#011a08] via-[#01100a] to-[#07070e]" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(ellipse 85% 80% at 60% 50%, rgba(34,197,94,0.22), transparent 70%)',
                    }}
                  />
                  <Image
                    src="/images/fresh%20%26%20healthy.png"
                    alt="Fresh and healthy food"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
