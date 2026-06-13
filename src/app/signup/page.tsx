import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Footer } from '@/components/landing/Footer';
import { Navbar } from '@/components/landing/Navbar';
import { AccountSignupForm } from '@/components/signup/AccountSignupForm';
import { getCurrentAccountSession } from '@/lib/account-session';

export const metadata: Metadata = {
  title: 'Create Account | The Link',
  description:
    'Create your real The Link account on the web while the mobile app store releases are pending.',
};

export default async function SignupPage() {
  const session = await getCurrentAccountSession();

  if (session?.profileCompleted) {
    redirect('/menu');
  }

  return (
    <>
      <ArcadeBackground />
      {/* Mobile signup is a focused screen: no top nav / sidebar, no footer. */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <main className="relative px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <AccountSignupForm currentSession={session} />
      </main>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </>
  );
}
