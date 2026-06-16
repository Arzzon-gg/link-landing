import 'server-only';

import { z } from 'zod';
import type {
  PublicMenuBranch,
  PublicMenuCategory,
  PublicMenuData,
  PublicMenuItem,
  PublicMenuModifier,
} from '@/types/menu';

const CLOUDHUB_BASE_URL =
  process.env.CLOUDHUB_API_URL ?? process.env.NEXT_PUBLIC_CLOUDHUB_API_URL ?? '';
const RESTAURANT_PUBLIC_MENU_TOKEN =
  process.env.RESTAURANT_PUBLIC_MENU_TOKEN ?? '';
const CONFIGURED_BRANCH_ID = Number(process.env.PUBLIC_MENU_BRANCH_ID ?? '');
const DEFAULT_BRANCH_NAME =
  process.env.PUBLIC_MENU_BRANCH_NAME ?? 'The Link Beirut';
const DEFAULT_BRANCH_LOCATION =
  process.env.PUBLIC_MENU_BRANCH_LOCATION ?? 'City Center, Beirut';

const branchSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string().nullable().optional(),
});

const menuModifierSchema = z.object({
  id: z.number(),
  name: z.string(),
  additionalPrice: z.number(),
  isAvailable: z.boolean(),
  sortOrder: z.number().optional(),
});

const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  basePrice: z.number(),
  isAvailable: z.boolean(),
  sortOrder: z.number(),
  imageUrl: z.string().nullable().optional(),
  modifiers: z.array(menuModifierSchema).default([]),
});

const menuCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().nullable().optional(),
  sortOrder: z.number(),
  items: z.array(menuItemSchema).default([]),
});

const menuResponseSchema = z.object({
  generatedAtUtc: z.string(),
  categories: z.array(menuCategorySchema).default([]),
});

type CloudHubBranch = z.infer<typeof branchSchema>;
type CloudHubMenuResponse = z.infer<typeof menuResponseSchema>;
type RawMenuModifier = {
  id: number;
  name: string;
  additionalPrice: number;
  isAvailable: boolean;
  sortOrder?: number;
};
type RawMenuItem = {
  id: number;
  name: string;
  description?: string | null;
  basePrice: number;
  isAvailable: boolean;
  sortOrder: number;
  imageUrl?: string | null;
  modifiers?: RawMenuModifier[];
};
type RawMenuCategory = {
  id: number;
  name: string;
  imageUrl?: string | null;
  sortOrder: number;
  items?: RawMenuItem[];
};
type PublicMenuConfig =
  | {
      ok: true;
      apiBaseUrl: string;
      branchId: number;
    }
  | {
      ok: false;
      message: string;
    };

export type PublicMenuLoadResult =
  | {
      status: 'ready';
      menu: PublicMenuData;
    }
  | {
      status: 'unconfigured' | 'error';
      message: string;
    };

export interface PublicMenuBranchOption {
  id: number;
  name: string;
  location: string;
}

function getPublicMenuConfig(): PublicMenuConfig {
  const apiBaseUrl = CLOUDHUB_BASE_URL.trim();

  if (!apiBaseUrl) {
    return {
      ok: false,
      message:
        'The public menu is not configured yet. Add CLOUDHUB_API_URL on the server to enable menu sync.',
    };
  }

  if (!Number.isFinite(CONFIGURED_BRANCH_ID) || CONFIGURED_BRANCH_ID <= 0) {
    return {
      ok: false,
      message:
        'The public menu branch is missing. Set PUBLIC_MENU_BRANCH_ID on the server to publish one branch menu.',
    };
  }

  return {
    ok: true,
    apiBaseUrl,
    branchId: CONFIGURED_BRANCH_ID,
  };
}

function buildHeaders() {
  const headers = new Headers();
  headers.set('Accept', 'application/json');

  if (RESTAURANT_PUBLIC_MENU_TOKEN) {
    headers.set('Authorization', `Bearer ${RESTAURANT_PUBLIC_MENU_TOKEN}`);
  }

  return headers;
}

async function extractErrorMessage(response: Response) {
  const raw = await response.text().catch(() => '');

  if (!raw) {
    return `Request failed with status ${response.status}.`;
  }

  try {
    const json = JSON.parse(raw) as {
      message?: string;
      detail?: string;
      title?: string;
    };

    return json.message ?? json.detail ?? json.title ?? raw;
  } catch {
    return raw;
  }
}

