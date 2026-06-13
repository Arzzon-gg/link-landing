import type { Metadata } from 'next';
import { StaticMenuPage } from '@/components/menu/StaticMenuPage';
import { MENU_SECTIONS } from '@/data/menu';

export const metadata: Metadata = {
  title: 'Menu | The Link',
  description:
    'Explore The Link menu: starters, burgers, sushi, Lebanese classics, desserts, drinks, and a full bar — with prices.',
};

// Static, display-only menu sourced from the venue menu (no backend / server-side menu fetch).
export default function MenuPage() {
  return <StaticMenuPage sections={MENU_SECTIONS} />;
}
