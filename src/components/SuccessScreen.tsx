'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Copy, Check, Sparkles } from 'lucide-react';

interface SuccessScreenProps {
  submissionId: string;
}

// Small floating particles that burst out on success
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 280,
  y: -(Math.random() * 180 + 60),
  rotate: Math.random() * 360,
  scale: Math.random() * 0.6 + 0.4,
  color: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
}));

export function SuccessScreen({ submissionId }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(submissionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in some older browsers — silently skip
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Particle burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{ x: p.x, y: p.y, scale: p.scale, rotate: p.rotate, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 + p.id * 0.04 }}
            className="absolute w-2 h-2 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </div>

      {/* Card */}
      <div className="relative rounded-2xl border border-emerald-500/20 bg-[rgba(10,10,25,0.94)] backdrop-blur-xl shadow-[0_0_60px_rgba(52,211,153,0.07)] overflow-hidden p-10 text-center">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-emerald-500/30 rounded-tl" />
        <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-emerald-500/30 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-emerald-500/30 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-emerald-500/30 rounded-br" />

        {/* Trophy icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 14 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6"
        >
          <Trophy className="w-8 h-8 text-emerald-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              You&apos;re In!
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-3">
            Spot secured.
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            We&apos;ll reach out as soon as your access is ready.
          </p>

          {/* Confirmation ID card */}
          <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-4 mb-3">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-600 mb-2">
              Confirmation ID
            </p>
            <div className="flex items-center justify-between gap-3">
              <code className="text-sm text-violet-300 font-mono truncate">
                {submissionId}
              </code>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors"
                aria-label="Copy confirmation ID"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-500" />
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-700">
            Keep this ID for your records.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
