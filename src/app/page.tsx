import { ArcadeBackground } from "@/components/ArcadeBackground";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CallToAction } from "@/components/landing/CallToAction";
import { FeaturesBar } from "@/components/landing/FeaturesBar";
import { Footer } from "@/components/landing/Footer";
import { PromotionsCarousel } from "@/components/PromotionsCarousel";
import { getPublicMenu } from "@/lib/public-menu";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const promotionsResult = await getPublicMenu();
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CallToAction />
        <FeaturesBar />
        {promotionsResult.status === "ready" ? (
          <PromotionsCarousel
            promotions={promotionsResult.menu.promotions}
            placement="home"
            branchId={promotionsResult.menu.branch.id}
          />
        ) : null}
      </main>
      <Footer />
    </>
  );
}
