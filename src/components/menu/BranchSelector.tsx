'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export interface BranchOption {
  id: number;
  name: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
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
  const hasTriedLocation = useRef(false);
  const hasUserChosenBranch = useRef(false);

  function navigateToBranch(branchId: number) {
    startTransition(() => {
      router.replace(`${basePath}?branch=${branchId}`, { scroll: false });
    });
  }

  useEffect(() => {
    const branchesWithCoordinates = branches.filter(
      (branch) =>
        Number.isFinite(branch.latitude) && Number.isFinite(branch.longitude),
    );

    if (
      hasTriedLocation.current ||
      branchesWithCoordinates.length < 2 ||
      !navigator.geolocation
    ) {
      return;
    }

    hasTriedLocation.current = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (hasUserChosenBranch.current) {
          return;
        }

        const nearestBranch = branchesWithCoordinates.reduce(
          (nearest, branch) =>
            distanceInMeters(
              position.coords.latitude,
              position.coords.longitude,
              branch.latitude!,
              branch.longitude!,
            ) <
            distanceInMeters(
              position.coords.latitude,
              position.coords.longitude,
              nearest.latitude!,
              nearest.longitude!,
            )
              ? branch
              : nearest,
        );

        if (nearestBranch.id !== selectedBranchId) {
          navigateToBranch(nearestBranch.id);
        }
      },
      // Permission denial, unsupported devices, or an unavailable GPS keep the
      // branch selected in the URL. Manual selection is always available.
      () => undefined,
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 300000,
      },
    );
  }, [basePath, branches, selectedBranchId]);

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
            hasUserChosenBranch.current = true;
            navigateToBranch(Number(event.target.value));
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

function distanceInMeters(
  fromLatitude: number,
  fromLongitude: number,
  toLatitude: number,
  toLongitude: number,
) {
  const earthRadiusMeters = 6_371_000;
  const latitudeDelta = degreesToRadians(toLatitude - fromLatitude);
  const longitudeDelta = degreesToRadians(toLongitude - fromLongitude);
  const fromLatitudeRadians = degreesToRadians(fromLatitude);
  const toLatitudeRadians = degreesToRadians(toLatitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitudeRadians) *
      Math.cos(toLatitudeRadians) *
      Math.sin(longitudeDelta / 2) ** 2;

  return 2 * earthRadiusMeters * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
