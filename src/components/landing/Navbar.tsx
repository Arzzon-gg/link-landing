'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'HOME', href: '/#home', activePath: '/' },
  { label: 'MENU', href: '/menu', activePath: '/menu' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isActive(activePath?: string) {
    return activePath ? pathname === activePath : false;
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

          <div className="hidden lg:block">
            <Link
              href="/register"
              className="button-sheen inline-flex overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-500 hover:to-violet-500 hover:shadow-[0_0_35px_rgba(236,72,153,0.65)]"
            >
              BOOK NOW
            </Link>
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
              >
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="button-sheen mt-2 inline-flex w-full justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(236,72,153,0.35)]"
                >
                  BOOK NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
