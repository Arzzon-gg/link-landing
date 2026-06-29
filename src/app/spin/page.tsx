import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCOUNT_SESSION_COOKIE_NAME } from '@/lib/account-auth';
import { getCurrentAccountSession } from '@/lib/account-session';
import { buildWheelUrl } from '@/lib/wheel';
import { SpinWheelFrame } from './SpinWheelFrame';

export const metadata: Metadata = {
  title: 'Daily Spin | The Link',
  description: 'Spin the daily wheel for a reward.',
};

// Full-screen wheel launched right after signup. Reads the player's session
// from the auth cookie (set by both the email signup and Google login flows)
// and hands it to the embedded Flutter wheel so it opens already authenticated.
export default async function SpinPage() {
  const session = await getCurrentAccountSession();
  const token = (await cookies()).get(ACCOUNT_SESSION_COOKIE_NAME)?.value?.trim();

  if (!session || !token) {
    redirect('/login');
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
