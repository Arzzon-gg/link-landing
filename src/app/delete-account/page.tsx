import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Delete Your Account | The Link',
  description:
    'How to request deletion of your The Link account and the data associated with it.',
};

const CONTACT_EMAIL = 'privacy@thelink.world';

export default function DeleteAccountPage() {
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main className="relative px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 sm:p-10">
            <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-pink-300/70">
              The Link Account
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Delete Your Account
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-[15px]">
              You can request deletion of your The Link account and the data
              associated with it at any time. Follow the steps below.
            </p>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <h2 className="mb-2 text-base font-semibold text-white">
                  1. Send a deletion request
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  Email us from the address registered on your account at{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Delete%20my%20account`}
                    className="inline-flex items-center gap-1.5 text-violet-300 underline underline-offset-2 hover:text-violet-200"
                  >
                    <Mail size={14} />
                    {CONTACT_EMAIL}
                  </a>{' '}
                  with the subject &ldquo;Delete my account.&rdquo; Include the email
                  address or phone number your account is registered with.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <h2 className="mb-2 text-base font-semibold text-white">
                  2. We verify and confirm
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  We&rsquo;ll verify the request is from the account owner and confirm
                  by reply email. We aim to complete deletion requests within 30
                  days.
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <h2 className="mb-2 text-base font-semibold text-white">
                  3. What gets deleted
                </h2>
                <p className="mb-3 text-sm leading-relaxed text-white/60">
                  Once your request is processed, we permanently delete:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-white/60 marker:text-violet-400">
                  <li>Your name, email, phone number, and profile details</li>
                  <li>Your login credentials and linked Google sign-in</li>
                  <li>Your wallet balance and rewards status</li>
                  <li>Push-notification tokens and device data</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-5">
                <h2 className="mb-2 text-base font-semibold text-white">
                  What we retain, and why
                </h2>
                <p className="text-sm leading-relaxed text-white/60">
                  Certain financial records — such as completed wallet transactions
                  and order history — may be retained for a limited period after
                  account deletion where required by applicable tax, accounting, or
                  consumer-protection law. This information is kept only for legal
                  compliance and is not used for any other purpose once your account
                  is deleted.
                </p>
              </div>
            </div>

            <p className="mt-8 text-xs leading-relaxed text-white/35">
              For details on what data we collect and how we use it before
              deletion, see our{' '}
              <Link
                href="/privacy"
                className="text-violet-300 underline underline-offset-2 hover:text-violet-200"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
