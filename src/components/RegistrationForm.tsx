'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Zap, Loader2, AlertCircle } from 'lucide-react';

import { registrationSchema, type RegistrationInput } from '@/lib/validation';
import { FormField } from './FormField';
import { PhoneField } from './PhoneField';
import { SuccessScreen } from './SuccessScreen';
import type { ApiResponse } from '@/types/form';

// Staggered entrance for each form row
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function RegistrationForm() {
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
  });

  async function onSubmit(data: RegistrationInput) {
    setServerError(null);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await res.json();

      if (!res.ok || !result.success) {
        setServerError(result.message ?? 'Something went wrong. Please try again.');
        return;
      }

      setSubmissionId(result.submissionId ?? 'UNKNOWN');
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    }
  }

  if (submissionId) {
    return <SuccessScreen submissionId={submissionId} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Card */}
      <div className="scanlines relative rounded-2xl border border-violet-500/[0.18] bg-[rgba(10,10,25,0.92)] backdrop-blur-xl shadow-[0_0_80px_rgba(139,92,246,0.07),0_0_0_1px_rgba(139,92,246,0.05)]">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        {/* Corner brackets */}
        <div className="absolute top-3.5 left-3.5 w-5 h-5 border-l-2 border-t-2 border-violet-500/25 rounded-tl" />
        <div className="absolute top-3.5 right-3.5 w-5 h-5 border-r-2 border-t-2 border-violet-500/25 rounded-tr" />
        <div className="absolute bottom-3.5 left-3.5 w-5 h-5 border-l-2 border-b-2 border-violet-500/25 rounded-bl" />
        <div className="absolute bottom-3.5 right-3.5 w-5 h-5 border-r-2 border-b-2 border-violet-500/25 rounded-br" />

        <div className="relative z-10 p-8 sm:p-10">
          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="text-center mb-8">
            {/* Brand icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-5">
              <Gamepad2 className="w-5 h-5 text-violet-400" />
            </div>

            {/* Early Access badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-bold tracking-[0.18em] text-cyan-400 uppercase">
                  Early Access
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-black tracking-tight gradient-text mb-2.5">
              LINK
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Be the first to experience the future of arcade gaming.
              Register now and unlock your exclusive early spot.
            </p>
          </div>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Name + Age */}
            <motion.div variants={rowVariants} className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <FormField
                  label="Full Name"
                  id="name"
                  type="text"
                  placeholder="Alex Johnson"
                  autoComplete="name"
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>
              <FormField
                label="Age"
                id="age"
                type="number"
                placeholder="24"
                autoComplete="off"
                error={errors.age?.message}
                {...register('age')}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={rowVariants}>
              <FormField
                label="Email Address"
                id="email"
                type="email"
                placeholder="alex@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register('email')}
              />
            </motion.div>

            {/* Phone */}
            <motion.div variants={rowVariants}>
              <PhoneField
                countryCodeReg={register('countryCode')}
                phoneNumberReg={register('phoneNumber')}
                countryCodeError={errors.countryCode?.message}
                phoneNumberError={errors.phoneNumber?.message}
                selectedDial={watch('countryCode')}
              />
            </motion.div>

            {/* Address */}
            <motion.div variants={rowVariants}>
              <FormField
                label="Address"
                id="address"
                type="textarea"
                placeholder="Street, City, State, Country"
                autoComplete="street-address"
                error={errors.address?.message}
                {...register('address')}
              />
            </motion.div>

            {/* Server-level error banner */}
            <AnimatePresence>
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/[0.08] border border-red-500/20"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{serverError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.div variants={rowVariants} className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  relative w-full h-12 rounded-xl font-semibold text-sm tracking-wide
                  text-white overflow-hidden group
                  transition-transform duration-150 active:scale-[0.98]
                  disabled:opacity-55 disabled:cursor-not-allowed disabled:active:scale-100
                "
              >
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600" />

                {/* Hover brightening layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                {/* Edge glow */}
                <div className="absolute inset-0 rounded-xl shadow-[0_0_24px_rgba(139,92,246,0)] group-hover:shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-shadow duration-300" />

                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registering…
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Claim My Spot
                    </>
                  )}
                </span>
              </button>
            </motion.div>

            {/* Privacy note */}
            <motion.p
              variants={rowVariants}
              className="text-center text-[11px] text-slate-700 pt-1"
            >
              Your information is kept private and never sold to third parties.
            </motion.p>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}
