'use client';

import { useEffect, useState } from 'react';
import { FadeIn } from '@/components/Reveal';
import { SpinSignInGate } from '@/components/spin/SpinSignInGate';
import { buildGuestWheelUrl } from '@/lib/wheel';

/**
 * Landing-page welcome wheel — the same wheel the apps embed on Home, so it is
 * present from the start rather than hidden behind a call to action.
 *
 * A visitor sees the real wheel with the real rewards on it, but cannot spin
 * it: the embedded module posts `link-wheel:login-required` the moment they
 * tap, and this shows the sign-up / log-in prompt instead. Nothing is ever
 * spun for a guest, so there is no reward to take away from them afterwards.
 *
 * Mobile viewports only. The wheel is drawn for a phone-shaped frame — the
 * apps only ever render it at that width — and stretching it across a desktop
 * page leaves it marooned in empty space.
 *
 * The wheel is the Flutter web bundle under /wheel, which is heavy. The iframe
 * is therefore `loading="lazy"`: it sits below the fold, so the browser holds
 * the fetch until the visitor scrolls near it and the landing page's own load
 * stays unaffected — while the wheel is still simply there when reached, with
 * nothing to click first. Lazy also keeps desktop from paying for a bundle it
 * never shows: a hidden subtree is never "near the viewport", so the fetch
 * never starts.
 */
export function DailySpinSection() {
  const [signInAsked, setSignInAsked] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // The wheel is served same-origin (under /wheel/), so ignore anything
      // that didn't come from our own origin.
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      if (
        data &&
        typeof data === 'object' &&
        (data as { type?: unknown }).type === 'link-wheel:login-required'
      ) {
        setSignInAsked(true);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <section id="spin" className="px-4 py-8 sm:px-6 md:hidden">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/40" />
          <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.32em] text-white/45">
            Welcome spin
          </p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-400/35" />
        </FadeIn>

        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl">
          <iframe
            src={buildGuestWheelUrl()}
            title="Welcome spin wheel"
            loading="lazy"
            className="h-[560px] w-full sm:h-[620px]"
            style={{ border: 0 }}
          />
          {signInAsked && (
            <SpinSignInGate onDismiss={() => setSignInAsked(false)} />
          )}
        </div>
      </div>
    </section>
  );
}
