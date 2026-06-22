import 'server-only';

import { z } from 'zod';
import type { Package, PackagesLoadResult } from '@/types/packages';

const CLOUDHUB_BASE_URL =
  process.env.CLOUDHUB_API_URL ?? process.env.NEXT_PUBLIC_CLOUDHUB_API_URL ?? '';

const packageSchema = z.object({
  id: z.number(),
  branchId: z.number(),
  branchName: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string(),
  capacity: z.number(),
  price: z.number(),
  createdAt: z.string(),
  isShared: z.boolean(),
  isHiddenForBranch: z.boolean(),
});

const packagesResponseSchema = z.object({
  items: z.array(packageSchema).default([]),
  page: z.number().default(1),
  pageSize: z.number().default(20),
  totalCount: z.number().default(0),
  hasMore: z.boolean().default(false),
});

export type CloudHubPackage = z.infer<typeof packageSchema>;

function extractErrorMessage(error: unknown): string {
  if (error instanceof z.ZodError) {
    return `Invalid package data received from CloudHub: ${error.errors.map((e) => e.message).join(', ')}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'The packages list could not be loaded right now.';
}

function normalizeBranchId(branchId?: number): number {
  if (typeof branchId !== 'number' || !Number.isFinite(branchId) || branchId < 0) {
    return 0;
  }

  return branchId;
}

export async function getPackages(branchId?: number): Promise<PackagesLoadResult> {
  const apiBaseUrl = CLOUDHUB_BASE_URL.trim();

  if (!apiBaseUrl) {
    return {
      status: 'unconfigured',
      message:
        'Packages are not configured yet. Add CLOUDHUB_API_URL on the server to enable package listings.',
    };
  }

  const effectiveBranchId = normalizeBranchId(branchId);

  try {
    const normalizedBase = apiBaseUrl.replace(/\/+$/, '');
    const response = await fetch(
      `${normalizedBase}/packages?branchId=${effectiveBranchId}&page=1&pageSize=50`,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      const detail = text
        ? `CloudHub returned ${response.status}: ${text}`
        : `CloudHub returned status ${response.status}.`;
      throw new Error(detail);
    }

    const data = packagesResponseSchema.parse(await response.json());

    return {
      status: 'ready',
      packages: data.items.filter((pkg) => !pkg.isHiddenForBranch) as Package[],
    };
  } catch (error) {
    return {
      status: 'error',
      message: extractErrorMessage(error),
    };
  }
}
