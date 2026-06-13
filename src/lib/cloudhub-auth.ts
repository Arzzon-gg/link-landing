import { NextResponse } from 'next/server';
import {
  ACCOUNT_SESSION_COOKIE_NAME,
  getAccountSessionCookieOptions,
} from '@/lib/account-auth';
import type { AccountLoginSession } from '@/types/auth';

export type CloudHubAuthPayload = {
  token?: string;
  userId?: number;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  branchId?: number | null;
  branchName?: string | null;
  branchIds?: number[];
  permissions?: string[];
  phone?: string | null;
  dateOfBirth?: string | null;
  isMarried?: boolean | null;
  marriageDate?: string | null;
  address?: string | null;
  firebaseLinked?: boolean;
  hasPassword?: boolean;
  profileCompleted?: boolean;
};

type CloudHubErrorPayload = {
  message?: string;
  detail?: string;
  title?: string;
};

export function buildAccountSession(payload: {
  userId: number;
  name: string;
  email: string;
  role: string;
  branchId: number | null;
  branchName: string | null;
  branchIds: number[];
  permissions: string[];
  phone: string | null;
  dateOfBirth: string | null;
  isMarried: boolean | null;
  marriageDate: string | null;
  address: string | null;
  firebaseLinked: boolean;
  hasPassword: boolean;
  profileCompleted: boolean;
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
    phone: payload.phone,
    dateOfBirth: payload.dateOfBirth,
    isMarried: payload.isMarried,
    marriageDate: payload.marriageDate,
    address: payload.address,
    firebaseLinked: payload.firebaseLinked,
    hasPassword: payload.hasPassword,
    profileCompleted: payload.profileCompleted,
  };
}

export function parseCloudHubSession(payload: CloudHubAuthPayload) {
  if (!payload.token || !payload.userId || !payload.email || !payload.name || !payload.role) {
    return null;
  }

  return {
    token: payload.token,
    session: buildAccountSession({
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      branchId: payload.branchId ?? null,
      branchName: payload.branchName ?? null,
      branchIds: payload.branchIds ?? [],
      permissions: payload.permissions ?? [],
      phone: typeof payload.phone === 'string' ? payload.phone : null,
      dateOfBirth: normalizeDateValue(payload.dateOfBirth),
      isMarried: typeof payload.isMarried === 'boolean' ? payload.isMarried : null,
      marriageDate: normalizeDateValue(payload.marriageDate),
      address: typeof payload.address === 'string' ? payload.address : null,
      firebaseLinked: !!payload.firebaseLinked,
      hasPassword: !!payload.hasPassword,
      profileCompleted: !!payload.profileCompleted,
    }),
  };
}

function normalizeDateValue(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}

export function createAccountSessionResponse(session: AccountLoginSession, token: string) {
  const response = NextResponse.json({
    success: true,
    message: `Welcome back, ${session.name}.`,
    session,
  });

  response.cookies.set(
    ACCOUNT_SESSION_COOKIE_NAME,
    token,
    getAccountSessionCookieOptions()
  );

  return response;
}

export async function readCloudHubAuthError(response: Response) {
  if (response.status === 401) {
    return 'Incorrect email or password.';
  }

  if (response.status === 409) {
    return 'This email is already linked to a different Google account. Please sign in with your original Google account or use email and password.';
  }

  if (response.status === 503) {
    return 'Google sign-in is not available right now. Please try again later or use email and password.';
  }

  const raw = await response.text().catch(() => '');

  if (!raw) {
    return response.status === 403
      ? 'This account is disabled. Please contact support.'
      : null;
  }

  try {
    const json = JSON.parse(raw) as CloudHubErrorPayload;
    return (
      json.message ??
      json.detail ??
      json.title ??
      (response.status === 403 ? 'This account is disabled. Please contact support.' : raw)
    );
  } catch {
    return raw;
  }
}
