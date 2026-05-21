'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  getAgeFromDateOfBirth,
  registrationSchema,
  type RegistrationInput,
} from '@/lib/validation';
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
    defaultValues: { countryCode: '961' },
    shouldUnregister: true,
  });

  const dateOfBirth = watch('dateOfBirth');
  const married = watch('married');
  const age = getAgeFromDateOfBirth(dateOfBirth);
  const showMarriageQuestion = age !== null && age > 19;
  const showAnniversaryDate = showMarriageQuestion && married === 'yes';

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
      <div className="plasma-frame relative rounded-[2.2rem] p-[6px]">
        <div className="plasma-frame__glow absolute -inset-3 rounded-[2.6rem]" />
        <div className="plasma-frame__orbit absolute inset-0 rounded-[inherit]" />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.24),rgba(255,255,255,0.02)_26%,rgba(255,255,255,0.16)_54%,rgba(255,255,255,0.03)_100%)] opacity-75" />

        <div className="scanlines relative z-10 rounded-[calc(2.2rem-6px)] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,23,0.97),rgba(8,9,18,0.94))] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="pointer-events-none absolute inset-[14px] rounded-[1.5rem] border border-white/[0.055]" />

          <div className="relative z-10 p-8 sm:p-10">
          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="text-center mb-8">
            {/* Brand logo */}
            <div className="relative mx-auto mb-5 h-28 w-28 sm:h-32 sm:w-32">
              <Image
                src="/images/ZlinkLogo.png"
                alt="Brand logo"
                fill
                priority
                className="object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
              />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
              Register to get exclusive offers! Enjoy!
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
                label="Date of Birth"
                id="dateOfBirth"
                type="date"
                placeholder=""
                autoComplete="bday"
                error={errors.dateOfBirth?.message}
                {...register('dateOfBirth')}
              />
            </motion.div>

            <AnimatePresence initial={false}>
              {showMarriageQuestion && (
                <motion.div
                  key="marital-status"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-1.5"
                >
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500">
                    Are you married?
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={cn(
                        'flex h-11 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-medium transition-all',
                        married === 'no'
                          ? 'border-violet-500/60 bg-violet-500/10 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
                          : 'border-white/[0.08] bg-white/[0.04] text-slate-300 hover:border-white/[0.16] hover:bg-white/[0.06]'
                      )}
                    >
                      <input type="radio" value="no" className="sr-only" {...register('married')} />
                      No
                    </label>

                    <label
                      className={cn(
                        'flex h-11 cursor-pointer items-center justify-center rounded-xl border px-4 text-sm font-medium transition-all',
                        married === 'yes'
                          ? 'border-violet-500/60 bg-violet-500/10 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
                          : 'border-white/[0.08] bg-white/[0.04] text-slate-300 hover:border-white/[0.16] hover:bg-white/[0.06]'
                      )}
                    >
                      <input type="radio" value="yes" className="sr-only" {...register('married')} />
                      Yes
                    </label>
                  </div>

                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-200',
                      errors.married?.message ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="text-xs text-red-400 pt-0.5">{errors.married?.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showAnniversaryDate && (
                <motion.div
                  key="anniversary-date"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <FormField
                    label="Anniversary Date"
                    id="anniversaryDate"
                    type="date"
                    placeholder=""
                    autoComplete="off"
                    error={errors.anniversaryDate?.message}
                    {...register('anniversaryDate')}
                  />
                </motion.div>
              )}
            </AnimatePresence>

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
            <motion.div variants={rowVariants} className="pt-1 flex justify-center">
              <div
                className={cn(
                  'group relative rounded-xl bg-[linear-gradient(135deg,#f472b6_0%,#c084fc_22%,#60a5fa_43%,#2dd4bf_62%,#a3e635_80%,#fb923c_100%)] p-[0.5px] shadow-[0_0_26px_rgba(192,132,252,0.14)] transition-all duration-300 w-fit',
                  isSubmitting && 'opacity-70'
                )}
              >
                <div className="pointer-events-none absolute -inset-1 rounded-[0.95rem] bg-[linear-gradient(135deg,rgba(244,114,182,0.65)_0%,rgba(192,132,252,0.55)_22%,rgba(96,165,250,0.55)_43%,rgba(45,212,191,0.5)_62%,rgba(163,230,53,0.48)_80%,rgba(251,146,60,0.58)_100%)] opacity-55 blur-md transition-opacity duration-300 group-hover:opacity-90" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    relative w-fit px-6 h-12 rounded-[10px] font-semibold text-sm tracking-wide
                    text-slate-100 overflow-hidden
                    transition-transform duration-150 active:scale-[0.98]
                    disabled:cursor-not-allowed disabled:active:scale-100
                  "
                >
                  {/* Dark metallic base */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#1f2127_0%,#0f1014_46%,#06070a_100%)]" />

                  {/* Inner edge line */}
                  <div className="absolute inset-[1px] rounded-[9px] border border-white/10" />

                  <span className="relative flex h-full items-center justify-center gap-2">
                     <Image
                      src="/images/submit-text.png"
                      alt="Submit"
                      width={80}
                      height={28}
                      className="object-contain"
                    />
                  </span>
                </button>
              </div>
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
      </div>
    </motion.div>
  );
}
