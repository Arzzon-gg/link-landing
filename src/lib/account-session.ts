import 'server-only';
import { cookies } from 'next/headers';
import { ACCOUNT_SESSION_COOKIE_NAME } from '@/lib/account-auth';
import type { AccountLoginSession } from '@/types/auth';

type CloudHubSessionPayload = {
  userId?: number;
  name?: string;
  email?: string;
  username?: string;
  role?: string;
  branchId?: number | null;
  branchName?: string | null;
  branchIds?: number[];
  permissions?: string[];
};

export async function getCurrentAccountSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCOUNT_SESSION_COOKIE_NAME)?.value?.trim();

  if (!token) {
    return null;
  }

  const apiBaseUrl = process.env.CLOUDHUB_API_URL?.trim();

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/auth/session`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as CloudHubSessionPayload;

    if (!payload.userId || !payload.name || !payload.email || !payload.role) {
      return null;
    }

    return buildAccountSession({
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      branchId: payload.branchId ?? null,
      branchName: payload.branchName ?? null,
      branchIds: payload.branchIds ?? [],
      permissions: payload.permissions ?? [],
    });
  } catch (error) {
    console.error('[account-session] Failed to fetch current session:', error);
    return null;
  }
}

function buildAccountSession(payload: {
  userId: number;
  name: string;
  email: string;
  role: string;
  branchId: number | null;
  branchName: string | null;
  branchIds: number[];
  permissions: string[];
}): AccountLoginSession {
  return {
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
    role: payload.role,
    branchId: payload.branchId,
    branchName: payload.branchName,
    branchIds: payload.branchIds,
    permissions: payload.permissions,
  };
}
