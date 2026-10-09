'use client';

import { useEffect, useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/FormField';
import { universitiesSchema, type University } from '@/lib/student-validation';

type StudentFieldsProps = {
  isStudent: boolean;
  universityId: string | null;
  isStudentReg: UseFormRegisterReturn<'isStudent'>;
  universityIdReg: UseFormRegisterReturn<'universityId'>;
  studentIdReg: UseFormRegisterReturn<'studentId'>;
  universityError?: string;
  studentIdError?: string;
  onClear: () => void;
};

export function StudentFields({ isStudent, universityId, isStudentReg, universityIdReg, studentIdReg, universityError, studentIdError, onClear }: StudentFieldsProps) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!isStudent) return;
    const controller = new AbortController();
    setStatus('loading');
    async function load() {
      try {
        const response = await fetch('/api/universities', {
          credentials: 'omit',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('University lookup failed');
        const list = universitiesSchema.parse(await response.json());
        if (!list.length) throw new Error('No universities available');
        if (!controller.signal.aborted) {
          setUniversities(list);
          setStatus('ready');
        }
      } catch {
        if (!controller.signal.aborted) setStatus('error');
      }
    }
    void load();
    return () => controller.abort();
  }, [isStudent, attempt]);

  return (
    <fieldset className="space-y-4 rounded-xl border border-white/10 p-4">
      <legend className="px-2 text-sm font-semibold text-slate-200">Student details</legend>
      <label htmlFor="isStudent" className="flex items-center gap-3 text-sm text-slate-200">
        <input
          id="isStudent"
          type="checkbox"
          className="h-4 w-4 accent-violet-500"
          {...isStudentReg}
          onChange={(event) => {
            void isStudentReg.onChange(event);
            if (!event.target.checked) onClear();
          }}
        />
        I am a student
      </label>
      {isStudent && (
        <>
          <div className="space-y-2">
            <label htmlFor="universityId" className="block text-sm text-slate-200">University (required)</label>
            <select
              id="universityId"
              {...universityIdReg}
              value={universityId ?? ''}
              required
              disabled={status !== 'ready'}
              aria-required="true"
              aria-busy={status === 'loading'}
              aria-invalid={!!universityError}
              aria-describedby="university-status university-error"
              className="h-11 w-full rounded-xl border border-white/20 bg-slate-900 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">{status === 'loading' ? 'Loading universities…' : 'Select your university'}</option>
              {status === 'ready' && universities.map((university) => (
                <option key={university.id} value={university.id}>{university.name}</option>
              ))}
            </select>
            <p id="university-status" role="status" className="text-xs text-slate-300">
              {status === 'loading' ? 'Loading universities…' : status === 'error' ? 'Unable to load universities. Please retry.' : ''}
            </p>
            {status === 'error' && (
              <button type="button" onClick={() => setAttempt((value) => value + 1)} className="rounded px-3 py-2 text-sm text-cyan-300 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
                Retry university lookup
              </button>
            )}
            <p id="university-error" className="text-xs text-red-400">{universityError}</p>
          </div>
          <FormField
            id="studentId"
            label="Student ID (optional)"
            type="text"
            maxLength={100}
            autoComplete="off"
            error={studentIdError}
            {...studentIdReg}
          />
        </>
      )}
    </fieldset>
  );
}
