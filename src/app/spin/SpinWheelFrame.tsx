'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RouteLoading } from '@/components/RouteLoading';

type SpinWheelFrameProps = {
  wheelUrl: string;
};

/**
 * Hosts the embedded Flutter wheel and listens for its "spin finished" signal,
 * then moves the player on to the menu. Only ever rendered for a signed-in
 * player — see spin/page.tsx.
 */
export function SpinWheelFrame({ wheelUrl }: SpinWheelFrameProps) {
  const router = useRouter();
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
        router.replace('/menu');
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return (
    <div className="relative h-full w-full">
      <iframe
        src={wheelUrl}
        title="Welcome spin wheel"
        className="h-full w-full"
        style={{ border: 0 }}
        allow="clipboard-write"
        onLoad={() => setWheelLoaded(true)}
      />
      {!wheelLoaded && <RouteLoading label="Loading your welcome spin" overlay />}
    </div>
  );
}
