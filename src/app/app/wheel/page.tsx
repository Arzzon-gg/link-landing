import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ACCOUNT_SESSION_COOKIE_NAME } from '@/lib/account-auth';
import { getCurrentAccountSession } from '@/lib/account-session';

/**
 * Browser fallback for the same canonical URL used by push notifications and
 * mobile universal/app links. Installed apps claim this path directly; when
 * the link is opened in a browser, continue into the signed-in wheel page.
 */
export default async function AppWheelLinkPage() {
  const session = await getCurrentAccountSession();
  const token = (await cookies()).get(ACCOUNT_SESSION_COOKIE_NAME)?.value?.trim();

  if (!session || !token) {
    redirect('/login');
  }

  redirect('/spin');
}
