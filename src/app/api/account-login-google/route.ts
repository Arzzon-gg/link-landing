import { NextRequest, NextResponse } from 'next/server';
import {
  createAccountSessionResponse,
  parseCloudHubSession,
  readCloudHubAuthError,
  type CloudHubAuthPayload,
} from '@/lib/cloudhub-auth';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const googleLoginSchema = z.object({
  idToken: z.string().trim().min(1, 'Google ID token is required'),
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(`${ip}:account-login-google`);

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

  const parsed = googleLoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Google sign-in could not be completed. Please try again.',
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
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/auth/firebase/google`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        idToken: parsed.data.idToken,
      }),
    });

    if (!response.ok) {
      const message = await readCloudHubAuthError(response);

      return NextResponse.json(
        {
          success: false,
          message:
            message ?? 'We could not sign you in with Google right now. Please try again.',
        },
        { status: response.status }
      );
    }

    const payload = (await response.json()) as CloudHubAuthPayload;
    const parsedSession = parseCloudHubSession(payload);

    if (!parsedSession) {
      return NextResponse.json(
        {
          success: false,
          message: 'The login service returned an incomplete session. Please try again.',
        },
        { status: 502 }
      );
    }

    return createAccountSessionResponse(parsedSession.session, parsedSession.token);
  } catch (error) {
    console.error('[account-login-google] CloudHub request failed:', error);

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
