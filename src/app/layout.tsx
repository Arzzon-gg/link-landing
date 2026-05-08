import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LINK — Early Access',
  description:
    'Be the first to experience the future of arcade gaming. Register now and secure your spot.',
  // Keep the page off public search indices during pre-launch
  robots: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#020209] text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
