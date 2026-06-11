import Image from 'next/image';
import Link from 'next/link';
import {
  buildMenuCategoryAnchor,
  getMenuItemTeaser,
  resolvePublicMenuImageUrl,
  type PublicMenuLoadResult,
} from '@/lib/public-menu';
import type { PublicMenuCategory, PublicMenuData } from '@/types/menu';
import { PublicMenuItemCard } from './PublicMenuItemCard';

interface PublicMenuPageProps {
  menu: PublicMenuData;
}

export function PublicMenuPage({ menu }: PublicMenuPageProps) {
  const stats = getMenuStats(menu.categories);

  return (
    <div className="relative">
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_28%_at_18%_18%,rgba(236,72,153,0.18),transparent_72%),radial-gradient(ellipse_38%_24%_at_85%_26%,rgba(6,182,212,0.12),transparent_72%),linear-gradient(180deg,rgba(2,2,9,0.15)_0%,rgba(2,2,9,0)_38%,rgba(2,2,9,0.75)_100%)]" />
        <div className="pointer-events-none absolute right-0 top-12 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#39ff14] shadow-[0_0_14px_rgba(57,255,20,0.75)]" />
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-white/72">
                Public food showcase
              </span>
            </div>

            <h1 className="max-w-4xl font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Eat inside the
              <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                arcade atmosphere.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/52 sm:text-base">
              One public branch menu, served as a clean display-only experience.
              Browse signatures, fresh plates, and optional add-ons without carts,
              payment steps, or ordering noise.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300">
                {menu.branch.name}
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/60">
                {menu.branch.location}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#menu-categories"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(236,72,153,0.38)] transition-all duration-300 hover:from-pink-500 hover:to-fuchsia-500 hover:shadow-[0_0_48px_rgba(236,72,153,0.58)]"
              >
                Explore the menu
                <span className="text-base leading-none">›</span>
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-white/22 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:border-cyan-400/45 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
              >
                Book your experience
                <span className="text-base leading-none">›</span>
              </Link>
            </div>
          </div>

          <div className="relative rounded-[1.75rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,26,0.94),rgba(7,7,16,0.94))] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.14),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_38%)]" />
            <div className="relative grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[220px] overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#090914]">
                <Image
                  src="/images/burger.png"
                  alt="The Link signature burger"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 40vw, 24rem"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070e] via-[#07070e]/18 to-transparent" />
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.02] p-5">
                <div>
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#39ff14]">
                    Single branch menu
                  </p>
                  <h2 className="font-orbitron text-2xl font-black uppercase leading-tight text-white">
                    Browse first,
                    <span className="block text-pink-400">then come hungry.</span>
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/44">
                    Compact cards on the front. Flip each dish to inspect chef notes
                    and customization options.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Categories" value={stats.categories} />
                  <StatCard label="Dishes" value={stats.items} />
                  <StatCard label="Add-ons" value={stats.modifiers} />
                  <StatCard label="Paused" value={stats.unavailableItems} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu-categories" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-5">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/60" />
                <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-cyan-300">
                  Browse by category
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400/60" />
              </div>
              <h2 className="font-orbitron text-3xl font-black uppercase text-white sm:text-4xl">
                A tighter, cleaner menu.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/44 sm:text-base">
                Fast to scan at a glance, but still deep enough to reveal every
                dish description and optional customization when you want it.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/55">
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white/70">
                Updated
              </span>
              <div className="mt-1 font-semibold text-white">
                {formatMenuDate(menu.generatedAtUtc)}
              </div>
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
                    <div className="grid gap-6 md:grid-cols-2">
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

function getMenuStats(categories: PublicMenuCategory[]) {
  const items = categories.flatMap((category) => category.items);
  const modifiers = items.flatMap((item) => item.modifiers);

  return {
    categories: categories.length,
    items: items.length,
    modifiers: modifiers.length,
    unavailableItems: items.filter((item) => !item.isAvailable).length,
  };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatMenuDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#090913]/80 p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/38">
        {label}
      </p>
      <p className="mt-2 font-orbitron text-xl font-black text-white">{value}</p>
    </div>
  );
}
