import 'server-only';
import { cookies } from 'next/headers';
import { ACCOUNT_SESSION_COOKIE_NAME } from '@/lib/account-auth';
import { parseCloudHubSession, type CloudHubAuthPayload } from '@/lib/cloudhub-auth';

export async function getCurrentAccountSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCOUNT_SESSION_COOKIE_NAME)?.value?.trim();

  if (!token) {
    return null;
  }

  const apiBaseUrl = process.env.CLOUDHUB_API_URL?.trim();

  if (!apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/auth/session`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as CloudHubAuthPayload;
    const parsedSession = parseCloudHubSession(payload);

    if (!parsedSession) {
      return null;
    }

    return parsedSession.session;
  } catch (error) {
    console.error('[account-session] Failed to fetch current session:', error);
    return null;
  }
}
