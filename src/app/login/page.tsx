import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { AccountLoginForm } from '@/components/login/AccountLoginForm';
import { getCurrentAccountSession } from '@/lib/account-session';

export const metadata: Metadata = {
  title: 'Log In | The Link',
  description: 'Log in to your real The Link account and stay connected on the web.',
};

export default async function LoginPage() {
  const session = await getCurrentAccountSession();

  if (session) {
    redirect('/menu');
  }

  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main className="relative px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <AccountLoginForm />
      </main>
      <Footer />
    </>
  );
}
