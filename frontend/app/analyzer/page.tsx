'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import AnalysisReport from '@/components/analyzer/AnalysisReport';
import { analyzeResume } from '@/lib/ai';
import { parseResumeViaAPI } from '@/lib/fileParser';
import { Upload, FileText, Briefcase, Loader2 } from 'lucide-react';

export default function AnalyzerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [view, setView] = useState<'upload' | 'report'>('upload');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setFileName(file.name);
    try {
      const text = await parseResumeViaAPI(file);
      setResumeText(text);
      toast.success('Resume loaded: ' + file.name);
    } catch {
      toast.error('Could not read file. Try pasting text instead.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'text/plain': ['.txt'] },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!resumeText.trim()) { toast.error('Please upload or paste your resume first.'); return; }
    setLoading(true);
    try {
      const result = await analyzeResume(resumeText, jobDesc);
      setAnalysis(result);
      setView('report');
      toast.success('Analysis complete!');
    } catch (e: any) {
      toast.error(e.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    setResumeText(`John Smith
john.smith@email.com | (555) 123-4567 | github.com/johnsmith

SUMMARY
Experienced software developer with knowledge of React and Node.js looking for new opportunities.

EXPERIENCE
Senior Software Developer — TechCorp Inc. (2021–Present)
• Helped improve website performance and worked on React components
• Managed team projects and helped deliver features on time
• Worked with databases and APIs

Software Developer — StartupXYZ (2019–2021)
• Built web applications using JavaScript and React
• Worked on backend Node.js development

EDUCATION
B.S. Computer Science — State University (2019) | GPA: 3.4

SKILLS
JavaScript, React, Node.js, HTML, CSS, Git, SQL, MongoDB`);
    setFileName('sample_resume.txt');
    toast.success('Sample resume loaded!');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <AnimatePresence mode="wait">
          {view === 'upload' ? (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h1 className="font-display font-extrabold text-3xl mb-2" style={{ letterSpacing: '-1px', color: 'var(--text)' }}>
                Analyze Your Resume
              </h1>
              <p className="text-sm mb-8" style={{ color: 'var(--text2)' }}>
                Upload or paste your resume. Optionally add a job description for targeted matching.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Resume input */}
                <div className="flex flex-col gap-4">
                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-center justify-center p-10 rounded-xl cursor-pointer transition-all"
                    style={{
                      border: `2px dashed ${isDragActive ? 'var(--accent)' : 'var(--border2)'}`,
                      background: isDragActive ? 'rgba(124,106,255,0.05)' : 'var(--bg2)',
                    }}
                  >
                    <input {...getInputProps()} />
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'rgba(124,106,255,0.15)' }}>
                      <Upload size={22} color="var(--accent3)" />
                    </div>
                    <div className="font-display font-bold text-base mb-1" style={{ color: 'var(--text)' }}>
                      {fileName || 'Drop your resume here'}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text3)' }}>
                      {fileName ? '✓ File ready' : 'PDF, DOCX, or TXT'}
                    </div>
                  </div>

                  <div className="text-center text-xs" style={{ color: 'var(--text3)' }}>— or paste text —</div>

                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    rows={10}
                    placeholder="Paste your resume content here..."
                    className="w-full p-3 rounded-xl text-sm resize-y outline-none transition-colors"
                    style={{
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                    }}
                  />
                </div>

                {/* Right: JD + options */}
                <div className="flex flex-col gap-4">
                  <div className="p-5 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase size={16} color="var(--text2)" />
                      <span className="font-display font-bold text-sm" style={{ color: 'var(--text)' }}>Job Description</span>
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(59,158,255,0.12)', color: '#3b9eff', border: '1px solid rgba(59,158,255,0.25)' }}>Optional</span>
                    </div>
                    <textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      rows={8}
                      placeholder="Paste the job description here for a match % score and targeted keyword suggestions..."
                      className="w-full p-3 rounded-lg text-sm resize-none outline-none"
                      style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    />
                    <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>
                      Adding a JD enables match percentage and targeted keyword gap analysis.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: 'rgba(124,106,255,0.06)', border: '1px solid rgba(124,106,255,0.2)' }}>
                    <p className="text-xs leading-loose" style={{ color: 'var(--text2)' }}>
                      ✦ AI analyzes 10+ resume dimensions<br />
                      ✦ ATS compatibility scoring<br />
                      ✦ AI-powered rewrite suggestions<br />
                      ✦ Keyword gap analysis
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-50"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : '✦ Analyze with AI'}
                </button>
                <button onClick={loadSample} className="px-5 py-3 rounded-xl text-sm transition-all" style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>
                  Load sample resume
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="report" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="font-display font-extrabold text-2xl" style={{ letterSpacing: '-0.5px', color: 'var(--text)' }}>Analysis Report</h1>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{fileName || 'Your resume'} · {new Date().toLocaleDateString()}</p>
                </div>
                <button onClick={() => { setView('upload'); setAnalysis(null); }} className="px-4 py-2 rounded-lg text-sm" style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>
                  ← New Analysis
                </button>
              </div>
              {analysis && <AnalysisReport analysis={analysis} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
