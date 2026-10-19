import { NextRequest, NextResponse } from 'next/server';

const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=world.thelink.app';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  const isAndroidPhone = /android/i.test(userAgent) && /mobile/i.test(userAgent);

  if (!isAndroidPhone || (request.method !== 'GET' && request.method !== 'HEAD')) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(ANDROID_PLAY_STORE_URL, 302);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|favicon.ico|robots.txt|sitemap.xml|.*\\.[^/]+$).*)',
  ],
};
