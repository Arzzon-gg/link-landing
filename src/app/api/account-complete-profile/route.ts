import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCOUNT_SESSION_COOKIE_NAME } from '@/lib/account-auth';
import {
  accountProfileCompletionSchema,
  type AccountProfileCompletionInput,
} from '@/lib/account-profile-validation';
import { getCurrentAccountSession } from '@/lib/account-session';
import { checkRateLimit } from '@/lib/rate-limit';

type CloudHubProfileUpdatePayload = {
  id?: number;
  phone?: string | null;
  dateOfBirth?: string | null;
  isMarried?: boolean | null;
  marriageDate?: string | null;
  address?: string | null;
  profileCompleted?: boolean;
};

export async function PATCH(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(`${ip}:account-complete-profile`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Too many profile update attempts. Please wait a moment and try again.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetInSeconds) },
      }
    );
  }

  const session = await getCurrentAccountSession();

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: 'Your session has expired. Please sign in again.',
      },
      { status: 401 }
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

  const parsed = accountProfileCompletionSchema.safeParse(body);

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
        message: 'Profile completion is not configured yet. Please contact support.',
      },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ACCOUNT_SESSION_COOKIE_NAME)?.value?.trim();

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: 'Your session has expired. Please sign in again.',
      },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${apiBaseUrl.replace(/\/+$/, '')}/users/${session.userId}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
        body: JSON.stringify(buildCloudHubProfilePayload(parsed.data)),
      }
    );

    if (!response.ok) {
      const message = await readCloudHubProfileError(response);

      return NextResponse.json(
        {
          success: false,
          message:
            message ?? 'We could not save your profile right now. Please try again.',
        },
        { status: response.status }
      );
    }

    const payload = (await response.json()) as CloudHubProfileUpdatePayload;

    return NextResponse.json({
      success: true,
      message: 'Your profile has been completed successfully.',
      profileCompleted: !!payload.profileCompleted,
    });
  } catch (error) {
    console.error('[account-complete-profile] CloudHub request failed:', error);

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

function buildCloudHubProfilePayload(data: AccountProfileCompletionInput) {
  const normalizedPhoneDigits = data.phoneNumber.replace(/\D/g, '');
  const phone = normalizedPhoneDigits ? `+${data.countryCode}${normalizedPhoneDigits}` : null;
  const isMarried =
    data.married === 'yes' ? true : data.married === 'no' ? false : null;

  return {
    name: null,
    phone,
    dateOfBirth: toIsoDateOrNull(data.dateOfBirth),
    isMarried,
    marriageDate: data.married === 'yes' ? toIsoDateOrNull(data.marriageDate) : null,
    address: data.address.trim() ? data.address.trim() : null,
    note: data.note.trim() ? data.note.trim() : null,
    branchId: null,
  };
}

function toIsoDateOrNull(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  return new Date(`${trimmed}T00:00:00.000Z`).toISOString();
}

async function readCloudHubProfileError(response: Response) {
  const raw = await response.text().catch(() => '');

  if (!raw) {
    return response.status === 401
      ? 'Your session has expired. Please sign in again.'
      : null;
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
