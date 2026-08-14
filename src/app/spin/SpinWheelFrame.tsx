'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GuestClaimPrompt, type GuestWheelReward } from '@/components/spin/GuestClaimPrompt';
import { RouteLoading } from '@/components/RouteLoading';

type SpinWheelFrameProps = {
  wheelUrl: string;
  /** Unauthenticated preview — nothing spun is claimable, see spin/page.tsx. */
  isGuest?: boolean;
};

/**
 * Hosts the embedded Flutter wheel and listens for its "spin finished" signal.
 * A logged-in player is moved straight to the menu. A guest instead sees a
 * sign-up/log-in prompt — their spin was never saved, so there's nothing to
 * carry over to /menu.
 */
export function SpinWheelFrame({ wheelUrl, isGuest = false }: SpinWheelFrameProps) {
  const router = useRouter();
  const [guestReward, setGuestReward] = useState<GuestWheelReward | null>(null);
  const [guestFinished, setGuestFinished] = useState(false);
  const [wheelLoaded, setWheelLoaded] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // The wheel is served same-origin (under /wheel/), so ignore anything
      // that didn't come from our own origin.
      if (event.origin !== window.location.origin) {
        return;
      }

      const data = event.data;
      if (
        data &&
        typeof data === 'object' &&
        (data as { type?: unknown }).type === 'link-wheel:finished'
      ) {
        if (isGuest) {
          const reward = (data as { reward?: GuestWheelReward }).reward ?? null;
          setGuestReward(reward);
          setGuestFinished(true);
          return;
        }
        router.replace('/menu');
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router, isGuest]);

  return (
    <div className="relative h-full w-full">
        <iframe
          src={wheelUrl}
          title="Daily spin wheel"
          className="h-full w-full"
          style={{ border: 0 }}
          allow="clipboard-write"
          onLoad={() => setWheelLoaded(true)}
        />
      {!wheelLoaded && <RouteLoading label="Loading your daily spin" overlay />}
      {guestFinished && (
        <GuestClaimPrompt
          reward={guestReward}
          onDismiss={() => setGuestFinished(false)}
        />
      )}
    </div>
  );
}
