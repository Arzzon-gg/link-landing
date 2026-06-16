import 'server-only';

import { z } from 'zod';
import type { EventPackage, EventsLoadResult } from '@/types/events';

const CLOUDHUB_BASE_URL =
  process.env.CLOUDHUB_API_URL ?? process.env.NEXT_PUBLIC_CLOUDHUB_API_URL ?? '';

const eventPackageSchema = z.object({
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

const eventsResponseSchema = z.object({
  items: z.array(eventPackageSchema).default([]),
  page: z.number().default(1),
  pageSize: z.number().default(20),
  totalCount: z.number().default(0),
  hasMore: z.boolean().default(false),
});

export type CloudHubEventPackage = z.infer<typeof eventPackageSchema>;

function extractErrorMessage(error: unknown): string {
  if (error instanceof z.ZodError) {
    return `Invalid event data received from CloudHub: ${error.errors.map((e) => e.message).join(', ')}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'The events list could not be loaded right now.';
}

export async function getEvents(): Promise<EventsLoadResult> {
  const apiBaseUrl = CLOUDHUB_BASE_URL.trim();

  if (!apiBaseUrl) {
    return {
      status: 'unconfigured',
      message:
        'Events are not configured yet. Add CLOUDHUB_API_URL on the server to enable event listings.',
    };
  }

  try {
    const normalizedBase = apiBaseUrl.replace(/\/+$/, '');
    const response = await fetch(
      `${normalizedBase}/packages?branchId=0&page=1&pageSize=50`,
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

    const data = eventsResponseSchema.parse(await response.json());

    return {
      status: 'ready',
      events: data.items as EventPackage[],
    };
  } catch (error) {
    return {
      status: 'error',
      message: extractErrorMessage(error),
    };
  }
}
