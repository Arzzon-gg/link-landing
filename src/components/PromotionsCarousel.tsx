"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/Reveal";
import { resolvePublicPromotionImageUrl } from "@/lib/public-image-url";
import type { PublicPromotion } from "@/types/menu";

const AUTO_ADVANCE_MS = 5_500;
const MANUAL_PAUSE_MS = 8_000;

export function PromotionsCarousel({
  promotions,
  placement,
}: {
  promotions: PublicPromotion[];
  placement: "home" | "menu";
}) {
  const visiblePromotions = useMemo(
    () =>
      promotions
        .map((promotion) => ({
          promotion,
          imageUrl: resolvePublicPromotionImageUrl(promotion.imageUrl),
        }))
        .filter(
          (
            promotion,
          ): promotion is {
            promotion: PublicPromotion;
            imageUrl: string;
          } => Boolean(promotion.imageUrl),
        ),
    [promotions],
  );
  const railRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoAdvancePaused, setIsAutoAdvancePaused] = useState(false);

  useEffect(() => {
    setActiveIndex((current) =>
      Math.min(current, Math.max(visiblePromotions.length - 1, 0)),
    );
  }, [visiblePromotions.length]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  function scrollToPromotion(index: number, behavior: ScrollBehavior = "smooth") {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollTo({ left: rail.clientWidth * index, behavior });
  }

  function pauseAutoAdvance() {
    if (visiblePromotions.length < 2) return;

    setIsAutoAdvancePaused(true);
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsAutoAdvancePaused(false);
      resumeTimerRef.current = null;
    }, MANUAL_PAUSE_MS);
  }

  useEffect(() => {
    if (visiblePromotions.length < 2 || isAutoAdvancePaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % visiblePromotions.length;
        scrollToPromotion(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isAutoAdvancePaused, visiblePromotions.length]);

  if (visiblePromotions.length === 0) return null;

  return (
    <section
      className="px-4 py-10 sm:px-6 lg:px-8"
      aria-labelledby={`${placement}-promotions-title`}
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-cyan-300">
                Featured today
              </p>
              <h2
                id={`${placement}-promotions-title`}
                className="mt-2 font-orbitron text-2xl font-black uppercase text-white sm:text-3xl"
              >
                Fresh from The Link
              </h2>
            </div>
            <span className="hidden text-[10px] font-black uppercase tracking-[0.22em] text-white/35 sm:block">
              Swipe to explore
            </span>
          </div>
          <div
            ref={railRef}
            className="mx-auto flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[1.6rem] [scrollbar-width:none] lg:max-w-5xl [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured promotions"
            onPointerDown={pauseAutoAdvance}
            onWheel={pauseAutoAdvance}
            onScroll={(event) => {
              const rail = event.currentTarget;
              const index = Math.round(rail.scrollLeft / rail.clientWidth);
              setActiveIndex(
                Math.max(0, Math.min(index, visiblePromotions.length - 1)),
              );
            }}
          >
            {visiblePromotions.map(({ promotion, imageUrl }, index) => (
              <article
                key={promotion.id}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${visiblePromotions.length}`}
                className="relative aspect-video min-w-full snap-start overflow-hidden bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={promotion.altText ?? "Featured promotion"}
                  loading={placement === "menu" || index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
                {promotion.altText?.trim() ? (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
                    <p className="absolute bottom-5 left-5 right-5 max-w-[92%] break-words font-orbitron text-sm font-black uppercase tracking-[0.12em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] sm:text-base">
                      {promotion.altText}
                    </p>
                  </>
                ) : null}
              </article>
            ))}
          </div>
          {visiblePromotions.length > 1 ? (
            <div className="mt-4 flex justify-center gap-2" aria-label="Promotion pages">
              {visiblePromotions.map(({ promotion }, index) => (
                <button
                  key={promotion.id}
                  type="button"
                  aria-label={`Show promotion ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    activeIndex === index
                      ? "w-7 bg-cyan-300"
                      : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                  onClick={() => {
                    pauseAutoAdvance();
                    setActiveIndex(index);
                    scrollToPromotion(index);
                  }}
                />
              ))}
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
