'use client';

import { motion } from 'framer-motion';
import { Target, Zap, Search, BarChart3, MessageSquare, FileCheck } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'ATS Score',
    desc: 'Get your real ATS compatibility score with section-by-section breakdown.',
    color: 'rgba(124,106,255,0.15)',
    iconColor: '#a594ff',
  },
  {
    icon: Zap,
    title: 'AI Rewrites',
    desc: 'Claude AI suggests stronger bullets, better action verbs, achievement-focused language.',
    color: 'rgba(34,199,122,0.12)',
    iconColor: '#22c77a',
  },
  {
    icon: Search,
    title: 'JD Matching',
    desc: 'Paste any job description to see your match % and missing keywords instantly.',
    color: 'rgba(59,158,255,0.12)',
    iconColor: '#3b9eff',
  },
  {
    icon: BarChart3,
    title: 'Keyword Analysis',
    desc: 'Discover which industry keywords you have and which critical ones you\'re missing.',
    color: 'rgba(245,166,35,0.12)',
    iconColor: '#f5a623',
  },
  {
    icon: MessageSquare,
    title: 'Grammar Check',
    desc: 'Catch inconsistent tenses, missing articles, and issues that hurt your credibility.',
    color: 'rgba(239,68,68,0.1)',
    iconColor: '#ef4444',
  },
  {
    icon: FileCheck,
    title: 'Instant Report',
    desc: 'Full analysis in seconds with prioritized recommendations to maximize interviews.',
    color: 'rgba(124,106,255,0.08)',
    iconColor: '#a594ff',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>
            Everything you need to
            <span className="text-gradient"> get hired faster</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text2)' }}>
            Advanced AI analysis covering every dimension of your resume.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl"
                style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: feature.color }}
                >
                  <Icon size={20} color={feature.iconColor} />
                </div>
                <h3 className="font-display font-bold text-base mb-2" style={{ color: 'var(--text)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
