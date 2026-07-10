import type { Metadata } from 'next';
import Link from 'next/link';
import { ArcadeBackground } from '@/components/ArcadeBackground';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Link',
  description:
    'How The Link collects, uses, and protects your data across our app and website.',
};

const LAST_UPDATED = 'July 10, 2026';
const CONTACT_EMAIL = 'privacy@thelink.world';

export default function PrivacyPolicyPage() {
  return (
    <>
      <ArcadeBackground />
      <Navbar />
      <main className="relative px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 sm:p-10">
            <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-violet-300/70">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-white/40">Last updated: {LAST_UPDATED}</p>

            <div className="mt-8 space-y-8 text-sm leading-relaxed text-white/65 sm:text-[15px]">
              <section>
                <p>
                  This Privacy Policy explains how The Link Diner &amp; Bowling
                  (&ldquo;The Link,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, and
                  protects information when you use our mobile app or website
                  (together, the &ldquo;Service&rdquo;). By using the Service, you agree to
                  this policy.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  Information we collect
                </h2>
                <p className="mb-3">
                  When you create an account or use the Service, we may collect:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 marker:text-violet-400">
                  <li>
                    <span className="text-white/85">Account information</span> — your name,
                    email address, and phone number.
                  </li>
                  <li>
                    <span className="text-white/85">Authentication data</span> — a securely
                    hashed password, or your Google account identifier if you sign in
                    with Google.
                  </li>
                  <li>
                    <span className="text-white/85">Optional profile details</span> — date of
                    birth, address, and other details you choose to add to your
                    profile.
                  </li>
                  <li>
                    <span className="text-white/85">Wallet &amp; order activity</span> — your
                    wallet balance, top-ups, and order/purchase history at our
                    venues.
                  </li>
                  <li>
                    <span className="text-white/85">Camera</span> — used only when you choose
                    to scan a machine&rsquo;s QR code or use an augmented-reality preview.
                    We do not store photos or video from your camera.
                  </li>
                  <li>
                    <span className="text-white/85">Device &amp; usage data</span> — basic app
                    diagnostics and push-notification tokens, collected via Firebase,
                    to keep the Service reliable and let us send you order and
                    account notifications.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  How we use your information
                </h2>
                <p>We use the information above to:</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-violet-400">
                  <li>Create and secure your account, and let you sign in.</li>
                  <li>
                    Operate your wallet, process top-ups, and record your orders and
                    rewards.
                  </li>
                  <li>Let you scan machines to start playing at our venues.</li>
                  <li>Send you service notifications (e.g. order updates, offers).</li>
                  <li>Maintain the security and reliability of the Service.</li>
                  <li>Comply with legal and financial record-keeping obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  How we share your information
                </h2>
                <p>
                  We do not sell your personal information. We share data only
                  with:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-violet-400">
                  <li>
                    Service providers who help us run the Service, such as Firebase
                    (Google) for authentication, notifications, and diagnostics.
                  </li>
                  <li>
                    Authorities, when required by law, or to protect the rights and
                    safety of The Link and our users.
                  </li>
                </ul>
                <p className="mt-3">
                  We do not share your precise location with other users, and the
                  Service does not include any feature for users to message or share
                  content with one another.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  Data retention
                </h2>
                <p>
                  We keep your account information for as long as your account is
                  active. Financial records (such as wallet transactions and
                  purchase history) may be retained for longer where required by
                  applicable accounting or tax law, even after account deletion. See
                  our{' '}
                  <Link href="/delete-account" className="text-violet-300 underline underline-offset-2 hover:text-violet-200">
                    Delete Account
                  </Link>{' '}
                  page for details on what is deleted and what is retained.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  Your choices
                </h2>
                <p>
                  You can review and update most of your profile information from
                  within the app. You can request deletion of your account and
                  associated data at any time — see{' '}
                  <Link href="/delete-account" className="text-violet-300 underline underline-offset-2 hover:text-violet-200">
                    Delete Account
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  Children&rsquo;s privacy
                </h2>
                <p>
                  The Service is not directed at children and requires an account
                  and payment features not intended for children. We do not
                  knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  Changes to this policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Material
                  changes will be reflected by updating the &ldquo;Last updated&rdquo; date
                  above.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-white">Contact us</h2>
                <p>
                  Questions about this policy or your data? Email us at{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-violet-300 underline underline-offset-2 hover:text-violet-200"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
