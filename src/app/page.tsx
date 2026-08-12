import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { CallToAction } from '@/components/landing/CallToAction';
import { DailySpinSection } from '@/components/landing/DailySpinSection';
import { FeaturesBar } from '@/components/landing/FeaturesBar';
import { Offers } from '@/components/landing/Offers';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DailySpinSection />
        <CallToAction />
        <FeaturesBar />
        <Offers />
      </main>
      <Footer />
    </>
  );
}
