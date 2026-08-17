'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

type SpinSignInGateProps = {
  /**
   * Closes the prompt and returns to the wheel. Nothing was spent to get here
   * — the visitor only tapped a wheel they were never able to spin — so this
   * must be escapable rather than a wall.
   */
  onDismiss?: () => void;
};

/**
 * Shown when a signed-out visitor tries to spin the embedded wheel. The wheel
 * behind it is real and its rewards are real; what needs an account is landing
 * on one. So this asks for the account instead of running a spin whose prize
 * would then have to be taken back.
 */
export function SpinSignInGate({ onDismiss }: SpinSignInGateProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,23,0.97),rgba(8,9,18,0.96))] p-8 text-center shadow-[0_0_60px_rgba(34,211,238,0.15)]"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/12">
          <Lock className="h-7 w-7 text-cyan-300" strokeWidth={2.2} />
        </div>

        <p className="mt-5 font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300/80">
          Members only
        </p>

        <h2 className="mt-3 font-orbitron text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
          Sign in to spin
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/50">
          The daily wheel is part of your Link account. Sign up or log in to
          spin it — and to keep whatever it lands on.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="button-sheen inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_28px_rgba(34,211,238,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(34,211,238,0.52)]"
          >
            Sign up
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/[0.03] px-6 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/[0.05] hover:text-cyan-200"
          >
            Log in
          </Link>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="mt-5 block w-full text-xs text-white/34 transition-colors hover:text-white/60"
          >
            Maybe later
          </button>
        )}

        <Link
          href="/menu"
          className="mt-3 block text-xs text-white/34 transition-colors hover:text-white/60"
        >
          Just browse the menu instead
        </Link>
      </motion.div>
    </div>
  );
}
