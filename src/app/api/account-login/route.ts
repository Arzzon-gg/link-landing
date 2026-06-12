import { NextRequest, NextResponse } from 'next/server';
import {
  ACCOUNT_SESSION_COOKIE_NAME,
  getAccountSessionCookieOptions,
} from '@/lib/account-auth';
import { accountLoginSchema } from '@/lib/account-login-validation';
import { checkRateLimit } from '@/lib/rate-limit';
import type { AccountLoginSession } from '@/types/auth';

type CloudHubLoginPayload = {
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
};

type CloudHubErrorPayload = {
  message?: string;
  detail?: string;
  title?: string;
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(`${ip}:account-login`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many login attempts. Please wait a moment and try again.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetInSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parsed = accountLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please fix the highlighted fields and try again.',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const apiBaseUrl = process.env.CLOUDHUB_API_URL?.trim();

  if (!apiBaseUrl) {
    return NextResponse.json(
      {
        success: false,
        message: 'Account login is not configured yet. Please contact support.',
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        email: parsed.data.email.trim().toLowerCase(),
        password: parsed.data.password,
      }),
    });

    if (!response.ok) {
      const message = await readCloudHubError(response);

      return NextResponse.json(
        {
          success: false,
          message:
            message ?? 'We could not sign you in right now. Please try again in a moment.',
        },
        { status: response.status }
      );
    }

    const result = (await response.json()) as CloudHubLoginPayload;

    if (!result.token || !result.userId || !result.email || !result.name || !result.role) {
      return NextResponse.json(
        {
          success: false,
          message: 'The login service returned an incomplete session. Please try again.',
        },
        { status: 502 }
      );
    }

    const session = buildSession({
      userId: result.userId,
      name: result.name,
      email: result.email,
      role: result.role,
      branchId: result.branchId ?? null,
      branchName: result.branchName ?? null,
      branchIds: result.branchIds ?? [],
      permissions: result.permissions ?? [],
    });

    const nextResponse = NextResponse.json({
      success: true,
      message: `Welcome back, ${session.name}.`,
      session,
    });

    nextResponse.cookies.set(
      ACCOUNT_SESSION_COOKIE_NAME,
      result.token,
      getAccountSessionCookieOptions()
    );

    return nextResponse;
  } catch (error) {
    console.error('[account-login] CloudHub request failed:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          'We could not reach the account service right now. Please check your connection and try again.',
      },
      { status: 502 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}

async function readCloudHubError(response: Response) {
  if (response.status === 401) {
    return 'Incorrect email or password.';
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

function buildSession(payload: {
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
    branchId: payload.branchId ?? null,
    branchName: payload.branchName ?? null,
    branchIds: payload.branchIds ?? [],
    permissions: payload.permissions ?? [],
  };
}
