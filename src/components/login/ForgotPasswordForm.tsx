'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FormField } from '@/components/FormField';
import { getFirebaseAuthClient } from '@/lib/firebase-client';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!normalized) {
      setError('Please enter your email address.');
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      // 1) Ask the backend to ensure a Firebase account exists for this email
      //    (provisions legacy users). Generic success — no account enumeration.
      await fetch('/api/account-forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized }),
      });

      // 2) Trigger Firebase's built-in reset email (Firebase hosts the reset page).
      try {
        const { auth } = getFirebaseAuthClient();
        await sendPasswordResetEmail(auth, normalized);
      } catch {
        // Swallow (e.g. user-not-found) so we don't reveal whether the email exists.
      }

      setSent(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 text-center sm:mb-10"
      >
        <h1 className="mt-12 font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl">
          Reset password
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/46 sm:text-base">
          Enter your account email and we&apos;ll send you a link to set a new password.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="plasma-frame relative rounded-[2.2rem] p-[6px]"
      >
        <div className="plasma-frame__glow absolute -inset-3 rounded-[2.6rem]" />
        <div className="plasma-frame__orbit absolute inset-0 rounded-[inherit]" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02)_26%,rgba(255,255,255,0.12)_54%,rgba(255,255,255,0.03)_100%)] opacity-75" />

        <div className="scanlines relative z-10 rounded-[calc(2.2rem-6px)] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,23,0.97),rgba(8,9,18,0.94))] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="pointer-events-none absolute inset-[14px] rounded-[1.5rem] border border-white/[0.055]" />

          <div className="relative z-10 p-8 sm:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                <p className="text-base font-semibold text-white">Check your email</p>
                <p className="max-w-sm text-sm leading-7 text-white/54">
                  If an account exists for <span className="text-white/80">{email.trim()}</span>, we&apos;ve
                  sent a link to reset your password. It may take a minute to arrive — check your spam folder too.
                </p>
                <Link
                  href="/login"
                  className="mt-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  Back to log in
                </Link>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={onSubmit}
                noValidate
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div variants={rowVariants}>
                  <FormField
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                      <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  variants={rowVariants}
                  className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-xs leading-6 text-white/34">
                    Remembered it?{' '}
                    <Link href="/login" className="text-cyan-300 transition-colors hover:text-cyan-200">
                      Back to log in
                    </Link>
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="button-sheen inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_28px_rgba(34,211,238,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(34,211,238,0.52)] disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-[220px]"
                  >
                    {submitting ? 'Sending...' : 'Send reset link'}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
