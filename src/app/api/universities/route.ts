import { NextResponse } from 'next/server';
import { universitiesSchema } from '@/lib/student-validation';

export async function GET() {
  const apiBaseUrl = process.env.CLOUDHUB_API_URL?.trim();
  if (!apiBaseUrl) {
    return NextResponse.json({ message: 'University lookup is not configured.' }, { status: 503 });
  }

  try {
    // Public lookup: never forward browser cookies or account credentials.
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/universities`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`University lookup returned ${response.status}`);
    const universities = universitiesSchema.parse(await response.json());
    return NextResponse.json(universities, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[universities] Lookup failed:', error);
    return NextResponse.json({ message: 'Unable to load universities. Please try again.' }, { status: 502 });
  }
}
