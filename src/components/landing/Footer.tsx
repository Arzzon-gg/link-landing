import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';
import Image from 'next/image';

const anteliasMapsHref = 'https://www.google.com/maps/search/?api=1&query=The%20Link%20Diner%20%26%20Bowling%20Antelias%2C%20Lebanon';
const mkallesMapsHref = 'https://www.google.com/maps/search/?api=1&query=The%20Link%20Diner%20%26%20Bowling%20Mkalles%2C%20Lebanon';

const quickLinks = [
  { label: 'Activities', href: '/#activities' },
  { label: 'Food & Drinks', href: '/#food' },
  { label: 'Birthdays', href: '/#birthdays' },
  { label: 'Offers', href: '/#offers' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];
const usefulInfo = ['About Us', 'FAQs', 'Blog', 'Careers', 'Privacy Policy', 'Terms & Conditions'];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/[0.07] bg-[#02020c] pt-14 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Top gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/45 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <div className="leading-none w-fit mb-5">
                <Image src="/images/ZlinkLogo.png" alt="The Link Diner & Bowling logo" width={150} height={50} className="object-contain" />
            </div>
            <p className="text-white/38 text-xs leading-relaxed mb-3 max-w-[220px]">
              The Link Diner &amp; Bowling
            </p>
            <p className="text-white/30 text-[11px] leading-relaxed mb-5 max-w-[220px]">
              Bowling | Restaurant | Arcade
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <Link href="#" className="text-white/38 hover:text-pink-400 transition-colors duration-200" aria-label="Instagram">
                <Instagram size={17} />
              </Link>
              <Link href="#" className="text-white/38 hover:text-pink-400 transition-colors duration-200" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                </svg>
              </Link>
              <Link href="#" className="text-white/38 hover:text-pink-400 transition-colors duration-200" aria-label="YouTube">
                <Youtube size={17} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-black text-[10px] tracking-[0.28em] text-white uppercase mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/38 text-xs hover:text-white/75 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Info */}
          <div>
            <h4 className="font-orbitron font-black text-[10px] tracking-[0.28em] text-white uppercase mb-5">
              USEFUL INFO
            </h4>
            <ul className="space-y-2.5">
              {usefulInfo.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/38 text-xs hover:text-white/75 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-orbitron font-black text-[10px] tracking-[0.28em] text-white uppercase mb-5">
              CONTACT US
            </h4>
            <ul className="space-y-3.5">
              <li className="text-white/38 text-xs">
                <div className="space-y-1.5 rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 select-none">📍</span>
                    <a
                      href={anteliasMapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white/70 transition-colors"
                      aria-label="Open Antelias in maps"
                    >
                      Antelias
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="select-none">📞</span>
                    <a href="tel:04403407" className="hover:text-white/70 transition-colors">04 403 407</a>
                  </div>
                </div>
              </li>
              <li className="text-white/38 text-xs">
                <div className="space-y-1.5 rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 select-none">📍</span>
                    <a
                      href={mkallesMapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white/70 transition-colors"
                      aria-label="Open Mkalles in maps"
                    >
                      Mkalles
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="select-none">📞</span>
                    <a href="tel:01490416" className="hover:text-white/70 transition-colors">01 490 416</a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-white/38 text-xs">
                <span className="mt-0.5 select-none">🕐</span>
                <span>10:00 AM – 12:00 AM<br />Every Day</span>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h4 className="font-orbitron font-black text-[10px] tracking-[0.28em] text-white uppercase mb-5">
              STAY CONNECTED
            </h4>
            <p className="text-white/38 text-xs leading-relaxed mb-4">
              Subscribe to get the best offers &amp; updates.
            </p>
            <NewsletterForm />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/22 text-[11px] tracking-wide">
            &copy; {new Date().getFullYear()} The Link Diner &amp; Bowling. All rights reserved.
          </p>
          <div className="flex flex-col items-center sm:items-end gap-2">
            <p className="text-white/18 text-[11px] uppercase tracking-[0.22em]">
              Crafted By
            </p>
            <Image
              src="/images/Arzzon.png"
              alt="Arzzon logo"
              width={120}
              height={112}
              className="h-auto w-[96px] sm:w-[120px] opacity-90"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
