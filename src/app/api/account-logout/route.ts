import { NextResponse } from 'next/server';
import {
  ACCOUNT_SESSION_COOKIE_NAME,
  getAccountSessionCookieOptions,
} from '@/lib/account-auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'You have been signed out.',
  });

  response.cookies.set(ACCOUNT_SESSION_COOKIE_NAME, '', {
    ...getAccountSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}

export function GET() {
  return NextResponse.json({ message: 'Method not allowed.' }, { status: 405 });
}
