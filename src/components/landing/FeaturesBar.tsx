import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'SAFE & CLEAN',
    desc: 'Your safety is our priority',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'EASY BOOKING',
    desc: 'Book online in just a few clicks',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'GROUPS & PARTIES',
    desc: 'Perfect for any occasion',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    title: 'BEST EXPERIENCES',
    desc: 'Top fun. Top vibes. Always.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'FAMILY FRIENDLY',
    desc: 'A place for everyone',
  },
];

export function FeaturesBar() {
  return (
    <section className="border-y border-white/[0.07] bg-[#040410]/60 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-8 text-center">
          <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-white/38">
            Why people keep coming back
          </p>
        </FadeIn>

        <StaggerGroup className="grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5" stagger={0.1}>
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/18 hover:bg-white/[0.04] hover:shadow-[0_18px_45px_-22px_rgba(34,211,238,0.28)]">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 text-white/60 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-300">
                    {feature.icon}
                  </span>
                  <div>
                    <p className="mb-1 font-orbitron text-[10px] font-black uppercase tracking-wider leading-tight text-white">
                      {feature.title}
                    </p>
                    <p className="text-[11px] leading-snug text-white/38 transition-colors duration-300 group-hover:text-white/55">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
