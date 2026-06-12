import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Instagram, MapPin, Phone, Youtube } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';
import { NewsletterForm } from './NewsletterForm';

const anteliasMapsHref =
  'https://www.google.com/maps/search/?api=1&query=The%20Link%20Diner%20%26%20Bowling%20Antelias%2C%20Lebanon';
const mkallesMapsHref =
  'https://www.google.com/maps/search/?api=1&query=The%20Link%20Diner%20%26%20Bowling%20Mkalles%2C%20Lebanon';

const quickLinks = [
  { label: 'Create Account', href: '/signup' },
  { label: 'Log In', href: '/login' },
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
    <footer
      id="contact"
      className="relative border-t border-white/[0.07] bg-[#02020c] px-4 pb-8 pt-14 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/45 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 text-center">
          <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-white/36">
            Keep the vibe going
          </p>
        </FadeIn>

        <StaggerGroup className="mb-12 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5" stagger={0.1}>
          <StaggerItem className="col-span-2 sm:col-span-1">
            <div className="rounded-3xl border border-white/6 bg-white/[0.02] p-5 transition-all duration-300 hover:border-pink-400/14 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_-24px_rgba(236,72,153,0.26)]">
              <div className="mb-5 w-fit leading-none">
                <Image
                  src="/images/ZlinkLogo.png"
                  alt="The Link Diner & Bowling logo"
                  width={150}
                  height={50}
                  className="object-contain"
                />
              </div>
              <p className="mb-3 max-w-[220px] text-xs leading-relaxed text-white/38">
                The Link Diner &amp; Bowling
              </p>
              <p className="mb-5 max-w-[220px] text-[11px] leading-relaxed text-white/30">
                Bowling | Restaurant | Arcade
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-white/38 transition-all duration-200 hover:-translate-y-0.5 hover:text-pink-400"
                  aria-label="Instagram"
                >
                  <Instagram size={17} />
                </Link>
                <Link
                  href="#"
                  className="text-white/38 transition-all duration-200 hover:-translate-y-0.5 hover:text-pink-400"
                  aria-label="TikTok"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-white/38 transition-all duration-200 hover:-translate-y-0.5 hover:text-pink-400"
                  aria-label="YouTube"
                >
                  <Youtube size={17} />
                </Link>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h4 className="mb-5 font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white">
                QUICK LINKS
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/38 transition-all duration-200 hover:translate-x-1 hover:text-white/78"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h4 className="mb-5 font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white">
                USEFUL INFO
              </h4>
              <ul className="space-y-2.5">
                {usefulInfo.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-xs text-white/38 transition-all duration-200 hover:translate-x-1 hover:text-white/78"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h4 className="mb-5 font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white">
                CONTACT US
              </h4>
              <ul className="space-y-3.5">
                <li className="text-xs text-white/38">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                    <div className="mb-2 flex items-start gap-2.5">
                      <MapPin size={15} className="mt-0.5 text-cyan-300" />
                      <a
                        href={anteliasMapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white/78"
                        aria-label="Open Antelias in maps"
                      >
                        Antelias
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-pink-300" />
                      <a href="tel:04403407" className="transition-colors hover:text-white/78">
                        04 403 407
                      </a>
                    </div>
                  </div>
                </li>
                <li className="text-xs text-white/38">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">
                    <div className="mb-2 flex items-start gap-2.5">
                      <MapPin size={15} className="mt-0.5 text-cyan-300" />
                      <a
                        href={mkallesMapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white/78"
                        aria-label="Open Mkalles in maps"
                      >
                        Mkalles
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-pink-300" />
                      <a href="tel:01490416" className="transition-colors hover:text-white/78">
                        01 490 416
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-white/38">
                  <Clock3 size={15} className="mt-0.5 text-amber-300" />
                  <span>
                    10:00 AM - 12:00 AM
                    <br />
                    Every Day
                  </span>
                </li>
              </ul>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div>
              <h4 className="mb-5 font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white">
                STAY CONNECTED
              </h4>
              <p className="mb-4 text-xs leading-relaxed text-white/38">
                Subscribe to get the best offers &amp; updates.
              </p>
              <NewsletterForm />
            </div>
          </StaggerItem>
        </StaggerGroup>

        <FadeIn>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
            <p className="text-[11px] tracking-wide text-white/22">
              &copy; {new Date().getFullYear()} The Link Diner &amp; Bowling. All rights reserved.
            </p>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/18">Crafted By</p>
              <Image
                src="/images/Arzzon.png"
                alt="Arzzon logo"
                width={120}
                height={112}
                className="h-auto w-[96px] opacity-90 sm:w-[120px]"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
