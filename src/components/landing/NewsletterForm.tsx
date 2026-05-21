'use client';

export function NewsletterForm() {
  return (
    <form
      className="flex items-stretch border border-white/18 rounded-sm overflow-hidden hover:border-white/35 transition-colors duration-200 focus-within:border-pink-500/55"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 bg-transparent px-3 py-2.5 text-xs text-white placeholder-white/28 outline-none min-w-0"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="px-3 py-2.5 bg-gradient-to-r from-pink-600 to-violet-600 text-white hover:from-pink-500 hover:to-violet-500 transition-all duration-200 flex-shrink-0"
      >
        <span className="text-sm font-bold">›</span>
      </button>
    </form>
  );
}
