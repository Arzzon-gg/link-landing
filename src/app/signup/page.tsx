import type { Metadata } from 'next';
import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Footer } from '@/components/landing/Footer';
import { Navbar } from '@/components/landing/Navbar';
import { AccountSignupForm } from '@/components/signup/AccountSignupForm';

export const metadata: Metadata = {
  title: 'Create Account | The Link',
  description:
    'Create your real The Link account on the web while the mobile app store releases are pending.',
};

export default function SignupPage() {
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main className="relative px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <AccountSignupForm />
      </main>
      <Footer />
    </>
  );
}
