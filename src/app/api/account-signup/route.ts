import { NextRequest, NextResponse } from 'next/server';
import { accountSignupSchema } from '@/lib/account-signup-validation';
import type { CloudHubAuthPayload } from '@/lib/cloudhub-auth';
import { checkRateLimit } from '@/lib/rate-limit';
import type { WheelSession } from '@/types/signup';

// New players are created without a branch, but the wheel endpoint requires one
// (rewards are shared across branches). Fall back to the same branch the public
// menu uses.
const WHEEL_BRANCH_ID =
  Number(process.env.WHEEL_BRANCH_ID ?? process.env.PUBLIC_MENU_BRANCH_ID ?? '1') || 1;

type CloudHubErrorPayload = {
  message?: string;
  detail?: string;
  title?: string;
};

type CloudHubUserPayload = {
  id?: number;
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(`${ip}:account-signup`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many account signup attempts. Please wait a moment and try again.',
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

  const parsed = accountSignupSchema.safeParse(body);

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
        message: 'Account signup is not configured yet. Please contact support.',
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(buildCloudHubUserPayload(parsed.data)),
    });

    if (!response.ok) {
      const message = await readCloudHubError(response);

      return NextResponse.json(
        {
          success: false,
          message:
            message ??
            'We could not create your account right now. Please try again in a moment.',
        },
        { status: response.status }
      );
    }

    const result = (await response.json().catch(() => ({}))) as CloudHubUserPayload;

    // Sign the new player in so the embedded post-signup wheel opens already
    // authenticated. If this fails, signup still succeeds — the wheel is simply
    // skipped on the success screen.
    const wheelSession = await createWheelSession(
      apiBaseUrl,
      parsed.data.email.trim().toLowerCase(),
      parsed.data.password
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Your account has been created successfully.',
        userId: result.id,
        wheelSession,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[account-signup] CloudHub request failed:', error);

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
  const raw = await response.text().catch(() => '');

  if (!raw) {
    return null;
  }

  try {
    const json = JSON.parse(raw) as CloudHubErrorPayload;
    return json.message ?? json.detail ?? json.title ?? raw;
  } catch {
    return raw;
  }
}

async function createWheelSession(
  apiBaseUrl: string,
  email: string,
  password: string
): Promise<WheelSession | undefined> {
  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return undefined;
    }

    const payload = (await response.json().catch(() => ({}))) as CloudHubAuthPayload;

    if (!payload.token || !payload.userId) {
      return undefined;
    }

    return {
      token: payload.token,
      userId: payload.userId,
      name: payload.name ?? '',
      role: payload.role ?? 'player',
      branchId: payload.branchId ?? WHEEL_BRANCH_ID,
      branchName: payload.branchName ?? null,
    };
  } catch (error) {
    console.error('[account-signup] wheel session login failed:', error);
    return undefined;
  }
}

function buildCloudHubUserPayload(data: ReturnType<typeof accountSignupSchema.parse>) {
  const normalizedPhoneDigits = data.phoneNumber.replace(/\D/g, '');
  const phone = normalizedPhoneDigits ? `+${data.countryCode}${normalizedPhoneDigits}` : null;
  const isMarried =
    data.married === 'yes' ? true : data.married === 'no' ? false : null;

  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
    phone,
    dateOfBirth: toIsoDateOrNull(data.dateOfBirth),
    isMarried,
    marriageDate: data.married === 'yes' ? toIsoDateOrNull(data.marriageDate) : null,
    address: data.address.trim() ? data.address.trim() : null,
  };
}

function toIsoDateOrNull(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return new Date(`${trimmed}T00:00:00.000Z`).toISOString();
}
