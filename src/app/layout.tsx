import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Link Diner & Bowling | Bowling, Restaurant & Arcade',
  description:
    'The Link Diner & Bowling. Bowling, restaurant, and arcade fun in Antelias and Mkalles.',
  robots: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-[#020209] text-slate-100">
        {children}
      </body>
    </html>
  );
}
