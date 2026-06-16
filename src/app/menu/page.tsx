import type { Metadata } from 'next';
import {
  PublicMenuPage,
  PublicMenuStatePage,
} from '@/components/menu/PublicMenuPage';
import { getPublicBranches, getPublicMenu } from '@/lib/public-menu';

export const metadata: Metadata = {
  title: 'Menu | The Link',
  description:
    'Explore The Link menu: starters, burgers, sushi, Lebanese classics, desserts, drinks, and a full bar — with prices.',
};

// Server-fetched menu from CloudHub (categories with images + items). Revalidated via ISR.
export const revalidate = 300;

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const { branch } = await searchParams;
  const requestedBranchId = Number(branch);
  const selectedBranchId =
    Number.isFinite(requestedBranchId) && requestedBranchId > 0
      ? requestedBranchId
      : undefined;

  const [result, branches] = await Promise.all([
    getPublicMenu(selectedBranchId),
    getPublicBranches(),
  ]);

  if (result.status === 'ready') {
    return (
      <PublicMenuPage
        menu={result.menu}
        branches={branches}
        selectedBranchId={result.menu.branch.id ?? selectedBranchId ?? null}
      />
    );
  }

  return (
    <PublicMenuStatePage
      result={result}
      branches={branches}
      selectedBranchId={selectedBranchId ?? null}
    />
  );
}
