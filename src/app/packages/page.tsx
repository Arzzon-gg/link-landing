import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PackagesPage } from '@/components/packages/PackagesPage';
import { getPackages } from '@/lib/packages';
import { getPublicBranches, resolvePublicMenuImageUrl } from '@/lib/public-menu';

export const metadata: Metadata = {
  title: 'Packages | The Link',
  description:
    'Browse party and event packages at The Link Diner & Bowling. Birthdays, group gatherings, and celebrations with prices and capacity.',
};

export const revalidate = 300;

export default async function PackagesRoute({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string }>;
}) {
  const { branch } = await searchParams;
  const requestedBranchId = Number(branch);
  const selectedBranchId =
    Number.isFinite(requestedBranchId) && requestedBranchId > 0
      ? requestedBranchId
      : null;

  const [result, branches] = await Promise.all([
    getPackages(selectedBranchId ?? 0),
    getPublicBranches(),
  ]);

  if (!selectedBranchId && branches.length > 0) {
    redirect(`/packages?branch=${branches[0].id}`);
  }

  const resolvedResult =
    result.status === 'ready'
      ? {
          ...result,
          packages: result.packages.map((pkg) => ({
            ...pkg,
            imageUrl: resolvePublicMenuImageUrl(pkg.imageUrl) ?? pkg.imageUrl,
          })),
        }
      : result;

  return (
    <PackagesPage
      result={resolvedResult}
      branches={branches}
      selectedBranchId={selectedBranchId}
    />
  );
}
