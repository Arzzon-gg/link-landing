export function MenuPageLoading() {
  return (
    <div className="px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-7xl animate-pulse space-y-10">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="h-10 w-40 rounded-full bg-white/8" />
            <div className="h-16 max-w-3xl rounded-3xl bg-white/8 sm:h-20" />
            <div className="h-16 max-w-2xl rounded-3xl bg-white/6" />
            <div className="flex flex-wrap gap-3">
              <div className="h-12 w-40 rounded-full bg-white/8" />
              <div className="h-12 w-44 rounded-full bg-white/8" />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-4">
            <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
              <div className="h-[240px] rounded-[1.2rem] bg-white/8" />
              <div className="space-y-4 rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="h-4 w-28 rounded-full bg-white/8" />
                <div className="h-12 rounded-2xl bg-white/8" />
                <div className="h-20 rounded-2xl bg-white/6" />
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-20 rounded-2xl bg-white/8" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex gap-3 overflow-x-auto py-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-16 min-w-[190px] rounded-full border border-white/8 bg-white/[0.03]"
            />
          ))}
        </div>

        <section className="space-y-6">
          <div className="h-12 w-80 rounded-3xl bg-white/8" />
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[1.7rem] border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="h-[250px] rounded-[1.3rem] bg-white/8" />
                <div className="mt-5 h-8 w-3/4 rounded-2xl bg-white/8" />
                <div className="mt-4 h-20 rounded-3xl bg-white/6" />
                <div className="mt-5 h-16 rounded-[1.35rem] bg-white/8" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
