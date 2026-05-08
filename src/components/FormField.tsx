'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
  error?: string;
}

// forwardRef is required so react-hook-form can attach its internal ref
// to the underlying <input> or <textarea>.
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, id, type = 'text', error, className, ...rest }, ref) {
    const isTextarea = type === 'textarea';

    const sharedInputClasses = cn(
      // Layout & spacing
      'w-full px-4 rounded-xl text-sm text-slate-100 placeholder-slate-600',
      // Background & border
      'bg-white/[0.04] border border-white/[0.08]',
      // Transitions
      'transition-all duration-200 outline-none',
      // Focus ring — violet glow
      'focus:border-violet-500/60 focus:bg-white/[0.06]',
      'focus:shadow-[0_0_0_1px_rgba(139,92,246,0.3),0_0_18px_rgba(139,92,246,0.1)]',
      // Error state
      error &&
        'border-red-500/40 focus:border-red-500/60 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.3)]',
      className
    );

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={id}
          className="block text-[11px] font-semibold tracking-widest uppercase text-slate-500"
        >
          {label}
        </label>

        {isTextarea ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={cn(sharedInputClasses, 'py-3 min-h-[96px] resize-none leading-relaxed')}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            type={type}
            ref={ref}
            className={cn(sharedInputClasses, 'h-11')}
            {...rest}
          />
        )}

        {/* Inline error — animated height transition via max-height trick */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            error ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <p className="text-xs text-red-400 pt-0.5">{error}</p>
        </div>
      </div>
    );
  }
);
