// Server component — no client-side JS needed, purely decorative CSS.

export function ArcadeBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#020209]" />

      {/* Scrolling grid */}
      <div className="absolute inset-0 arcade-grid opacity-100" />

      {/* Top purple spotlight — mimics an overhead stage light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-5%,rgba(139,92,246,0.13),transparent_70%)]" />

      {/* Bottom cyan glow — grounds the scene */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_110%,rgba(6,182,212,0.09),transparent_70%)]" />

      {/* Ambient left orb */}
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-600/[0.05] blur-[120px] animate-pulse-slow" />

      {/* Ambient right orb */}
      <div
        className="absolute -bottom-32 -right-32 w-[560px] h-[560px] rounded-full bg-cyan-600/[0.05] blur-[140px] animate-pulse-slow"
        style={{ animationDelay: '2s' }}
      />

      {/* Subtle top-left corner accent */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.07),transparent_60%)]" />

      {/* Subtle bottom-right corner accent */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.07),transparent_60%)]" />
    </div>
  );
}
