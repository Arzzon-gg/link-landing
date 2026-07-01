'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SpinWheelFrameProps = {
  wheelUrl: string;
};

/**
 * Hosts the embedded Flutter wheel and listens for its "spin finished" signal.
 * Once the player finishes a spin (or closes the wheel), it posts a
 * `link-wheel:finished` message and we move them straight to the menu.
 */
export function SpinWheelFrame({ wheelUrl }: SpinWheelFrameProps) {
  const router = useRouter();

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
    <iframe
      src={wheelUrl}
      title="Daily spin wheel"
      className="h-full w-full"
      style={{ border: 0 }}
      allow="clipboard-write"
    />
  );
}
