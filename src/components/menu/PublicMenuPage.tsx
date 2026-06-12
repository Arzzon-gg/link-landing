import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';
import {
  buildMenuCategoryAnchor,
  getMenuItemTeaser,
  resolvePublicMenuImageUrl,
  type PublicMenuLoadResult,
} from '@/lib/public-menu';
import type { PublicMenuData } from '@/types/menu';
import { MenuCategoryNav } from './MenuCategoryNav';
import { PublicMenuItemCard } from './PublicMenuItemCard';

interface PublicMenuPageProps {
  menu: PublicMenuData;
}

export function PublicMenuPage({ menu }: PublicMenuPageProps) {
  return (
    <div className="relative">
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden px-4 pt-16 sm:min-h-[340px] sm:px-6 lg:min-h-[380px] lg:px-8 lg:pt-20">
        <Image
          src="/images/hero-menu.png"
          alt=""
          fill
          sizes="100vw"
          className="scale-[1.02] object-cover object-center"
          priority
        />

        <div className="hero-aurora pointer-events-none absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-pink-500/16 blur-[85px]" />
        <div className="hero-aurora hero-aurora-delayed pointer-events-none absolute bottom-[14%] right-[9%] h-48 w-48 rounded-full bg-cyan-400/14 blur-[90px]" />
        <div className="hero-light-sweep pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[#020209]/72" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020209] via-transparent to-[#020209]/45" />

        <div className="relative z-10 mx-auto max-w-3xl py-10 text-center sm:py-14">

          <StaggerGroup className="space-y-6" delayChildren={0.06} stagger={0.1}>
            <StaggerItem>
              <h1 className="font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Eat inside the
                <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  arcade atmosphere.
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
                Browse bold plates, comfort favorites, and colorful signatures in a display
                that feels as electric as the venue itself.
              </p>
            </StaggerItem>

            <StaggerItem>
              <a
                href="#menu-categories"
                className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(236,72,153,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-500 hover:to-fuchsia-500 hover:shadow-[0_0_48px_rgba(236,72,153,0.58)]"
              >
                Explore the menu
                <span className="text-base leading-none">&gt;</span>
              </a>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section id="menu-categories" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-10 text-center">
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-24" />
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-cyan-300">
                Browse by category
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/60 sm:w-24" />
            </div>
          </FadeIn>

          <FadeIn>
            <MenuCategoryNav
              categories={menu.categories.map((category) => ({
                id: buildMenuCategoryAnchor(category.name, category.id),
                name: category.name,
                itemCount: category.items.length,
              }))}
            />
          </FadeIn>

          {menu.categories.length ? (
            <div className="space-y-16">
              {menu.categories.map((category, index) => (
                <section
                  key={category.id}
                  id={buildMenuCategoryAnchor(category.name, category.id)}
                  className="scroll-mt-28"
                >
                  <FadeIn className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
                      Flip any card for deeper detail without stretching the whole grid
                      vertically.
                    </p>
                  </FadeIn>

                  {category.items.length ? (
                    <StaggerGroup className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.1} amount={0.08}>
                      {category.items.map((item, itemIndex) => (
                        <StaggerItem key={item.id}>
                          <PublicMenuItemCard
                            item={item}
                            category={category.name}
                            imageUrl={resolvePublicMenuImageUrl(item.imageUrl)}
                            priceLabel={formatCurrency(item.basePrice)}
                            teaser={getMenuItemTeaser(item.description)}
                            priorityImage={index === 0 && itemIndex < 3}
                          />
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  ) : (
                    <FadeIn>
                      <div className="rounded-[1.6rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-8 text-white/48">
                        No dishes are published in this category yet.
                      </div>
                    </FadeIn>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <FadeIn>
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
            </FadeIn>
          )}
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
        <FadeIn>
          <div className="offer-card rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:p-8">
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
                className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:text-cyan-300"
              >
                Back home
                <span className="text-base leading-none">&gt;</span>
              </Link>
              <Link
                href="/signup"
                className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_24px_rgba(236,72,153,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-500 hover:to-violet-500 hover:shadow-[0_0_38px_rgba(236,72,153,0.56)]"
              >
                Create account
                <span className="text-base leading-none">&gt;</span>
              </Link>
            </div>
          </div>
        </FadeIn>
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
