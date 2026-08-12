'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/Reveal';
import { GuestClaimPrompt, type GuestWheelReward } from '@/components/spin/GuestClaimPrompt';
import { buildGuestWheelUrl } from '@/lib/wheel';

/**
 * Landing-page daily wheel. A visitor can spin the real wheel right here —
 * it runs against CloudHub's public wheel endpoints, so the reward it lands on
 * is a preview only and is never credited. Claiming requires an account, which
 * is what [GuestClaimPrompt] pushes once the spin finishes.
 *
 * The wheel is the Flutter web bundle under /wheel, which is far too heavy to
 * ship on every landing visit — so it is mounted only after the visitor asks
 * for it. Until then this is a static teaser.
 */
export function DailySpinSection() {
  const [started, setStarted] = useState(false);
  const [reward, setReward] = useState<GuestWheelReward | null>(null);
  const [finished, setFinished] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;

    function handleMessage(event: MessageEvent) {
      // The wheel is served same-origin (under /wheel/), so ignore anything
      // that didn't come from our own origin.
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      if (
        data &&
        typeof data === 'object' &&
        (data as { type?: unknown }).type === 'link-wheel:finished'
      ) {
        setReward((data as { reward?: GuestWheelReward }).reward ?? null);
        setFinished(true);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [started]);

  // Bring the wheel into view once it mounts — the teaser it replaces is
  // shorter, so without this the wheel can open below the fold.
  useEffect(() => {
    if (started) {
      frameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [started]);

  return (
    <section id="spin" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/40" />
          <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-white/45">
            Daily spin
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-400/35" />
        </FadeIn>

        <div
          ref={frameRef}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07070e]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(34,211,238,0.14),transparent_34%),radial-gradient(circle_at_86%_78%,rgba(139,92,246,0.14),transparent_36%)]" />

          {started ? (
            <div className="relative">
              <iframe
                src={buildGuestWheelUrl()}
                title="Daily spin wheel"
                className="h-[620px] w-full"
                style={{ border: 0 }}
              />
              {finished && (
                <GuestClaimPrompt
                  reward={reward}
                  onDismiss={() => setFinished(false)}
                />
              )}
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center gap-4 px-7 py-12 text-center lg:py-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
                No account needed
              </p>
              <h2 className="font-orbitron text-2xl font-black uppercase leading-tight text-white lg:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                  Spin the wheel
                </span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/45">
                Spin as often as you like &mdash; no account, no limit. Rewards
                are claimable once you have one, so sign up and the next spin is
                yours to keep.
              </p>

              <button
                type="button"
                onClick={() => setStarted(true)}
                className="button-sheen mt-3 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-8 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_28px_rgba(34,211,238,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(34,211,238,0.52)]"
              >
                Spin as guest
              </button>

              <Link
                href="/signup"
                className="text-xs text-white/34 transition-colors hover:text-white/60"
              >
                Or create an account for a spin you can claim
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
