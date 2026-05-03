'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { FileText, TrendingUp, Zap, Clock, Plus, Trash2, ExternalLink } from 'lucide-react';

// Sample dashboard data — replace with real API calls
const sampleResumes = [
  { id: '1', name: 'Software_Engineer_Resume.pdf', score: 84, date: '2025-01-15', analyses: 3 },
  { id: '2', name: 'Product_Manager_Resume.docx', score: 71, date: '2025-01-10', analyses: 2 },
  { id: '3', name: 'Senior_Dev_Resume_v2.pdf', score: 91, date: '2025-01-05', analyses: 5 },
];

const sampleActivity = [
  { action: 'Analyzed resume', file: 'Software_Engineer_Resume.pdf', score: 84, time: '2 hours ago' },
  { action: 'Compared with JD', file: 'Product_Manager_Resume.docx', score: 71, time: '5 days ago' },
  { action: 'Analyzed resume', file: 'Senior_Dev_Resume_v2.pdf', score: 91, time: '10 days ago' },
];

function scoreColor(s: number) {
  return s >= 80 ? '#22c77a' : s >= 60 ? '#f5a623' : '#ef4444';
}

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${scoreColor(score)}20`, color: scoreColor(score), border: `1px solid ${scoreColor(score)}40` }}>
      {score}/100
    </span>
  );
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState(sampleResumes);

  const stats = [
    { label: 'Resumes Analyzed', value: resumes.length, icon: FileText, color: '#7c6aff' },
    { label: 'Avg ATS Score', value: Math.round(resumes.reduce((a, r) => a + r.score, 0) / resumes.length), icon: TrendingUp, color: '#22c77a' },
    { label: 'Best Score', value: Math.max(...resumes.map(r => r.score)), icon: Zap, color: '#f5a623' },
    { label: 'Analyses Run', value: resumes.reduce((a, r) => a + r.analyses, 0), icon: Clock, color: '#3b9eff' },
  ];

  const deleteResume = (id: string) => setResumes(prev => prev.filter(r => r.id !== id));

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl" style={{ letterSpacing: '-1px', color: 'var(--text)' }}>Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text3)' }}>Welcome back — here's your resume overview</p>
          </div>
          <Link href="/analyzer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium no-underline"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <Plus size={16} /> New Analysis
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${stat.color}20` }}>
                    <Icon size={18} color={stat.color} />
                  </div>
                </div>
                <div className="font-display font-extrabold text-2xl" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resume list */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="md:col-span-2 p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>Your Resumes</h2>
              <Link href="/analyzer" className="text-xs no-underline" style={{ color: 'var(--accent3)' }}>+ Upload new</Link>
            </div>

            {resumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'var(--bg3)' }}>
                  <FileText size={22} color="var(--text3)" />
                </div>
                <p className="text-sm" style={{ color: 'var(--text3)' }}>No resumes yet</p>
                <Link href="/analyzer" className="inline-block mt-3 px-4 py-2 rounded-lg text-xs font-medium no-underline"
                  style={{ background: 'var(--accent)', color: '#fff' }}>Analyze your first resume</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className="flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(124,106,255,0.15)' }}>
                      <FileText size={16} color="var(--accent3)" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{resume.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
                        {resume.analyses} {resume.analyses === 1 ? 'analysis' : 'analyses'} · {new Date(resume.date).toLocaleDateString()}
                      </div>
                    </div>
                    <ScoreBadge score={resume.score} />
                    <div className="flex items-center gap-2">
                      <Link href="/analyzer" className="p-1.5 rounded-lg transition-all no-underline"
                        style={{ color: 'var(--text3)' }} title="Re-analyze">
                        <ExternalLink size={14} />
                      </Link>
                      <button onClick={() => deleteResume(resume.id)} className="p-1.5 rounded-lg transition-all"
                        style={{ color: 'var(--text3)' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Activity feed */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <h2 className="font-display font-bold text-base mb-5" style={{ color: 'var(--text)' }}>Recent Activity</h2>
            <div className="flex flex-col gap-4">
              {sampleActivity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--accent3)' }} />
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text)' }}>{a.action}</div>
                    <div className="text-xs truncate mt-0.5" style={{ color: 'var(--text3)', maxWidth: '160px' }}>{a.file}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <ScoreBadge score={a.score} />
                      <span className="text-xs" style={{ color: 'var(--text3)' }}>{a.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Plan usage */}
            <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex justify-between text-xs mb-2">
                <span style={{ color: 'var(--text2)' }}>Monthly analyses</span>
                <span style={{ color: 'var(--text)' }}>3 / 3</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg4)' }}>
                <div className="h-full rounded-full" style={{ width: '100%', background: '#f5a623' }} />
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>Free plan limit reached</p>
              <Link href="/pricing" className="mt-3 block w-full py-2 rounded-lg text-xs font-medium text-center no-underline"
                style={{ background: 'rgba(124,106,255,0.15)', color: 'var(--accent3)', border: '1px solid rgba(124,106,255,0.25)' }}>
                Upgrade to Pro →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ATS Score trend chart (visual) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-6 p-6 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <h2 className="font-display font-bold text-base mb-5" style={{ color: 'var(--text)' }}>ATS Score History</h2>
          <div className="flex items-end gap-4 h-32">
            {[62, 68, 71, 74, 78, 84, 91].map((score, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-xs font-bold" style={{ color: scoreColor(score) }}>{score}</span>
                <div className="w-full rounded-t-md transition-all duration-700"
                  style={{
                    height: `${(score / 100) * 80}px`,
                    background: `linear-gradient(to top, ${scoreColor(score)}40, ${scoreColor(score)}90)`,
                    border: `1px solid ${scoreColor(score)}50`,
                  }} />
                <span className="text-xs" style={{ color: 'var(--text3)' }}>v{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--text3)' }}>Score progression across resume versions</p>
        </motion.div>
      </main>
    </div>
  );
}
