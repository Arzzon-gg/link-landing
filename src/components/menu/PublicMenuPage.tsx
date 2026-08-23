import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/Reveal";
import {
  buildMenuCategoryAnchor,
  getMenuItemTeaser,
  resolvePublicMenuImageUrl,
  type PublicMenuBranchOption,
  type PublicMenuLoadResult,
} from "@/lib/public-menu";
import type {
  PublicMenuCatalog,
  PublicMenuCategory,
  PublicMenuData,
  PublicMenuItem,
  PublicMenuSection,
} from "@/types/menu";
import { BranchSelector } from "./BranchSelector";
import { MenuCatalogNav } from "./MenuCatalogNav";
import { MenuCategoryNav } from "./MenuCategoryNav";
import { PublicMenuItemCard } from "./PublicMenuItemCard";
import { PromotionsCarousel } from "@/components/PromotionsCarousel";
import { ScrollToMenuItem } from "./ScrollToMenuItem";

interface PublicMenuPageProps {
  menu: PublicMenuData;
  branches: PublicMenuBranchOption[];
  selectedBranchId: number | null;
  selectedItemId?: number | null;
}

export function PublicMenuPage({
  menu,
  branches,
  selectedBranchId,
  selectedItemId = null,
}: PublicMenuPageProps) {
  const categoryAccentIndex = new Map(
    menu.categories.map((category, index) => [category.id, index]),
  );
  const catalogs = menu.menus.length
    ? menu.menus
    : [{ id: 0, name: "Main Menu", sortOrder: 0 }];
  const menuGroups = catalogs.map((catalog) => {
    const belongsToCatalog = <T extends { menuId: number | null }>(value: T) =>
      value.menuId === catalog.id || (catalog.id === 0 && value.menuId == null);
    const categories = menu.categories.filter(belongsToCatalog);
    const sections = menu.sections.filter(belongsToCatalog);
    const sectionIds = new Set(sections.map((section) => section.id));
    const visibleSections = sections
      .map((section) => ({
        ...section,
        categories: categories.filter(
          (category) => category.sectionId === section.id,
        ),
      }))
      .filter((section) => section.categories.length > 0);
    const standaloneCategories = categories.filter(
      (category) =>
        category.sectionId == null || !sectionIds.has(category.sectionId),
    );
    const uncategorizedItems = menu.uncategorizedItems.filter(belongsToCatalog);
    const itemCount = categories.reduce(
      (total, category) => total + category.items.length,
      0,
    ) + uncategorizedItems.length;

    return {
      catalog,
      categories,
      visibleSections,
      standaloneCategories,
      uncategorizedItems,
      itemCount,
    };
  });
  const allCategories = menuGroups.flatMap((group) => group.categories);
  const allUncategorizedItems = menuGroups.flatMap(
    (group) => group.uncategorizedItems,
  );

  return (
    <div className="relative min-w-0 overflow-x-clip">
      <ScrollToMenuItem itemId={selectedItemId} />
      <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden px-4 pt-16 sm:min-h-[440px] sm:px-6 lg:min-h-[520px] lg:px-8 lg:pt-20">
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
          <StaggerGroup
            className="space-y-6"
            delayChildren={0.06}
            stagger={0.1}
          >
            <StaggerItem>
              <h1 className="font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Eat inside the
                <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  arcade atmosphere.
                </span>
              </h1>
            </StaggerItem>

            {branches.length > 1 ? (
              <StaggerItem>
                <BranchSelector
                  branches={branches}
                  selectedBranchId={selectedBranchId}
                />
              </StaggerItem>
            ) : null}
          </StaggerGroup>
        </div>
      </section>

      <PromotionsCarousel
        promotions={menu.promotions}
        placement="menu"
        branchId={menu.branch.id}
      />

      <section id="menu-categories" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto min-w-0 max-w-7xl">
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
            <MenuCatalogNav
              menus={menuGroups.map((group) => ({
                id: `menu-catalog-${group.catalog.id}`,
                name: group.catalog.name,
                sectionCount: group.visibleSections.length,
                itemCount: group.itemCount,
              }))}
            />
            <MenuCategoryNav
              categories={[
                ...allCategories.map((category) => ({
                  id: buildMenuCategoryAnchor(category.name, category.id),
                  name: category.name,
                  itemCount: category.items.length,
                })),
                ...menuGroups.flatMap((group) =>
                  group.uncategorizedItems.length
                    ? [
                        {
                          id: `menu-category-uncategorized-${group.catalog.id}`,
                          name: `${group.catalog.name} · Other`,
                          itemCount: group.uncategorizedItems.length,
                        },
                      ]
                    : [],
                ),
              ]}
            />
          </FadeIn>

          {allCategories.length || allUncategorizedItems.length ? (
            <div className="space-y-16">
              {menuGroups.map((group) => (
                <MenuCatalogSection
                  key={group.catalog.id}
                  id={`menu-catalog-${group.catalog.id}`}
                  catalog={group.catalog}
                  sections={group.visibleSections}
                  standaloneCategories={group.standaloneCategories}
                  uncategorizedItems={group.uncategorizedItems}
                  categoryAccentIndex={categoryAccentIndex}
                  selectedItemId={selectedItemId}
                />
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
                  A public menu will appear here as soon as this branch
                  publishes its dishes.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}

function MenuCatalogSection({
  id,
  catalog,
  sections,
  standaloneCategories,
  uncategorizedItems,
  categoryAccentIndex,
  selectedItemId,
}: {
  id: string;
  catalog: PublicMenuCatalog;
  sections: Array<PublicMenuSection & { categories: PublicMenuCategory[] }>;
  standaloneCategories: PublicMenuCategory[];
  uncategorizedItems: PublicMenuItem[];
  categoryAccentIndex: Map<number, number>;
  selectedItemId: number | null;
}) {
  const categoryCount = sections.reduce(
    (total, section) => total + section.categories.length,
    standaloneCategories.length,
  );
  const itemCount = sections.reduce(
    (total, section) =>
      total + section.categories.reduce(
        (sectionTotal, category) => sectionTotal + category.items.length,
        0,
      ),
    standaloneCategories.reduce(
      (total, category) => total + category.items.length,
      0,
    ) + uncategorizedItems.length,
  );

  return (
    <section id={id} className="scroll-mt-28 space-y-12">
      <FadeIn className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(11,22,39,0.96),rgba(9,9,22,0.98)_55%,rgba(35,12,53,0.90))] px-6 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-orbitron text-[9px] font-black uppercase tracking-[0.3em] text-cyan-300">
              Menu collection
            </p>
            <h2 className="mt-2 font-orbitron text-3xl font-black uppercase text-white sm:text-4xl">
              {catalog.name}
            </h2>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
            {categoryCount} {categoryCount === 1 ? "category" : "categories"} · {itemCount} dishes
          </p>
        </div>
      </FadeIn>

      {sections.map((section) => (
        <section key={section.id} className="min-w-0 space-y-9">
          <FadeIn className="flex flex-col gap-3 border-l-2 border-cyan-300/55 py-1 pl-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-orbitron text-[9px] font-black uppercase tracking-[0.26em] text-cyan-300/80">
                Section
              </p>
              <h3 className="mt-1 font-orbitron text-2xl font-black uppercase text-white sm:text-3xl">
                {section.name}
              </h3>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
              {section.categories.length} {section.categories.length === 1 ? "category" : "categories"}
            </p>
          </FadeIn>
          <div className="space-y-14">
            {section.categories.map((category) => (
              <MenuCategorySection
                key={category.id}
                category={category}
                accentIndex={categoryAccentIndex.get(category.id) ?? 0}
                selectedItemId={selectedItemId}
              />
            ))}
          </div>
        </section>
      ))}

      {standaloneCategories.length ? (
        <div className="space-y-14 border-l-2 border-violet-400/45 py-1 pl-5">
          <p className="font-orbitron text-[9px] font-black uppercase tracking-[0.26em] text-violet-300/80">
            More in {catalog.name}
          </p>
          {standaloneCategories.map((category) => (
            <MenuCategorySection
              key={category.id}
              category={category}
              accentIndex={categoryAccentIndex.get(category.id) ?? 0}
              selectedItemId={selectedItemId}
            />
          ))}
        </div>
      ) : null}

      {uncategorizedItems.length ? (
        <section id={`menu-category-uncategorized-${catalog.id}`} className="scroll-mt-28">
          <FadeIn className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="font-orbitron text-[9px] font-black uppercase tracking-[0.26em] text-white/42">
                Other dishes
              </p>
              <h3 className="mt-1 font-orbitron text-2xl font-black uppercase text-white">
                Uncategorized
              </h3>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
              {uncategorizedItems.length} dishes
            </span>
          </FadeIn>
          <StaggerGroup className="grid gap-2 lg:grid-cols-2" stagger={0.05} amount={0.08}>
            {uncategorizedItems.map((item) => (
              <StaggerItem key={item.id} className="min-w-0">
                <PublicMenuItemCard
                  item={item}
                  category="Uncategorized"
                  imageUrl={resolvePublicMenuImageUrl(item.imageUrl)}
                  priceLabel={formatCurrency(item.basePrice)}
                  teaser={getMenuItemTeaser(item.description)}
                  priorityImage={false}
                  showFullDescription={selectedItemId === item.id}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      ) : null}
    </section>
  );
}

function MenuCategorySection({
  category,
  accentIndex,
  selectedItemId,
}: {
  category: PublicMenuCategory;
  accentIndex: number;
  selectedItemId: number | null;
}) {
  const accentColor =
    accentIndex % 4 === 0
      ? "#ec4899"
      : accentIndex % 4 === 1
        ? "#06b6d4"
        : accentIndex % 4 === 2
          ? "#8b5cf6"
          : "#39ff14";
  const categoryImageUrl = resolvePublicMenuImageUrl(category.imageUrl);

  return (
    <section
      id={buildMenuCategoryAnchor(category.name, category.id)}
      className="min-w-0 scroll-mt-28"
    >
      <FadeIn className="mb-7 flex items-center gap-4">
        {categoryImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={categoryImageUrl}
            alt={category.name}
            loading="lazy"
            className="h-24 w-24 flex-shrink-0 rounded-2xl border border-white/10 object-cover shadow-[0_0_28px_rgba(0,0,0,0.50)] sm:h-32 sm:w-32"
          />
        ) : null}
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.25)]"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-white/46">
              {category.items.length} dishes
            </span>
          </div>
          <h3 className="font-orbitron text-2xl font-black uppercase text-white sm:text-3xl">
            {category.name}
          </h3>
        </div>
      </FadeIn>

      {category.items.length ? (
        <StaggerGroup
          className="grid gap-2 lg:grid-cols-2"
          stagger={0.05}
          amount={0.08}
        >
          {category.items.map((item, itemIndex) => (
            <StaggerItem key={item.id} className="min-w-0">
              <PublicMenuItemCard
                item={item}
                category={category.name}
                imageUrl={resolvePublicMenuImageUrl(item.imageUrl)}
                priceLabel={formatCurrency(item.basePrice)}
                teaser={getMenuItemTeaser(item.description)}
                priorityImage={accentIndex === 0 && itemIndex < 3}
                showFullDescription={selectedItemId === item.id}
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
  );
}

export function PublicMenuStatePage({
  result,
  branches = [],
  selectedBranchId = null,
}: {
  result: Extract<PublicMenuLoadResult, { status: "unconfigured" | "error" }>;
  branches?: PublicMenuBranchOption[];
  selectedBranchId?: number | null;
}) {
  const isConfigurationIssue = result.status === "unconfigured";

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
                ? "The branch menu is not configured yet."
                : "The branch menu could not be loaded right now."}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
              {result.message}
            </p>

            {branches.length > 1 ? (
              <div className="mt-6">
                <BranchSelector
                  branches={branches}
                  selectedBranchId={selectedBranchId}
                />
              </div>
            ) : null}

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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
