import Link from 'next/link';

const activities = [
  {
    emoji: '🎳',
    title: 'BOWLING',
    subtitle: 'Strike up the fun',
    glowColor: 'rgba(139,92,246,0.65)',
    borderClass: 'border-violet-500/25 hover:border-violet-400/65',
    shadowClass: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.22)]',
    bgGrad: 'from-violet-950/40',
  },
  {
    emoji: '🎱',
    title: '8 BALL POOL',
    subtitle: 'Sink it. Win it.',
    glowColor: 'rgba(6,182,212,0.65)',
    borderClass: 'border-cyan-500/25 hover:border-cyan-400/65',
    shadowClass: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.22)]',
    bgGrad: 'from-cyan-950/40',
  },
  {
    emoji: '🎤',
    title: 'KARAOKE',
    subtitle: 'Sing loud. Shine bright.',
    glowColor: 'rgba(236,72,153,0.65)',
    borderClass: 'border-pink-500/25 hover:border-pink-400/65',
    shadowClass: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.22)]',
    bgGrad: 'from-pink-950/40',
  },
  {
    emoji: '🕹️',
    title: 'ARCADE',
    subtitle: 'Play. Compete. Repeat.',
    glowColor: 'rgba(192,38,211,0.65)',
    borderClass: 'border-fuchsia-500/25 hover:border-fuchsia-400/65',
    shadowClass: 'hover:shadow-[0_0_40px_rgba(192,38,211,0.22)]',
    bgGrad: 'from-fuchsia-950/40',
  },
  {
    emoji: '🎂',
    title: 'BIRTHDAYS',
    subtitle: 'Celebrate in style.',
    glowColor: 'rgba(234,179,8,0.6)',
    borderClass: 'border-yellow-500/25 hover:border-yellow-400/65',
    shadowClass: 'hover:shadow-[0_0_40px_rgba(234,179,8,0.18)]',
    bgGrad: 'from-yellow-950/30',
  },
];

export function Features() {
  return (
    <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section title */}
        <div className="flex items-center gap-5 justify-center mb-14">
          <div className="flex-1 max-w-[72px] h-px bg-gradient-to-r from-transparent to-green-400/65" />
          <span className="text-green-400 text-[10px] font-black tracking-[0.32em] uppercase font-orbitron whitespace-nowrap">
            ENDLESS WAYS TO HAVE FUN
          </span>
          <div className="flex-1 max-w-[72px] h-px bg-gradient-to-l from-transparent to-green-400/65" />
        </div>

        {/* Activity cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {activities.map((act) => (
            <div
              key={act.title}
              className={`group relative rounded-xl border bg-gradient-to-b ${act.bgGrad} to-[#08080f] p-6 pt-8 pb-7 flex flex-col items-center text-center cursor-pointer transition-all duration-300 overflow-hidden ${act.borderClass} ${act.shadowClass}`}
            >
              {/* Top glow line on hover */}
              <div
                className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${act.glowColor}, transparent)` }}
              />

              <div
                className="text-5xl mb-5 transition-transform duration-300 group-hover:-translate-y-1 select-none"
                style={{ filter: `drop-shadow(0 0 14px ${act.glowColor})` }}
              >
                {act.emoji}
              </div>

              <h3 className="font-orbitron font-black text-[11px] text-white uppercase tracking-wider mb-1.5 leading-tight">
                {act.title}
              </h3>
              <p className="text-white/38 text-[11px] leading-snug group-hover:text-white/60 transition-colors duration-300">
                {act.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="#activities"
            className="inline-block px-8 py-3 border border-white/22 text-white/80 text-[11px] font-black tracking-[0.28em] uppercase hover:border-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
          >
            VIEW ALL ACTIVITIES
          </Link>
        </div>
      </div>
    </section>
  );
}
