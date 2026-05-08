'use client';

import { forwardRef } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { COUNTRY_CODES } from '@/data/countryCodes';

interface PhoneFieldProps {
  countryCodeReg: UseFormRegisterReturn;
  phoneNumberReg: UseFormRegisterReturn;
  countryCodeError?: string;
  phoneNumberError?: string;
  selectedDial?: string; // current value of countryCode field, used for placeholder
}

const inputBase = [
  'w-full px-4 text-sm text-slate-100 placeholder-slate-600',
  'bg-white/[0.04] border border-white/[0.08]',
  'transition-all duration-200 outline-none',
  'focus:border-violet-500/60 focus:bg-white/[0.06]',
  'focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_0_18px_rgba(139,92,246,0.1)]',
].join(' ');

export const PhoneField = forwardRef<HTMLDivElement, PhoneFieldProps>(
  function PhoneField(
    { countryCodeReg, phoneNumberReg, countryCodeError, phoneNumberError, selectedDial },
    ref
  ) {
    const hasError = !!(countryCodeError || phoneNumberError);
    const errorMsg = countryCodeError ?? phoneNumberError;

    // Find the hint text for the currently selected country (e.g. "7–8 digits")
    const countryHint = selectedDial
      ? COUNTRY_CODES.find((c) => c.dial === selectedDial)
      : undefined;

    const hintText = countryHint
      ? `${countryHint.min === countryHint.max ? countryHint.min : `${countryHint.min}–${countryHint.max}`} digits`
      : undefined;

    return (
      <div ref={ref} className="space-y-1.5">
        <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500">
          Phone Number
        </label>

        <div className="flex gap-2">
          {/* ── Country code select ───────────────────────────────── */}
          <select
            {...countryCodeReg}
            className={cn(
              inputBase,
              'h-11 rounded-xl cursor-pointer appearance-none pr-2 pl-3',
              // fixed width to fit "🇦🇫 +213" comfortably
              'w-[108px] shrink-0',
              hasError && 'border-red-500/40 focus:border-red-500/60 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.3)]'
            )}
          >
            <option value="" disabled>
              🌐 Code
            </option>
            {COUNTRY_CODES.map((c) => (
              <option key={`${c.name}-${c.dial}`} value={c.dial}>
                {c.flag} +{c.dial}
              </option>
            ))}
          </select>

          {/* ── Phone number input ────────────────────────────────── */}
          <input
            {...phoneNumberReg}
            id="phoneNumber"
            type="tel"
            inputMode="numeric"
            placeholder={hintText ? `e.g. ${'0'.repeat(countryHint!.min)}` : 'Number'}
            autoComplete="tel-national"
            className={cn(
              inputBase,
              'h-11 rounded-xl flex-1',
              hasError && 'border-red-500/40 focus:border-red-500/60 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.3)]'
            )}
          />
        </div>

        {/* Hint text (expected digit length) */}
        {hintText && !hasError && (
          <p className="text-[11px] text-slate-600">{countryHint!.name}: {hintText}</p>
        )}

        {/* Error */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            hasError ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <p className="text-xs text-red-400 pt-0.5">{errorMsg}</p>
        </div>
      </div>
    );
  }
);
