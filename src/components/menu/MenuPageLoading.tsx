function SkeletonBlock({
  className,
}: {
  className: string;
}) {
  return <div className={`menu-shimmer rounded-[inherit] ${className}`} />;
}

export function MenuPageLoading() {
  return (
    <div className="px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="relative overflow-hidden rounded-[2.25rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,10,25,0.94),rgba(7,7,14,0.98))] px-6 py-10 sm:px-8 sm:py-14">
          <div className="menu-orb-float absolute left-8 top-6 h-24 w-24 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="menu-orb-float menu-orb-float-delayed absolute bottom-4 right-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative flex min-h-[300px] flex-col items-center justify-center gap-5 sm:min-h-[340px]">
            <SkeletonBlock className="h-16 w-full max-w-3xl rounded-3xl bg-white/8 sm:h-20" />
            <div className="flex flex-wrap items-center justify-center gap-3">
              <SkeletonBlock className="h-10 w-40 rounded-full bg-white/8" />
              <SkeletonBlock className="h-10 w-44 rounded-full bg-white/8" />
            </div>
            <SkeletonBlock className="h-12 w-48 rounded-full bg-white/8" />
          </div>
        </section>

        <div className="flex gap-3 overflow-x-auto py-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="menu-shimmer h-16 min-w-[190px] rounded-full border border-white/8 bg-white/[0.03]"
            />
          ))}
        </div>

        <section className="space-y-6">
          <SkeletonBlock className="h-12 w-80 rounded-3xl bg-white/8" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,rgba(10,10,25,0.95),rgba(7,7,14,0.96))] p-4"
              >
                <div className="menu-shimmer h-[250px] rounded-[1.3rem] bg-white/8" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <SkeletonBlock className="h-8 w-3/4 rounded-2xl bg-white/8" />
                  <SkeletonBlock className="h-8 w-24 rounded-full bg-white/8" />
                </div>
                <SkeletonBlock className="mt-4 h-20 rounded-3xl bg-white/6" />
                <SkeletonBlock className="mt-5 h-16 rounded-[1.35rem] bg-white/8" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
