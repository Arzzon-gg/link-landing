export const ACCOUNT_SESSION_COOKIE_NAME = 'the_link_account_token';
export const ACCOUNT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function getAccountSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ACCOUNT_SESSION_MAX_AGE_SECONDS,
  };
}
