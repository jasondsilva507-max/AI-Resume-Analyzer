'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--blue))' }}>A</div>
              <span className="font-display font-bold" style={{ color: 'var(--text)' }}>ResumeAI Pro</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text3)' }}>
              AI-powered resume analysis to help you land more interviews.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Product</h4>
            {['Analyzer', 'ATS Score', 'Job Matching', 'Resume Builder'].map(item => (
              <div key={item} className="mb-2">
                <Link href="/" className="text-sm no-underline hover:opacity-80 transition-opacity" style={{ color: 'var(--text3)' }}>{item}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Company</h4>
            {['About', 'Blog', 'Careers', 'Contact'].map(item => (
              <div key={item} className="mb-2">
                <Link href="/" className="text-sm no-underline hover:opacity-80 transition-opacity" style={{ color: 'var(--text3)' }}>{item}</Link>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Legal</h4>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'].map(item => (
              <div key={item} className="mb-2">
                <Link href="/" className="text-sm no-underline hover:opacity-80 transition-opacity" style={{ color: 'var(--text3)' }}>{item}</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            © {new Date().getFullYear()} ResumeAI Pro. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            Powered by Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
