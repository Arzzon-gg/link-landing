import type { Metadata } from 'next';
import { EventsPage } from '@/components/events/EventsPage';
import { getEvents } from '@/lib/events';

export const metadata: Metadata = {
  title: 'Events | The Link',
  description:
    'Browse party and event packages at The Link Diner & Bowling. Birthdays, group gatherings, and celebrations with prices and capacity.',
};

export const revalidate = 300;

export default async function EventsRoute() {
  const result = await getEvents();

  return <EventsPage result={result} />;
}
