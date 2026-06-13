import Image from 'next/image';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';
import {
  formatMenuPrice,
  type MenuCategory,
  type MenuItem,
  type MenuSection,
} from '@/data/menu';
import { MenuCategoryNav } from './MenuCategoryNav';

const ACCENTS = ['#ec4899', '#06b6d4', '#8b5cf6', '#39ff14'];

function countItems(section: MenuSection) {
  return section.categories.reduce((total, category) => total + category.items.length, 0);
}

export function StaticMenuPage({ sections }: { sections: MenuSection[] }) {
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
                Browse bold plates, comfort favorites, sushi, Lebanese classics, and a full bar —
                all in one place.
              </p>
            </StaggerItem>

            <StaggerItem>
              <a
                href="#menu-sections"
                className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(236,72,153,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-500 hover:to-fuchsia-500 hover:shadow-[0_0_48px_rgba(236,72,153,0.58)]"
              >
                Explore the menu
                <span className="text-base leading-none">&gt;</span>
              </a>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <section id="menu-sections" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn className="mb-8 text-center">
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-20" />
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-cyan-300">
                Browse by section
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/60 sm:w-20" />
            </div>
          </FadeIn>

          <FadeIn>
            <MenuCategoryNav
              categories={sections.map((section) => ({
                id: section.id,
                name: section.name,
                itemCount: countItems(section),
              }))}
            />
          </FadeIn>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <FadeIn className="mb-6 flex flex-col gap-1 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="font-orbitron text-3xl font-black uppercase sm:text-4xl">
                    <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {section.name}
                    </span>
                  </h2>
                  {section.tagline ? (
                    <p className="text-sm text-white/40">{section.tagline}</p>
                  ) : null}
                </FadeIn>

                <StaggerGroup className="space-y-5" stagger={0.06} amount={0.05}>
                  {section.categories.map((category, index) => (
                    <StaggerItem key={category.id}>
                      <CategoryBlock category={category} accent={ACCENTS[index % ACCENTS.length]} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </section>
            ))}
          </div>

          <FadeIn className="mt-16 text-center">
            <p className="text-xs leading-6 text-white/35">
              Prices in USD and subject to change. Please ask our staff about allergens.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

function CategoryBlock({ category, accent }: { category: MenuCategory; accent: string }) {
  const twoColumn = Boolean(category.priceColumns);

  return (
    <div
      id={category.id}
      className="scroll-mt-28 rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.25)]"
          style={{ backgroundColor: accent }}
        />
        <h3 className="font-orbitron text-lg font-black uppercase tracking-wide text-white sm:text-xl">
          {category.name}
        </h3>
        {twoColumn && category.priceColumns ? (
          <div className="ml-auto hidden shrink-0 gap-4 text-right sm:flex">
            {category.priceColumns.map((label) => (
              <span
                key={label}
                className="w-16 font-orbitron text-[9px] font-black uppercase tracking-[0.18em] text-white/40"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {category.note ? (
        <p className="mt-2 text-xs leading-5 text-white/45">{category.note}</p>
      ) : null}

      <ul className="mt-3 divide-y divide-white/[0.06]">
        {category.items.map((item, index) => (
          <ItemRow
            key={`${item.name}-${index}`}
            item={item}
            columns={category.priceColumns}
          />
        ))}
      </ul>
    </div>
  );
}

function ItemRow({ item, columns }: { item: MenuItem; columns?: [string, string] }) {
  return (
    <li className="flex items-baseline justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <span className="text-[15px] font-medium leading-snug text-white/90">{item.name}</span>
        {item.description ? (
          <p className="mt-0.5 text-xs leading-5 text-white/40">{item.description}</p>
        ) : null}
      </div>

      {columns ? (
        <div className="flex shrink-0 gap-4 text-right tabular-nums">
          <PriceCell value={item.price} mobileLabel={columns[0]} />
          <PriceCell value={item.price2} mobileLabel={columns[1]} />
        </div>
      ) : (
        <span className="shrink-0 font-orbitron text-sm font-black tabular-nums text-cyan-300">
          {item.price != null ? formatMenuPrice(item.price) : ''}
        </span>
      )}
    </li>
  );
}

function PriceCell({ value, mobileLabel }: { value?: number; mobileLabel: string }) {
  return (
    <span className="w-16 font-orbitron text-sm font-black text-cyan-300">
      {value != null ? (
        <>
          <span className="mr-1 align-middle text-[8px] font-black uppercase tracking-wider text-white/30 sm:hidden">
            {mobileLabel.slice(0, 3)}
          </span>
          {formatMenuPrice(value)}
        </>
      ) : (
        <span className="text-white/20">—</span>
      )}
    </span>
  );
}
