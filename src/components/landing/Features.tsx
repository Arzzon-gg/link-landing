import Image from 'next/image';
import Link from 'next/link';

const activities = [
  {
    imgSrc: '/images/bowling.png',
    title: 'BOWLING',
    subtitle: 'Strike up the fun',
    glowHex: '#7c3aed',
    imgBg: 'bg-[#0d0020]',
    borderHover: 'hover:border-violet-400/55',
    shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(124,58,237,0.4)]',
  },
  {
    imgSrc: '/images/8%20ball%20pool.png',
    title: '8 BALL POOL',
    subtitle: 'Sink it. Win it.',
    glowHex: '#0891b2',
    imgBg: 'bg-[#000e1a]',
    borderHover: 'hover:border-cyan-400/55',
    shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(8,145,178,0.4)]',
  },
  {
    imgSrc: '/images/karaoke.png',
    title: 'KARAOKE',
    subtitle: 'Sing loud. Shine bright.',
    glowHex: '#be185d',
    imgBg: 'bg-[#1a000d]',
    borderHover: 'hover:border-pink-400/55',
    shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(190,24,93,0.4)]',
  },
  {
    imgSrc: '/images/arcade.png',
    title: 'ARCADE',
    subtitle: 'Play. Compete. Repeat.',
    glowHex: '#a21caf',
    imgBg: 'bg-[#0a0020]',
    borderHover: 'hover:border-fuchsia-400/55',
    shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(162,28,175,0.4)]',
  },
  {
    imgSrc: '/images/birthday.png',
    title: 'BIRTHDAYS',
    subtitle: 'Celebrate in style.',
    glowHex: '#d97706',
    imgBg: 'bg-[#0d0600]',
    borderHover: 'hover:border-amber-400/55',
    shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(217,119,6,0.35)]',
  },
  {
    imgSrc: '/images/playground.png',
    title: 'PLAYGROUND',
    subtitle: 'Jump in. Play free.',
    glowHex: '#16a34a',
    imgBg: 'bg-[#001a08]',
    borderHover: 'hover:border-green-400/55',
    shadowHover: 'hover:shadow-[0_8px_40px_-4px_rgba(22,163,74,0.4)]',
  },
];

export function Features() {
  return (
    <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Section title ── */}
        <div className="flex items-center gap-5 justify-center mb-14">
          <div className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-green-400/65" />
          <span className="text-green-400 text-[10px] font-black tracking-[0.32em] uppercase font-orbitron whitespace-nowrap">
            ENDLESS WAYS TO HAVE FUN
          </span>
          <div className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-green-400/65" />
        </div>

        {/* ── Activity cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {activities.map((act) => (
            <div
              key={act.title}
              className={`group relative rounded-xl overflow-hidden border border-white/[0.09] bg-[#07070e] cursor-pointer transition-all duration-300 ${act.borderHover} ${act.shadowHover}`}
            >
              {/* ── Image area (replace emoji div with <Image> later) ── */}
              <div className={`relative h-48 overflow-hidden ${act.imgBg}`}>
                {/* Radial glow from center */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 75% 65% at 50% 60%, ${act.glowHex}40, transparent 70%)`,
                  }}
                />

                {/* ── Activity image ── */}
                <Image
                  src={act.imgSrc}
                  alt={act.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#07070e] to-transparent" />
                {/* Top vignette */}
                <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#07070e]/50 to-transparent" />
                {/* Top edge neon glow line */}
                <div
                  className="absolute top-0 inset-x-0 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${act.glowHex}cc, transparent)`,
                  }}
                />
              </div>

              {/* ── Text ── */}
              <div className="px-3 pb-5 pt-2.5 text-center">
                <h3 className="font-orbitron font-black text-[11px] sm:text-xs text-white uppercase tracking-wider mb-1.5 leading-tight">
                  {act.title}
                </h3>
                <p className="text-white/40 text-[10px] sm:text-[11px] leading-snug group-hover:text-white/60 transition-colors duration-300">
                  {act.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 text-center">
          <Link
            href="#activities"
            className="inline-block px-8 py-3 border border-white/20 text-white/75 text-[11px] font-black tracking-[0.28em] uppercase hover:border-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
          >
            VIEW ALL ACTIVITIES
          </Link>
        </div>

      </div>
    </section>
  );
}

