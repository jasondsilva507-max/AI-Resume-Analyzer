'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check } from 'lucide-react';

// ─── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Priya S.', role: 'Software Engineer', text: 'Went from 5% callback rate to 38% after fixing the keywords ResumeAI flagged. Got my dream job in 3 weeks!', score: 91 },
  { name: 'Marcus J.', role: 'Product Manager', text: 'The AI rewrite suggestions were incredible. My bullets actually sound professional now instead of generic.', score: 87 },
  { name: 'Aisha K.', role: 'Data Analyst', text: 'I had no idea my resume was failing ATS systems. This tool completely changed how I think about applications.', score: 83 },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>
            Loved by job seekers
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm" style={{ background: 'rgba(124,106,255,0.2)', color: 'var(--accent3)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: 'var(--text)' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: 'var(--text3)' }}>{t.role}</div>
                  </div>
                </div>
                <div className="text-sm font-display font-bold" style={{ color: '#22c77a' }}>ATS: {t.score}</div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ────────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Get started with basic analysis.',
    features: ['3 resume analyses/month', 'ATS score', 'Basic keyword check', 'Section scores'],
    cta: 'Start Free',
    href: '/analyzer',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    desc: 'Everything you need to land interviews.',
    features: ['Unlimited analyses', 'AI rewrite suggestions', 'Job description matching', 'Grammar check', 'Priority support', 'Export PDF reports'],
    cta: 'Start Pro Trial',
    href: '/auth/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$39',
    period: '/month',
    desc: 'For career coaches and teams.',
    features: ['Everything in Pro', '10 team seats', 'Bulk analysis', 'White-label reports', 'API access', 'Dedicated support'],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-base" style={{ color: 'var(--text2)' }}>Start free. Upgrade when you're ready.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl relative"
              style={{
                background: plan.highlighted ? 'rgba(124,106,255,0.08)' : 'var(--bg3)',
                border: plan.highlighted ? '1px solid rgba(124,106,255,0.4)' : '1px solid var(--border)',
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'var(--accent)', color: '#fff' }}>
                  Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display font-extrabold text-3xl" style={{ color: 'var(--text)' }}>{plan.price}</span>
                <span className="text-sm" style={{ color: 'var(--text3)' }}>{plan.period}</span>
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--text3)' }}>{plan.desc}</p>
              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={14} color="#22c77a" />
                    <span className="text-sm" style={{ color: 'var(--text2)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href={plan.href} className="block w-full py-3 rounded-xl text-sm font-medium text-center no-underline transition-all"
                style={{
                  background: plan.highlighted ? 'var(--accent)' : 'var(--bg4)',
                  color: plan.highlighted ? '#fff' : 'var(--text)',
                  border: plan.highlighted ? 'none' : '1px solid var(--border2)',
                }}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How does the ATS scoring work?', a: 'Our AI analyzes your resume against industry-standard ATS criteria including keyword density, formatting, section structure, and readability. The score reflects how likely automated systems are to shortlist you.' },
  { q: 'What file formats are supported?', a: 'We support PDF, DOCX, and TXT formats. For best results with PDFs, ensure they are text-based (not scanned images).' },
  { q: 'Is my resume data secure?', a: 'Yes. Resumes are analyzed in real-time and not stored permanently. We use encrypted connections and never share your data with third parties.' },
  { q: 'How accurate are the AI suggestions?', a: 'Our AI is powered by Claude (Anthropic), one of the most capable AI models available. Suggestions are context-aware and tailored to your specific industry and role level.' },
];

export function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>FAQ</h2>
        </motion.div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h4 className="font-display font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>{faq.q}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>
            Ready to land your dream job?
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--text2)' }}>
            Join 50,000+ job seekers who improved their resumes with AI.
          </p>
          <Link href="/analyzer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-base no-underline" style={{ background: 'var(--accent)', color: '#fff' }}>
            Analyze My Resume for Free →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
