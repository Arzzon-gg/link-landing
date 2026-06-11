'use client';

export function NewsletterForm() {
  return (
    <form
      className="flex items-stretch overflow-hidden rounded-sm border border-white/18 transition-colors duration-200 hover:border-white/35 focus-within:border-pink-500/55"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email"
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs text-white placeholder-white/28 outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="button-sheen relative flex-shrink-0 overflow-hidden bg-gradient-to-r from-pink-600 to-violet-600 px-3 py-2.5 text-white transition-all duration-200 hover:from-pink-500 hover:to-violet-500"
      >
        <span className="text-sm font-bold">›</span>
      </button>
    </form>
  );
}
