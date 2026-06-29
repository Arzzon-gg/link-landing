'use client';

import { Loader2 } from 'lucide-react';
import { getIdToken, signInWithPopup, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getFirebaseAuthClient } from '@/lib/firebase-client';
import type { AccountLoginApiResponse } from '@/types/auth';

type GoogleAuthButtonProps = {
  mode: 'login' | 'signup';
  onError: (message: string | null) => void;
};

export function GoogleAuthButton({ mode, onError }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleGoogleSignIn() {
    onError(null);
    setIsLoading(true);

    let authClient: ReturnType<typeof getFirebaseAuthClient> | null = null;

    try {
      authClient = getFirebaseAuthClient();
      const { auth, provider } = authClient;
      const result = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(result.user, true);

      const response = await fetch('/api/account-login-google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const payload = (await response.json()) as AccountLoginApiResponse;

      if (!response.ok || !payload.success || !payload.session) {
        onError(payload.message ?? 'Google sign-in could not be completed. Please try again.');
        return;
      }

      router.refresh();
      // After both login and signup, launch the daily spin wheel. Profiles that
      // still need completing go to /signup first.
      router.replace(payload.session.profileCompleted ? '/spin' : '/signup');
    } catch (error) {
      console.error('[GoogleAuthButton] Google sign-in failed:', error);
      onError(resolveGoogleAuthErrorMessage(error));
    } finally {
      if (authClient) {
        await signOut(authClient.auth).catch(() => {});
      }

      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="button-sheen inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/14 bg-white/[0.04] px-5 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/[0.06] hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] disabled:cursor-not-allowed disabled:opacity-70"
      aria-label={mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <GoogleMark />
      )}
      {isLoading
        ? 'Connecting...'
        : mode === 'login'
          ? 'Continue with Google'
          : 'Sign up with Google'}
    </button>
  );
}

function resolveGoogleAuthErrorMessage(error: unknown) {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
      ? error.code
      : null;

  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return 'Google sign-in was cancelled before it finished.';
  }

  if (code === 'auth/popup-blocked') {
    return 'Your browser blocked the Google sign-in popup. Please allow popups and try again.';
  }

  if (code === 'auth/network-request-failed') {
    return 'Google sign-in could not reach Firebase. Check your internet, VPN, firewall, or antivirus and try again.';
  }

  if (code === 'auth/internal-error') {
    return 'Google sign-in hit a browser or network error. Please try again after refreshing the page.';
  }

  if (code === 'auth/account-exists-with-different-credential') {
    return 'This email already exists with a different sign-in method. Try email and password instead.';
  }

  if (error instanceof Error && error.message === 'Firebase auth is not configured on this site yet.') {
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return 'Google sign-in could not be completed. Please try again.';
}

function GoogleMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12.24 10.285V14.4h5.847c-.252 1.36-1.63 3.99-5.847 3.99-3.517 0-6.383-2.912-6.383-6.504s2.866-6.504 6.383-6.504c2.004 0 3.35.855 4.12 1.593l2.81-2.718C17.35 2.59 14.998 1.5 12.24 1.5 6.99 1.5 2.73 5.76 2.73 11.01s4.26 9.51 9.51 9.51c5.49 0 9.138-3.855 9.138-9.285 0-.624-.066-1.101-.147-1.575H12.24Z"
      />
      <path
        fill="#34A853"
        d="M3.826 7.064 7.21 9.545c.916-1.817 2.798-3.063 5.03-3.063 2.004 0 3.35.855 4.12 1.593l2.81-2.718C17.35 2.59 14.998 1.5 12.24 1.5c-3.653 0-6.81 2.086-8.414 5.564Z"
      />
      <path
        fill="#FBBC05"
        d="M12.24 20.52c2.69 0 4.95-.888 6.6-2.412l-3.052-2.505c-.818.57-1.902.972-3.548.972-4.2 0-5.571-2.864-5.815-4.204l-3.409 2.629c1.589 3.529 4.785 5.52 9.224 5.52Z"
      />
      <path
        fill="#4285F4"
        d="M21.378 11.235c0-.624-.066-1.101-.147-1.575H12.24V13.8h5.847c-.28 1.512-1.833 4.59-5.847 4.59-4.2 0-6.05-3.426-6.05-6.38 0-.397.041-.781.114-1.151l-3.409-2.629A9.67 9.67 0 0 0 2.73 11.01c0 5.25 4.26 9.51 9.51 9.51 5.49 0 9.138-3.855 9.138-9.285Z"
      />
    </svg>
  );
}
