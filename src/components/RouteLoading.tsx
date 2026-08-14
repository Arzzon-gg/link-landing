import Image from 'next/image';

interface RouteLoadingProps {
  label?: string;
  overlay?: boolean;
}

export function RouteLoading({
  label = 'Loading The Link',
  overlay = false,
}: RouteLoadingProps) {
  return (
    <div
      className={
        overlay
          ? 'absolute inset-0 z-20 flex items-center justify-center bg-[#020209]'
          : 'flex min-h-screen items-center justify-center bg-[#020209]'
      }
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <Image
          src="/images/ZlinkLogo.png"
          alt="The Link"
          width={92}
          height={37}
          priority
          className="h-auto w-[92px] object-contain"
        />
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-300 border-r-violet-500" />
        </div>
        <p className="font-orbitron text-[10px] font-black uppercase tracking-[0.28em] text-white/55">
          {label}
        </p>
      </div>
    </div>
  );
}
