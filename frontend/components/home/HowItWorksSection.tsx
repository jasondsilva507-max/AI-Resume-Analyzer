'use client';
import { motion } from 'framer-motion';

// How It Works
export function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Upload Your Resume', desc: 'Drop your PDF or DOCX file, or paste your resume text directly.' },
    { num: '02', title: 'Add Job Description', desc: 'Optionally paste the job description for targeted match analysis.' },
    { num: '03', title: 'AI Analysis', desc: 'Claude AI analyzes your resume across 10+ dimensions in seconds.' },
    { num: '04', title: 'Get Your Report', desc: 'Review your ATS score, keywords, suggestions, and rewrite recommendations.' },
  ];

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-display font-extrabold text-4xl mb-4" style={{ letterSpacing: '-1.5px', color: 'var(--text)' }}>How it works</h2>
          <p className="text-base" style={{ color: 'var(--text2)' }}>Four simple steps to a stronger resume.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg mx-auto mb-4" style={{ background: 'rgba(124,106,255,0.15)', color: 'var(--accent3)' }}>{step.num}</div>
              <h3 className="font-display font-bold text-sm mb-2" style={{ color: 'var(--text)' }}>{step.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text3)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
