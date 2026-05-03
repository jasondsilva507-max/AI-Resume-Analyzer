'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AnalysisProps {
  analysis: {
    overall_score: number;
    ats_score: number;
    recruiter_score: number;
    readability_score: number;
    job_match_percent?: number | null;
    sections: Record<string, { score: number; feedback: string }>;
    keywords_found: string[];
    keywords_missing: string[];
    strengths: string[];
    weaknesses: string[];
    suggestions: Array<{ type: string; section: string; before: string; after: string }>;
    grammar_issues: string[];
    formatting_issues: string[];
    summary: string;
  };
}

function scoreColor(s: number) {
  return s >= 80 ? '#22c77a' : s >= 60 ? '#f5a623' : '#ef4444';
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 46, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const col = scoreColor(score);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 96, height: 96 }}>
        <svg viewBox="0 0 120 120" width={96} height={96} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={60} cy={60} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
          <circle cx={60} cy={60} r={r} fill="none" stroke={col} strokeWidth={8} strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`} style={{ transition: 'stroke-dasharray 1.2s ease' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-xl" style={{ color: col, lineHeight: 1 }}>{score}</span>
          <span className="text-xs" style={{ color: 'var(--text3)' }}>/100</span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{label}</span>
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  const col = scoreColor(value);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs">
        <span style={{ color: 'var(--text2)' }}>{label}</span>
        <span style={{ color: col, fontWeight: 600 }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg4)' }}>
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, background: col }} />
      </div>
    </div>
  );
}

const TABS = ['overview', 'keywords', 'suggestions', 'details'] as const;

export default function AnalysisReport({ analysis: a }: AnalysisProps) {
  const [tab, setTab] = useState<typeof TABS[number]>('overview');

  return (
    <div>
      {/* Score overview */}
      <div className="p-6 rounded-xl mb-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
        <div className="flex gap-8 flex-wrap items-center justify-around mb-6">
          <ScoreRing score={a.overall_score} label="Overall" />
          <ScoreRing score={a.ats_score} label="ATS Score" />
          <ScoreRing score={a.recruiter_score} label="Recruiter" />
          <ScoreRing score={a.readability_score} label="Readability" />
          {a.job_match_percent != null && <ScoreRing score={a.job_match_percent} label="JD Match" />}
        </div>
        <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>{a.summary}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg mb-4" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-md text-xs font-medium capitalize transition-all"
            style={{
              background: tab === t ? 'var(--bg4)' : 'transparent',
              color: tab === t ? 'var(--text)' : 'var(--text3)',
              border: tab === t ? '1px solid var(--border2)' : '1px solid transparent',
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Section Scores</h3>
              <div className="flex flex-col gap-4">
                {Object.entries(a.sections || {}).map(([k, v]) => (
                  <ProgressBar key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={v.score} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--text)' }}>✦ Strengths</h3>
                {(a.strengths || []).map(s => (
                  <div key={s} className="flex gap-2 items-start mb-2">
                    <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
                    <span className="text-xs" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--text)' }}>△ Needs Work</h3>
                {(a.weaknesses || []).map(w => (
                  <div key={w} className="flex gap-2 items-start mb-2">
                    <span style={{ color: 'var(--amber)', flexShrink: 0 }}>△</span>
                    <span className="text-xs" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Section feedback cards */}
            <div className="md:col-span-2 p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Section Feedback</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(a.sections || {}).map(([k, v]) => (
                  <div key={k} className="p-3 rounded-lg" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold capitalize" style={{ color: 'var(--text)' }}>{k}</span>
                      <span className="text-sm font-bold" style={{ color: scoreColor(v.score) }}>{v.score}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>{v.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'keywords' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>Keywords Found</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(34,199,122,0.12)', color: '#22c77a', border: '1px solid rgba(34,199,122,0.25)' }}>{(a.keywords_found || []).length} found</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(a.keywords_found || []).map(k => (
                  <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(34,199,122,0.1)', color: '#22c77a', border: '1px solid rgba(34,199,122,0.25)' }}>✓ {k}</span>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>Keywords Missing</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>{(a.keywords_missing || []).length} missing</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(a.keywords_missing || []).map(k => (
                  <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>✕ {k}</span>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: 'var(--text3)' }}>Add these naturally to your resume to boost ATS pass rate.</p>
            </div>
            {a.grammar_issues?.length > 0 && (
              <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--text)' }}>Grammar Issues</h3>
                {a.grammar_issues.map((g, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span style={{ color: 'var(--amber)' }}>△</span>
                    <span className="text-xs" style={{ color: 'var(--text2)' }}>{g}</span>
                  </div>
                ))}
              </div>
            )}
            {a.formatting_issues?.length > 0 && (
              <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--text)' }}>Formatting Issues</h3>
                {a.formatting_issues.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span style={{ color: 'var(--blue)' }}>◎</span>
                    <span className="text-xs" style={{ color: 'var(--text2)' }}>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'suggestions' && (
          <div>
            <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>AI-powered rewrites to strengthen your resume's impact.</p>
            {a.suggestions?.map((s, i) => (
              <div key={i} className="p-4 rounded-xl mb-3" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(124,106,255,0.12)', color: 'var(--accent3)', border: '1px solid rgba(124,106,255,0.25)' }}>{s.section}</span>
                  <span className="text-xs" style={{ color: 'var(--text3)' }}>{s.type?.replace(/_/g, ' ')}</span>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#ef4444' }}>Before</p>
                <div className="p-3 rounded-lg text-xs leading-relaxed mb-3" style={{ background: 'rgba(239,68,68,0.06)', borderLeft: '2px solid #ef4444', color: 'var(--text2)' }}>{s.before}</div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#22c77a' }}>After</p>
                <div className="p-3 rounded-lg text-xs leading-relaxed" style={{ background: 'rgba(34,199,122,0.06)', borderLeft: '2px solid #22c77a', color: 'var(--text2)' }}>{s.after}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'details' && (
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <h3 className="font-display font-bold text-sm mb-4" style={{ color: 'var(--text)' }}>Metric Breakdown</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'ATS Score', value: a.ats_score, note: 'Compatibility with automated tracking systems' },
                  { label: 'Recruiter Score', value: a.recruiter_score, note: 'Likelihood a recruiter will shortlist you' },
                  { label: 'Readability', value: a.readability_score, note: 'Ease of reading and clear communication' },
                  { label: 'Keyword Coverage', value: Math.round((a.keywords_found || []).length / Math.max(1, (a.keywords_found || []).length + (a.keywords_missing || []).length) * 100), note: 'Coverage of relevant industry terms' },
                ].map(m => (
                  <div key={m.label}>
                    <ProgressBar label={m.label} value={m.value} />
                    <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>{m.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Overall Score', val: a.overall_score || 0, color: 'var(--accent3)' },
                { label: 'Keywords Found', val: (a.keywords_found || []).length, color: '#22c77a' },
                { label: 'Keywords Missing', val: (a.keywords_missing || []).length, color: '#ef4444' },
                { label: 'Issues Flagged', val: (a.weaknesses || []).length, color: '#f5a623' },
                { label: 'AI Suggestions', val: a.suggestions?.length || 0, color: '#3b9eff' },
                { label: 'Strengths Found', val: (a.strengths || []).length, color: '#22c77a' },
              ].map(card => (
                <div key={card.label} className="p-4 rounded-xl text-center" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-extrabold text-2xl mb-1" style={{ color: card.color }}>{card.val}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text3)' }}>{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
