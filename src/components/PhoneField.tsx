"use client";

import { forwardRef, useEffect, useRef, useState } from 'react';
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

    // Local query state allows typing and filtering the dropdown.
    const [query, setQuery] = useState<string>(selectedDial ?? '');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      setQuery(selectedDial ?? '');
    }, [selectedDial]);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      function onDoc(e: MouseEvent) {
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
      }
      document.addEventListener('click', onDoc);
      return () => document.removeEventListener('click', onDoc);
    }, []);

    return (
      <div ref={(node) => {
        // forward incoming ref to the wrapper too
        // @ts-ignore
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as any).current = node;
        wrapperRef.current = node;
      }} className="space-y-1.5">
        <label className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500">
          Phone Number
        </label>

        <div className="relative">
          <div className="flex gap-2">
            {/* ── Country code input (editable) with custom dropdown ── */}
            <div className="relative w-[120px] shrink-0">
              <input
                {...countryCodeReg}
                value={query}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, '');
                  setQuery(v);
                  // notify react-hook-form
                  try { countryCodeReg.onChange && countryCodeReg.onChange({ target: { value: v } } as any); } catch {}
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className={cn(
                  inputBase,
                  'h-11 rounded-xl pr-3 pl-3 cursor-text',
                  hasError && 'border-red-500/40 focus:border-red-500/60'
                )}
                placeholder="Code"
                aria-label="Country code"
              />

              {/* Dropdown */}
              {open && (
                <ul className="absolute z-40 mt-1 left-0 right-0 max-h-56 overflow-auto rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-[150px]">
                  {COUNTRY_CODES.filter((c) => {
                    const q = query.trim();
                    if (!q) return true;
                    return c.dial.startsWith(q) || c.name.toLowerCase().includes(q.toLowerCase());
                  }).map((c) => (
                    <li
                      key={`${c.name}-${c.dial}`}
                      role="option"
                      onMouseDown={(ev) => {
                        ev.preventDefault();
                        // set dial
                        setQuery(c.dial);
                        try { countryCodeReg.onChange && countryCodeReg.onChange({ target: { value: c.dial } } as any); } catch {}
                        setOpen(false);
                      }}
                      className="cursor-pointer px-3 py-2 hover:bg-sky-600 hover:text-white text-sm text-slate-900 flex items-center gap-2"
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span className="flex-1">{c.name}</span>
                      <span className="font-mono">+{c.dial}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
                hasError && 'border-red-500/40 focus:border-red-500/60'
              )}
            />
          </div>
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
