'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LogOut, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import type { AccountLoginSession } from '@/types/auth';

const navLinks = [
  { label: 'HOME', href: '/#home', activePath: '/' },
  { label: 'MENU', href: '/menu', activePath: '/menu' },
  { label: 'PACKAGES', href: '/packages', activePath: '/packages' },
];

type NavbarClientProps = {
  session: AccountLoginSession | null;
};

export function NavbarClient({ session }: NavbarClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, startLogoutTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const isSignupPage = pathname === '/signup';
  const isLoginPage = pathname === '/login';
  const isSignedIn = !!session;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isActive(activePath?: string) {
    return activePath ? pathname === activePath : false;
  }

  function handleLogout() {
    startLogoutTransition(async () => {
      try {
        await fetch('/api/account-logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      } finally {
        setMobileOpen(false);
        router.refresh();
        router.push('/');
      }
    });
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.07] bg-[#020209]/92 shadow-[0_4px_30px_rgba(0,0,0,0.6)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="group flex-shrink-0">
            <div className="transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src="/images/ZlinkLogo.png"
                alt="The Link Diner & Bowling logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                  isActive(link.activePath) ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.activePath) && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
                )}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isSignedIn ? (
              <>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-right shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                  <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                    Signed in
                  </p>
                  <p className="mt-1 max-w-[180px] truncate text-xs text-white/76">
                    {session.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="button-sheen inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/16 bg-white/[0.03] px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-white/84 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:text-cyan-300 hover:shadow-[0_0_26px_rgba(34,211,238,0.16)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing out
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" />
                      Log out
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    'button-sheen inline-flex overflow-hidden rounded-full border px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                    isLoginPage
                      ? 'border-cyan-400/28 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.14)]'
                      : 'border-white/16 bg-white/[0.03] text-white/78 hover:-translate-y-0.5 hover:border-cyan-400/35 hover:text-cyan-300 hover:shadow-[0_0_26px_rgba(34,211,238,0.16)]'
                  )}
                >
                  LOG IN
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    'button-sheen inline-flex overflow-hidden rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                    isSignupPage
                      ? 'border border-white/16 bg-white/[0.04] text-white shadow-[0_0_20px_rgba(6,182,212,0.14)]'
                      : 'bg-gradient-to-r from-pink-600 to-violet-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:-translate-y-0.5 hover:from-pink-500 hover:to-violet-500 hover:shadow-[0_0_35px_rgba(236,72,153,0.65)]'
                  )}
                >
                  CREATE ACCOUNT
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/[0.06] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-[#02020f]/98 px-6 py-6 backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ delay: index * 0.05, duration: 0.22 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-bold uppercase tracking-[0.15em] text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.12, duration: 0.22 }}
                className="grid gap-3"
              >
                {isSignedIn ? (
                  <>
                    <div className="rounded-[1.4rem] border border-cyan-400/20 bg-cyan-400/10 px-4 py-4 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
                      <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                        Signed in
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{session.name}</p>
                      <p className="mt-1 text-xs text-white/42">{session.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="button-sheen inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/16 bg-white/[0.03] px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-white/84 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Signing out
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4" />
                          Log out
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'button-sheen inline-flex w-full justify-center overflow-hidden rounded-full border px-5 py-3 text-center text-sm font-black uppercase tracking-widest transition-all duration-300',
                        isLoginPage
                          ? 'border-cyan-400/28 bg-cyan-400/10 text-cyan-300'
                          : 'border-white/16 bg-white/[0.03] text-white/84'
                      )}
                    >
                      LOG IN
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'button-sheen inline-flex w-full justify-center overflow-hidden rounded-full px-5 py-3 text-center text-sm font-black uppercase tracking-widest',
                        isSignupPage
                          ? 'border border-white/16 bg-white/[0.04] text-white'
                          : 'bg-gradient-to-r from-pink-600 to-violet-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                      )}
                    >
                      CREATE ACCOUNT
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
