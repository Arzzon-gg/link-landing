const features = [
  {
    icon: '🛡️',
    title: 'SAFE & CLEAN',
    desc: 'Your safety is our priority',
  },
  {
    icon: '📅',
    title: 'EASY BOOKING',
    desc: 'Book online in just a few clicks',
  },
  {
    icon: '👥',
    title: 'GROUPS & PARTIES',
    desc: 'Perfect for any occasion',
  },
  {
    icon: '⭐',
    title: 'BEST EXPERIENCES',
    desc: 'Top fun. Top vibes. Always.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'FAMILY FRIENDLY',
    desc: 'A place for everyone',
  },
];

export function FeaturesBar() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 border-y border-white/[0.07] bg-[#040410]/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-7 lg:gap-5">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5 select-none">{f.icon}</span>
              <div>
                <p className="font-orbitron font-black text-[10px] text-white uppercase tracking-wider leading-tight mb-1">
                  {f.title}
                </p>
                <p className="text-white/38 text-[11px] leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
