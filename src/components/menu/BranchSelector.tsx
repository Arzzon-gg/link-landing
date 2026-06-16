'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export interface BranchOption {
  id: number;
  name: string;
  location: string;
}

interface BranchSelectorProps {
  branches: BranchOption[];
  selectedBranchId: number | null;
  basePath?: string;
}

export function BranchSelector({
  branches,
  selectedBranchId,
  basePath = '/menu',
}: BranchSelectorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Nothing to switch between with a single branch.
  if (branches.length <= 1) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
      <span className="font-orbitron text-[9px] font-black uppercase tracking-[0.3em] text-cyan-300">
        Branch
      </span>
      <div className="relative">
        <select
          aria-label="Choose a branch"
          value={selectedBranchId ?? ''}
          disabled={pending}
          onChange={(event) => {
            const next = event.target.value;
            startTransition(() => {
              router.push(`${basePath}?branch=${next}`, { scroll: false });
            });
          }}
          className="cursor-pointer appearance-none rounded-full bg-transparent py-1 pl-1 pr-7 text-sm font-semibold text-white outline-none disabled:opacity-60"
        >
          {branches.map((branch) => (
            <option
              key={branch.id}
              value={branch.id}
              className="bg-[#0a0a19] text-white"
            >
              {branch.name}
              {branch.location ? ` — ${branch.location}` : ''}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs text-cyan-300">
          ▾
        </span>
      </div>
    </div>
  );
}
