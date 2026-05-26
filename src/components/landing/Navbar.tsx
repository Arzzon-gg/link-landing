'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ACTIVITIES', href: '#activities' },
  { label: 'FOOD & DRINKS', href: '#food' },
  { label: 'BIRTHDAYS', href: '#birthdays' },
  { label: 'OFFERS', href: '#offers' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'ABOUT', href: '#about' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020209]/95 backdrop-blur-md border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <Image src="/images/ZlinkLogo.png" alt="The Link Diner & Bowling logo" width={100} height={40} className="object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[11px] font-bold tracking-widest uppercase transition-colors duration-200 group ${
                  i === 0 ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                {link.label}
                {i === 0 && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-white" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-pink-500 to-violet-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Book Now CTA */}
          <div className="hidden lg:block">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 text-white text-[11px] font-black tracking-widest uppercase hover:from-pink-500 hover:to-violet-500 transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.65)]"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#02020f]/98 backdrop-blur-sm border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-bold tracking-[0.15em] text-white/65 hover:text-white uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 to-violet-600 text-white text-sm font-black tracking-widest uppercase text-center shadow-[0_0_20px_rgba(236,72,153,0.35)]"
          >
            BOOK NOW
          </Link>
        </div>
      )}
    </header>
  );
}
