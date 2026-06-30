'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

type SpinWheelFrameProps = {
  wheelUrl: string;
};

const INSTAGRAM_URL = 'https://www.instagram.com/thelink.world';

/**
 * Hosts the embedded Flutter wheel and listens for its "spin finished" signal.
 * Once the player finishes a spin (acknowledges the result), the wheel posts a
 * `link-wheel:finished` message and we invite them to follow us on Instagram
 * before moving them on to the menu.
 */
export function SpinWheelFrame({ wheelUrl }: SpinWheelFrameProps) {
  const router = useRouter();
  const [finished, setFinished] = useState(false);

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
        setFinished(true);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <iframe
        src={wheelUrl}
        title="Daily spin wheel"
        className="h-full w-full"
        style={{ border: 0 }}
        allow="clipboard-write"
      />

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,23,0.97),rgba(8,9,18,0.94))] p-8 text-center shadow-[0_0_60px_rgba(236,72,153,0.18)] sm:p-10"
            >
              {/* Top accent line */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent" />

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 14 }}
                className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 via-fuchsia-500/15 to-violet-500/20 ring-1 ring-fuchsia-400/30"
              >
                <Instagram className="h-8 w-8 text-fuchsia-300" />
              </motion.div>

              <h2 className="font-orbitron text-2xl font-black uppercase tracking-wide text-white">
                Follow us on Instagram
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                Stay in the loop with the latest offers, events, and updates from The Link.
              </p>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 px-6 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_28px_rgba(236,72,153,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(236,72,153,0.58)]"
              >
                <Instagram className="h-4 w-4" />
                @thelink.world
              </a>

              <button
                type="button"
                onClick={() => router.replace('/menu')}
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Continue to menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
