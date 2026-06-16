import type { Metadata } from 'next';
import { EventsPage } from '@/components/events/EventsPage';
import { getEvents } from '@/lib/events';
import { getPublicBranches } from '@/lib/public-menu';

export const metadata: Metadata = {
  title: 'Events | The Link',
  description:
    'Browse party and event packages at The Link Diner & Bowling. Birthdays, group gatherings, and celebrations with prices and capacity.',
};

export const revalidate = 300;

export default async function EventsRoute({
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
    getEvents(selectedBranchId ?? 0),
    getPublicBranches(),
  ]);

  return (
    <EventsPage
      result={result}
      branches={branches}
      selectedBranchId={selectedBranchId}
    />
  );
}
