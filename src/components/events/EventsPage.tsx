import Link from 'next/link';
import { CalendarX, PartyPopper, RefreshCw } from 'lucide-react';
import { FadeIn, StaggerGroup, StaggerItem } from '@/components/Reveal';
import type { EventsLoadResult } from '@/types/events';
import { EventCard } from './EventCard';

interface EventsPageProps {
  result: EventsLoadResult;
}

export function EventsPage({ result }: EventsPageProps) {
  const isReady = result.status === 'ready';
  const events = isReady ? result.events : [];
  const isEmpty = isReady && events.length === 0;

  return (
    <div className="relative">
      <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden px-4 pt-16 sm:min-h-[340px] sm:px-6 lg:min-h-[380px] lg:px-8 lg:pt-20">
        <div className="hero-aurora pointer-events-none absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-pink-500/16 blur-[85px]" />
        <div className="hero-aurora hero-aurora-delayed pointer-events-none absolute bottom-[14%] right-[9%] h-48 w-48 rounded-full bg-cyan-400/14 blur-[90px]" />
        <div className="hero-light-sweep pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[#020209]/72" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020209] via-transparent to-[#020209]/45" />

        <div className="relative z-10 mx-auto max-w-3xl py-10 text-center sm:py-14">
          <FadeIn className="space-y-6">
            <div className="inline-flex items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 shadow-[0_0_24px_rgba(34,211,238,0.1)]">
              <PartyPopper size={15} className="mr-2 text-cyan-300" />
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
                Plan your celebration
              </span>
            </div>

            <h1 className="font-orbitron text-4xl font-black uppercase leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Events &
              <span className="block bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                party packages.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
              From birthdays to group gatherings, browse ready-made packages built for
              unforgettable moments inside the arcade atmosphere.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-10 text-center">
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/60 sm:w-24" />
              <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.34em] text-cyan-300">
                Browse packages
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/60 sm:w-24" />
            </div>
          </FadeIn>

          {!isReady ? (
            <FadeIn>
              <div className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.32)] sm:p-10">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-pink-400/20 bg-pink-500/10 shadow-[0_0_24px_rgba(236,72,153,0.12)]">
                    <RefreshCw size={26} className="text-pink-300" />
                  </div>
                  <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-pink-400">
                    Could not load events
                  </p>
                  <h3 className="mt-3 font-orbitron text-2xl font-black uppercase text-white sm:text-3xl">
                    Something went wrong on our end.
                  </h3>
                  <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/46">
                    {result.message}
                  </p>
                  <Link
                    href="/events"
                    className="button-sheen mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-600 to-violet-600 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.28em] text-white shadow-[0_0_30px_rgba(236,72,153,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:from-pink-500 hover:to-violet-500 hover:shadow-[0_0_48px_rgba(236,72,153,0.58)]"
                  >
                    Try again
                    <span className="text-base leading-none">&gt;</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          ) : isEmpty ? (
            <FadeIn>
              <div className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.32)] sm:p-10">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                    <CalendarX size={26} className="text-cyan-300" />
                  </div>
                  <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">
                    No packages yet
                  </p>
                  <h3 className="mt-3 font-orbitron text-2xl font-black uppercase text-white sm:text-3xl">
                    The party lineup is being refreshed.
                  </h3>
                  <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/46">
                    New event packages will appear here as soon as they are published. Check
                    back soon for birthdays, group deals, and special celebrations.
                  </p>
                </div>
              </div>
            </FadeIn>
          ) : (
            <StaggerGroup
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              stagger={0.1}
              amount={0.08}
            >
              {events.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
