import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { registrationSchema } from '@/lib/validation';
import { appendRegistration, checkDuplicate } from '@/lib/sheets';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────────────
  // Prefer the real client IP from proxy headers; fall back to a generic key.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.resetInSeconds) },
      }
    );
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // ── Validate ─────────────────────────────────────────────────────────────
  const parsed = registrationSchema.safeParse(body);

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

  const { name, email, phone, address, age } = parsed.data;

  // ── Build the row ─────────────────────────────────────────────────────────
  const submissionId = uuidv4();
  const createdAt = new Date().toISOString();

  // Column order matches the sheet header:
  // Submission ID | Created At | Name | Email | Phone | Address | Age
  const row = [submissionId, createdAt, name, email, phone, address, String(age)];

  // ── Duplicate check ───────────────────────────────────────────────────────
  try {
    const duplicate = await checkDuplicate(email, phone);
    if (duplicate) {
      const field = duplicate === 'email' ? 'email address' : 'phone number';
      return NextResponse.json(
        {
          success: false,
          message: `This ${field} is already registered. Each person can only register once.`,
        },
        { status: 409 }
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error.';
    console.error('[submit] Duplicate check error:', message);
    return NextResponse.json(
      { success: false, message: 'We could not verify your registration. Please try again.' },
      { status: 500 }
    );
  }

  // ── Write to Google Sheets ────────────────────────────────────────────────
  try {
    await appendRegistration(row);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unknown error writing to Google Sheets.';

    console.error('[submit] Google Sheets error:', message);

    return NextResponse.json(
      {
        success: false,
        message: 'We could not save your registration right now. Please try again in a moment.',
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: 'Registration successful!', submissionId },
    { status: 201 }
  );
}

// Reject any method other than POST
export function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
