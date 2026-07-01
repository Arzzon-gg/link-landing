import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

// Ensures the account has a Firebase email/password credential (CloudHub
// provisions legacy users on demand) so the client's Firebase
// sendPasswordResetEmail() can deliver a reset link. Always returns a generic
// success — we never reveal whether an email is registered.
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const rateLimit = checkRateLimit(`${ip}:account-forgot-password`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many attempts. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.resetInSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const email = String((body as { email?: unknown })?.email ?? '')
    .trim()
    .toLowerCase();
  if (!email) {
    return NextResponse.json({ success: false, message: 'Email is required.' }, { status: 400 });
  }

  const apiBaseUrl = process.env.CLOUDHUB_API_URL?.trim();
  const genericSuccess = NextResponse.json({
    success: true,
    message: 'If an account exists for that email, a password reset link has been sent.',
  });

  if (!apiBaseUrl) {
    // Nothing to provision against; the client still attempts Firebase send.
    return genericSuccess;
  }

  try {
    await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/auth/forgot-password`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    // Swallow — generic success regardless (avoids enumeration + still lets the
    // client fall back to Firebase for already-migrated users).
    console.error('[account-forgot-password] CloudHub request failed:', error);
  }

  return genericSuccess;
}

export function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
