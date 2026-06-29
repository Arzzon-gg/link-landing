'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { FormField } from '@/components/FormField';
import {
  accountLoginSchema,
  type AccountLoginInput,
} from '@/lib/account-login-validation';
import { cn } from '@/lib/utils';
import type { AccountLoginApiResponse } from '@/types/auth';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AccountLoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountLoginInput>({
    resolver: zodResolver(accountLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: AccountLoginInput) {
    setServerError(null);

    try {
      const response = await fetch('/api/account-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as AccountLoginApiResponse;

      if (!response.ok || !result.success || !result.session) {
        setServerError(result.message ?? 'Something went wrong. Please try again.');
        return;
      }

      router.refresh();
      // After a successful login, send the player to the daily spin wheel.
      // Profiles that still need completing go to /signup first.
      router.replace(result.session.profileCompleted ? '/spin' : '/signup');
    } catch {
      setServerError('Network error. Please check your connection and try again.');
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
          Log in
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/46 sm:text-base">
          Sign in to your The Link account and keep your profile ready on this browser.
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-6 space-y-4"
            >
              <motion.div variants={rowVariants}>
                <GoogleAuthButton mode="login" onError={setServerError} />
              </motion.div>
              <motion.div variants={rowVariants} className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white/28">
                  Or with email
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </motion.div>
            </motion.div>

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
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </motion.div>

              <motion.div variants={rowVariants}>
                <PasswordField
                  label="Password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  error={errors.password?.message}
                  visible={showPassword}
                  onToggle={() => setShowPassword((current) => !current)}
                  {...register('password')}
                />
              </motion.div>

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

              <motion.div
                variants={rowVariants}
                className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-xs leading-6 text-white/34">
                  Need an account?{' '}
                  <Link href="/signup" className="text-cyan-300 transition-colors hover:text-cyan-200">
                    Create one
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-sheen inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] text-white shadow-[0_0_28px_rgba(34,211,238,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_46px_rgba(34,211,238,0.52)] disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-[220px]"
                >
                  {isSubmitting ? 'Signing in...' : 'Log in'}
                </button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
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
            'focus:border-cyan-500/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_0_18px_rgba(34,211,238,0.1)]',
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
