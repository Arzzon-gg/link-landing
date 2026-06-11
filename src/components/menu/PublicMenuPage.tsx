import Image from 'next/image';
import Link from 'next/link';
import {
  buildMenuCategoryAnchor,
  getMenuItemTeaser,
  resolvePublicMenuImageUrl,
  type PublicMenuLoadResult,
} from '@/lib/public-menu';
import type { PublicMenuData } from '@/types/menu';
import { PublicMenuItemCard } from './PublicMenuItemCard';

interface PublicMenuPageProps {
  menu: PublicMenuData;
}

export function PublicMenuPage({ menu }: PublicMenuPageProps) {
  return (
    <div className="relative">
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden px-4 pt-16 sm:min-h-[340px] sm:px-6 lg:min-h-[380px] lg:px-8 lg:pt-20">
        {/* Background image */}
        <Image
          src="/images/hero-menu.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[#020209]/72" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020209] via-transparent to-[#020209]/45" />

        {/* Centered content */}
        <div className="relative z-10 mx-auto max-w-3xl py-10 text-center sm:py-14">
          <h1 className="font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            Eat inside the
            <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              arcade atmosphere.
            </span>
          </h1>

          {/* <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">
              {menu.branch.name}
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/60">
              {menu.branch.location}
            </div>
          </div> */}

          <br />
          <br />

          <a
            href="#menu-categories"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(236,72,153,0.38)] transition-all duration-300 hover:from-pink-500 hover:to-fuchsia-500 hover:shadow-[0_0_48px_rgba(236,72,153,0.58)]"
          >
            Explore the menu
            <span className="text-base leading-none">›</span>
          </a>
        </div>
      </section>

      <section id="menu-categories" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-24" />
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-cyan-300">
                Browse by category
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/60 sm:w-24" />
            </div>
          </div>

          <nav
            aria-label="Menu categories"
            className="sticky top-16 z-20 -mx-1 mb-10 flex gap-3 overflow-x-auto px-1 py-2 sm:top-20"
          >
            {menu.categories.map((category) => (
              <a
                key={category.id}
                href={`#${buildMenuCategoryAnchor(category.name, category.id)}`}
                className="group min-w-max rounded-full border border-white/10 bg-[#0a0a17]/92 px-5 py-3 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-[#0c1020]"
              >
                <div className="font-orbitron text-[11px] font-black uppercase tracking-[0.28em] text-white/86 transition-colors group-hover:text-cyan-300">
                  {category.name}
                </div>
                <div className="mt-1 text-xs text-white/38">
                  {category.items.length} {category.items.length === 1 ? 'dish' : 'dishes'}
                </div>
              </a>
            ))}
          </nav>

          {menu.categories.length ? (
            <div className="space-y-16">
              {menu.categories.map((category, index) => (
                <section
                  key={category.id}
                  id={buildMenuCategoryAnchor(category.name, category.id)}
                  className="scroll-mt-28"
                >
                  <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.25)]"
                          style={{
                            backgroundColor:
                              index % 4 === 0
                                ? '#ec4899'
                                : index % 4 === 1
                                  ? '#06b6d4'
                                  : index % 4 === 2
                                    ? '#8b5cf6'
                                    : '#39ff14',
                          }}
                        />
                        <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-white/46">
                          {category.items.length} dishes
                        </span>
                      </div>
                      <h3 className="font-orbitron text-2xl font-black uppercase text-white sm:text-3xl">
                        {category.name}
                      </h3>
                    </div>

                    <p className="max-w-lg text-sm leading-7 text-white/38">
                      Flip any card for deeper detail without stretching the whole
                      grid vertically.
                    </p>
                  </div>

                  {category.items.length ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {category.items.map((item) => (
                        <PublicMenuItemCard
                          key={item.id}
                          item={item}
                          category={category.name}
                          imageUrl={resolvePublicMenuImageUrl(item.imageUrl)}
                          priceLabel={formatCurrency(item.basePrice)}
                          teaser={getMenuItemTeaser(item.description)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[1.6rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-8 text-white/48">
                      No dishes are published in this category yet.
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
              <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-pink-400">
                Menu unavailable
              </p>
              <h3 className="mt-3 font-orbitron text-2xl font-black uppercase text-white">
                The kitchen lineup is being refreshed.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/46">
                A public menu will appear here as soon as this branch publishes its dishes.
              </p>
            </div>
          )}

          <div className="mt-16 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(10,10,25,0.92),rgba(7,7,14,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.34)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-green-300">
                Display-only experience
              </p>
              <h3 className="mt-3 font-orbitron text-2xl font-black uppercase text-white sm:text-3xl">
                No cart. No checkout. Just discovery.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/46">
                This menu is intentionally built for browsing. For bookings,
                birthdays, or pre-launch access, jump back into The Link experience.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 lg:mt-0">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_24px_rgba(236,72,153,0.35)] transition-all duration-300 hover:from-pink-500 hover:to-violet-500 hover:shadow-[0_0_38px_rgba(236,72,153,0.56)]"
              >
                Book now
                <span className="text-base leading-none">›</span>
              </Link>
              <Link
                href="/#offers"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:border-green-400/45 hover:text-green-300"
              >
                See offers
                <span className="text-base leading-none">›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PublicMenuStatePage({
  result,
}: {
  result: Extract<PublicMenuLoadResult, { status: 'unconfigured' | 'error' }>;
}) {
  const isConfigurationIssue = result.status === 'unconfigured';

  return (
    <div className="px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-8">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
            <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-pink-300">
              Public menu unavailable
            </span>
          </div>

          <h1 className="font-orbitron text-3xl font-black uppercase text-white sm:text-4xl">
            {isConfigurationIssue
              ? 'The branch menu is not configured yet.'
              : 'The branch menu could not be loaded right now.'}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
            {result.message}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:border-cyan-400/45 hover:text-cyan-300"
            >
              Back home
              <span className="text-base leading-none">›</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_24px_rgba(236,72,153,0.35)] transition-all duration-300 hover:from-pink-500 hover:to-violet-500 hover:shadow-[0_0_38px_rgba(236,72,153,0.56)]"
            >
              Book now
              <span className="text-base leading-none">›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}


