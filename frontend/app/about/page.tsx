'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const team = [
  { name: 'Alex Chen', role: 'CEO & Co-founder', bio: 'Former recruiter at Google. Saw firsthand how great candidates got filtered out by ATS systems.' },
  { name: 'Priya Sharma', role: 'CTO & Co-founder', bio: 'ML engineer with 8 years building NLP systems. Led AI teams at two YC startups.' },
  { name: 'Marcus Williams', role: 'Head of Product', bio: 'Product lead obsessed with making complex AI approachable for everyday job seekers.' },
];

const values = [
  { icon: '✦', title: 'Candidate First', desc: 'Every decision we make starts with one question: does this help job seekers land interviews?' },
  { icon: '◎', title: 'Radical Transparency', desc: 'We show you exactly why you scored what you scored — no black boxes, no vague advice.' },
  { icon: '▲', title: 'Continuous Improvement', desc: 'We ship improvements weekly, driven directly by user feedback and outcome data.' },
  { icon: '◈', title: 'Privacy by Default', desc: 'Your resume is yours. We never store it longer than necessary or sell your data.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{ background: 'rgba(124,106,255,0.12)', border: '1px solid rgba(124,106,255,0.3)', color: 'var(--accent3)' }}>
              Our Story
            </div>
            <h1 className="font-display font-extrabold text-5xl mb-6"
              style={{ letterSpacing: '-2px', color: 'var(--text)' }}>
              We believe great candidates
              <span className="text-gradient"> deserve a fair shot.</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text2)' }}>
              ResumeAI Pro was born from frustration. Our founders watched qualified candidates get auto-rejected
              because their resumes couldn't survive ATS filters. We built the tool we wished existed.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="py-12" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: '50K+', label: 'Resumes Analyzed' },
                { val: '94%', label: 'ATS Pass Rate' },
                { val: '3×', label: 'More Interviews' },
                { val: '4.9★', label: 'User Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display font-extrabold text-3xl mb-1" style={{ color: 'var(--accent3)' }}>{stat.val}</div>
                  <div className="text-sm" style={{ color: 'var(--text3)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl mb-3" style={{ letterSpacing: '-1px', color: 'var(--text)' }}>What we stand for</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <div className="text-2xl mb-4" style={{ color: 'var(--accent3)' }}>{v.icon}</div>
                <h3 className="font-display font-bold text-base mb-2" style={{ color: 'var(--text)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-20" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <h2 className="font-display font-extrabold text-3xl mb-3" style={{ letterSpacing: '-1px', color: 'var(--text)' }}>Meet the team</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl text-center" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl"
                    style={{ background: 'linear-gradient(135deg, rgba(124,106,255,0.3), rgba(59,158,255,0.3))', color: 'var(--accent3)' }}>
                    {member.name[0]}
                  </div>
                  <h3 className="font-display font-bold text-base mb-1" style={{ color: 'var(--text)' }}>{member.name}</h3>
                  <div className="text-xs mb-3" style={{ color: 'var(--accent3)' }}>{member.role}</div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-extrabold text-3xl mb-4" style={{ letterSpacing: '-1px', color: 'var(--text)' }}>
              Ready to transform your resume?
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--text2)' }}>Join 50,000+ job seekers who've improved their chances.</p>
            <Link href="/analyzer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium no-underline"
              style={{ background: 'var(--accent)', color: '#fff' }}>
              Analyze My Resume →
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
