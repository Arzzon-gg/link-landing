import type { Metadata } from 'next';
import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ForgotPasswordForm } from '@/components/login/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | The Link',
  description: 'Reset the password for your The Link account.',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main className="relative px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  );
}
