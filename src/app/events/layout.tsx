import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Footer } from '@/components/landing/Footer';
import { Navbar } from '@/components/landing/Navbar';

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
