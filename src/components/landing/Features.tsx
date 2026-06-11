import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';

const activities = [
  {
    imgSrc: '/images/bowling.png',
    title: 'BOWLING',
    subtitle: 'Strike up the fun',
    glowHex: '#7c3aed',
    imgBg: 'bg-[#0d0020]',
    borderHover: 'hover:border-violet-400/55',
    shadowHover: 'hover:shadow-[0_16px_50px_-10px_rgba(124,58,237,0.46)]',
  },
  {
    imgSrc: '/images/8%20ball%20pool.png',
    title: '8 BALL POOL',
    subtitle: 'Sink it. Win it.',
    glowHex: '#0891b2',
    imgBg: 'bg-[#000e1a]',
    borderHover: 'hover:border-cyan-400/55',
    shadowHover: 'hover:shadow-[0_16px_50px_-10px_rgba(8,145,178,0.42)]',
  },
  {
    imgSrc: '/images/karaoke.png',
    title: 'KARAOKE',
    subtitle: 'Sing loud. Shine bright.',
    glowHex: '#be185d',
    imgBg: 'bg-[#1a000d]',
    borderHover: 'hover:border-pink-400/55',
    shadowHover: 'hover:shadow-[0_16px_50px_-10px_rgba(190,24,93,0.42)]',
  },
  {
    imgSrc: '/images/arcade.png',
    title: 'ARCADE',
    subtitle: 'Play. Compete. Repeat.',
    glowHex: '#a21caf',
    imgBg: 'bg-[#0a0020]',
    borderHover: 'hover:border-fuchsia-400/55',
    shadowHover: 'hover:shadow-[0_16px_50px_-10px_rgba(162,28,175,0.42)]',
  },
  {
    imgSrc: '/images/birthday.png',
    title: 'BIRTHDAYS',
    subtitle: 'Celebrate in style.',
    glowHex: '#d97706',
    imgBg: 'bg-[#0d0600]',
    borderHover: 'hover:border-amber-400/55',
    shadowHover: 'hover:shadow-[0_16px_50px_-10px_rgba(217,119,6,0.38)]',
  },
  {
    imgSrc: '/images/playground.png',
    title: 'PLAYGROUND',
    subtitle: 'Jump in. Play free.',
    glowHex: '#16a34a',
    imgBg: 'bg-[#001a08]',
    borderHover: 'hover:border-green-400/55',
    shadowHover: 'hover:shadow-[0_16px_50px_-10px_rgba(22,163,74,0.42)]',
  },
];

export function Features() {
  return (
    <section id="activities" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14">
          <div className="flex items-center justify-center gap-5">
            <div className="h-px max-w-[80px] flex-1 bg-gradient-to-r from-transparent to-green-400/65" />
            <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-green-400 whitespace-nowrap">
              ENDLESS WAYS TO HAVE FUN
            </span>
            <div className="h-px max-w-[80px] flex-1 bg-gradient-to-l from-transparent to-green-400/65" />
          </div>
        </FadeIn>

        <StaggerGroup
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.1}
          amount={0.12}
        >
          {activities.map((activity) => (
            <StaggerItem key={activity.title}>
              <div
                className={`feature-card group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.09] bg-[#07070e] transition-all duration-300 ${activity.borderHover} ${activity.shadowHover}`}
              >
                <div className={`relative h-48 overflow-hidden ${activity.imgBg}`}>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse 75% 65% at 50% 60%, ${activity.glowHex}40, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute inset-x-4 top-4 h-px opacity-75"
                    style={{
                      background: `linear-gradient(to right, transparent, ${activity.glowHex}, transparent)`,
                    }}
                  />
                  <div
                    className="absolute -right-10 top-3 h-20 w-20 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: `${activity.glowHex}45`, opacity: 0.4 }}
                  />

                  <Image
                    src={activity.imgSrc}
                    alt={activity.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_26%,transparent_68%,rgba(2,2,9,0.8)_100%)] opacity-70" />
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#07070e] to-transparent" />
                  <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#07070e]/50 to-transparent" />
                </div>

                <div className="px-3 pb-5 pt-3 text-center">
                  <h3 className="mb-1.5 font-orbitron text-[11px] font-black uppercase tracking-wider text-white sm:text-xs">
                    {activity.title}
                  </h3>
                  <p className="text-[10px] leading-snug text-white/40 transition-colors duration-300 group-hover:text-white/65 sm:text-[11px]">
                    {activity.subtitle}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeIn className="mt-10 text-center" delay={0.08}>
          <Link
            href="#activities"
            className="button-sheen inline-block overflow-hidden border border-white/20 px-8 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-white/[0.03] hover:text-white hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]"
          >
            VIEW ALL ACTIVITIES
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
