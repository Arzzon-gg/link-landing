import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCOUNT_SESSION_COOKIE_NAME } from '@/lib/account-auth';
import { getCurrentAccountSession } from '@/lib/account-session';
import { buildGuestWheelUrl, buildWheelUrl } from '@/lib/wheel';
import { SpinWheelFrame } from './SpinWheelFrame';

export const metadata: Metadata = {
  title: 'Daily Spin | The Link',
  description: 'Spin the daily wheel for a reward.',
};

type SpinPageProps = {
  searchParams: Promise<{ guest?: string }>;
};

// Full-screen wheel launched right after signup. Reads the player's session
// from the auth cookie (set by both the email signup and Google login flows)
// and hands it to the embedded Flutter wheel so it opens already authenticated.
//
// A visitor who followed "Continue as guest" (?guest=1) skips the login
// redirect and gets an unauthenticated preview of the wheel instead — see
// buildGuestWheelUrl and the guest branch in SpinWheelFrame.
export default async function SpinPage({ searchParams }: SpinPageProps) {
  const { guest } = await searchParams;
  const session = await getCurrentAccountSession();
  const token = (await cookies()).get(ACCOUNT_SESSION_COOKIE_NAME)?.value?.trim();

  if (!session || !token) {
    if (guest !== '1') {
      redirect('/login');
    }

    return (
      <main className="fixed inset-0 bg-black">
        <SpinWheelFrame wheelUrl={buildGuestWheelUrl()} isGuest />
      </main>
    );
  }

  const wheelUrl = buildWheelUrl({
    token,
    userId: session.userId,
    name: session.name,
    role: session.role,
    branchId: session.branchId,
    branchName: session.branchName,
  });

  return (
    <main className="fixed inset-0 bg-black">
      <SpinWheelFrame wheelUrl={wheelUrl} />
    </main>
  );
}
