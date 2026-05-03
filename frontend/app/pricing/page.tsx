'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PricingSection } from '@/components/home/sections';
import { Check, X } from 'lucide-react';

const comparison = [
  { feature: 'Resume analyses / month', free: '3', pro: 'Unlimited', team: 'Unlimited' },
  { feature: 'ATS compatibility score', free: true, pro: true, team: true },
  { feature: 'Section-by-section feedback', free: true, pro: true, team: true },
  { feature: 'Keyword gap analysis', free: true, pro: true, team: true },
  { feature: 'AI rewrite suggestions', free: false, pro: true, team: true },
  { feature: 'Job description matching', free: false, pro: true, team: true },
  { feature: 'Grammar & formatting check', free: false, pro: true, team: true },
  { feature: 'Export PDF reports', free: false, pro: true, team: true },
  { feature: 'Resume version history', free: false, pro: true, team: true },
  { feature: 'Priority support', free: false, pro: true, team: true },
  { feature: 'Team seats', free: '1', pro: '1', team: '10' },
  { feature: 'API access', free: false, pro: false, team: true },
  { feature: 'White-label reports', free: false, pro: false, team: true },
];

function Cell({ val }: { val: boolean | string }) {
  if (typeof val === 'boolean') {
    return val
      ? <Check size={16} color="#22c77a" className="mx-auto" />
      : <X size={14} color="var(--text3)" className="mx-auto" />;
  }
  return <span className="text-sm" style={{ color: 'var(--text)' }}>{val}</span>;
}

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="pt-24">
        <div className="max-w-5xl mx-auto px-6 text-center mb-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-extrabold text-4xl mb-3" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>
              Simple, transparent pricing
            </h1>
            <p className="text-base" style={{ color: 'var(--text2)' }}>Start for free. Upgrade when you need more.</p>
          </motion.div>
        </div>

        <PricingSection />

        {/* Comparison table */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-display font-bold text-2xl mb-8 text-center" style={{ color: 'var(--text)' }}>Full feature comparison</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            {/* Header */}
            <div className="grid grid-cols-4 p-4 text-center text-sm font-semibold"
              style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--border)' }}>
              <div className="text-left" style={{ color: 'var(--text2)' }}>Feature</div>
              <div style={{ color: 'var(--text)' }}>Free</div>
              <div style={{ color: 'var(--accent3)' }}>Pro</div>
              <div style={{ color: 'var(--text)' }}>Team</div>
            </div>
            {comparison.map((row, i) => (
              <div key={row.feature}
                className="grid grid-cols-4 p-4 text-center text-sm items-center"
                style={{ background: i % 2 === 0 ? 'var(--bg2)' : 'var(--bg3)', borderBottom: i < comparison.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="text-left text-xs" style={{ color: 'var(--text2)' }}>{row.feature}</div>
                <div><Cell val={row.free} /></div>
                <div><Cell val={row.pro} /></div>
                <div><Cell val={row.team} /></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
