'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            background: 'rgba(124,106,255,0.12)',
            border: '1px solid rgba(124,106,255,0.3)',
            color: 'var(--accent3)',
          }}
        >
          <Sparkles size={14} />
          Powered by Claude AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display font-extrabold leading-none mb-6"
          style={{ fontSize: 'clamp(40px, 7vw, 72px)', letterSpacing: '-3px' }}
        >
          <span className="text-gradient">Your Resume.</span>
          <br />
          <span style={{ color: 'var(--text)' }}>Perfected by AI.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg max-w-xl mx-auto mb-10"
          style={{ color: 'var(--text2)' }}
        >
          Get an instant ATS score, keyword analysis, and AI-powered rewrite suggestions.
          Land 3× more interviews with a resume that passes every filter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap mb-16"
        >
          <Link
            href="/analyzer"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-base no-underline transition-all hover:scale-105"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            Analyze My Resume
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-base no-underline"
            style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: '50K+', label: 'Resumes Analyzed' },
            { value: '94%', label: 'ATS Pass Rate' },
            { value: '3×', label: 'More Interviews' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-2xl" style={{ color: 'var(--accent3)' }}>{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text3)' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