async function requestJson<T>(
  apiBaseUrl: string,
  path: string,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const normalizedBase = apiBaseUrl.replace(/\/+$/, '');
  const response = await fetch(`${normalizedBase}${path}`, {
    method: 'GET',
    headers: buildHeaders(),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  const json = (await response.json()) as unknown;
  return schema.parse(json);
}

async function listBranches(apiBaseUrl: string) {
  // Prefer live branches, but `/branches/live` is empty when no edge node has
  // registered — fall back to the full list so branch names still resolve.
  try {
    const live = await requestJson(
      apiBaseUrl,
      '/branches/live',
      z.array(branchSchema),
    );
    if (live.length > 0) {
      return live;
    }
  } catch {
    // fall through to the full list
  }

  return requestJson(apiBaseUrl, '/branches', z.array(branchSchema));
}

async function getConfiguredBranch(
  apiBaseUrl: string,
  branchId: number,
): Promise<PublicMenuBranch> {
  try {
    const branches = await listBranches(apiBaseUrl);
    const selectedBranch = branches.find((branch) => branch.id === branchId);

    if (selectedBranch) {
      return {
        id: selectedBranch.id,
        name: selectedBranch.name,
        location: selectedBranch.location ?? '',
      };
    }
  } catch {
    // Menu fetch should still work even if branch metadata is temporarily unavailable.
  }

  return {
    id: branchId,
    name: DEFAULT_BRANCH_NAME,
    location: DEFAULT_BRANCH_LOCATION,
  };
}

function sortModifiers(modifiers: PublicMenuModifier[]) {
  return modifiers.slice().sort((left, right) => {
    const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

function sanitizeItems(
  items: RawMenuItem[] = [],
): PublicMenuItem[] {
  return items
    .slice()
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? null,
      basePrice: item.basePrice,
      isAvailable: item.isAvailable,
      sortOrder: item.sortOrder,
      imageUrl: item.imageUrl ?? null,
      modifiers: sortModifiers(
        (item.modifiers ?? []).map((modifier) => ({
          id: modifier.id,
          name: modifier.name,
          additionalPrice: modifier.additionalPrice,
          isAvailable: modifier.isAvailable,
          sortOrder: modifier.sortOrder,
        })),
      ),
    }));
}

function sanitizeCategories(
  categories: RawMenuCategory[] = [],
): PublicMenuCategory[] {
  return categories
    .slice()
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((category) => ({
      id: category.id,
      name: category.name,
      imageUrl: category.imageUrl ?? null,
      sortOrder: category.sortOrder,
      items: sanitizeItems(category.items),
    }));
}

// Branches a visitor can pick from the public menu dropdown. The shared catalog
// sentinel (id 0) is never a real location, so it is filtered out.
export async function getPublicBranches(): Promise<PublicMenuBranchOption[]> {
  const apiBaseUrl = CLOUDHUB_BASE_URL.trim();

  if (!apiBaseUrl) {
    return [];
  }

  try {
    // The dropdown lists every branch (a menu is available regardless of edge
    // connectivity), so use the full list rather than only live branches.
    const branches = await requestJson(
      apiBaseUrl,
      '/branches',
      z.array(branchSchema),
    );
    return branches
      .filter((branch) => branch.id > 0)
      .map((branch) => ({
        id: branch.id,
        name: branch.name,
        location: branch.location ?? '',
      }))
      .sort((left, right) => left.name.localeCompare(right.name));
  } catch {
    return [];
  }
}

// requestedBranchId (e.g. from the ?branch= dropdown) overrides the configured
// default branch when it is a valid positive id.
export async function getPublicMenu(
  requestedBranchId?: number,
): Promise<PublicMenuLoadResult> {
  const config = getPublicMenuConfig();

  if (!config.ok) {
    return {
      status: 'unconfigured',
      message: config.message,
    };
  }

  const branchId =
    typeof requestedBranchId === 'number' &&
    Number.isFinite(requestedBranchId) &&
    requestedBranchId > 0
      ? requestedBranchId
      : config.branchId;

  try {
    const [branch, menu] = await Promise.all([
      getConfiguredBranch(config.apiBaseUrl, branchId),
      requestJson(
        config.apiBaseUrl,
        `/restaurant/public/menu?branchId=${branchId}`,
        menuResponseSchema,
      ),
    ]);

    return {
      status: 'ready',
      menu: {
        branch,
        generatedAtUtc: menu.generatedAtUtc,
        categories: sanitizeCategories(menu.categories ?? []),
      },
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'The public menu could not be loaded right now.';

    return {
      status: 'error',
      message,
    };
  }
}

export function resolvePublicMenuImageUrl(imageUrl?: string | null) {
  if (!imageUrl) {
    return null;
  }

  if (imageUrl.startsWith('/images/')) {
    return imageUrl;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  const config = getPublicMenuConfig();

  if (!config.ok) {
    return null;
  }

  const normalizedBase = config.apiBaseUrl.replace(/\/+$/, '');
  const normalizedPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;

  return `${normalizedBase}${normalizedPath}`;
}

export function buildMenuCategoryAnchor(categoryName: string, categoryId: number) {
  const slug = categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `menu-category-${slug || categoryId}-${categoryId}`;
}

export function getMenuItemTeaser(description?: string | null) {
  const normalized = description?.trim();

  if (!normalized) {
    return 'Signature dish.';
  }

  if (normalized.length <= 68) {
    return normalized;
  }

  return `${normalized.slice(0, 65).trimEnd()}...`;
}
