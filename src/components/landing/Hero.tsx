import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';

const badges = [
  {
    label: 'ALL AGES',
    icon: (
      <svg
        className="h-[15px] w-[15px] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
      <svg
        className="h-[15px] w-[15px] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
      <svg
        className="h-[15px] w-[15px] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
      <svg
        className="h-[15px] w-[15px] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <Image
        src="/images/hero.png"
        alt="The Link Diner & Bowling arcade experience"
        fill
        className="scale-[1.02] object-cover object-center"
        priority
      />

      <div className="hero-aurora pointer-events-none absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-pink-500/18 blur-[80px]" />
      <div className="hero-aurora hero-aurora-delayed pointer-events-none absolute bottom-[16%] right-[10%] h-52 w-52 rounded-full bg-cyan-400/14 blur-[95px]" />
      <div className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#020209]/92 via-[#020209]/58 lg:via-[#020209]/24 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020209]/36 via-transparent to-[#020209]/58" />
      <div className="hero-light-sweep pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-[580px]">
          <FadeIn delay={0.05}>
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.34em] text-white/58 shadow-[0_0_32px_rgba(6,182,212,0.08)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]" />
              Beirut's social arcade
            </div>
          </FadeIn>

          <StaggerGroup className="space-y-6" delayChildren={0.08} stagger={0.1}>
            <StaggerItem>
              <div className="space-y-1">
                <h1 className="font-orbitron text-5xl font-black uppercase leading-[1.02] text-white sm:text-6xl xl:text-7xl">
                  MORE THAN
                  <br />
                  A PLACE.
                </h1>
                <h1 className="bg-gradient-to-r from-[#39ff14] via-cyan-400 to-blue-400 bg-clip-text font-orbitron text-5xl font-black uppercase leading-[1.02] text-transparent sm:text-6xl xl:text-7xl">
                  IT&apos;S A VIBE.
                </h1>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="max-w-md text-xs font-bold uppercase leading-loose tracking-[0.22em] text-white/55 sm:text-[13px]">
                Play. Eat. Celebrate.
                <br />
                All connected.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 px-7 py-3.5 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_28px_rgba(236,72,153,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(236,72,153,0.7)]"
                >
                  BOOK YOUR EXPERIENCE <span className="text-base leading-none">›</span>
                </Link>
                <Link
                  href="#activities"
                  className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/40 bg-white/[0.02] px-7 py-3.5 text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-white/[0.06] hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]"
                >
                  EXPLORE ACTIVITIES <span className="text-base leading-none">›</span>
                </Link>
              </div>
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup
            className="mt-10 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-7"
            delayChildren={0.28}
            stagger={0.08}
          >
            {badges.map((badge) => (
              <StaggerItem key={badge.label}>
                <div className="group flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/[0.05] hover:text-white">
                  <span className="text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
