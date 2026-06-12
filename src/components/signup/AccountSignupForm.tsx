'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/FormField';
import { PhoneField } from '@/components/PhoneField';
import {
  accountSignupSchema,
  type AccountSignupInput,
} from '@/lib/account-signup-validation';
import { getAgeFromDateOfBirth } from '@/lib/validation';
import { cn } from '@/lib/utils';
import type { AccountSignupApiResponse } from '@/types/signup';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

type CreatedAccountState = {
  name: string;
  email: string;
  userId?: number;
};

export function AccountSignupForm() {
  const [createdAccount, setCreatedAccount] = useState<CreatedAccountState | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AccountSignupInput>({
    resolver: zodResolver(accountSignupSchema),
    defaultValues: {
      countryCode: '961',
      phoneNumber: '',
      dateOfBirth: '',
      marriageDate: '',
      address: '',
    },
    shouldUnregister: true,
  });

  const dateOfBirth = watch('dateOfBirth');
  const married = watch('married');
  const age = getAgeFromDateOfBirth(dateOfBirth || undefined);
  const showMarriageQuestion = age !== null && age >= 18;
  const showMarriageDate = showMarriageQuestion && married === 'yes';

  async function onSubmit(data: AccountSignupInput) {
    setServerError(null);

    try {
      const response = await fetch('/api/account-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as AccountSignupApiResponse;

      if (!response.ok || !result.success) {
        setServerError(result.message ?? 'Something went wrong. Please try again.');
        return;
      }

      setCreatedAccount({
        name: data.name,
        email: data.email,
        userId: result.userId,
      });
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    }
  }

  if (createdAccount) {
    return <AccountSignupSuccess createdAccount={createdAccount} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 text-center sm:mb-10"
      >
        <h1 className="font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl mt-8">
          Create your account
        </h1>
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
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
                <motion.div variants={rowVariants}>
                  <FormField
                    label="Full Name"
                    id="name"
                    type="text"
                    placeholder="Alex Johnson"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                </motion.div>

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

                <motion.div variants={rowVariants} className="grid gap-4 sm:grid-cols-2">
                  <PasswordField
                    label="Password"
                    id="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    error={errors.password?.message}
                    visible={showPassword}
                    onToggle={() => setShowPassword((current) => !current)}
                    {...register('password')}
                  />

                  <PasswordField
                    label="Confirm Password"
                    id="confirmPassword"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    error={errors.confirmPassword?.message}
                    visible={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword((current) => !current)}
                    {...register('confirmPassword')}
                  />
                </motion.div>

                <motion.div variants={rowVariants}>
                  <PhoneField
                    countryCodeReg={register('countryCode')}
                    phoneNumberReg={register('phoneNumber')}
                    countryCodeError={errors.countryCode?.message}
                    phoneNumberError={errors.phoneNumber?.message}
                    selectedDial={watch('countryCode')}
                  />
                </motion.div>

                <motion.div variants={rowVariants} className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Date of Birth"
                    id="dateOfBirth"
                    type="date"
                    autoComplete="bday"
                    error={errors.dateOfBirth?.message}
                    {...register('dateOfBirth')}
                  />

                  <FormField
                    label="Address"
                    id="address"
                    type="textarea"
                    placeholder="Street, city, district"
                    autoComplete="street-address"
                    error={errors.address?.message}
                    className="min-h-[44px]"
                    {...register('address')}
                  />
                </motion.div>

                <AnimatePresence initial={false}>
                  {showMarriageQuestion && (
                    <motion.div
                      key="signup-marital-status"
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
                  {showMarriageDate && (
                    <motion.div
                      key="signup-marriage-date"
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <FormField
                        label="Marriage Date"
                        id="marriageDate"
                        type="date"
                        autoComplete="off"
                        error={errors.marriageDate?.message}
                        {...register('marriageDate')}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/[0.08] px-4 py-3"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                      <p className="text-sm text-red-400">{serverError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={rowVariants} className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-sheen inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_28px_rgba(236,72,153,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(236,72,153,0.58)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </button>
                </motion.div>
            </motion.form>
          </div>
        </div>
        </motion.div>
      </div>
  );
}

function AccountSignupSuccess({
  createdAccount,
}: {
  createdAccount: CreatedAccountState;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl"
    >
      <div className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.96),rgba(7,7,14,0.98))] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/22 bg-green-500/10 text-green-300 shadow-[0_0_40px_rgba(74,222,128,0.18)]">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-green-300">
          Account created
        </p>
        <h2 className="mt-4 font-orbitron text-3xl font-black uppercase text-white sm:text-4xl">
          You&apos;re officially in.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/48 sm:text-base">
          Your account is ready for <span className="text-white">{createdAccount.email}</span>.
        </p>

        {createdAccount.userId ? (
          <p className="mt-4 font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white/32">
            Account ID #{createdAccount.userId}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_24px_rgba(34,211,238,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-violet-500 hover:shadow-[0_0_38px_rgba(34,211,238,0.5)]"
          >
            Log in now <span className="text-base leading-none">&gt;</span>
          </Link>
          <Link
            href="/menu"
            className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400/45 hover:text-pink-300"
          >
            Browse menu <span className="text-base leading-none">&gt;</span>
          </Link>
          <Link
            href="/"
            className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-6 py-3 text-[11px] font-black uppercase tracking-[0.28em] text-white/84 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:text-cyan-300"
          >
            Back home <span className="text-base leading-none">&gt;</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
  visible: boolean;
  onToggle: () => void;
};

function PasswordField({
  label,
  id,
  error,
  className,
  visible,
  onToggle,
  ...rest
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-widest text-slate-500"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={cn(
            'h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 pr-12 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all duration-200',
            'focus:border-violet-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_0_18px_rgba(139,92,246,0.1)]',
            error &&
              'border-red-500/40 focus:border-red-500/60 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.3)]',
            className
          )}
          {...rest}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-slate-500 transition-colors hover:text-white"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          error ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <p className="pt-0.5 text-xs text-red-400">{error}</p>
      </div>
    </div>
  );
}
