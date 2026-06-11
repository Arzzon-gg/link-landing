import type { Metadata } from 'next';
import { PublicMenuPage, PublicMenuStatePage } from '@/components/menu/PublicMenuPage';
import { getPublicMenu } from '@/lib/public-menu';

export const metadata: Metadata = {
  title: 'Menu | The Link',
  description:
    'Explore The Link menu: signatures, fresh plates, shareables, prices, and optional customizations in a polished display-only experience.',
};

export const revalidate = 300;

export default async function MenuPage() {
  const result = await getPublicMenu();

  if (result.status !== 'ready') {
    return <PublicMenuStatePage result={result} />;
  }

  return <PublicMenuPage menu={result.menu} />;
}
